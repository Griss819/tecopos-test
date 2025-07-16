'use client'

import {addProductToCart, Product} from "@/app/lib/data";
import {startTransition, useActionState} from "react";

export default function AddProductButton({product}: {product: Product}) {
  const [state, action, pending] = useActionState(() => addProductToCart(11,product), null);
  return (
    <button disabled={pending}
            onClick={() => startTransition(action)}
            className={'add-cart-button mt-aut disabled:bg-orange-200'}
    >
      { pending && (<em className={'fa fa-circle-o-notch fa-spin'}></em>) }
      { !pending && (<em className={'fa fa-cart-plus'}></em>) }
      Add to cart
    </button>
  )
}
