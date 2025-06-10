import { BLOG_DATA } from '@/app/lib/blog-data';
import { notFound } from 'next/navigation';
import Link from 'next/link';

// Generate static params for all posts
export const generateStaticParams = async () => {
  return BLOG_DATA.map((post) => ({
    slug: post.slug,
  }));
};

const BlogPost = ({ params }: { params: { slug: string } }) => {
  const post = BLOG_DATA.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className='max-w-4xl mx-auto py-8 px-4'>
      <Link
        href='/blog'
        className='text-blue-600 hover:underline mb-8 inline-block'
      >
        ← Back to Blog
      </Link>
      <article className='prose lg:prose-xl'>
        <h1 className='text-4xl font-bold mb-4'>{post.title}</h1>
        <p className='text-gray-600 mb-8'>{post.date}</p>
        <div className='text-gray-700'>{post.content}</div>
      </article>
    </div>
  );
};

export default BlogPost;
