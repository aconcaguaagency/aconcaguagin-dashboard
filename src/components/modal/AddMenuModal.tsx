import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalContent,
  Input,
  Select,
  Button,
  Spinner,
  Textarea,
  SelectItem,
} from "@nextui-org/react";
import { UploadInput } from "../UploadInput";
import { uploadFile, createDocument, updateDocument } from "@/lib/firestore";

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  item?: any;
  dbCollection: string;
}

const AddMenuModal: React.FC<AddModalProps> = ({
  isOpen,
  onClose,
  title,
  item,
  dbCollection,
}) => {
  const date = Date.now();
  const today = new Date(date);
  const utcToday = today.toLocaleDateString();
  const [imageLoading, setImageLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string>("");

  const initialState = {
    createdAt: utcToday,
    title: "",
    price: "",
    image: "",
    imageName: "",
    status: true,
  };

  const [values, setValues] = useState<any>(initialState);

  useEffect(() => {
    if (item?.id) setValues(item);
  }, [item]);

  const reset = () => setValues(initialState);

  const handleImage = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setImageLoading(true);
      uploadFile(file, "menu").then((url) => {
        setValues({ ...values, image: url, imageName: file.name });
        setImageLoading(false);
      });
    }
  };

  const addFirebaseData = async () => {
    const { title, image, price } = values;

    if (!title || !image || !price) {
      setError("Por favor, completa todos los campos requeridos.");
      return;
    }

    try {
      setIsUpdating(true);
      if (item.id) {
        updateDocument(dbCollection, item.id, {
          ...values,
          updatedAt: utcToday,
        });
      } else {
        createDocument(dbCollection, values);
        console.error("Datos cargados en firebase Firebase:");
      }
      reset();
      onClose();
      setIsUpdating(false);
    } catch (error) {
      console.error("Error al actualizar datos en Firebase:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "price") {
      const numberPrice = Number(value);
      setValues({ ...values, [name]: numberPrice });
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          reset();
        }}
        placement="top-center"
        backdrop="blur"
        size="2xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Agrega tu {title}
              </ModalHeader>
              <ModalBody>
                <Input
                  value={values.title}
                  isRequired
                  type="text"
                  name="title"
                  label="TITULO"
                  variant="bordered"
                  onChange={handleChange}
                  placeholder="Agrega el titulo del elemento"
                />
                <Textarea
                  type="text"
                  name="description"
                  label="DESCRIPCION"
                  variant="bordered"
                  value={values.description}
                  onChange={handleChange}
                  placeholder="Agrega la descripcion"
                />

                <Input
                  label="PRECIO"
                  type="number"
                  variant="bordered"
                  placeholder="Agrega el precio"
                  name="price"
                  value={values.price}
                  onChange={handleChange}
                  isRequired
                />
                <Select
                  className="w-full"
                  variant="bordered"
                  label="ESTADO"
                  selectedKeys={values.status ? ["Activo"] : ["Inactivo"]}
                  onSelectionChange={(e: any) => {
                    setValues({
                      ...values,
                      status: e?.currentKey === "Activo" ? true : false,
                    });
                  }}
                  isRequired
                >
                  {["Activo", "Inactivo"].map((status) => {
                    return (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    );
                  })}
                </Select>

                <UploadInput
                  imageLoading={imageLoading}
                  setAddElement={setValues}
                  addElement={values}
                  handleImage={handleImage}
                />

                {error && <div className="text-red-500">{error}</div>}
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
                  isDisabled={!values.image || !values.title || !values.price}
                  isLoading={isUpdating}
                  onClick={addFirebaseData}
                >
                  {item.id ? "Actualizar" : "Confirmar"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddMenuModal;
