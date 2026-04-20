import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    if (import.meta.env.DEV) {
      console.error("ErrorBoundary caught:", error, info);
    }
  }

  handleReset = () => {
    this.setState({ error: null });
  };

  handleReload = () => {
    window.location.href = "/";
  };

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div className="min-h-screen bg-[#FAFAFA] font-sans text-slate-900 flex items-center justify-center px-6 py-20">
        <title>Something went wrong — Meka Consultants</title>

        <div className="max-w-2xl w-full">
          <div className="flex flex-wrap justify-between items-start gap-4 font-mono text-[10px] tracking-[0.25em] uppercase text-slate-400 mb-12">
            <span>Error · Unexpected Fault</span>
            <span>§ 500</span>
          </div>

          <p className="text-[#B38356] font-bold tracking-[0.3em] text-[10px] uppercase flex items-center gap-4 mb-6">
            <span className="w-8 h-px bg-[#B38356]" /> System Interrupt
          </p>

          <h1 className="font-serif tracking-tight leading-[0.95] text-5xl md:text-7xl mb-8">
            Something
            <span className="block text-[#B38356] italic font-light">
              broke.
            </span>
          </h1>

          <p className="max-w-xl text-slate-600 text-base md:text-lg leading-relaxed font-light mb-10">
            An unexpected error occurred while rendering this page. The issue
            has been logged. You can try again, or return to the homepage.
          </p>

          {import.meta.env.DEV && this.state.error?.message && (
            <pre className="mb-10 p-4 border border-slate-200 bg-white text-xs font-mono text-slate-700 overflow-auto max-h-60">
              {String(this.state.error.message)}
            </pre>
          )}

          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={this.handleReset}
              className="px-6 py-3 bg-slate-900 text-white text-xs tracking-[0.25em] uppercase font-bold hover:bg-[#B38356] transition-colors"
            >
              Try Again
            </button>
            <button
              type="button"
              onClick={this.handleReload}
              className="px-6 py-3 border border-slate-300 text-slate-900 text-xs tracking-[0.25em] uppercase font-bold hover:border-[#B38356] hover:text-[#B38356] transition-colors"
            >
              Return Home
            </button>
          </div>
        </div>
      </div>
    );
  }
}
