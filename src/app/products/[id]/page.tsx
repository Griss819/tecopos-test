import {fetchProductById} from "@/app/lib/data";

export default async function ProductPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const product = await fetchProductById(parseInt(id));

  return (
    <div className={'flex flex-col gap-2 mb-auto'}>
      <p>{product.title}</p>
      <p>{product.description}</p>
    </div>
  );
}
