import Image from "next/image";
import { Spinner } from "@nextui-org/react";
interface UploadInputTypes {
  addElement: any;
  imageLoading: boolean;
  handleImage: (image: any) => void;
  setAddElement: (clean: any) => void;
}

export function UploadInput({
  imageLoading,
  handleImage,
  addElement,
  setAddElement,
}: UploadInputTypes) {
  return (
    <div className="border-2 border-gray-500/50 px-3 py-2 w-full rounded-xl">
      <p className="text-xs text-gray-100 mb-2">
        IMAGEN <span className="text-primary">*</span>{" "}
      </p>

      {!imageLoading && !addElement.image && (
        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="file:bg-primary file:rounded-xl file:px-4 file:py-1 file:border-none file:shadow-primary-500/50 file:mr-4 file:cursor-pointer w-full my-2 bg-none"
        />
      )}

      {imageLoading && <Spinner/>}

      {addElement.image && !imageLoading && (
        <div className="flex">
          <div className="relative h-[5rem] w-[5rem] ">
            <Image
              alt="image"
              src={addElement.image}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="ml-4 flex flex-col justify-between items-start">
            <h1 className="leading-4 text-gray-400 text-xs"> <span className="font-semibold uppercase text-white">Nombre del archivo</span> <br /> {addElement.imageName}</h1>
            <button
              className="text-primary mt-2 hover:text-primary/80 text-xs underline underline-offset-4 mb-2"
              onClick={() => {
                setAddElement({
                  ...addElement,
                  imageName: "",
                  image: "",
                });
              }}
            >
              Eliminar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
