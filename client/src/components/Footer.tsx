import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="flex flex-col lg:flex-row md:items-start lg:justify-between gap-16 text-white py-12 bg-neutral-900">
      {/* Logo */}
      <Link
        className="flex items-center w-fit text-2xl font-bold gap-4 ml-6 lg:ml-32 "
        to={"/"}
      >
        <img src="logo.svg"></img>
        <h1 className="block hover:text-coinExpo transition-all duration-150">
          Coin Expo
        </h1>
      </Link>

      <div className="flex flex-row justify-between gap-20 mx-8 md:mr-32">
        {/* Data providers */}
        <div className="flex flex-col gap-2 text-sm md:text-lg">
          <h1 className="font-medium underline mb-4">Data Providers</h1>
          <p>
            Listings provided by{" "}
            <a
              className="hover:text-coinmarketcap hover:underline transition-all duration-150"
              target="_blank"
              href="https://coinmarketcap.com/api/"
            >
              CoinMarketCap
            </a>
          </p>

          <p>
            Visuals powered by{" "}
            <a
              className="hover:text-coingecko hover:underline transition-all duration-150"
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
            className="hover:text-coinExpo hover:underline transition-all duration-150"
            href=""
          >
            X (Twitter)
          </a>

          <a
            className="hover:text-coinExpo hover:underline transition-all duration-150"
            href="/"
          >
            Telegram
          </a>

          <a
            className="hover:text-coinExpo hover:underline transition-all duration-150"
            href="/"
          >
            Instagram
          </a>

          <a
            className="hover:text-coinExpo hover:underline transition-all duration-150"
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
