const createBook = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#title-input').value;
  const author = document.querySelector('#author-input').value;
  const genre = document.querySelector('#genre-input').value;

  const response = await fetch('/api/book/new', {
    method: 'POST',
    body: JSON.stringify({ title, author, genre }),
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    document.location.replace('/book');
  } else {
    alert(
      'Failed to share book to Book Nest. Remember to add title, author and genre'
    );
  }
};

document.querySelector('#new-book-form').addEventListener('submit', createBook);
