import React, { useState, useEffect } from "react";
import ComicsService from "../service/comics.service.js";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router";

const EditComic = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [comic, setComic] = useState({
    title: "",
    author: "",
    category: "",
    publishYear: "",
    isbn: "",
    series: "",
    volumeNumber: "",
    illustrator: "",
    colorType: "",
    targetAge: "",
    description: "",
    coverImage: "",
  });

  useEffect(() => {
    const updateComic = async (id) => {
      try {
        const resp = await ComicsService.getComicsById(id);
        if (resp.status === 200) {
          setComic(resp.data.data);
        }
      } catch (error) {
        Swal.fire({
          title: "Get Comic Error",
          icon: "error",
          text: error?.response?.data?.message || error.message,
        });
      }
    };
    updateComic(id);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComic((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    try {
      const newComic = await ComicsService.editlComicsById(id, comic);

      if (newComic.status === 201 || newComic.status === 200) {
        await Swal.fire({
          title: "Update Comic",
          text: "Update successfully!",
          icon: "success",
        });
        navigate("/");
      }
    } catch (error) {
      await Swal.fire({
        title: "Update Comic Error",
        text: error.message || "Request failed",
        icon: "error",
      });
      console.error("Edit comic error:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center min-h-screen bg-stone-100 py-10">
      <div className="container mx-auto">
        <form
          onSubmit={handleSubmit}
          className="w-full p-6 m-auto bg-stone-50 rounded-2xl shadow-xl ring-2 ring-stone-300 max-w-2xl"
        >
          <h1 className="text-2xl font-semibold text-center text-stone-800 mb-6">
            แก้ไขการ์ตูน
          </h1>

          <div className="space-y-4">
            {[
              { label: "Title", name: "title", type: "text" },
              { label: "Author", name: "author", type: "text" },
              { label: "Category", name: "category", type: "text" },
              { label: "Publish Year", name: "publishYear", type: "number" },
              { label: "ISBN", name: "isbn", type: "text", readOnly: true },
              { label: "Series", name: "series", type: "text" },
              { label: "Volume Number", name: "volumeNumber", type: "number" },
              { label: "Illustrator", name: "illustrator", type: "text" },
              { label: "Color Type", name: "colorType", type: "text" },
              { label: "Target Age", name: "targetAge", type: "text" },
              { label: "Description", name: "description", type: "text" },
              { label: "Cover Image URL", name: "coverImage", type: "text" },
            ].map(({ label, name, type, readOnly }) => (
              <div key={name}>
                <label className="label">
                  <span className="text-base label-text text-stone-800">{label}</span>
                </label>
                <input
                  type={type}
                  name={name}
                  value={comic[name]}
                  onChange={handleChange}
                  readOnly={readOnly}
                  placeholder={`Enter ${label}`}
                  className="w-full input input-bordered focus:border-stone-500 focus:ring focus:ring-stone-200"
                />
                {name === "coverImage" && comic.coverImage && (
                  <div className="flex items-center gap-2 mt-2">
                    <img
                      className="h-32 rounded-md border border-stone-300"
                      src={comic.coverImage}
                      alt="cover preview"
                    />
                  </div>
                )}
              </div>
            ))}

            <div className="flex justify-center items-center my-6 space-x-4">
              <button
                type="submit"
                className="btn text-white bg-gradient-to-r from-stone-400 via-stone-500 to-stone-600 hover:from-stone-500 hover:via-stone-600 hover:to-stone-700 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 px-6"
              >
                ยืนยัน
              </button>
              <button
                type="button"
                className="btn border-stone-400 text-stone-700 hover:bg-stone-200 transition px-6"
                onClick={() => navigate("/comics")}
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditComic;
