import { signOutAction } from "@/actions/auth-actions";
import { Button } from "../ui/button";

const SignOut = () => {
  return (
    <form action={signOutAction}>
      <Button className="w-full">Salir</Button>
    </form>
  );
};

export default SignOut;
