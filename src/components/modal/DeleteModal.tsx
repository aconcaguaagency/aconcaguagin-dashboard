import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Checkbox,
  Input,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  element: any;
  tabledb: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  title,
  element,
  tabledb,
}) => {
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsUpdating(false);
    }
  }, [isOpen]);

  const updateFirebaseData = async () => {
    try {
      setIsUpdating(true);
      const date = Date.now();
      const today = new Date(date);
      const utcToday = today.toLocaleDateString();
      const docRef = doc(db, tabledb, element.id);
      await updateDoc(docRef, { ...element, deletedAt: utcToday });
      console.log("Datos actualizados en Firebase correctamente");
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
                  //placeholder="Enter your password"
                  type="text"
                  variant="bordered"
                  value={element.item}
                  isDisabled
                />
                <Textarea
                  label="DESCRIPCION"
                  type="text"
                  variant="bordered"
                  value={element.description || ""}
                  name="description"
                  isDisabled
                ></Textarea>
                <Input
                  label="IMAGEN"
                  //placeholder="Enter your password"
                  type="text"
                  variant="bordered"
                  value={element.image}
                  isDisabled
                />
                <Input
                  label="PRECIO"
                  //placeholder="Enter your password"
                  type="number"
                  variant="bordered"
                  value={element.price}
                  isDisabled
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onClick={onClose}>
                  Cancelar
                </Button>

                {isUpdating ? (
                  <Spinner
                    label="Eliminando..."
                    color="default"
                    labelColor="foreground"
                  />
                ) : (
                  <Button color="primary" onClick={updateFirebaseData}>
                    Confirmar
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteModal;
