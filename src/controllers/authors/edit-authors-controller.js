import { AuthorsService } from "../../services/authors-service";
import { errorHandler } from "../../utils/error-handler";

class EditAuthorsController {
  authorService;
  constructor(authorService) {
    this.authorService = authorService;

    const saveButton = document.getElementById("save-author-button");
    saveButton.addEventListener("click", this.onClickSaveButton);
  }

  getQueryParams() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    return params;
  }

  onClickSaveButton = async (event) => {
    const authorInput = document.querySelector("[name='authorname']");

    const author = {
      name: authorInput.value,
    };

    const id = this.getQueryParams().id;

    try {
      const updateAuthorResponseData = await this.authorService.updateAuthor(
        id,
        author
      );
      alert("Su autor fue guardado correctamente");
      window.location.href = "/authors";
    } catch (error) {
      errorHandler("No se pudo guardar autor");
    }
  };

  async init() {
    const params = this.getQueryParams();
    const id = params.id;

    try {
      const authorData = await this.authorService.getAuthor(id);      
      
      const authorInput = document.querySelector("[name='authorname']");
      authorInput.value = authorData.name;

    } catch (error) {
      errorHandler(
        "No se pudo traer la informacion de autor, intente mas tarde",
        error
      );
    }
  }
}
const editAuthorsCtrl = new EditAuthorsController(new AuthorsService());
editAuthorsCtrl.init();
