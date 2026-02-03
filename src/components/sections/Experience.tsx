import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, BookOpen } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { education, experience, training } from '../../data';

interface TimelineItemProps {
    item: {
        degree?: string;
        role?: string;
        title?: string;
        institution?: string;
        company?: string;
        year?: string;
        duration?: string;
        grade?: string;
        description?: string;
        skills?: string[];
        current?: boolean;
    };
    index: number;
    type: 'education' | 'experience' | 'training';
    isVisible: boolean;
}

function TimelineItem({ item, index, type, isVisible }: TimelineItemProps) {
    const isLeft = index % 2 === 0;

    const Icon = type === 'education' ? GraduationCap :
        type === 'experience' ? Briefcase : BookOpen;

    const color = type === 'education' ? 'accent-cyan' :
        type === 'experience' ? 'accent-purple' : 'accent-green';

    return (
        <motion.div
            className={`relative flex items-center mb-12 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.2, duration: 0.5 }}
        >
            {/* Content */}
            <div className={`w-full md:w-[calc(50%-2rem)] ${isLeft ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'} pl-12 md:pl-0`}>
                <motion.div
                    className="glass rounded-xl p-6 hover:scale-[1.02] transition-transform duration-300"
                    whileHover={{ y: -5 }}
                >
                    {/* Icon - Mobile */}
                    <div className={`absolute left-0 md:hidden w-8 h-8 rounded-full bg-${color}/20 flex items-center justify-center`}>
                        <Icon className={`w-4 h-4 text-${color}`} />
                    </div>

                    {/* Header */}
                    <div className={`flex items-center gap-3 mb-3 ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}>
                        {item.current && (
                            <span className={`px-2 py-1 text-xs rounded-full bg-${color}/20 text-${color}`}>
                                Current
                            </span>
                        )}
                        <span className="text-gray-400 text-sm">
                            {item.year || item.duration}
                        </span>
                    </div>

                    {/* Title */}
                    <h4 className="text-lg font-semibold text-white mb-1">
                        {item.degree || item.role || item.title}
                    </h4>

                    {/* Institution/Company */}
                    <p className={`text-${color} font-medium mb-2`}>
                        {item.institution || item.company}
                    </p>

                    {/* Grade */}
                    {item.grade && (
                        <p className="text-gray-400 text-sm mb-2">{item.grade}</p>
                    )}

                    {/* Description */}
                    {item.description && (
                        <p className="text-gray-400 text-sm mb-3">{item.description}</p>
                    )}

                    {/* Skills */}
                    {item.skills && (
                        <div className={`flex flex-wrap gap-2 ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}>
                            {item.skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="px-2 py-1 text-xs rounded-full bg-bg-primary text-gray-300"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Center Line Dot - Desktop */}
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-bg-primary border-4 border-bg-secondary items-center justify-center z-10">
                <div className={`w-8 h-8 rounded-full bg-${color}/20 flex items-center justify-center`}>
                    <Icon className={`w-4 h-4 text-${color}`} />
                </div>
            </div>

            {/* Empty space for other side */}
            <div className="hidden md:block w-[calc(50%-2rem)]" />
        </motion.div>
    );
}

export function Experience() {
    const [sectionRef, isSectionVisible] = useIntersectionObserver<HTMLElement>({
        threshold: 0.1,
        triggerOnce: true,
    });

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: 'easeOut' },
        },
    };

    // Combine all timeline items
    const timelineItems = [
        ...education.map((item) => ({ ...item, type: 'education' as const })),
        ...experience.map((item) => ({ ...item, type: 'experience' as const })),
        ...training.map((item) => ({ ...item, type: 'training' as const })),
    ].sort((a, b) => {
        // Sort by year/duration (most recent first)
        const getYear = (str: string) => {
            const match = str?.match(/\d{4}/g);
            return match ? Math.max(...match.map(Number)) : 0;
        };
        const yearA = getYear(a.year || a.duration || '');
        const yearB = getYear(b.year || b.duration || '');
        return yearB - yearA;
    });

    return (
        <section
            id="experience"
            ref={sectionRef}
            className="section bg-gradient-to-b from-bg-secondary to-bg-primary"
        >
            <motion.div
                className="container"
                initial="hidden"
                animate={isSectionVisible ? 'visible' : 'hidden'}
            >
                {/* Section Title */}
                <motion.div className="text-center mb-16" variants={itemVariants}>
                    <h2 className="text-section-title font-display gradient-text mb-4">
                        My Journey
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Education, experience, and continuous learning
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-accent-cyan to-accent-purple mx-auto mt-4 rounded-full" />
                </motion.div>

                {/* Legend */}
                <motion.div
                    className="flex flex-wrap justify-center gap-6 mb-12"
                    variants={itemVariants}
                >
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-accent-cyan/20 flex items-center justify-center">
                            <GraduationCap className="w-3 h-3 text-accent-cyan" />
                        </div>
                        <span className="text-gray-400 text-sm">Education</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-accent-purple/20 flex items-center justify-center">
                            <Briefcase className="w-3 h-3 text-accent-purple" />
                        </div>
                        <span className="text-gray-400 text-sm">Experience</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-accent-green/20 flex items-center justify-center">
                            <BookOpen className="w-3 h-3 text-accent-green" />
                        </div>
                        <span className="text-gray-400 text-sm">Training</span>
                    </div>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Center Line - Desktop */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-cyan via-accent-purple to-accent-green" />

                    {/* Left Line - Mobile */}
                    <div className="md:hidden absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-cyan via-accent-purple to-accent-green" />

                    {/* Timeline Items */}
                    {timelineItems.map((item, index) => (
                        <TimelineItem
                            key={`${item.type}-${index}`}
                            item={item}
                            index={index}
                            type={item.type}
                            isVisible={isSectionVisible}
                        />
                    ))}
                </div>
            </motion.div>
        </section>
    );
}

export default Experience;
