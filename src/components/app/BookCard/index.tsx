import type { IBook } from "@/interfaces/IBook";
import type { ICard } from "../Card";
import { Card } from "../Card";
import { cn } from "@/lib/utils";

interface IBookCard extends Omit<ICard, "children"> {
  book: IBook;
}

export function BookCard({ book, className }: IBookCard) {
  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-200 hover:bg-white hover:border-gray-400 hover:shadow-lg ",
        className,
      )}
    >
      <div className="space-y-1">
        <h3 className="font-semibold">{book.title}</h3>
        <p className="text-sm text-muted-foreground truncate">
          {book.description}
        </p>
      </div>
    </Card>
  );
}
