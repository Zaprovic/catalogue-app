/* eslint-disable @next/next/no-img-element */
import { auth } from "@/auth";
import SignIn from "@/components/auth/sign-in";
import SignOut from "@/components/auth/sign-out";

export const revalidate = 0;

export default async function Home() {
  const session = await auth();

  return (
    <main>
      <h1 className="text-3xl font-semibold -tracking-wider">
        {session ? `Bienvenido, ${session.user?.name}` : "Inicio"}
      </h1>
      <p>Esta ruta debe de ser publica al usuario</p>

      <div className="flex gap-2">
        {session ? <SignOut /> : <SignIn />}

        {session && <span>{session.user?.name}</span>}
        {session && <img src={session.user?.image ?? ""} alt="User image" />}
      </div>
    </main>
  );
}
