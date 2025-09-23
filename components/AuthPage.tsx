import React, { useState } from 'react';
import { authService } from '../services/authService';
import type { User } from '../types';
import Logo from './Logo';

interface AuthPageProps {
  onLogin: (user: User) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      let user: User | null = null;
      if (isLoginView) {
        user = authService.login(email, password);
        if (!user) {
          setError('Invalid email or password.');
          return;
        }
      } else {
        user = authService.register(email, password);
        if (!user) {
          setError('User already exists. Please try logging in.');
          return;
        }
      }
      onLogin(user);
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Logo />
          <p className="mt-4 text-slate-400 dark:text-slate-400">Your AI-powered DIY project workshop.</p>
        </div>
        
        <div className="bg-white/5 dark:bg-slate-800/50 backdrop-blur-sm border border-black/10 dark:border-slate-700/50 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-center text-slate-800 dark:text-slate-100 mb-6">
            {isLoginView ? 'Welcome Back' : 'Create an Account'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-600 dark:text-slate-300">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white/10 dark:bg-slate-900/70 border border-slate-300 dark:border-slate-600 rounded-md text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password"className="block text-sm font-medium text-slate-600 dark:text-slate-300">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={isLoginView ? "current-password" : "new-password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white/10 dark:bg-slate-900/70 border border-slate-300 dark:border-slate-600 rounded-md text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>
            
            {error && <p className="text-sm text-red-500 dark:text-red-400">{error}</p>}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500 focus:ring-offset-slate-50 dark:focus:ring-offset-slate-900 transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-fuchsia-500/30"
              >
                {isLoginView ? 'Sign in' : 'Register'}
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
            {isLoginView ? "Don't have an account?" : "Already have an account?"}{' '}
            <button onClick={() => { setIsLoginView(!isLoginView); setError(null); }} className="font-medium text-fuchsia-600 hover:text-fuchsia-500 dark:text-fuchsia-400 dark:hover:text-fuchsia-300">
              {isLoginView ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;