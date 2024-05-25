import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "react-router-dom";

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
  const coinID: string = location.state.id;

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
      setCoinData(data.data[coinID]);
    }
  }, [data, coinID]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error!</div>;
  if (coinData == null) return null;

  // console.log(coinData);
  return (
    <>
      <div className="flex flex-col container my-36">
        <div className="flex flex-row items-center gap-4 my-8">
          <img className="h-16 w-16 rounded-full" src={coinData.logo} alt="" />
          <div className="font-semibold text-4xl flex flex-col">
            <h1>{coinData.name}</h1>{" "}
            <span className=" text-sm text-gray-500">{coinData.symbol}</span>
          </div>
        </div>
        <p>{coinData.description}</p>
      </div>
    </>
  );
};

export default Coin;
