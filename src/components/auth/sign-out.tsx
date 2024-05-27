import { signOut } from "@/auth";
import { Button } from "../ui/button";

const SignOut = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button>Sign out</Button>
    </form>
  );
};

export default SignOut;
