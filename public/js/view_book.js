window.onload = function() {
    const addBtn = document.querySelector('.add-to-read-list');
    if(addBtn) {
        addBtn.addEventListener('click', () => {
            const successMsg = document.querySelector('.success-msg');
            const errorMsg = document.querySelector('.error-msg');
            const bookId = addBtn.getAttribute("data-book-id");
            console.log({bookId});
            axios.post(`/addToReadingList/1/${bookId}`).then((res) => {
                console.log({res}, {data:res.data});
               errorMsg.innerHTML = '';
               if(res.data) {
                   successMsg.innerHTML = res.data;
               } else {
                   successMsg.innerHTML = "Book added to reading list";
               }
            }).catch(err => {
                console.log(err);
                errorMsg.innerHTML = "Error while adding book to reading list";
                successMsg.innerHTML = '';
            });

        })
    }
}