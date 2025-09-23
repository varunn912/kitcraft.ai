import React from 'react';
import type { Material } from '../types';

interface CartViewProps {
  cart: Material[];
  onClearCart: () => void;
}

const CartView: React.FC<CartViewProps> = ({ cart, onClearCart }) => {
  if (cart.length === 0) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Your Shopping Cart is Empty</h2>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Add materials from a project kit to see them here.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Shopping Cart
        </h1>
        <button
          onClick={onClearCart}
          className="px-4 py-2 border border-red-500 text-sm font-medium rounded-md text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
        >
          Clear Cart
        </button>
      </div>
      <div className="bg-white/5 dark:bg-slate-800/50 backdrop-blur-sm border border-black/10 dark:border-slate-700/50 rounded-2xl shadow-xl overflow-hidden">
        <ul className="divide-y divide-slate-200 dark:divide-slate-700">
          {cart.map((material, index) => (
            <li key={index} className="p-4 sm:p-6 flex items-center justify-between">
              <div>
                <p className="text-md font-medium text-slate-900 dark:text-slate-100">{material.name}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{material.quantity} - Est. {material.estimatedPrice}</p>
              </div>
              <a
                href={material.buyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500"
              >
                Find on Amazon.in
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CartView;
