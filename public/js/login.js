// GRAB DOM ELEMENTS
const loginForm = document.getElementById('login-form');
const signUpForm = document.getElementById('signup-form');

// HANDLER FOR LOGGING THE USER IN
const logUserIn = async (event) => {
  event.preventDefault();

  const email = document.getElementById('email-login').value.trim();
  const password = document.getElementById('password-login').value.trim();

  // console.log('\n----LOGIN ROUTE: EMAIL');
  // console.log(email);

  // email validation here
  const regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  if (!regexEmail.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  if (!password) {
    alert('Please enter your password.');
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
      alert(
        'Login failed.\nPlease check that your email and password are correct.'
      );
    }
  }
};

// HANDLER FOR SIGNING A NEW USER UP
const signUserUp = async (event) => {
  event.preventDefault();

  const username = document.getElementById('username-signup').value.trim();
  const email = document.getElementById('email-signup').value.trim();
  let password = document.getElementById('password-signup').value.trim();

  if (!username || !email || !password) {
    alert('Please fill in the username, email, and password fields.');
  }

  // email validation here
  const regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  if (!regexEmail.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      // get validation errors from back end
      const errors = await response.json();

      // do an alert depending on what the messages are
      if (errors.email && errors.username) {
        alert(`Sign up failed:\n${errors.email}\n${errors.username}`);
      } else if (errors.email) {
        alert(`Sign up failed:\n${errors.email}`);
      } else if (errors.username) {
        alert(`Sign up failed:\n${errors.username}`);
      } else {
        alert('Oops, something went wrong! Sign up failed.');
      }

      // after the alert is closed, refresh login page
      document.location.replace('/login');
    }
  }
};

// GET THE ELEMENTS
loginForm.addEventListener('submit', logUserIn);
signUpForm.addEventListener('submit', signUserUp);
