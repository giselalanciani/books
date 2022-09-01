import { CountryServices } from "../../services/country-service";
import { StateService } from "../../services/states-service";

import { errorHandler } from "../../utils/error-handler";
import { getQueryParams } from "../../utils/getQueryParams";

class CreateBrunchesController {
  countryService;
  stateService;
  constructor(countryService, stateService) {
    this.countryService = countryService;
    this.stateService = stateService;
    const createBrunchButton = document.getElementById("create-branch-button");
    createBrunchButton.addEventListener(
      "click",
      this.onClickCreateBrunchButton
    );

    const countrySelect = document.getElementById("country");
    countrySelect.addEventListener("change", this.onChangeCountrySelect);
  }

  onClickCreateBrunchButton() {
    console.log("hizo click");
  }

  onChangeCountrySelect = async (event) => {
    console.log("anda", event.target.value);
    const stateData = this.stateService.getStates(countryId)
    const params = getQueryParams();
    const countryId = params.countryId;
  };

  async init() {
    try {
      const countryData = await this.countryService.getCountries();
      //   const stateData = await this.stateService.getStates();
      this.renderCountries(countryData);
      // this.renderStates(stateData);
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

  //  renderStates(statesDataList) {
  //     const statesSelect = document.getElementById("states");

  //     const statesOptionTemplate = document.getElementById(
  //       "states-option-template"
  //     );

  //     for (let i = 0; i < statesDataList.length; i++) {
  //       const copyStatesOptionTemplate = document.importNode(
  //         statesOptionTemplate.content,
  //         true
  //       );
  //       const newStateOption = copyStatesOptionTemplate.querySelector("option");

  //       newStateOption.textContent = `${statesDataList[i].name}`;
  //       newStateOption.setAttribute("value", `${statesDataList[i].id}`);
  //       statesSelect.append(newStateOption);
  //     }
  //   }
}

const createBrunchesCtrl = new CreateBrunchesController(
  new CountryServices(),
  new StateService()
);
createBrunchesCtrl.init();
