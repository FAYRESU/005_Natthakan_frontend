import React, { useEffect, useState } from "react";
import BooksService from "../services/books.service";
import BookCard from "../components/BookCard";
import Swal from "sweetalert2";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // ดึงข้อมูลจาก API
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await BooksService.getAllBooks();

      if (response.status === 200 && response.data.success) {
        // ดึงเฉพาะ data array
        setBooks(response.data.data || []);
      } else {
        Swal.fire("Error", "ไม่สามารถดึงข้อมูลหนังสือได้", "error");
      }
    } catch (error) {
      Swal.fire("Error", error?.message || "เกิดข้อผิดพลาด", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // ลบหนังสือ
  const handleDelete = async (id) => {
    try {
      await BooksService.deleteBook(id);
      Swal.fire("Deleted", "ลบหนังสือเรียบร้อยแล้ว", "success");
      // update state หลังลบ
      setBooks((prev) => prev.filter((b) => b.itemId !== id));
    } catch (err) {
      Swal.fire("Error", err?.message || "ลบหนังสือไม่สำเร็จ", "error");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-3xl font-bold text-center">Book Store</h1>

      {books.length === 0 && <p className="text-center text-gray-500">ยังไม่มีหนังสือในระบบ</p>}

      {books.length > 0 &&
        books.map((book) => (
          <BookCard key={book.itemId} book={book} onDelete={() => handleDelete(book.itemId)} />
        ))}
    </div>
  );
};

export default Books;
