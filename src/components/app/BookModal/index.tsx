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
import { LoadingSpinner } from "../Loading";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

export function BookModal({ ...props }: IBookModal) {
  const { book, isOpen, onClose } = props;
  const {
    form,
    modalTitle,
    loadingAction,
    loadingStatusChange,
    handleAddBook,
    handleRemoveBook,
  } = useBookModalViewModel(props);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      {...props}
    >
      <Form {...form}>
        <DialogContent className="max-w-[90%] rounded-xl">
          <DialogHeader className="my-4">
            <DialogTitle>{modalTitle}</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Título</Label>

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Título do livro"
                        disabled={!!book}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label>Descrição</Label>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Descrição do livro"
                        disabled={!!book}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label>Status</Label>

              <div>
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Status atual de leitura" />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent>
                            {BOOK_STATUS_OPTIONS.map((option) => (
                              <SelectItem key={option.value} {...option}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {loadingStatusChange && <LoadingSpinner />}
              </div>
            </div>
          </div>

          <DialogFooter
            className={cn(
              "mt-4 flex flex-col md:flex-row items-center gap-2",
              book?._id && "flex-col-reverse md:flex-row-reverse",
            )}
          >
            <DialogClose asChild>
              <Button variant="outline" className="w-1/2" onClick={onClose}>
                Fechar
              </Button>
            </DialogClose>

            <Button
              disabled={loadingAction}
              variant={book?._id ? "outline" : "default"}
              onClick={book?._id ? handleRemoveBook : handleAddBook}
              className={cn(
                "w-1/2 ",
                book?._id &&
                  "border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200",
              )}
            >
              {loadingAction ? (
                <LoadingSpinner />
              ) : book?._id ? (
                "Remover"
              ) : (
                "Salvar"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Form>
    </Dialog>
  );
}
