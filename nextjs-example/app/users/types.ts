export interface User {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  status: string;
}

export interface FormData {
  name: string;
  email: string;
  phoneNumber: string;
  status: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  phoneNumber?: string;
  status?: string;
}

export interface LoadingState {
  isLoading: boolean;
  action: "create" | "update" | "delete" | "fetch" | null;
}
