import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const CoinTableSkeleton = () => {
  const rows = Array.from({ length: 50 });

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-20">
                    7d %
                  </Button>
                </DropdownMenuTrigger>
              </DropdownMenu>
            </TableHead>
            <TableHead>Market Cap</TableHead>
            <TableHead>Circulating Supply</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="w-full h-[20px]"></Skeleton>
              </TableCell>
              <TableCell>
                <Skeleton className="w-[100px] h-[20px]"></Skeleton>
              </TableCell>
              <TableCell>
                <Skeleton className="w-[100px] h-[20px]"></Skeleton>
              </TableCell>
              <TableCell>
                <Skeleton className="w-[100px] h-[20px]"></Skeleton>
              </TableCell>
              <TableCell>
                <Skeleton className="w-[100px] h-[20px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-[100px] h-[20px]" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default CoinTableSkeleton;
