const updateBookFormHandler = async (event) => {
  event.preventDefault();

  // Get book id from end of the URL
  const bookId = window.location.href.split('/').pop();

  const title = document.querySelector('#title-input').value;
  const author = document.querySelector('#author-input').value;
  const genre = document.querySelector('#genre-input').value;

  const response = await fetch('/api/book/' + bookId, {
    method: 'PUT',
    body: JSON.stringify({ title, author, genre }),
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    document.location.replace('/profile');
  } else {
    alert('Failed to update your book');
  }
};

document
  .querySelector('#book-update-form')
  .addEventListener('submit', updateBookFormHandler);

const deleteBookHandler = async (event) => {
  event.preventDefault();

  const bookId = window.location.href.split('/').pop();

  const response = await fetch('/api/book/' + bookId, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    document.location.replace('/profile');
  } else {
    alert('Unable to delete book');
  }
};

document
  .querySelector('#delete-button')
  .addEventListener('click', deleteBookHandler);
