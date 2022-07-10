class EditorialService {
  async getEditorials() {
    const editorialsListResponse = await fetch(
      "http://localhost:3000/api/editorial",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const responseData = await editorialsListResponse.json();

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
    const bookEditorialResponse = await fetch(
      `http://localhost:3000/api/editorial`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editorial.name,
        }),
      }
    );

    return await bookEditorialResponse.json();
  }

  async updateEditorial(id, editorial) {
    const response = await fetch(`http://localhost:3000/api/editorial/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editorial),
    });

    const responseData = await response.json();

    return responseData;
  }

  async deleteEditorial(id) {
    const response = await fetch(`http://localhost:3000/api/editorial/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  }
}

export { EditorialService };
