import { BookService } from "../../services/book-service";
import { EditorialService } from "../../services/editorial-service";
import { errorHandler } from "../../utils/error-handler";

class ListEditorialController {
  editorialService;
  bookService;
  constructor(editorialService, bookService) {
    this.editorialService = editorialService;
    this.bookService = bookService;

    const createButton = document.getElementById("create-button");
    createButton.addEventListener("click", this.onClickCreateButton);
  }
  async init() {
    const responseEditorialsData = await this.editorialService.getEditorials();

    this.renderEditorials(responseEditorialsData);
  }

  renderEditorials(editorialsList) {
    const editorialTable = document.getElementById("editorial-table");
    const editorialRowTemplate = document.getElementById(
      "editorial-row-template"
    );

    console.log("editorialList", editorialsList);

    for (let i = 0; i < editorialsList.length; i++) {
      const copyRowTemplate = document.importNode(
        editorialRowTemplate.content,
        true
      );

      const nameInput = copyRowTemplate.querySelector("[name='name']");
      nameInput.textContent = editorialsList[i].name;

      const editEditorialButton = copyRowTemplate.querySelector(
        "[name='edit-editorial-button']"
      );
      editEditorialButton.setAttribute("data-id", editorialsList[i].id);
      editEditorialButton.addEventListener("click", this.onClickEditButton);

      const deleteEditorialButton = copyRowTemplate.querySelector(
        "[name='delete-editorial-button']"
      );

      deleteEditorialButton.setAttribute("data-id", editorialsList[i].id);
      deleteEditorialButton.addEventListener("click", this.onClickDeleteButton);

      editorialTable.append(copyRowTemplate);
    }
  }

  onClickCreateButton() {
    window.location.href = "/editorials/create";
  }

  onClickEditButton = (event) => {
    console.log(
      "La editorial es: ",
      event.target.getAttribute("data-id"),
      event.type
    );
    window.location.href = `http://localhost:8080/editorials/edit/?id=${event.target.getAttribute(
      "data-id"
    )}`;
  };

  onClickDeleteButton = async (event) => {
    const id = event.target.getAttribute("data-id");
    
    try {
      await this.editorialService.deleteEditorial(id);
      alert("Editorial eliminada");
      window.location.href = "/editorials";
    } catch (error) {
      errorHandler(
        "No se pudo eliminar su editorial, intente mas tarde.",
        error
      );
    }
  };
}

const listEditorialCtrl = new ListEditorialController(
  new EditorialService(),
  new BookService()
);
listEditorialCtrl.init();
