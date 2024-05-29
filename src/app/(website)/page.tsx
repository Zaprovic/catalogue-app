/* eslint-disable @next/next/no-img-element */
import { auth } from "@/auth";
import CategoryImage from "@/components/category-image";
import Link from "next/link";

export const revalidate = 0;

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex h-full flex-col gap-20">
      <h1 className="text-3xl font-semibold -tracking-wider">
        {session ? `Bienvenido, ${session.user?.name}` : "Inicio"}
      </h1>

      {/* <div className="flex flex-1 items-center justify-center gap-2">
        {session ? <SignOut /> : <SignIn />}

        {session && <span>{session.user?.name}</span>}
      </div> */}

      <nav className="flex items-center justify-center sm:hidden">
        <ul className="flex flex-col items-center justify-center gap-5 text-2xl font-semibold text-primary/40">
          <li>
            <Link href="#">Inicio</Link>
          </li>
          <li>
            <Link href="#">Productos</Link>
          </li>
          <li>
            <Link href="#">Contacto</Link>
          </li>
          <li>
            <Link href="#">Dashboard</Link>
          </li>
        </ul>
      </nav>

      <section className="flex w-full flex-col justify-center gap-6 sm:hidden">
        <CategoryImage src="/images/img-1.png" alt="img-1" />
        <CategoryImage src="/images/img-2.png" alt="img-2" />
        <CategoryImage src="/images/img-3.png" alt="img-3" />
        <CategoryImage src="/images/img-4.png" alt="img-4" />
      </section>
    </main>
  );
}
