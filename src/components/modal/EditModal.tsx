// EditModal.tsx

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

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  element: any;
  getDocs: () => void;
  tabledb: string;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  title,
  element,
  getDocs,
  tabledb,
}) => {
  const [editedElement, setEditedElement] = useState<any>({});
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setEditedElement(element);
  }, [element]);

  useEffect(() => {
    if (isOpen) {
      setIsUpdating(false);
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "price") {
      const numberPrice = Number(value);
      setEditedElement({ ...editedElement, [name]: numberPrice });
    } else {
      setEditedElement({ ...editedElement, [name]: value });
    }
  };

  const updateFirebaseData = async () => {
    try {
      setIsUpdating(true);
      const date = Date.now();
      const today = new Date(date);
      const utcToday = today.toLocaleDateString();

      const docRef = doc(db, tabledb, element.id);
      await updateDoc(docRef, { ...editedElement, updatedAt: utcToday });
      console.log("Datos actualizados en Firebase correctamente");
      getDocs();
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
                Edita tu {title}
              </ModalHeader>
              <ModalBody>
                <Input
                  label="TITULO"
                  type="text"
                  variant="bordered"
                  value={editedElement.item || ""}
                  name="item"
                  onChange={handleChange}
                  required
                />
                <Textarea
                  label="DESCRIPCION"
                  type="text"
                  variant="bordered"
                  value={editedElement.description || ""}
                  name="description"
                  onChange={handleChange}
                  required
                ></Textarea>
                <Input
                  label="IMAGEN"
                  type="text"
                  variant="bordered"
                  value={editedElement.image || ""}
                  name="image"
                  onChange={handleChange}
                  required
                />
                <Input
                  label="PRECIO"
                  type="number"
                  variant="bordered"
                  value={editedElement.price || ""}
                  name="price"
                  onChange={handleChange}
                  required
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onClick={onClose}>
                  Cancelar
                </Button>
                {/* <Button color="primary" onClick={updateFirebaseData}>
                  Confirmar
                </Button> */}
                {isUpdating ? (
                  <Spinner
                    label="Actualizando..."
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

export default EditModal;
