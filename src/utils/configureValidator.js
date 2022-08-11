import { validateFieldRequired } from "./validateFieldRequired";

const configureValidator = (fieldName) => {
  const bookNameInput = document.querySelector(`[name='${fieldName}']`);
  bookNameInput.addEventListener("change", (event) => {
    validateFieldRequired(event.target.getAttribute("name"));
  });
};

export { configureValidator };
