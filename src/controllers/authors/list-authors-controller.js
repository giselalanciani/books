import { AuthorsService } from "../../services/authors-service";
import { errorHandler } from "../../utils/error-handler";

class ListAuthorsController {
  authorsService;
  constructor(authorsService) {
    this.authorsService = authorsService;

    const createButton = document.getElementById("create-button");
    createButton.addEventListener("click", this.onClickCreateButton);
  }

  async init() {
    try {
      const responseAuthorsData = await this.authorsService.getAuthors();
      this.renderAuthors(responseAuthorsData);
    } catch (error) {
      errorHandler(
        "No se pudieron cargar los datos de los autores, intentente mas tarde",
        error
      );
    }
  }

  renderAuthors(authorsList) {
    const authorTable = document.getElementById("author-table");
    const authorRowTemplate = document.getElementById("author-row-template");

    for (let i = 0; i < authorsList.length; i++) {
      const copyRowTemplate = document.importNode(
        authorRowTemplate.content,
        true
      );

      const authorNameInput = copyRowTemplate.querySelector("[name='name']");
      authorNameInput.textContent = authorsList[i].name;

      const editAuthorButton = copyRowTemplate.querySelector(
        "[name='edit-author-button']"
      );
      editAuthorButton.setAttribute("data-id", authorsList[i].id);
      editAuthorButton.addEventListener("click", this.onClickEditButton);

      const deleteAuthorButton = copyRowTemplate.querySelector(
        "[name='delete-author-button']"
      );
      deleteAuthorButton.setAttribute("data-id", authorsList[i].id);
      deleteAuthorButton.addEventListener("click", this.onClickDeleteButton);

      authorTable.append(copyRowTemplate);
    }
  }

  onClickCreateButton() {
    window.location.href = "/authors/create";
  }

  onClickEditButton = (event) => {
    const id = event.target.getAttribute("data-id");
    window.location.href = `http://localhost:8080/authors/edit/?id=${id}`;
  };

  onClickDeleteButton = async (event) => {
    const id = event.target.getAttribute("data-id");
    try {
      await this.authorsService.deleteAuthor(id);
      alert("Autor eliminado");
      window.location.href = "/authors";
    } catch (error) {
      errorHandler("No se pudo eliminar el autor, intente mas tarde.", error);
    }
  };
}

const listAuthorsCtrl = new ListAuthorsController(new AuthorsService());
listAuthorsCtrl.init();
