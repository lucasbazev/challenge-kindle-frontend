import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search } from "lucide-react";
import { BOOK_STATUS_OPTIONS } from "../BookModal/book-modal.constants";
import { Label } from "@/components/ui/label";

interface IHeader {
  onAddBook: () => void;
  handleChangeFilter?: (value: string) => void;
  handleChangeSearch?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  statusFilter?: string;
}

export function Header({
  onAddBook,
  handleChangeFilter,
  handleChangeSearch,
}: IHeader) {
  return (
    <header className="w-full bg-white shadow-lg border-b border-gray-200">
      <div className="container mx-auto w-full py-6 px-4 lg:px-0 flex flex-col gap-4 lg:flex-row items-center justify-between">
        <div className="flex items-center justify-between w-full lg:w-[60%]">
          <h1 className="text-xl lg:text-3xl font-bold primary-gradient-text">
            Kindlefy
          </h1>

          <div className="relative">
            <Input
              placeholder="Pesquisar na sua biblioteca"
              className="text-sm p-5 pl-8 lg:w-96"
              onChange={handleChangeSearch}
            />

            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 w-full lg:w-auto">
          <div className="flex items-center gap-2">
            <Select onValueChange={handleChangeFilter}>
              <Label>Status:</Label>

              <SelectTrigger>
                <SelectValue placeholder="Todos" />
              </SelectTrigger>

              <SelectContent>
                <>
                  <SelectItem key="ALL" value="ALL">
                    Todos
                  </SelectItem>

                  {BOOK_STATUS_OPTIONS.map((option) => (
                    <SelectItem key={option.value} {...option}>
                      {option.label}
                    </SelectItem>
                  ))}
                </>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={onAddBook}>
            <Plus />
            Adicionar
          </Button>
        </div>
      </div>
    </header>
  );
}
