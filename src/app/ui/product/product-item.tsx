import {Product} from "@/app/lib/server-actions";
import Image from "next/image";
import Link from "next/link";
import AddProductButton from "@/app/ui/product/add-product-button";

export default function ProductItem({product}: {product: Product}) {
  return  (
    <div className={'flex flex-col gap-3 p-4 rounded-md border-2 border-gray-200'}>
      <Image
        src={product.image}
        alt={'product image'}
        width={40}
        height={40}
        className={'rounded-md self-center'}
      ></Image>
      <div className={'text-sm bg-slate-100 rounded-full w-fit px-2 self-center'}>$ {product.price}</div>
      <div className={'flex flex-col gap-2 mb-auto'}>
        <p className={'font-semibold text-sm'}>{product.title}</p>
        <p className={'text-sm line-clamp-3'}>{product.description}</p>
      </div>
      <div className={'flex flex-row justify-between gap-2'}>
        <AddProductButton product={product}></AddProductButton>
        <Link href={'products/'+product.id} className={'details-link mt-auto'}><em className={'fa fa-arrow-right'}></em> More details</Link>
      </div>

    </div>
  );
}
