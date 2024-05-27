"use client";
import { signInAction } from "@/actions/auth-actions";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import Link from "next/link";
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
        <CardTitle>Inicia sesion a Yesecommerce</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form action={signInAction}>
            <Button className="flex gap-2">
              <span>Iniciar sesion con Google</span>
              <IconBrandGoogleFilled />
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <div className="text-sm">
          No tienes cuenta?
          <Button asChild variant={"link"}>
            <Link href={"#"}>Crea una aqui</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SignIn;
