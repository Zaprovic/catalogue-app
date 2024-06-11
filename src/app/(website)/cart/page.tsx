import AddedProducts from "./(components)/added-products";
import CheckoutCard from "./(components)/checkout-card";

const Page = async () => {
  return (
    <div className="p-5">
      <h1 className="text-3xl font-semibold -tracking-wider">
        Carrito de compras
      </h1>

      <div className="my-7 flex flex-col gap-8 md:flex-row">
        <AddedProducts />

        <CheckoutCard />
      </div>
    </div>
  );
};

export default Page;
