import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface NeuralNetworkProps {
    mouseX?: number;
    mouseY?: number;
}

export function NeuralNetwork({ mouseX = 0, mouseY = 0 }: NeuralNetworkProps) {
    const groupRef = useRef<THREE.Group>(null);
    const particlesRef = useRef<THREE.Points>(null);

    // Generate node positions
    const { nodes, connections, particlePositions } = useMemo(() => {
        const nodeCount = 50;
        const nodes: THREE.Vector3[] = [];
        const connections: { start: THREE.Vector3; end: THREE.Vector3 }[] = [];

        // Create nodes in a sphere-like distribution
        for (let i = 0; i < nodeCount; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const radius = 2 + Math.random() * 1.5;

            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);

            nodes.push(new THREE.Vector3(x, y, z));
        }

        // Create connections between nearby nodes
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const distance = nodes[i].distanceTo(nodes[j]);
                if (distance < 1.5 && Math.random() > 0.5) {
                    connections.push({ start: nodes[i], end: nodes[j] });
                }
            }
        }

        // Particle positions for flowing effect
        const particleCount = 200;
        const positions = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const radius = 1.5 + Math.random() * 2.5;

            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = radius * Math.cos(phi);
        }

        return { nodes, connections, particlePositions: positions };
    }, []);

    // Animation
    useFrame((state) => {
        if (groupRef.current) {
            const time = state.clock.getElapsedTime();

            // Slow rotation
            groupRef.current.rotation.y = time * 0.1;
            groupRef.current.rotation.x = Math.sin(time * 0.05) * 0.1;

            // Mouse interaction
            groupRef.current.rotation.y += mouseX * 0.3;
            groupRef.current.rotation.x += mouseY * 0.3;
        }

        if (particlesRef.current) {
            const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
            const time = state.clock.getElapsedTime();

            for (let i = 0; i < positions.length; i += 3) {
                positions[i + 1] += Math.sin(time + i) * 0.002;
            }
            particlesRef.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    // Create line geometry for connections
    const lineGeometry = useMemo(() => {
        const points: number[] = [];
        connections.forEach(({ start, end }) => {
            points.push(start.x, start.y, start.z);
            points.push(end.x, end.y, end.z);
        });
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
        return geometry;
    }, [connections]);

    return (
        <group ref={groupRef}>
            {/* Nodes */}
            {nodes.map((pos, i) => (
                <mesh key={i} position={pos}>
                    <sphereGeometry args={[0.05, 16, 16]} />
                    <meshStandardMaterial
                        color={i % 2 === 0 ? '#00d4ff' : '#a855f7'}
                        emissive={i % 2 === 0 ? '#00d4ff' : '#a855f7'}
                        emissiveIntensity={0.5}
                    />
                </mesh>
            ))}

            {/* Connections */}
            <lineSegments geometry={lineGeometry}>
                <lineBasicMaterial
                    color="#00d4ff"
                    transparent
                    opacity={0.3}
                />
            </lineSegments>

            {/* Particles */}
            <points ref={particlesRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[particlePositions, 3]}
                    />
                </bufferGeometry>
                <pointsMaterial
                    color="#a855f7"
                    size={0.03}
                    transparent
                    opacity={0.6}
                    sizeAttenuation
                />
            </points>
        </group>
    );
}

export default NeuralNetwork;
