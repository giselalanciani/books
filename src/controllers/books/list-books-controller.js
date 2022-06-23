class ListBooksController {
  constructor() {
    const createButton = document.getElementById("create-button");
    createButton.addEventListener("click", this.onClickCreateButton);
  }
  onClickCreateButton = () => {
    window.location.href = "/books/create";
  };
}
const booksCtrl = new ListBooksController();
