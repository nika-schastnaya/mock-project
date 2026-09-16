export const ApiPaths = {
  pet: "/pet",
  petById: (id: number) => `/pet/${id}`,
} as const;