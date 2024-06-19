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
  const [sideDishesToEdit, setSideDishesToEdit] = useState<any>({});
  const [sideDishesToDelete, setSideDishesToDelete] = useState<any>({});
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);

  const [sideDishes, setSideDishes] = useMenuStore(
    useShallow((state) => [state.sideDishes, state.setSideDishes])
  );

  const dbCollection = "sideDishes";

  const handleEdit = (element: any) => {
    setIsModalAddOpen(true);
    setSideDishesToEdit(element);
  };

  const handleDelete = (element: any) => {
    setIsModalDeleteOpen(true);
    setSideDishesToDelete(element);
  };

  useEffect(() => {
    if (!user && !isLoading) {
      router.push("/admin/pedidos");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (!sideDishes.length) {
      onGetDocument(dbCollection, setSideDishes, setIsFetching);
    }
  }, [sideDishes.length, setSideDishes]);

  return (
    <main className="flex flex-col min-h-screen items-center w-full px-8 overflow-y-auto pb-8">
      <SubHeader
        title="Platos opcionales"
        subtitle="Revisa tu menu."
        onClick={() => setIsModalAddOpen(true)}
      />

      <AddMenuModal
        title={"Menu"}
        item={sideDishesToEdit}
        isOpen={isModalAddOpen}
        dbCollection={dbCollection}
        onClose={() => setIsModalAddOpen(false)}
      />

      <DeleteModal
        title={"Opcional"}
        tabledb={dbCollection}
        isOpen={isModalDeleteOpen}
        element={sideDishesToDelete}
        onClose={() => setIsModalDeleteOpen(false)}
      />

      <ItemsTable
        items={sideDishes}
        isLoading={isFetching}
        handleEdit={handleEdit}
        dbCollection={dbCollection}
        handleDelete={handleDelete}
      />
    </main>
  );
}
