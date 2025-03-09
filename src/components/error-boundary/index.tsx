import React from "react";

type ErrorBoundaryProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode | ((error: Error | null) => React.ReactNode);
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught in ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const { error } = this.state;
      const { fallback } = this.props;

      if (typeof fallback === "function") {
        return fallback(error);
      }

      return (
        fallback || (
          <h1>
            {`Something went wrong: ${error ? error.message : "Unknown error"}`}
          </h1>
        )
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
