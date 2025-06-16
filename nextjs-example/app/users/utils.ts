import { FormData, FormErrors } from "./types";

export const validateForm = (data: FormData): FormErrors => {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = "Name is required";
  } else if (data.name.length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Invalid email format";
  }

  if (!data.phoneNumber.trim()) {
    errors.phoneNumber = "Phone number is required";
  } else if (!/^\+?[\d\s-]{10,}$/.test(data.phoneNumber)) {
    errors.phoneNumber = "Invalid phone number format";
  }

  if (!data.status) {
    errors.status = "Status is required";
  }

  return errors;
};

export const hasErrors = (errors: FormErrors): boolean => {
  return Object.keys(errors).length > 0;
};

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return "An unexpected error occurred";
};
