import { NextResponse } from 'next/server';

// Simulate database
const customers = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
];

export const GET = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return NextResponse.json(customers);
};
