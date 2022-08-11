const validateFieldRequired = (fieldName) => {
  const bookNameInput = document.querySelector(`[name='${fieldName}']`);
  const bookNameRequiredError = document.querySelector(
    `[name='${fieldName}-required']`
  );
  if (bookNameInput.value == "") {
    bookNameRequiredError.classList.remove("hidden");
    return false;
  }
  bookNameRequiredError.classList.add("hidden");
  return true;
};

export { validateFieldRequired };
