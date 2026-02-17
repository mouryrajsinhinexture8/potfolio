import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { skills, achievements } from '../../data';
import { useEffect, useState } from 'react';

// Animated skill bar component
function SkillBar({ name, level, color, delay = 0 }: { name: string; level: number; color: string; delay?: number }) {
    const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({ triggerOnce: true });
    const [width, setWidth] = useState(0);

    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => setWidth(level), delay);
            return () => clearTimeout(timer);
        }
    }, [isVisible, level, delay]);

    return (
        <div ref={ref} className="mb-4">
            <div className="flex justify-between mb-2">
                <span className="text-gray-300 font-medium">{name}</span>
                <span className={`${color} font-semibold`}>{level}%</span>
            </div>
            <div className="h-2 bg-bg-primary rounded-full overflow-hidden">
                <motion.div
                    className={`h-full rounded-full ${color === 'text-accent-purple' ? 'bg-gradient-to-r from-purple-600 to-purple-400' :
                        color === 'text-accent-cyan' ? 'bg-gradient-to-r from-cyan-600 to-cyan-400' :
                            color === 'text-accent-green' ? 'bg-gradient-to-r from-green-600 to-green-400' :
                                'bg-gradient-to-r from-orange-600 to-orange-400'
                        }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${width}%` }}
                    transition={{ duration: 1, ease: 'easeOut', delay: delay / 1000 }}
                    style={{
                        boxShadow: color === 'text-accent-purple' ? '0 0 10px rgba(168, 85, 247, 0.5)' :
                            color === 'text-accent-cyan' ? '0 0 10px rgba(0, 212, 255, 0.5)' :
                                color === 'text-accent-green' ? '0 0 10px rgba(16, 185, 129, 0.5)' :
                                    '0 0 10px rgba(251, 146, 60, 0.5)'
                    }}
                />
            </div>
        </div>
    );
}

// Tech stack logos/icons
const techIcons: { [key: string]: string } = {
    'React': '⚛️',
    'Next.js': '▲',
    'Python': '🐍',
    'Node.js': '💚',
    'TypeScript': '💙',
    'JavaScript': '💛',
    'PHP': '🐘',
    'MySQL': '🗃️',
    'TensorFlow': '🧠',
    'Git': '📦',
    'Tailwind CSS': '🎨',
    'Three.js': '🎲',
};

export function Skills() {
    const [sectionRef, isSectionVisible] = useIntersectionObserver<HTMLElement>({
        threshold: 0.1,
        triggerOnce: true,
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] as const },
        },
    };

    const skillCategories = [
        { key: 'aiml', title: 'AI & Machine Learning', color: 'text-accent-purple', bgColor: 'from-purple-900/20 to-purple-600/10' },
        { key: 'frontend', title: 'Frontend Development', color: 'text-accent-cyan', bgColor: 'from-cyan-900/20 to-cyan-600/10' },
        { key: 'backend', title: 'Backend Development', color: 'text-accent-green', bgColor: 'from-green-900/20 to-green-600/10' },
        { key: 'tools', title: 'Tools & Others', color: 'text-orange-400', bgColor: 'from-orange-900/20 to-orange-600/10' },
    ];

    return (
        <section
            id="skills"
            ref={sectionRef}
            className="section bg-bg-secondary"
        >
            <motion.div
                className="container"
                variants={containerVariants}
                initial="hidden"
                animate={isSectionVisible ? 'visible' : 'hidden'}
            >
                {/* Section Title */}
                <motion.div className="text-center mb-10 md:mb-16" variants={itemVariants}>
                    <h2 className="text-section-title font-display gradient-text mb-4">
                        Technical Arsenal
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
                        A comprehensive toolkit built through years of learning and practical application
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-accent-cyan to-accent-purple mx-auto mt-4 rounded-full" />
                </motion.div>

                {/* Skills Grid */}
                <div className="grid sm:grid-cols-2 gap-4 md:gap-8 mb-10 md:mb-16">
                    {skillCategories.map((category, categoryIndex) => (
                        <motion.div
                            key={category.key}
                            className={`glass rounded-2xl p-4 md:p-6 lg:p-8 bg-gradient-to-br ${category.bgColor}`}
                            variants={itemVariants}
                        >
                            <h3 className={`text-xl font-semibold ${category.color} mb-6 flex items-center gap-2`}>
                                <span className="w-2 h-2 rounded-full bg-current" />
                                {category.title}
                            </h3>
                            <div>
                                {skills[category.key as keyof typeof skills].map((skill, i) => (
                                    <SkillBar
                                        key={skill.name}
                                        name={skill.name}
                                        level={skill.level}
                                        color={category.color}
                                        delay={categoryIndex * 200 + i * 100}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Tech Stack Icons */}
                <motion.div className="mb-10 md:mb-16" variants={itemVariants}>
                    <h3 className="text-xl font-semibold text-white text-center mb-8">
                        Technologies I Work With
                    </h3>
                    <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                        {Object.entries(techIcons).map(([tech, icon], i) => (
                            <motion.div
                                key={tech}
                                className="glass rounded-xl px-5 py-3 flex items-center gap-2 group hover:bg-accent-cyan/10 transition-all duration-300"
                                whileHover={{ scale: 1.05, y: -3 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isSectionVisible ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: i * 0.05 }}
                            >
                                <span className="text-xl">{icon}</span>
                                <span className="text-gray-300 group-hover:text-white transition-colors">{tech}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Achievements */}
                <motion.div variants={itemVariants}>
                    <h3 className="text-xl font-semibold text-white text-center mb-8">
                        Achievements & Certifications
                    </h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        {achievements.map((achievement, i) => (
                            <motion.div
                                key={achievement}
                                className="glass rounded-xl px-6 py-4 flex items-center gap-3 hover:glow-cyan transition-all duration-300"
                                whileHover={{ scale: 1.03 }}
                                initial={{ opacity: 0, x: -20 }}
                                animate={isSectionVisible ? { opacity: 1, x: 0 } : {}}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="w-10 h-10 rounded-full bg-accent-cyan/20 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-accent-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <span className="text-gray-300">{achievement}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}

export default Skills;
