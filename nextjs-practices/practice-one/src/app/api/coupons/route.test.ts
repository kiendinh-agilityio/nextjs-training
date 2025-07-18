import fs from 'fs';
import { GET } from './route';

jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn(),
  },
}));

jest.mock('path', () => ({
  join: jest.fn(() => '/mocked/path/coupons.json'),
}));

jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data) => ({
      json: () => data,
    })),
  },
}));

describe('GET', () => {
  it('should return coupons as JSON response', async () => {
    const mockCoupons = [
      { id: 1, code: 'ABC123', discount: 10 },
      { id: 2, code: 'XYZ789', discount: 20 },
    ];
    const mockFileContents = JSON.stringify(mockCoupons);
    (fs.promises.readFile as jest.Mock).mockResolvedValue(mockFileContents);

    const response = await GET();
    expect(response.json()).toEqual(mockCoupons);
  });
});
