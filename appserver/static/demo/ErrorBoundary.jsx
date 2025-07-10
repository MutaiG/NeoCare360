import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Check if it's a third-party error that we can safely ignore
        const errorMessage = error.toString();
        const thirdPartyErrors = [
            'mobx.array',
            'getCookie',
            'BuilderContent',
            'HubSpot',
            'Wootric',
            'Firestore',
            'SecurityError',
        ];

        const isThirdPartyError = thirdPartyErrors.some((pattern) =>
            errorMessage.includes(pattern)
        );

        if (isThirdPartyError) {
            // Log but don't crash the app for third-party errors
            console.warn('Third-party error caught and ignored:', error);
            this.setState({ hasError: false }); // Reset error state
            return;
        }

        // Log the error details for application errors
        console.error('ErrorBoundary caught an application error:', error);
        console.error('Error info:', errorInfo);

        this.setState({
            error: error,
            errorInfo: errorInfo,
        });
    }

    render() {
        if (this.state.hasError) {
            // Fallback UI
            return (
                <div
                    style={{
                        padding: '20px',
                        border: '1px solid #ff6b6b',
                        borderRadius: '8px',
                        backgroundColor: '#ffe0e0',
                        margin: '20px',
                    }}
                >
                    <h2 style={{ color: '#d63031' }}>🚨 Something went wrong</h2>
                    <p>The NeoCare360 application encountered an error.</p>
                    <details style={{ whiteSpace: 'pre-wrap', marginTop: '10px' }}>
                        <summary>Error Details</summary>
                        <div
                            style={{
                                backgroundColor: '#fff',
                                padding: '10px',
                                marginTop: '10px',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                fontSize: '12px',
                                fontFamily: 'monospace',
                            }}
                        >
                            <strong>Error:</strong>{' '}
                            {this.state.error && this.state.error.toString()}
                            <br />
                            <strong>Stack:</strong>{' '}
                            {this.state.errorInfo?.componentStack || 'No stack trace available'}
                        </div>
                    </details>
                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            marginTop: '15px',
                            padding: '8px 16px',
                            backgroundColor: '#0984e3',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        Reload Application
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
