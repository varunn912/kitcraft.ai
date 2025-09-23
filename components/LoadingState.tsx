import React from 'react';
import { CubeLoader, TextLoader } from './loaders';

const loadingMessages = [
    "Contacting our AI architect...",
    "Drafting your project blueprints...",
    "Sourcing the best materials...",
    "Calibrating the workshop tools...",
    "Writing your step-by-step guide...",
    "Adding some creative flair...",
    "Almost there, just polishing the details..."
];

const LoadingState: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center p-8">
            <CubeLoader />
            <h2 className="mt-8 text-2xl font-bold text-slate-100">
                Crafting Your Project Kit
            </h2>
            <div className="mt-4 text-slate-400 h-6">
                <TextLoader messages={loadingMessages} />
            </div>
        </div>
    );
};

export default LoadingState;
