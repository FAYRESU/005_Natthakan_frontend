import React, { useState, useEffect } from "react";
import ItemsService from "../service/items.service";
import Swal from "sweetalert2";

const Home = () => {
  const [items, setItems] = useState([]);
  const [filetedItems, SetFilterItems] = useState([]);

  const handleSearch = (keyword) => {
    if (keyword === "") {
      SetFilterItems(items);
      return;
    }
    const result = items.filter((items) => {
      return (
        items.title.toLowerCase().includes(keyword.toLowerCase()) ||
        items.author.toLowerCase().includes(keyword.toLowerCase()) ||
        items.category.toLowerCase().includes(keyword.toLowerCase()) ||
        items.publishYear.toLowerCase().includes(keyword.toLowerCase()) ||
        items.isbn.toLowerCase().includes(keyword.toLowerCase()) ||
        items.publisher.toLowerCase().includes(keyword.toLowerCase()) ||
        items.edition.toLowerCase().includes(keyword.toLowerCase()) ||
        items.pageCount.toLowerCase().includes(keyword.toLowerCase()) ||
        items.language.toLowerCase().includes(keyword.toLowerCase()) ||
        items.genre.toLowerCase().includes(keyword.toLowerCase()) ||
        items.description.toLowerCase().includes(keyword.toLowerCase()) ||
        items.coverImage.toLowerCase().includes(keyword.toLowerCase()) ||
        items.location.toLowerCase().includes(keyword.toLowerCase())  
      );
    });
    SetFilterItems(result);
  };

  useEffect(() => {
    const getAllItems = async () => {
      try {
        const response = await ItemsService.getAllItems();
        if (response.status === 200) {
          setItems(response.data);
          SetFilterItems(response.data);
        }
      } catch (error) {
        Swal.fire({
          title: "Get All Items",
          icon: "error",
          text: error?.response?.data?.message || error.message,
        });
      }
    };
    getAllItems();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-300">
      {/* Hero Header */}
      <div className="py-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 drop-shadow-sm">
          🍽️ Grab Restaurant
        </h1>
        <p className="text-gray-600 mt-2">
          Find your favorite food and restaurants
        </p>
      </div>

      {/* Search Box */}
      <div className="flex justify-center mb-8">
        <label className="input input-bordered flex items-center gap-2 w-full max-w-lg shadow-md rounded-xl bg-white">
          <svg
            className="h-[1.2em] text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            name="keyword"
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search restaurant or type..."
            className="grow outline-none"
          />
        </label>
      </div>

      {/* Restaurant List */}
      <div className="container mx-auto px-4 pb-12">
        {filetedItems.length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filetedItems.map((items, index) => (
              <div
                key={index}
                className="card bg-white shadow-xl hover:shadow-2xl transition duration-300 rounded-xl"
              >
                <figure className="px-4 pt-4">
                  <p
                    src={items.title}
                    alt={items.author}
                    className="rounded-xl h-40 w-full object-cover"
                  />
                </figure>
                <figure className="px-4 pt-4">
                  <p
                    src={items.title}
                    alt={items.author}
                    className="rounded-xl h-40 w-full object-cover"
                  />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title text-lg font-semibold text-gray-800">
                    {items.title}
                  </h2>
                  <p className="text-gray-500">{items.category}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-10">No book</div>
        )}
      </div>
    </div>
  );
};

export default Home;
