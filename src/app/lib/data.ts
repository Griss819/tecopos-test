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
  products: Product[];
};

export async function fetchProducts(name?: string, category?: string) {
  let response : Array<Product> = await fetch('https://fakestoreapi.com/products')
    .then(res=>res.json());

  if (name) response = response.filter(product => product.title.toLowerCase().includes(name.toLowerCase()));
  if (category) response = response.filter(product => product.category.toLowerCase() === category.toLowerCase());

  return response;
}

export async function fetchCategories() {
  const response : Array<string> = await fetch('https://fakestoreapi.com/products/categories')
    .then(res=>res.json());

  return response;
}

export async function fetchProductById(id: number) {
  const response : Product = await fetch('https://fakestoreapi.com/products/'+id)
    .then(res=>res.json());

  return response;
}

export async function createCart() {

  const cartId = parseInt(process.env.CART_ID!);
  const userId = parseInt(process.env.USER_ID!);
  const products: Product[] = [];

  const existingCart : Cart = await fetch('https://fakestoreapi.com/carts/'+cartId)
    .then(res=>res.json());

  if (existingCart != null || existingCart != undefined) return;

  const response: Cart = await fetch('https://fakestoreapi.com/carts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({cartId, userId, products}),
  }).then(res=>res.json());

  console.log(response);
  return response;
}

export async function fetchCartById(id: number) {
  const response : Cart = await fetch('https://fakestoreapi.com/carts/'+id)
    .then(res=>res.json());

  console.log(response);
  return response;
}

export async function updateCart(cart: Cart) {
  const response: Cart = await fetch('https://fakestoreapi.com/carts/'+cart.id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cart),
  }).then(res=>res.json());

  return response;
}

export async function addProductToCart(cartId: number, product: Product) {
  console.log('action executed');
  const existingCart : Cart = await fetch('https://fakestoreapi.com/carts/'+cartId)
    .then(res=>res.json());

  console.log(existingCart);

  if (existingCart == null) return;

  existingCart.products.push(product);

  return await updateCart(existingCart);
}

export async function removeProductToCart(cart: Cart, product: Product) {
  const existingCart : Cart = await fetch('https://fakestoreapi.com/carts/'+cart.id)
    .then(res=>res.json());

  if (existingCart == null) return;

  const index = existingCart.products.findIndex(product => product.id == product.id);
  existingCart.products.splice(index, 1);


  cart.products.push(product);

  return await updateCart(cart);
}
