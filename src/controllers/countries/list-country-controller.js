import { CountryServices } from "../../services/country-service";
import { errorHandler } from "../../utils/error-handler";

class ListCountryController {
  countryServices;
  constructor(countryServices) {
    this.countryServices = countryServices;
    const createButton = document.getElementById("create-button");
    createButton.addEventListener("click", this.onClickCreateButton);
  }

  onClickCreateButton() {
    window.location.href = "/countries/create";
  }

  renderCountries(countriesList) {
    const countryTable = document.getElementById("country-table");
    const countryRowTemplate = document.getElementById("country-row-template");

    for (let i = 0; i < countriesList.length; i++) {
      const copyRowTemplate = document.importNode(
        countryRowTemplate.content,
        true
      );

      const nameTd = copyRowTemplate.querySelector("[name='name']");
      nameTd.textContent = countriesList[i].name;

      const editCountryButton = copyRowTemplate.querySelector(
        "[name='edit-country-button']"
      );
      editCountryButton.setAttribute("data-id", countriesList[i].id);
      editCountryButton.addEventListener("click", this.onClickEditButton);

      const deleteCountryButton = copyRowTemplate.querySelector(
        "[name='delete-country-button']"
      );

      deleteCountryButton.setAttribute("data-id", countriesList[i].id);
      deleteCountryButton.addEventListener("click", this.onClickDeleteButton);

      countryTable.append(copyRowTemplate);
    }
  }

  onClickEditButton () {
    console.log('hizo click editar')
  }

  async init() {
    try {
      const responseCountriesData = await this.countryServices.getCountries();
      this.renderCountries(responseCountriesData);
    } catch (error) {
      errorHandler("No podemos encontrar los datos, intente nuevamente", error);
    }
  }
}

const listCountryCtrl = new ListCountryController(new CountryServices());
listCountryCtrl.init();
