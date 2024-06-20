import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

import CoinTableDropdown from "./CoinTableDropdown";

interface Props {
  change: string;
  setChange: (change: string) => void;
}

const CoinTableHeaders = (props: Props) => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>#</TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Price</TableHead>
        <TableHead>
          <CoinTableDropdown
            change={props.change}
            setChange={props.setChange}
          ></CoinTableDropdown>
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default CoinTableHeaders;
