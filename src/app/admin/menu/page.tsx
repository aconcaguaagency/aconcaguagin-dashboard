"use client";

import { useUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { onGetDocument } from "@/lib/firestore";

// Components
import { SubHeader } from "@/components/SubHeader";
import { ItemsTable } from "@/components/ItemsTable";
import DeleteModalMenu from "@/components/modal/DeleteModalMenu";
import AddMenuModal from "@/components/modal/AddMenuModal";

// Stores
import { useMenuStore } from "@/stores/menu";
import { useShallow } from "zustand/react/shallow";

export default function HomePage() {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const [isFetching, setIsFetching] = useState(false);
  const [menuToEdit, setMenuToEdit] = useState<any>({});
  const [menuToDelete, setMenuToDelete] = useState<any>({});
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);

  const [menu, setMenu] = useMenuStore(
    useShallow((state) => [state.menu, state.setMenu])
  );

  const dbCollection = "menu";

  const handleEdit = (element: any) => {
    setIsModalAddOpen(true);
    setMenuToEdit(element);
  };

  const handleDelete = (element: any) => {
    setIsModalDeleteOpen(true);
    setMenuToDelete(element);
  };

  useEffect(() => {
    if (!menu?.length) {
      onGetDocument(dbCollection, setMenu, setIsFetching);
    }
  }, [menu.length, setMenu]);

  useEffect(() => {
    if (!user && !isLoading) {
      router.push("/");
    }
  }, [router, user, isLoading]);

  return (
    <main className="flex flex-col min-h-screen items-center w-full px-8 overflow-y-auto pb-8">
      <SubHeader
        title="Menu"
        subtitle="Revisa los platos principales."
        onClick={() => {
          setMenuToEdit({});
          setIsModalAddOpen(true);
        }}
      />

      <AddMenuModal
        title={"Menu"}
        item={menuToEdit}
        isOpen={isModalAddOpen}
        dbCollection={dbCollection}
        onClose={() => setIsModalAddOpen(false)}
      />

      <DeleteModalMenu
        title={"Menu"}
        tabledb={dbCollection}
        element={menuToDelete}
        isOpen={isModalDeleteOpen}
        onClose={() => setIsModalDeleteOpen(false)}
      />

      <ItemsTable
        items={menu}
        isLoading={isFetching}
        handleEdit={handleEdit}
        dbCollection={dbCollection}
        handleDelete={handleDelete}
      />
    </main>
  );
}
