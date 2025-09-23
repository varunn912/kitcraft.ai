// FIX: Implemented the main App component to handle authentication and view routing.
import React, { useState, useEffect } from 'react';
import { authService } from './services/authService';
import type { User } from './types';
import AuthPage from './components/AuthPage';
import MainApp from './components/MainApp';
import { FullPageLoader } from './components/loaders';
import { useTheme } from './hooks/useTheme';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useTheme(); // Initialize theme hook

  useEffect(() => {
    // Check for an existing session on initial load
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
  };

  if (isLoading) {
    return <FullPageLoader message="Initializing KitCraft.AI..." />;
  }

  return (
    <div className="min-h-screen font-sans">
      {user ? (
        <MainApp user={user} onLogout={handleLogout} />
      ) : (
        <AuthPage onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;