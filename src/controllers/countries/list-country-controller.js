import { CountryServices } from "../../services/country-service";
import { errorHandler } from "../../utils/error-handler";

class ListCountryController {
  countryService;
  constructor(countryService) {
    this.countryService = countryService;
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

  onClickEditButton= (event) => {
    const id = event.target.getAttribute("data-id");
    window.location.href = `http://localhost:8080/countries/edit/?id=${id}`;
  };

  onClickDeleteButton = async (event) => {
    const id = event.target.getAttribute("data-id");
    try {
      await this.countryService.deleteCountry(id);
      alert("Country deleted");
      window.location.href = "/countries";
    } catch (error) {
      errorHandler("No se pudo eliminar el país, intente mas tarde.", error);
    }
  };

  async init() {
    try {
      const countriesDataList = await this.countryService.getCountries();
      if (countriesDataList.length === 0) {
        const elementNoCountriesAvailableMessage = document.querySelector(
          "#no-countries-available"
        );
        elementNoCountriesAvailableMessage.setAttribute("class", "");
      }

      this.renderCountries(countriesDataList);
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

const listCountryCtrl = new ListCountryController(new CountryServices());
listCountryCtrl.init();
