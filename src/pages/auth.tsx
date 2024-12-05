import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthForm } from '@/components/auth/auth-form';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/lib/store';

const AuthPage = () => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Moral Munch</h1>
          <p className="text-gray-600">
            {mode === 'signin' 
              ? 'Welcome back! Sign in to continue your journey.' 
              : 'Join us to explore amazing stories!'}
          </p>
        </div>

        <div className="flex justify-center space-x-4 mb-8">
          <Button
            onClick={() => setMode('signin')}
            className={`${
              mode === 'signin'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-900'
            }`}
          >
            Sign In
          </Button>
          <Button
            onClick={() => setMode('signup')}
            className={`${
              mode === 'signup'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-900'
            }`}
          >
            Sign Up
          </Button>
        </div>

        <AuthForm mode={mode} />
      </div>
    </div>
  );
};

export default AuthPage;