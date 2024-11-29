import { Component } from 'react';
import { motion } from 'framer-motion';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Log error to your preferred logging service
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12"
        >
          <div className="max-w-md w-full space-y-8 text-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Oops! Something went wrong</h2>
              <p className="mt-2 text-gray-600">
                We're sorry for the inconvenience. Please try refreshing the page.
              </p>
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <pre className="mt-4 p-4 bg-red-50 rounded-lg text-left text-sm text-red-600 overflow-auto">
                  {this.state.error.toString()}
                </pre>
              )}
            </div>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Refresh Page
            </button>
          </div>
        </motion.div>
      );
    }

    return this.props.children;
  }
}