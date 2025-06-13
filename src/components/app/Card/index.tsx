import { cn } from "@/lib/utils";

export interface ICard extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: ICard) {
  return (
    <div
      className={cn(
        "px-4 py-2 bg-white border border-gray-200 rounded-lg",
        className,
      )}
    >
      {children}
    </div>
  );
}
