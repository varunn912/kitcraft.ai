import React, { useState } from 'react';
import type { ProjectKit, Material, Tool } from '../types';
import InstructionsList from './InstructionsList';

interface ProjectKitDisplayProps {
  kit: ProjectKit;
  addMaterialsToCart: (materials: Material[]) => void;
}

const ProjectKitDisplay: React.FC<ProjectKitDisplayProps> = ({ kit, addMaterialsToCart }) => {
  const [activeTab, setActiveTab] = useState<'instructions' | 'materials' | 'tools'>('instructions');

  const renderContent = () => {
    switch (activeTab) {
      case 'instructions':
        return <InstructionsList instructions={kit.instructions} />;
      case 'materials':
        return <MaterialsList materials={kit.materials} />;
      case 'tools':
        return <ToolsList tools={kit.tools} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">{kit.projectName}</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-500 dark:text-slate-400">{kit.description}</p>
        <div className="mt-4 flex items-center justify-center gap-x-4 text-sm text-slate-500 dark:text-slate-400">
          <span>
            <strong>Skill Level:</strong> {kit.skillLevel}
          </span>
          <span>&bull;</span>
          <span>
            <strong>Est. Time:</strong> {kit.estimatedTime}
          </span>
        </div>
      </header>
      
      <div className="bg-white/5 dark:bg-slate-800/50 backdrop-blur-sm border border-black/10 dark:border-slate-700/50 rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8">
          <div className="flex justify-between items-center mb-6 border-b border-slate-300 dark:border-slate-700 pb-4">
              <nav className="flex space-x-4" aria-label="Tabs">
                  <TabButton name="instructions" activeTab={activeTab} setActiveTab={setActiveTab}>Instructions</TabButton>
                  <TabButton name="materials" activeTab={activeTab} setActiveTab={setActiveTab}>Materials</TabButton>
                  <TabButton name="tools" activeTab={activeTab} setActiveTab={setActiveTab}>Tools</TabButton>
              </nav>
              {activeTab === 'materials' && (
                  <button
                      onClick={() => addMaterialsToCart(kit.materials)}
                      className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500"
                  >
                      Add All to Cart
                  </button>
              )}
          </div>
          <div>
              {renderContent()}
          </div>
      </div>
    </div>
  );
};

const TabButton: React.FC<{name: 'instructions' | 'materials' | 'tools', activeTab: string, setActiveTab: (name: any) => void, children: React.ReactNode}> = ({ name, activeTab, setActiveTab, children }) => {
    const isActive = name === activeTab;
    return (
        <button
            onClick={() => setActiveTab(name)}
            className={`${
                isActive
                ? 'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/50 dark:text-fuchsia-200'
                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
            } px-3 py-2 font-medium text-sm rounded-md`}
        >
            {children}
        </button>
    )
};

const MaterialsList: React.FC<{materials: Material[]}> = ({ materials }) => (
    <ul className="divide-y divide-slate-200 dark:divide-slate-700">
        {materials.map((material, index) => (
            <li key={index} className="py-4 flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{material.name}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{material.quantity} - Est. {material.estimatedPrice}</p>
                </div>
                <a href={material.buyLink} target="_blank" rel="noopener noreferrer" className="ml-4 px-3 py-1 border border-transparent text-sm font-medium rounded-md text-fuchsia-700 bg-fuchsia-100 hover:bg-fuchsia-200 dark:text-fuchsia-300 dark:bg-fuchsia-900/50 dark:hover:bg-fuchsia-900/80">
                    Buy
                </a>
            </li>
        ))}
    </ul>
);

const ToolsList: React.FC<{tools: Tool[]}> = ({ tools }) => (
    <ul className="divide-y divide-slate-200 dark:divide-slate-700">
        {tools.map((tool, index) => (
            <li key={index} className="py-3">
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{tool.name}</p>
            </li>
        ))}
    </ul>
);

export default ProjectKitDisplay;
