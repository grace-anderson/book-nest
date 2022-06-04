// HANDLER FOR LOGGING THE USER IN
const logUserIn = async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  // console.log('\n----LOGIN ROUTE: EMAIL');
  // console.log(email);

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Login failed.');
    }
  }
};

// GET THE ELEMENTS
document.querySelector('.login-form').addEventListener('submit', logUserIn);

//document.querySelector('signup-form').addEventListener('submit', signUserUp);

// ==== BELOW:
// OLD VERSION THAT DOESN'T WORK

// const logUserIn = async (event) => {
//   event.preventDefault();

//   const email = document.getElementById('email').value.trim();
//   const password = document.getElementById('password').value.trim();

//   if (email && password) {
//     try {
//       await axios.post('/api/users/login', {
//         email,
//         password
//       });
//       document.location.replace('/');
//     } catch (error) {
//       alert('Login failed.');
//     }
//   }
// };

// document.querySelector('.login-form').addEventListener('submit', logUserIn);
