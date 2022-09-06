import { BranchService } from "../../services/branch-service";
import { CountryServices } from "../../services/country-service";
import { StateService } from "../../services/states-service";
import { errorHandler } from "../../utils/error-handler";

class ListBranchesController {
  branchService;
  countryService;
  stateService;
  constructor(countryService, stateService, branchService) {
    this.countryService = countryService;
    this.stateService = stateService;
    this.branchService = branchService;

    const createButton = document.getElementById("create-button");
    createButton.addEventListener("click", this.onClickCreateButton);
  }

  onClickCreateButton = () => {
    window.location.href = "/branches/create";
  };

  onClickEditButton = async (event) => {
    console.log(
      "el nombre de su libro es: ",
      event.target.getAttribute("data-id"),
      event.type
    );
    window.location.href = `http://localhost:8080/branches/edit/?id=${event.target.getAttribute(
      "data-id"
    )}`;
  };

  onClickDeleteButton = async (event) => {
    if (
      confirm(
        `Quiere eliminar el branch creado: ${event.target.getAttribute("data-name")} ?`
      ) == true
    )
      try {
        const idToDelete = event.target.getAttribute("data-id");
        await this.branchService.deleteBranch(idToDelete);
        window.location.href = "http://localhost:8080/branches/";
      } catch (error) {
        errorHandler("No se pudo eliminar el branch", error);
      }
  };

  renderBranch(branchData) {
    const branchTable = document.getElementById("branches-table");
    const branchRowTemplate = document.getElementById("branches-row-template");

    for (let i = 0; i < branchData.length; i++) {
      const copyRowTemplate = document.importNode(
        branchRowTemplate.content,
        true
      );
      const nameInput = copyRowTemplate.querySelector("[name='name']");
      nameInput.textContent = branchData[i].name;

      const cityInput = copyRowTemplate.querySelector("[name='city']");
      cityInput.textContent = branchData[i].city;

      const streetInput = copyRowTemplate.querySelector("[name='street']");
      streetInput.textContent = branchData[i].street;

      const editBranchButton = copyRowTemplate.querySelector(
        "[name='edit-branches-button']"
      );
      editBranchButton.setAttribute("data-id", branchData[i].id);
      editBranchButton.addEventListener("click", this.onClickEditButton);

      const deleteBranchButton = copyRowTemplate.querySelector(
        "[name='delete-branches-button']"
      );
      deleteBranchButton.setAttribute("data-id", branchData[i].id);
      deleteBranchButton.setAttribute("data-name", branchData[i].name);
      deleteBranchButton.addEventListener("click", this.onClickDeleteButton);

      branchTable.append(copyRowTemplate);
    }
  }

  async init() {
    try {
      const branchDataList = await this.branchService.getBranches();

      if (branchDataList.length === 0) {
        const elementNoBranchesAvailableMessage = document.querySelector(
          "#no-branches-available"
        );
        elementNoBranchesAvailableMessage.setAttribute("class", "");
      }

      this.renderBranch(branchDataList);

      this.removeWaitingMessageRow();
    } catch (error) {
      errorHandler("No podemos encontrar los datos, intente nuevamente", error);
    }
  }

  removeWaitingMessageRow() {
    const waitingMessageRow = document.getElementById("waiting-message-row");
    waitingMessageRow.remove();
  }
}

const listBranchesController = new ListBranchesController(
  new CountryServices(),
  new StateService(),
  new BranchService()
);
listBranchesController.init();
