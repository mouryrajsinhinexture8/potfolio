import { useEffect, useRef, useState, RefObject } from 'react';

interface UseIntersectionObserverOptions {
    threshold?: number;
    root?: Element | null;
    rootMargin?: string;
    triggerOnce?: boolean;
}

export function useIntersectionObserver<T extends HTMLElement>(
    options: UseIntersectionObserverOptions = {}
): [RefObject<T | null>, boolean] {
    const { threshold = 0.1, root = null, rootMargin = '0px', triggerOnce = false } = options;
    const ref = useRef<T | null>(null);
    const [isIntersecting, setIsIntersecting] = useState(false);
    const hasTriggered = useRef(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (triggerOnce && hasTriggered.current) return;

                if (entry.isIntersecting) {
                    setIsIntersecting(true);
                    if (triggerOnce) hasTriggered.current = true;
                } else if (!triggerOnce) {
                    setIsIntersecting(false);
                }
            },
            { threshold, root, rootMargin }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [threshold, root, rootMargin, triggerOnce]);

    return [ref, isIntersecting];
}
