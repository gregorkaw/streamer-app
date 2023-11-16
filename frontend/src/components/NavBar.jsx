import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-black text-white lg:px-0 px-12 py-4 sticky top-0">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold ">
          Streamers App
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-gray-300">
              Home
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
