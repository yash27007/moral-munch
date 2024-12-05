import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AuthError } from 'firebase/auth';
import { signIn, signUp, signInWithGoogle } from '@/services/auth.service';
import { Button } from '@/components/ui/button';
import { Mail, Lock, Chrome } from 'lucide-react';
import { useAuthStore } from '@/lib/store';

interface AuthFormProps {
  mode: 'signin' | 'signup';
}

interface FormData {
  email: string;
  password: string;
}

export const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleAuthError = (error: AuthError) => {
    console.error('Auth error:', error);
    switch (error.code) {
      case 'auth/email-already-in-use':
        return 'This email is already registered. Please sign in instead.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters long.';
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return 'Invalid email or password.';
      default:
        return `Authentication error: ${error.message}`;
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      setError('');

      if (mode === 'signin') {
        await signIn(data.email, data.password);
      } else {
        await signUp(data.email, data.password);
      }

      reset();
      navigate('/dashboard');
    } catch (err) {
      console.error('Auth error:', err);
      setError(handleAuthError(err as AuthError));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError('');
      await signInWithGoogle();
      navigate('/dashboard');
    } catch (err) {
      console.error('Google auth error:', err);
      setError('Google authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">
        {mode === 'signin' ? 'Sign In' : 'Create Account'}
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Please enter a valid email'
                }
              })}
              type="email"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
              disabled={isLoading}
            />
          </div>
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        <div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              {...register('password', { 
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
              type="password"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
              disabled={isLoading}
            />
          </div>
          {errors.password && (
            <span className="text-red-500 text-sm">{errors.password.message}</span>
          )}
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        <Button 
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-700"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : mode === 'signin' ? 'Sign In' : 'Sign Up'}
        </Button>
      </form>

      <div className="mt-4">
        <Button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-800"
          disabled={isLoading}
        >
          <Chrome className="w-5 h-5 mr-2" />
          Continue with Google
        </Button>
      </div>
    </div>
  );
};