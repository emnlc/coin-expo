import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

import { useDarkMode } from "@/context/DarkModeContext";

const Home = () => {
  const { darkMode } = useDarkMode();

  return (
    <>
      <div className={`${darkMode ? "bg-white" : "dark bg-neutral-800"}`}>
        <div
          className={`text-black dark:text-white h-screen container py-36 flex flex-col items-center justify-center gap-8`}
        >
          <h1 className=" font-extrabold text-4xl md:text-6xl w-fit">
            View the{" "}
            <span className=" bg-gradient-to-r from-coinExpo to-coinExpoGradient text-transparent bg-clip-text">
              latest cryptocurrency
            </span>{" "}
            details, prices, and historical charts.
          </h1>
          <p className="text-base md:text-2xl font-medium">
            Coin Expo includes the top 1000 ranking coins from{" "}
            <span className="text-coinmarketcap font-semibold">
              CoinMarketCap
            </span>{" "}
            and <span className="text-coingecko font-semibold">Coingecko</span>,
            using their detailed information.
          </p>
          <Link to={"/crypto"}>
            <Button
              size={"lg"}
              className="w-full md:w-fit bg-coinExpo hover:opacity-80 my-8 text-white "
            >
              View Prices
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
