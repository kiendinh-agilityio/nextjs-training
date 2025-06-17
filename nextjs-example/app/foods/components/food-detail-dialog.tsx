"use client";

import { Food } from "../types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FoodDetail } from "./food-detail";

interface FoodDetailDialogProps {
  food: Food;
  children: React.ReactNode;
}

export const FoodDetailDialog = ({ food, children }: FoodDetailDialogProps) => (
  <Dialog>
    <DialogTrigger asChild>{children}</DialogTrigger>
    <DialogContent className="sm:max-w-[800px] p-0">
      <DialogHeader className="sr-only">
        {" "}
        <DialogTitle>{food.name}</DialogTitle>
      </DialogHeader>
      <FoodDetail food={food} />
    </DialogContent>
  </Dialog>
);
