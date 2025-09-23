import React from 'react';
import type { ProjectKit } from '../types';

interface ProjectListProps {
  projects: ProjectKit[];
  onViewProject: (kit: ProjectKit) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, onViewProject }) => {
  if (projects.length === 0) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">No Projects Yet</h2>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          You haven't created any project kits. Get started by creating a new one!
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-6">
        My Project Kits
      </h1>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((kit) => (
          <li
            key={kit.id}
            className="col-span-1 bg-white/5 dark:bg-slate-800/50 rounded-lg shadow-lg divide-y divide-slate-200 dark:divide-slate-700 border border-black/10 dark:border-slate-700/50 overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-fuchsia-500/10"
          >
            <div className="w-full flex items-center justify-between p-6 space-x-6">
              <div className="flex-1 truncate">
                <div className="flex items-center space-x-3">
                  <h3 className="text-slate-900 dark:text-slate-100 text-lg font-medium truncate">{kit.projectName}</h3>
                </div>
                <p className="mt-1 text-slate-500 dark:text-slate-400 text-sm truncate">{kit.description}</p>
                 <span className={`mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900/50 dark:text-fuchsia-300`}>
                  {kit.skillLevel}
                </span>
              </div>
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-slate-200 dark:divide-slate-700">
                <div className="w-0 flex-1 flex">
                  <button
                    onClick={() => onViewProject(kit)}
                    className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-slate-700 dark:text-slate-300 font-medium border border-transparent rounded-bl-lg hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    View Project
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
