import { motion } from 'framer-motion';
import { Brain, Code2, Puzzle, Dices, Car, Mountain, Plane, Activity } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { personalInfo, stats, services, hobbies } from '../../data';
import { useEffect, useState } from 'react';

// Counter component for animated numbers
function AnimatedCounter({ value, suffix = '' }: { value: number | string; suffix: string }) {
    const [count, setCount] = useState(0);
    const [ref, isVisible] = useIntersectionObserver<HTMLSpanElement>({ triggerOnce: true });

    useEffect(() => {
        if (isVisible && typeof value === 'number') {
            const duration = 2000;
            const steps = 60;
            const increment = value / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= value) {
                    setCount(value);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(current));
                }
            }, duration / steps);

            return () => clearInterval(timer);
        }
    }, [isVisible, value]);

    return (
        <span ref={ref}>
            {typeof value === 'number' ? count : value}{suffix}
        </span>
    );
}

// Icon mapper
const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
    Brain: Brain,
    Code: Code2,
    Puzzle: Puzzle,
    Dices: Dices,
    Car: Car,
    Bike: Activity,
    Mountain: Mountain,
    Plane: Plane,
};

export function About() {
    const [sectionRef, isSectionVisible] = useIntersectionObserver<HTMLElement>({
        threshold: 0.1,
        triggerOnce: true
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] as const },
        },
    };

    return (
        <section
            id="about"
            ref={sectionRef}
            className="section bg-gradient-to-b from-bg-primary to-bg-secondary"
        >
            <motion.div
                className="container"
                variants={containerVariants}
                initial="hidden"
                animate={isSectionVisible ? 'visible' : 'hidden'}
            >
                {/* Section Title */}
                <motion.div className="text-center mb-16" variants={itemVariants}>
                    <h2 className="text-section-title font-display gradient-text mb-4">
                        Who I Am
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-accent-cyan to-accent-purple mx-auto rounded-full" />
                </motion.div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
                    {/* Photo Card */}
                    <motion.div
                        className="relative group flex justify-center"
                        variants={itemVariants}
                    >
                        <div className="relative">
                            {/* Glow Effect */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-green rounded-2xl opacity-30 blur-xl group-hover:opacity-50 transition-opacity duration-500" />

                            {/* Card */}
                            <div className="relative glass rounded-2xl p-2 transform group-hover:scale-[1.02] transition-transform duration-500">
                                <div className="bg-gradient-to-br from-bg-secondary to-bg-primary rounded-xl overflow-hidden">
                                    {/* Profile Photo */}
                                    <img
                                        src="/Hero img.jpeg"
                                        alt="Mouryrajsinh Jadeja"
                                        className="w-64 h-80 md:w-80 md:h-96 object-cover"
                                    />
                                </div>
                            </div>

                            {/* Floating elements */}
                            <motion.div
                                className="absolute -top-4 -right-4 w-16 h-16 bg-accent-cyan/20 rounded-full blur-md"
                                animate={{ y: [0, -10, 0], scale: [1, 1.1, 1] }}
                                transition={{ repeat: Infinity, duration: 4 }}
                            />
                            <motion.div
                                className="absolute -bottom-4 -left-4 w-20 h-20 bg-accent-purple/20 rounded-full blur-md"
                                animate={{ y: [0, 10, 0], scale: [1, 1.1, 1] }}
                                transition={{ repeat: Infinity, duration: 5, delay: 1 }}
                            />
                        </div>
                    </motion.div>

                    {/* Bio */}
                    <motion.div variants={itemVariants}>
                        <h3 className="text-2xl md:text-3xl font-semibold text-white mb-6">
                            {personalInfo.firstName}{' '}
                            <span className="gradient-text">{personalInfo.lastName}</span>
                        </h3>

                        <div className="space-y-4 text-gray-300 leading-relaxed">
                            {personalInfo.bio.split('\n\n').map((paragraph, i) => (
                                <p key={i}>{paragraph}</p>
                            ))}
                        </div>

                        {/* Location */}
                        <div className="mt-6 flex items-center gap-2 text-accent-cyan">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{personalInfo.location}</span>
                        </div>
                    </motion.div>
                </div>

                {/* Stats */}
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
                    variants={containerVariants}
                >
                    {stats.map((stat) => (
                        <motion.div
                            key={stat.label}
                            className="glass rounded-xl p-6 text-center group hover:scale-105 transition-transform duration-300"
                            variants={itemVariants}
                            whileHover={{ y: -5 }}
                        >
                            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                            </div>
                            <div className="text-gray-400 text-sm">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* What I Do */}
                <motion.div className="mb-20" variants={itemVariants}>
                    <h3 className="text-2xl font-semibold text-white text-center mb-10">
                        What I Do
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        {services.map((service, i) => {
                            const Icon = iconMap[service.icon] || Brain;
                            return (
                                <motion.div
                                    key={service.title}
                                    className="glass rounded-xl p-8 group hover:bg-white/10 transition-all duration-300 card-3d"
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${i === 0 ? 'bg-accent-purple/20 glow-purple' :
                                        i === 1 ? 'bg-accent-cyan/20 glow-cyan' :
                                            'bg-accent-green/20 glow-green'
                                        }`}>
                                        <Icon className={`w-7 h-7 ${i === 0 ? 'text-accent-purple' :
                                            i === 1 ? 'text-accent-cyan' :
                                                'text-accent-green'
                                            }`} />
                                    </div>
                                    <h4 className="text-xl font-semibold text-white mb-3">{service.title}</h4>
                                    <p className="text-gray-400">{service.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Hobbies */}
                <motion.div variants={itemVariants}>
                    <h3 className="text-xl font-semibold text-white text-center mb-8">
                        When I'm Not Coding
                    </h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        {hobbies.map((hobby) => {
                            const Icon = iconMap[hobby.icon] || Activity;
                            return (
                                <motion.div
                                    key={hobby.name}
                                    className="glass rounded-full px-6 py-3 flex items-center gap-3 group hover:bg-accent-cyan/10 transition-colors duration-300"
                                    whileHover={{ scale: 1.05, rotate: [-2, 2, 0] }}
                                >
                                    <Icon className="w-5 h-5 text-accent-cyan group-hover:rotate-12 transition-transform" />
                                    <span className="text-gray-300">{hobby.name}</span>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}

export default About;
