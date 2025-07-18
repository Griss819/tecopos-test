import {fetchProductById} from "@/app/lib/server-actions";
import Image from "next/image";
import {Metadata} from "next";
import AddProductButton from "@/app/ui/product/add-product-button";

export const metadata: Metadata = {
  title: 'Products',
};

export default async function ProductPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const product = await fetchProductById(parseInt(id));

  return (
    <div className={'flex flex-col gap-6 mb-auto md:flex-row'}>
      <Image
        src={product.image}
        alt={'product image'}
        width={200}
        height={200}
        className={'rounded-md self-center'}
      ></Image>
      <div className={'flex flex-col gap-4'}>
        <p className={'text-2xl font-semibold'}>{product.title}</p>
        <div className={'text-lg bg-slate-100 rounded-full w-fit px-2'}>$ {product.price}</div>

        <div className={'flex row gap-4'}>
          <div className={'text-yellow-500'}>
            {product.rating.rate >= 1 && (
              <em className={'fa fa-star'}></em>
            )}
            {product.rating.rate >= 2 && (
              <em className={'fa fa-star'}></em>
            )}
            {product.rating.rate >= 3 && (
              <em className={'fa fa-star'}></em>
            )}
            {product.rating.rate >= 4 &&(
              <em className={'fa fa-star'}></em>
            )}
            {product.rating.rate >= 5 && (
              <em className={'fa fa-star'}></em>
            )}
          </div>
          <p>{product.rating.rate} stars with {product.rating.count} votes</p>
        </div>
        <div className={'flex flex-row gap-2 px-2 items-center text-md bg-orange-500 text-white rounded-full w-fit px-2'}>
          <div className={'w-4 h-4 rounded-full bg-white'}></div>
          {product.category}
        </div>
        <p>{product.description}</p>
        <div>
          <AddProductButton product={product}></AddProductButton>
        </div>
      </div>

    </div>
  );
}
