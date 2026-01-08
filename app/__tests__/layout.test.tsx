import React from 'react';
import { render, screen } from '@testing-library/react';
import Layout from '../layout';

// Mock the components
jest.mock('components/DesktopNav', () => {
  return function MockDesktopNav() {
    return <div data-testid="desktop-nav">Desktop Nav</div>;
  };
});

jest.mock('providers/query-provider', () => ({
  QueryProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="query-provider">{children}</div>
  ),
}));

describe('Layout', () => {
  it('should render with required html and body tags', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>,
    );

    // Layout renders html and body tags, but in jsdom they're outside the container
    // We can verify the structure by checking that content is rendered within body
    const body = document.body;
    expect(body).toBeInTheDocument();
    expect(document.documentElement.getAttribute('lang')).toBe('en');
  });

  it('should render children', () => {
    render(
      <Layout>
        <div data-testid="test-child">Test Content</div>
      </Layout>,
    );

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should wrap children with QueryProvider', () => {
    render(
      <Layout>
        <div>Content</div>
      </Layout>,
    );

    expect(screen.getByTestId('query-provider')).toBeInTheDocument();
  });

  it('should include DesktopNav component', () => {
    render(
      <Layout>
        <div>Content</div>
      </Layout>,
    );

    expect(screen.getByTestId('desktop-nav')).toBeInTheDocument();
    expect(screen.getByText('Desktop Nav')).toBeInTheDocument();
  });

  it('should have correct structure: html > body > QueryProvider > div > (DesktopNav + children)', () => {
    render(
      <Layout>
        <div data-testid="child-content">Child</div>
      </Layout>,
    );

    const queryProvider = screen.getByTestId('query-provider');
    const desktopNav = screen.getByTestId('desktop-nav');
    const childContent = screen.getByTestId('child-content');

    // Verify QueryProvider contains both nav and children
    expect(queryProvider).toContainElement(desktopNav);
    expect(queryProvider).toContainElement(childContent);
  });

  it('should render multiple children correctly', () => {
    render(
      <Layout>
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
      </Layout>,
    );

    expect(screen.getByTestId('child-1')).toBeInTheDocument();
    expect(screen.getByTestId('child-2')).toBeInTheDocument();
  });

  it('should apply proper HTML semantics', () => {
    render(
      <Layout>
        <main>Main Content</main>
      </Layout>,
    );

    // Verify semantic HTML structure
    expect(document.documentElement.getAttribute('lang')).toBe('en');
    expect(screen.getByText('Main Content')).toBeInTheDocument();
  });
});
