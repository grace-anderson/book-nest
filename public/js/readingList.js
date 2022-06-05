const addButton = document.getElementById('add-to-reading-list');
const removeButton = document.getElementById('remove-from-reading-list');

// const showOnlyAddButton = () => {
//   addButton.classList.remove('hide');
//   removeButton.classList.add('hide');
// };

// const showOnlyRemoveButton = () => {
//   removeButton.classList.remove('hide');
//   addButton.classList.add('hide');
// };

const addToReadingList = async (event) => {
  event.preventDefault();

  const bookId = document.getElementById('selected-book').dataset.id;

  console.log(bookId);

  const response = await fetch('/api/reading-list/add', {
    method: 'POST',
    body: JSON.stringify({ bookId }),
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    document.location.replace(`/books/${bookId}`);
  } else {
    alert('Something went wrong! Book could not be added to reading list.');
  }
};

const removeFromReadingList = async (event) => {
  event.preventDefault();

  const bookId = document.getElementById('selected-book').dataset.id;

  console.log(bookId);

  const response = await fetch('/api/reading-list/remove', {
    method: 'DELETE',
    body: JSON.stringify({ bookId }),
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    document.location.replace('/profile');
  } else {
    alert('Something went wrong! Book could not be removed from reading list.');
  }
};

addButton.addEventListener('click', addToReadingList);
removeButton.addEventListener('click', removeFromReadingList);
