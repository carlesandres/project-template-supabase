import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  useSession,
  useUser,
  useSignIn,
  useSignUp,
  useSignOut,
  authKeys,
} from '../use-auth';
import { supabase } from 'utils/supabaseClient';
import React from 'react';

// Mock Supabase client
jest.mock('utils/supabaseClient', () => ({
  supabase: {
    auth: {
      getSession: jest.fn(),
      getUser: jest.fn(),
      signInWithPassword: jest.fn(),
      signUp: jest.fn(),
      signOut: jest.fn(),
    },
  },
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  Wrapper.displayName = 'TestWrapper';
  return Wrapper;
};

describe('authKeys', () => {
  it('should generate correct query keys', () => {
    expect(authKeys.session).toEqual(['auth', 'session']);
    expect(authKeys.user).toEqual(['auth', 'user']);
  });
});

describe('useSession', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch session successfully', async () => {
    const mockSession = {
      access_token: 'token',
      user: { id: '1', email: 'test@example.com' },
    };

    (supabase.auth.getSession as jest.Mock).mockResolvedValue({
      data: { session: mockSession },
      error: null,
    });

    const { result } = renderHook(() => useSession(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockSession);
    expect(supabase.auth.getSession).toHaveBeenCalled();
  });

  it('should handle null session', async () => {
    (supabase.auth.getSession as jest.Mock).mockResolvedValue({
      data: { session: null },
      error: null,
    });

    const { result } = renderHook(() => useSession(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toBeNull();
  });

  it('should handle session fetch error', async () => {
    const mockError = new Error('Session error');

    (supabase.auth.getSession as jest.Mock).mockResolvedValue({
      data: { session: null },
      error: mockError,
    });

    const { result } = renderHook(() => useSession(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toEqual(mockError);
  });
});

describe('useUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch user successfully', async () => {
    const mockUser = { id: '1', email: 'test@example.com' };

    (supabase.auth.getUser as jest.Mock).mockResolvedValue({
      data: { user: mockUser },
      error: null,
    });

    const { result } = renderHook(() => useUser(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockUser);
    expect(supabase.auth.getUser).toHaveBeenCalled();
  });

  it('should handle null user', async () => {
    (supabase.auth.getUser as jest.Mock).mockResolvedValue({
      data: { user: null },
      error: null,
    });

    const { result } = renderHook(() => useUser(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toBeNull();
  });
});

describe('useSignIn', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should sign in successfully', async () => {
    const credentials = { email: 'test@example.com', password: 'password123' };
    const mockSession = {
      access_token: 'token',
      user: { id: '1', email: credentials.email },
    };

    (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({
      data: { session: mockSession },
      error: null,
    });

    const { result } = renderHook(() => useSignIn(), {
      wrapper: createWrapper(),
    });

    result.current.mutate(credentials);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith(credentials);
    expect(result.current.data).toEqual(mockSession);
  });

  it('should handle sign in error', async () => {
    const credentials = { email: 'test@example.com', password: 'wrong' };
    const mockError = new Error('Invalid credentials');

    (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({
      data: { session: null },
      error: mockError,
    });

    const { result } = renderHook(() => useSignIn(), {
      wrapper: createWrapper(),
    });

    result.current.mutate(credentials);

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toEqual(mockError);
  });

  it('should throw error when no session returned', async () => {
    const credentials = { email: 'test@example.com', password: 'password' };

    (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({
      data: { session: null },
      error: null,
    });

    const { result } = renderHook(() => useSignIn(), {
      wrapper: createWrapper(),
    });

    result.current.mutate(credentials);

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect((result.current.error as Error).message).toBe('No session returned');
  });
});

describe('useSignUp', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should sign up successfully', async () => {
    const credentials = { email: 'new@example.com', password: 'password123' };
    const mockSession = {
      access_token: 'token',
      user: { id: '1', email: credentials.email },
    };

    (supabase.auth.signUp as jest.Mock).mockResolvedValue({
      data: { session: mockSession },
      error: null,
    });

    const { result } = renderHook(() => useSignUp(), {
      wrapper: createWrapper(),
    });

    result.current.mutate(credentials);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(supabase.auth.signUp).toHaveBeenCalledWith(credentials);
    expect(result.current.data).toEqual(mockSession);
  });

  it('should handle sign up error', async () => {
    const credentials = { email: 'existing@example.com', password: 'password' };
    const mockError = new Error('Email already exists');

    (supabase.auth.signUp as jest.Mock).mockResolvedValue({
      data: { session: null },
      error: mockError,
    });

    const { result } = renderHook(() => useSignUp(), {
      wrapper: createWrapper(),
    });

    result.current.mutate(credentials);

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toEqual(mockError);
  });
});

describe('useSignOut', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should sign out successfully', async () => {
    (supabase.auth.signOut as jest.Mock).mockResolvedValue({
      error: null,
    });

    const { result } = renderHook(() => useSignOut(), {
      wrapper: createWrapper(),
    });

    result.current.mutate();

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(supabase.auth.signOut).toHaveBeenCalled();
  });

  it('should handle sign out error', async () => {
    const mockError = new Error('Sign out failed');

    (supabase.auth.signOut as jest.Mock).mockResolvedValue({
      error: mockError,
    });

    const { result } = renderHook(() => useSignOut(), {
      wrapper: createWrapper(),
    });

    result.current.mutate();

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toEqual(mockError);
  });
});
