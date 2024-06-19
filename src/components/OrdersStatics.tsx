import { useStaticsStore } from "@/stores/statics";
import { useShallow } from "zustand/react/shallow";

// import { formatPrice } from "@/utils/formatPrice";
import { formatNumberWithDot } from "@/utils/formatNumber";

export function OrdersStatics() {
  const [lastOrder, actualData] = useStaticsStore(
    useShallow((state) => [state.lastOrder, state.actualData])
  );

  const totalOrders = `${actualData?.totalOrders}` || null;
  // const totalAmount = `${actualData?.totalAmount}` || null;
  const lastOrderNumber = lastOrder?.length > 0 && lastOrder[0]?.orderNum;

  const staticsData = [
    {
      title: "Último Nº de Orden",
      subtitle: "",
      data: `# ${formatNumberWithDot(Number(lastOrderNumber))}`,
    },
    // {
    //   title: "Monto facturado",
    //   subtitle: "del día",
    //   data: formatPrice(Number(totalAmount)),
    // },
    {
      title: "Pedidos",
      subtitle: "del día",
      data: totalOrders,
    },
  ];

  return (
    <div className="grid grid-cols-1  lg:grid-cols-2 gap-y-4 lg:gap-x-8 w-full  ">
      {staticsData.map(({ title, subtitle, data }) => {
        return (
          <div
            className="py-4 border rounded-xl w-full p-4 flex flex-col justify-between"
            key={title}
          >
            <h1 className="text-xl uppercase font-semibold items-center flex">
              {title}{" "}
              <span className="font-medium text-md text-gray-500 ml-2">
                {subtitle}
              </span>{" "}
            </h1>
            <h1 className="text-3xl text-primary uppercase font-semibold mt-2">
              {data}
            </h1>
          </div>
        );
      })}
    </div>
  );
}
