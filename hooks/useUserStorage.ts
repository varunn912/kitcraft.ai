
import { useState, useEffect, useCallback } from 'react';
import type { ProjectKit, User, Material } from '../types';

export const useUserStorage = (user: User | null) => {
  const [projects, setProjects] = useState<ProjectKit[]>([]);
  const [cart, setCart] = useState<Material[]>([]);
  const [isStorageLoading, setIsStorageLoading] = useState(true);

  const getStorageKey = useCallback((type: 'projects' | 'cart') => {
    if (!user) return null;
    return `kitcraft_${type}_${user.id}`;
  }, [user]);

  useEffect(() => {
    setIsStorageLoading(true);
    const projectsKey = getStorageKey('projects');
    const cartKey = getStorageKey('cart');
    
    if (projectsKey) {
      try {
        const storedProjects = localStorage.getItem(projectsKey);
        setProjects(storedProjects ? JSON.parse(storedProjects) : []);
      } catch (error) {
        console.error("Failed to load projects from storage", error);
        setProjects([]);
      }
    } else {
      setProjects([]);
    }

    if (cartKey) {
        try {
            const storedCart = localStorage.getItem(cartKey);
            setCart(storedCart ? JSON.parse(storedCart) : []);
        } catch (error) {
            console.error("Failed to load cart from storage", error);
            setCart([]);
        }
    } else {
        setCart([]);
    }

    setIsStorageLoading(false);
  }, [getStorageKey]);

  const saveProjects = useCallback((updatedProjects: ProjectKit[]) => {
    const storageKey = getStorageKey('projects');
    if (storageKey) {
      try {
        setProjects(updatedProjects);
        localStorage.setItem(storageKey, JSON.stringify(updatedProjects));
      } catch (error) {
        console.error("Failed to save projects to storage", error);
      }
    }
  }, [getStorageKey]);
  
  const saveCart = useCallback((updatedCart: Material[]) => {
    const storageKey = getStorageKey('cart');
    if (storageKey) {
        try {
            setCart(updatedCart);
            localStorage.setItem(storageKey, JSON.stringify(updatedCart));
        } catch (error) {
            console.error("Failed to save cart to storage", error);
        }
    }
  }, [getStorageKey]);

  const addProject = (newProject: ProjectKit) => {
    saveProjects([newProject, ...projects]);
  };

  const addMaterialsToCart = (materials: Material[]) => {
    // A simple implementation: adds all materials, preventing exact duplicates
    const newCart = [...cart];
    materials.forEach(material => {
      // Basic check to avoid adding the exact same item from the same kit again
      if (!newCart.some(item => item.name === material.name && item.buyLink === material.buyLink)) {
        newCart.push(material);
      }
    });
    saveCart(newCart);
  };

  const clearCart = () => {
    saveCart([]);
  };

  return { projects, addProject, isStorageLoading, cart, addMaterialsToCart, clearCart };
};