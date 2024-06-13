import AddedProducts from "./(components)/added-products";
import CheckoutCard from "./(components)/checkout-card";

const Page = async () => {
  return (
    <div className="p-5">
      <h1 className="text-3xl font-semibold -tracking-wider">
        Carrito de compras
      </h1>

      <div className="mx-auto my-7 flex max-w-[1600px] flex-col gap-8 xl:flex-row">
        <AddedProducts />
        <CheckoutCard />
      </div>
    </div>
  );
};

export default Page;
