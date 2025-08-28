const token=localStorage.getItem('token');

async function loadCoaches(){
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
    coaches.forEach(coach=>{
      const card=document.createElement("div");
      card.className='card mb-3 p-3';
      card.innerHTML=`
      <h5>${coach.name} (${coach.sport})</h5>
      <p><b>Experience:</b> ${coach.experience} years</p>
      <p><b>Certifications:</b> ${coach.certifications}</p>
      <button class="btn btn-success btn-sm me-2" onclick="approveCoach('${coach._id}')">Approve</button>
      <button class="btn btn-danger btn-sm" onclick="rejectCoach('${coach._id}')">Reject</button>
      `;
      container.appendChild(card);
    })
  } catch (error) {
    console.log(error);
  }
}

async function approveCoach(id){
  await axios.put(`/admin/coaches/approve/${id}`,{
    headers:{Authorization:token}
  });
  loadCoaches();
}

async function rejectCoach(id){
  await axios.put(`/admin/coaches/reject/${id}`,{
    headers:{Authorization:token}
  });
  loadCoaches();
}

loadCoaches();