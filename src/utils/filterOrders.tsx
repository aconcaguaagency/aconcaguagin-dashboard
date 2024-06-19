export function filterOrdersByDay(order: any) {
  const orderDate = new Date(order.createdAt);
  const targetDate = new Date();
  // Check if the order's date matches the target day
  return (
    orderDate.getFullYear() === targetDate.getFullYear() &&
    orderDate.getMonth() === targetDate.getMonth() &&
    orderDate.getDate() === targetDate.getDate()
  );
}
