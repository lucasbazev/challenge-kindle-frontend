import { useEffect, useState } from "react";
import type { IBook } from "./interfaces/IBook";
import { toast } from "sonner";
import { getAll } from "./app.repository";
import { DevLogger } from "./lib/logger";

export function useAppViewModel() {
  const [bookModalOpen, setBookModalOpen] = useState<boolean>(false);
  const [selectedBook, setSelectedBook] = useState<IBook | null>(null);
  const [books, setBooks] = useState<IBook[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  async function fetchBooks(): Promise<void> {
    setLoading(true);

    try {
      const data = await getAll();

      setBooks(data);
    } catch (error) {
      DevLogger.error("FETCH BOOKS ERROR:", error);

      toast.error("Houve um erro ao buscar os livros.", {
        description: "Tente novamente mais tarde.",
      });
    } finally {
      setLoading(false);
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
