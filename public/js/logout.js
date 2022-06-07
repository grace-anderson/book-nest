// GET DOM ELEMENTS
const logoutButton = document.getElementById('logout');

// LOG USER OUT HANDLER
const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    document.location.replace('/logout');
  } else {
    alert('Logout failed.');
  }
};

// EVENT LISTENERS
logoutButton.addEventListener('click', logout);
