import { CountryServices } from "../../services/country-service";
import { errorHandler } from "../../utils/error-handler";

class EditCountryController {
  countryServices;
  constructor(countryServices) {
    this.countryServices = countryServices;
    const saveButton = document.getElementById("save-country-button");
    saveButton.addEventListener("click", this.onClickSaveButton);
  }

  getQueryParams() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    return params;
  }
  validateEditForm() {
    const editNameInput = document.querySelector("[name='countryname']");
    const nameRequiredError = document.querySelector(
      "[name='countryname-required']"
    );
    if (editNameInput.value == "") {
      nameRequiredError.classList.remove("hidden");
      return false;
    }
    nameRequiredError.classList.add("hidden");
    return true;
  }
  onClickSaveButton = async (event) => {
    if (this.validateEditForm()) {
      try {
        const countryNameInput = document.querySelector("[name='countryname']");
  
        const id = this.getQueryParams().id;
        const country = {
          id: id,
          name: countryNameInput.value,
        };
  
        await this.countryServices.updateCountry(country);
        alert("Los datos fueron guardados");
        window.location.href = "/countries";
      } catch (error) {
        errorHandler(
          "El país no puede ser guardado en este momento, por favor intente nuevamente",
          error
        );
      }
    }
    
  };

  renderCountry(countryDataList) {
    const countryTemplate = document.getElementById("country-template");

    for (let i = 0; i < countryDataList.length; i++) {
      const copyCountryTemplate = document.importNode(
        countryTemplate.content,
        true
      );
    }
  }
  async init() {
    const params = this.getQueryParams();
    const id = params.id;
    try {
      const countryData = await this.countryServices.getCountry(params.id);
      this.renderCountry(countryData);

      const countryInput = document.querySelector("[name='countryname']");
      countryInput.value = countryData.name;
    } catch (error) {
      errorHandler("Error en la busqueda,vualva a intentarlo luego", error);
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

const editCountryCtrl = new EditCountryController(new CountryServices());
editCountryCtrl.init();
