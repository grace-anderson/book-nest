// GRAB DOM ELEMENTS
const loginForm = document.getElementById('login-form');
const signUpForm = document.getElementById('signup-form');

// HANDLER FOR LOGGING THE USER IN
const logUserIn = async (event) => {
  event.preventDefault();

  // grab inputs from user
  const email = document.getElementById('email-login').value.trim();
  const password = document.getElementById('password-login').value.trim();

  // email validation
  const regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  if (!regexEmail.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  if (!password) {
    alert('Please enter your password.');
    return;
  }

  // do fetch call if previous validations do not fail
  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      // get the error message from back end
      // reference:
      // https://stackoverflow.com/questions/63856212/how-to-display-sequelize-validation-error-messages-in-express-api
      const errors = await response.json();
      const errMsg = errors.message;

      // show an alert with the error message
      alert(`Login failed.\n${errMsg}`);

      // IF you want the page to refresh after a validation check fails, uncomment the following line:
      // document.location.replace('/login');
    }
  }
};

// HANDLER FOR SIGNING A NEW USER UP
const signUserUp = async (event) => {
  event.preventDefault();

  // get form values
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
      // reference:
      // https://stackoverflow.com/questions/63856212/how-to-display-sequelize-validation-error-messages-in-express-api
      const errors = await response.json();

      // show an alert depending on what the messages are
      if (errors.email && errors.username) {
        alert(`Sign up failed:\n${errors.email}\n${errors.username}`);
      } else if (errors.email) {
        alert(`Sign up failed:\n${errors.email}`);
      } else if (errors.username) {
        alert(`Sign up failed:\n${errors.username}`);
      } else {
        alert('Oops, something went wrong! Sign up failed.');
      }
      // IF you want the page to refresh after a validation check fails, uncomment the following line:
      // document.location.replace('/login');
    }
  }
};

// GET THE ELEMENTS
loginForm.addEventListener('submit', logUserIn);
signUpForm.addEventListener('submit', signUserUp);
