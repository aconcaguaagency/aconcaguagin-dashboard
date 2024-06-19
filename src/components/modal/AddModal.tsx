// EditModal.tsx

import React, { useEffect, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Checkbox, Input, Spinner, Textarea  } from "@nextui-org/react";
import { db } from '@/lib/firebase';
import { addDoc, collection, doc, getDocs, limit, orderBy, query, updateDoc} from "firebase/firestore";

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  get: ()=> void;
  tabledb: string;
  id: string
}

const AddModal: React.FC<AddModalProps> = ({ isOpen, onClose, title, get, tabledb, id }) => {

    const date = Date.now();
    const today = new Date(date);
    const utcToday = today.toLocaleDateString()

    const [addElement, setAddElement] = useState<any>({
        createdAt: utcToday,
        updatedAt: "",
        deletedAt: "",
        [id]: "",
        image: "",
        item: "",
        price: ""
    });
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState<string>("");


    const [item, setItem] = useState<string>("");
    const [descripcion, setDescription] = useState<string>("");
    const [image, setImage] = useState<string>("");
    const [price, setPrice] = useState<number>(0);

    
      useEffect(() => {
        if (isOpen) {
          setIsUpdating(false); 
        }
      }, [isOpen]);


    const addFirebaseData = async () => {
        if (!addElement.item || !addElement.image || !addElement.price) {
            setError("Por favor, completa todos los campos requeridos.");
            return;
        }

      try {
        setIsUpdating(true)

        //Obtener el ultimo id

        const q = query(collection(db, tabledb), orderBy(id, 'desc'), limit(1));
        const querySnapshot = await getDocs(q);
        let newLastId
        querySnapshot.forEach((doc) => {
            const idDB = doc.data()[id];
            newLastId =  idDB+1; 
        });


        const docRef = await addDoc(collection(db, tabledb), {...addElement, [id]: newLastId});
        console.log('Documento agregado con ID: ', docRef.id);


        console.log('Datos actualizados en Firebase correctamente');

        get()
        onClose();

      } catch (error) {
        console.error('Error al actualizar datos en Firebase:', error);
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if(name === 'price'){
          const numberPrice = Number(value)
          setAddElement({ ...addElement, [name]: numberPrice });
      }else{
          setAddElement({ ...addElement, [name]: value });
      }
    };
    
      

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        placement="top-center"
        backdrop='blur'
        size='2xl'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Agrega tu {title}
              </ModalHeader>
              <ModalBody>
              <Input
                label="TITULO"
                type="text"
                variant="bordered"
                //value={editedElement.item || ''}
                placeholder='Agrega el titulo del elemento'
                name="item"
                onChange={handleChange}
                isRequired
              />
              <Textarea
                label="DESCRIPCION"
                type="text"
                variant="bordered"
                //value={editedElement.description || ''}
                placeholder='Agrega la descripcion'
                name="description"
                onChange={handleChange}
                
              >
              </Textarea>
              <Input
                label="IMAGEN"
                type="text"
                variant="bordered"
                placeholder='Agrega la ruta de la imagen'
                //value={editedElement.image || ''}
                name="image"
                onChange={handleChange}
                isRequired
                
              />
              <Input
                label="PRECIO"
                type="number"
                variant="bordered"
                placeholder='Agrega el precio'
                //value={editedElement.price || ''}
                name="price"
                onChange={handleChange}
                isRequired
              />

            {error && (
                <div className="text-red-500">
                {error}
            </div>
            )}

              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onClick={onClose}>
                  Cancelar
                </Button>
                {
                isUpdating ? 
                <Spinner label="Creando..." color="default" labelColor="foreground"/>
                : 
                <Button color="primary" onClick={addFirebaseData}>
                Confirmar
                </Button>
                }
              </ModalFooter>
            </>
          )}
        </ModalContent>

      </Modal>
    </>
  );
}

export default AddModal;
