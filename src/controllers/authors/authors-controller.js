class AuthorsController {
  constructor() {
    console.log("authors page");


    const createButton = document.getElementById("create-button");
    createButton.addEventListener("click", this.onClickCreateButton);
  }

onClickCreateButton(){};

}
const authorsCtrl = new AuthorsController();
