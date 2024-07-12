import "./Loader.css";

import { useDarkMode } from "@/context/DarkModeContext";

const Loading = () => {
  const { darkMode } = useDarkMode();

  return (
    <>
      <div
        className={`h-screen flex justify-center items-center ${
          darkMode ? "bg-white" : "bg-neutral-800"
        }`}
      >
        <div className="loader"></div>
      </div>
    </>
  );
};

export default Loading;
