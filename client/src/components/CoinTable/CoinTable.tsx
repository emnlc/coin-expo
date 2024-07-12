import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import CoinTableSkeleton from "./CoinTableSkeleton";

import CoinTablePagination from "./CoinTablePagination";
import CoinTableHeaders from "./CoinTableHeaders";

import CoinPriceFormatter from "../CoinPriceFormatter";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

interface Coins {
  id: number;
  name: string;
  cmc_rank: number;
  symbol: string;
  slug: string;
  circulating_supply: number;
  quote: {
    USD: {
      price: number;
      percent_change_1h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      market_cap: number;
    };
  };
}

const CoinTable = () => {
  // data
  const { data, isLoading, isError } = useQuery<{ data: Coins[] }>({
    queryKey: ["coins"],
    refetchInterval: 5 * 60 * 1000, // update data
  });

  const [coinsData, setCoinsData] = useState<Coins[]>([]);
  const [change, setChange] = useState("30d"); // default market percent value

  useEffect(() => {
    if (data) {
      setCoinsData(data.data);
    }
  }, [data]);
  // console.log(data);

  // pagination variables
  const rowsPerPage = 100;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowsPerPage);

  if (isLoading) return <CoinTableSkeleton />;
  if (isError) return <CoinTableSkeleton />;

  const renderPercentChange = (coin: Coins) => {
    let percent = 0;
    if (change === "1h") {
      percent = coin.quote.USD.percent_change_1h;
    }
    if (change === "24h") {
      percent = coin.quote.USD.percent_change_24h;
    }
    if (change === "7d") {
      percent = coin.quote.USD.percent_change_7d;
    }
    if (change === "30d") {
      percent = coin.quote.USD.percent_change_30d;
    }

    return (
      <TableCell className="font-semibold">
        {percent.toString()[0] === "-" ? (
          <div className="flex">
            <img src="/down.svg" className="w-4 h-4" alt="" />
            <span className=" text-red-500 font-semibold">
              {percent.toFixed(2).toString().slice(1)}%
            </span>
          </div>
        ) : (
          <div className="flex">
            <img src="/up.svg" className="w-4 h-4" alt="" />
            <span className="text-green-500 font-semibold">
              {percent.toFixed(2)}%
            </span>
          </div>
        )}
      </TableCell>
    );
  };

  return (
    <>
      <div className="text-black dark:text-white">
        <Table>
          {/* table headers */}
          <CoinTableHeaders change={change} setChange={setChange} />

          {/* table content */}
          <TableBody>
            {coinsData
              .slice(startIndex, endIndex)
              .sort((a, b) => a.cmc_rank - b.cmc_rank)
              .map((coin: Coins) => {
                return (
                  <TableRow className="font-semibold" key={coin.id}>
                    <TableCell className=" items-center">
                      {coin.cmc_rank}
                    </TableCell>
                    <TableCell className="flex flex-col duration-0">
                      <span>
                        <Link
                          className="hover:text-coinExpo transition-all"
                          to={`/crypto/${coin.slug}`}
                          state={{ coin: coin }}
                        >
                          {coin.name}
                        </Link>
                      </span>
                      <span className=" text-gray-500 dark:text-gray-400">
                        {coin.symbol}
                      </span>
                    </TableCell>
                    <TableCell>
                      $<CoinPriceFormatter price={coin.quote.USD.price} />
                    </TableCell>
                    {renderPercentChange(coin)}
                    <TableCell>
                      $
                      {coin.quote.USD.market_cap.toLocaleString("en-US", {
                        maximumFractionDigits: 0,
                      })}
                    </TableCell>
                    <TableCell>
                      {coin.circulating_supply.toLocaleString("en-US", {
                        maximumFractionDigits: 0,
                      })}{" "}
                      {coin.symbol}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>

      {/* pagination button */}
      <CoinTablePagination
        rowsPerPage={rowsPerPage}
        startIndex={startIndex}
        setStartIndex={setStartIndex}
        endIndex={endIndex}
        setEndIndex={setEndIndex}
      />
    </>
  );
};

export default CoinTable;
