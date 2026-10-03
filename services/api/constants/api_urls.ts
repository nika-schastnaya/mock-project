export const ApiPaths = {
  pet: "/pet",
  petById: (id: number | string) => `/pet/${id}`,
  uploadImageById: (id: number | string) => `/pet/${id}/uploadImage`,
  order: "/store/order",
  orderById: (id: number | string) => `/store/order/${id}`,
  inventory: "/store/inventory",
} as const;
