import React from 'react';

interface LogoProps {
  size?: 'small' | 'large';
}

const Logo: React.FC<LogoProps> = ({ size = 'large' }) => {
  const isLarge = size === 'large';
  return (
    <div className={`flex items-center justify-center ${isLarge ? 'space-x-3' : 'space-x-2'}`}>
      <svg 
        className={`${isLarge ? 'w-10 h-10' : 'w-8 h-8'} text-fuchsia-500`}
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z" />
        <path opacity="0.6" d="M12 13.5l-10-5v6l10 5 10-5v-6l-10 5z" />
      </svg>
      <h1 className={`${isLarge ? 'text-4xl' : 'text-2xl'} font-bold tracking-tighter text-slate-800 dark:text-slate-100 ${!isLarge ? 'hidden sm:block' : ''}`}>
        KitCraft<span className="text-fuchsia-500">.AI</span>
      </h1>
    </div>
  );
};

export default Logo;
