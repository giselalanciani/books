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

  sendData = async () => {
    console.log("enviamos la informacion");

    const bookName = document.querySelector("[name='bookname']");
    const bookYear = document.querySelector("[name='year']");

    const rawResponse = await fetch("http://localhost:3000/api/book", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: bookName.value, year: bookYear.value }),
    });
    const content = await rawResponse.json();

    console.log(content);
    alert("Libro creado");
    window.location.href = "/books";
  };
}

const createCtrl = new CreateBooksController();
