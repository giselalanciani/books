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
  constructor() {
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

  async init() {  
    const authorsData = await this.getAuthors();
    const editorialsData = await this.getEditorials();
    
    this.renderEditorials(editorialsData);
    this.renderAuthors(authorsData);
  }

  async getAuthors () {
    const bookAuthors = await fetch("http://localhost:3000/api/author", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const content = await bookAuthors.json();

    return content;
  }

  async getEditorials () {
    const bookEditorial = await fetch("http://localhost:3000/api/editorial", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const content = await bookEditorial.json();

    return content;
  }

  sendData = async () => {
    console.log("enviamos la informacion");

    const bookName = document.querySelector("[name='bookname']");
    const bookYear = document.querySelector("[name='year']");
    const authorsSelector = document.querySelector("[name='authors']");
    const editorialSelector = document.querySelector("[name='editorial']");

    const rawResponse = await fetch("http://localhost:3000/api/book", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: bookName.value,
        year: bookYear.value,
        author: authorsSelector.value,
        editorial: editorialSelector.value,
      }),
    });
    const content = await rawResponse.json();

    console.log(content);
    alert("Libro creado");
    window.location.href = "/books";
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

    const editorialTemplate = document.getElementById(
      "editorial-template"
    );

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

const createCtrl = new CreateBooksController();
createCtrl.init();
