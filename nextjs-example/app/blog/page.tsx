import Link from "next/link";
import { BLOG_DATA } from "@/app/lib/blog-data";
import SideNav from "@/app/ui/dashboard/sidenav";

const BlogList = () => (
  <div className="flex h-screen">
    <div className="w-full flex-none md:w-64">
      <SideNav />
    </div>
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
      <div className="space-y-6">
        {BLOG_DATA.map((post) => (
          <article
            key={post.id}
            className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-2xl font-semibold mb-2 hover:text-blue-600">
                {post.title}
              </h2>
            </Link>
            <p className="text-gray-600 mb-2">{post.date}</p>
            <p className="text-gray-700">{post.content.substring(0, 150)}...</p>
          </article>
        ))}
      </div>
    </div>
  </div>
);

export default BlogList;
