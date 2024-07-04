import GlobalMetrics from "@/components/GlobalMetrics";
import CoinTable from "@/components/CoinTable/CoinTable";

const Home = () => {
  return (
    <>
      <GlobalMetrics />
      <div className="flex flex-col container">
        <header className="my-8">
          <h1 className="font-semibold text-xl">Today's Crypto Prices.</h1>
        </header>
        <CoinTable />
      </div>
    </>
  );
};

export default Home;
