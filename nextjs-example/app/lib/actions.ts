"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

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

const LoginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
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

export const authenticate = async (
  prevState: string | undefined,
  formData: FormData
) => {
  const validatedFields = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return "Invalid credentials";
  }

  const { email, password } = validatedFields.data;

  try {
    const response = await fetch(
      "https://683ff7ba5b39a8039a564c58.mockapi.io/login"
    );
    const users = await response.json();

    const user = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (!user) {
      return "Invalid credentials";
    }

    // Set a cookie to indicate the user is logged in
    const cookieStore = await cookies();
    cookieStore.set("token", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
  } catch (error) {
    console.error("Authentication Error:", error);
    return "Something went wrong";
  }

  redirect("/dashboard");
};

export const signOut = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  redirect("/login");
};
