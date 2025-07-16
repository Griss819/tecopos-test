'use client'

import {Cart, Product} from "@/app/lib/data";
import {useState} from "react";

export default function CartPanel({cart}: {cart?: Cart}) {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div className={'flex flex-end'}>
      <button onClick={() => setVisible(!visible)} className={'flex justify-center items-center rounded-full px-4 border-2 border-gray-200 py-2 gap-2 cursor-pointer hover:bg-orange-500 hover:text-white tex-sm'}><em className={'fa fa-cart-shopping'}></em>My Cart</button>
      {visible && (
        <div onClick={() => setVisible(false)} className={'absolute w-full h-full flex items-start justify-end left-0 px-12'}>
          <div className={'border-2 mt-14 bg-white shadow-md  border-gray-200 p-4 rounded-md w-fit'}>
            {cart && cart.products?.length > 0 && (
              cart.products.map((product: Product) => (
                <div key={product.id}>{product.title}</div>
              ))
            )}
          </div>
        </div>
      )}

    </div>
  )
}
