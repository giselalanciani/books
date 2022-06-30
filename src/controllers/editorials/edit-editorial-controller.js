import { BookService } from "../../services/book-service";

class EditEditorialController {
  constructor(bookService) {
    this.bookService = bookService;

    console.log("edit editorial controller");

    const saveButton = document.getElementById("save-editorial-button");
    saveButton.addEventListener("click", this.onClickSaveButton);
  }

  getQueryParams() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    return params;
  }

  onClickSaveButton = async (event) =>{
    const editorialNameInput = document.querySelector("[name='editorialname']");

    console.log("editorial guardada");
  }

renderEditorial () {
    const editorialSelect = document.getElementById("editorialname");
}

init(){

};

}
const editEditorialCtrl = new EditEditorialController(new BookService());
editEditorialCtrl.init();
