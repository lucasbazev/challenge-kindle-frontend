import type { BookStatus } from "./IBook";

export interface CreateBookDTO {
  title: string;
  description?: string;
  status?: BookStatus;
}
