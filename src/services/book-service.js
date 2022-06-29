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

  async getBook(id) {
    const response = await fetch(`http://localhost:3000/api/book/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch the book.");
    }
    return await response.json();
  }

  async createBook(book) {
    const response = await fetch("http://localhost:3000/api/book", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: book.name,
        year: book.year,
        author: book.author,
        editorial: book.editorial,
      }),
    });
    return response;
  }

  async updateBook(id, book) {

    const response = await fetch(`http://localhost:3000/api/book/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: book.name,
        year: book.year,
        author: book.author,
        editorial: book.editorial,
      }),
    });
    return response;
  }
}
export { BookService };
