import GlobalMetrics from "@/components/GlobalMetrics/GlobalMetrics";
import CoinTable from "@/components/CoinTable/CoinTable";
import Email from "@/components/Email";
import { useDarkMode } from "@/context/DarkModeContext";

const Crypto = () => {
  const { darkMode } = useDarkMode();

  return (
    <>
      <div className={`${darkMode ? "bg-white" : "dark bg-neutral-800"} `}>
        <GlobalMetrics />
        <div className="flex flex-col container">
          <header className="my-8">
            <h1 className="font-semibold text-xl md:text-3xl text-black dark:text-white">
              Today's Crypto Prices.
            </h1>
          </header>
          <CoinTable />
          <Email />
        </div>
      </div>
    </>
  );
};

export default Crypto;
