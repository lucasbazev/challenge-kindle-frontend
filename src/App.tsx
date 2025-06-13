import { BookCard } from "./components/app/BookCard";
import { Header } from "./components/app/Header";
import { BlurFade } from "./components/ui/blur-fade";
import type { IBook } from "./interfaces/IBook";

const BOOKS_MOCK: IBook[] = [
  {
    _id: "1",
    title: "Livro 1",
    description: "Descrição do Livro 1",
    status: "BOUGHT",
    addedAt: new Date("2023-01-01"),
  },
  {
    _id: "2",
    title: "Livro 2",
    description: "Descrição do Livro 2",
    status: "READING",
    addedAt: new Date("2023-02-01"),
  },
  {
    _id: "3",
    title: "Livro 3",
    description: "Descrição do Livro 3",
    status: "FINISHED",
    addedAt: new Date("2023-03-01"),
  },
];

export default function App() {
  return (
    <div className="w-screen h-screen bg-gray-100">
      <Header />

      <main className="container mx-auto w-screen h-screen py-16 overflow-y-scroll">
        <div className="space-y-4">
          <h2 className="text-xl font-medium">Minha biblioteca</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {BOOKS_MOCK.map((book, idx) => (
              <BlurFade delay={idx * 0.2} key={book._id}>
                <BookCard key={book._id} book={book} />
              </BlurFade>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
