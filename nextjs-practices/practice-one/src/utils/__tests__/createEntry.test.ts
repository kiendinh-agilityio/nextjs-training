import { createEntry } from '../createEntry';
import { MetadataRoute } from 'next';

describe('createEntry', () => {
  const url = 'https://example.com/page';
  const priority = 0.8;

  it('should return a valid sitemap entry with default changeFrequency', () => {
    const result = createEntry(url, priority);

    expect(result.url).toBe(url);
    expect(result.priority).toBe(priority);
    expect(result.changeFrequency).toBe('weekly');
    expect(result.lastModified).toBeInstanceOf(Date);
  });

  it('should return a sitemap entry with specified changeFrequency', () => {
    const changeFrequency: MetadataRoute.Sitemap[0]['changeFrequency'] =
      'daily';
    const result = createEntry(url, priority, changeFrequency);

    expect(result.changeFrequency).toBe('daily');
  });

  it('should generate a new date for lastModified', () => {
    const before = new Date();
    const result = createEntry(url, priority);
    const after = new Date();

    expect(result.lastModified.getTime()).toBeGreaterThanOrEqual(
      before.getTime(),
    );

    expect(result.lastModified.getTime()).toBeLessThanOrEqual(after.getTime());
  });
});
