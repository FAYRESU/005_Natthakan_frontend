import { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import ComicsService from "../service/comics.service";

const AddComic = () => {
  const [comic, setComic] = useState({
    title: "",
    author: "",
    category: "",
    publishYear: "",
    series: "",
    volumeNumber: "",
    illustrator: "",
    colorType: "",
    targetAge: "",
    description: "",
    coverImage: "",
    location: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComic({ ...comic, [name]: value });
  };

  const resetForm = () => {
    setComic({
      title: "",
      author: "",
      category: "",
      publishYear: "",
      series: "",
      volumeNumber: "",
      illustrator: "",
      colorType: "",
      targetAge: "",
      description: "",
      coverImage: "",
      location: "",
    });
  };

  const handleSubmit = async () => {
    try {
      const res = await ComicsService.insertComics(comic);
      if (res.status === 201) {
        Swal.fire({
          title: "เพิ่มการ์ตูนเรียบร้อย",
          text: "Comic added successfully!",
          icon: "success",
        }).then(() => {
          resetForm();
          navigate("/");
        });
      }
    } catch (error) {
      Swal.fire({
        title: "ผิดพลาด",
        text: error.message,
        icon: "error",
      });
    }
  };

  return (
    <div className="flex justify-center py-12 bg-amber-50">
      <div className="card w-full max-w-3xl shadow-xl border border-amber-300 rounded-2xl bg-amber-50">
        <div className="card-body p-8">
          <h1 className="text-4xl font-bold text-center mb-8 text-amber-800">
            เพิ่มการ์ตูนใหม่
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <label className="form-control w-full">
              <span className="label-text font-semibold text-amber-900">ชื่อเรื่อง</span>
              <input
                type="text"
                name="title"
                value={comic.title}
                onChange={handleChange}
                placeholder="ระบุชื่อเรื่อง"
                className="input input-bordered w-full focus:border-amber-500 focus:ring focus:ring-amber-200"
              />
            </label>

            {/* Author */}
            <label className="form-control w-full">
              <span className="label-text font-semibold text-amber-900">ผู้แต่ง</span>
              <input
                type="text"
                name="author"
                value={comic.author}
                onChange={handleChange}
                placeholder="ระบุผู้แต่ง"
                className="input input-bordered w-full focus:border-amber-500 focus:ring focus:ring-amber-200"
              />
            </label>

            {/* Category */}
            <label className="form-control w-full">
              <span className="label-text font-semibold text-amber-900">หมวดหมู่</span>
              <input
                type="text"
                name="category"
                value={comic.category}
                onChange={handleChange}
                placeholder="Action, Fantasy, Comedy"
                className="input input-bordered w-full focus:border-amber-500 focus:ring focus:ring-amber-200"
              />
            </label>

            {/* Publish Year */}
            <label className="form-control w-full">
              <span className="label-text font-semibold text-amber-900">ปีที่พิมพ์</span>
              <input
                type="number"
                name="publishYear"
                value={comic.publishYear}
                onChange={handleChange}
                placeholder="ระบุปีที่พิมพ์"
                className="input input-bordered w-full focus:border-amber-500 focus:ring focus:ring-amber-200"
              />
            </label>

            {/* Series */}
            <label className="form-control w-full">
              <span className="label-text font-semibold text-amber-900">ชื่อซีรีส์</span>
              <input
                type="text"
                name="series"
                value={comic.series}
                onChange={handleChange}
                placeholder="One Piece, Naruto"
                className="input input-bordered w-full focus:border-amber-500 focus:ring focus:ring-amber-200"
              />
            </label>

            {/* Volume Number */}
            <label className="form-control w-full">
              <span className="label-text font-semibold text-amber-900">เล่มที่</span>
              <input
                type="number"
                name="volumeNumber"
                value={comic.volumeNumber}
                onChange={handleChange}
                placeholder="ระบุเล่มที่ในซีรีส์"
                className="input input-bordered w-full focus:border-amber-500 focus:ring focus:ring-amber-200"
              />
            </label>

            {/* Illustrator */}
            <label className="form-control w-full">
              <span className="label-text font-semibold text-amber-900">นักวาด</span>
              <input
                type="text"
                name="illustrator"
                value={comic.illustrator}
                onChange={handleChange}
                placeholder="ชื่อผู้วาด"
                className="input input-bordered w-full focus:border-amber-500 focus:ring focus:ring-amber-200"
              />
            </label>

            {/* Color Type */}
            <label className="form-control w-full">
              <span className="label-text font-semibold text-amber-900">ประเภทสี</span>
              <input
                type="text"
                name="colorType"
                value={comic.colorType}
                onChange={handleChange}
                placeholder="สีเต็ม, ขาวดำ, ผสม"
                className="input input-bordered w-full focus:border-amber-500 focus:ring focus:ring-amber-200"
              />
            </label>

            {/* Target Age */}
            <label className="form-control w-full">
              <span className="label-text font-semibold text-amber-900">กลุ่มอายุ</span>
              <input
                type="text"
                name="targetAge"
                value={comic.targetAge}
                onChange={handleChange}
                placeholder="เด็ก, วัยรุ่น, ผู้ใหญ่"
                className="input input-bordered w-full focus:border-amber-500 focus:ring focus:ring-amber-200"
              />
            </label>
          </div>

          {/* Description */}
          <label className="form-control w-full mt-6">
            <span className="label-text font-semibold text-amber-900">คำอธิบาย</span>
            <textarea
              name="description"
              value={comic.description}
              onChange={handleChange}
              placeholder="เขียนคำอธิบายสั้น ๆ"
              className="textarea textarea-bordered w-full focus:border-amber-500 focus:ring focus:ring-amber-200"
              rows={4}
            />
          </label>

          {/* Cover Image */}
          <label className="form-control w-full mt-4">
            <span className="label-text font-semibold text-amber-900">รูปปก (URL)</span>
            <input
              type="text"
              name="coverImage"
              value={comic.coverImage}
              onChange={handleChange}
              placeholder="วาง URL รูปปก"
              className="input input-bordered w-full focus:border-amber-500 focus:ring focus:ring-amber-200"
            />
          </label>

          {/* Location */}
          <label className="form-control w-full mt-4">
            <span className="label-text font-semibold text-amber-900">ตำแหน่งเก็บ</span>
            <input
              type="text"
              name="location"
              value={comic.location}
              onChange={handleChange}
              placeholder="Shelf B1, Library Room 2"
              className="input input-bordered w-full focus:border-amber-500 focus:ring focus:ring-amber-200"
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
              className="btn text-white bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:via-amber-600 hover:to-amber-700 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
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

export default AddComic;
