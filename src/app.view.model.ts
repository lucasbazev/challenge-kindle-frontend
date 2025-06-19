import { useCallback, useEffect, useRef, useState } from "react";
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
  const [query, setQuery] = useState<Record<string, any>>();

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleChangeFilter = useCallback(
    (value: string) => {
      setStatusFilter(value);

      setQuery((prevQuery) => ({
        ...prevQuery,
        status: value === "ALL" ? null : value,
      }));

      fetchBooks({ ...query, status: value === "ALL" ? null : value });
    },
    [query],
  );

  const handleChangeSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newSearchTerm = event.target.value;

      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = setTimeout(() => {
        setQuery((prevQuery) => ({ ...prevQuery, title: newSearchTerm }));

        if (!newSearchTerm.trim()) {
          fetchBooks({ ...query, title: null });
        } else {
          fetchBooks({ ...query, title: newSearchTerm.trim() });
        }
      }, 500);
    },
    [query],
  );

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
    handleChangeFilter,
    handleChangeSearch,
    refetch: fetchBooks,
  };
}
