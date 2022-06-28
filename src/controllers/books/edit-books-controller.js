class EditBooksController {
  constructor() {
    const saveButton = document.getElementById("save-book-button");
    saveButton.addEventListener("click", this.onClickSaveButton);
  }

  getQueryParams() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    return params;
  }

  onClickSaveButton = async (event) => {
    const bookNameInput = document.querySelector("[name='bookname']");
    const bookYearInput = document.querySelector("[name='year']");
    const authorsSelectorInput = document.querySelector("[name='authors']");

    const saveButton = await fetch(
      `http://localhost:3000/api/book/${this.getQueryParams().id}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: bookNameInput.value,
          year: bookYearInput.value,
          author: authorsSelectorInput.value
        }),
      }
    );
    alert("Su libro fue guardado correctamente");
    window.location.href = "/books";
  };

  renderAuthors(authorsDataList) {
    const authorsSelect = document.getElementById("authors");

    const authorOptionTemplate = document.getElementById(
      "author-option-template"
    );

    for (let i = 0; i < authorsDataList.length; i++) {
      const copyAuthorOptionTemplate = document.importNode(
        authorOptionTemplate.content,
        true
      );

      const newAuthorOption = copyAuthorOptionTemplate.querySelector("option");

      newAuthorOption.textContent = `${authorsDataList[i].name}`;
      newAuthorOption.setAttribute("value", `${authorsDataList[i].name}`);

      authorsSelect.append(newAuthorOption);
    }
  }

  async init() {
    
    const response = await fetch(
      `http://localhost:3000/api/book/${this.getQueryParams().id}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch the book.");
    }
    const data = await response.json();
    this.removeActivityIndicationMessage();

    console.log("data", data);

    const content = await this.getAuthors();
    this.renderAuthors(content);


    const bookInput = document.querySelector("[name='bookname']");
    bookInput.value = data.name;
    const yearInput = document.querySelector("[name='year']");
    yearInput.value = data.year;
    const authorsSelect = document.querySelector("[name='authors']");
    authorsSelect.value = data.author;
  }

  async getAuthors () {
    const bookAuthors = await fetch("http://localhost:3000/api/author", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const content = await bookAuthors.json();

    return content;
  }

  removeActivityIndicationMessage() {
    const waitingIndicationMessage = document.getElementById(
      "Activity-indication-message"
    );
    waitingIndicationMessage.remove();

    const editBookForm = document.querySelector("[name='edit-book-form']");
    editBookForm.setAttribute("class", "");
  }
}

const editCtrl = new EditBooksController();
editCtrl.init();
