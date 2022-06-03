window.onload = function () {
  const registerForm = document.querySelector('.register-form');

  if (registerForm) {
    registerForm.addEventListener('submit', async function (event) {
      event.preventDefault();
      const username = document.querySelector('#username').value.trim();
      const password = document.querySelector('#password').value.trim();
      const email = document.querySelector('#email').value.trim();
      const errorMsgElement = document.querySelector('.error-msg');
      let errorMsg = '';

      if (username === '' || password === '' || email === '') {
        errorMsg = 'Please enter all the required fields.';
      } else if (!/^[^@ ]+@[^@ ]+\.[^@ \.]{2,}$/.test(email)) {
        errorMsg = 'Please enter a valid email address.';
      }

      if (errorMsg) {
        errorMsgElement.innerHTML = errorMsg;
        return;
      } else {
        errorMsgElement.innerHTML = '';
      }

      if (username !== '' && password !== '' && email !== '') {
        // make API Call
        console.log('all good');

        try {
          const { data } = await axios.post('/api/users/register', {
            username,
            email,
            password
          });
          console.log({ data });
          document.location.replace('/');
        } catch (error) {
          console.log(error);
          alert('Registration failed');
        }
      }
    });
  }
};
