import { useOrdersStore } from "@/stores/orders";
import { useShallow } from "zustand/react/shallow";
import { formatPrice } from "@/utils/formatPrice";
import { formatDateWithMilliseconds } from "@/utils/formatDate";
import { calculateTotalForOneDish } from "@/utils/calculateTotal";
import { ScrollShadow } from "@nextui-org/react";

export function SelectedOrderDrawer() {
  const [selectedOrder, setSelectedOrder] = useOrdersStore(
    useShallow((state) => [state.selectedOrder, state.setSelectedOrder])
  );

  const { idDishOrder, fullOrders, totalOrder, createdAt, selectedExtras } =
    selectedOrder;

  return (
    idDishOrder && (
      <div
        className="bg-black w-full flex flex-col  px-4 lg:px-0 lg:pl-6 pt-4 h-full fixed lg:relative top-0 left-0 "
        key={idDishOrder + "selected"}
      >
        <div className="w-full flex items-center justify-between  pb-4 border-b">
          <h1 className="text-2xl font-semibold uppercase">
            ORDEN # {idDishOrder}
            <p className="font-medium text-lg text-gray-500">
              {formatDateWithMilliseconds(createdAt)}
            </p>
          </h1>
          <button
            className="border lg:hidden hover:border-none h-10 w-10 flex items-center justify-center rounded-full hover:bg-primary hover:text-black font-semibold"
            onClick={() => setSelectedOrder({})}
          >
            X
          </button>
        </div>

        <ScrollShadow className=" my-4 flex flex-col justify-start h-full w-full overflow-y-scroll no-scrollbar">
          {fullOrders?.map(
            (
              {
                idDishOrder,
                selectedMainDish,
                selectedProteins,
                selectedVegetables,
                selectedSideDishes,
                selectedDrinkDishes,
              }: any,
              index: number
            ) => {
              const total =
                selectedMainDish.price +
                calculateTotalForOneDish(selectedProteins) +
                calculateTotalForOneDish(selectedVegetables) +
                calculateTotalForOneDish(selectedSideDishes);
              // calculateTotalForOneDish(selectedDrinkDishes);

              console.log(
                "firstt",
                idDishOrder,
                selectedMainDish,
                selectedProteins,
                selectedVegetables,
                selectedSideDishes,
                selectedDrinkDishes
              );

              return (
                <div
                  className="flex flex-col items-start justify-start"
                  key={selectedOrder.id}
                >
                  <div className="flex justify-between items-center mt-2 w-full ">
                    <h1 className="text-xl font-semibold  text-primary uppercase ">
                      Box Nº {index + 1}
                    </h1>
                    <p className="text-lg text-white font-semibold ">
                      {formatPrice(total)}
                    </p>
                  </div>

                  <div className="flex flex-col pl-2 my-1 w-full">
                    <p>{selectedMainDish?.title}</p>
                    {selectedProteins.map((selectedProtein: any) => {
                      return (
                        <div
                          className="flex justify-between items-center w-full"
                          key={`${idDishOrder} - ${selectedProtein?.item}`}
                        >
                          <p>
                            {selectedProtein?.item}{" "}
                            {!selectedProtein.isIncluded && (
                              <span className="text-primary bg-gray-800 lowercase px-4 ml-2 rounded-full">
                                extra
                              </span>
                            )}{" "}
                          </p>

                          <p className=" text-gray-500 ">
                            {!selectedProtein.isIncluded &&
                              formatPrice(selectedProtein.price)}
                          </p>
                        </div>
                      );
                    })}

                    {selectedVegetables.map(
                      (selecetedVegetable: any, index: number) => {
                        return (
                          <div
                            className="flex justify-between items-center w-full"
                            key={`${idDishOrder} - ${selecetedVegetable?.item} - ${index}`}
                          >
                            <p>
                              {selecetedVegetable?.item}{" "}
                              {!selecetedVegetable.isIncluded && (
                                <span className="text-primary bg-gray-800 lowercase px-4 ml-2 rounded-full">
                                  extra
                                </span>
                              )}{" "}
                            </p>

                            <p className=" text-gray-500  ">
                              {!selecetedVegetable.isIncluded &&
                                formatPrice(selecetedVegetable.price)}
                            </p>
                          </div>
                        );
                      }
                    )}
                    {selectedSideDishes.length > 0 && (
                      <p className="text-gray-500 uppercase underline mt-2">
                        Adicionales
                      </p>
                    )}
                    {selectedSideDishes.map((selectedSideDish: any) => {
                      return (
                        <div
                          className="flex justify-between items-center w-full"
                          key={`${idDishOrder} - ${selectedSideDish?.item}`}
                        >
                          <p className="ml-2">
                            {selectedSideDish.cantidad} x{" "}
                            {selectedSideDish?.item}{" "}
                          </p>

                          <p className=" text-gray-500 ">
                            {formatPrice(
                              selectedSideDish.price * selectedSideDish.cantidad
                            )}
                          </p>
                        </div>
                      );
                    })}

                    <div className="flex flex-col justify-start">
                      {selectedDrinkDishes.length > 0 && (
                        <p className="text-gray-500 uppercase underline mt-2">
                          Bebidas
                        </p>
                      )}
                      {selectedDrinkDishes.map((selectedDrink: any) => {
                        return (
                          <div
                            className="flex justify-between items-center w-full"
                            key={`${idDishOrder} - ${selectedDrink?.item}`}
                          >
                            <p className="ml-2">
                              {selectedDrink.cantidad} x {selectedDrink?.item}{" "}
                            </p>

                            <p className=" text-gray-500 ">
                              {formatPrice(
                                selectedDrink.price * selectedDrink.cantidad
                              )}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            }
          )}

          <div className="flex flex-col justify-start mt-4">
            {selectedExtras?.length > 0 && (
              <h1 className="text-xl font-semibold  text-primary uppercase ">
                Extras
              </h1>
            )}
            {selectedExtras?.map((selectedExtra: any) => {
              return (
                <div
                  className="flex justify-between items-center w-full"
                  key={`${idDishOrder} - ${selectedExtra?.item}`}
                >
                  <p className="ml-2">
                    {selectedExtra.cantidad} x {selectedExtra?.item}{" "}
                  </p>

                  <p className=" text-white font-semibold ">
                    {formatPrice(selectedExtra.price * selectedExtra.cantidad)}
                  </p>
                </div>
              );
            })}
          </div>
        </ScrollShadow>

        {/* Bottom footer price */}
        <div className="flex justify-between items-center border-t border-gray-500 mt-2 w-full py-4 font-semibold">
          <h1 className="uppercase ">Total</h1>
          <p className="text-xl">{formatPrice(totalOrder)}</p>
        </div>
      </div>
    )
  );
}
