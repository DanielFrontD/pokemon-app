'use client';

import { Component, ReactNode } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: string;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, retry: () => void) => ReactNode;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
      errorInfo: error.stack
    };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // Log error to monitoring service in production
    console.error('Error caught by boundary:', error, errorInfo);
  }

  retry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.retry);
      }

      const isNetworkError = this.state.error.message.includes('fetch') ||
                            this.state.error.message.includes('network');

      return (
        <div className="min-h-screen bg-grayscale-background flex items-center justify-center p-8">
          <div className="bg-white rounded-lg shadow-drop-6 p-8 max-w-md w-full text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                  <path d="M12 8v4M12 16h.01" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>

              <h2 className="text-headline text-grayscale-dark mb-2">
                {isNetworkError ? 'Connection Problem' : 'Something went wrong'}
              </h2>

              <p className="text-body-1 text-grayscale-medium mb-6">
                {isNetworkError
                  ? 'Please check your internet connection and try again.'
                  : 'An unexpected error occurred.'
                }
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={this.retry}
                className="w-full bg-primary text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity font-medium"
              >
                Try Again
              </button>

              <button
                onClick={() => window.location.href = '/pokemons'}
                className="w-full bg-grayscale-light text-grayscale-dark px-6 py-3 rounded-lg hover:bg-grayscale-medium transition-colors font-medium"
              >
                Go to Home
              </button>
            </div>

            {process.env.NODE_ENV === 'development' && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-body-2 text-grayscale-medium">
                  Error Details (Development)
                </summary>
                <pre className="mt-2 text-xs text-grayscale-dark bg-grayscale-background p-3 rounded overflow-auto max-h-32">
                  {this.state.error.message}
                  {this.state.errorInfo && `\n\n${this.state.errorInfo}`}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
