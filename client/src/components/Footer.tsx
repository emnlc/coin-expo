import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="flex flex-col md:flex-row md:items-start md:justify-between gap-16 text-white py-12 bg-footerColor">
      {/* Logo */}
      <Link
        className="flex items-center w-fit text-2xl font-bold gap-4 ml-6 md:ml-32 hover:hover:text-coinExpo transition-all"
        to={"/"}
      >
        <img src="logo.svg"></img>
        <span className="block">Coin Expo</span>
      </Link>

      <div className="flex flex-row justify-between gap-20 mx-8 md:mr-32">
        {/* Data providers */}
        <div className="flex flex-col gap-2 text-sm md:text-lg">
          <h1 className="font-medium underline mb-4">Data Providers</h1>
          <p>
            Listings provided by{" "}
            <a
              className="hover:text-coinmarketcap hover:underline transition-all"
              target="_blank"
              href="https://coinmarketcap.com/api/"
            >
              CoinMarketCap
            </a>
          </p>

          <p>
            Visuals powered by{" "}
            <a
              className="hover:text-coingecko hover:underline transition-all"
              target="_blank"
              href="https://www.coingecko.com/en/api"
            >
              CoinGecko
            </a>
          </p>
        </div>

        {/* Socials */}

        <div className="flex flex-col gap-2 text-sm md:text-lg">
          <h1 className="font-medium underline mb-4">Socials</h1>
          <a
            className="hover:text-coinExpo hover:underline transition-all"
            href=""
          >
            X (Twitter)
          </a>

          <a
            className="hover:text-coinExpo hover:underline transition-all"
            href="/"
          >
            Telegram
          </a>

          <a
            className="hover:text-coinExpo hover:underline transition-all"
            href="/"
          >
            Instagram
          </a>

          <a
            className="hover:text-coinExpo hover:underline transition-all"
            href="/"
          >
            Reddit
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
