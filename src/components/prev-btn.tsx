"use client";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";

const PrevBtn = () => {
  const router = useRouter();
  return (
    <Button
      size={"icon"}
      className="rounded-lg"
      onClick={() => router.back()}
    >
      <IconArrowLeft />
    </Button>
  );
};

export default PrevBtn;
