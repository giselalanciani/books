
/**
 * Que debe hacer:
 *  1) Cuando la pagina inicia.
 *    1.a) Debe pedir los datos a la API.
 *    1.b) Debemos renderizar los datos dentro de la tabla. (cada item del array es un tr en la tabla)
 *        1.b.1) TIP: debemos loopear los datos, crear un template de tr,
 *              - en cada iteracion hacer una copia de ese template.
 *              - hacer los reemplazos de los datos en cada columna de ese tr
 *              - hacer un append, dentro de la tabla
 * 
 * 
 * 
 */
class ListBooksController {
  constructor() {
    const createButton = document.getElementById("create-button");
    createButton.addEventListener("click", this.onClickCreateButton);
  }
  onClickCreateButton = () => {
    window.location.href = "/books/create";
  };

  async init () {
    const data = await this.getBooksData();
    this.renderBooks(data);
  }

  async getBooksData () {
    const response = await fetch(`http://localhost:3000/api/book`);
    if (!response.ok) {
      throw new Error("Failed to fetch from dogs API.");
    }
    return await response.json();
  }


  renderBooks(booksData) {
    const bookTable = document.getElementById("books-table");
    const bookRowTemplate = document.getElementById("book-row-template");

    console.log("booksData",booksData );

    for (let i = 0; i < booksData.length; i++) {

      const copyRowTemplate = document.importNode(
        bookRowTemplate.content,
        true
      );
      copyRowTemplate.querySelectorAll(
        "td"
      )[0].textContent = `${booksData[i].name}`;

      copyRowTemplate.querySelectorAll(
        "td"
      )[1].textContent = `${booksData[i].year}`;

      const editBookButton = copyRowTemplate.querySelector(
        "[name='edit-book-button']"
      );
      editBookButton.setAttribute("data-id", booksData[i].id);
      editBookButton.addEventListener("click", this.onClickEditButton);

      const deleteBookButton = copyRowTemplate.querySelector(
        "[name='delete-book-button']"
      );
      deleteBookButton.setAttribute("data-id", booksData[i].id);
      deleteBookButton.setAttribute("data-name", booksData[i].name);
      deleteBookButton.addEventListener("click", this.onClickDeleteButton);


      bookTable.append(copyRowTemplate);
    
    }
  }
}
const booksCtrl = new ListBooksController();
booksCtrl.init();
