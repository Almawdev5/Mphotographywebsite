import { ReactNode, FC } from 'react';
import { DashboardNav } from './DashboardNav';

interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayout: FC<AdminLayoutProps> = ({ children }) => (
  <div className="flex min-h-screen bg-[--color-black] text-[--color-white]">
    <aside className="p-6"><DashboardNav /></aside>
    <main className="flex-1 p-8">{children}</main>
  </div>
);
