// FIX: Implemented the main application component for authenticated users.
import React, { useState } from 'react';
import type { User, ProjectKit } from '../types';
import { useUserStorage } from '../hooks/useUserStorage';
// FIX: Corrected import paths for components.
import Header from './Header';
import Dashboard from './Dashboard';
import ProjectInput from './ProjectInput';
import ProjectList from './ProjectList';
import ProjectKitDisplay from './ProjectKitDisplay';
import CartView from './CartView';
import AnimatedView from './AnimatedView';
import { FullPageLoader } from './loaders';

interface MainAppProps {
  user: User;
  onLogout: () => void;
}

type View = 'dashboard' | 'create' | 'projects' | 'kit' | 'cart';

const MainApp: React.FC<MainAppProps> = ({ user, onLogout }) => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedKit, setSelectedKit] = useState<ProjectKit | null>(null);

  const { projects, addProject, isStorageLoading, cart, addMaterialsToCart, clearCart } = useUserStorage(user);

  const handleNavigate = (view: 'dashboard' | 'create' | 'cart' | 'projects') => {
    setCurrentView(view);
  };
  
  const handleProjectCreated = (kit: ProjectKit) => {
    addProject(kit);
    setSelectedKit(kit);
    setCurrentView('kit');
  };

  const handleViewProject = (kit: ProjectKit) => {
    setSelectedKit(kit);
    setCurrentView('kit');
  };
  
  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'create':
        return <ProjectInput onProjectCreated={handleProjectCreated} />;
      case 'projects':
        return <ProjectList projects={projects} onViewProject={handleViewProject} />;
      case 'kit':
        if (!selectedKit) {
          setCurrentView('dashboard'); // Should not happen, but as a fallback
          return null;
        }
        return <ProjectKitDisplay kit={selectedKit} addMaterialsToCart={addMaterialsToCart} />;
      case 'cart':
        return <CartView cart={cart} onClearCart={clearCart} />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  const viewKey = selectedKit ? `${currentView}-${selectedKit.id}` : currentView;

  if (isStorageLoading) {
    return <FullPageLoader message="Loading your workshop..."/>
  }

  return (
    <div className="min-h-screen">
      <Header 
        user={user} 
        onLogout={onLogout} 
        onNavigate={handleNavigate} 
        cartItemCount={cart.length}
      />
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <AnimatedView viewKey={viewKey}>
            {renderContent()}
        </AnimatedView>
      </main>
    </div>
  );
};

export default MainApp;