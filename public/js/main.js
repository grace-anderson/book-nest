const content = document.querySelector(".pillarsOfContent");
const VOTUF_Pillars = document.querySelectorAll(".sideArticleNav");

// const btns = document.querySelectorAll(".btn");

if(content) {
    content.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      //   console.log(id);
      if (id) {
        VOTUF_Pillars.forEach((VOTUF_Pillars) => {
          VOTUF_Pillars.classList.remove("active");
        });
    
        const element = document.getElementById(id);
        element.classList.add("active");
      }
    });
}