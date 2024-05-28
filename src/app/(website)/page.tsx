/* eslint-disable @next/next/no-img-element */
import { auth } from "@/auth";
import SignIn from "@/components/auth/sign-in";
import SignOut from "@/components/auth/sign-out";
import CategoryImage from "@/components/category-image";

export const revalidate = 0;

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex h-full flex-col gap-20">
      <h1 className="text-3xl font-semibold -tracking-wider">
        {session ? `Bienvenido, ${session.user?.name}` : "Inicio"}
      </h1>

      <div className="flex flex-1 items-center justify-center gap-2">
        {session ? <SignOut /> : <SignIn />}

        {session && <span>{session.user?.name}</span>}
      </div>

      <section className="flex w-full flex-col justify-center gap-6 sm:hidden">
        <CategoryImage src="/images/img-1.png" alt="img-1" />
        <CategoryImage src="/images/img-2.png" alt="img-2" />
        <CategoryImage src="/images/img-3.png" alt="img-3" />
        <CategoryImage src="/images/img-4.png" alt="img-4" />
      </section>
    </main>
  );
}
