import type { IBook } from "@/interfaces/IBook";
import type { DialogProps } from "@radix-ui/react-dialog";

export interface IBookModal extends DialogProps {
  book: IBook | null;
  isOpen: boolean;
  loadingAction?: boolean;
  onClose: () => void;
}
