import { useState } from "react";
import { Link } from "react-router-dom";

import { useDarkMode } from "@/context/DarkModeContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoon,
  faSun,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className={`${
          darkMode ? "" : "dark"
        } shadow-md w-full fixed top-0 left-0 z-50 md:relative`}
      >
        <div className=" font-bold text-2xl items-center md:flex justify-between bg-white dark:bg-neutral-900 dark:text-white py-4 md:px-10 px-7">
          <Link className="flex items-center gap-4 " to={"/"}>
            <img src="logo.svg"></img>
            <h1 className="hidden md:block hover:text-coinExpo transition-all hover:duration-150 duration-0">
              Coin Expo
            </h1>
          </Link>

          {/* icon container */}
          <div
            onClick={() => setOpen(!open)}
            className="h-8 w-8 text-xl absolute right-4 top-6 cursor-pointer md:hidden"
          >
            {open ? (
              <FontAwesomeIcon
                icon={faXmark}
                className={`${
                  darkMode ? "text-black" : "text-white"
                } transition-all duration-200`}
              />
            ) : (
              <FontAwesomeIcon
                icon={faBars}
                className={`${
                  darkMode ? "text-black" : "text-white"
                } transition-all duration-200`}
              />
            )}
          </div>

          {/* Links container */}
          <ul
            className={`md:flex md:items-center text-base md:pb-0 pb-4 bg-white dark:bg-neutral-900 shadow-2xl md:shadow-none absolute md:static md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all md:transition-none duration-700 ${
              open ? " top-16 " : "top-[-490px]"
            }`}
            style={{
              transitionProperty: "top, background-color",
              transitionDuration: "700ms, 0ms",
            }}
          >
            {/* <li className="md:ml-8  md:my-0 my-7">
              <Link
                onClick={() => setOpen(!open)}
                to={"/"}
                className="hover:text-coinExpo transition-colors "
              >
                Home
              </Link>
            </li> */}
            <li className="md:ml-8  md:my-0 my-7">
              <Link
                to={"/"}
                className="hover:text-coinExpo transition-colors hover:duration-150 duration-0 "
              >
                Account
              </Link>
            </li>
            <li className="md:ml-8 md:my-0 my-7">
              <Link
                to={"/crypto"}
                className="hover:text-coinExpo transition-colors hover:duration-150 duration-0"
              >
                Crypto
              </Link>
            </li>
            <li className="md:ml-8 md:my-0 my-7">
              <button
                onClick={toggleDarkMode}
                className="bg-white dark:bg-neutral-900 text-black dark:text-white "
              >
                {darkMode ? (
                  <FontAwesomeIcon
                    className="hover:text-coinExpo transition-colors w-6 duration-0"
                    icon={faSun}
                  />
                ) : (
                  <FontAwesomeIcon
                    className="hover:text-coinExpo transition-colors w-6 duration-0"
                    icon={faMoon}
                  />
                )}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
