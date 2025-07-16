import {Metadata} from "next";
import ProductPurchaseList from "@/app/ui/product/product-purchase-list";

export const metadata: Metadata = {
  title: 'Confirm Purchase',
};

export default function ConfirmPurchase() {
  return (
    <>
      <ProductPurchaseList></ProductPurchaseList>
    </>
    )
}
