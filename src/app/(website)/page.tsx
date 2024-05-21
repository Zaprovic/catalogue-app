import ProductRegistrationForm from "./products/(components)/product-registration-form";

export default function Home() {
  return (
    <div className="flex h-full flex-col p-6">
      <h1 className="text-3xl font-bold -tracking-wider">
        Registra tus productos
      </h1>

      <section>
        <ProductRegistrationForm />
      </section>
    </div>
  );
}
