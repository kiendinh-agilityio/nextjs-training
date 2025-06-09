"use client";

import { incrementViews } from "../lib/actions";
import { useState, useEffect, useTransition } from "react";

const ViewCount = ({ initialViews }: { initialViews: number }) => {
  const [views, setViews] = useState(initialViews);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const updatedViews = await incrementViews();

      setViews(updatedViews);
    });
  }, []);

  return <p>Total Views: {views}</p>;
};

export default ViewCount;
