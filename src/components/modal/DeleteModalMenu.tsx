import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
} from "@nextui-org/react";
import { updateDocument } from "@/lib/firestore";
interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  element: any;
  tabledb: string;
}

const DeleteModalMenu: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  title,
  element,
}) => {
  const [editedElement, setEditedElement] = useState<any>({});
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsUpdating(false);
    }
  }, [isOpen]);

  useEffect(() => {
    setEditedElement(element);
  }, [element]);

  const updateFirebaseData = async () => {
    try {
      setIsUpdating(true);
      const date = Date.now();
      const today = new Date(date);
      const utcToday = today.toLocaleDateString();

      await updateDocument("menu", element.id, {
        ...editedElement,
        deletedAt: utcToday,
      });
      onClose();
    } catch (error) {
      console.error("Error al actualizar datos en Firebase:", error);
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        placement="top-center"
        backdrop="blur"
        size="2xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Estas seguro de eliminar la siguiente {title} ?
              </ModalHeader>
              <ModalBody>
                <Input
                  label="TITULO"
                  type="text"
                  variant="bordered"
                  value={element.title}
                  isDisabled
                />
                <Textarea
                  label="DESCRIPCION"
                  type="text"
                  variant="bordered"
                  value={element.description || ""}
                  name="description"
                  isDisabled
                />
                <Input
                  label="PRECIO"
                  type="number"
                  variant="bordered"
                  value={element.price}
                  isDisabled
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="light"
                  onClick={onClose}
                  className="text-primary"
                >
                  Cancelar
                </Button>

                <Button
                  color="primary"
                  isLoading={isUpdating}
                  onClick={updateFirebaseData}
                >
                  Eliminar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteModalMenu;
