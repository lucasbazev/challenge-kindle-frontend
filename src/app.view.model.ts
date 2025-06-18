import { useEffect, useState } from "react";
import type { IBook } from "./interfaces/IBook";
import { toast } from "sonner";

export function useAppViewModel() {
  const [bookModalOpen, setBookModalOpen] = useState<boolean>(false);
  const [selectedBook, setSelectedBook] = useState<IBook | null>(null);
  const [books, setBooks] = useState<IBook[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  async function fetchBooks(): Promise<void> {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/books");
      const data = await response.json();

      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);

      toast.error("Houve um erro ao buscar os livros.");
    } finally {
      setLoading(false);
      console.log("Books fetched successfully");
    }
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  function handleAddBook() {
    setBookModalOpen(true);
  }

  function handleSelectBook(book: IBook) {
    setSelectedBook(book);
    setBookModalOpen(true);
  }

  function handleCloseBookModal() {
    setBookModalOpen(false);
    setSelectedBook(null);
  }

  return {
    books,
    loading,
    bookModalOpen,
    selectedBook,
    handleAddBook,
    handleSelectBook,
    handleCloseBookModal,
  };
}
