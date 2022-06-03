const logUserIn = async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (email && password) {
    try {
      await axios.post('/api/users/login', {
        email,
        password
      });
      document.location.replace('/');
    } catch (error) {
      alert('Login failed.');
    }
  }
};

document.querySelector('.login-form').addEventListener('submit', logUserIn);
