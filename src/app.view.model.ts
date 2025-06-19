import { useEffect, useState } from "react";
import type { IBook } from "./interfaces/IBook";
import { toast } from "sonner";
import { getAll } from "./app.repository";
import { DevLogger } from "./lib/logger";

export function useAppViewModel() {
  const [bookModalOpen, setBookModalOpen] = useState<boolean>(false);
  const [selectedBook, setSelectedBook] = useState<IBook | null>(null);
  const [books, setBooks] = useState<IBook[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [loading, setLoading] = useState<boolean>(false);

  function handleChangeFilter(value: string) {
    setStatusFilter(value);
    fetchBooks({ status: value === "ALL" ? null : value });
  }

  async function fetchBooks(filters?: Record<string, any>): Promise<void> {
    setLoading(true);

    const sanitizedFilters = Object.fromEntries(
      Object.entries(filters || {}).filter((entry) => !!entry[1]),
    );

    const query = new URLSearchParams(sanitizedFilters || {});

    try {
      const data = await getAll(query.toString());

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

  function handleClickAdd() {
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
    statusFilter,
    handleClickAdd,
    handleSelectBook,
    handleCloseBookModal,
    refetch: fetchBooks,
    handleChangeFilter,
  };
}
