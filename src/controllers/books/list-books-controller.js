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

  onClickDeleteButton = async (event) => {
    if (
      confirm(
        `Quiere eliminar su libro: ${event.target.getAttribute("data-name")} ?`
      ) == true
    ) {
      const deleteResponse = await fetch(
        `http://localhost:3000/api/book/${event.target.getAttribute(
          "data-id"
        )}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (!deleteResponse.ok) {
        throw new Error("No se pudo eliminar su libro");
      } else {
        alert("El libro fue eliminado exitosamente!");
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

  }

  async init() {
    const data = await this.getBooksData();
    this.removeWaitingMessageRow();
    this.renderBooks(data);
  }

  async getBooksData() {
    const response = await fetch(`http://localhost:3000/api/book`);
    if (!response.ok) {
      throw new Error("Failed to fetch from book API.");
    }
    return await response.json();
  }

  removeWaitingMessageRow() {
    const waitingMessageRow = document.getElementById("waiting-message-row");
    waitingMessageRow.remove();
  }

  renderBooks(booksData) {
    const bookTable = document.getElementById("books-table");
    const bookRowTemplate = document.getElementById("book-row-template");

    console.log("booksData", booksData);

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
