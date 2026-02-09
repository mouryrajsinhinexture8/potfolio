import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function ParticleField() {
    const particlesRef = useRef<THREE.Points>(null);

    const particlePositions = useMemo(() => {
        const count = 500;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            // Spread particles across a larger area
            positions[i * 3] = (Math.random() - 0.5) * 30;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 30;

            // Random colors between cyan and purple
            const t = Math.random();
            colors[i * 3] = THREE.MathUtils.lerp(0, 0.66, t);
            colors[i * 3 + 1] = THREE.MathUtils.lerp(0.83, 0.33, t);
            colors[i * 3 + 2] = THREE.MathUtils.lerp(1, 0.97, t);
        }

        return { positions, colors };
    }, []);

    useFrame((state) => {
        if (particlesRef.current) {
            const time = state.clock.getElapsedTime();
            particlesRef.current.rotation.y = time * 0.02;
            particlesRef.current.rotation.x = time * 0.01;
        }
    });

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[particlePositions.positions, 3]}
                />
                <bufferAttribute
                    attach="attributes-color"
                    args={[particlePositions.colors, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                transparent
                opacity={0.6}
                vertexColors
                sizeAttenuation
            />
        </points>
    );
}

export default ParticleField;
