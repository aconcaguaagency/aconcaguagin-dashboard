import React, { useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import DropdownStatus from "./Dropdown";
import { formatPrice } from "@/utils/formatPrice";
import { useOrdersStore } from "@/stores/orders";
import { useShallow } from "zustand/react/shallow";
import { formatDateWithMilliseconds } from "@/utils/formatDate";
import { useScreenDetector } from "@/hooks/useScreenDetector";

const columnsMobile = [
  // {
  //   key: "createdAt",
  //   label: "FECHA",
  // },
  {
    key: "idOrden",
    label: "# ORDEN",
  },
  {
    key: "clientName",
    label: "CLIENTE",
  },
  // {
  //   key: "totalOrder",
  //   label: "TOTAL",
  // },
  {
    key: "status",
    label: "STATUS",
  },
];

const columnsDesktop = [
  {
    key: "createdAt",
    label: "FECHA",
  },
  {
    key: "idOrden",
    label: "# ORDEN",
  },
  {
    key: "clientName",
    label: "CLIENTE",
  },
  {
    key: "totalOrder",
    label: "TOTAL",
  },
  {
    key: "status",
    label: "STATUS",
  },
];

export function TableComponent({ orders }: { orders: any }) {
  const { isMobile } = useScreenDetector();

  const [selectedOrder, setSelectedOrder] = useOrdersStore(
    useShallow((state) => [state.selectedOrder, state.setSelectedOrder])
  );

  const [selectedKeys, setSelectedKeys] = React.useState([
    `${selectedOrder?.idDishOrder}`,
  ]);


  const columns = isMobile ? columnsMobile : columnsDesktop

  return (
    <div className="overflow-y-auto no-scrollbar rounded-xl">
      <Table
        color="default"
        selectedKeys={selectedKeys}
        aria-label="Table with orders"
        selectionMode="single"
        selectionBehavior="replace"
        onSelectionChange={(e: any) => {
          if (e?.currentKey) {
            setSelectedOrder({});
            const order = orders.find(
              (order: any) => order?.idDishOrder === Number(e?.currentKey)
            );
            e?.currentKey && setSelectedKeys(e);
            setSelectedOrder(order);
          }
        }}
      >
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          ))}
        </TableHeader>
        <TableBody emptyContent={orders.length < 1 && "SIN PEDIDOS"}>
          {orders.map((row: any, index: number) =>
            isMobile ? (
              <TableRow key={row.idDishOrder} className="justify-between">
                <TableCell>{row.idDishOrder}</TableCell>
                <TableCell width={120}>{formatPrice(row.totalOrder)}</TableCell>

                <TableCell>
                  {row.status === "pending" ? (
                    <DropdownStatus status={"Sin Pagar"} element={row} />
                  ) : row.status === "inProgress" ? (
                    <DropdownStatus status={"Pagado"} element={row} />
                  ) : (
                    <DropdownStatus status={"Entregado"} element={row} />
                  )}
                </TableCell>
              </TableRow>
            ) : (
              <TableRow key={row.idDishOrder} className="justify-between">
                <TableCell>
                  {formatDateWithMilliseconds(row.createdAt)}
                </TableCell>
                <TableCell>{row.idDishOrder}</TableCell>

                <TableCell width={250}>
                  <p className="uppercase text-primary font-semibold">
                    {row.clientName}
                  </p>
                </TableCell>
                <TableCell width={120}>{formatPrice(row.totalOrder)}</TableCell>

                <TableCell>
                  {row.status === "pending" ? (
                    <DropdownStatus status={"Sin Pagar"} element={row} />
                  ) : row.status === "inProgress" ? (
                    <DropdownStatus status={"Pagado"} element={row} />
                  ) : (
                    <DropdownStatus status={"Entregado"} element={row} />
                  )}
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
}
