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

  

 
}

const listBranchesController = new ListBranchesController(
  new CountryServices(),
  new StateService(),
  new BranchService()
);

