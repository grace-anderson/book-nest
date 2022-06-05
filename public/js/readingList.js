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
    document.location.replace(`/book/${bookId}`);
  } else {
    alert('something went wrong');
  }
};

document
  .getElementById('add-to-reading-list')
  .addEventListener('click', addToReadingList);
