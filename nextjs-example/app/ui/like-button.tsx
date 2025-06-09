"use client";

import { incrementLike } from "@/app/lib/actions";
import { useState } from "react";
import { Button } from "@/app/ui/button";

const LikeButton = ({ initialLikes }: { initialLikes: number }) => {
  const [likes, setLikes] = useState(initialLikes);

  const handleLike = async () => {
    const updatedLikes = await incrementLike();

    setLikes(updatedLikes);
  };

  return (
    <div className="mt-[15px]">
      <p className="mb-[12px]">Total Likes: {likes}</p>
      <Button onClick={handleLike}>Like</Button>
    </div>
  );
};

export default LikeButton;
