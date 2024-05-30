import { signOutAction } from "@/actions/auth-actions";
import { Button } from "../ui/button";

const SignOut = () => {
  return (
    <form action={signOutAction}>
      <Button className="w-full">Sign out</Button>
    </form>
  );
};

export default SignOut;
