class EditorialService {
  async getEditorials() {
    const bookEditorial = await fetch("http://localhost:3000/api/editorial", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const responseData = await bookEditorial.json();

    return responseData;
  }

  async getEditorial(id) {
    const bookEditorial = await fetch(
      `http://localhost:3000/api/editorial/${id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const responseData = await bookEditorial.json();

    return responseData;
  }

  async createEditorial(editorial) {

    const bookEditorialResponse = await fetch(`http://localhost:3000/api/editorial`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: editorial.name,
      }),
    });

    return bookEditorialResponse;
  }
}

export { EditorialService };
