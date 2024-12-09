import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Toast {
  id: number;
  type: 'success' | 'error';
  message: string;
}

interface ToastContextProps {
  showToast: (type: 'success' | 'error', message: string) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (type: 'success' | 'error', message: string) => {
    const id = new Date().getTime();
    setToasts((prev) => [...prev, { id, type, message }]);

    // Automatically remove the toast after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 9999 }}>
        {toasts.map((toast) => (
          <div
            key={toast.id}
            style={{
              marginBottom: '10px',
              padding: '10px 20px',
              borderRadius: '5px',
              color: '#fff',
              backgroundColor: toast.type === 'success' ? '#4caf50' : '#f44336',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              animation: 'fadeInOut 3s',
            }}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
