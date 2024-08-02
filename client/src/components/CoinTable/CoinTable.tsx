import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import CoinTableSkeleton from "./CoinTableSkeleton";
import CoinTablePagination from "./CoinTablePagination";
import CoinTableHeaders from "./CoinTableHeaders";
import CoinPriceFormatter from "../CoinPriceFormatter";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import { useUser } from "../../context/UserContext";
import { supabase } from "@/lib/helper/supabase";

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

interface Props {
  watchlist: boolean;
}

const CoinTable = (props: Props) => {
  const { user } = useUser();
  const [coinsData, setCoinsData] = useState<Coins[]>([]);
  const [change, setChange] = useState("30d"); // default market percent value

  const { data, isLoading, isError } = useQuery({
    queryKey: props.watchlist ? ["watchlist"] : ["coins"],
    queryFn: async () => {
      if (props.watchlist && user) {
        // Query the Supabase database for the user's watchlist
        const { data, error } = await supabase
          .from("watchlist")
          .select("coin")
          .eq("email", user.email)
          .single();

        if (error) {
          throw new Error(error.message);
        }

        if (data && data.coin.length > 0) {
          // Fetch the coin data from your server
          const coinsString = data.coin.join(",");
          return fetch(
            `${
              import.meta.env.VITE_COINEXPO_SERVER_URL
            }/coins/watchlist/${coinsString}`
          ).then((res) => res.json());
        }

        return []; // Return an empty array if no coins
      } else {
        return fetch(`${import.meta.env.VITE_COINEXPO_SERVER_URL}/coins`).then(
          (res) => res.json()
        );
      }
    },

    staleTime: !props.watchlist ? 5 * 60 * 1000 : undefined,
    refetchInterval: !props.watchlist ? 5 * 60 * 1000 : undefined,
  });

  useEffect(() => {
    if (data) {
      // console.log("Full response data:", data);
  
      if (Array.isArray(data.data)) {
        // /coins endpoint returns an array
        setCoinsData(data.data);
      } else if (typeof data.data === 'object' && data.data !== null) {
        // /coins/watchlist endpoint returns an object
        // console.log("data: ", data);
        setCoinsData(Object.values(data.data));
      } else {
        setCoinsData([]);
      }
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
    switch (change) {
      case "1h":
        percent = coin.quote.USD.percent_change_1h;
        break;
      case "24h":
        percent = coin.quote.USD.percent_change_24h;
        break;
      case "7d":
        percent = coin.quote.USD.percent_change_7d;
        break;
      case "30d":
        percent = coin.quote.USD.percent_change_30d;
        break;
      default:
        break;
    }

    return (
      <TableCell className="font-semibold">
        {percent.toString()[0] === "-" ? (
          <div className="flex">
            <img
              src="/down.svg"
              className="w-4 h-4 rotate-180 md:rotate-0"
              alt=""
            />
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
            {coinsData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  Your watchlist is empty. Add some coins to get started!
                </TableCell>
              </TableRow>
            ) : (
              coinsData
                .slice(startIndex, endIndex)
                .sort((a, b) => a.cmc_rank - b.cmc_rank)
                .map((coin: Coins) => (
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
                ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* pagination button */}
      {props.watchlist ? (
        <></>
      ) : (
        <CoinTablePagination
          totalRows={1000}
          rowsPerPage={rowsPerPage}
          startIndex={startIndex}
          setStartIndex={setStartIndex}
          endIndex={endIndex}
          setEndIndex={setEndIndex}
        />
      )}
    </>
  );
};

export default CoinTable;
