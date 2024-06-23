// hooks/useProducts.js

import { useQuery } from "@tanstack/react-query";

const fetchProducts = async (categoryID: string | null) => {
  const response = categoryID
    ? await fetch(`/api/products?categoryId=${categoryID}`)
    : await fetch(`/api/products`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
};

const fetchCategories = async () => {
  const response = await fetch(`/api/categories`);
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  return response.json();
};

export const useProducts = (categoryID: string | null) => {
  const productsQuery = useQuery({
    queryKey: ["products", categoryID],
    queryFn: async () => await fetchProducts(categoryID),
  });

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: async () => await fetchCategories(),
  });

  return { productsQuery, categoriesQuery };
};
