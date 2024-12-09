'use client';

import ClientLayout from '@/components/ClientLayout';

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClientLayout>
      <div className="login-layout">
        <header>
          <h1>Header</h1>
        </header>
        <main>{children}</main>
        {/* <footer>
          <p>© 2024 My App</p>
        </footer> */}
      </div>
    </ClientLayout>
  );
}
