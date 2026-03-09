import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack)
  }

  handleReset = () => {
    this.setState({ hasError: false })
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div role="alert" className="flex flex-col items-center gap-4 py-20 text-gray-400">
            <p className="text-sm">Something went wrong. Please try again.</p>
            <button
              type="button"
              onClick={this.handleReset}
              className="text-sm text-indigo-600 hover:text-indigo-800 underline cursor-pointer"
            >
              Try again
            </button>
          </div>
        )
      )
    }
    return this.props.children
  }
}
