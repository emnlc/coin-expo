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

import { useDarkMode } from "@/context/DarkModeContext";

interface Props {
  change: string;
  setChange: (change: string) => void;
}

const CoinTableDropdown = (props: Props) => {
  const { darkMode } = useDarkMode();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-20 dark:bg-neutral-900 dark:border-none dark:hover:bg-neutral-900/80 dark:hover:text-gray-400"
        >
          {props.change} %
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={`${
          darkMode
            ? "bg-white text-black"
            : "bg-neutral-900 text-gray-400 border-neutral-950 "
        }`}
      >
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
