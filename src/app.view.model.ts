import { useState } from "react";
import type { IBook } from "./interfaces/IBook";

export function useAppViewModel() {
  const [bookModalOpen, setBookModalOpen] = useState<boolean>(false);
  const [selectedBook, setSelectedBook] = useState<IBook | null>(null);

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
    bookModalOpen,
    selectedBook,
    handleAddBook,
    handleSelectBook,
    handleCloseBookModal,
  };
}
