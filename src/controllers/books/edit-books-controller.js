import { AuthorsService } from "../../services/authors-service";
import { BookService } from "../../services/book-service";
import { EditorialService } from "../../services/editorial-service";
import { errorHandler } from "../../utils/error-handler";

class EditBooksController {
  editorialService;
  authorsService;
  bookService;

  constructor(editorialService, authorsService, bookService) {
    this.editorialService = editorialService;
    this.authorsService = authorsService;
    this.bookService = bookService;

    const saveButton = document.getElementById("save-book-button");
    saveButton.addEventListener("click", this.onClickSaveButton);
  }

  getQueryParams() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    return params;
  }

  onClickSaveButton = async (event) => {
    try {
      const bookNameInput = document.querySelector("[name='bookname']");
      const bookYearInput = document.querySelector("[name='year']");
      const authorsSelectorInput = document.querySelector("[name='authors']");
      const editorialSelectorInput =
        document.querySelector("[name='editorial']");

      const book = {
        name: bookNameInput.value,
        year: bookYearInput.value,
        author: authorsSelectorInput.value,
        editorial: editorialSelectorInput.value,
      };

      const id = this.getQueryParams().id;

      await this.bookService.updateBook(id, book);
      alert('Los datos fueron guardados');
      window.location.href = "/books";
    } catch (error) {
      errorHandler(
        "Su libro no pudo ser guardado correctamente, por favor intente nuevamente",
        error
      );
    }
  };

  renderAuthors(authorsDataList) {
    const authorsSelect = document.getElementById("authors");

    const authorOptionTemplate = document.getElementById(
      "author-option-template"
    );

    for (let i = 0; i < authorsDataList.length; i++) {
      const copyAuthorOptionTemplate = document.importNode(
        authorOptionTemplate.content,
        true
      );

      const newAuthorOption = copyAuthorOptionTemplate.querySelector("option");

      newAuthorOption.textContent = `${authorsDataList[i].name}`;
      newAuthorOption.setAttribute("value", `${authorsDataList[i].name}`);

      authorsSelect.append(newAuthorOption);
    }
  }

  renderEditorials(editorialDataList) {
    const editorialSelect = document.getElementById("editorial");

    const editorialTemplate = document.getElementById("editorial-template");

    for (let i = 0; i < editorialDataList.length; i++) {
      const copyEditorialTemplate = document.importNode(
        editorialTemplate.content,
        true
      );

      const newEditorialOption = copyEditorialTemplate.querySelector("option");

      newEditorialOption.textContent = `${editorialDataList[i].name}`;
      newEditorialOption.setAttribute("value", `${editorialDataList[i].id}`);

      editorialSelect.append(newEditorialOption);
    }
  }

  async init() {
    const params = this.getQueryParams();

    try {
      const bookData = await this.bookService.getBook(params.id);
      const authorsData = await this.authorsService.getAuthors();
      const editoriasData = await this.editorialService.getEditorials();

      this.renderAuthors(authorsData);
      this.renderEditorials(editoriasData);

      const bookInput = document.querySelector("[name='bookname']");
      bookInput.value = bookData.name;
      const yearInput = document.querySelector("[name='year']");
      yearInput.value = bookData.year;
      const authorsSelect = document.querySelector("[name='authors']");
      authorsSelect.value = bookData.author;
      const editorialSelect = document.querySelector("[name='editorial']");
      editorialSelect.value = bookData.editorial;
      
    } catch (error) {
      errorHandler("error al encontrar la data", error);
    } finally {
      this.removeActivityIndicationMessage();
    }        
  }

  removeActivityIndicationMessage() {
    const waitingIndicationMessage = document.getElementById(
      "Activity-indication-message"
    );
    waitingIndicationMessage.remove();

    const editBookForm = document.querySelector("[name='edit-book-form']");
    editBookForm.setAttribute("class", "");
  }
}

const editCtrl = new EditBooksController(
  new EditorialService(),
  new AuthorsService(),
  new BookService()
);
editCtrl.init();
