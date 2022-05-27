class CreateCountryController {
  constructor() {
    const createCountryButton = document.getElementById("create-country-button");
    createCountryButton.addEventListener("click", this.onClickCreateCountryButton);
  }

  onClickCreateBookButton = () => {
    console.log("hizo click");
  };
}
const createCountryCtrl = new CreateCountryController();
