"use client";

import { useFormStatus } from "react-dom";
import { createComment } from "@/app/lib/actions";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
    >
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
};

const CommentForm = () => (
  <form action={createComment} className="space-y-4">
    <div className="mt-[12px]">
      <textarea
        name="comment"
        required
        className="w-full p-2 border rounded min-h-[100px]"
        placeholder="Write your comment here..."
      />
    </div>
    <SubmitButton />
  </form>
);

export default CommentForm;
