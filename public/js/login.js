const logUserIn = async (event) => {
  event.preventDefault();

  const email = document.getElementById('email-login').value.trim();
  const password = document.getElementById('password-login').value.trim();

  // console.log(`\n----LOGIN ROUTE: EMAIL`);
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

const signUserUp = async (event) => {
  event.preventDefault();

  const username = document.getElementById('username-signup').value.trim();
  const email = document.getElementById('email-signup').value.trim();
  const password = document.getElementById('password-signup').value.trim();

  if (username && email && password) {
    const response = await fetch('api/users', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Sign up failed.');
    }
  }
};

document.getElementById('login-form').addEventListener('submit', logUserIn);

document.getElementById('signup-form').addEventListener('submit', signUserUp);

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
