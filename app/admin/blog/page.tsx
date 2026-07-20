import { AdminLayout } from '../../../components/admin/AdminLayout';
import { BlogAdminContainer } from '../../../components/admin/blog/BlogAdminContainer';

export const metadata = { title: 'Admin Blog' };

export function AdminBlogPage() {
  return (
    <AdminLayout>
      <BlogAdminContainer />
    </AdminLayout>
  );
}