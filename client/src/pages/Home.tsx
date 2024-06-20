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
    </>
  );
};

export default Home;
