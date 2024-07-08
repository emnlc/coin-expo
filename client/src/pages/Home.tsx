import GlobalMetrics from "@/components/GlobalMetrics";
import CoinTable from "@/components/CoinTable/CoinTable";
import Email from "@/components/Email";

const Home = () => {
  return (
    <>
      <GlobalMetrics />
      <div className="flex flex-col container">
        <header className="my-8">
          <h1 className="font-semibold text-xl md:text-3xl">
            Today's Crypto Prices.
          </h1>
        </header>
        <CoinTable />
        <Email />
      </div>
    </>
  );
};

export default Home;
