import { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import BooksService from "../service/books.service";

const AddBook = () => {
  const [items, setItems] = useState({
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

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItems({ ...items, [name]: value });
  };

  const resetForm = () => {
    setItems({
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
  };

  const handleSubmit = async () => {
    try {
      const newItems = await BooksService.insertBooks(items);
      if (newItems.status === 201) {
        Swal.fire({
          title: "Add new book",
          text: "Book added successfully!",
          icon: "success",
        }).then(() => {
          resetForm();
          navigate("/");
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Add new book",
        text: error.message,
        icon: "error",
      });
    }
  };

  return (
    <div className="flex justify-center py-12 bg-red-50">
      <div className="card w-full max-w-3xl shadow-xl border border-amber-300 bg-amber-50 rounded-2xl">
        <div className="card-body p-8">
          <h1 className="text-4xl font-bold text-center mb-8 text-red-800">
            Add New Book
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <label className="form-control w-full">
              <span className="label-text font-semibold text-red-900">Title</span>
              <input
                type="text"
                name="title"
                value={items.title}
                onChange={handleChange}
                placeholder="Enter book title"
                className="input input-bordered w-full focus:border-rose-500 focus:ring focus:ring-rose-200"
              />
            </label>

            {/* Author */}
            <label className="form-control w-full">
              <span className="label-text font-semibold text-red-900">Author</span>
              <input
                type="text"
                name="author"
                value={items.author}
                onChange={handleChange}
                placeholder="Enter author name"
                className="input input-bordered w-full focus:border-rose-500 focus:ring focus:ring-rose-200"
              />
            </label>

            {/* Category */}
            <label className="form-control w-full">
              <span className="label-text font-semibold text-red-900">Category</span>
              <input
                type="text"
                name="category"
                value={items.category}
                onChange={handleChange}
                placeholder="Fiction, Science, History"
                className="input input-bordered w-full focus:border-rose-500 focus:ring focus:ring-rose-200"
              />
            </label>

            {/* Publish Year */}
            <label className="form-control w-full">
              <span className="label-text font-semibold text-red-900">Publish Year</span>
              <input
                type="number"
                name="publishYear"
                value={items.publishYear}
                onChange={handleChange}
                placeholder="Enter year"
                className="input input-bordered w-full focus:border-rose-500 focus:ring focus:ring-rose-200"
              />
            </label>

            {/* ISBN */}
            <label className="form-control w-full">
              <span className="label-text font-semibold text-red-900">ISBN</span>
              <input
                type="text"
                name="isbn"
                value={items.isbn}
                onChange={handleChange}
                placeholder="Enter ISBN number"
                className="input input-bordered w-full focus:border-rose-500 focus:ring focus:ring-rose-200"
              />
            </label>

            {/* Publisher */}
            <label className="form-control w-full">
              <span className="label-text font-semibold text-red-900">Publisher</span>
              <input
                type="text"
                name="publisher"
                value={items.publisher}
                onChange={handleChange}
                placeholder="Enter publisher name"
                className="input input-bordered w-full focus:border-rose-500 focus:ring focus:ring-rose-200"
              />
            </label>

            {/* Edition */}
            <label className="form-control w-full">
              <span className="label-text font-semibold text-red-900">Edition</span>
              <input
                type="text"
                name="edition"
                value={items.edition}
                onChange={handleChange}
                placeholder="1st, 2nd, Revised"
                className="input input-bordered w-full focus:border-rose-500 focus:ring focus:ring-rose-200"
              />
            </label>

            {/* Page Count */}
            <label className="form-control w-full">
              <span className="label-text font-semibold text-red-900">Page Count</span>
              <input
                type="number"
                name="pageCount"
                value={items.pageCount}
                onChange={handleChange}
                placeholder="Number of pages"
                className="input input-bordered w-full focus:border-rose-500 focus:ring focus:ring-rose-200"
              />
            </label>

            {/* Language */}
            <label className="form-control w-full">
              <span className="label-text font-semibold text-red-900">Language</span>
              <input
                type="text"
                name="language"
                value={items.language}
                onChange={handleChange}
                placeholder="English, Thai, French"
                className="input input-bordered w-full focus:border-rose-500 focus:ring focus:ring-rose-200"
              />
            </label>

            {/* Genre */}
            <label className="form-control w-full">
              <span className="label-text font-semibold text-red-900">Genre</span>
              <input
                type="text"
                name="genre"
                value={items.genre}
                onChange={handleChange}
                placeholder="Novel, Biography, Fantasy"
                className="input input-bordered w-full focus:border-rose-500 focus:ring focus:ring-rose-200"
              />
            </label>
          </div>

          {/* Description */}
          <label className="form-control w-full mt-6">
            <span className="label-text font-semibold text-red-900">Description</span>
            <textarea
              name="description"
              value={items.description}
              onChange={handleChange}
              placeholder="Write a short description"
              className="textarea textarea-bordered w-full focus:border-rose-500 focus:ring focus:ring-rose-200"
              rows={4}
            />
          </label>

          {/* Cover Image */}
          <label className="form-control w-full mt-4">
            <span className="label-text font-semibold text-red-900">Cover Image (URL)</span>
            <input
              type="text"
              name="coverImage"
              value={items.coverImage}
              onChange={handleChange}
              placeholder="Paste cover image URL"
              className="input input-bordered w-full focus:border-rose-500 focus:ring focus:ring-rose-200"
            />
          </label>

          {/* Location */}
          <label className="form-control w-full mt-4">
            <span className="label-text font-semibold text-red-900">Location</span>
            <input
              type="text"
              name="location"
              value={items.location}
              onChange={handleChange}
              placeholder="Shelf A2, Library Room 1"
              className="input input-bordered w-full focus:border-rose-500 focus:ring focus:ring-rose-200"
            />
          </label>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              className="btn btn-amber btn-outline hover:bg-amber-100 transition"
              onClick={resetForm}
            >
              Reset
            </button>
           <button
  type="button"
  className="btn text-white bg-gradient-to-r from-rose-500 via-amber-500 to-red-600 hover:from-rose-600 hover:via-amber-600 hover:to-red-700 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
  onClick={handleSubmit}
>
  Submit
</button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
