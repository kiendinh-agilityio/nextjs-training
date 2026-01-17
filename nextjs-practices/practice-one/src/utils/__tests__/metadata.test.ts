import { createMetadata } from '../metadata';
import { BASE_URL } from '@/constants/url';

// Inline type definition for OGImage
type OGImage = {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
};

// Helper type guard for OGImage
function isOGImageArray(arr: unknown): arr is OGImage[] {
  return (
    Array.isArray(arr) &&
    typeof arr[0] === 'object' &&
    arr[0] !== null &&
    'url' in arr[0]
  );
}

describe('createMetadata', () => {
  it('should return default metadata when no options are provided', () => {
    const meta = createMetadata();
    expect(meta.title).toBe('Food Delivery Website');
    expect(meta.description).toBe(
      'Welcome to Order.uk – your go-to platform for discovering top restaurants, trending products, and exclusive food deals. Browse, order, and enjoy hassle-free delivery.',
    );
    expect(meta.openGraph?.siteName).toBe('Food Delivery Website');
  });

  it('should override metadata with provided options', () => {
    const meta = createMetadata({
      title: 'Test Title',
      description: 'Test Description',
      keywords: ['a', 'b'],
      url: 'https://test.com',
      imageAlt: 'Test Alt',
      type: 'website',
    });

    expect(meta.title).toBe('Test Title');
    expect(meta.description).toBe('Test Description');
    expect(meta.keywords).toEqual(['a', 'b']);
    expect(meta.openGraph?.title).toBe('Test Title');
    expect(meta.openGraph?.description).toBe('Test Description');
    expect(meta.openGraph?.url).toBe('https://test.com');

    const images = meta.openGraph?.images;

    if (Array.isArray(images)) {
      const firstImage = images[0] as OGImage;
      expect(firstImage.alt).toBe('Test Alt');
    } else {
      throw new Error('Expected images to be an array');
    }
  });

  it('should use absolute image url if image starts with http', () => {
    const meta = createMetadata({ image: 'http://example.com/image.png' });
    const images = meta.openGraph?.images;
    if (isOGImageArray(images)) {
      expect(images[0].url).toBe('http://example.com/image.png');
    } else {
      throw new Error('Expected OGImage[]');
    }
    const twitterImages = Array.isArray(meta.twitter?.images)
      ? meta.twitter.images
      : [];
    expect(twitterImages[0]).toBe('http://example.com/image.png');
  });

  it('should prepend baseUrl if image starts with /', () => {
    const meta = createMetadata({ image: '/custom.png' });
    const images = meta.openGraph?.images;
    if (isOGImageArray(images)) {
      expect(images[0].url).toBe(`${BASE_URL}/custom.png`);
    } else {
      throw new Error('Expected OGImage[]');
    }
  });

  it('should prepend baseUrl and slash if image does not start with /', () => {
    const meta = createMetadata({ image: 'custom.png' });
    const images = meta.openGraph?.images;
    if (isOGImageArray(images)) {
      expect(images[0].url).toBe(`${BASE_URL}/custom.png`);
    } else {
      throw new Error('Expected OGImage[]');
    }
  });

  it('should use default image if image is not provided', () => {
    const meta = createMetadata();
    const images = meta.openGraph?.images;
    if (isOGImageArray(images)) {
      expect(images[0].url).toBe(`${BASE_URL}/meta.png`);
    } else {
      throw new Error('Expected OGImage[]');
    }
  });

  it('should use default imageAlt if not provided', () => {
    const meta = createMetadata();
    const images = meta.openGraph?.images;
    if (isOGImageArray(images)) {
      expect(images[0].alt).toBe('Food Delivery Website');
    } else {
      throw new Error('Expected OGImage[]');
    }
  });

  it('should use provided imageAlt if given', () => {
    const meta = createMetadata({ imageAlt: 'Custom Alt' });
    const images = meta.openGraph?.images;
    if (isOGImageArray(images)) {
      expect(images[0].alt).toBe('Custom Alt');
    } else {
      throw new Error('Expected OGImage[]');
    }
  });

  it('should use type profile if provided', () => {
    const meta = createMetadata({ type: 'profile' });
    // openGraph is always an object with type field
    expect(
      meta.openGraph &&
        typeof meta.openGraph === 'object' &&
        'type' in meta.openGraph
        ? (meta.openGraph as { type: string }).type
        : undefined,
    ).toBe('profile');
  });

  it('should use default keywords if not provided', () => {
    const meta = createMetadata();
    expect(meta.keywords).toEqual([
      'Food Delivery Website',
      'Restaurants',
      'Home',
      'Track Order',
    ]);
  });

  it('should set authors, creator, robots, twitter, and metadataBase correctly', () => {
    const meta = createMetadata();
    expect(meta.authors).toEqual([{ name: 'Kien Dinh' }]);
    expect(meta.creator).toBe('Kien Dinh');
    expect(meta.robots).toEqual({ index: true, follow: true, nocache: false });
    const images = meta.openGraph?.images;
    let imageUrl = '';
    if (isOGImageArray(images)) {
      imageUrl = images[0].url;
    } else {
      throw new Error('Expected OGImage[]');
    }
    expect(meta.twitter).toMatchObject({
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [imageUrl],
      site: '@order.uk',
      creator: '@order.uk',
    });
    expect((meta.metadataBase as URL).href).toBe(`${BASE_URL}/`);
  });
});
