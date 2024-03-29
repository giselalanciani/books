class CountryServices {
  async getCountries() {
    const response = await fetch(`http://localhost:3000/api/country`);

    return await response.json();
  }

  async getCountry(id) {
    const response = await fetch(`http://localhost:3000/api/country/${id}`);

    return await response.json();
  }
  async deleteCountry(id) {
    const response = await fetch(`http://localhost:3000/api/country/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  }

  async createCountry(country) {
    const response = await fetch(`http://localhost:3000/api/country`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(country),
    });
    return await response.json();
  }

  async updateCountry(country) {
    const response = await fetch(
      `http://localhost:3000/api/country/${country.id}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(country),
      }
    );
    return await response.json();
  }
}
export { CountryServices };
