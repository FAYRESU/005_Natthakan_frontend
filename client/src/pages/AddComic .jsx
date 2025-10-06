import React, { useState } from "react";
import ComicsService from "../service/comics.service.js";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const AddComic = () => {
  const navigate = useNavigate();

  const [comic, setComic] = useState({
    title: "",
    author: "",
    category: "",
    publishYear: "",
    isbn: "",
    series: "",
    volumeNumber: "",
    illustrator: "",
    colorType: "FULL_COLOR",
    targetAge: "TEEN",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComic((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setComic({
      title: "",
      author: "",
      category: "",
      publishYear: "",
      isbn: "",
      series: "",
      volumeNumber: "",
      illustrator: "",
      colorType: "FULL_COLOR",
      targetAge: "TEEN",
      description: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formattedComic = {
        ...comic,
        publishYear: comic.publishYear ? Number(comic.publishYear) : undefined,
        volumeNumber: comic.volumeNumber ? Number(comic.volumeNumber) : undefined,
        colorType: comic.colorType || "FULL_COLOR",
        targetAge: comic.targetAge || "TEEN",
        itemType: "Comic",
        status: "AVAILABLE",
      };

      console.log("Sending comic data:", formattedComic);

      const newComic = await ComicsService.insertComics(formattedComic);

      if (newComic.status === 201 || newComic.status === 200) {
        await Swal.fire({
          title: "Add new comic",
          text: "Add new comic successfully!",
          icon: "success",
        });
        resetForm();
        navigate("/");
      }
    } catch (error) {
      await Swal.fire({
        title: "Add new comic",
        text: error.response?.data?.message || error.message || "Request failed",
        icon: "error",
      });
      console.error("Create comic error:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 py-10">
      <div className="container mx-auto">
        <form
          onSubmit={handleSubmit}
          className="w-full p-6 m-auto bg-amber-50 rounded-2xl shadow-xl ring-2 ring-amber-300 max-w-2xl"
        >
          <h1 className="text-2xl font-semibold text-center text-amber-800 mb-6">
            Add Comic
          </h1>

          <div className="space-y-4">
            {/* Basic Fields */}
            {["title", "author", "category", "isbn", "series", "illustrator", "description"].map((key) => (
              <div key={key}>
                <label className="label">
                  <span className="text-base label-text text-amber-900">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </span>
                </label>
                <input
                  type="text"
                  placeholder={`Enter ${key}`}
                  className="w-full input input-bordered border-amber-300 focus:border-amber-500 focus:ring-amber-300"
                  name={key}
                  value={comic[key]}
                  onChange={handleChange}
                  required={["title", "author", "category"].includes(key)}
                />
              </div>
            ))}

            {/* Numeric Fields */}
            {["publishYear", "volumeNumber"].map((key) => (
              <div key={key}>
                <label className="label">
                  <span className="text-base label-text text-amber-900">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </span>
                </label>
                <input
                  type="number"
                  placeholder={`Enter ${key}`}
                  className="w-full input input-bordered border-amber-300 focus:border-amber-500 focus:ring-amber-300"
                  name={key}
                  value={comic[key]}
                  onChange={handleChange}
                />
              </div>
            ))}

            {/* Enum Dropdowns */}
            <div>
              <label className="label">
                <span className="text-base label-text text-amber-900">Color Type</span>
              </label>
              <select
                name="colorType"
                value={comic.colorType}
                onChange={handleChange}
                className="select select-bordered w-full border-amber-300 focus:border-amber-500 focus:ring-amber-300"
              >
                <option value="FULL_COLOR">Full Color</option>
                <option value="BLACK_AND_WHITE">Black & White</option>
                <option value="MIXED">Mixed</option>
              </select>
            </div>

            <div>
              <label className="label">
                <span className="text-base label-text text-amber-900">Target Age</span>
              </label>
              <select
                name="targetAge"
                value={comic.targetAge}
                onChange={handleChange}
                className="select select-bordered w-full border-amber-300 focus:border-amber-500 focus:ring-amber-300"
              >
                <option value="ALL_AGES">All Ages</option>
                <option value="CHILDREN">Children</option>
                <option value="TEEN">Teen</option>
                <option value="YOUNG_ADULT">Young Adult</option>
                <option value="ADULT">Adult</option>
                <option value="MATURE">Mature</option>
              </select>
            </div>

            {/* Buttons */}
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

export default AddComic;
