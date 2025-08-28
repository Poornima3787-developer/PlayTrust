const token=localStorage.getItem('token');

function showForm(){
  const role=document.getElementById('role').value;
  document.getElementById("parentForm").classList.add("d-none");
  document.getElementById("coachForm").classList.add("d-none");
  document.getElementById("schoolForm").classList.add("d-none");
  if(role==='parent') document.getElementById('parentForm').classList.remove('d-none');
  if(role==='coach') document.getElementById('coachForm').classList.remove('d-none');
  if(role==='school') document.getElementById('schoolForm').classList.remove('d-none');
}

async function registerParent(e){
  e.preventDefault();
  const data={
    name:document.getElementById('pname').value,
    childName:document.getElementById('childName').value,
    childAge:document.getElementById('childAge').value,
    location:document.getElementById('plocation').value,
    preferredSports:document.getElementById('sports').value.split(',')
  };
  await axios.post('/register/parent',data,{
    headers:{Authorization:token}
  });
  alert('Parent registerd successfully!');
  window.location.href='/dashboard'
}

async function registerCoach(e){
  e.preventDefault();
  const data={
    name:document.getElementById('cname').value,
    sport:document.getElementById('sport').value,
    phoneNumber:document.getElementById('cphoneNumber').value,
    experience:document.getElementById('experience').value,
    location:document.getElementById('clocation').value,
    profilePic:document.getElementById('profilePic').value,
    certifications:document.getElementById('certifications').value
  };
  await axios.post('/register/coach',data,{
    headers:{Authorization:token}
  });
  alert('Coach registerd successfully! Awaiting verification.');
  window.location.href='/dashboard'
}

async function registerSchool(e){
  e.preventDefault();
  const data={
    schoolName:document.getElementById('sname').value,
    address:document.getElementById('address').value,
    contactNumber:document.getElementById('contact').value
  };
  await axios.post('/register/school',data,{
    headers:{Authorization:token}
  });
  alert('School registerd successfully!');
  window.location.href='/dashboard'
}