import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "react-router-dom";

import CoinChart from "@/components/CoinChart/CoinChart";
import CoinPriceFormatter from "@/components/CoinPriceFormatter";
import CoinHeader from "@/components/CoinPage/CoinHeader";

import CoinStatistics from "@/components/CoinPage/CoinStatistics";
import CoinDescription from "@/components/CoinPage/CoinDescription";
import CoinUrls from "@/components/CoinPage/CoinUrls";

import Loader from "@/components/Loader/Loader";

import { useDarkMode } from "@/context/DarkModeContext";

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

interface Coin {
  name: string;
  id: string;
  symbol: string;
  description: string;
  logo: string;
  twitter_username: string;
  urls: {
    website: [string];
    twitter: [string];
    message_board: [string];
    facebook: [string];
    explorer: [];
    reddit: [string];
    technical_doc: [string];
    source_code: [string];
  };
}

const Coin = () => {
  const { darkMode } = useDarkMode();

  const { coin } = useParams<{ coin: string }>();
  const location = useLocation();
  const coinStats: Coins = location.state.coin;

  const [coinData, setCoinData] = useState<Coin>();

  const { data, isLoading, isError } = useQuery({
    queryKey: [coin],
    queryFn: () => {
      const d = fetch(
        `${import.meta.env.VITE_COINEXPO_SERVER_URL}/coins/${coin}`
      ).then((res) => res.json());
      return d;
    },
    staleTime: 5 * 60 * 1000,
  });

  // console.log(data);
  useEffect(() => {
    if (data) {
      setCoinData(data.data[coinStats.id]);
    }
  }, [data, coinStats]);

  if (isLoading) return <Loader />;
  if (isError) return <div>Error!</div>;
  if (coinData == null) return null;

  // console.log(coinData);
  return (
    <>
      <div className={`${darkMode ? "bg-white" : "dark bg-neutral-800"} `}>
        <div className="flex flex-col container py-36 dark:text-white">
          {/* coin icon, name and symbol */}
          <CoinHeader coin={coinStats} img={coinData.logo} />

          {/* coin price */}
          <div className="flex flex-row justify-start items-start">
            <h1 className="text-4xl font-semibold">
              ${<CoinPriceFormatter price={coinStats.quote.USD.price} />}
            </h1>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
              USD
            </span>
          </div>

          <CoinChart
            name={coinStats.name}
            symbol={coinStats.symbol}
            slug={coinStats.slug}
          />

          <CoinStatistics coin={coinStats} />

          <div className="flex flex-col md:flex-row gap-16">
            <CoinDescription
              name={coinData.name}
              description={coinData.description}
            />

            <CoinUrls coin={coinData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Coin;
