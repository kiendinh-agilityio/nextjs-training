jest.mock('@/lib/auth', () => ({
  handlers: {
    GET: jest.fn(),
    POST: jest.fn(),
  },
}));

import { handlers } from '@/lib/auth';
import { GET, POST } from './route';
import { NextRequest } from 'next/server';

describe('Auth Route Handlers', () => {
  it('should export GET and POST handlers from auth module', () => {
    expect(GET).toBe(handlers.GET);
    expect(POST).toBe(handlers.POST);
  });

  it('should call GET handler correctly', async () => {
    const req = { method: 'GET' } as unknown as NextRequest;
    const mockResponse = { ok: true } as Response;
    (handlers.GET as jest.Mock).mockResolvedValue(mockResponse);
    const result = await GET(req);
    expect(handlers.GET).toHaveBeenCalledWith(req);
    expect(result).toBe(mockResponse);
  });

  it('should call POST handler correctly', async () => {
    const req = { method: 'POST' } as unknown as NextRequest;
    const mockResponse = { ok: true } as Response;
    (handlers.POST as jest.Mock).mockResolvedValue(mockResponse);
    const result = await POST(req);
    expect(handlers.POST).toHaveBeenCalledWith(req);
    expect(result).toBe(mockResponse);
  });
});
