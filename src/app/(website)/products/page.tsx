import ProductListAll from "./(components)/product-list-all";

export const revalidate = 0;

export default function ProductPage() {
  return (
    <div className="relative flex h-screen flex-1 gap-10 overflow-y-auto">
      <section className="relative mx-auto w-full">
        <ProductListAll />
      </section>
    </div>
  );
}
