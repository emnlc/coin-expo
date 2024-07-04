import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  change: string;
  setChange: (change: string) => void;
}

const CoinTableDropdown = (props: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-20">
          {props.change} %
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Percent Change</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={props.change}
          onValueChange={props.setChange}
        >
          <DropdownMenuRadioItem value="1h">1h</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="24h">24h</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="7d">7d</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="30d">30d</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CoinTableDropdown;
