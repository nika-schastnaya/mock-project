export type Pet = {
  id: number;
  category: Category;
  name: string;
  photoUrls: string[];
  tags: Tag[];
  status: PetStatus;
};

export type Tag = {
  id: number;
  name: string;
};

export type Category = {
  id: number;
  name: string;
};

export type PetStatus = "available" | "sold" | "pending";
