export const calculateTotalForOneDish = (dishes: any) => {
    let total = 0;
    if (dishes) {

      dishes
      .filter((item: any) => !item.isIncluded)
      .forEach((dish: any) => {
        total += dish.cantidad ? dish.cantidad * dish.price : dish.price;
      });
    }
    return total;
  };

  export const calculateTotalForAllDishes = (fullOrders: any) => {
    let totalForAllDishes = 0;
    fullOrders.forEach((order: any) => {
      totalForAllDishes += order.selectedMainDish.price;
  
      if (order.selectedProteins) {
        totalForAllDishes += calculateTotalForOneDish(order.selectedProteins);
      }
  
      if (order.selectedVegetables) {
        totalForAllDishes += calculateTotalForOneDish(order.selectedVegetables);
      }
  
      if (order.selectedSideDishes) {
        totalForAllDishes += calculateTotalForOneDish(order.selectedSideDishes);
      }
  
      if (order.selectedDrinkDishes) {
        totalForAllDishes += calculateTotalForOneDish(order.selectedDrinkDishes);
      }
    });
  
    return totalForAllDishes;
  };
  