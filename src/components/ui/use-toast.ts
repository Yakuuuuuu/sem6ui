import React, { useState, useCallback } from 'react';

interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

let toasts: Toast[] = [];
let listeners: Array<(toasts: Toast[]) => void> = [];

const addToast = (toast: Omit<Toast, 'id'>) => {
  const id = Math.random().toString(36).substr(2, 9);
  const newToast = { ...toast, id };
  toasts = [...toasts, newToast];
  listeners.forEach(listener => listener(toasts));
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    toasts = toasts.filter(t => t.id !== id);
    listeners.forEach(listener => listener(toasts));
  }, 5000);
};

export const useToast = () => {
  const [currentToasts, setCurrentToasts] = useState<Toast[]>(toasts);

  const subscribe = useCallback((listener: (toasts: Toast[]) => void) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  }, []);

  React.useEffect(() => {
    const unsubscribe = subscribe(setCurrentToasts);
    return unsubscribe;
  }, [subscribe]);

  const toast = useCallback((toast: Omit<Toast, 'id'>) => {
    addToast(toast);
  }, []);

  return { toast, toasts: currentToasts };
};

export { useToast as toast };
