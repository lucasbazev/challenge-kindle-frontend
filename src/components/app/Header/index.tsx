import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Plus, Search } from "lucide-react";

interface IHeader {
  onAddBook: () => void;
}

export function Header({ onAddBook }: IHeader) {
  return (
    <header className="w-full bg-white shadow-lg border-b border-gray-200">
      <div className="container mx-auto w-full py-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold primary-gradient-text">Kindlefy</h1>

        <div className="relative">
          <Input
            placeholder="Pesquisar na sua biblioteca"
            className="p-5 pl-8 w-96"
          />

          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
        </div>

        <div className="flex items-center gap-4">
          <Button variant="outline">
            <Filter />
            Filtros
          </Button>

          <Button onClick={onAddBook}>
            <Plus />
            Adicionar livro
          </Button>
        </div>
      </div>
    </header>
  );
}
