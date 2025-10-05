import React, { useState } from "react";
import JournalsService from "../service/journals.service.js";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const AddJournal = () => {
  const navigate = useNavigate();

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
    description: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJournal((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setJournal({
      title: "",
      author: "",
      category: "",
      publishYear: "",
      issn: "",
      volume: "",
      issue: "",
      publicationFrequency: "MONTHLY",
      publisher: "",
      description: ""
    });
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    try {
      const newJournal = await JournalsService.createJournal(journal);

      if (newJournal.status === 201 || newJournal.status === 200) {
        await Swal.fire({
          title: "Add new journal",
          text: "Add new journal successfully!",
          icon: "success",
        });
        resetForm();
        navigate("/journals");
      }

    } catch (error) {
      await Swal.fire({
        title: "Add new journal",
        text: error.message || "Request failed",
        icon: "error",
      });
      console.error("Create journal error:", error);
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
            Add Journal
          </h1>

          <div className="space-y-4">
            {Object.keys(journal).map((key) => (
              <div key={key}>
                <label className="label">
                  <span className="text-base label-text text-black">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </span>
                </label>
                <input
                  type={key === "publishYear" || key === "volume" || key === "issue" ? "number" : "text"}
                  placeholder={`Enter ${key}`}
                  className="w-full input input-bordered"
                  name={key}
                  value={journal[key]}
                  onChange={handleChange}
                />
              </div>
            ))}

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

export default AddJournal;
