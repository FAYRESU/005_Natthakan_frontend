import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import JournalsService from "../service/journals.service";

const EditJournal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [journal, setJournal] = useState({
    title: "",
    author: "",
    category: "",
    publishYear: "",
    issn: "",
    volume: "",
    issue: "",
    publisher: "",
    publicationFrequency: "",
    description: "",
    coverImage: "",
    location: "",
  });

  useEffect(() => {
    const fetchJournal = async () => {
      try {
        const res = await JournalsService.getJournalsById(id);
        setJournal(res.data);
      } catch (err) {
        Swal.fire("Error", err.message, "error");
      }
    };
    fetchJournal();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJournal({ ...journal, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const res = await JournalsService.editJournalsById(id, journal);
      if (res.status === 200) {
        Swal.fire("Success", "Journal updated successfully!", "success").then(() => {
          navigate("/");
        });
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <div className="flex justify-center py-12 bg-red-50">
      <div className="card w-full max-w-3xl shadow-xl border border-amber-300 bg-amber-50 rounded-2xl">
        <div className="card-body p-8">
          <h1 className="text-4xl font-bold text-center mb-8 text-red-800">
            Edit Journal
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(journal).map(([key, value]) => (
              <label key={key} className="form-control w-full">
                <span className="label-text font-semibold text-red-900">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                <input
                  type={["publishYear", "volume", "issue"].includes(key) ? "number" : "text"}
                  name={key}
                  value={value || ""}
                  onChange={handleChange}
                  className="input input-bordered w-full focus:border-rose-500 focus:ring focus:ring-rose-200"
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
              className="btn text-white bg-gradient-to-r from-rose-500 via-amber-500 to-red-600 hover:from-rose-600 hover:via-amber-600 hover:to-red-700 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
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

export default EditJournal;
