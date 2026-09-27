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
            backgroundColor: '#FFF8F5',
            fontFamily: "'Inter', sans-serif",
            padding: '2rem',
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: '400px' }}>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '2rem',
                color: '#4E342E',
                marginBottom: '1rem',
              }}
            >
              DIEV
            </h1>
            <p style={{ color: '#4E342E', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Something went wrong. Please try reloading the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                backgroundColor: '#C97B63',
                color: 'white',
                border: 'none',
                padding: '12px 32px',
                fontSize: '0.875rem',
                fontWeight: 500,
                letterSpacing: '0.05em',
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
