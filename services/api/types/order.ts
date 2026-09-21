export type Order = {
  id: number;
  petId: number;
  quantity: number;
  shipDate: string;
  status: OrderStatus;
  complete: boolean;
};

export type OrderStatus = "placed" | "approved" | "delivered";
