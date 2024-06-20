import { useQuery } from "@tanstack/react-query";

interface Props {
  name: string;
  symbol: string;
  slug: string;
}

import CoinChartGraph from "./CoinChartGraph";

const CoinChart = (props: Props) => {
  const metadataQuery = useQuery({
    queryKey: [`metadata`],
    queryFn: () =>
      fetch(
        `/coingecko/search?symbol=${props.symbol.toLowerCase()}&name=${props.name.toLowerCase()}&slug=${props.slug.toLowerCase()}`
      ).then((res) => res.json()),
    // staleTime: 5 * 60 * 1000,
  });

  if (metadataQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (metadataQuery.isError) {
    return <div>Error loading data</div>;
  }

  const id = metadataQuery.data.id;

  return (
    <div className="my-12">
      {id ? <CoinChartGraph id={id} /> : <div>no prices</div>}
    </div>
  );
};

export default CoinChart;
