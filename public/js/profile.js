let books = document.querySelectorAll('.card');

// Listen for clicks on book card
books.forEach((item) =>
  item.addEventListener('click', function (event) {
    if (event.currentTarget.classList.contains('card')) {
      // get book id from clicked card
      let clickedId = event.currentTarget.dataset.id;
      document.location.replace('/book-update/' + clickedId);
    }
  })
);
