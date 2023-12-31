import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-4 sticky bottom-0">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Grzegorz Kawecki. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
