import { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { updateDocument } from "@/lib/firestore";

type DropdownStatusProps = {
  status: string;
  element: any;
};

export default function DropdownStatus({
  status,
  element,
}: DropdownStatusProps) {
  const [selectedKeys, setSelectedKeys] = useState(new Set([status]));

  const handleSelectionChange = async (selection: any) => {
    setSelectedKeys(selection);
    const newStatus = Array.from(selection)[0];
    await updateStatus(element, newStatus);
  };

  const updateStatus = async (element: any, selection: any) => {
    try {
      const date = Date.now();
      const today = new Date(date);
      const utcToday = today.toLocaleDateString();

      updateDocument("orders", element.id, {
        ...element,
        status: selection,
        updatedAt: utcToday,
      });

      console.log("Datos actualizados en Firebase correctamente");
      // getDocs()
    } catch (error) {
      console.error("Error al actualizar datos en Firebase:", error);
    }
  };

  const checkStatusColor = () => {
    if (element.status === "pending") return "text-primary";
    if (element.status === "inProgress") return "text-yellow-500";
    return "text-green-500";
  };

  return (
    <Dropdown>
      <DropdownTrigger className="w-[6vw]">
        <Button
          variant="bordered"
          className={`capitalize ${checkStatusColor()}`}
        >
          {status}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={handleSelectionChange}
      >
        <DropdownItem key="pending">Sin pagar</DropdownItem>
        <DropdownItem key="inProgress">Pagado</DropdownItem>
        <DropdownItem key="delivered">Entregado</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
