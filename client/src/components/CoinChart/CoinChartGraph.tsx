import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CoinChartOptions from "./CoinChartOptions";

import Lottie from "lottie-react";
import animationData from "../../assets/error.json";

import { Skeleton } from "../ui/skeleton";
import { useDarkMode } from "@/context/DarkModeContext";

import { formatPrice } from "../CoinPriceFormatter";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";

interface Props {
  id: string;
}

const CoinChartGraph = (props: Props) => {
  const { darkMode } = useDarkMode();

  // State to track screen width
  const [isMobile, setIsMobile] = useState(false);

  // Function to check screen width and update state
  const checkScreenWidth = () => {
    setIsMobile(window.innerWidth < 768); // Example threshold for mobile view
  };

  useEffect(() => {
    // Add event listener to update screen width state on resize
    window.addEventListener("resize", checkScreenWidth);
    // Initial check
    checkScreenWidth();
    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", checkScreenWidth);
  }, []);

  const fetchWithRateLimitHandling = async (url: string) => {
    const looper = true;
    while (looper) {
      const response = await fetch(url);

      if (response.status !== 429) {
        // If the response is not a 429, return the response JSON
        return response.json();
      }

      // If the response is a 429, check the Retry-After header
      const retryAfter = response.headers.get("Retry-After");

      if (retryAfter) {
        const retryAfterSeconds = parseInt(retryAfter, 10);
        await new Promise((resolve) =>
          setTimeout(resolve, retryAfterSeconds * 1000)
        );
      } else {
        // If no Retry-After header, wait for a default of 1 second
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
  };

  const [range, setRange] = useState("30");

  const setLineColor = (change: number) => {
    if (change.toString()[0] === "-") {
      return "#D70040";
    }
    return "#0BDA51";
  };

  const changeQuery = useQuery({
    queryKey: ["coin-price-change", props.id],
    queryFn: () =>
      fetchWithRateLimitHandling(
        `https://api.coingecko.com/api/v3/coins/${props.id}/`
      ),
  });

  const graphDataQuery = useQuery({
    queryKey: ["graphData", props.id, range],
    queryFn: () =>
      fetchWithRateLimitHandling(
        `https://api.coingecko.com/api/v3/coins/${props.id}/market_chart?vs_currency=usd&days=${range}`
      ),
    enabled: !!props.id && !!range, // only run if props and range is available
  });

  useEffect(() => {
    graphDataQuery.refetch();
  }, [range, graphDataQuery]);

  if (graphDataQuery.isLoading || changeQuery.isLoading) {
    return (
      <>
        <h1 className="text-2xl font-semibold">Price Chart</h1>
        <CoinChartOptions range={range} setRange={setRange} />
        <Skeleton className=" h-[400px]"></Skeleton>
      </>
    );
  }

  if (graphDataQuery.isError || changeQuery.isError) {
    if (
      graphDataQuery.error?.message.includes("Too many requests") ||
      changeQuery.error?.message.includes("Too many requests")
    ) {
      return (
        <div className="h-[440px] flex flex-row justify-center items-center">
          <Lottie className="block" animationData={animationData} />
          <span>Please try again!</span>
        </div>
      );
    }
    return (
      <div className="h-[440px] flex flex-row justify-center items-center">
        <Lottie className="block" animationData={animationData} />
        <span>Please try again!</span>
      </div>
    );
  }

  const lineColor = setLineColor(
    changeQuery.data.market_data.price_change_percentage_30d
  );

  const prices = graphDataQuery.data?.prices;

  // recharts code
  const formattedPrices = prices.map(
    ([timestamp, Price]: [number, number]) => ({
      timestamp,
      Price,
    })
  );

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const date = new Date(label);
      const value = payload[0].value !== undefined ? payload[0].value : "N/A";
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: darkMode ? "#fff" : "#171717",
            padding: "10px",
            border: "1px solid #ccc",
          }}
        >
          <p
            className="label"
            style={{ color: darkMode ? "black" : "white" }}
          >{`Date: ${date.toLocaleDateString()}`}</p>
          <p
            className="intro"
            style={{ color: darkMode ? "black" : "white" }}
          >{`Price: ${
            value !== "N/A" ? `$${formatPrice(value as number)}` : "N/A"
          }`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <h1 className="text-2xl font-semibold">Price Chart</h1>
      <CoinChartOptions range={range} setRange={setRange} />

      <ResponsiveContainer
        // className={"bg-red-500"}
        height={isMobile ? 250 : 450}
      >
        <LineChart data={formattedPrices}>
          <CartesianGrid horizontal vertical={false} strokeDasharray="0.5" />
          <XAxis
            dataKey="timestamp"
            type="number"
            domain={["dataMin", "dataMax"]} // Adjust the domain as needed
            tickFormatter={(tick) => {
              const date = new Date(tick);
              const month = date.toLocaleString("default", { month: "short" });
              const day = date.getDate();
              const year = date.getFullYear().toString().slice(-2); // Get last 2 digits of the year
              return `${month} ${day}, '${year}`;
            }}
            scale={"auto"}
            tickSize={10}
            axisLine={false}
            tickLine={false}
            tick={{ fill: darkMode ? "black" : "white" }}
            className="text-xs"
          />
          <YAxis
            domain={["auto", "auto"]}
            mirror
            tickFormatter={(tick: number) => `$${formatPrice(tick)}`}
            allowDataOverflow={true}
            className={"text-xs"}
            tick={{ fill: darkMode ? "black" : "white" }}
          />
          <Tooltip
            // labelFormatter={(label) => new Date(label).toLocaleDateString()}
            // formatter={(value: string) => `$${parseFloat(value).toFixed(2)}`}
            content={<CustomTooltip />}
          />
          <Line
            type="linear"
            dataKey="Price"
            stroke={lineColor}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default CoinChartGraph;
