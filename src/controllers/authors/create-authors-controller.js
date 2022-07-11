import { AuthorsService } from "../../services/authors-service";
import { errorHandler } from "../../utils/error-handler";

class CreateAuthorsController {
  authorsService;
  constructor(authorsService) {
    this.authorsService = authorsService;

    const createAuthorButton = document.getElementById("create-author-button");
    createAuthorButton.addEventListener(
      "click",
      this.onClickCreateAuthorButton
    );
  }
  onClickCreateAuthorButton = () => {
    console.log("hizo click");
    if (this.sendAuthorsData() === true) {
    } else {
      console.log("NO ENVIAMOS DATA");
    }
  };

  sendAuthorsData = async () => {
    const authorNameInput = document.querySelector("[name='authorname']");

    const author = {
      name: authorNameInput.value,
    };

    try {
      await this.authorsService.createAuthor(author);
      alert("Autor creado");
      window.location.href = "/authors";      
    } catch (error) {
      errorHandler("No se pudo crear el autor, intente mas tarde.", error);
    }
  };
  
}

const createAuthorsCtrl = new CreateAuthorsController(new AuthorsService());
