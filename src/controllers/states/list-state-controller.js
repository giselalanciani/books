import { CountryServices } from "../../services/country-service";
import { StateService } from "../../services/states-service";
import { errorHandler } from "../../utils/error-handler";
import { validateFieldRequired } from "../../utils/validateFieldRequired";

class ListStatesController {
  stateService;
  countryService;
  constructor(stateService, countryService) {
    this.countryService = countryService;
    this.stateService = stateService;
    const createButton = document.getElementById("create-button");
    createButton.addEventListener("click", this.onClickCreateButton);

    const countrySelect = document.getElementById("country");
    countrySelect.addEventListener("change", this.onChangeCountrySelect);
  }

  onClickCreateButton() {
    window.location.href = "/states/create";
  }

  onClickEditButton = async (event) => {
    window.location.href = `http://localhost:8080/states/edit/?id=${event.target.getAttribute(
      "data-id"
    )}&countryId=${event.target.getAttribute("data-country-id")}`;
  };

  onClickDeleteButton = async (event) => {
    if (
      confirm(
        `Desea eliminar el estado?`
      ) == true
    )
      try {
        const stateId = event.target.getAttribute("data-id");
        const countryId = event.target.getAttribute("data-country-id");
        await this.stateService.deleteState(countryId, stateId);
        window.location.href = "http://localhost:8080/states/";
      } catch (error) {
        errorHandler("No se pudo eliminar el estado", error);
      }
  };

  validateListStateForm() {
    let isFormValid = true;

    if (validateFieldRequired("statename") === false) {
      isFormValid = false;
    }
    if (validateFieldRequired("country") === false) {
      isFormValid = false;
    }

    return isFormValid;
  }
  onChangeCountrySelect = async (event) => {
    const stateTable = document.getElementById("state-table");
    stateTable.classList.remove("hidden");

    const countryId = event.target.value;

    if (countryId) {
      stateTable.classList.remove("hidden");
      try {
        const elementWaitingMessageRowMessage = document.querySelector(
          "#waiting-message-row"
        );
        elementWaitingMessageRowMessage.classList.remove("hidden");

        const statesList = await this.stateService.getStates(countryId);
        const elementNoStatesAvailableMessage = document.querySelector(
          "#no-states-available"
        );

        elementWaitingMessageRowMessage.classList.add("hidden");

        if (statesList.length === 0) {
          elementNoStatesAvailableMessage.classList.remove("hidden");
        } else {
          elementNoStatesAvailableMessage.classList.add("hidden");
        }
        this.renderStates(statesList);
      } catch (error) {
        errorHandler("error al cargar countries", error);
      }
    } else {
      stateTable.classList.add("hidden");
    }
  };

  renderStates(statesList) {
    const stateTable = document.getElementById("state-table");
    const stateRowTemplate = document.getElementById("state-row-template");
    const tableTrs = stateTable.querySelectorAll("tr");

    tableTrs.forEach((tr) => {
      if (tr.id === "no-states-available" || tr.id === "waiting-message-row") {
        console.log("no elimina", tr.id);
      } else {
        tr.remove();
      }
    });

    for (let i = 0; i < statesList.length; i++) {
      const copyRowTemplate = document.importNode(
        stateRowTemplate.content,
        true
      );

      const nameTd = copyRowTemplate.querySelector("[name='name']");
      nameTd.textContent = statesList[i].name;

      const editStateButton = copyRowTemplate.querySelector(
        "[name='edit-state-button']"
      );
      editStateButton.setAttribute("data-id", statesList[i].id);
      editStateButton.setAttribute("data-country-id", statesList[i].countryId);
      editStateButton.addEventListener("click", this.onClickEditButton);

      const deleteStateButton = copyRowTemplate.querySelector(
        "[name='delete-state-button']"
      );

      deleteStateButton.setAttribute("data-id", statesList[i].id);
      deleteStateButton.setAttribute(
        "data-country-id",
        statesList[i].countryId
      );
      deleteStateButton.addEventListener("click", this.onClickDeleteButton);

      stateTable.append(copyRowTemplate);
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

  async init() {
    try {
      const countryDataList = await this.countryService.getCountries();
      this.renderCountries(countryDataList);
    } catch (error) {
      errorHandler("No podemos encontrar los datos, intente nuevamente", error);
    }
  }
}

const listStateController = new ListStatesController(
  new StateService(),
  new CountryServices()
);
listStateController.init();
