import React, { Component, ErrorInfo, ReactNode } from "react";
import { Header } from "../../components/header/Header";
import "./ErrorBoundary.css";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error information here, if needed
    console.error(error, errorInfo);
  }

  static getDerivedStateFromError = (error) => {
    return { hasError: true };
  };
  render() {
    if (this.state.hasError) {
      // Fallback UI when there's an error
      return (
        <div>
          <div className="boundaryContainer">Something went wrong.</div>
        </div>
      );
    }

    return this.props.children;
  }
}
