"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "./ui/input";

const SearchbarProducts = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (input: string) => {
    const params = new URLSearchParams(searchParams);
    if (input) {
      params.set("productName", input);
    } else {
      params.delete("productName");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Input
      placeholder="Buscar productos aqui"
      onChange={(event) => handleSearch(event.target.value)}
      defaultValue={searchParams.get("productName")?.toString()}
    />
  );
};

export default SearchbarProducts;
