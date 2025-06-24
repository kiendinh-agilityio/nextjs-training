"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/app/auth";

const FormSchema = z.object({
  customerId: z.string({
    invalid_type_error: "Please select a customer.",
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount greater than $0." }),
  status: z.enum(["pending", "paid"], {
    invalid_type_error: "Please select an invoice status.",
  }),
});

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export const createInvoice = async (prevState: State, formData: FormData) => {
  // Validate form fields using Zod
  const validatedFields = FormSchema.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }

  // If validation is successful, redirect to invoices page
  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
};

export const updateInvoice = async (
  id: string,
  prevState: State,
  formData: FormData
) => {
  const validatedFields = FormSchema.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Invoice.",
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    // In a real application, this would update a database
    // For MockAPI, you might not have an update function directly
    revalidatePath("/dashboard/invoices");
    redirect("/dashboard/invoices");
  } catch (error) {
    return { message: "Database Error: Failed to Update Invoice." };
  }
};

export const authenticateUser = async (
  prevState: string | undefined,
  formData: FormData
) => {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("CredentialsSignin")) {
        return "Invalid email or password";
      }
    }
    throw error; // Re-throw other errors
  }
  return ""; // Return an empty string on success
};

export const createComment = async (formData: FormData) => {
  const comment = formData.get("comment");

  if (!comment) {
    return;
  }

  try {
    // Here you would typically save the comment to your database
    // For now, we'll just revalidate the page
    revalidatePath("/");
  } catch (error) {
    console.error("Failed to add comment:", error);
  }
};

export const incrementLike = async () => {
  try {
    // In a real application, this would update a database
    // For now, we'll just return a random number between 1 and 100
    const newLikes = Math.floor(Math.random() * 100) + 1;
    revalidatePath("/");
    return newLikes;
  } catch (error) {
    console.error("Failed to increment like:", error);
    return 0;
  }
};

export const incrementViews = async () => {
  try {
    // In a real application, this would update a database
    // For now, we'll just return a random number between 1 and 1000
    const newViews = Math.floor(Math.random() * 1000) + 1;
    revalidatePath("/");
    return newViews;
  } catch (error) {
    console.error("Failed to increment views:", error);
    return 0;
  }
};
