async function signupForm(event){
  event.preventDefault();

  const name=event.target.name.value;
  const email=event.target.email.value;
  const password=event.target.password.value;

  try {
    const res=await axios.post('/user/signup',{name,email,password});
    alert('Signup successfull! Please Login.');
    window.location.ref='/login'

  } catch (error) {
    alert("Signup failed: " + (error.response?.data?.message || "Server error"));
    console.error(error);
  }
}