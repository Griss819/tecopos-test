'use client'

import {addProductToCart, Product} from "@/app/lib/data";
import Image from "next/image";
import Link from "next/link";
import {startTransition} from "react";

export default function ProductItem({data}: {data: Product}) {
  const handleClick = async () => {
    startTransition(() => {
      startTransition(async () => {
        const result = await addProductToCart(11, data);
        console.log(result);
      });
    })
  }

  return  (
    <div className={'flex flex-col gap-3 p-4 rounded-md border-2 border-gray-200'}>
      <Image
        src={data.image}
        alt={'product image'}
        width={40}
        height={40}
        className={'rounded-md self-center'}
      ></Image>
      <div className={'text-sm bg-slate-100 rounded-full w-fit px-2 self-center'}>$ {data.price}</div>
      <div className={'flex flex-col gap-2 mb-auto'}>
        <p className={'font-semibold text-sm'}>{data.title}</p>
        <p className={'text-sm line-clamp-3'}>{data.description}</p>
      </div>
      <div className={'flex flex-row justify-between gap-2'}>
        <button onClick={handleClick} className={'add-cart-button mt-auto'}><em className={'fa fa-cart-plus'}></em> Add to cart</button>
        <Link href={'products/'+data.id} className={'details-link mt-auto'}><em className={'fa fa-arrow-right'}></em> More details</Link>
      </div>

    </div>
  );
}
