import { EditorialService } from "../../services/editorial-service";

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

    const editorialResponse = await this.editorialService.createEditorial(
      editorial
    );

    if (!editorialResponse.ok) {

      console.log("editorialResponse", editorialResponse);

      throw new Error("No se pudo crear su editorial");
    } else {
      alert("Editorial creada");
      window.location.href = "/editorials";
    }
  };
}
const createEditorialCtrl = new CreateEditorialController(
  new EditorialService()
);
