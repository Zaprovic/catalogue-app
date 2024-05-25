import { SignUp } from "@clerk/nextjs";

const Page = () => {
  return (
    <main className="grid size-full place-items-center">
      <SignUp path="/sign-up" />
    </main>
  );
};

export default Page;
