import { orderStatus } from "@/lib/orderStatus";
import { Dispatch, SetStateAction, useState } from "react";
import { Select, SelectItem, Input, Button } from "@nextui-org/react";
import { SearchIcon } from "./icons/SearchIcon";

interface FiltersTypes {
  limit: number | string;
  setLimit: Dispatch<SetStateAction<string>>;

  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
  setSearchOrder: Dispatch<SetStateAction<string>>;
}

export function Filters({
  limit,
  setLimit,
  status,
  setStatus,
  setSearchOrder
}: FiltersTypes) {
  const [input, setInput] = useState("");

  const searchBtn = ()=>{
    setSearchOrder(input)
    setStatus("all")
  }

  return (
    <div className=" flex flex-col lg:flex-row   justify-between my-4">
      <div className="flex items-center justify-start w-full lg:w-auto">
        <Input
          size="sm"
          variant="underlined"
          className="w-full xl:w-[220px]"
          placeholder="Buscar Nº de Orden ..."
          startContent={
            <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
          }
          onChange={(e: any) => setInput(e.target.value)}
        ></Input>
        <Button size="lg" radius="sm" className="ml-2" onClick={searchBtn} >
          Buscar
        </Button>
      </div>

      <div className="flex items-center justify-start xl:justify-end">
        <div className="flex items-center mr-4">
          <p className="mr-2">Filtrar:</p>
          <Select
            size="sm"
            radius="sm"
            variant="underlined"
            className="w-[130px] "
            selectedKeys={[status]}
            onChange={(e) => {
              setStatus(e?.target?.value);
            }}
          >
            {orderStatus.map(({ label, status }) => (
              <SelectItem key={status} value={label}>
                {label}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="flex items-center">
          <p className="mr-2">Ver:</p>
          <Select
            size="sm"
            radius="sm"
            variant="underlined"
            className="w-[80px] "
            defaultSelectedKeys={[`${limit}`]}
            onChange={(e) => setLimit(e?.target?.value)}
          >
            {["5", "10", "15"].map((num) => (
              <SelectItem key={num} value={limit}>
                {num}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
}
