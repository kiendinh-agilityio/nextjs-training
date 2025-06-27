'use client';
import { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();

  type FormData = z.infer<typeof loginSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data: FormData) => {
    try {
      const res = await userLogin({
        email: data.email,
        password: data.password,
      });

      if (res) {
        setError('email', { message: res });
        setError('password', { message: '' });
        return;
      }
    } catch {
      toast.error('Failed to log in. Please try again.');
      return;
    }

    router.push(ROUTERS.HOME);
  };

  return (
    <form
      className="w-full max-w-md space-y-2"
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
        disabled={isSubmitting}
        ariaLabel="Button Login"
      >
        {isSubmitting ? 'Logging in...' : 'Log In'}
      </Button>
    </form>
  );
};

export default LoginForm;
