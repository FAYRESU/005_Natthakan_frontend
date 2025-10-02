import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const ItemForm = ({ type, initialData = {}, onSubmit }) => {
  const baseFields = {
    title: "",
    author: "",
    category: "",
    publishYear: "",
    isbn: "",
    publisher: "",
    description: "",
    coverImage: "",
    location: "",
  };

  const subclassFields = {
    Book: { edition: "", pageCount: "", language: "", genre: "" },
    Journal: { issn: "", volume: "", issue: "", publicationFrequency: "" },
    Comic: { series: "", volumeNumber: "", illustrator: "", colorType: "", targetAge: "" },
  };

  const [formData, setFormData] = useState({ ...baseFields, ...subclassFields[type], ...initialData });

  useEffect(() => {
    setFormData({ ...baseFields, ...subclassFields[type], ...initialData });
  }, [type, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => onSubmit(formData);

  return (
    <div className="card p-4 bg-white shadow-md">
      {Object.keys(formData).map((key) => {
        const isTextarea = key === "description";
        const isNumber = ["publishYear", "pageCount", "volumeNumber"].includes(key);

        return (
          <label key={key} className="form-control mb-3">
            <span className="label-text font-semibold">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
            {isTextarea ? (
              <textarea name={key} value={formData[key]} onChange={handleChange} className="textarea textarea-bordered w-full" rows={3} />
            ) : (
              <input type={isNumber ? "number" : "text"} name={key} value={formData[key]} onChange={handleChange} placeholder={key} className="input input-bordered w-full"/>
            )}
          </label>
        );
      })}
      <div className="flex justify-end gap-3 mt-4">
        <button className="btn btn-outline" type="button" onClick={() => setFormData({ ...baseFields, ...subclassFields[type] })}>Reset</button>
        <button className="btn btn-success" type="button" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default ItemForm;
