"use client";

import { useUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { onGetDocument } from "@/lib/firestore";

// Components
import { SubHeader } from "@/components/SubHeader";
import { ItemsTable } from "@/components/ItemsTable";
import DeleteModal from "@/components/modal/DeleteModal";
import AddMenuModal from "@/components/modal/AddMenuModal";

// Stores
import { useMenuStore } from "@/stores/menu";
import { useShallow } from "zustand/react/shallow";

export default function VegetablesPage() {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const [isFetching, setIsFetching] = useState(false);
  const [drinkToEdit, setDrinkToEdit] = useState<any>({});
  const [drinkToDelete, setDrinkToDelete] = useState<any>({});
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);

  const [drinks, setDrinks] = useMenuStore(
    useShallow((state) => [state.drinks, state.setDrinks])
  );

  const dbCollection = "drinks";

  useEffect(() => {
    if (!user && !isLoading) {
      router.push("/");
    }
  }, [router, user, isLoading]);

  useEffect(() => {
    if (!drinks.length) {
      onGetDocument(dbCollection, setDrinks, setIsFetching);
    }
  }, [drinks.length, setDrinks]);

  const handleEdit = (element: any) => {
    setIsModalAddOpen(true);
    setDrinkToEdit(element);
  };

  const handleDelete = (element: any) => {
    setIsModalDeleteOpen(true);
    setDrinkToDelete(element);
  };

  return (
    <main className="flex flex-col min-h-screen items-center w-full px-8 overflow-y-auto pb-8">
      <SubHeader
        title="Bebidas"
        subtitle="Revisa tu menu."
        onClick={() => setIsModalAddOpen(true)}
      />

      <AddMenuModal
        title={"Bebida"}
        item={drinkToEdit}
        isOpen={isModalAddOpen}
        dbCollection={dbCollection}
        onClose={() => setIsModalAddOpen(false)}
      />

      <DeleteModal
        isOpen={isModalDeleteOpen}
        onClose={() => setIsModalDeleteOpen(false)}
        title={"Bebida"}
        element={drinkToDelete}
        tabledb="drinks"
      />
      <ItemsTable
        items={drinks}
        isLoading={isFetching}
        handleEdit={handleEdit}
        dbCollection={dbCollection}
        handleDelete={handleDelete}
      />
    </main>
  );
}
