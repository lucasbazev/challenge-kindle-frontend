import type { BookStatus } from "@/interfaces/IBook";

interface BookStatusOption {
  value: BookStatus;
  label: string;
}

export const BOOK_STATUS_OPTIONS: BookStatusOption[] = [
  {
    value: "BOUGHT",
    label: "Comprado",
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
