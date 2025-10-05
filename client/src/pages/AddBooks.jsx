import React, { useState } from "react";
import BooksService from "../service/books.service.js";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const AddBook = () => {
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
    location: "A1-B2-C3",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setBook({
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
      location: "A1-B2-C3",
    });
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    try {
      const newBook = await BooksService.insertBooks(book);

      if (newBook.status === 201 || newBook.status === 200) {
        await Swal.fire({
          title: "Add new book",
          text: "Add new book successfully!",
          icon: "success",
        });
        resetForm();
        navigate("/");
      } 
      
    } catch (error) {
      await Swal.fire({
        title: "Add new book",
        text:  error.message || "Request failed",
        icon: "error",
      });
      console.error("Create book error:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center min-h-screen bg-amber-50 py-10">
      <div className="container mx-auto">
        <form
          onSubmit={handleSubmit}
          className="w-full p-6 m-auto bg-amber-50 rounded-2xl shadow-xl ring-2 ring-amber-300 max-w-2xl"
        >
          <h1 className="text-2xl font-semibold text-center text-amber-800 mb-6">
            Add Book
          </h1>

          <div className="space-y-4">
            <div>
              <label className="label">
                <span className="text-base label-text text-black">Title</span>
              </label>
              <input
                type="text"
                placeholder="Enter title"
                className="w-full input input-bordered"
                name="title"
                value={book.title}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="text-base label-text text-black">Author</span>
              </label>
              <input
                type="text"
                placeholder="Enter author"
                className="w-full input input-bordered"
                name="author"
                value={book.author}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label">
                <span className="text-base label-text text-black">Category</span>
              </label>
              <input
                type="text"
                placeholder="Enter category"
                className="w-full input input-bordered"
                name="category"
                value={book.category}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label">
                <span className="text-base label-text text-black">Publish Year</span>
              </label>
              <input
                type="number"
                placeholder="Enter publish year"
                className="w-full input input-bordered"
                name="publishYear"
                value={book.publishYear}
                onChange={handleChange}
                min="0"
              />
            </div>

            <div>
              <label className="label">
                <span className="text-base label-text text-black">ISBN</span>
              </label>
              <input
                type="text"
                placeholder="Enter ISBN"
                className="w-full input input-bordered"
                name="isbn"
                value={book.isbn}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label">
                <span className="text-base label-text text-black">Publisher</span>
              </label>
              <input
                type="text"
                placeholder="Enter publisher"
                className="w-full input input-bordered"
                name="publisher"
                value={book.publisher}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label">
                <span className="text-base label-text text-black">Edition</span>
              </label>
              <input
                type="text"
                placeholder="Enter edition"
                className="w-full input input-bordered"
                name="edition"
                value={book.edition}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label">
                <span className="text-base label-text text-black">Page Count</span>
              </label>
              <input
                type="number"
                placeholder="Enter page count"
                className="w-full input input-bordered"
                name="pageCount"
                value={book.pageCount}
                onChange={handleChange}
                min="0"
              />
            </div>

            <div>
              <label className="label">
                <span className="text-base label-text text-black">Language</span>
              </label>
              <input
                type="text"
                placeholder="Enter language"
                className="w-full input input-bordered"
                name="language"
                value={book.language}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label">
                <span className="text-base label-text text-black">Genre</span>
              </label>
              <input
                type="text"
                placeholder="Enter genre"
                className="w-full input input-bordered"
                name="genre"
                value={book.genre}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label">
                <span className="text-base label-text text-black">Description</span>
              </label>
              <input
                type="text"
                placeholder="Enter description"
                className="w-full input input-bordered"
                name="description"
                value={book.description}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label">
                <span className="text-base label-text text-black">Cover Image URL</span>
              </label>
              <input
                type="text"
                className="w-full input input-bordered"
                value={book.coverImage}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                name="coverImage"
              />
              {book.coverImage && (
                <div className="flex items-center gap-2 mt-2">
                  <img className="h-32 rounded-md shadow" src={book.coverImage} alt="cover preview" />
                </div>
              )}
            </div>

            <div className="flex justify-center items-center my-6 space-x-4">
              <button
                type="submit"
                className="btn text-white bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:via-amber-600 hover:to-amber-700 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 px-6"
              >
                Add
              </button>
              <button
                type="button"
                className="btn border-amber-400 text-amber-700 hover:bg-amber-100 transition px-6"
                onClick={resetForm}
              >
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
