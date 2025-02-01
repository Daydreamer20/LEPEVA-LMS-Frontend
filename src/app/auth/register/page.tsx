'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppDispatch } from '@/store/hooks';
import { register } from '@/store/slices/authSlice';

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await dispatch(register(formData)).unwrap();
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to register');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-base-100 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary">LEPEVA LMS</h1>
          <h2 className="mt-6 text-3xl font-bold">Create your account</h2>
        </div>

        {error && (
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="label">
                  <span className="label-text">First Name</span>
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  className="input input-bordered w-full"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="lastName" className="label">
                  <span className="label-text">Last Name</span>
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  className="input input-bordered w-full"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="label">
                <span className="label-text">Email address</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="input input-bordered w-full"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="password" className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="input input-bordered w-full"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className={`btn btn-primary w-full ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Create account'}
            </button>
          </div>

          <div className="text-center text-sm">
            Already have an account?{' '}
            <Link href="/auth/login" className="link link-primary">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
} 