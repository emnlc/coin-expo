import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import CoinTableSkeleton from "./CoinTableSkeleton";

import CoinTablePagination from "./CoinTablePagination";
import CoinTableDropdown from "./CoinTableDropdown";

import {
  Table,
  TableBody,
  //   TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
  const [change, setChange] = useState("7d"); // default market percent value

  useEffect(() => {
    if (data) {
      setCoinsData(data.data);
    }
  }, [data]);

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
      <Table>
        {/* table headers */}
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>
              <CoinTableDropdown
                change={change}
                setChange={setChange}
              ></CoinTableDropdown>
            </TableHead>
          </TableRow>
        </TableHeader>

        {/* table content */}
        <TableBody>
          {coinsData
            .slice(startIndex, endIndex)
            .sort((a, b) => a.cmc_rank - b.cmc_rank)
            .map((coin: Coins) => {
              return (
                <TableRow key={coin.id}>
                  <TableCell>{coin.cmc_rank}</TableCell>
                  <TableCell className="font-semibold flex flex-col">
                    <span>
                      <Link to={`/${coin.slug}`} state={{ id: coin.id }}>
                        {coin.name}
                      </Link>
                    </span>
                    <span className=" text-gray-500">{coin.symbol}</span>
                  </TableCell>
                  <TableCell className="font-semibold">
                    ${coin.quote.USD.price.toFixed(4)}
                  </TableCell>
                  {renderPercentChange(coin)}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>

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
