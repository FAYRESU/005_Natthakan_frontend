const BookCard = ({ book, onDelete }) => {
  return (
    <div className="card bg-base-100 shadow-md border border-base-300">
      <div className="card-body">
        <h2 className="card-title text-primary">{book.title}</h2>
        <p>✍️ {book.author}</p>

        <div className="mt-3 space-y-1 text-sm">
          <p><strong>หมวดหมู่:</strong> {book.category}</p>
          <p><strong>ปีที่พิมพ์:</strong> {book.publishYear}</p>
          <p><strong>ISBN:</strong> {book.isbn}</p>
          <p><strong>สำนักพิมพ์:</strong> {book.publisher}</p>
          <p><strong>พิมพ์ครั้งที่:</strong> {book.edition}</p>
          <p><strong>จำนวนหน้า:</strong> {book.pageCount}</p>
          <p><strong>ภาษา:</strong> {book.language}</p>
          <p><strong>แนว:</strong> {book.genre}</p>
        </div>

        <div className="divider"></div>

        <div className="flex justify-end gap-2">
          <button className="btn btn-outline btn-sm" onClick={onDelete}>
            ลบ
          </button>
          {/* เพิ่มปุ่ม Edit ได้ตรงนี้ */}
          <a href={`/update/${book.id}`} className="btn btn-primary btn-sm">
            แก้ไข
          </a>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
