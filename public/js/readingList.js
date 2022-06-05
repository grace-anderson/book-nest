// GET DOM ELEMENTS
const addButton = document.getElementById('add-to-reading-list');
const removeButton = document.getElementById('remove-from-reading-list');

// ADD TO READING LIST HANDLER
const addToReadingList = async (event) => {
  event.preventDefault();

  // obtain book ID via data-id
  const bookId = document.getElementById('selected-book').dataset.id;

  // send post request to api
  const response = await fetch('/api/reading-list/add', {
    method: 'POST',
    body: JSON.stringify({ bookId }),
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    alert('Successfully added book to your reading list!');
    document.location.replace('/profile');
  } else {
    alert(
      'Oops, something went wrong!\nThis book could not be added to your reading list.\n\n(You might have checked it out already.)'
    );
  }
};

// REMOVE FROM READING LIST HANDLER
const removeFromReadingList = async (event) => {
  event.preventDefault();

  // grab book id from data-id
  const bookId = document.getElementById('selected-book').dataset.id;

  // send delete request to api
  const response = await fetch('/api/reading-list/remove', {
    method: 'DELETE',
    body: JSON.stringify({ bookId }),
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    alert('Successfully removed book from your reading list!');
    document.location.replace('/profile');
  } else {
    alert(
      'Oops, something went wrong!\nThis book could not be removed from your reading list.\n\n(You might not have checked it out yet.)'
    );
  }
};

// EVENT LISTENERS
addButton.addEventListener('click', addToReadingList);

removeButton.addEventListener('click', removeFromReadingList);
