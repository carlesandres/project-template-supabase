import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  usePosts,
  usePost,
  useCreatePost,
  useUpdatePost,
  useDeletePost,
  postsKeys,
} from '../use-posts';
import { supabase } from 'utils/supabaseClient';
import React from 'react';

// Mock Supabase client
jest.mock('utils/supabaseClient', () => ({
  supabase: {
    from: jest.fn(),
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

describe('postsKeys', () => {
  it('should generate correct query keys', () => {
    expect(postsKeys.all).toEqual(['posts']);
    expect(postsKeys.lists()).toEqual(['posts', 'list']);
    expect(postsKeys.list('active')).toEqual(['posts', 'list', 'active']);
    expect(postsKeys.details()).toEqual(['posts', 'detail']);
    expect(postsKeys.detail('123')).toEqual(['posts', 'detail', '123']);
  });
});

describe('usePosts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch posts successfully', async () => {
    const mockPosts = [
      { id: '1', title: 'Post 1', created_at: '2024-01-01' },
      { id: '2', title: 'Post 2', created_at: '2024-01-02' },
    ];

    const mockSelect = jest.fn().mockReturnThis();
    const mockOrder = jest.fn().mockResolvedValue({
      data: mockPosts,
      error: null,
    });

    (supabase.from as jest.Mock).mockReturnValue({
      select: mockSelect,
      order: mockOrder,
    });

    const { result } = renderHook(() => usePosts(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockPosts);
    expect(supabase.from).toHaveBeenCalledWith('posts');
    expect(mockSelect).toHaveBeenCalledWith('*');
    expect(mockOrder).toHaveBeenCalledWith('created_at', { ascending: false });
  });

  it('should handle fetch error', async () => {
    const mockError = new Error('Database error');

    const mockSelect = jest.fn().mockReturnThis();
    const mockOrder = jest.fn().mockResolvedValue({
      data: null,
      error: mockError,
    });

    (supabase.from as jest.Mock).mockReturnValue({
      select: mockSelect,
      order: mockOrder,
    });

    const { result } = renderHook(() => usePosts(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toEqual(mockError);
  });
});

describe('usePost', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch a single post successfully', async () => {
    const mockPost = {
      id: '1',
      title: 'Post 1',
      content: 'Content',
      created_at: '2024-01-01',
    };

    const mockSelect = jest.fn().mockReturnThis();
    const mockEq = jest.fn().mockReturnThis();
    const mockSingle = jest.fn().mockResolvedValue({
      data: mockPost,
      error: null,
    });

    (supabase.from as jest.Mock).mockReturnValue({
      select: mockSelect,
      eq: mockEq,
      single: mockSingle,
    });

    const { result } = renderHook(() => usePost('1'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockPost);
    expect(mockEq).toHaveBeenCalledWith('id', '1');
    expect(mockSingle).toHaveBeenCalled();
  });

  it('should not run query when id is empty', () => {
    const { result } = renderHook(() => usePost(''), {
      wrapper: createWrapper(),
    });

    expect(result.current.fetchStatus).toBe('idle');
    expect(result.current.data).toBeUndefined();
  });
});

describe('useCreatePost', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a post successfully', async () => {
    const newPost = { title: 'New Post', content: 'Content' };
    const createdPost = { id: '1', ...newPost, created_at: '2024-01-01' };

    const mockInsert = jest.fn().mockReturnThis();
    const mockSelect = jest.fn().mockReturnThis();
    const mockSingle = jest.fn().mockResolvedValue({
      data: createdPost,
      error: null,
    });

    (supabase.from as jest.Mock).mockReturnValue({
      insert: mockInsert,
      select: mockSelect,
      single: mockSingle,
    });

    const { result } = renderHook(() => useCreatePost(), {
      wrapper: createWrapper(),
    });

    result.current.mutate(newPost);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockInsert).toHaveBeenCalledWith([newPost]);
    expect(result.current.data).toEqual(createdPost);
  });

  it('should handle create error', async () => {
    const newPost = { title: 'New Post' };
    const mockError = new Error('Insert failed');

    const mockInsert = jest.fn().mockReturnThis();
    const mockSelect = jest.fn().mockReturnThis();
    const mockSingle = jest.fn().mockResolvedValue({
      data: null,
      error: mockError,
    });

    (supabase.from as jest.Mock).mockReturnValue({
      insert: mockInsert,
      select: mockSelect,
      single: mockSingle,
    });

    const { result } = renderHook(() => useCreatePost(), {
      wrapper: createWrapper(),
    });

    result.current.mutate(newPost);

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toEqual(mockError);
  });
});

describe('useUpdatePost', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update a post successfully', async () => {
    const updateData = { id: '1', title: 'Updated Title' };
    const updatedPost = {
      id: '1',
      title: 'Updated Title',
      created_at: '2024-01-01',
    };

    const mockUpdate = jest.fn().mockReturnThis();
    const mockEq = jest.fn().mockReturnThis();
    const mockSelect = jest.fn().mockReturnThis();
    const mockSingle = jest.fn().mockResolvedValue({
      data: updatedPost,
      error: null,
    });

    (supabase.from as jest.Mock).mockReturnValue({
      update: mockUpdate,
      eq: mockEq,
      select: mockSelect,
      single: mockSingle,
    });

    const { result } = renderHook(() => useUpdatePost(), {
      wrapper: createWrapper(),
    });

    result.current.mutate(updateData);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockUpdate).toHaveBeenCalledWith({ title: 'Updated Title' });
    expect(mockEq).toHaveBeenCalledWith('id', '1');
    expect(result.current.data).toEqual(updatedPost);
  });
});

describe('useDeletePost', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should delete a post successfully', async () => {
    const mockDelete = jest.fn().mockReturnThis();
    const mockEq = jest.fn().mockResolvedValue({
      error: null,
    });

    (supabase.from as jest.Mock).mockReturnValue({
      delete: mockDelete,
      eq: mockEq,
    });

    const { result } = renderHook(() => useDeletePost(), {
      wrapper: createWrapper(),
    });

    result.current.mutate('1');

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockDelete).toHaveBeenCalled();
    expect(mockEq).toHaveBeenCalledWith('id', '1');
  });

  it('should handle delete error', async () => {
    const mockError = new Error('Delete failed');

    const mockDelete = jest.fn().mockReturnThis();
    const mockEq = jest.fn().mockResolvedValue({
      error: mockError,
    });

    (supabase.from as jest.Mock).mockReturnValue({
      delete: mockDelete,
      eq: mockEq,
    });

    const { result } = renderHook(() => useDeletePost(), {
      wrapper: createWrapper(),
    });

    result.current.mutate('1');

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toEqual(mockError);
  });
});
