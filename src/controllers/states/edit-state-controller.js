import { StateService } from "../../services/states-service";
import { configureValidator } from "../../utils/configureValidator";
import { errorHandler } from "../../utils/error-handler";
import { validateFieldRequired } from "../../utils/validateFieldRequired";

class EditStateController {
  stateService;
  constructor(stateService) {
    this.stateService = stateService;
    const saveButton = document.getElementById("save-state-button");
    saveButton.addEventListener("click", this.onClickSaveButton);

    configureValidator("statename");
  }

  getQueryParams() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    return params;
  }
  onClickSaveButton = async (event) => {
    if (this.validateEditStateForm()) {
      try {
        const stateNameInput = document.querySelector("[name='statename']");

        const id = this.getQueryParams().id;
        const state = {
          id: id,
          name: stateNameInput.value,
        };

        await this.stateService.updateState(id, state);
        alert("Los datos fueron guardados");
        window.location.href = "/states";
      } catch (error) {
        errorHandler(
          "El estado no puede ser guardado en este momento, por favor intente nuevamente",
          error
        );
      }
    }
  };
  validateEditStateForm() {
    let isFormValid = true;

    if (validateFieldRequired("statename") === false) {
      isFormValid = false;
    }

    return isFormValid;
  }

  renderStates(stateData) {
    const stateSelect = document.getElementById("statename");
    const stateTemplate = document.getElementById("state-template");

    for (let i = 0; i < stateData.length; i++) {
      const copyStateTemplate = document.importNode(
        stateTemplate.content,
        true
      );

      const newStateOption = copyStateTemplate.querySelector("option");

      newStateOption.textContent = `${stateDataList[i].name}`;
      newStateOption.setAttribute("value", `${editorialDataList[i].id}`);

      stateSelect.append(newStateOption);
    }
  }
  async init() {
    const params = this.getQueryParams();

    try {
      const stateData = await this.stateService.getState(params.countryId, params.id);      

      this.renderStates(stateData);
     
      const stateInput = document.querySelector("[name='statename']");
      stateInput.value = stateData.name;
    } catch (error) {
      errorHandler("error al encontrar la data", error);
    
    }
  }

  
}
const editStateCtrl = new EditStateController(new StateService());
editStateCtrl.init();
