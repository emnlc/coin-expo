interface Props {
  coin: Coins;
  img: string;
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

const CoinHeader = (props: Props) => {
  const percentChangeColor = (change: number) => {
    let color = "green";
    let tick = "up";
    let negative = false;
    if (change.toLocaleString()[0] === "-") {
      color = "red";
      tick = "down";
      negative = true;
    }

    return (
      <>
        <img src={`/${tick}.svg`} className="w-4 h-4" alt="" />
        <span className={`text-${color}-500 font-semibold text-sm`}>
          {negative
            ? change.toFixed(2).toString().slice(1)
            : change.toFixed(2).toString()}
          % (1h)
        </span>
      </>
    );
  };

  return (
    <div className="flex flex-row items-center gap-4 mb-8">
      <img className="h-16 w-16 rounded-full" src={props.img} alt="" />
      <div className="font-semibold text-2xl flex flex-col">
        <div className="flex items-center">
          {props.coin.name}{" "}
          {percentChangeColor(props.coin.quote.USD.percent_change_1h)}
        </div>{" "}
        <span className=" text-sm text-gray-500">{props.coin.symbol}</span>
      </div>
    </div>
  );
};

export default CoinHeader;
