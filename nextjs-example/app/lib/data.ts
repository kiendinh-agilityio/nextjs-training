import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  Revenue,
  Invoice,
} from "./definitions";
import { formatCurrency } from "./utils";
import { invoices, customers } from "./placeholder-data";

export const fetchRevenue = async () => {
  try {
    const response = await fetch(
      "https://683ff7ba5b39a8039a564c58.mockapi.io/revenue",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch revenue data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
};

export const fetchLatestInvoices = async (): Promise<LatestInvoiceRaw[]> => {
  try {
    // Instead of fetching from a placeholder API, return mock data
    // Sort invoices by date in descending order to get the latest
    const sortedInvoices = invoices.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // Slice the first 5 invoices to get the latest ones
    const latestFiveInvoices = sortedInvoices.slice(0, 5);

    // Map the data to match the expected LatestInvoiceRaw type
    const latestInvoicesRaw: LatestInvoiceRaw[] = latestFiveInvoices.map(
      (invoice, index) => ({
        id: `mock-${index}-${invoice.customer_id}`, // Generate a simple mock ID
        customer_id: invoice.customer_id,
        amount: invoice.amount,
        date: invoice.date,
        status: invoice.status as "pending" | "paid", // Type assertion for status
      })
    );

    return latestInvoicesRaw;
  } catch (error) {
    console.error("Error fetching latest invoices:", error);
    throw new Error("Failed to fetch the latest invoices.");
  }
};

export const fetchCardData = async () => {
  try {
    // Return mock card data instead of fetching from API
    const numberOfInvoices = 15;
    const numberOfCustomers = 8;
    const totalPaidInvoices = 110636; // Representing $1,106.36 as cents
    const totalPendingInvoices = 133911; // Representing $1,339.11 as cents

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices: formatCurrency(totalPaidInvoices),
      totalPendingInvoices: formatCurrency(totalPendingInvoices),
    };
  } catch (error) {
    console.error("Error fetching card data:", error);
    throw new Error("Failed to fetch card data.");
  }
};

const ITEMS_PER_PAGE = 6;
export const fetchFilteredInvoices = async (
  query: string,
  currentPage: number
) => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const response = await fetch(
      `https://api.example.com/invoices?query=${query}&page=${currentPage}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch invoices");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to fetch invoices.");
  }
};

export const fetchInvoicesPages = async (query: string) => {
  try {
    const response = await fetch(
      `https://api.example.com/invoices/pages?query=${query}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch invoice pages");
    }

    const data = await response.json();
    return data.totalPages;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to fetch total number of invoices.");
  }
};

export const fetchInvoiceById = async (id: string) => {
  try {
    const response = await fetch(`https://api.example.com/invoices/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch invoice");
    }

    const data = await response.json();
    return {
      ...data,
      amount: data.amount / 100,
    };
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to fetch invoice.");
  }
};

export const fetchCustomers = async (): Promise<CustomerField[]> => {
  try {
    // Return mock customer data instead of fetching from API
    return customers;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw new Error("Failed to fetch all customers.");
  }
};

export const fetchFilteredCustomers = async (query: string) => {
  try {
    const response = await fetch(
      `https://api.example.com/customers?query=${query}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch filtered customers");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to fetch filtered customers.");
  }
};
