import { validateFieldNumeric } from "./validateFieldNumeric";
import { validateFieldRequired } from "./validateFieldRequired";

const configureValidator = (fieldName, listOfValidator = ['required']) => {
  const inputElement = document.querySelector(`[name='${fieldName}']`);

  listOfValidator.forEach((validatorName) => {
    switch (validatorName) {
      case "required":
        inputElement.addEventListener("change", (event) => {
          validateFieldRequired(event.target.getAttribute("name"));
        });
        break;
      case "numeric":
        inputElement.addEventListener("change", (event) => {
          validateFieldNumeric(event.target.getAttribute("name"));
        });
        break;
    }
  });
};

export { configureValidator };
