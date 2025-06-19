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
    statusFilter,
    loading,
    handleClickAdd,
    handleSelectBook,
    handleCloseBookModal,
    handleChangeFilter,
    handleChangeSearch,
    refetch,
  } = useAppViewModel();

  return (
    <div className="w-screen min-h-screen bg-gray-100">
      <Header
        onAddBook={handleClickAdd}
        handleChangeFilter={handleChangeFilter}
        handleChangeSearch={handleChangeSearch}
      />

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
              <p className="text-gray-500">
                {statusFilter
                  ? "Nenhum livro na sua biblioteca corresponde aos filtros aplicados. Tente alterar os filtros para ver outros resultados."
                  : "Nenhum livro na sua biblioteca no momento. Tente adicionar um livro clicando no botão do cabeçalho da página."}
              </p>
            )}
          </div>
        </div>
      </main>

      {bookModalOpen && (
        <BookModal
          isOpen={bookModalOpen}
          book={selectedBook}
          onClose={handleCloseBookModal}
          refetch={refetch}
        />
      )}
    </div>
  );
}
