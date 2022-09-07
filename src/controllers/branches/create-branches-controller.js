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
    this.deleteStateSelectOptions();
    const countryId = event.target.value;
    if (countryId !== "") {
      const stateData = await this.stateService.getStates(countryId);
      this.renderStates(stateData);
    }
  };

  deleteStateSelectOptions() {
    const stateSelect = document.getElementById("state");
    const selectOptions = stateSelect.querySelectorAll("option");
    selectOptions.forEach((option) => {
      if (option.id === "select-state") {
        console.log("no elimina", option.id);
      } else {
        option.remove();
      }
    });
  }

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

      const newCountryOption = copyCountryTemplate.querySelector("option");

      newCountryOption.textContent = `${countryDataList[i].name}`;
      newCountryOption.setAttribute("value", `${countryDataList[i].id}`);
      countrySelect.append(newCountryOption);
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
