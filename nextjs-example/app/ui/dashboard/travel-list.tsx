"use client";

import { useEffect, useRef, useState } from "react";
import TravelCard from "@/app/ui/dashboard/travel-card";
import { TRAVEL_DATA } from "@/app/lib/travel-data";

const TravelList = () => {
  const [visibleCount, setVisibleCount] = useState(3);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + 3, TRAVEL_DATA.length));
        }
      },
      {
        rootMargin: "100px",
      }
    );

    const el = loadMoreRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, [visibleCount]);

  return (
    <>
      <h1 className="text-center text-4xl font-helveticaBold m-8">
        Explore Travel Destinations
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {TRAVEL_DATA.slice(0, visibleCount).map((item) => (
          <TravelCard
            key={item.id}
            image={item.image}
            category={item.category}
            title={item.title}
            date={item.date}
          />
        ))}
        {visibleCount < TRAVEL_DATA.length && (
          <div ref={loadMoreRef} className="col-span-full h-10"></div>
        )}
      </div>
    </>
  );
};

export default TravelList;
