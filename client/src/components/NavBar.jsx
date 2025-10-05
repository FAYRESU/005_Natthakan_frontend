import React from "react";

const NavBar = () => {
  const menuItems = [
    { name: "Search", url: "/" },
    { name: "Add Book", url: "/add-book", isButton: true },
    { name: "Add Journal", url: "/add-journal", isButton: true },
    { name: "Add Comic", url: "/add-comic", isButton: true },
  ];

  return (
    <nav className="w-full bg-gradient-to-r from-amber-900 via-amber-700 to-amber-200 shadow-lg rounded-b-xl px-4 py-3 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <a
          href="/"
          className="text-2xl font-bold text-white hover:text-gray-100 transition-colors"
        >
          Book Store
        </a>

        {/* Mobile Menu */}
        <div className="lg:hidden dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow-lg bg-white rounded-box w-52"
          >
            {menuItems.map((item) => (
              <li key={item.name}>
                {item.isButton ? (
                  <a
                    href={item.url}
                    className="text-white bg-gradient-to-r from-amber-900 via-amber-700 to-amber-300 hover:from-amber-800 hover:via-amber-600 hover:to-amber-200 rounded-md text-center py-2 px-4 transition-all shadow-md hover:shadow-lg"
                  >
                    {item.name}
                  </a>
                ) : (
                  <a
                    href={item.url}
                    className="hover:bg-amber-100 hover:text-amber-900 rounded-md transition-colors"
                  >
                    {item.name}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-4">
          {menuItems.map((item) =>
            item.isButton ? (
              <a
                key={item.name}
                href={item.url}
                className="text-white bg-gradient-to-r from-amber-900 via-amber-700 to-amber-300 hover:from-amber-800 hover:via-amber-600 hover:to-amber-200 rounded-md py-2 px-4 font-medium shadow-md hover:shadow-lg transition-all"
              >
                {item.name}
              </a>
            ) : (
              <a
                key={item.name}
                href={item.url}
                className="text-white hover:text-gray-100 font-medium transition-colors"
              >
                {item.name}
              </a>
            )
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
