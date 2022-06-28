class BookService {
    
  async getBooks() {
    const response = await fetch(`http://localhost:3000/api/book`);
    if (!response.ok) {
      throw new Error("Failed to fetch from book API.");
    }
    return await response.json();
  }
}
export { BookService };
