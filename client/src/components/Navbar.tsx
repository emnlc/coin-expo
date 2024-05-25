import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="shadow-md w-full fixed top-0 left-0">
        <div className=" font-bold text-2xl items-center md:flex justify-between bg-white py-4 md:px-10 px-7">
          {/* <h1>Coin Expo</h1> */}
          <Link to={"/"}>Coin Expo</Link>

          {/* Image container */}
          <div
            onClick={() => setOpen(!open)}
            className="h-8 w-8 text-3xl absolute right-8 top-4 cursor-pointer md:hidden"
          >
            <img
              className=" transition-all"
              src={`${open ? "close.svg" : "hamburger.svg"}`}
              alt=""
            />
          </div>

          {/* Links container */}
          <ul
            className={`md:flex md:items-center md:pb-0 pb-4 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-700 ${
              open ? " top-16 " : "top-[-490px]"
            }`}
          >
            <li className="md:ml-8 text-xl md:my-0 my-7">
              <Link to={"/"}>1</Link>
            </li>
            <li className="md:ml-8 text-xl md:my-0 my-7">
              <Link to={"/"}>2</Link>
            </li>
            <li className="md:ml-8 text-xl md:my-0 my-7">
              <Link to={"/"}>3</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
