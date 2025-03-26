'use client';

import React from 'react';
import { Flex, Text, Button } from '@/once-ui/components';

interface Props {
    children: React.ReactNode;
}

interface State {
    hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <Flex
                    direction="column"
                    gap="l"
                    alignItems="center"
                    justifyContent="center"
                    padding="xl">
                    <Text variant="heading-strong-l">
                        Something went wrong
                    </Text>
                    <Text variant="body-default-m" onBackground="neutral-weak">
                        An error occurred while loading this content.
                    </Text>
                    <Button
                        variant="primary"
                        label="Try again"
                        onClick={() => {
                            this.setState({ hasError: false });
                            window.location.reload();
                        }}
                    />
                </Flex>
            );
        }

        return this.props.children;
    }
} 