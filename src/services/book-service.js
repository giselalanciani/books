class BookService {
  async getBooks() {
    const response = await fetch(`http://localhost:3000/api/book`);
    
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
    return await response.json();
  }

  async getBook(id) {
    const response = await fetch(`http://localhost:3000/api/book/${id}`);

    
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
        stock: book.stock,
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
        stock: book.stock,
      }),
    });
    return response;
  }
}
export { BookService };
