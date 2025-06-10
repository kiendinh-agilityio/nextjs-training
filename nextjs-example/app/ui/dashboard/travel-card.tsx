"use client";

import Image from "next/image";
import { useState } from "react";

interface TravelCardProps {
  image: string;
  category: string;
  title: string;
  date: string;
}

const TravelCard = ({ image, category, title, date }: TravelCardProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition-all duration-300 overflow-hidden">
      <div className="relative w-full h-48">
        <Image
          src={image}
          alt={title}
          fill
          className={`object-cover transition duration-700 ease-in-out ${
            isLoading ? "blur-sm scale-105" : "blur-0 scale-100"
          }`}
          onLoadingComplete={() => setIsLoading(false)}
        />
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-500 font-medium mb-1">{category}</p>
        <h3 className="text-lg font-semibold text-indigo-600 leading-tight hover:underline cursor-pointer">
          {title}
        </h3>
        <p className="text-xs text-gray-400 mt-3">{date}</p>
      </div>
    </div>
  );
};

export default TravelCard;
