import React, { useState, useEffect } from "react";
import JournalsService from "../service/journals.service.js";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router";

const EditJournal = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [journal, setJournal] = useState({
    title: "",
    author: "",
    category: "",
    publishYear: "",
    issn: "",
    volume: "",
    issue: "",
    publicationFrequency: "MONTHLY",
    publisher: "",
    description: "",
    coverImage: "",
  });

  useEffect(() => {
    const fetchJournal = async (id) => {
      try {
        const resp = await JournalsService.getJournalsById(id);
        if (resp.status === 200) {
          setJournal(resp.data.data);
        }
      } catch (error) {
        Swal.fire({
          title: "Get Journal Error",
          icon: "error",
          text: error?.response?.data?.message || error.message,
        });
      }
    };
    fetchJournal(id);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJournal((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    try {
      const updatedJournal = await JournalsService.editlJournalsById(id, journal);
      if (updatedJournal.status === 201 || updatedJournal.status === 200) {
        await Swal.fire({
          title: "Update Journal",
          text: "Update journal successfully!",
          icon: "success",
        });
        navigate("/");
      }
    } catch (error) {
      await Swal.fire({
        title: "Update Journal Error",
        text: error.message || "Request failed",
        icon: "error",
      });
      console.error("Edit journal error:", error);
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
            แก้ไขวารสาร
          </h1>

          <div className="space-y-4">
            {[
              { label: "Title", name: "title", type: "text" },
              { label: "Author", name: "author", type: "text" },
              { label: "Category", name: "category", type: "text" },
              { label: "Publish Year", name: "publishYear", type: "number" },
              { label: "ISSN", name: "issn", type: "text", readOnly: true },
              { label: "Volume", name: "volume", type: "text" },
              { label: "Issue", name: "issue", type: "text", readOnly: true },
              { label: "Publisher", name: "publisher", type: "text" },
              { label: "Description", name: "description", type: "text" },
              { label: "Cover Image URL", name: "coverImage", type: "text" },
            ].map(({ label, name, type, readOnly }) => (
              <div key={name}>
                <label className="label">
                  <span className="text-base label-text text-amber-900">{label}</span>
                </label>
                <input
                  type={type}
                  name={name}
                  value={journal[name]}
                  onChange={handleChange}
                  readOnly={readOnly}
                  placeholder={`Enter ${label}`}
                  className="w-full input input-bordered focus:border-amber-500 focus:ring focus:ring-amber-200"
                />
                {name === "coverImage" && journal.coverImage && (
                  <div className="flex items-center gap-2 mt-2">
                    <img
                      className="h-32 rounded-md border border-amber-300"
                      src={journal.coverImage}
                      alt="cover preview"
                    />
                  </div>
                )}
              </div>
            ))}

            <div className="flex justify-center items-center my-6 space-x-4">
              <button
                type="submit"
                className="btn text-white bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:via-amber-600 hover:to-amber-700 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 px-6"
              >
                ยืนยัน
              </button>
              <button
                type="button"
                className="btn border-amber-400 text-amber-700 hover:bg-amber-100 transition px-6"
                onClick={() => navigate("/journals")}
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

export default EditJournal;
