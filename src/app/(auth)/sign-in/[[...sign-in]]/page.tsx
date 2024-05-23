import { SignIn } from "@clerk/nextjs";

const Page = () => {
  return (
    <main className="grid size-full place-items-center">
      <SignIn path="/sign-in" />
    </main>
  );
};

export default Page;
