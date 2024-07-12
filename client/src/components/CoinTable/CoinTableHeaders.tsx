import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

import CoinTableDropdown from "./CoinTableDropdown";

interface Props {
  change: string;
  setChange: (change: string) => void;
}

const CoinTableHeaders = (props: Props) => {
  return (
    <TableHeader>
      <TableRow className="dark:hover:hover:bg-neutral-800">
        <TableHead>#</TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Price</TableHead>
        <TableHead>
          <CoinTableDropdown
            change={props.change}
            setChange={props.setChange}
          ></CoinTableDropdown>
        </TableHead>
        <TableHead>Market Cap</TableHead>
        <TableHead>Circulating Supply</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default CoinTableHeaders;
