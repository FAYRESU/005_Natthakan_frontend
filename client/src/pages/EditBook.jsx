import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import BooksService from "../service/books.service";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: "",
    author: "",
    category: "",
    publishYear: "",
    isbn: "",
    publisher: "",
    edition: "",
    pageCount: "",
    language: "",
    genre: "",
    description: "",
    coverImage: "",
    location: "",
  });

  // Fetch ข้อมูลเดิม
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await BooksService.getBooksById(id);
        setBook(res.data); // prefill ข้อมูล
      } catch (err) {
        Swal.fire("Error", err.message, "error");
      }
    };
    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const res = await BooksService.editBooksById(id, book);
      if (res.status === 200) {
        Swal.fire("Success", "Book updated successfully!", "success").then(() => {
          navigate("/");
        });
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <div className="flex justify-center py-12 bg-amber-50">
      <div className="card w-full max-w-3xl shadow-xl border border-amber-300 rounded-2xl bg-amber-50">
        <div className="card-body p-8">
          <h1 className="text-4xl font-bold text-center mb-8 text-amber-800">
            Edit Book
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(book).map(([key, value]) => (
              <label key={key} className="form-control w-full">
                <span className="label-text font-semibold text-amber-900">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </span>
                <input
                  type={key === "pageCount" || key === "publishYear" ? "number" : "text"}
                  name={key}
                  value={value || ""}
                  onChange={handleChange}
                  className="input input-bordered w-full focus:border-amber-500 focus:ring focus:ring-amber-200"
                />
              </label>
            ))}
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              className="btn btn-amber btn-outline hover:bg-amber-100 transition"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn text-white bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:via-amber-600 hover:to-amber-700 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBook;
