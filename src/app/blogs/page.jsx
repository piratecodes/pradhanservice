import React from 'react';
import BlogClientGrid from '@/components/blogs/BlogClientGrid';

export const metadata = {
  title: "Blogs & Insights",
  description: "Read our latest articles, moving tips, and company news to help you plan your next relocation smoothly.",
};
export const revalidate = 300;
export default async function BlogsPage() {
  let blogs = [];
  let categories = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`);
    const data = await res.json();
    if (data.success && data.data?.blogs) {
      blogs = data.data.blogs.filter(b => b.isPublished);
    }

    // Extract unique categories from published blogs
    categories = [...new Set(blogs.map(b => b.category))].filter(Boolean);
  } catch (err) {
    console.error("Failed to fetch blogs", err);
  }

  return (
    <main className="min-h-screen pb-12">
      <div className="py-8 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-black mb-4 tracking-tight">Our Blog & Insights</h1>
          <p className="text-lg text-gray-300">Expert advice, moving tips, and the latest news from Pradhan Packers and Movers.</p>
        </div>
      </div>

      <BlogClientGrid initialBlogs={blogs} categories={categories} />
    </main>
  );
}
