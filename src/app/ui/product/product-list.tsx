import {fetchProducts} from "@/app/lib/data";
import ProductSkeleton from "@/app/ui/skeletons";
import {Suspense} from "react";
import ProductItem from "@/app/ui/product/product-item";

export default async function ProductList({name, category}: {name?: string; category?: string}) {
  const products = await fetchProducts(name, category);

  return (
    <>
      {products.length == 0 && (
        <div className={'flex flex-col gap-3 justify-center items-center'}>
          <em className={'fa fa-search text-[40px] text-slate-400'}></em>
          <p>There are no products matching the search ...</p>
        </div>
      )}
      <div className={'grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3'}>
        <Suspense fallback={<ProductSkeleton />}>
          {products.map((product, index) => (
            <ProductItem key={index} data={product}></ProductItem>
          ))}
        </Suspense>
      </div>
    </>

  );

}
