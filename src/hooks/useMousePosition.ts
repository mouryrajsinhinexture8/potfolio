import { useState, useEffect } from 'react';

interface MousePosition {
    x: number;
    y: number;
    normalizedX: number;
    normalizedY: number;
}

export function useMousePosition() {
    const [mousePosition, setMousePosition] = useState<MousePosition>({
        x: 0,
        y: 0,
        normalizedX: 0,
        normalizedY: 0,
    });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            setMousePosition({
                x: clientX,
                y: clientY,
                normalizedX: (clientX / window.innerWidth) * 2 - 1,
                normalizedY: -(clientY / window.innerHeight) * 2 + 1,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return mousePosition;
}
