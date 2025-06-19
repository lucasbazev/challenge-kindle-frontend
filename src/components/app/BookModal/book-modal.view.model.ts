import { useEffect, useMemo, useState } from "react";
import type { IBookModal } from "./book-model.interface";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./book-modal.model";
import type { z } from "zod";
import type { BookStatus } from "@/interfaces/IBook";
import { DevLogger } from "@/lib/logger";
import { createBook, deleteBook, updateStatus } from "@/app.repository";
import { toast } from "sonner";

export function useBookModalViewModel(props: IBookModal) {
  const [loadingAction, setLoadingAction] = useState(false);
  const [loadingStatusChange, setLoadingStatusChange] = useState(false);

  const defaultValues = useMemo(() => {
    if (!props.book) return;

    if (props.book?._id) {
      return { ...props.book };
    }

    return {
      title: "",
      description: "",
      status: "WISHLIST" as BookStatus,
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

    setLoadingAction(true);
    const values = form.getValues();

    try {
      await createBook(values);

      toast.success("Livro adicionado com sucesso!");
      form.reset();
      props.onClose();
      props.refetch();
    } catch (error) {
      DevLogger.error("Error adding book:", error);

      toast.error(
        "Houve um erro ao adicionar o livro. Tente novamente mais tarde.",
      );
    } finally {
      setLoadingAction(false);
    }
  }

  async function handleRemoveBook() {
    if (!props.book?._id) return;

    setLoadingAction(true);

    try {
      await deleteBook(props.book?._id);

      toast.success("Livro removido com sucesso!");
      form.reset();
      props.onClose();
      props.refetch();
    } catch (error) {
      DevLogger.error("Error adding book:", error);

      toast.error(
        "Houve um erro ao remover o livro. Tente novamente mais tarde.",
      );
    } finally {
      setLoadingAction(false);
    }
  }

  useEffect(() => {
    async function handleChangeStatus() {
      if (!props.book || props.book?.status === status) return;

      setLoadingStatusChange(true);

      try {
        await updateStatus(props.book?._id, status);

        toast.success("Status de leitura atualizado com sucesso!");
        form.reset();
        props.onClose();
        props.refetch();
      } catch (error) {
        DevLogger.error("Error adding book:", error);

        toast.error(
          "Houve um erro ao atualizar status de leitura do livro. Tente novamente mais tarde.",
        );
      } finally {
        setLoadingStatusChange(false);
      }
    }

    handleChangeStatus();
  }, [status, props, form]);

  return {
    modalTitle,
    form,
    loadingAction,
    loadingStatusChange,
    handleAddBook,
    handleRemoveBook,
  };
}
