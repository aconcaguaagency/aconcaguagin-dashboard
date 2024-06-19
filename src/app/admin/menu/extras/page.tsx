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
  const [extrasToEdit, setExtraToEdit] = useState<any>({});
  const [extrasToDelete, setExtraToDelete] = useState<any>({});
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);

  const [extras, setExtras] = useMenuStore(
    useShallow((state) => [state.extras, state.setExtras])
  );

  const dbCollection = "extras";

  const handleEdit = (element: any) => {
    setIsModalAddOpen(true);
    setExtraToEdit(element);
  };

  const handleDelete = (element: any) => {
    setIsModalDeleteOpen(true);
    setExtraToDelete(element);
  };

  useEffect(() => {
    if (!extras.length) {
      onGetDocument(dbCollection, setExtras, setIsFetching);
    }
  }, [extras.length, setExtras]);

  useEffect(() => {
    if (!user && !isLoading) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  return (
    <main className="flex flex-col min-h-screen items-center w-full px-8 overflow-y-auto pb-8">
      <SubHeader
        title="Extras"
        subtitle="Revisa tu menu."
        onClick={() => setIsModalAddOpen(true)}
      />

      <AddMenuModal
        title={"Extras"}
        item={extrasToEdit}
        isOpen={isModalAddOpen}
        dbCollection={dbCollection}
        onClose={() => setIsModalAddOpen(false)}
      />

      <DeleteModal
        tabledb="extras"
        title={"Opcion"}
        element={extrasToDelete}
        isOpen={isModalDeleteOpen}
        onClose={() => setIsModalDeleteOpen(false)}
      />

      <ItemsTable
        items={extras}
        isLoading={isFetching}
        handleEdit={handleEdit}
        dbCollection={dbCollection}
        handleDelete={handleDelete}
      />
    </main>
  );
}
