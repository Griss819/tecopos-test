'use server'

import {fetch} from "next/dist/compiled/@edge-runtime/primitives";
import {redirect} from "next/navigation";

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
  products: { productId: number, quantity: number }[];
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

export async function fetchCart() {
  const response : Cart = await fetch('https://fakestoreapi.com/carts/'+process.env.CART_ID!)
    .then(res=>res.json());

  return response;
}

export async function addProductToCart(product: Product) {
  const existingCart : Cart = await fetch('https://fakestoreapi.com/carts/'+process.env.CART_ID!)
    .then(res=>res.json());

  if (existingCart == null) return;

  const index = existingCart.products.findIndex(p => p.productId == product.id)
  if (index <= -1) {
    existingCart.products.push({productId:product.id, quantity:1});
  }
  else existingCart.products[index].quantity++;

  return await updateCart(existingCart);
}

export async function removeProductToCart(cart: Cart, product: Product) {
  const existingCart : Cart = await fetch('https://fakestoreapi.com/carts/'+cart.id)
    .then(res=>res.json());

  if (existingCart == null ||
    existingCart.products.length == 0 ||
    !existingCart.products.find(p => p.productId == product.id)) return;

  cart.products.map(product =>  { if (product.productId == product.productId) product.quantity--});
  return await updateCart(cart);
}

async function updateCart(cart: Cart) {
  const response: Cart = await fetch('https://fakestoreapi.com/carts/'+cart.id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cart),
  }).then(res=>res.json());

  return response;
}

export async function confirmPurchase() {

  const existingCart : Cart = await fetch('https://fakestoreapi.com/carts/'+11)
    .then(res=>res.json());

  if (existingCart == null) return;

  existingCart.products = [];

  await updateCart(existingCart);

  redirect('/');
}
