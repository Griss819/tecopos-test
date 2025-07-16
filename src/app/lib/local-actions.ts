import {Cart, Product} from "@/app/lib/server-actions";
import {redirect} from "next/navigation";

export function getCart() {
  const cartFromLocalStorage = localStorage.getItem("cart") ?? null;
  if (cartFromLocalStorage) return JSON.parse(cartFromLocalStorage) as Cart;
  else {
    const cart: Cart = {id: 1, date: new Date(Date.now()), products: [], userId: 1}
    localStorage.setItem("cart", JSON.stringify(cart));
    return cart;
  }
}

export function addProductToCart(product: Product) {
  const cartFromLocalStorage = localStorage.getItem("cart") ?? null;

  if (cartFromLocalStorage) {
    const cart = JSON.parse(cartFromLocalStorage) as Cart;
    const index = cart.products.findIndex(p => p.product.id == product.id);
    if (index >= 0) {
      cart.products[index].quantity++;
    }
    else {
      cart.products.push({product: product, quantity: 1});
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    return cart;
  }
  else {
    const cart: Cart = {id: 1, date: new Date(Date.now()), products: [{product: product, quantity: 1}], userId: 1}
    localStorage.setItem("cart", JSON.stringify(cart));
    return cart;
  }
}

export function removeProductToCart(product: Product) {
  const cartFromLocalStorage = localStorage.getItem("cart") ?? null;

  if (cartFromLocalStorage) {
    const cart = JSON.parse(cartFromLocalStorage) as Cart;
    const index = cart.products.findIndex(p => p.product.id == product.id);
    if (index >= 0) {
      cart.products[index].quantity--;
    }
    if (cart.products[index].quantity <= 0) cart.products.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    return cart;
  }
  else {
    const cart: Cart = {id: 1, date: new Date(Date.now()), products: [], userId: 1}
    localStorage.setItem("cart", JSON.stringify(cart));
    return cart;
  }
}

export function confirmPurchase() {
  localStorage.removeItem("cart") ?? null;
  redirect('/');
}
