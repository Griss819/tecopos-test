'use client'

import {Cart} from "@/app/lib/server-actions";
import {useEffect, useState} from "react";
import {getCart, removeProductToCart} from "@/app/lib/local-actions";
import Image from "next/image";
import Link from "next/link";

export default function CartPanel() {
  const [visible, setVisible] = useState<boolean>(false);
  const [cart, setCart] = useState<Cart>();
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const cart = getCart();
    setCart(cart);
    let totalPrice = 0;
    cart.products.map(p => {
      totalPrice += p.product.price * p.quantity;
    });
    setTotalPrice(totalPrice);
  }, [visible]);

  const handleClickChild = (e: React.MouseEvent) => {
    e.stopPropagation()
  };

  return (
    <div className={'flex flex-end'}>
      <button onClick={() => setVisible(!visible)} className={'flex justify-center items-center rounded-full px-4 border-2 border-gray-200 py-2 gap-2 cursor-pointer hover:bg-orange-500 hover:text-white tex-sm'}><em className={'fa fa-cart-shopping'}></em>My Cart</button>
      {visible && (
        <div onClick={() => setVisible(false)} className={'absolute z-50 w-full h-full flex items-start justify-end left-0 px-12'}>
          <div onClick={handleClickChild} className={'border-2 mt-14 bg-white shadow-md md:max-w-[400px] w-full  border-gray-200 p-4 rounded-md'}>
            <p className={'text-sm font-semibold'}>Products</p>
            <div className={'flex flex-col gap-2 max-h-[400px] overflow-y-auto'}>
              {cart && cart.products?.length > 0 && (
                cart.products.map((p, index) => (
                  <div key={p.product.id + "a-" + index} className={'grid grid-cols-[50px_1fr_50px] gap-3 py-2 border-gray-200 border-b-[1px]'}>
                    <Image src={p.product.image} alt={'product-image'} width={40} height={40}></Image>
                    <div className={'flex flex-col gap-2'}>
                      <p className={'line-clamp-1 '}>
                        {p.product.title}
                      </p>
                      <div className={'flex flex-row gap-3'}>
                        <p className={'text-sm bg-slate-100 rounded-full w-fit px-2 self-center'}>{p.product.price * p.quantity}</p>
                        <p className={'text-sm bg-slate-100 rounded-full w-fit px-2 self-center'}> Quantity: {p.quantity}</p>
                      </div>
                    </div>
                    <button onClick={() => {
                      const response = removeProductToCart(p.product);
                      setCart(response);
                    }} className={'details-link w-fit'}><em className={'fa fa-trash'}></em></button>
                  </div>
                ))
              )}
              { !cart || cart?.products?.length == 0 &&
                (
                  <div className={'flex flex-col gap-3 items-center justify-center'}>
                    <em className={'fa fa-cart-plus text-[40px] text-slate-400'}></em>
                    <p className={'text-slate-500'}>The cart is empty, <Link href={'/'} className={'text-orange-500 hover:underline'}>add some product</Link> </p>
                  </div>
                )
              }
            </div>
            {cart && cart?.products?.length > 0 && (
              <div className={'flex flex-row gap-3 items-center py-4'}>
                <p>Total price</p>
                <p className={'text-lg bg-slate-100 rounded-full w-fit px-2 self-center'}>{totalPrice}</p>
                <Link className={'add-cart-button ml-auto mt-0'} href={'/confirm-purchase'}>Confirm purchase</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
