

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
        }),
      }
    );
    alert("Su libro fue guardado correctamente");
    window.location.href = "/books";
  };

  async init() {
    const response = await fetch(
        `http://localhost:3000/api/book/${this.getQueryParams().id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch the book.");
      }
      const data = await response.json();

  
      console.log("data", data);
  
      const bookInput = document.querySelector("[name='bookname']");
      bookInput.value = data.name;
      const yearInput = document.querySelector("[name='year']");
      yearInput.value = data.year;
    }

}

const editCtrl = new EditBooksController();
editCtrl.init();