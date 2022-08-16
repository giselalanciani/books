import { CountryServices } from "../../services/country-service";
import { StateService } from "../../services/states-service";
import { configureValidator } from "../../utils/configureValidator";
import { errorHandler } from "../../utils/error-handler";
import { validateFieldRequired } from "../../utils/validateFieldRequired";

class createStateController {
  stateService;
  countryServices;
  constructor(stateService, countryServices) {
    this.stateService = stateService;
    this.countryServices = countryServices;
    const createStateButton = document.getElementById("create-state-button");
    createStateButton.addEventListener("click", this.onClickCreateStateButton);

    configureValidator("statename");
    configureValidator("country");
  }

  onClickCreateStateButton = () => {
    if (this.validateCreateStateForm() === true) {
      this.sendData();
    }
  };
  validateCreateStateForm() {
    let isFormValid = true;

    if (validateFieldRequired("statename") === false) {
      isFormValid = false;
    }
    if (validateFieldRequired("country") === false) {
      isFormValid = false;
    }

    return isFormValid;
  }

  sendData = async () => {
    try {
      const stateNameInput = document.querySelector("[name='statename']");
      const countryInput = document.querySelector("[name='country']");

      const state = {
        name: stateNameInput.value,
        countryId: countryInput.value,
      };

      await this.stateService.createState(state);
      alert("Los datos fueron guardados");
      window.location.href = "/states";
    } catch (error) {
      errorHandler("No se pudo craer su stado", error);
    }
  };

  async init() {
    try {
      const statesData = await this.stateService.getStates();
      const countryData = await this.countryServices.getCountries();
      this.renderStates(statesData);
      this.renderCountries(countryData);
    } catch (error) {
      errorHandler("error al sincronizar datos", error);
    }
  }

  renderStates(statesDataList) {
    const statesSelect = document.getElementById("states");

    const statesOptionTemplate = document.getElementById(
      "states-option-template"
    );

    for (let i = 0; i < statesDataList.length; i++) {
      const copyStatesOptionTemplate = document.importNode(
        statesOptionTemplate.content,
        true
      );
    }
  }

  renderCountries(countryDataList) {
    const countrySelect = document.getElementById("country");

    const countryTemplate = document.getElementById("state-create-template");

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
}

const createStateCtrl = new createStateController(
  new StateService(), new CountryServices(),
);
createStateCtrl.init();
