import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

type props = {
  children: ReactNode;
};

const CardItems = ({ children }: props) => {
  return (
    <div className="h-fit p-1">
      <Card className="h-fit rounded-none border-none bg-transparent shadow-none">
        <CardContent className="m-0 flex aspect-square items-center justify-center p-0 ">
          {children}
        </CardContent>
      </Card>
    </div>
  );
};

export default CardItems;
