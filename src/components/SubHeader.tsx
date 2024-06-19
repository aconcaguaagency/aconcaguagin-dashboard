import { Button } from "@nextui-org/react";

interface SubHeaderTypes {
  title: string;
  subtitle: string;
  onClick?: () => void;
}

export function SubHeader({ title, subtitle, onClick }: SubHeaderTypes) {
  return (
    <div className="flex justify-between w-full items-center my-4">
      <div className=" w-full  flex   text-white flex-col items-start ">
        <h1 className="text-3xl font-semibold uppercase">{title}</h1>
        <p className="mt-1">{subtitle}</p>
      </div>
      {onClick && (
        <Button
          variant="shadow"
          className="uppercase font-semibold"
          size="md"
          color="primary"
          onClick={onClick}
        >
          Agregar
        </Button>
      )}
    </div>
  );
}
