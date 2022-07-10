import { EditorialService } from "../../services/editorial-service";
import { BookService } from "../../services/book-service";

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
 *  2) cuando apreta el boton de crear:
 *    2.a) redirecciona a la pagina de crear Libro
 * 
 *  3) Cunado apreta el botn de editar:
 *    3.a ) redirecciona a la pantalla de editar libro
 * 
 *  4) Cuando apreta en boton eliminar
 *    4.a) Pregunta al usuario confirmacion
 *    4.b ) Si elije OK -> eleminia el Book 
 *      4.b.1) luego refresca la pantalla para mostrar los datos actualizado  
 *
 */
class ListBooksController {
  editorialService;
  bookService;

  constructor(editorialService, bookService) {
    this.editorialService = editorialService;
    this.bookService = bookService;

    const createButton = document.getElementById("create-button");
    createButton.addEventListener("click", this.onClickCreateButton);
  }

  onClickCreateButton = () => {
    window.location.href = "/books/create";
  };

  onClickDeleteButton = async (event) => {
    if (
      confirm(
        `Quiere eliminar su libro: ${event.target.getAttribute("data-name")} ?`
      ) == true
    ) {
      const idToDelete = event.target.getAttribute("data-id");

      const deleteResponse = await this.bookService.deleteBook(idToDelete);
      
      if (!deleteResponse.ok) {
        throw new Error("No se pudo eliminar su libro");
      } else {
        // alert("El libro fue eliminado exitosamente!");
        window.location.href = "http://localhost:8080/books/";
      }
    } else {
      console.log("You canceled!");
    }
  };

  onClickEditButton = async (event) => {
    console.log(
      "el nombre de su libro es: ",
      event.target.getAttribute("data-id"),
      event.type
    );
    window.location.href = `http://localhost:8080/books/edit/?id=${event.target.getAttribute(
      "data-id"
    )}`;
  };

  async init() {
    const booksDataList = await this.bookService.getBooks();
    if (booksDataList.length === 0) {
      const elementNoBooksAvailableMessage = document.querySelector(
        "#no-books-available"
      );
      elementNoBooksAvailableMessage.setAttribute("class", "");
    }
    this.removeWaitingMessageRow();
    const editorialsData = await this.editorialService.getEditorials();
    this.renderBooks(booksDataList, editorialsData);
  }

  removeWaitingMessageRow() {
    const waitingMessageRow = document.getElementById("waiting-message-row");
    waitingMessageRow.remove();
  }

  renderBooks(booksData, editorialsData) {
    const bookTable = document.getElementById("books-table");
    const bookRowTemplate = document.getElementById("book-row-template");

    console.log("booksData", booksData);

    for (let i = 0; i < booksData.length; i++) {
      const copyRowTemplate = document.importNode(
        bookRowTemplate.content,
        true
      );
      const nameInput = copyRowTemplate.querySelector("[name='name']");
      nameInput.textContent = booksData[i].name;

      const yearInput = copyRowTemplate.querySelector("[name='year']");
      yearInput.textContent = booksData[i].year;

      const authorInput = copyRowTemplate.querySelector("[name='author']");
      authorInput.textContent = booksData[i].author;

      const editorialInput =
        copyRowTemplate.querySelector("[name='editorial']");
      editorialInput.textContent = booksData[i].editorial;      

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
const booksCtrl = new ListBooksController(
  new EditorialService(),
  new BookService()
);
booksCtrl.init();
