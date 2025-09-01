const Event=require('../models/event');
const {uploadToS3,deleteFromS3}=require('../service/s3Service');

exports.uploadEvent=async (req,res)=>{
  try {
    const {eventName,date,menu}=req.body;
    let imageUrl="https://via.placeholder.com/400x200?text=Default+Event";

    if(req.file){
      const filename=`event-${Date.now()}.jpg`;
      imageUrl=await uploadToS3(req.file.buffer,filename,"events");
    }

    const newEvent=new Event({
      eventName,
      date,
      menu,
      eventImage:imageUrl,
      createdBy:req.user.id
    });

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating event" });
  }
}

exports.getEvent=async (req,res)=>{
  try {
    const events= await Event.find().sort({ date: 1 });
    const today=new Date();

    const withStatus=events.map((e)=>{
      let status="Upcoming";
      const eventDate=new Date(e.date);

      if(eventDate.toDateString() === today.toDateString()){
        status="Ongoing";
      }else if(eventDate<today){
        status="Completed";
      }

      return {...e.toObject(),status};
    });

    res.json({success: true, events: withStatus});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching events" });
  }
}

exports.getMyEvents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const skip = (page - 1) * limit;

    const [events, total] = await Promise.all([
      Event.find({ createdBy: req.user.id })
        .sort({ date: 1 })
        .skip(skip)
        .limit(limit),
      Event.countDocuments({ createdBy: req.user.id })
    ]);

    const today = new Date();

    const withStatus = events.map((e) => {
      let status = "Upcoming";
      const eventDate = new Date(e.date);

      if (eventDate.toDateString() === today.toDateString()) {
        status = "Ongoing";
      } else if (eventDate < today) {
        status = "Completed";
      }

      return { ...e.toObject(), status };
    });

    res.json({
      success: true,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        totalEvents: total
      },
      events: withStatus
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user events" });
  }
};


exports.updateEvent=async(req,res)=>{
  try {
    const {id}=req.params;

    const oldEvent=await Event.findOne({ _id:id,createdBy:req.user.id});
     if (!oldEvent) return res.status(404).json({ message: "Event not found or unauthorized" });

     let imageUrl=oldEvent.eventImage;

     if(req.file){
      const filename=`event-${Date.now()}.jpg`;
      imageUrl=await uploadToS3(req.file.buffer,filename,"events");
      if(oldEvent.eventImage && oldEvent.eventImage.includes("amazonaws.com")){
        const key=oldEvent.eventImage.split(".amazonaws.com/")[1];
        await deleteFromS3(key);
      }
     }

     oldEvent.eventName=req.body.eventName??oldEvent.eventName;
     oldEvent.date=req.body.date??oldEvent.date;
     oldEvent.menu=req.body.menu??oldEvent.menu;
     oldEvent.eventImage=imageUrl;

     const updated=await oldEvent.save();
     res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating event" });
  }
}


exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Event.findOneAndDelete({ _id: id, createdBy: req.user.id });

    if (!deleted) return res.status(404).json({ message: "Event not found or unauthorized" });

    if (deleted.eventImage && deleted.eventImage.includes(".amazonaws.com/")) {
      const key = deleted.eventImage.split(".amazonaws.com/")[1];
      await deleteFromS3(key);
    }

    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting event" });
  }
};
