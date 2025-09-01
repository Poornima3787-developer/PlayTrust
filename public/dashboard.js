document.addEventListener("DOMContentLoaded", () => {
  loadProfile();
  loadCoaches();
  loadEvents();
  loadMyEvents();
});

const token = localStorage.getItem("token");

/* LOGOUT*/

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
});

/*PROFILE*/

function getProfileImage(user) {
  const roleImages = {
    coach: "https://cdn-icons-png.flaticon.com/512/1995/1995574.png",
    parent: "https://cdn-icons-png.flaticon.com/512/2922/2922510.png",
    school: "https://cdn-icons-png.flaticon.com/512/891/891462.png",
    default: "https://cdn-icons-png.flaticon.com/512/149/149071.png"
  };
  if(user.role==="coach" && user.profile?.profilePic){
    return user.profile.profilePic;
  }
  return roleImages[user.role] || roleImages.default;
}
//sidebar profile
async function loadProfile() {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get("/profile/me", {
      headers: { Authorization: token },
    });
    const user = res.data;

    document.getElementById("userName").textContent = user.name;
    document.getElementById("userRole").textContent = user.role;
    document.getElementById("userProfilePic").src = getProfileImage(user);

    renderProfileDetails(user);

    document.getElementById("editProfileBtn").onclick = () => {
      renderEditableProfile(user);
    };

  } catch (err) {
    console.error("Error loading profile:", err);
  }
}
//it will show the sidebar profile details
function renderProfileDetails(user) {
  let detailsHtml = `<p><strong>Email:</strong> ${user.email}</p>`;

  if(user.profile?.certifications && user.profile.certifications.length > 0) {
  detailsHtml += `<p><strong>Certifications:</strong></p><ul>`;
  user.profile.certifications.forEach(url => {
    detailsHtml += `<li><a href="${url}" target="_blank">View Certification</a></li>`;
  });
  detailsHtml += `</ul>`;
  }

  if (user.role==="coach") {
    detailsHtml += `
      <p><strong>Sport:</strong> ${user.profile?.sport || ""}</p>
      <p><strong>Phone Number:</strong>${user.profile?.phoneNumber || ""}</p>
      <p><strong>Experience:</strong> ${user.profile?.experience || ""} years</p>
      <p><strong>Location:</strong> ${user.profile?.location || ""}</p>`;
  } else if(user.role==="parent") {
    detailsHtml += `
      <p><strong>Child Name:</strong> ${user.profile?.childName || ""}</p>
      <p><strong>Child Age:</strong> ${user.profile?.childAge || ""}</p>
      <p><strong>Location:</strong> ${user.profile?.location || ""}</p>
      <p><strong>Preferred Sports:</strong> ${user.profile?.preferredSports || ""}</p>`;
  } else if (user.role==="school") {
    detailsHtml += `
      <p><strong>School Name:</strong> ${user.profile?.name || ""}</p>
      <p><strong>Address:</strong> ${user.profile?.address || ""}</p>
      <p><strong>Contact Number:</strong> ${user.profile?.contactNumber || ""}</p>`;
  }
  document.getElementById("profileDetails").innerHTML = detailsHtml;
}
//if we click the edit it will edit here
function renderEditableProfile(user) {
  let formHtml = `
    <form id="editProfileForm">
    <p><strong>Email:</strong> <input type="email" name="email" value="${user.email}" /></p>
  `;

  if (user.role==="coach") {
    formHtml += `
      <p><strong>Profile Pic:</strong> <input type="file" name="profilePic" /></p>
      <p><strong>Sport:</strong> <input type="text" name="sport" value="${user.profile?.sport || ""}" /></p>
      <p><strong>Phone Number:</strong> <input type="number" name="phoneNumber" value="${user.profile?.phoneNumber || ""}" /></p>
      <p><strong>Experience:</strong> <input type="number" name="experience" value="${user.profile?.experience || ""}" /></p>
      <p><strong>Location:</strong> <input type="text" name="location" value="${user.profile?.location || ""}" /></p>
      <p><strong>Certification:</strong> <input type="file" name="certifications" multiple /></p>`;
  } else if (user.role==="parent") {
    formHtml += `
      <p><strong>Child Name:</strong> <input type="text" name="childName" value="${user.profile?.childName || ""}" /></p>
      <p><strong>Child Age:</strong> <input type="number" name="childAge" value="${user.profile?.childAge || ""}" /></p>
      <p><strong>Location:</strong> <input type="text" name="location" value="${user.profile?.location || ""}" /></p>
      <p><strong>Preferred Sports:</strong> <input type="text" name="preferredSports" value="${user.profile?.preferredSports || ""}" /></p>`;
  } else if (user.role==="school") {
    formHtml += `
      <p><strong>School Name:</strong> <input type="text" name="name" value="${user.profile?.name || ""}" /></p>
      <p><strong>Address:</strong> <input type="text" name="address" value="${user.profile?.address || ""}" /></p>
      <p><strong>Contact Number:</strong> <input type="text" name="contactNumber" value="${user.profile?.contactNumber || ""}" /></p>`;
  }

  formHtml += `<button type="submit" class="btn btn-primary mt-2">Update</button></form>`;

  document.getElementById("profileDetails").innerHTML = formHtml;
//update the profile
  document.getElementById("editProfileForm").onsubmit = async (e) => {
  e.preventDefault();
  const token=localStorage.getItem('token');

    const formData = new FormData(e.target);

    try {
      const res = await axios.put("/profile/update", formData, {
        headers: { Authorization: token,"Content-Type": "multipart/form-data" },
      });

      alert("Profile updated successfully!");
      await loadProfile();
    } catch (err) {
      alert("Failed to update profile.");
    }
  };
}


