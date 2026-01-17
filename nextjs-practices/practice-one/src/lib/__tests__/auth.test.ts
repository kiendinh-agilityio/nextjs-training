let capturedConfig: unknown = null;

jest.mock('next-auth', () => ({
  __esModule: true,
  default: (config: unknown) => {
    capturedConfig = config;
    return {
      handlers: { GET: jest.fn(), POST: jest.fn() },
      signIn: jest.fn(),
      signOut: jest.fn(),
      auth: jest.fn((handler: unknown) => handler),
    };
  },
}));

jest.mock('next-auth/providers/credentials', () => ({
  __esModule: true,
  default: () => ({
    credentials: {
      email: { label: 'Email', type: 'email', placeholder: 'Enter your email' },
      password: {
        label: 'Password',
        type: 'password',
        placeholder: 'Enter your password',
      },
    },
    authorize: jest.fn(),
  }),
}));

let handlers: unknown, signIn: unknown, signOut: unknown, auth: unknown;

beforeAll(async () => {
  const authModule = await import('../auth');
  handlers = authModule.handlers;
  signIn = authModule.signIn;
  signOut = authModule.signOut;
  auth = authModule.auth;
});

const getConfig = (): unknown => capturedConfig;

describe('auth module exports', () => {
  describe('handlers', () => {
    it('should have GET and POST handlers', () => {
      expect(typeof (handlers as { GET: unknown; POST: unknown }).GET).toBe(
        'function',
      );
      expect(typeof (handlers as { GET: unknown; POST: unknown }).POST).toBe(
        'function',
      );
    });
  });

  describe('signIn', () => {
    it('should be a function', () => {
      expect(typeof signIn).toBe('function');
    });
  });

  describe('signOut', () => {
    it('should be a function', () => {
      expect(typeof signOut).toBe('function');
    });
  });

  describe('auth', () => {
    it('should be a function', () => {
      expect(typeof auth).toBe('function');
    });

    it('should wrap a middleware handler function without type error', () => {
      const handler = jest.fn();
      const wrapped = (auth as (h: unknown) => unknown)(handler);
      expect(wrapped).toBe(handler);
    });
  });

  describe('NextAuth config', () => {
    it('should have correct secret and providers', () => {
      const config = getConfig() as { secret: unknown; providers: unknown[] };

      expect(config).toBeTruthy();
      expect(config.secret).toBeDefined();
      expect(Array.isArray(config.providers)).toBe(true);
      expect(config.providers.length).toBeGreaterThan(0);
    });

    it('should have Credentials provider with authorize', () => {
      const config = getConfig() as { providers: unknown[] };
      const credentialsProvider = config.providers.find(
        (p: unknown) => (p as { credentials?: unknown }).credentials,
      );

      expect(credentialsProvider).toBeTruthy();
      expect(
        typeof (
          credentialsProvider as { authorize: (...args: unknown[]) => unknown }
        ).authorize,
      ).toBe('function');
    });

    it('should have pages.signIn set', () => {
      const config = getConfig() as { pages: { signIn: unknown } };

      expect(config.pages).toBeDefined();
      expect(config.pages.signIn).toBeDefined();
    });

    it('should have session config', () => {
      const config = getConfig() as {
        session: { strategy: string; maxAge: number };
      };

      expect(config.session).toBeDefined();
      expect(config.session.strategy).toBe('jwt');
      expect(typeof config.session.maxAge).toBe('number');
    });

    it('should have callbacks.session as a function', () => {
      const config = getConfig() as {
        callbacks: { session: (args: unknown) => Promise<unknown> };
      };

      expect(config.callbacks).toBeDefined();
      expect(typeof config.callbacks.session).toBe('function');
    });
  });

  describe('callbacks.session', () => {
    it('should merge user into token and session', async () => {
      const config = getConfig() as {
        callbacks: { session: (args: unknown) => Promise<unknown> };
      };
      const session = { user: { name: 'A' } };
      const token = {
        foo: 'bar',
        id: '1',
        email: 'a@a.com',
        name: 'A',
        emailVerified: null,
      };
      const result = await config.callbacks.session({ session, token });

      // Chỉ kiểm tra các trường thực sự được lưu vào session.user
      expect(session.user).toEqual({
        id: '1',
        email: 'a@a.com',
        name: 'A',
        emailVerified: null,
      });
      expect(result).toBe(session);
    });

    it('should return session if no user', async () => {
      const config = getConfig() as {
        callbacks: { session: (args: unknown) => Promise<unknown> };
      };
      const session = {};
      const token = { foo: 'bar' };
      const result = await config.callbacks.session({ session, token });

      expect(result).toBe(session);
    });
  });
});
