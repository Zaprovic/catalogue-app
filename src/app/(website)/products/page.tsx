import SearchbarProducts from "@/components/searchbar-products";
import ProductListAll from "./(components)/product-list-all";

export const revalidate = 0;

type props = {
  searchParams: { categoryId: string; productName: string };
};

export default function ProductPage({ searchParams }: props) {
  const { categoryId, productName } = searchParams;

  console.log(productName);

  return (
    <div className="relative flex h-screen flex-1 gap-10 overflow-y-auto">
      <section className="relative mx-auto w-full">
        <SearchbarProducts />
        <ProductListAll
          categoryId={Number(categoryId)}
          productName={productName}
        />
      </section>
    </div>
  );
}
