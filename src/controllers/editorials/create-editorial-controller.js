import { EditorialService } from "../../services/editorial-service";
import { configureValidator } from "../../utils/configureValidator";
import { errorHandler } from "../../utils/error-handler";
import { validateFieldRequired } from "../../utils/validateFieldRequired";

class CreateEditorialController {
  editorialService;

  constructor(editorialService) {
    this.editorialService = editorialService;
    const createEditorialButton = document.getElementById(
      "create-editorial-button"
    );
    createEditorialButton.addEventListener(
      "click",
      this.onClickCreateEditorialButton
    );

    configureValidator("editorialname");
  }
  onClickCreateEditorialButton = () => {
    if (this.validateCreateEditorialForm() === true) {
    console.log("hizo click");
    if (this.sendEditorialData() === true) {
    } else {
      console.log("NO ENVIAMOS DATA");
    }
  }
  };

  validateCreateEditorialForm() {
    let isFormValid = true;

    if (validateFieldRequired("editorialname") === false) {
      isFormValid = false;
    }

    return isFormValid;
  }

  sendEditorialData = async () => {
    const editorialNameInput = document.querySelector("[name='editorialname']");

    const editorial = {
      name: editorialNameInput.value,
    };

    try {
      await this.editorialService.createEditorial(editorial);
      alert("Editorial creada");
      window.location.href = "/editorials";
    } catch (error) {
      errorHandler("No se pudo crear su editorial, intente mas tarde.", error);
    }
  };

  renderCreateEditorial(editorialDataList) {
    const editorialCreateSelect = document.getElementById("editorialname");

    const editorialCreateTemplate = document.getElementById(
      "editorial-create-template"
    );

    for (let i = 0; i < editorialDataList.length; i++) {
      const copyEditorialCreateTemplate = document.importNode(
        editorialCreateTemplate.content,
        true
      );
    }
  }
}

const createEditorialCtrl = new CreateEditorialController(
  new EditorialService()
);
