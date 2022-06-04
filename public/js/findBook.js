window.onload = function () {
  const findBookForm = document.querySelector('.find-book-form');

  if (findBookForm) {
    findBookForm.addEventListener('submit', async function (event) {
      event.preventDefault();
      const titleElement = document.querySelector('.book-search-result .title');
      const author = document.querySelector('.book-search-result .author');
      const publicationYear = document.querySelector(
        '.book-search-result .publication_year'
      );
      try {
        const title = document.querySelector('.book_name').value;
        const { data } = await axios.post('/find', { title });
        if (data.title) {
          console.log({ data });
          titleElement.innerHTML = data.title;
          author.innerHTML = data.author;
          publicationYear.innerHTML = data.publication_year;
          document
            .querySelector('.book-search-result')
            .classList.remove('hide');
          document.querySelector('.message').classList.add('hide');
        } else {
          document.querySelector('.message').innerHTML =
            'No matching book found';
          document.querySelector('.message').classList.remove('hide');
          document.querySelector('.book-search-result').classList.add('hide');
        }
      } catch (error) {
        console.log(error);
      }
    });
  }
};
