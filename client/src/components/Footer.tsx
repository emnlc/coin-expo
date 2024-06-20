const Footer = () => {
  return (
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
  );
};

export default Footer;