/*COACHES*/

let allCoaches=[];
let coachIndex = 0;
const coachLimit = 5;

async function loadCoaches(page=1) {
    currentCoachPage = page;
    try {
    const res = await axios.get(`/profile/coaches`, { headers: { Authorization: token } });
    allCoaches = res.data.coaches;
    renderCoaches(allCoaches);
  }catch(error){
    console.error("Error loading coaches:", error);
  }
}
//show the coach details
function renderCoaches(coaches){
    const container = document.getElementById("coachesContainer");

    container.innerHTML = "";
    const visible = coaches.slice(coachIndex, coachIndex + coachLimit);
    container.className = "d-flex flex-wrap gap-3";

    visible.forEach(c => {
      container.innerHTML += `
        <div class="card text-center shadow-sm position-relative" style="width:200px;">
          <span class="badge ${c.verificationStatus === "Approved" ? "bg-success" : c.verificationStatus === "Rejected" ? "bg-danger" : "bg-warning text-dark"} position-absolute top-0 end-0 m-1" style="font-size:10px;">
            ${c.verificationStatus}
          </span>
          <img src="${c.profilePic || 'https://cdn-icons-png.flaticon.com/512/190/190411.png'}" class="mx-auto mt-2" style="width:150px; height:150px; object-fit:cover; border-radius:4px;">
          <div class="card-body p-2">
            <h6 class="fw-bold mb-1">${c.name}</h6>
            <p class="mb-0"><b>Sport:</b> ${c.sport}</p>
          </div>
          <div class="card-footer p-1">
            <button class="btn btn-sm btn-outline-primary view-profile-btn" data-coach='${JSON.stringify(c)}'>View Profile</button>
          </div>
        </div>`;
    });

    document.querySelectorAll(".view-profile-btn").forEach(btn => {
      btn.addEventListener("click", function() {
        const coach = JSON.parse(this.getAttribute("data-coach"));
        showCoachDetails(coach);
      });
    });
  } 
  document.getElementById("coachPrev").addEventListener("click", () => {
  if (coachIndex > 0) {
    coachIndex -= coachLimit;
    renderCoaches(allCoaches);
  }
});

