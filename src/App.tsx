import { useAppViewModel } from "./app.view.model";
import { BookCard, BookCardSkeleton } from "./components/app/BookCard";
import { BookModal } from "./components/app/BookModal";
import { Header } from "./components/app/Header";
import { BlurFade } from "./components/ui/blur-fade";

export default function App() {
  const {
    selectedBook,
    bookModalOpen,
    books,
    loading,
    handleClickAdd,
    handleSelectBook,
    handleCloseBookModal,
  } = useAppViewModel();

  return (
    <div className="w-screen min-h-screen bg-gray-100">
      <Header onAddBook={handleClickAdd} />

      <main className="container mx-auto w-screen py-16">
        <div className="space-y-4">
          <h2 className="text-xl font-medium">Minha biblioteca</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading ? (
              <BookCardSkeleton />
            ) : books?.length ? (
              books?.map((book, idx) => (
                <BlurFade delay={idx * 0.2} key={book._id}>
                  <BookCard book={book} onClick={handleSelectBook} />
                </BlurFade>
              ))
            ) : (
              <p>Nenhum livro na sua biblioteca.</p>
            )}
          </div>
        </div>
      </main>

      {bookModalOpen && (
        <BookModal
          isOpen={bookModalOpen}
          book={selectedBook}
          onClose={handleCloseBookModal}
        />
      )}
    </div>
  );
}
