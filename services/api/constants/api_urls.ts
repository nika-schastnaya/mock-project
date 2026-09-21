export const ApiPaths = {
  pet: "/pet",
  petById: (id: number | string) => `/pet/${id}`,
  order: "/store/order",
  orderById: (id: number | string) => `/store/order/${id}`,
  inventory: "/store/inventory",
} as const;
