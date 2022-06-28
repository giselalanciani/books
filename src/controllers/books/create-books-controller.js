import { AuthorsService } from "../../services/authors-service";
import { BookService } from "../../services/book-service";
import { EditorialService } from "../../services/editorial-service";

/**
 * 1) El boton salvar
 *      Al hacer click ->
 *          1) Validacion
 *              1) Debe hacer un POST a la API de books
 *              2) Muestra un alert con un mejaje que diga "Se guardo el libro".
 *              3) Debe redireccionar a la location de /books
 *          2) Si la validacion no es correcta
 *              1) muestra un mejs con el error.
 *
 * 1.b Cómo?
 *      1) Buscamos un boton por su nombre con document.querySelector()  "click"
 *      2) A ese boton encontrado, le asignamos una funcion de event Handler
 *          2.1) esta funcion, va a ser un methodo de la clase controller
 *          2.2) Meter un console log para saber que funciona.
 *
 *
 *
 *
 *
 */
class CreateBooksController {
  editorialsService;
  authorsService;
  bookService;

  constructor(editorialsService, authorsService, bookService) {
    this.editorialsService = editorialsService;
    this.authorsService = authorsService;
    this.bookService = bookService;

    const createBookButton = document.getElementById("create-book-button");
    createBookButton.addEventListener("click", this.onClickCreateBookButton);
  }

  onClickCreateBookButton = () => {
    console.log("hizo click");
    if (this.sendData() === true) {
    } else {
      console.log("NO ENVIAMOS DATA");
    }
  };

  sendData = async () => {
    console.log("enviamos la informacion");

    const bookNameInput = document.querySelector("[name='bookname']");
    const bookYearInput = document.querySelector("[name='year']");
    const authorSelector = document.querySelector("[name='authors']");
    const editorialSelector = document.querySelector("[name='editorial']");

    const book = {
      name: bookNameInput.value,
      year: bookYearInput.value,
      author: authorSelector.value,
      editorial: editorialSelector.value,
    };

    const createResponse = await this.bookService.createBook(book);

    if (!createResponse.ok) {
      throw new Error("No se pudo craer su libro");
    } else {
      alert("Libro creado");
      window.location.href = "/books";
    }
  };

  async init() {
    const editorialsData = await this.editorialsService.getEditorials();
    const authorsData = await this.authorsService.getAuthors();

    this.renderEditorials(editorialsData);
    this.renderAuthors(authorsData);
  }

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
}

const createCtrl = new CreateBooksController(
  new EditorialService(),
  new AuthorsService(),
  new BookService()
);
createCtrl.init();
