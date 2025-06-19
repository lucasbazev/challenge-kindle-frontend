import type { BookStatus, IBook } from "./interfaces/IBook";
import type { CreateBookDTO } from "./interfaces/CreateBookDTO";
import { handleFetchError } from "./lib/handle-fetch-error";

const { VITE_DEV_API_URL, VITE_PROD_API_URL, DEV } = import.meta.env;

const BASE_URL = DEV ? VITE_DEV_API_URL : VITE_PROD_API_URL;

export async function getAll(query?: string): Promise<IBook[]> {
  const response = await fetch(`${VITE_DEV_API_URL}/books?${query}`);

  handleFetchError(response);

  return await response.json();
}

export async function createBook(payload: CreateBookDTO): Promise<IBook> {
  const response = await fetch(`${BASE_URL}/books`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  handleFetchError(response);

  return await response.json();
}

export async function updateStatus(
  bookId: string,
  status: BookStatus,
): Promise<IBook> {
  const response = await fetch(`${BASE_URL}/books/${bookId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  handleFetchError(response);

  return await response.json();
}

export async function deleteBook(bookId: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/books/${bookId}`, {
    method: "DELETE",
  });

  handleFetchError(response);
  return;
}
