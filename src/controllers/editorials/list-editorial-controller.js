import { EditorialService } from "../../services/editorial-service";

class ListEditorialController {
  editorialService;
  constructor(editorialService) {
    this.editorialService = editorialService;
    const createButton = document.getElementById("create-button");
    createButton.addEventListener("click", this.onClickCreateButton);
  }
  async init() {
    const responseEditorialsData = await this.editorialService.getEditorials();

    this.renderEditorials(responseEditorialsData);
  }

  renderEditorials(editorialsList) {
    const editorialTable = document.getElementById("editorial-table");
    const editorialRowTemplate = document.getElementById("editorial-row-template");

    console.log("editorialList", editorialsList);

    for (let i = 0; i < editorialsList.length; i++) {
      const copyRowTemplate = document.importNode(
        editorialRowTemplate.content,
        true
      );

      const nameInput = copyRowTemplate.querySelector("[name='name']");
      nameInput.textContent = editorialsList[i].name;

      const deleteEditorialButton = copyRowTemplate.querySelector(
        "[name='delete-editorial-button']"
      );

      deleteEditorialButton.setAttribute("data-name", editorialsList[i].name);
      deleteEditorialButton.addEventListener("click", this.onClickDeleteButton);

      editorialTable.append(copyRowTemplate);
    }

  }

  onClickCreateButton() {
    console.log("hizo click");
  }

  onClickDeleteButton() {
  }
}

const listEditorialCtrl = new ListEditorialController(new EditorialService());
listEditorialCtrl.init();
