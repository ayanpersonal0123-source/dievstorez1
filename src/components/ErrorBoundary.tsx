import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('DIEV Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#FFFFFF',
            fontFamily: "'Inter', sans-serif",
            padding: '2rem',
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: '400px' }}>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '2.5rem',
                color: '#1A1A1A',
                marginBottom: '1.5rem',
                letterSpacing: '0.1em',
              }}
            >
              DIEV
            </h1>
            <p style={{ color: '#666', marginBottom: '2rem', lineHeight: 1.7, fontSize: '1rem' }}>
              Something went wrong. Please try reloading the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                backgroundColor: '#1A1A1A',
                color: '#FFFFFF',
                border: 'none',
                padding: '14px 40px',
                fontSize: '0.8rem',
                fontWeight: 500,
                letterSpacing: '0.15em',
                cursor: 'pointer',
                textTransform: 'uppercase',
              }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
