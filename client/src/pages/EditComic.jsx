import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import ComicsService from "../service/comics.service";
import Swal from "sweetalert2";

const EditComic = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [comic, setComic] = useState({ /* initial state */ });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComic = async () => {
      try {
        const response = await ComicsService.getComicsById(id); // GET API
        if (response.status === 200) {
          const apiData = response.data;
          setComic({
            title: apiData.title || "",
            author: apiData.author || "",
            category: apiData.category || "",
            publishYear: apiData.publish_year || "",
            series: apiData.series || "",
            volumeNumber: apiData.volume_number || "",
            illustrator: apiData.illustrator || "",
            colorType: apiData.color_type || "",
            targetAge: apiData.target_age || "",
            description: apiData.description || "",
            coverImage: apiData.cover_image || "",
            location: apiData.location || "",
          });
        } else {
          Swal.fire({
            title: "Comic Not Found",
            icon: "error",
            text: `No comic found with ID: ${id}`,
          }).then(() => navigate("/"));
        }
      } catch (error) {
        Swal.fire({
          title: "Error fetching comic",
          icon: "error",
          text: error.message,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchComic();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComic({ ...comic, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await ComicsService.editComicById(id, comic);
      if (response.status === 200) {
        setComic(response.data);
        Swal.fire({
          title: "Comic Updated",
          icon: "success",
          text: "Successfully updated comic.",
        }).then(() => navigate("/"));
      }
    } catch (error) {
      Swal.fire({
        title: "Error updating comic",
        icon: "error",
        text: error.message,
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-rose-800 text-xl font-semibold">
          Loading comic data...
        </p>
      </div>
    );
  }


  return (
    <div className="flex justify-center py-12 bg-rose-50">
      <div className="card w-full max-w-3xl shadow-xl border border-rose-300 rounded-2xl bg-rose-50">
        <div className="card-body p-8">
          <h1 className="text-4xl font-bold text-center mb-8 text-rose-800">
            Edit Comic
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="form-control w-full">
                <span className="label-text font-semibold text-rose-900">Title</span>
                <input
                  type="text"
                  name="title"
                  value={comic.title}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </label>

              <label className="form-control w-full">
                <span className="label-text font-semibold text-rose-900">Author</span>
                <input
                  type="text"
                  name="author"
                  value={comic.author}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </label>

              <label className="form-control w-full">
                <span className="label-text font-semibold text-rose-900">Category</span>
                <input
                  type="text"
                  name="category"
                  value={comic.category}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </label>

              <label className="form-control w-full">
                <span className="label-text font-semibold text-rose-900">Publish Year</span>
                <input
                  type="number"
                  name="publishYear"
                  value={comic.publishYear}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </label>

              <label className="form-control w-full">
                <span className="label-text font-semibold text-rose-900">Series</span>
                <input
                  type="text"
                  name="series"
                  value={comic.series}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </label>

              <label className="form-control w-full">
                <span className="label-text font-semibold text-rose-900">Volume Number</span>
                <input
                  type="number"
                  name="volumeNumber"
                  value={comic.volumeNumber}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </label>

              <label className="form-control w-full">
                <span className="label-text font-semibold text-rose-900">Illustrator</span>
                <input
                  type="text"
                  name="illustrator"
                  value={comic.illustrator}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </label>

              <label className="form-control w-full">
                <span className="label-text font-semibold text-rose-900">Color Type</span>
                <input
                  type="text"
                  name="colorType"
                  value={comic.colorType}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </label>

              <label className="form-control w-full">
                <span className="label-text font-semibold text-rose-900">Target Age</span>
                <input
                  type="text"
                  name="targetAge"
                  value={comic.targetAge}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </label>

              <label className="form-control w-full col-span-1 md:col-span-2">
                <span className="label-text font-semibold text-rose-900">Description</span>
                <textarea
                  name="description"
                  value={comic.description}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full"
                  rows={4}
                />
              </label>

              <label className="form-control w-full">
                <span className="label-text font-semibold text-rose-900">Cover Image</span>
                <input
                  type="text"
                  name="coverImage"
                  value={comic.coverImage}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </label>

              <label className="form-control w-full">
                <span className="label-text font-semibold text-rose-900">Location</span>
                <input
                  type="text"
                  name="location"
                  value={comic.location}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </label>
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                type="button"
                className="btn btn-rose btn-outline hover:bg-rose-100 transition"
                onClick={() => navigate("/")}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn text-white bg-gradient-to-r from-rose-400 via-rose-500 to-rose-600 hover:from-rose-500 hover:via-rose-600 hover:to-rose-700 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditComic;
