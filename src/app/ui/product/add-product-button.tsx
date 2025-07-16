'use client'

import {addProductToCart, Product} from "@/app/lib/data";
import {startTransition, useActionState} from "react";

export default function AddProductButton({product}: {product: Product}) {
  const [_, action, pending] = useActionState(() => addProductToCart(product), null);
  return (
    <button disabled={pending}
            onClick={() => startTransition(action)}
            className={'add-cart-button mt-aut disabled:bg-orange-200'}
    >
      { pending && (<em className={'fa fa-circle-o-notch fa-spin'}></em>) }
      { !pending && (<em className={'fa fa-cart-plus'}></em>) }
      Add to cart
      <em className={'fa hide fa-circle-o-notch fa-spin'}></em>
    </button>
  )
}
