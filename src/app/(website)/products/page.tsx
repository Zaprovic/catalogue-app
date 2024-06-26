import SearchbarProducts from "@/components/searchbar-products";
import ProductListAll from "./(components)/product-list-all";

export const revalidate = 0;

type props = {
  searchParams: { categoryId: string; productName: string };
};

export default function ProductPage({ searchParams }: props) {
  const { categoryId, productName } = searchParams;

  return (
    <div className="relative flex h-screen flex-1 gap-10 overflow-y-auto">
      <section className="relative mx-auto h-full w-full flex-1">
        <div className="sticky top-0 z-10 bg-background pb-8">
          <SearchbarProducts />
        </div>
        <ProductListAll
          categoryId={Number(categoryId)}
          productName={productName}
        />
      </section>
    </div>
  );
}
