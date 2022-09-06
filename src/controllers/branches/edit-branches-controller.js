import { BranchService } from "../../services/branch-service";
import { configureValidator } from "../../utils/configureValidator";
import { errorHandler } from "../../utils/error-handler";
import { validateFieldRequired } from "../../utils/validateFieldRequired";

class EditBranchController {
  branchService;
  constructor(branchService) {
    this.branchService = branchService;
    const saveButton = document.getElementById("save-branch-button");
    saveButton.addEventListener("click", this.onClickSaveButton);

    configureValidator("branchname");
    configureValidator("city");
    configureValidator("street");
  }

  onClickSaveButton = async (event) => {
    if (this.validateEditBranchForm()) {
      try {
        const branchNameInput = document.querySelector("[name='branchname']");
        const cityInput = document.querySelector("[name='city']");
        const streetInput = document.querySelector("[name='street']");

        const branch = {
          name: branchNameInput.value,
          city: cityInput.value,
          street: streetInput.value,
          
        };

        const id = this.getQueryParams().id;

        await this.branchService.updateBranch(id, branch);
        alert("Los datos fueron guardados");
        window.location.href = "/branches";
      } catch (error) {
        errorHandler(
          "No pudo ser guardado correctamente, por favor intente nuevamente",
          error
        );
      }
    }
  }

  renderBranch(branchDataList) {
    const branchTemplate = document.getElementById("branch-template");

    for (let i = 0; i < branchDataList.length; i++) {
      const copyBranchTemplate = document.importNode(
        branchTemplate.content,
        true
      );
    }
  }
  getQueryParams() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    return params;
  }

  validateEditBranchForm() {
    let isFormValid = true;

    if (validateFieldRequired("branchname") === false) {
      isFormValid = false;
    }
    if (validateFieldRequired("city") === false) {
      isFormValid = false;
    }

    if (validateFieldRequired("street") === false) {
      isFormValid = false;
    }

    return isFormValid;
  }

  async init() {
    const params = this.getQueryParams();

    try {
      const branchData = await this.branchService.getBranch(params.id);

      this.renderBranch(branchData);

      const branchInput = document.querySelector("[name='branchname']");
      branchInput.value = branchData.name;
      const cityInput = document.querySelector("[name='city']");
      cityInput.value = branchData.city;
      const streetInput = document.querySelector("[name='street']");
      streetInput.value = branchData.street;
    } catch (error) {
      errorHandler("error al encontrar la data", error);
    } finally {
      this.removeActivityIndicationMessage();
    }
  }

  removeActivityIndicationMessage() {
    const waitingIndicationMessage = document.getElementById(
      "Activity-indication-message"
    );
    waitingIndicationMessage.remove();
  }
}
const editBranchCtrl = new EditBranchController(new BranchService());
editBranchCtrl.init();
