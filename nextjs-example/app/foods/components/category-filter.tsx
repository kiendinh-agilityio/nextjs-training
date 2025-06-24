"use client";

import { useTransition } from "react";
import { Category } from "../types";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryFilter = ({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) => {
  const [isPending, startTransition] = useTransition();

  const handleValueChange = (value: string) => {
    startTransition(() => {
      onCategoryChange(value === "all" ? "" : value);
    });
  };

  return (
    <div className="mb-6 flex items-center gap-2">
      <Label htmlFor="category">Filter by Category:</Label>
      <Select
        value={selectedCategory === "" ? "all" : selectedCategory}
        onValueChange={handleValueChange}
        disabled={isPending}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {categories.map((cat) => (
            <SelectItem key={cat.name} value={cat.name}>
              {cat.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
