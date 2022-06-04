const createBook = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#title-input').value.trim();
  const author = document.querySelector('#author-input').value.trim();
  const publicationYear = document
    .querySelector('#publication-input')
    .value.trim();
  const genreSelect = document.querySelector('#genre-input');
  var genreValue = genreSelect.options[genreSelect.selectedIndex].value;

  console.log(genreValue); // en

  console.log(title, author, publicationYear, genreValue);

  if (!title || !author || !publicationYear || !genreValue) {
    alert('Please fill in all fields to share your book.');
    return;
  }

  if (title && author && publicationYear && genreValue) {
    const response = await fetch('/api/books', {
      method: 'POST',
      body: JSON.stringify({ title, author, publicationYear, genreValue }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(
        'Failed to share your book to Book Nest. Did you add your title, author and genre'
      );
    }
  }
};

document
  .querySelector('#share-book-form')
  .addEventListener('submit', createBook);
