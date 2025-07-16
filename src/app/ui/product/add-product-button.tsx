'use client'

import {Product} from "@/app/lib/server-actions";
import {addProductToCart} from "@/app/lib/local-actions";

export default function AddProductButton({product}: {product: Product}) {
  return (
    <button onClick={() => addProductToCart(product)}
            className={'add-cart-button mt-aut disabled:bg-orange-200'}
    >
      <em className={'fa fa-cart-plus'}></em>Add to cart
    </button>
  )
}
