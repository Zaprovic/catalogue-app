import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SignInButton, SignOutButton, SignUpButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

export const revalidate = 0;

export default async function Home() {
  const user = await currentUser();

  console.log(user?.id);
  console.log(user?.username);
  console.log(user?.firstName);
  console.log(user?.lastName);
  console.log(user?.emailAddresses.map((email) => email.emailAddress));

  return (
    <main>
      <h1 className="text-3xl font-semibold -tracking-wider">Inicio</h1>
      <p>Esta ruta debe de ser publica al usuario</p>
      <p className={cn("font-medium text-red-500", { "text-green-500": user })}>
        {user ? "Usuario autenticado" : "Usuario no autenticado"}
      </p>
      {!user ? (
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
      )}
    </main>
  );
}
