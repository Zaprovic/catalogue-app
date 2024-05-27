"use client";
import { signInAction } from "@/actions/auth-actions";
import IconGoogleColor from "@/icons/icon-google-color";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Form } from "../ui/form";

const SignIn = () => {
  const form = useForm();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Inicia sesion</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form action={signInAction}>
            <Button className="flex gap-2">
              <span>Iniciar sesion con Google</span>
              <IconGoogleColor width={20} height={20} />
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default SignIn;
