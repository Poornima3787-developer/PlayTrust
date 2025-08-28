const token = localStorage.getItem('token');

async function loadCoaches() {
  try {
    const res = await axios.get('/profile/coaches', {
      headers: { Authorization: token }
    });
    const coaches = res.data.coaches;
    const container = document.getElementById('coachesContainer');
    container.innerHTML = "";
    container.className = "d-flex flex-wrap gap-3";

    coaches.forEach(c => {
      container.innerHTML += `
        <div class="card text-center shadow-sm position-relative" 
             style="width:200px; font-size:12px; border:1px solid #ddd;">

          <!-- Status badge -->
          <span class="badge ${
            c.verificationStatus === "Approved"
              ? "bg-success"
              : c.verificationStatus === "Rejected"
              ? "bg-danger"
              : "bg-warning text-dark"
          } position-absolute top-0 end-0 m-1" style="font-size:10px;">
            ${c.verificationStatus}
          </span>

          <!-- Profile Image -->
          <img src="${c.profilePic || 'https://cdn-icons-png.flaticon.com/512/190/190411.png'}"
               class="mx-auto mt-2"
               alt="${c.name}" 
               style="width:150px; height:150px; object-fit:cover; border:2px solid #ccc; border-radius:4px;">

          <!-- Card body -->
          <div class="card-body p-2">
            <h6 class="fw-bold mb-1" style="font-size:15px;">${c.name}</h6>
            <p class="mb-0"><b>Sport:</b> ${c.sport}</p>
            <p class="mb-0"><b>Exp:</b> ${c.experience} yrs</p>
            <p class="mb-0"><b>Loc:</b> ${c.location}</p>
          </div>

          <!-- Footer -->
          <div class="card-footer p-1">
            <button class="btn btn-sm btn-outline-primary view-profile-btn" 
                    data-coach='${JSON.stringify(c)}'
                    style="font-size:12px; padding:2px 6px;">
              View Profile
            </button>
          </div>
        </div>
      `;
    });

    // Attach click events to "View Profile" buttons
    document.querySelectorAll(".view-profile-btn").forEach(btn => {
      btn.addEventListener("click", function() {
        const coach = JSON.parse(this.getAttribute("data-coach"));
        showCoachDetails(coach);
      });
    });

  } catch (error) {
    console.error(error);
    document.getElementById("coachProfile").innerHTML = "<p>No profile found.</p>";
  }
}

function showCoachDetails(coach) {
  const details = `
    <div class="text-center mb-2">
      <img src="${coach.profilePic || 'https://cdn-icons-png.flaticon.com/512/190/190411.png'}" 
           alt="${coach.name}" 
           style="width:120px; height:120px; border-radius:50%; border:2px solid #ddd;">
    </div>
    <p><b>Name:</b> ${coach.name}</p>
    <p><b>Sport:</b> ${coach.sport}</p>
    <p><b>Experience:</b> ${coach.experience} yrs</p>
    <p><b>Location:</b> ${coach.location}</p>
    <p><b>Phone:</b> ${coach.phoneNumber || "N/A"}</p>
    <p><b>Address:</b> ${coach.address || "N/A"}</p>
  `;

  document.getElementById("coachDetails").innerHTML = details;

  // Show Bootstrap Modal
  const modal = new bootstrap.Modal(document.getElementById('coachModal'));
  modal.show();
}

loadCoaches();

/*Here event code starts*/
const eventForm=document.getElementById('eventForm');
const eventsContainer=document.getElementById('eventContainer');

let events=[];

function renderEvents(){
  eventsContainer.innerHTML="";
  events.forEach(e=>{
    eventsContainer.innerHTML+=`
    <div class="card shadow-sm" style="width:220px; border:1px solid #ddd;">
    <img src="${e.eventImage || 'https://cdn-icons-png.flaticon.com/512/833/833314.png'}"
    class="card-img-top" style="height:120px;object-fit:cover;" alt="Event">
    <div class="card-body p-2">
    <h6 class="fw-bold mb-1">${e.eventName}</h6>
    <p class="mb-0"><b>Date:</b>${e.date}</p>
    <p class="mb-0"><b>Location:</b>${e.menu}</p>
    <span class="badge ${e.status ==="Upcoming"? "bg-info text-dark":e.status==="Ongoing"?"bg-success":"bg-secondary"}">${e.status}</span>
    </div>
    <div class="card-footer p-2 text-center">
    <button class="btn btn-sm btn-outline-primary">View</button>
    <button class="btn btn-sm btn-outline-danger">Delete</button>
    </div>
    </div>
    `
  });
  document.querySelectorAll(".delete-btn").forEach(btn=>{
    btn.addEventListener("click",async function(){
      const id=this.getAttribute("data-id");
      try {
        await axios.delete(`/event/${id}`);
        events=events.filter(ev=>ev._id !==id);
        renderEvents();
      } catch (error) {
        console.log(error);
      }
    })
  });
  document.querySelectorAll('.view-btn').forEach(btn=>{
    btn.addEventListener('click',function(){
      const event=JSON.parse(this.getAttribute("data-event"));
      showEventDetails(event);
    })
  })
}
async function loadEvents(){
  try {
    const res=await axios.get('/event');
    events=res.data;
    renderEvents();
  } catch (error) {
    console.error(error);
  }
}
document.getElementById("eventForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const eventName = e.target.eventName.value;
  const date = e.target.date.value;
  const menu = e.target.menu.value;
  try {
    const res = await axios.post("/event", {
      eventName,
      date,
      menu
    }, {
      headers: { "Content-Type": "application/json" }
    });

    alert("Event created successfully!");

  } catch (err) {
    console.error(err.response?.data || err.message);
  }
});

function showEventDetails(event){
  const details=`
  <div class="text-center mb-2">
   <img src="${event.eventImage || 'https://cdn-icons-png.flaticon.com/512/833/833314.png'}"
           style="width:200px; height:150px; object-fit:cover; border:2px solid #ddd;">
    </div>
    <p><b>Name:</b> ${event.eventName}</p>
    <p><b>Date:</b> ${new Date(event.date).toLocaleDateString()}</p>
    <p><b>Location:</b> ${event.menu}</p>
    <p><b>Status:</b> ${event.status}</p>
  `;
  document.getElementById("eventDetails").innerHTML = details;
  const modal = new bootstrap.Modal(document.getElementById("eventModal"));
  modal.show();
}

loadEvents();