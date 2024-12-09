'use client';

import ClientProvider from './ClientProvider';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return <ClientProvider>{children}</ClientProvider>;
}
