import type { IBook } from "@/interfaces/IBook";
import type { ICard } from "../Card";
import { Card } from "../Card";

interface IBookCard extends Omit<ICard, "children"> {
  book: IBook;
}

export function BookCard({ book, className }: IBookCard) {
  return (
    <Card className={className}>
      <h3 className="font-semibold">{book.title}</h3>
      <p className="text-muted-foreground">{book.description}</p>
    </Card>
  );
}
