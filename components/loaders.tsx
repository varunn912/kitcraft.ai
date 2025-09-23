import React, { useState, useEffect } from 'react';
import Logo from './Logo';

export const CubeLoader: React.FC = () => {
    return (
        <div className="sk-cube-grid">
            <div className="sk-cube sk-cube1"></div>
            <div className="sk-cube sk-cube2"></div>
            <div className="sk-cube sk-cube3"></div>
            <div className="sk-cube sk-cube4"></div>
            <div className="sk-cube sk-cube5"></div>
            <div className="sk-cube sk-cube6"></div>
            <div className="sk-cube sk-cube7"></div>
            <div className="sk-cube sk-cube8"></div>
            <div className="sk-cube sk-cube9"></div>
        </div>
    );
};

export const TextLoader: React.FC<{ messages: string[] }> = ({ messages }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setIndex(prevIndex => (prevIndex + 1) % messages.length);
        }, 2500); // Change message every 2.5 seconds

        return () => clearInterval(intervalId);
    }, [messages.length]);

    return (
        <span className="transition-opacity duration-500 ease-in-out">
            {messages[index]}
        </span>
    );
};

export const FullPageLoader: React.FC<{message?: string}> = ({ message = 'Loading...' }) => {
    return (
        <div className="bg-slate-900 text-white min-h-screen flex flex-col items-center justify-center">
            <Logo />
            <div className="mt-8">
                <CubeLoader />
            </div>
            <p className="mt-8 text-slate-400">{message}</p>
        </div>
    );
};
