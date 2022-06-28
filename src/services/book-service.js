class BookService {
  async getBooks() {
    const response = await fetch(`http://localhost:3000/api/book`);
    if (!response.ok) {
      throw new Error("Failed to fetch from book API.");
    }
    return await response.json();
  }

  async deleteBook(id) {
    const response = await fetch(`http://localhost:3000/api/book/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response;
  }

  async getBook(id) {}

  async createBook(book) {}

  async updateBook(book) {}
}
export { BookService };
