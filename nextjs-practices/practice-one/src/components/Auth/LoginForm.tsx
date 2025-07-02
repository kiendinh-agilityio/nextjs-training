'use client';

import { useState, useActionState, startTransition } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { ROUTERS } from '@/constants/router';

import { Button } from '@/components/common/ui/button';
import { Input } from '@/components/common/ui/input';

import { loginSchema } from '@/lib/schema';
import { userLogin } from '@/actions/auth';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  type FormData = z.infer<typeof loginSchema>;

  // Use useActionState for better state management
  const [state, formAction, isPending] = useActionState(
    async (prevState: { error?: string }, formData: FormData) => {
      try {
        const res = await userLogin({
          email: formData.email,
          password: formData.password,
        });

        if (res) {
          return { error: res };
        }

        // Success - redirect
        window.location.href = ROUTERS.HOME;
        return { error: undefined };
      } catch {
        toast.error('Failed to log in. Please try again.');

        return { error: 'Failed to log in. Please try again.' };
      }
    },
    { error: undefined },
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = (data: FormData) => {
    // Clear previous errors
    setError('email', { message: '' });
    setError('password', { message: '' });

    // Wrap formAction in startTransition to avoid the async function error
    startTransition(() => {
      formAction(data);
    });
  };

  // Set form errors from action state
  if (state.error && !errors.email?.message && !errors.password?.message) {
    setError('password', { message: state.error });
  }

  return (
    <form
      className="w-full max-w-md space-y-2 lg:space-y-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex items-center gap-2 mb-2">
        <Input
          id="credentials-email"
          type="email"
          placeholder="Email"
          aria-invalid={!!errors.email}
          {...register('email')}
        />
      </div>
      {errors.email && (
        <p className="text-error text-[0.8rem]">{errors.email.message}</p>
      )}
      <div className="relative flex items-center gap-2 mb-2">
        <Input
          id="credentials-password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          aria-invalid={!!errors.password}
          {...register('password')}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-0 p-2.5"
        >
          {showPassword ? (
            <EyeOffIcon className="text-muted-foreground h-5 w-5" />
          ) : (
            <EyeIcon className="text-muted-foreground h-5 w-5" />
          )}
        </button>
      </div>
      {errors.password && (
        <p className="text-error text-[0.8rem]">{errors.password.message}</p>
      )}
      <Button
        type="submit"
        className="w-full rounded-lg"
        disabled={isPending}
        ariaLabel="Button Login"
      >
        {isPending ? 'Logging in...' : 'Log In'}
      </Button>
    </form>
  );
};

export default LoginForm;
