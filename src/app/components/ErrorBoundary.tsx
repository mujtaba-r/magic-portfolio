'use client';

import { Component, ErrorInfo, ReactNode } from 'react';
import { Button, Flex, Heading, Text } from '@/once-ui/components';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
    errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
        
        // Log to your error reporting service
        if (process.env.NODE_ENV === 'production') {
            // TODO: Add your error reporting service here
            // Example: Sentry.captureException(error);
        }
    }

    private handleReset = () => {
        this.setState({ hasError: false, error: undefined, errorInfo: undefined });
    };

    public render() {
        if (this.state.hasError) {
            return this.props.fallback || (
                <Flex
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    gap="l"
                    padding="xl">
                    <Heading variant="display-strong-l">
                        Something went wrong
                    </Heading>
                    <Text variant="body-default-m">
                        {this.state.error?.message || 'An unexpected error occurred'}
                    </Text>
                    <Button
                        variant="primary"
                        label="Try again"
                        onClick={this.handleReset}
                    />
                </Flex>
            );
        }

        return this.props.children;
    }
} 