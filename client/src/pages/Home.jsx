import { useEffect, useState } from "react";
import BooksService from "../service/books.service";
import JournalsService from "../service/journals.service";
import ComicsService from "../service/comics.service";
import BookCard from "../components/BookCard";
import JournalCard from "../components/JournalCard";
import ComicCard from "../components/ComicCard";
import Swal from "sweetalert2";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [journals, setJournals] = useState([]);
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    try {
      setLoading(true);
      const [b, j, c] = await Promise.all([
        BooksService.getAllBooks(),
        JournalsService.getAllJournals(),
        ComicsService.getAllComics(),
      ]);

      setBooks(Array.isArray(b.data) ? b.data : b.data.data || []);
      setJournals(Array.isArray(j.data) ? j.data : j.data.data || []);
      setComics(Array.isArray(c.data) ? c.data : c.data.data || []);
    } catch (err) {
      Swal.fire("Error", err?.message || "Failed to fetch data", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleDelete = async (type, id) => {
    try {
      if (type === "Book") await BooksService.deleteBook(id);
      if (type === "Journal") await JournalsService.deleteJournal(id);
      if (type === "Comic") await ComicsService.deleteComic(id);

      Swal.fire("Deleted", `${type} deleted successfully!`, "success");
      fetchAll();
    } catch (err) {
      Swal.fire("Error", err?.message || "Delete failed", "error");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner text-amber-700"></span>
      </div>
    );

  return (
    <div className="min-h-screen bg-amber-50">
      <div className="container mx-auto p-6 space-y-6">
        <h1 className="text-4xl font-bold text-center text-amber-900 drop-shadow-sm">
          Book Store
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          {Array.isArray(books) &&
            books.map((b) => (
              <BookCard
                key={b.itemId}
                book={b}
                onDelete={() => handleDelete("Book", b.itemId)}
              />
            ))}

          {Array.isArray(journals) &&
            journals.map((j) => (
              <JournalCard
                key={j.itemId}
                journal={j}
                onDelete={() => handleDelete("Journal", j.itemId)}
              />
            ))}

          {Array.isArray(comics) &&
            comics.map((c) => (
              <ComicCard
                key={c.itemId}
                comic={c}
                onDelete={() => handleDelete("Comic", c.itemId)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
