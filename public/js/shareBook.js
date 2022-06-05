// GET DOM ELEMENTS
const shareBookForm = document.querySelector('#share-book-form');

// SHARE BOOK FORM HANDLER
const shareBook = async (event) => {
  event.preventDefault();

  // get all necessary details from form
  const title = document.querySelector('#title-input').value.trim();
  const author = document.querySelector('#author-input').value.trim();
  const publicationYear = document
    .querySelector('#publication-input')
    .value.trim();

  // get the genres out of the dropdown menu
  const genreSelect = document.querySelector('#genre-input');
  const genreValue = genreSelect.options[genreSelect.selectedIndex].value;

  parseInt(publicationYear);

  if (!publicationYear) {
    alert(
      'The publication year must be a number. If the year is unknown, input 0.'
    );
    return;
  }

  // error msg if any field is blank
  if (!title || !author || !publicationYear || !genreValue) {
    alert('Please make sure to fill in all form fields.');
    return;
  }

  // send post request if all fields are good
  if (title && author && publicationYear && genreValue) {
    const response = await fetch('/api/books', {
      method: 'POST',
      body: JSON.stringify({ title, author, publicationYear, genreValue }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      alert('Thank you for sharing a book to Book Nest!');
      document.location.replace('/profile');
    } else {
      alert('Book could not be shared to Book Nest.');
    }
  }
};

// EVENT LISTENERS
shareBookForm.addEventListener('submit', shareBook);
