'use client'

import {useEffect, useState} from "react";
import {Cart} from "@/app/lib/server-actions";
import {confirmPurchase, getCart} from "@/app/lib/local-actions";
import Image from "next/image";
import Link from "next/link";

export default function ProductPurchaseList() {
  const [cart, setCart] = useState<Cart>();
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const cart = getCart();
    setCart(cart);
    let totalPrice = 0;
    cart.products.map(p => {
      p.product.description = '';
      totalPrice += p.product.price * p.quantity;
    });
    setTotalPrice(totalPrice);
  }, [])
  return (
    <div className={'grid grid-cols-[1fr_200px]'}>
      <div className={'grid grid-cols-3 md:grid-cols-5 gap-x-6 gap-y-3'}>
        {cart?.products.map((p, index) => (
          <div key={index} className={'flex flex-col gap-3 p-4 rounded-md border-2 border-gray-200'}>
            <Image
              src={p.product.image}
              alt={'product image'}
              width={40}
              height={40}
              className={'rounded-md self-center'}
            ></Image>
            <div className={'text-sm bg-slate-100 rounded-full w-fit px-2 self-center'}>$ {p.product.price}</div>
            <div className={'flex flex-col gap-2 mb-auto'}>
              <p className={'font-semibold text-sm'}>{p.product.title}</p>
            </div>

          </div>
        ))}
        { !cart || cart?.products?.length == 0 &&
          (
            <div className={'flex flex-col gap-3 items-center justify-center'}>
              <em className={'fa fa-cart-plus text-[40px] text-slate-400'}></em>
              <p className={'text-slate-500'}>The cart is empty, <Link href={'/'} className={'text-orange-500 hover:underline'}>add some product</Link> </p>
            </div>
          )
        }
      </div>
      <div className={'flex flex-col border-gray-200 border-l-2'}>
        {cart && cart?.products?.length > 0 && (
          <div className={'flex flex-col gap-3 items-center py-4'}>
            <p>Total price</p>
            <p className={'text-lg bg-slate-100 rounded-full w-fit px-2 self-center'}>{totalPrice}</p>
            <button onClick={confirmPurchase} className={'add-cart-button mt-0'}><em className={'fa fa-cart-shopping'}></em> Confirm purchase</button>
          </div>
        )}
      </div>
    </div>
  );
}
