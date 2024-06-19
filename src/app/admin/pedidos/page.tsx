"use client";

import { useUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Stores
import { useOrdersStore } from "@/stores/orders";
import { useStaticsStore } from "@/stores/statics";
import { useShallow } from "zustand/react/shallow";

import {
  onGetDocument,
  onGetStaticsDocs,
  onGetAllDocuments,
} from "@/lib/firestore";

// Component
import { Spinner } from "@nextui-org/react";
import { Filters } from "@/components/Filters";
import { SubHeader } from "@/components/SubHeader";
import { TableComponent } from "@/components/Table";
import { OrdersStatics } from "@/components/OrdersStatics";
import { SelectedOrderDrawer } from "@/components/SelectedOrderDrawer";

import { useScreenDetector } from "@/hooks/useScreenDetector";

export default function OrdersPage() {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const [limit, setLimit] = useState("5");
  const [status, setStaus] = useState("all");
  const [searchOrder, setSearchOrder] = useState("");

  const { isMobile } = useScreenDetector();

  const [orders, setOrders, selectedOrder, setSelectedOrder] = useOrdersStore(
    useShallow((state) => [
      state.orders,
      state.setOrders,
      state.selectedOrder,
      state.setSelectedOrder,
    ])
  );

  const [lastOrder, setLastOrder, actualData, setActualData] = useStaticsStore(
    useShallow((state) => [
      state.lastOrder,
      state.setLastOrder,
      state.actualData,
      state.setActualData,
    ])
  );

  useEffect(() => {
    if (!user && !isLoading) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    onGetAllDocuments("orders", setOrders, Number(limit), status, searchOrder);
  }, [limit, setOrders, status, searchOrder]);

  useEffect(() => {
    onGetStaticsDocs("orders", setActualData);
    onGetDocument("ordersNumber", setLastOrder);
  }, []);

  useEffect(() => {
    if (orders.length > 0 && !isMobile) setSelectedOrder(orders[0]);
  }, [orders, setSelectedOrder, isMobile]);

  const isDataReady =
    lastOrder && `${actualData?.totalOrders}` && `${actualData?.totalAmount}`;

  return (
    <main className="flex flex-col min-h-screen items-center justify-start w-full  ">
      {isDataReady ? (
        <div className="w-full flex h-full px-4 lg:px-8 ">
          <div className=" w-full xl:w-2/3 flex flex-col  ">
            <SubHeader title="Pedidos" subtitle="Revisa tus pedidos." />

            {isDataReady ? (
              <div className="w-full flex flex-col lg:pr-8 h-full">
                <>
                  <OrdersStatics />
                  <div className="flex flex-col justify-start w-full mt-4 h-[30rem]">
                    <Filters
                      limit={limit}
                      setLimit={setLimit}
                      status={status}
                      setStatus={setStaus}
                      setSearchOrder={setSearchOrder}
                    />
                    <TableComponent
                      orders={orders.sort(
                        (a: any, b: any) => b.idDishOrder - a.idDishOrder
                      )}
                    />
                  </div>
                </>
              </div>
            ) : null}
          </div>

          {isDataReady && selectedOrder.id ? (
            <div className="w-full lg:w-1/3 h-full lg:border-l-2 lg:border-primary xl:flex ">
              <SelectedOrderDrawer />{" "}
            </div>
          ) : null}
        </div>
      ) : (
        <div className="flex justify-center items-center mt-20 lg:mt-0 h-full w-full">
          <Spinner size="lg" />
        </div>
      )}

      {/* <div className="w-full h-[3rem]  bg-[#002248] text-white px-8 items-center flex justify-center">
        developed by{" "}
        <a
          href="https://www.aconcagua.agency/"
          target="_blank"
          className="text-[#00FECB] flex items-center ml-1"
        >
          Aconcagua Agency
          <Image
            src="/icons/aconcagua_logo.svg"
            alt="logo"
            width={20}
            height={20}
            className="mr-1"
          />
        </a>
      </div> */}
    </main>
  );
}
