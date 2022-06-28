class AuthorsService {
  async getAuthors() {
    const bookAuthors = await fetch("http://localhost:3000/api/author", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const responseData = await bookAuthors.json();

    return responseData;
  }

  async getAuthors () {
    const bookAuthors = await fetch("http://localhost:3000/api/author", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const responseData = await bookAuthors.json();

    return responseData;
  }
 
}
export { AuthorsService };
