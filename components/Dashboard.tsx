import React from 'react';

interface DashboardProps {
  onNavigate: (view: 'create' | 'projects') => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl md:text-6xl">
        Welcome to your <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-purple-600">DIY Workshop</span>
      </h1>
      <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-500 dark:text-slate-400">
        Ready to build something amazing? Let's get started. Generate a new project kit from your idea or view your saved projects.
      </p>
      <div className="mt-10 flex justify-center gap-4">
        <button
          onClick={() => onNavigate('create')}
          className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md shadow-lg text-white bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500 focus:ring-offset-slate-50 dark:focus:ring-offset-slate-900 transition-all transform hover:scale-105"
        >
          Create New Project Kit
        </button>
        <button
          onClick={() => onNavigate('projects')}
          className="inline-flex items-center justify-center px-8 py-4 border border-slate-300 dark:border-slate-700 text-base font-medium rounded-md shadow-sm text-slate-700 bg-white dark:text-slate-200 dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500 focus:ring-offset-slate-50 dark:focus:ring-offset-slate-900 transition-all"
        >
          View My Projects
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
