window.onload = () => {
    const findBookForm = document.querySelector('.find-book-form');
    try {
        if(findBookForm) {
            findBookForm.addEventListener('submit', async (event) => {
                event.preventDefault();
                const errorMsg = document.querySelector('.error-msg');
                const title = document.querySelector('.search-input');
                const value = title.value;
    
                if(value.trim() === '') {
                    errorMsg.innerHTML = "Please enter text to search.";
                    return;
                }
    
               try {
                const {data} = await axios.post('/findBook', {title});
                console.log({data});
               } catch (error) {
                   console.log(error);
               }
            })
        }
    } catch (error) {
        console.log('error1', error);
    }

}
