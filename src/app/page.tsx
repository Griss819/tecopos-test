import ProductList from "@/app/ui/product/product-list";
import ProductFilter from "@/app/ui/product/product-filter";
import {createCart} from "@/app/lib/data";
import {Suspense} from "react";

export default async function Home(props: {
  searchParams?: Promise<{
    name?: string;
    category?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const name = searchParams?.name;
  const category = searchParams?.category;
  console.log(name, category);
  await createCart();
  return (
    <div className={'product-display '}>
      <Suspense fallback={(<div><em className={'fa fa-circle-o-notch fa-spin'}></em> Loading</div>)}>
        <div>
          <ProductFilter />
        </div>
        <ProductList name={name} category={category} />
      </Suspense>
    </div>
  );
}
