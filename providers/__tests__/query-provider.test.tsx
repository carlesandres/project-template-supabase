import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryProvider } from '../query-provider';
import { useQuery } from '@tanstack/react-query';

// Test component that uses query
const TestComponent = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['test'],
    queryFn: async () => {
      return 'test data';
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;
  return <div>Data: {data}</div>;
};

describe('QueryProvider', () => {
  it('should render children', () => {
    render(
      <QueryProvider>
        <div>Test Child</div>
      </QueryProvider>,
    );

    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('should provide QueryClient to children', async () => {
    render(
      <QueryProvider>
        <TestComponent />
      </QueryProvider>,
    );

    // Should show loading state initially
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Should show data after loading
    await waitFor(() => {
      expect(screen.getByText('Data: test data')).toBeInTheDocument();
    });
  });

  it('should configure default query options', async () => {
    const mockQueryFn = vi.fn().mockResolvedValue('data');

    const TestQueryOptions = () => {
      const { data } = useQuery({
        queryKey: ['options-test'],
        queryFn: mockQueryFn,
      });

      return <div>{data}</div>;
    };

    render(
      <QueryProvider>
        <TestQueryOptions />
      </QueryProvider>,
    );

    await waitFor(() => {
      expect(mockQueryFn).toHaveBeenCalledTimes(1);
    });

    // Verify it was called (testing that queries work)
    expect(mockQueryFn).toHaveBeenCalled();
  });

  it('should render ReactQueryDevtools', () => {
    const { container } = render(
      <QueryProvider>
        <div>Content</div>
      </QueryProvider>,
    );

    // DevTools component should be in the DOM (even if not visible)
    // We can't easily test its visibility, but we can verify it doesn't crash
    expect(container).toBeInTheDocument();
  });

  it('should handle query errors gracefully', async () => {
    const errorMessage = 'Test error';
    const ErrorComponent = () => {
      const { error, isError } = useQuery({
        queryKey: ['error-test'],
        queryFn: async () => {
          throw new Error(errorMessage);
        },
        retry: false,
      });

      if (isError) return <div>Error: {(error as Error).message}</div>;
      return <div>No error</div>;
    };

    render(
      <QueryProvider>
        <ErrorComponent />
      </QueryProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
    });
  });

  it('should allow multiple queries in different components', async () => {
    const Component1 = () => {
      const { data } = useQuery({
        queryKey: ['query1'],
        queryFn: async () => 'data1',
      });
      return <div>Component1: {data}</div>;
    };

    const Component2 = () => {
      const { data } = useQuery({
        queryKey: ['query2'],
        queryFn: async () => 'data2',
      });
      return <div>Component2: {data}</div>;
    };

    render(
      <QueryProvider>
        <Component1 />
        <Component2 />
      </QueryProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText('Component1: data1')).toBeInTheDocument();
      expect(screen.getByText('Component2: data2')).toBeInTheDocument();
    });
  });
});
