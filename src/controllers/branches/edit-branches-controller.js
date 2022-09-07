import { BranchService } from "../../services/branch-service";
import { CountryServices } from "../../services/country-service";
import { StateService } from "../../services/states-service";
import { configureValidator } from "../../utils/configureValidator";
import { errorHandler } from "../../utils/error-handler";
import { validateFieldRequired } from "../../utils/validateFieldRequired";

class EditBranchController {
  branchService;
  countryService;
  stateService;

  constructor(branchService, countryService, stateService) {
    this.branchService = branchService;
    this.countryService = countryService;
    this.stateService = stateService;
    const saveButton = document.getElementById("save-branch-button");
    saveButton.addEventListener("click", this.onClickSaveButton);

    const countrySelect = document.getElementById("country");
    countrySelect.addEventListener("change", this.onChangeCountrySelect);

    configureValidator("branchname");
    configureValidator("country");
    configureValidator("state");
    configureValidator("city");
    configureValidator("street");
  }

  onClickSaveButton = async (event) => {
    if (this.validateEditBranchForm()) {
      try {
        const branchNameInput = document.querySelector("[name='branchname']");
        const countryInputSelect = document.querySelector("[name='country']");
        const stateInputSelect = document.querySelector("[name='state']");
        const cityInput = document.querySelector("[name='city']");
        const streetInput = document.querySelector("[name='street']");

        const branch = {
          name: branchNameInput.value,
          country: countryInputSelect.value,
          state: stateInputSelect.value,
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
  renderBranch(branchDataList) {
    const branchTemplate = document.getElementById("branch-template");

    for (let i = 0; i < branchDataList.length; i++) {
      const copyBranchTemplate = document.importNode(
        branchTemplate.content,
        true
      );
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

  onChangeCountrySelect = async (event) => {    
    const countryId = event.target.value;
    this.deleteStateSelectOptions();
    if (countryId !== "") {
      const stateData = await this.stateService.getStates(countryId);
      this.renderStates(stateData);
    }
  };
  async setState(countryId, stateId) {
    try {
      const states = await this.stateService.getStates(countryId);
      this.renderStates(states);
      const stateInput = document.querySelector("[name='state']");
      stateInput.value = stateId;
    } catch (error) {
      errorHandler("error al encontrar la data", error);
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

  async init() {
    const params = this.getQueryParams();
    const branchId = params.id;

    try {
      const branchData = await this.branchService.getBranch(branchId);
      const countryData = await this.countryService.getCountries();
      // const stateData = await this.stateService.getState(params.countryId,params.stateId);

      this.renderBranch(branchData);
      this.renderCountries(countryData);
      // this.renderStates(stateData);

      const branchInput = document.querySelector("[name='branchname']");
      branchInput.value = branchData.name;
      const countryInput = document.querySelector("[name='country']");
      countryInput.value = branchData.countryId;

      this.setState(branchData.countryId, branchData.stateId);

      // const stateInput = document.querySelector("[name='state']");
      // stateInput.value = branchData.name;
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

    const editBranchForm = document.querySelector("[name='edit-branch-form']");
    editBranchForm.setAttribute("class", "");
  }
}
const editBranchCtrl = new EditBranchController(
  new BranchService(),
  new CountryServices(),
  new StateService()
);
editBranchCtrl.init();
