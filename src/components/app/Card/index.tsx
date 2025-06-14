import { cn } from "@/lib/utils";

export interface ICard {
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
}

export function Card({ children, className, onClick }: ICard) {
  return (
    <div
      className={cn(
        "p-4 bg-white border border-gray-200 rounded-lg",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
