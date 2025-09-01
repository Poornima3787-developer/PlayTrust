async function signupForm(event){
  event.preventDefault();

  const name=event.target.name.value;
  const email=event.target.email.value;
  const password=event.target.password.value;

  try {

    const res=await axios.post('/user/signup',{name,email,password});
    localStorage.setItem('token',res.data.token);

    alert('Signup successfull! Please Register.');
    window.location.href='/register';

  } catch (error) {
    alert("Signup failed");
    console.error(error);
  }
}