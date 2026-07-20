import Link from 'next/link';
import { FC } from 'react';

export const DashboardNav: FC = () => {
  return (
    <nav className="flex flex-col gap-4 p-4 bg-[--color-gray] text-[--color-white] rounded-md w-60">
      <Link href="/admin/dashboard" className="hover:text-[--color-gold] font-semibold">Dashboard Home</Link>
      <Link href="/admin/blog" className="hover:text-[--color-gold]">Blog Posts</Link>
      <Link href="/admin/photos" className="hover:text-[--color-gold]">Photos</Link>
      <Link href="/admin/services" className="hover:text-[--color-gold]">Services</Link>
      <Link href="/admin/appointments" className="hover:text-[--color-gold]">Appointments</Link>
      <Link href="/admin/contact" className="hover:text-[--color-gold]">Contact Info</Link>
    </nav>
  );
}
