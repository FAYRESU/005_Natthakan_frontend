import ItemsCard from "./ItemsCard";

export function BookCard({ book, onDelete }) {
  if (!book) return null;

  return (
    <ItemsCard items={book} onDelete={onDelete} type="book">
      <p><strong>พิมพ์ครั้งที่:</strong> {book.edition}</p>
      <p><strong>จำนวนหน้า:</strong> {book.pageCount}</p>
      <p><strong>ภาษา:</strong> {book.language}</p>
      <p><strong>แนว:</strong> {book.genre}</p>
    </ItemsCard>
  );
}

export default BookCard;
