import React from "react";

import CoinTable from "@/components/CoinTable/CoinTable";

const Home = () => {
  return (
    <>
      <div className="flex flex-col container my-36">
        <header className="my-16">
          <h1 className="font-medium text-xl">Todays crypto analytics.</h1>
        </header>
        <CoinTable />
      </div>
      <footer className=" bg-zinc-800 text-white py-24 flex justify-center">
        <ul className="text-center">
          <li>
            Data provided by{" "}
            <a
              className="hover:text-coinmarketcap hover:underline transition-all"
              href=""
            >
              CoinMarketCap
            </a>
          </li>
          <li>
            Powered by{" "}
            <a
              className="hover:text-coingecko hover:underline transition-all"
              href="https://www.coingecko.com/"
            >
              CoinGecko
            </a>
          </li>
        </ul>
      </footer>
    </>
  );
};

export default Home;
