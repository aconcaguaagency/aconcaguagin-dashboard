"use client";

import { useUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAllDocuments, onGetDocument } from "@/lib/firestore";

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

  const [vegetableToEdit, setVegetableToEdit] = useState<any>({});
  const [vegetableToDelete, setVegetableToDelete] = useState<any>({});
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);

  const dbCollection = "vegetables";
  const [vegetables, setVegetables] = useMenuStore(
    useShallow((state) => [state.vegetables, state.setVegetables])
  );

  const handleEdit = (element: any) => {
    setIsModalAddOpen(true);
    setVegetableToEdit(element);
  };

  const handleDelete = (element: any) => {
    setIsModalDeleteOpen(true);
    setVegetableToDelete(element);
  };

  useEffect(() => {
    if (!vegetables.length) {
      onGetDocument(dbCollection, setVegetables, setIsFetching);
    }
  }, [vegetables.length, setVegetables]);

  useEffect(() => {
    if (!user && !isLoading) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  return (
    <main className="flex flex-col min-h-screen items-center w-full px-8 overflow-y-auto pb-8">
      <SubHeader
        title="Vegetales"
        subtitle="Revisa tu menu."
        onClick={() => setIsModalAddOpen(true)}
      />

      <AddMenuModal
        title={"Vegetal"}
        item={vegetableToEdit}
        isOpen={isModalAddOpen}
        dbCollection={dbCollection}
        onClose={() => setIsModalAddOpen(false)}
      />

      <DeleteModal
        title={"Vegetal"}
        tabledb={dbCollection}
        isOpen={isModalDeleteOpen}
        element={vegetableToDelete}
        onClose={() => setIsModalDeleteOpen(false)}
      />

      <ItemsTable
        items={vegetables}
        isLoading={isFetching}
        handleEdit={handleEdit}
        dbCollection={dbCollection}
        handleDelete={handleDelete}
      />
    </main>
  );
}
