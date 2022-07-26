import { CountryServices } from "../../services/country-service";
import { errorHandler } from "../../utils/error-handler";

class CreateCountryController {
  countryServices;
  constructor(countryServices) {
    this.countryServices = countryServices;
    const createCountryButton = document.getElementById(
      "create-country-button"
    );
    createCountryButton.addEventListener(
      "click",
      this.onClickCreateCountryButton
    );
  }

  validateCreateForm() {
    const countryNameInput = document.querySelector("[name='countryname']");
    if (countryNameInput.value == "") {
      alert("País es requerido");
      return false;
    }
    return true;
  }

  onClickCreateCountryButton = () => {
    if (this.validateCreateForm() === true) {
      this.sendCountryData();
    }
  };

  sendCountryData = async () => {
    const countryNameInput = document.querySelector("[name='countryname']");
    const country = {
      name: countryNameInput.value,
    };

    try {
      await this.countryServices.createCountry(country);
      alert("Country created");
      window.location.href = "/countries";
    } catch (error) {
      errorHandler(
        "Your country couldn't be created, please try later.",
        error
      );
    }
  };
}
const createCountryCtrl = new CreateCountryController(new CountryServices());
