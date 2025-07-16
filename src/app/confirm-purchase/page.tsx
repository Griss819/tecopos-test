import {Metadata} from "next";
import {confirmPurchase} from "@/app/lib/data";

export const metadata: Metadata = {
  title: 'Confirm Purchase',
};

export default function ConfirmPurchase() {

  return (
    <form action={confirmPurchase} className={'rounded-md self-center'}>
      <button type={"submit"}>Confirm purchase</button>
    </form>
  );
}
