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

  onClickSaveButton = async (event) => {
    try {
      const countryNameInput = document.querySelector("[name='countryname']");

      const country = {
        name: bookNameInput.value,
      };

      const id = this.getQueryParams().id;
      await this.countryServices.updateCountry(country, id);
      alert("Los datos fueron guardados");
      window.location.href = "/countries";
    } catch (error) {
      errorHandler(
        "El país no puede ser guardado en este momento, por favor intente nuevamente",
        error
      );
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
    try {
      const countryData = await this.countryServices.getCountries(params);
      this.renderCountry(countryData);

      const countryInput = document.querySelector("[name='countryname']");
      countryInput.value = countryData.name;
    } catch (error) {
      errorHandler("Error en la busqueda,vualva a intentarlo luego", error);
    }
  }
}

const editCountryCtrl = new EditCountryController(new CountryServices());
editCountryCtrl.init();
