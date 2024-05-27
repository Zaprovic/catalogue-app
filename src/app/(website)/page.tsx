/* eslint-disable @next/next/no-img-element */
import { auth } from "@/auth";
import SignIn from "@/components/auth/sign-in";
import SignOut from "@/components/auth/sign-out";
import { cn } from "@/lib/utils";

export const revalidate = 0;

export default async function Home() {
  // const user = await currentUser();
  const user = null;
  const session = await auth();

  // console.log(session?.user);

  return (
    <main>
      <h1 className="text-3xl font-semibold -tracking-wider">
        Inicio (app using next auth) - next auth is open source
      </h1>
      <p>Esta ruta debe de ser publica al usuario</p>

      <div className="flex gap-2">
        <SignIn />
        <SignOut />
        <p
          className={cn("font-medium", {
            "text-green-500": session,
            "text-red-500": !session,
          })}
        >
          {session ? "Usuario autenticado" : "Usuario no autenticado"}
        </p>
        {session && <span>{session.user?.name}</span>}
        {session && <img src={session.user?.image ?? ""} alt="User image" />}
      </div>
      {/* {!user ? (
        <div className="flex gap-2">
          <Button asChild>
            <SignInButton />
          </Button>
          <Button asChild>
            <SignUpButton />
          </Button>
        </div>
      ) : (
        <Button asChild>
          <SignOutButton />
        </Button>
      )} */}
    </main>
  );
}
