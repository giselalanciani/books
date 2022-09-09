function isNumeric(str) {
  if (typeof str != "string") return false; // we only process strings!
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
}

const validateFieldNumeric = (fieldName) => {
  const input = document.querySelector(`[name='${fieldName}']`);
  const numericError = document.querySelector(
    `[name='${fieldName}-numeric']`
  );
  if (input.value == "") {
    return true;
  } else if (isNumeric(input.value)) {
    numericError.classList.add("hidden");
    return true;
  } else {
    numericError.classList.remove("hidden");
    false;
  }

  return true;
};

export { validateFieldNumeric };
