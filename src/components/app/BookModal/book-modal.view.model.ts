import { useEffect, useMemo } from "react";
import type { IBookModal } from "./book-model.interface";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./book-modal.model";
import type { z } from "zod";
import type { BookStatus } from "@/interfaces/IBook";
import { DevLogger } from "@/lib/logger";

export function useBookModalViewModel(props: IBookModal) {
  const defaultValues = useMemo(() => {
    if (!props.book) return;

    if (props.book?._id) {
      DevLogger.log("Using existing book data:", props.book);
      return { ...props.book };
    }

    return {
      title: "",
      description: "",
      status: "BOUGHT" as BookStatus,
    };
  }, [props.book]);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const status = form.watch("status");

  const modalTitle: string = useMemo(() => {
    if (props.book) {
      return props.book.title;
    }

    return "Adicionando livro";
  }, [props.book]);

  async function handleAddBook() {
    if (Object.keys(form.formState.errors).length) {
      DevLogger.error("Form errors:", form.formState.errors);
      return;
    }

    const values = form.getValues();
    alert(`Adicionando livro: ${JSON.stringify(values)}`);
    form.reset();
    props.onClose();
  }

  async function handleRemoveBook() {
    alert(`Deletando livro: ${props.book?._id}`);
  }

  useEffect(() => {
    DevLogger.log({ status, prev: props.book?.status });

    async function handleChangeStatus() {
      if (!props.book || props.book?.status === status) return;

      alert(`Editando status do livro: ${status}`);
    }

    handleChangeStatus();
  }, [status, props.book]);

  return {
    modalTitle,
    form,
    handleAddBook,
    handleRemoveBook,
  };
}
