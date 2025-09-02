const token=localStorage.getItem('token');

if(!token){
  window.location.href="/login";
}

function showForm(){
  const role=document.getElementById('role').value;
  document.getElementById("parentForm").classList.add("d-none");
  document.getElementById("coachForm").classList.add("d-none");
  document.getElementById("schoolForm").classList.add("d-none");
  if(role==='parent') document.getElementById('parentForm').classList.remove('d-none');
  if(role==='coach') document.getElementById('coachForm').classList.remove('d-none');
  if(role==='school') document.getElementById('schoolForm').classList.remove('d-none');
}

/*Parent registeration*/
async function registerParent(e){
  e.preventDefault();

  const token=localStorage.getItem('token');
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
  window.location.href='/dashboard';
}

/*Coach registeration*/
async function registerCoach(e) {
  e.preventDefault();

  const token=localStorage.getItem('token');
  const formData = new FormData();
  formData.append("name", document.getElementById('cname').value);
  formData.append("sport", document.getElementById('sport').value);
  formData.append("phoneNumber", document.getElementById('cphoneNumber').value);
  formData.append("experience", document.getElementById('experience').value);
  formData.append("location", document.getElementById('clocation').value);

  const profilePic = document.getElementById('profilePic').files[0];
  if (profilePic) formData.append("profilePic", profilePic);

  const certifications = document.getElementById('certifications').files;
  for (let i = 0; i < certifications.length; i++) {
    formData.append("certifications", certifications[i]);
  }

  await axios.post('/register/coach', formData, {
    headers: {
      Authorization: token,
      "Content-Type": "multipart/form-data"
    }
  });

  alert('Coach registered successfully! Awaiting verification.');
  window.location.href = '/dashboard';
}

/*School registeration*/
async function registerSchool(e){
  e.preventDefault();

  const token=localStorage.getItem('token');  
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