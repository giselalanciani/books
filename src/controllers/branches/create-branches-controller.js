import { BranchService } from "../../services/branch-service";
import { CountryServices } from "../../services/country-service";
import { StateService } from "../../services/states-service";
import { configureValidator } from "../../utils/configureValidator";
import { errorHandler } from "../../utils/error-handler";
import { validateFieldRequired } from "../../utils/validateFieldRequired";

class CreateBrunchesController {
  branchService;
  countryService;
  stateService;
  constructor(countryService, stateService, branchService) {
    this.countryService = countryService;
    this.stateService = stateService;
    this.branchService = branchService;

    const createBrunchButton = document.getElementById("create-branch-button");
    createBrunchButton.addEventListener(
      "click",
      this.onClickCreateBrunchButton
    );

    const countrySelect = document.getElementById("country");
    countrySelect.addEventListener("change", this.onChangeCountrySelect);

    configureValidator("branchname");
    configureValidator("country");
    configureValidator("state");
    configureValidator("city");
    configureValidator("street");
  }

  onClickCreateBrunchButton = () => {
    if (this.validateCreateBranchesForm() === true) {
      this.sendBranchData();
    }
    window.location.href = "/branches/";
  };

  validateCreateBranchesForm() {
    let isFormValid = true;

    if (validateFieldRequired("branchname") === false) {
      isFormValid = false;
    }
    if (validateFieldRequired("country") === false) {
      isFormValid = false;
    }

    if (validateFieldRequired("state") === false) {
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

  sendBranchData = async () => {
    try {
      const branchNameInput = document.querySelector("[name='branchname']");
      const countrySelector = document.querySelector("[name='country']");
      const stateSelector = document.querySelector("[name='state']");
      const cityInput = document.querySelector("[name='city']");
      const streetInput = document.querySelector("[name='street']");

      const branch = {
        name: branchNameInput.value,
        country: countrySelector.value,
        state: stateSelector.value,
        city: cityInput.value,
        street: streetInput.value,
      };

      await this.branchService.createBranch(branch);
      alert("Los datos fueron guardados");
      window.location.href = "/branches";
    } catch (error) {
      errorHandler("No se pudieron cargar los datos", error);
    }
  };

  onChangeCountrySelect = async (event) => {
    console.log("anda", event.target.value);
    const countryId = event.target.value;
    const stateData = await this.stateService.getStates(countryId);
    console.log("state data", stateData);
    this.renderStates(stateData);
  };

  async init() {
    try {
      const countryData = await this.countryService.getCountries();
      this.renderCountries(countryData);
    } catch (error) {
      errorHandler("error al sincronizar datos", error);
    }
  }

  renderCountries(countryDataList) {
    const countrySelect = document.getElementById("country");

    const countryTemplate = document.getElementById("country-create-template");

    for (let i = 0; i < countryDataList.length; i++) {
      const copyCountryTemplate = document.importNode(
        countryTemplate.content,
        true
      );

      const newStateOption = copyCountryTemplate.querySelector("option");

      newStateOption.textContent = `${countryDataList[i].name}`;
      newStateOption.setAttribute("value", `${countryDataList[i].id}`);
      countrySelect.append(newStateOption);
    }
  }

  renderStates(statesDataList) {
    const statesSelect = document.getElementById("state");

    const statesOptionTemplate = document.getElementById(
      "states-option-template"
    );

    for (let i = 0; i < statesDataList.length; i++) {
      const copyStatesOptionTemplate = document.importNode(
        statesOptionTemplate.content,
        true
      );
      const newStateOption = copyStatesOptionTemplate.querySelector("option");

      newStateOption.textContent = `${statesDataList[i].name}`;
      newStateOption.setAttribute("value", `${statesDataList[i].id}`);
      statesSelect.append(newStateOption);
    }
  }
}

const createBrunchesCtrl = new CreateBrunchesController(
  new CountryServices(),
  new StateService(),
  new BranchService()
);
createBrunchesCtrl.init();
