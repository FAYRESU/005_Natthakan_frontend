import { useNavigate } from "react-router";

const ItemsCard = ({ items, type, children, onDelete }) => {
  const navigate = useNavigate();

  if (!items) return null;

  const handleEdit = () => {
    // แปลง type ให้ตรงกับ API route
    let apiType = "";
    if (type === "book") apiType = "books";
    else if (type === "comic") apiType = "comics";
    else if (type === "journal") apiType = "journals";

    navigate(`/update/${apiType}/${items.itemId}`);
  };

  return (
    <div className="card bg-base-100 shadow-md border border-base-300">
      <div className="card-body">
        <h2 className="card-title text-primary">{items.title || "-"}</h2>
        {items.author && <p>✍️ {items.author}</p>}

        <div className="mt-3 space-y-1 text-sm">
          {items.category && <p><strong>หมวดหมู่:</strong> {items.category}</p>}
          {items.publishYear && <p><strong>ปีที่พิมพ์:</strong> {items.publishYear}</p>}
          {items.isbn && <p><strong>ISBN:</strong> {items.isbn}</p>}
          {items.publisher && <p><strong>สำนักพิมพ์:</strong> {items.publisher}</p>}
          {children}
        </div>

        <div className="divider"></div>
        <div className="flex justify-end gap-2">
          <button
            className="btn btn-outline btn-sm"
            onClick={() => onDelete && onDelete(items.itemId, type)}
          >
            ลบ
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={handleEdit}
          >
            แก้ไข
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemsCard;
