'use client';

// import react hooks
import { useState, useActionState, startTransition } from 'react';

// import icons
import { EyeIcon, EyeOffIcon } from 'lucide-react';

// import form and validation
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// import toast notification
import { toast } from 'sonner';

// import nextjs router and auth
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

// import constants
import { ROUTERS } from '@/constants/router';

// import stores
import { useUserStore } from '@/stores/useUserStore';

// import lib
import { fetchProfile } from '@/lib/get-user-from-api';

// import components
import { Button } from '@/components/common/ui/button';
import { Input } from '@/components/common/ui/input';

// import lib
import { loginSchema } from '@/lib/schema';

// import function utils
import { authValidations } from '@/utils/authValidations';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { setProfile } = useUserStore();

  type FormData = z.infer<typeof loginSchema>;

  // Use useActionState for better state management
  const [state, formAction, isPending] = useActionState(
    async (prevState: { error?: string }, formData: FormData) => {
      const res = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (res?.error) {
        toast.error('Failed to log in. Please try again.');
        return { error: authValidations(res.error) };
      }

      // Success - fetch and sync user profile
      try {
        const { user, error } = await fetchProfile(formData.email);
        if (!error && user) {
          setProfile({
            id: user.id,
            name: user.name,
            avatar: user.avatar,
            email: user.email,
          });
        }
      } catch (error) {
        console.error('Failed to fetch user profile after login:', error);
      }

      // Success - redirect
      router.push(ROUTERS.HOME);
      return { error: undefined };
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
      <div className="mb-2 flex items-center gap-2">
        <Input
          id="credentials-email"
          type="email"
          placeholder="Email"
          aria-invalid={!!errors.email}
          {...register('email')}
        />
      </div>
      {errors.email && (
        <p className="text-[0.8rem] text-error">{errors.email.message}</p>
      )}
      <div className="relative mb-2 flex items-center gap-2">
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
        <p className="text-[0.8rem] text-error">{errors.password.message}</p>
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
