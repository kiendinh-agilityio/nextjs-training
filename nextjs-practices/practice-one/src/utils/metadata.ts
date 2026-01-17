import type { Metadata } from 'next';
import { BASE_URL } from '@/constants/url';

type OpenGraphType = 'website' | 'profile';

interface MetaOptions {
  title?: string;
  description?: string;
  keywords?: string[];
  url?: string;
  imageAlt?: string;
  type?: OpenGraphType;
  image?: string;
}

const defaultMeta = {
  siteName: 'Food Delivery Website',
  baseUrl: BASE_URL,
  author: 'Kien Dinh',
  twitter: '@order.uk',
  image: '/meta.png',
  twitterImage: '/meta.png',
  locale: 'en_US',
};

/**
 * Creates metadata for a page.
 * @param options Metadata options to customize the generated metadata.
 * @returns - Metadata object for the page.
 */
export function createMetadata(options: MetaOptions = {}): Metadata {
  const title = options.title ? options.title : defaultMeta.siteName;
  const description =
    options.description ||
    'Welcome to Order.uk – your go-to platform for discovering top restaurants, trending products, and exclusive food deals. Browse, order, and enjoy hassle-free delivery.';
  const url = options.url || defaultMeta.baseUrl;

  let imageUrl: string;

  if (options.image) {
    if (options.image.startsWith('http')) {
      imageUrl = options.image;
    } else {
      imageUrl =
        defaultMeta.baseUrl +
        (options.image.startsWith('/') ? options.image : '/' + options.image);
    }
  } else {
    imageUrl =
      defaultMeta.baseUrl +
      (defaultMeta.image.startsWith('/')
        ? defaultMeta.image
        : '/' + defaultMeta.image);
  }

  const twitterImageUrl = imageUrl;
  const type: OpenGraphType = options.type || 'website';

  return {
    title,
    description,
    keywords: options.keywords || [
      'Food Delivery Website',
      'Restaurants',
      'Home',
      'Track Order',
    ],
    authors: [{ name: defaultMeta.author }],
    creator: defaultMeta.author,
    robots: {
      index: true,
      follow: true,
      nocache: false,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: defaultMeta.siteName,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: options.imageAlt || defaultMeta.siteName,
        },
      ],
      locale: defaultMeta.locale,
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [twitterImageUrl],
      site: defaultMeta.twitter,
      creator: defaultMeta.twitter,
    },
    metadataBase: new URL(defaultMeta.baseUrl),
  };
}
