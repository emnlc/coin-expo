interface Props {
  coin: Coins;
}

interface Coins {
  id: number;
  name: string;
  cmc_rank: number;
  symbol: string;
  slug: string;
  max_supply: number;
  total_supply: number;
  circulating_supply: number;
  quote: {
    USD: {
      price: number;
      percent_change_1h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      market_cap: number;
      volume_24h: number;
      fully_diluted_market_cap: number;
      market_cap_dominance: number;
    };
  };
}

const CoinStatistics = (props: Props) => {
  return (
    <div className="flex flex-col gap-4 mb-16">
      <h1 className="font-semibold text-sm md:text-2xl">
        {props.coin.name} Statistics
      </h1>
      <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-16 ">
        <div className="coin-stats-left flex flex-col gap-4 w-full">
          <div className="market-cap font-medium text-xs md:text-base flex flex-row justify-between">
            <span>Market Cap</span>$
            {props.coin.quote.USD.market_cap.toLocaleString("en-US", {
              maximumFractionDigits: 0,
            })}
          </div>
          <div className="volume font-medium text-xs md:text-base flex flex-row justify-between">
            <span>24h Volume</span>$
            {props.coin.quote.USD.volume_24h.toLocaleString("en-US", {
              maximumFractionDigits: 0,
            })}
          </div>
          <div className="volume font-medium text-xs md:text-base flex flex-row justify-between">
            <span>Market Cap Dominance</span>
            {props.coin.quote.USD.market_cap_dominance.toLocaleString("en-US", {
              maximumFractionDigits: 2,
            })}
            %
          </div>
        </div>

        <div className="coin-stats-right flex flex-col gap-4 w-full">
          <div className="volume font-medium text-xs md:text-base flex flex-row justify-between">
            <span>Total Supply</span>$
            {props.coin.total_supply.toLocaleString("en-US", {
              maximumFractionDigits: 0,
            })}{" "}
            {props.coin.symbol}
          </div>
          <div className="volume font-medium text-xs md:text-base flex flex-row justify-between">
            <span>Max Supply</span>
            {props.coin.max_supply
              ? `$${props.coin.max_supply.toLocaleString("en-US", {
                  maximumFractionDigits: 0,
                })} ${props.coin.symbol}`
              : "∞"}
          </div>
          <div className="volume font-medium text-xs md:text-base flex flex-row justify-between">
            <span>Fully Diluted Market Cap </span>$
            {props.coin.quote.USD.fully_diluted_market_cap.toLocaleString(
              "en-US",
              {
                maximumFractionDigits: 0,
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinStatistics;
