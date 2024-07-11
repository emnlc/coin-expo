import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

interface GlobalMetrics {
  data: {
    eth_dominance: number;
    btc_dominance: number;
    eth_dominance_24h_percentage_change: number;
    btc_dominance_24h_percentage_change: number;

    quote: {
      USD: {
        total_market_cap: number;
        total_volume_24h: number;
        total_market_cap_yesterday_percentage_change: number;
        total_volume_24h_yesterday_percentage_change: number;
      };
    };
  };
}

const GlobalMetrics = () => {
  const [isOpen, setIsOpen] = useState(false);

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
        <img src={`/${tick}.svg`} className="w-4 h-4 inline" alt="" />
        <span
          className={`text-${color}-500 font-semibold text-xs md:text-base`}
        >
          {negative
            ? `${change.toFixed(2).toString().slice(1)}`
            : change.toFixed(2).toString()}
          %
        </span>
      </>
    );
  };

  const formatNumber = (value: number) => {
    if (value >= 1e12) {
      return (value / 1e12).toFixed(2) + "T";
    } else if (value >= 1e9) {
      return (value / 1e9).toFixed(2) + "B";
    } else if (value >= 1e6) {
      return (value / 1e6).toFixed(2) + "M";
    } else if (value >= 1e3) {
      return (value / 1e3).toFixed(2) + "K";
    } else {
      return value.toString();
    }
  };

  const { data, isLoading, isError } = useQuery<GlobalMetrics>({
    queryKey: ["global-metrics"],
    queryFn: () => {
      const d = fetch(
        `${import.meta.env.VITE_COINEXPO_SERVER_URL}/coins/global-metrics`
      ).then((res) => res.json());

      return d;
    },
    staleTime: 1000 * 60 * 30, // 5 minutes
  });
  //   console.log(data);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error!</p>;
  if (!data) return <p>No data</p>;

  return (
    <div className="flex flex-col container gap-4 mt-36 mb-4">
      <h1 className="text-xl md:text-3xl font-semibold">
        Todays Global Metrics
      </h1>
      <div>
        {/* Visible Line */}
        <p className="text-sm md:text-base">
          The total crypto market cap is{" "}
          <span className="font-semibold">
            ${formatNumber(data.data.quote.USD.total_market_cap)}
          </span>
          , reflecting a{" "}
          {percentChangeColor(
            data.data.quote.USD.total_market_cap_yesterday_percentage_change
          )}{" "}
          change in the past 24 hours.{" "}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`${isOpen ? "hidden" : "relative"}`}
          >
            <span className="text-gray-500 underline">Read More</span>
          </button>
        </p>

        <p className={`text-sm md:text-base ${isOpen ? "relative" : "hidden"}`}>
          The total crypto market volume over the last 24 hours is{" "}
          <span className="font-semibold">
            ${formatNumber(data.data.quote.USD.total_volume_24h)}
          </span>
          , a{" "}
          {percentChangeColor(
            data.data.quote.USD.total_volume_24h_yesterday_percentage_change
          )}{" "}
          change. Bitcoin's dominance in the market is{" "}
          <span className="font-semibold">
            {data.data.btc_dominance.toFixed(2)}%
          </span>
          , a{" "}
          {percentChangeColor(data.data.btc_dominance_24h_percentage_change)}{" "}
          change in the past day. Ethereum's dominance in the market is{" "}
          <span className="font-semibold">
            {data.data.eth_dominance.toFixed(2)}%
          </span>
          , a{" "}
          {percentChangeColor(data.data.eth_dominance_24h_percentage_change)} in
          the last 24 hours.
          <br />
          <button onClick={() => setIsOpen(!isOpen)}>
            <span className="text-gray-500 underline">Read Less</span>
          </button>
        </p>

        {/* read more content */}
      </div>
    </div>
  );
};

export default GlobalMetrics;
