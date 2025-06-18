import type { IBook } from "@/interfaces/IBook";
import { Card } from "../Card";
import { cn } from "@/lib/utils";

interface IBookCard {
  book: IBook;
  onClick: (book: IBook) => void;
  className?: string;
}

export function BookCard({ book, className, onClick }: IBookCard) {
  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-200 hover:bg-white hover:border-gray-400 hover:shadow-lg ",
        className,
      )}
      onClick={() => onClick(book)}
    >
      <div className="space-y-1">
        <h3 className="font-semibold">{book.title}</h3>

        <p className="text-sm text-muted-foreground truncate">
          {book?.description || "Livro sem descrição."}
        </p>
      </div>
    </Card>
  );
}
