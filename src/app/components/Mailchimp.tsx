"use client";

import { mailchimp } from '@/app/resources'
import { newsletter } from '@/app/resources'
import { Button, Flex, Heading, Input, Text } from '@/once-ui/components';
import { Background } from '@/once-ui/components/Background';
import { useState } from 'react';

function debounce<T extends (...args: any[]) => void>(func: T, delay: number): T {
    let timeout: ReturnType<typeof setTimeout>;
    return ((...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    }) as T;
}

export const Mailchimp = () => {
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [touched, setTouched] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const validateEmail = (email: string): boolean => {
        if (email === '') {
            return false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        setSubmitStatus('idle');

        if (!validateEmail(value)) {
            setError('Please enter a valid email address.');
        } else {
            setError('');
        }
    };

    const debouncedHandleChange = debounce(handleChange, 2000);

    const handleBlur = () => {
        setTouched(true);
        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus('idle');
        setError('');

        try {
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to subscribe');
            }

            setSubmitStatus('success');
            setEmail('');
            setError('');
        } catch (err) {
            console.error('Subscription error:', err);
            setSubmitStatus('error');
            setError(err instanceof Error ? err.message : 'Failed to subscribe');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Flex
            style={{overflow: 'hidden'}}
            position="relative"
            fillWidth padding="l"  radius="l" marginBottom="m"
            direction="column" alignItems="center" align="center"
            background="surface" border="neutral-medium" borderStyle="solid-1">
            <Background
                position="absolute"
                gradient={mailchimp.effects.gradient}
                dots={mailchimp.effects.dots}
                lines={mailchimp.effects.lines}/>
            <Heading style={{position: 'relative'}}
                marginBottom="s"
                variant="display-strong-xs">
                {newsletter.title}
            </Heading>
            <Text
                style={{
                    position: 'relative',
                    maxWidth: 'var(--responsive-width-xs)'
                }}
                wrap="balance"
                marginBottom="l"
                onBackground="neutral-medium">
                {newsletter.description}
            </Text>
            <form
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center'
                }}
                onSubmit={handleSubmit}>
                <Flex
                    fillWidth maxWidth={24} gap="8">
                    <Input
                        formNoValidate
                        labelAsPlaceholder
                        id="mce-EMAIL"
                        name="EMAIL"
                        type="email"
                        label="Email"
                        required
                        value={email}
                        onChange={(e) => {
                            if (error) {
                                handleChange(e);
                            } else {
                                debouncedHandleChange(e);
                            }
                        }}
                        onBlur={handleBlur}
                        error={error}/>
                    <div className="clear">
                        <Flex
                            height="48" alignItems="center">
                            <Button
                                type="submit"
                                size="m"
                                fillWidth
                                disabled={isSubmitting || !validateEmail(email)}>
                                {isSubmitting ? 'Subscribing...' : 'Sign up'}
                            </Button>
                        </Flex>
                    </div>
                </Flex>
                {submitStatus === 'success' && (
                    <Text
                        style={{
                            position: 'relative',
                            color: 'var(--accent)',
                            marginTop: '1rem'
                        }}>
                        Successfully subscribed! Thank you for joining.
                    </Text>
                )}
            </form>
        </Flex>
    )
}