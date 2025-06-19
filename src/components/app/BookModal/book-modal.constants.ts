import type { BookStatus } from "@/interfaces/IBook";

interface BookStatusOption {
  value: BookStatus;
  label: string;
}

export const BOOK_STATUS_OPTIONS: BookStatusOption[] = [
  {
    value: "WISHLIST",
    label: "Quero ler",
  },
  {
    value: "READING",
    label: "Lendo",
  },
  {
    value: "FINISHED",
    label: "Lido",
  },
];
