window.onload = () => {
    const booksForm = document.querySelector('.books-form');

   try {
    if(booksForm) {

        booksForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const age_for = document.querySelector('.age_type:checked');
            const titlesCount = parseInt(document.querySelector('.titles-count')?.value, 10);
            const genreInputList = document.querySelectorAll(".genres-list input[type='checkbox']");
            const searchResult = document.querySelector('.search-result');
            const searchResultData = document.querySelector('.search-result-data');
            const searchResultTable = document.querySelector('.search-result-table');
            const noResult = document.querySelector('.no-result');
            const errorMsg = document.querySelector('.error-msg');

            console.log({age_for});
            console.log({titlesCount});
            const selectedGenreIds = [];
            let hasGenreSelected = false;
            genreInputList.forEach(genre => {
                if(genre.checked) {
                    console.log({genre: +genre.value});
                    selectedGenreIds.push(+genre.value);
                    hasGenreSelected = true;
                }
            });


            if(!hasGenreSelected) {
                errorMsg.innerHTML = 'Please select at-least one Genre.';
                return;
            } else {
                errorMsg.innerHTML = '';
            }
            try {
                const {data} = await axios.post('/searchBooks', {
                    age_for: age_for.value,
                    titlesCount,
                    selectedGenreIds
                });
                console.log({data});
                if(data.length > 0) {
                    let content = '';
                    data.forEach(item => {
                        content += `
                        <tr>
                            <td>${item.title}</td>
                            <td>${item.author}</td>
                            <td>${item.genre_title}</td>
                            <td>${item.isbn}</td>
                            <td>${item.year}</td>
                            <td><a href="/viewBook/${item.bookId}">View</a></td>
                        </tr>
                        `;
                    });
                    searchResultData.innerHTML = content;
                    noResult.classList.add("hide");
                    searchResultTable.classList.remove("hide");
                } else {
                    searchResultTable.classList.add('hide');
                    noResult.classList.remove("hide");
                }
            } catch (error) {
                console.log(error);
            }
        })
    }
   } catch (error) {
       console.log('error2', error);
   }
}
