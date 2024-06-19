import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Switch,
  Spinner,
} from "@nextui-org/react";
import Image from "next/image";
import { updateDocument } from "@/lib/firestore";
import { formatPrice } from "@/utils/formatPrice";
import { EditIcon } from "@/components/icons/EditIcon";
import { DeleteIcon } from "@/components/icons/DeleteIcon";

interface ItemsTableTypes {
  items: any[];
  isLoading: boolean;
  dbCollection: string;
  handleEdit: (element: any) => void;
  handleDelete: (element: any) => void;
}

export function ItemsTable({
  items,
  isLoading,
  handleEdit,
  handleDelete,
  dbCollection,
}: ItemsTableTypes) {
  return (
    <Table
      isStriped
      aria-label="Table with proteins"
      classNames={{
        table: "min-h-[120px]",
      }}
    >
      <TableHeader>
        <TableColumn width={20}>ID</TableColumn>
        <TableColumn width={100}>IMAGEN</TableColumn>
        <TableColumn width={230}>TITULO</TableColumn>
        <TableColumn width={750}>DESCRIPCION</TableColumn>
        <TableColumn width={120}>PRECIO</TableColumn>
        <TableColumn> ESTADO </TableColumn>
        <TableColumn> </TableColumn>
      </TableHeader>
      <TableBody
        isLoading={isLoading}
        loadingContent={<Spinner className="mt-12 "/>}
      >
        {items.map((element: any, index: number) => {
          return (
            <TableRow key={element.id} className="m-auto">
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <div className="w-16 h-16">
                  <Image
                    src={element.image}
                    fill
                    alt=""
                    className="object-cover rounded-xl"
                  />
                </div>
              </TableCell>
              <TableCell>{element.title}</TableCell>
              <TableCell>
                <div className="line-clamp-2">{element.description ?? "Sin descripción"}</div>
              </TableCell>

              <TableCell>{formatPrice(element.price)}</TableCell>
              <TableCell>
                <Switch
                  isSelected={element.status}
                  onChange={(e) => {
                    updateDocument(dbCollection, element.id, {
                      status: e.target.checked,
                    });
                  }}
                />
              </TableCell>
              <TableCell>
                <div className="flex flex-row items-center">
                  <Tooltip content="Editar">
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50 mr-4">
                      <EditIcon onClick={() => handleEdit(element)} />
                    </span>
                  </Tooltip>
                  <Tooltip content="Eliminar">
                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                      <DeleteIcon onClick={() => handleDelete(element)} />
                    </span>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
