import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { IBookModal } from "./book-model.interface";
import { useBookModalViewModel } from "./book-modal.view.model";
import { Loading } from "../Loading";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BOOK_STATUS_OPTIONS } from "./book-modal.constants";

export function BookModal({ ...props }: IBookModal) {
  const { book, isOpen, onClose, loadingAction } = props;
  const { modalTitle, handleConfirmAction } = useBookModalViewModel(props);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      {...props}
    >
      <form>
        <DialogContent className="max-w-[90%] rounded-xl">
          <DialogHeader className="my-4">
            <DialogTitle>{modalTitle}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Título</Label>
              <Input
                placeholder="Título do livro"
                defaultValue={book?.title || ""}
              />
            </div>

            <div className="space-y-2">
              <Label>Descrição</Label>
              <Textarea
                placeholder="Descrição do livro"
                defaultValue={book?.description}
              />
            </div>

            <div className="space-y-2">
              <Label>Status</Label>

              <Select defaultValue={book?.status}>
                <SelectTrigger>
                  <SelectValue placeholder="Status atual de leitura" />
                </SelectTrigger>

                <SelectContent>
                  {BOOK_STATUS_OPTIONS.map((option) => (
                    <SelectItem key={option.value} {...option}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="mt-4 flex flex-col md:flex-row items-center gap-2">
            <DialogClose asChild>
              <Button variant="outline" className="w-1/2" onClick={onClose}>
                Fechar
              </Button>
            </DialogClose>

            <Button
              disabled={loadingAction}
              className="w-1/2"
              onClick={handleConfirmAction}
            >
              {loadingAction ? <Loading /> : "Salvar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
