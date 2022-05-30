class CountryServices {
  async getCountries() {
    const response = await fetch(`http://localhost:3000/api/country`);

    return await response.json();
  }

  //   async deleteCountry(id) {
  //     const response = await fetch(`http://localhost:3000/api/countries/${id}`, {
  //       method: "DELETE",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     return await response.json();
  //   };

  //   async createCountry(country) {
  //     const response = await fetch("http://localhost:3000/api/country", {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         name: country.name,

  //       }),
  //     });
  //     return response;
  //   }
  //   async updateCountry(id, country) {

  //     const response = await fetch(`http://localhost:3000/api/country/${id}`, {
  //       method: "PUT",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         name: country.name,

  //       }),
  //     });
  //     return response;
  //   }
}
export { CountryServices };
