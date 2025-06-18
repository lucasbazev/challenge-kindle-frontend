import { useAppViewModel } from "./app.view.model";
import { BookCard } from "./components/app/BookCard";
import { BookModal } from "./components/app/BookModal";
import { Header } from "./components/app/Header";
import { BlurFade } from "./components/ui/blur-fade";
import type { IBook } from "./interfaces/IBook";

const BOOKS_MOCK: IBook[] = [
  {
    _id: "1",
    title: "Livro 1",
    description: "Este livro é muito interessante e aborda diversos temas.",
    status: "BOUGHT",
  },
  {
    _id: "2",
    title: "Livro 2",
    description:
      "Este livro é uma continuação do primeiro e traz novas aventuras.",
    status: "READING",
  },
  {
    _id: "3",
    title: "Livro 3",
    description:
      "Esse aqui é um livro de ficção científica que explora o futuro.",
    status: "FINISHED",
  },
];

export default function App() {
  const {
    selectedBook,
    bookModalOpen,
    handleAddBook,
    handleSelectBook,
    handleCloseBookModal,
  } = useAppViewModel();

  return (
    <div className="w-screen min-h-screen bg-gray-100">
      <Header onAddBook={handleAddBook} />

      <main className="container mx-auto w-screen py-16">
        <div className="space-y-4">
          <h2 className="text-xl font-medium">Minha biblioteca</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {BOOKS_MOCK.map((book, idx) => (
              <BlurFade delay={idx * 0.2} key={book._id}>
                <BookCard
                  key={book._id}
                  book={book}
                  onClick={handleSelectBook}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </main>

      <BookModal
        isOpen={bookModalOpen}
        book={selectedBook}
        onClose={handleCloseBookModal}
      />
    </div>
  );
}
