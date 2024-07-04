import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ReactECharts from "echarts-for-react";
import CoinChartOptions from "./CoinChartOptions";

import { Skeleton } from "../ui/skeleton";

interface Props {
  id: string;
}

const CoinChartGraph = (props: Props) => {
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
      fetch(`https://api.coingecko.com/api/v3/coins/${props.id}/`).then((res) =>
        res.json()
      ),
  });

  const graphDataQuery = useQuery({
    queryKey: ["graphData", props.id, range],
    queryFn: () =>
      fetch(
        `https://api.coingecko.com/api/v3/coins/${props.id}/market_chart?vs_currency=usd&days=${range}`
      ).then((res) => res.json()),
    enabled: !!props.id && !!range, // only run if props and range is available
  });

  useEffect(() => {
    graphDataQuery.refetch();
  }, [range, graphDataQuery]);

  if (graphDataQuery.isLoading || changeQuery.isLoading) {
    return <Skeleton className=" h-[400px]"></Skeleton>;
  }
  if (graphDataQuery.isError || changeQuery.isError) {
    return <div>Error loading data</div>;
  }

  const lineColor = setLineColor(
    changeQuery.data.market_data.price_change_percentage_30d
  );
  const prices = graphDataQuery.data?.prices;
  const formattedData = prices.map((item: [number, number]) => ({
    x: new Date(item[0]),
    y: item[1],
  }));

  // Find min and max values
  const minValue = Math.min(
    ...formattedData.map((item: { y: number }) => item.y)
  );
  const maxValue = Math.max(
    ...formattedData.map((item: { y: number }) => item.y)
  );

  const rangeBuffer = (maxValue - minValue) * 0.3;
  const minRange = Math.max(0, minValue - rangeBuffer);
  const maxRange = maxValue + rangeBuffer;

  const options = {
    grid: {
      left: 50,
      right: 0,
    },
    xAxis: {
      type: "time",
      axisTick: {
        show: false,
      },
      axisLabel: {
        formatter: (value: number) => {
          const date = new Date(value);
          const month = ("0" + (date.getMonth() + 1)).slice(-2);
          const day = ("0" + date.getDate()).slice(-2);
          const year = date.getFullYear().toString().slice(-2);
          return `${month}/${day}/${year}`;
        },
        rotate: 45,
        hideOverlap: true,
        showMinLabel: false,
      },
    },
    yAxis: {
      type: "value",
      min: minRange,
      max: maxRange,
      axisLabel: {
        showMinLabel: false,
        showMaxLabel: false,
        formatter: (value: number) => `$${value}`,
      },
    },
    series: [
      {
        data: formattedData.map((item: { x: Date; y: number }) => [
          item.x,
          item.y,
        ]),
        type: "line",
        smooth: true,
        lineStyle: {
          color: lineColor,
          width: 1,
        },
        showSymbol: false,
      },
    ],
    tooltip: {
      trigger: "axis",
      formatter: (params: { value: [number, number] }[]) => {
        const date = new Date(params[0].value[0]).toLocaleDateString();
        const value = params[0].value[1];
        return `${date}<br/>Price: $${value}`;
      },
    },
  };

  return (
    <>
      <h1 className="text-2xl font-semibold">Price Chart</h1>
      <CoinChartOptions range={range} setRange={setRange} />
      <ReactECharts
        option={options}
        style={{ height: 400, position: "relative" }}
      />
    </>
  );
};

export default CoinChartGraph;
