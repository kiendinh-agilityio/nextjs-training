import Link from "next/link";

const NotFound = () => (
  <div className="max-w-4xl mx-auto py-16 px-4 text-center">
    <h2 className="text-3xl font-bold mb-4">Post Not Found</h2>
    <p className="text-gray-600 mb-8">
      Sorry, the blog post you're looking for doesn't exist.
    </p>
    <Link
      href="/blog"
      className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
    >
      Back to Blog
    </Link>
  </div>
);

export default NotFound;
