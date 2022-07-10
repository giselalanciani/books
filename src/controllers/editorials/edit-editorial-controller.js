import { EditorialService } from "../../services/editorial-service";

class EditEditorialController {
  constructor(editorialService) {
    this.editorialService = editorialService;

    console.log("edit editorial controller");

    const saveButton = document.getElementById("save-editorial-button");
    saveButton.addEventListener("click", this.onClickSaveButton);
  }

  getQueryParams() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    return params;
  }

  onClickSaveButton = async (event) => {
    const editorialInput = document.querySelector("[name='editorialname']");

    const editorial = {
      name: editorialInput.value,
    };

    const id = this.getQueryParams().id;

    try {
      const updateEditorialResponseData = await this.editorialService.updateEditorial(
        id,
        editorial
      );
      alert("Su libro fue guardado correctamente");
      window.location.href = "/editorials";
    } catch (error) {
      throw new Error("No se pudo guardar su libro");
    }

  };

  renderEditorial(editorialDataList) {
    const editorialSelect = document.getElementById("editorialname");

    const editorialTemplate = document.getElementById("editorial-template");

    for (let i = 0; i < editorialDataList.length; i++) {
      const copyEditorialTemplate = document.importNode(
        editorialTemplate.content,
        true
      );
    }
  }

  async init() {
    const params = this.getQueryParams();

    const editorialData = await this.editorialService.getEditorial(params.id);
    console.log("editorial data");

    this.renderEditorial(editorialData);

    const editorialInput = document.querySelector("[name='editorialname']");
    editorialInput.value = editorialData.name;
  }
}
const editEditorialCtrl = new EditEditorialController(new EditorialService());
editEditorialCtrl.init();
