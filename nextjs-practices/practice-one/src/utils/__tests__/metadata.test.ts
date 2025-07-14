import { createMetadata } from '../metadata';

// Inline type definition for OGImage
type OGImage = {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
};

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
});
