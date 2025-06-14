import { useMemo } from "react";
import type { IBookModal } from "./book-model.interface";

export function useBookModalViewModel(props: IBookModal) {
  const edited: boolean = useMemo(() => {
    return false;
  }, []);

  const modalTitle: string = useMemo(() => {
    if (props.book) {
      return props.book.title;
    }

    return "Adicionando livro";
  }, [props.book]);

  async function handleConfirmAction() {
    if (edited) {
      alert("Editando status do livro...");
      props.onClose();
      return;
    }

    alert("Adicionando livro...");
    props.onClose();
  }

  return {
    modalTitle,
    edited,
    handleConfirmAction,
  };
}
