export type BookStatus = "BOUGHT" | "READING" | "FINISHED";

export interface IBook {
  _id: string;
  title: string;
  description: string;
  status: BookStatus;
}
