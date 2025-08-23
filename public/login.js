
async function loginForm(event){
  event.preventDefault();

  const email=event.target.email.value;
  const password=event.target.password.value;

  try {

    const res=await axios.post('/user/login',{email,password});
    localStorage.setItem('token',res.data.token);
    alert('login successfully');
    window.location.ref='/dashboard'

  } catch (error) {
    alert("Login failed: " + (error.response?.data?.message || "Server error"));
    console.error(error);
  }
}