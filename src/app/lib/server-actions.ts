
'use server'

import {fetch} from "next/dist/compiled/@edge-runtime/primitives";

export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
};

export type Cart = {
  id: number;
  userId: number;
  date: Date;
  products: { product: Product, quantity: number }[];
};

export async function fetchProducts(name?: string, category?: string) {
  let response : Array<Product> = await fetch('https://fakestoreapi.com/products')
    .then(res=>res.json());

  if (name) response = response.filter(product => product.title.toLowerCase().includes(name.toLowerCase()));
  if (category) response = response.filter(product => product.category.toLowerCase() === category.toLowerCase());

  return response;
}

export async function fetchCategories() {
  'use server'

  const response : Array<string> = await fetch('https://fakestoreapi.com/products/categories')
    .then(res=>res.json());

  return response;
}

export async function fetchProductById(id: number) {
  'use server'

  const response : Product = await fetch('https://fakestoreapi.com/products/'+id)
    .then(res=>res.json());

  return response;
}

