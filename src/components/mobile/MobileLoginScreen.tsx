'use client';

import { useState } from 'react';
import { Zap, ArrowRight, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAppStore } from '@/lib/store';

export function MobileLoginScreen() {
  const { setLoggedIn } = useAppStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'sso' | 'email'>('sso');

  const handleSSOLogin = (provider: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setLoggedIn(true);
      setIsLoading(false);
    }, 1000);
  };

  const handleEmailLogin = () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setLoggedIn(true);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 flex flex-col">
      {/* Header */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/30">
            <Zap className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">BoltInsight</h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            AI-powered research proposal assistant
          </p>
        </div>

        {/* SSO Mode */}
        {mode === 'sso' && (
          <div className="w-full max-w-sm">
            <h2 className="mb-6 text-center text-lg font-semibold text-gray-900 dark:text-white">
              Sign in to continue
            </h2>

            {/* SSO Buttons */}
            <div className="space-y-3">
              {/* Microsoft */}
              <button
                onClick={() => handleSSOLogin('microsoft')}
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3.5 font-medium text-gray-700 dark:text-gray-200 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5">
                  <path fill="#F25022" d="M1 1h10v10H1z" />
                  <path fill="#00A4EF" d="M1 13h10v10H1z" />
                  <path fill="#7FBA00" d="M13 1h10v10H13z" />
                  <path fill="#FFB900" d="M13 13h10v10H13z" />
                </svg>
                <span>Continue with Microsoft</span>
                {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              </button>

              {/* Google */}
              <button
                onClick={() => handleSSOLogin('google')}
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3.5 font-medium text-gray-700 dark:text-gray-200 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              {/* Okta */}
              <button
                onClick={() => handleSSOLogin('okta')}
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3.5 font-medium text-gray-700 dark:text-gray-200 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
              >
                <div className="flex h-5 w-5 items-center justify-center rounded bg-blue-600 text-xs font-bold text-white">
                  O
                </div>
                <span>Continue with Okta SSO</span>
              </button>
            </div>

            {/* Divider */}
            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
              <span className="text-sm text-gray-500 dark:text-gray-400">or</span>
              <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
            </div>

            {/* Email Login */}
            <button
              onClick={() => setMode('email')}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 dark:bg-white px-4 py-3.5 font-medium text-white dark:text-gray-900 transition-colors hover:bg-gray-800 dark:hover:bg-gray-100"
            >
              <Mail className="h-5 w-5" />
              <span>Sign in with Email</span>
            </button>
          </div>
        )}

        {/* Email Mode */}
        {mode === 'email' && (
          <div className="w-full max-w-sm">
            <button
              onClick={() => setMode('sso')}
              className="mb-6 flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              Back to SSO
            </button>

            <h2 className="mb-6 text-center text-lg font-semibold text-gray-900 dark:text-white">
              Sign in with Email
            </h2>

            {error && (
              <div className="mb-4 rounded-lg bg-red-50 dark:bg-red-900/30 p-3 text-sm text-red-600 dark:text-red-400">
                {error}
              </div>
            )}

            {/* Email Input */}
            <div className="mb-4">
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-3 pl-10 pr-4 text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-3 pl-10 pr-12 text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleEmailLogin}
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3.5 font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>

            {/* Forgot Password */}
            <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
              Forgot password?{' '}
              <button className="text-blue-600 dark:text-blue-400 font-medium">Reset it</button>
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-6 text-center">
        <p className="text-xs text-gray-400 dark:text-gray-500">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
