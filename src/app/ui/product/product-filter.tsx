import {fetchCategories} from "@/app/lib/server-actions";
import ProductSearch from "@/app/ui/product/product-search";

export default async function ProductFilter() {
  const categories = await fetchCategories();

  return (
    <ProductSearch categories={categories}></ProductSearch>
  );
}
