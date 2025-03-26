import '@testing-library/jest-dom';

// Mock Next.js router
jest.mock('next/router', () => ({
    useRouter() {
        return {
            route: '/',
            pathname: '',
            query: '',
            asPath: '',
            push: jest.fn(),
            replace: jest.fn(),
        };
    },
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
    usePathname() {
        return '/';
    },
    useRouter() {
        return {
            push: jest.fn(),
            replace: jest.fn(),
            back: jest.fn(),
        };
    },
}));

// Mock intersection observer
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver; 