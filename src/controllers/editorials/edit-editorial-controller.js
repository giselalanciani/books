import { EditorialService } from "../../services/editorial-service";
import { errorHandler } from "../../utils/error-handler";

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
      const updateEditorialResponseData =
        await this.editorialService.updateEditorial(id, editorial);
      alert("Su libro fue guardado correctamente");
      window.location.href = "/editorials";
    } catch (error) {
      errorHandler("No se pudo guardar su libro", error);
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
    try {
      const editorialData = await this.editorialService.getEditorial(params.id);
      this.renderEditorial(editorialData);

      const editorialInput = document.querySelector("[name='editorialname']");
      editorialInput.value = editorialData.name;
    } catch (error) {
      errorHandler("Error en la busqueda,vualva a intentarlo luego", error);
    }
  }
}
const editEditorialCtrl = new EditEditorialController(new EditorialService());
editEditorialCtrl.init();
