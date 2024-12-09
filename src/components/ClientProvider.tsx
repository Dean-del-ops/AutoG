'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store';
import { ToastProvider } from './ToastContext';

export default function ClientProvider({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
       <ToastProvider>
        {children}
        </ToastProvider>
      </PersistGate>
    </Provider>
  );
}
