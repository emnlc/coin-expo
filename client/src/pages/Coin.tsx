import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "react-router-dom";

import CoinChart from "@/components/CoinChart/CoinChart";
import CoinPriceFormatter from "@/components/CoinPriceFormatter";

interface Coins {
  id: number;
  name: string;
  cmc_rank: number;
  symbol: string;
  slug: string;
  quote: {
    USD: {
      price: number;
      percent_change_1h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
    };
  };
}

interface Coin {
  name: string;
  id: string;
  symbol: string;
  description: string;
  logo: string;
}

const Coin = () => {
  const { coin } = useParams<{ coin: string }>();
  const location = useLocation();
  const coinStats: Coins = location.state.coin;

  const [coinData, setCoinData] = useState<Coin>();

  const { data, isLoading, isError } = useQuery({
    queryKey: [coin],
    queryFn: () => {
      const d = fetch(`coins/${coin}`).then((res) => res.json());
      return d;
    },
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (data) {
      setCoinData(data.data[coinStats.id]);
    }
  }, [data, coinStats]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error!</div>;
  if (coinData == null) return null;

  // console.log(coinData);
  return (
    <>
      <div className="flex flex-col container my-36">
        {/* coin icon, name and symbol */}
        <div className="flex flex-row items-center gap-4 mb-8">
          <img className="h-16 w-16 rounded-full" src={coinData.logo} alt="" />
          <div className="font-semibold text-2xl flex flex-col">
            <h1>{coinData.name}</h1>{" "}
            <span className=" text-sm text-gray-500">{coinData.symbol}</span>
          </div>
        </div>

        {/* coin price */}
        <div className="flex flex-row justify-start items-start">
          <h1 className="text-4xl font-semibold">
            ${<CoinPriceFormatter price={coinStats.quote.USD.price} />}
          </h1>
          <span className="text-sm text-gray-500">USD</span>
        </div>
        <p className="text-sm">{coinData.description}</p>

        <CoinChart
          name={coinStats.name}
          symbol={coinStats.symbol}
          slug={coinStats.slug}
        ></CoinChart>
      </div>
    </>
  );
};

export default Coin;
