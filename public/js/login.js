// HANDLER FOR LOGGING THE USER IN
const logUserIn = async (event) => {
  event.preventDefault();

  const email = document.getElementById('email-login').value.trim();
  const password = document.getElementById('password-login').value.trim();

  // console.log('\n----LOGIN ROUTE: EMAIL');
  // console.log(email);

  if (!email || !password) {
    alert('Please fill in both email and password fields.');
    return;
  }

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Login failed.');
    }
  }
};

// HANDLER FOR SIGNING A NEW USER UP
const signUserUp = async (event) => {
  event.preventDefault();

  const username = document.getElementById('username-signup').value.trim();
  const email = document.getElementById('email-signup').value.trim();
  const password = document.getElementById('password-signup').value.trim();

  // let validUsername;
  // let validEmail;

  if (!username || !email || !password) {
    alert('Please fill in the username, email, and password fields.');
  }

  // tried to add validation checks for user and email to be unique but it's not working 100%

  // const usernameCheck = await fetch('/api/users/signup-check', {
  //   method: 'POST',
  //   body: JSON.stringify({ username }),
  //   headers: { 'Content-Type': 'application/json' }
  // });

  // const emailCheck = await fetch('/api/users/signup-check', {
  //   method: 'POST',
  //   body: JSON.stringify({ email }),
  //   headers: { 'Content-Type': 'application/json' }
  // });

  // if (usernameCheck.ok) {
  //   return (validUsername = username);
  // } else {
  //   alert('Username is already taken');
  // }

  // if (emailCheck.ok) {
  //   return (validEmail = email);
  // } else {
  //   alert('Email is already taken');
  // }

  // console.log(validUsername, validEmail, password);

  if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(
        'Sign up failed because the username or email already exists. Please try again.'
      );
      // after the alert is closed, refresh login page
      document.location.replace('/login');
    }
  }
};

// GET THE ELEMENTS
document.getElementById('login-form').addEventListener('submit', logUserIn);

document.getElementById('signup-form').addEventListener('submit', signUserUp);

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
