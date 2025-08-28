const Event=require('../models/event');

exports.uploadEvent=async (req,res)=>{
  try {
    const {eventName,date,menu}=req.body;
    const newEvent=new Event({
      eventName,
      date,
      menu,
      eventImage: "https://via.placeholder.com/400x200.png?text=Default+Event"
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
    const events=await Event.find().sort({date:1});
    const today=new Date();
    const withStatus=events.map(e=>{
      let status="Upcoming";
      const eventDate=new Date(e.date);
      if(eventDate.toDateString() === today.toDateString()){
        status="Ongoing";
      }else if(eventDate<today){
        status="Completed";
      }
      return {...e.toObject(),status};
    })
    res.json(withStatus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching events" });
  }
}

exports.deleteEvent=async (req,res)=>{
  try {
    const {id}=req.params;
    await Event.findByIdAndDelete(id);
    res.json({message:"Event deleted"})
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting event" });
  }
}