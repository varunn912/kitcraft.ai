import React from 'react';
import type { User } from '../types';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  user: User;
  onLogout: () => void;
  onNavigate: (view: 'dashboard' | 'create' | 'projects' | 'cart') => void;
  cartItemCount: number;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, onNavigate, cartItemCount }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/30 dark:bg-slate-900/30 backdrop-blur-lg border-b border-black/10 dark:border-white/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <button onClick={() => onNavigate('dashboard')} className="flex-shrink-0">
              <Logo size="small" />
            </button>
            <nav className="hidden md:flex md:space-x-4">
              <button onClick={() => onNavigate('dashboard')} className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800">Dashboard</button>
              <button onClick={() => onNavigate('create')} className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800">Create Kit</button>
              <button onClick={() => onNavigate('projects')} className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800">My Projects</button>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={() => onNavigate('cart')} className="relative p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">{cartItemCount}</span>
              )}
            </button>
            <ThemeToggle />
            <div className="relative">
              <button onClick={onLogout} className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800">Logout</button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
