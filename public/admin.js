const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "/login";
}
async function loadCoaches(){
  const token=localStorage.getItem('token');
  try {
    const res=await axios.get('/admin/coaches/pending',{
      headers:{Authorization:token}
    });
    const coaches=res.data.coaches;

    const container=document.getElementById('coachList');
    container.innerHTML='';

    if(coaches.length===0){
      container.innerHTML='<p>No pending coaches</p>';
    }
   coaches.forEach(coach => {
  const card = document.createElement('div');
  card.className = 'card mb-3 p-3';
  card.innerHTML = `
    <h5>${coach.name} (${coach.sport})</h5>
    ${coach.profilePic ? `<img src="${coach.profilePic}" alt="Profile Pic" class="img-thumbnail mb-2" width="100">` : ''}
    <p><b>Experience:</b> ${coach.experience} years</p>
    <p><b>Certifications:</b></p>
<div>
  ${coach.certifications && coach.certifications.length > 0
    ? coach.certifications.map(cert => `<a href="${cert}" target="_blank">View</a>`).join(' ')
    : 'No certifications'}
</div>
    <button class="btn btn-success btn-sm me-2" onclick="approveCoach('${coach._id}')">Approve</button>
    <button class="btn btn-danger btn-sm" onclick="rejectCoach('${coach._id}')">Reject</button>
  `;
  container.appendChild(card);
});

  } catch (error) {
    console.log(error);
  }
}

async function approveCoach(id){
  const token=localStorage.getItem('token');
  await axios.put(`/admin/coaches/approve/${id}`,null,{
    headers:{Authorization:token}
  });
  loadCoaches();
}

async function rejectCoach(id){
  const token=localStorage.getItem('token');
  await axios.put(`/admin/coaches/reject/${id}`,null,{
    headers:{Authorization:token}
  });
  loadCoaches();
}

loadCoaches();


document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
});