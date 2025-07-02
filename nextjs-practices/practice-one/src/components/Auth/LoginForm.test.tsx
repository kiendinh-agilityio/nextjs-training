import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from './LoginForm';

// Mock next/navigation useRouter
const pushMock = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ push: pushMock })),
}));

// Mock userLogin action
jest.mock('@/actions/auth', () => ({
  userLogin: jest.fn(),
}));

// Mock toast from sonner
jest.mock('sonner', () => ({
  toast: { error: jest.fn() },
}));

import { userLogin } from '@/actions/auth';
import { toast } from 'sonner';

const fillForm = (email = 'Test@gmail.com', password = 'Password1!') => {
  fireEvent.change(screen.getByPlaceholderText(/email/i), {
    target: { value: email },
  });
  fireEvent.change(screen.getByPlaceholderText(/password/i), {
    target: { value: password },
  });
};

describe('LoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    pushMock.mockClear();
  });

  it('should match snapshot', () => {
    const { asFragment } = render(<LoginForm />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should toggle password visibility', () => {
    render(<LoginForm />);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const toggleBtn = screen.getByRole('button', { name: '' });
    expect(passwordInput).toHaveAttribute('type', 'password');
    fireEvent.click(toggleBtn);
    expect(passwordInput).toHaveAttribute('type', 'text');
    fireEvent.click(toggleBtn);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('should show validation errors for empty fields', async () => {
    render(<LoginForm />);
    fireEvent.click(screen.getByRole('button', { name: /button login/i }));
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/password is required/i),
    ).toBeInTheDocument();
  });

  it('should show validation error for invalid password', async () => {
    render(<LoginForm />);
    fillForm('test@gmail.com', 'short');
    fireEvent.click(screen.getByRole('button', { name: /button login/i }));
    expect(
      await screen.findByText(/password must be more than 8 characters/i),
    ).toBeInTheDocument();
  });

  it('should show error from userLogin', async () => {
    (userLogin as jest.Mock).mockResolvedValue('Email or password is invalid.');
    render(<LoginForm />);
    fillForm();
    fireEvent.click(screen.getByRole('button', { name: /button login/i }));
    expect(
      await screen.findByText(/email or password is invalid/i),
    ).toBeInTheDocument();
  });

  it('should show toast error on exception', async () => {
    (userLogin as jest.Mock).mockImplementation(() => {
      throw new Error('Network error');
    });
    render(<LoginForm />);
    fillForm();
    fireEvent.click(screen.getByRole('button', { name: /button login/i }));
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        'Failed to log in. Please try again.',
      );
    });
  });
});
