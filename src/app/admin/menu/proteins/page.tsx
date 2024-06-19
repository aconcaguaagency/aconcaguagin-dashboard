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

export default function ProteinPage() {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const [isFetching, setIsFetching] = useState(false);
  const [proteinToEdit, setProteinToEdit] = useState<any>({});
  const [proteinToDelete, setProteinToDelete] = useState<any>({});
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const dbCollection = "proteins";

  const [proteins, setProteins] = useMenuStore(
    useShallow((state) => [state.proteins, state.setProteins])
  );

  const handleEdit = (element: any) => {
    setIsModalAddOpen(true);
    setProteinToEdit(element);
  };

  const handleDelete = (element: any) => {
    setIsModalDeleteOpen(true);
    setProteinToDelete(element);
  };

  useEffect(() => {
    if (!proteins?.length) {
      onGetDocument(dbCollection, setProteins, setIsFetching);
    }
  }, [proteins.length, setProteins]);

  useEffect(() => {
    if (!user && !isLoading) {
      router.push("/");
    }
  }, [router, user, isLoading]);

  return (
    <main className="flex flex-col min-h-screen items-center w-full px-8 overflow-y-auto pb-8">
      <SubHeader
        title="Proteinas"
        subtitle="Revisa tu menu."
        onClick={() => setIsModalAddOpen(true)}
      />

      <AddMenuModal
        title={"Proteina"}
        item={proteinToEdit}
        isOpen={isModalAddOpen}
        dbCollection={dbCollection}
        onClose={() => setIsModalAddOpen(false)}
      />

      <DeleteModal
        title={"Proteina"}
        tabledb={dbCollection}
        element={proteinToDelete}
        isOpen={isModalDeleteOpen}
        onClose={() => setIsModalDeleteOpen(false)}
      />

      <ItemsTable
        items={proteins}
        isLoading={isFetching}
        handleEdit={handleEdit}
        dbCollection={dbCollection}
        handleDelete={handleDelete}
      />
    </main>
  );
}
