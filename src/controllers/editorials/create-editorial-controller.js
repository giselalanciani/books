import { EditorialService } from "../../services/editorial-service";
import { errorHandler } from "../../utils/error-handler";

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
  }
  onClickCreateEditorialButton = () => {
    console.log("hizo click");
    if (this.sendEditorialData() === true) {
    } else {
      console.log("NO ENVIAMOS DATA");
    }
  };

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