document.getElementById("coachNext").addEventListener("click", () => {
  if (coachIndex + coachLimit < allCoaches.length) {
    coachIndex += coachLimit;
    renderCoaches(allCoaches);
  }
});
//added the search
document.getElementById("searchInput").addEventListener('input',e=>{
  const q=e.target.value.toLowerCase();
  const filtered=allCoaches.filter(c=>
    (c.experience && c.experience.toString().toLowerCase().includes(q)||
     c.location && c.location.toString().toLowerCase().includes(q)||
    c.sport && c.sport.toString().toLowerCase().includes(q))
  );
  coachIndex = 0; 
  renderCoaches(filtered);
})
//Show the coach details in dashboard
function showCoachDetails(coach) {
  let certHtml = "";
  if (coach.certifications && coach.certifications.length > 0) {
    certHtml = "<p><b>Certifications:</b></p><ul>";
    coach.certifications.forEach(url => {
      certHtml += `<li><a href="${url}" target="_blank">View Certification</a></li>`;
    });
    certHtml += "</ul>";
  }
  document.getElementById("coachDetails").innerHTML = `
    <div class="text-center mb-2">
      <img src="${coach.profilePic || "https://via.placeholder.com/400x200?text=Default+Event"}" style="width:120px; height:120px; border-radius:50%;">
    </div>
    <p><b>Name:</b> ${coach.name}</p>
    <p><b>Sport:</b> ${coach.sport}</p>
    <p><b>Phone Number:</b> ${coach.phoneNumber}</p>
    <p><b>Experience:</b> ${coach.experience} yrs</p>
    <p><b>Location:</b> ${coach.location}</p>
    ${certHtml}
  `;
  new bootstrap.Modal(document.getElementById("coachModal")).show();
}


/*EVENTS*/

let events = [];
let eventIndex = 0;
const eventLimit = 5;

async function loadEvents() {
  try {
    const res = await axios.get(`/event`, { headers: { Authorization: token } });
    events = res.data.events;
    renderEvents();
  } catch (err) {
    console.error("Error loading events:", err);
  }
}
//show events
function renderEvents() {
  const container = document.getElementById("eventContainer");
  container.innerHTML = "";
  const visible = events.slice(eventIndex, eventIndex + eventLimit);
  container.className = "d-flex flex-wrap gap-3";

  visible.forEach(e => {
    container.innerHTML += `
      <div class="card shadow-sm" style="width:200px; position:relative;">
        <span class="badge ${e.status === "Upcoming" ? "bg-success" : e.status === "Ongoing" ? "bg-danger" : "bg-warning"} position-absolute top-0 end-0 m-1" style="font-size:10px;"> ${e.status}
        </span>
        <img src="${e.eventImage || 'https://via.placeholder.com/400x200?text=Default+Event'}" class="card-img-top" style="height:230px; object-fit:cover;>
        <div class="card-footer d-flex justify-content-between">        
          <button class="btn btn-sm btn-outline-primary view-btn" data-event='${JSON.stringify(e)}'>View</button>
        </div>
      </div>`;
  });

  container.querySelectorAll(".view-btn").forEach(btn => {
    btn.addEventListener("click", function() {
      showEventDetails(JSON.parse(this.dataset.event));
    });
  });
}

document.getElementById("eventPrev").addEventListener("click", () => {
  if (eventIndex > 0) {
    eventIndex -= eventLimit;
    renderEvents();
  }
});

document.getElementById("eventNext").addEventListener("click", () => {
  if (eventIndex + eventLimit < events.length) {
    eventIndex += eventLimit;
    renderEvents();
  }
});

function showEventDetails(event) {
  document.getElementById("eventDetails").innerHTML = `
    <div class="text-center mb-2">
      <img src="${event.eventImage || 'https://cdn-icons-png.flaticon.com/512/833/833314.png'}" style="width:200; height:350px; object-fit:cover;">
    </div>
    <p><b>Name:</b> ${event.eventName}</p>
    <p><b>Date:</b> ${new Date(event.date).toLocaleDateString()}</p>
    <p><b>Menu:</b> ${event.menu}</p>
    <p><b>Status:</b> ${event.status}</p>
  `;
  new bootstrap.Modal(document.getElementById("eventModal")).show();
}

//Add event
document.getElementById("eventForm").addEventListener("submit", async function(e) {
  e.preventDefault();
  const token=localStorage.getItem('token');
  const formData = new FormData(this);

  try {
    await axios.post("/event", formData, {
      headers: {Authorization: token,
      "Content-Type": "multipart/form-data"
      }
    });
    bootstrap.Modal.getInstance(document.getElementById("addEventModal")).hide();
    loadEvents();
    loadMyEvents();
    this.reset();
  } catch (err) {
    console.error("Error adding event:", err);
    alert("Failed to add event");
  }
});


/*MY EVENTS*/

let myEvents = [];
let myEventPage = 1;
let myEventLimit = 3;
let myEventTotalPages = 1;

