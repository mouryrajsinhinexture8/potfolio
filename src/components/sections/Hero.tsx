import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Download, ArrowDown, Linkedin, Github, Mail } from 'lucide-react';
import { NeuralNetwork } from '../3d/NeuralNetwork';
import { ParticleField } from '../3d/ParticleField';
import { useMousePosition } from '../../hooks/useMousePosition';
import { personalInfo } from '../../data';

export function Hero() {
    const { normalizedX, normalizedY } = useMousePosition();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] as const },
        },
    };

    const letterVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.05,
                duration: 0.5,
                ease: [0.33, 1, 0.68, 1] as const,
            },
        }),
    };

    const name = personalInfo.name.toUpperCase();

    return (
        <section id="home" className="relative h-screen overflow-hidden bg-bg-primary">
            {/* 3D Background */}
            <div className="absolute inset-0 z-0">
                <Canvas
                    camera={{ position: [0, 0, 6], fov: 60 }}
                    dpr={[1, 1.5]}
                    gl={{
                        antialias: true,
                        alpha: true,
                        powerPreference: 'high-performance',
                        stencil: false,
                        depth: false
                    }}
                    frameloop="always"
                    performance={{ min: 0.5 }}
                >
                    <ambientLight intensity={0.3} />
                    <pointLight position={[10, 10, 10]} intensity={0.8} color="#00d4ff" />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />
                    <Suspense fallback={null}>
                        <NeuralNetwork mouseX={normalizedX} mouseY={normalizedY} />
                        <ParticleField />
                    </Suspense>
                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        autoRotate
                        autoRotateSpeed={0.3}
                        maxPolarAngle={Math.PI / 2}
                        minPolarAngle={Math.PI / 2}
                    />
                </Canvas>
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-primary/30 to-bg-primary z-[1]" />

            {/* Content */}
            <motion.div
                className="relative z-10 flex h-full items-center justify-center px-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="text-center max-w-5xl">
                    {/* Animated Name */}
                    <motion.h1
                        className="text-hero font-display mb-4 md:mb-6"
                        variants={itemVariants}
                    >
                        <span className="sr-only">{name}</span>
                        <span aria-hidden="true">
                            {name.split('').map((char, i) => (
                                <motion.span
                                    key={i}
                                    custom={i}
                                    variants={letterVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className="inline-block gradient-text"
                                    style={{
                                        textShadow: '0 0 40px rgba(0, 212, 255, 0.3)',
                                    }}
                                >
                                    {char === ' ' ? '\u00A0' : char}
                                </motion.span>
                            ))}
                        </span>
                    </motion.h1>

                    {/* Typewriter Tagline */}
                    <motion.div
                        className="text-subtitle text-gray-300 mb-6 h-8"
                        variants={itemVariants}
                    >
                        <TypeAnimation
                            sequence={[
                                personalInfo.taglines[0],
                                2000,
                                personalInfo.taglines[1],
                                2000,
                                personalInfo.taglines[2],
                                2000,
                                personalInfo.taglines[3],
                                2000,
                            ]}
                            repeat={Infinity}
                            cursor={true}
                            style={{ display: 'inline-block' }}
                        />
                    </motion.div>

                    {/* Headline */}
                    <motion.p
                        className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
                        variants={itemVariants}
                    >
                        {personalInfo.headline}
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
                        variants={itemVariants}
                    >
                        <a href="#projects" className="btn-primary group touch-target">
                            <span className="flex items-center gap-2">
                                View My Work
                                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                            </span>
                        </a>
                        <a
                            href={personalInfo.resumeUrl}
                            download
                            className="btn-secondary flex items-center gap-2 touch-target"
                        >
                            <Download className="w-4 h-4" />
                            Download Resume
                        </a>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        className="flex justify-center gap-6"
                        variants={itemVariants}
                    >
                        <a
                            href={personalInfo.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-full glass hover:glow-cyan transition-all duration-300 hover:scale-110 touch-target"
                            aria-label="LinkedIn Profile"
                        >
                            <Linkedin className="w-5 h-5 text-accent-cyan" />
                        </a>
                        <a
                            href={personalInfo.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-full glass hover:glow-purple transition-all duration-300 hover:scale-110 touch-target"
                            aria-label="GitHub Profile"
                        >
                            <Github className="w-5 h-5 text-accent-purple" />
                        </a>
                        <a
                            href={`mailto:${personalInfo.email}`}
                            className="p-3 rounded-full glass hover:glow-green transition-all duration-300 hover:scale-110 touch-target"
                            aria-label="Email Me"
                        >
                            <Mail className="w-5 h-5 text-accent-green" />
                        </a>
                    </motion.div>
                </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
            >
                <span className="text-sm text-gray-400">Scroll to explore</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                >
                    <ArrowDown className="w-5 h-5 text-accent-cyan" />
                </motion.div>
            </motion.div>
        </section>
    );
}

export default Hero;
