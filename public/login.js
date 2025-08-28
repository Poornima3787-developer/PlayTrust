async function loginForm(event){
  event.preventDefault();
  const email=event.target.email.value;
  const password=event.target.password.value;
  try {
    const res=await axios.post('/user/login',{email,password});
    const token=res.data.token;
    localStorage.setItem('token',token);

    const profile=await axios.get('/profile/me',{
      headers:{Authorization:token}
    });
    
    if(profile.data.role==='admin'){
       window.location.href='/admin/dashboard';
       return;
    }else{
    window.location.href='/dashboard';
    }

  } catch (error) {
    alert("Login failed: " + (error.response?.data?.message || "Server error"));
    console.error(error);
  }
}