async function loadMyEvents(page=1) {
  try {
    const res = await axios.get(`/event/myevents?page=${page}&limit=${myEventLimit}`, { headers:{Authorization:token} });
    myEvents=res.data.events || [];
    myEventPage=res.data.pagination.page;
    myEventTotalPages=res.data.pagination.totalPages;
    renderMyEvents();
  }catch(error){
    console.log("Error loading my events:",error);
  }
}
//Show myevents
function renderMyEvents() {
  const container = document.getElementById("myEventsContainer");
  container.innerHTML = "";

  myEvents.forEach(e => {
    container.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="card shadow-lg h-100 position-relative">
          <div class="position-relative">
            <img src="${e.eventImage || 'https://via.placeholder.com/400x200?text=Default+Event'}" class="card-img-top" style="height: 300px; object-fit: cover; border-top-left-radius: .5rem; border-top-right-radius: .5rem;">
            <span class="badge bg-${e.status === "Ongoing" ? "success" : e.status === "Completed" ? "secondary" : "info"} position-absolute top-0 end-0 m-2"> ${e.status}
            </span>
          </div>
          <div class="card-body">
            <h5 class="card-title mb-3">${e.eventName}</h5>
            <p class="mb-2"><b>Date:</b> ${new Date(e.date).toLocaleDateString()}</p>
            <p class="mb-0"><b>Menu:</b> ${e.menu || ""}</p>
          </div>
          <div class="card-footer d-flex justify-content-between">
            <button class="btn btn-sm btn-warning edit-btn" data-event='${JSON.stringify(e)}'>Edit</button>
            <button class="btn btn-sm btn-danger delete-btn" data-id="${e._id}">Delete</button>
          </div>
        </div>
      </div>`;
  });

  // Pagination buttons
  document.getElementById("prevMyEvents").disabled = myEventPage <=1;
  document.getElementById("nextMyEvents").disabled = myEventPage >= myEventTotalPages;

  // Edit & Delete
  container.querySelectorAll(".edit-btn").forEach(btn =>{
    btn.addEventListener("click", function(){
      openEditEventModal(JSON.parse(this.dataset.event));
    });
  });

  container.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", async function(){
      const id = this.dataset.id;
      if (confirm("Delete this event?")) {
        await axios.delete(`/event/${id}`,{headers:{Authorization: token}});
        loadMyEvents(myEventPage);
        loadEvents(); 
      }
    });
  });
}

document.getElementById("prevMyEvents").addEventListener("click", () => {
  if (myEventPage > 1) {
    loadMyEvents(myEventPage - 1);
  }
});

document.getElementById("nextMyEvents").addEventListener("click", () => {
  if (myEventPage < myEventTotalPages) {
    loadMyEvents(myEventPage + 1);
  }
});

document.getElementById("myeventsModal").addEventListener("shown.bs.modal", () => {
  renderMyEvents();
});

//edit Event
document.getElementById("editEventImageInput").addEventListener("change", function() {
  if (this.files && this.files[0]) {
    document.getElementById("editEventPreview").src = URL.createObjectURL(this.files[0]);
  }
});


function openEditEventModal(event) {
  document.getElementById("editEventId").value = event._id;
  document.getElementById("editEventName").value = event.eventName;
  document.getElementById("editEventDate").value = event.date.split("T")[0];
  document.getElementById("editEventMenu").value = event.menu;
  document.getElementById("editEventPreview").src = event.eventImage;
  
  const myEventsModal = bootstrap.Modal.getInstance(document.getElementById("myeventsModal"));
  myEventsModal.hide();

  new bootstrap.Modal(document.getElementById("editEventModal")).show();
}

document.getElementById("editEventForm").addEventListener("submit", async function(e) {
  e.preventDefault();
  const id = document.getElementById("editEventId").value;
  const formData = new FormData(this);

  try {
    await axios.put(`/event/${id}`, formData, {
      headers: { Authorization: token,"Content-Type": "multipart/form-data"}
    });
    bootstrap.Modal.getInstance(document.getElementById("editEventModal")).hide();
    loadEvents();
    loadMyEvents();
    new bootstrap.Modal(document.getElementById("myeventsModal")).show();
  } catch (err) {
    console.error("Error updating event:", err);
    alert("Failed to update event");
  }
});
