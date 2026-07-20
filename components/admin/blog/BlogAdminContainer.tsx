"use client";
import { FC, useState } from 'react';
import { BlogList } from './BlogList';
import { BlogForm } from './BlogForm';

export const BlogAdminContainer: FC = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <section>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Blog Posts</h2>
        <button
          className="bg-[--color-gold] text-[--color-black] font-semibold px-6 py-2 rounded hover:bg-yellow-400"
          onClick={() => setShowForm((v) => !v)}
        >
          {showForm ? 'Close' : 'New Post'}
        </button>
      </div>
      {showForm && <BlogForm />}
      <BlogList />
    </section>
  );
}
