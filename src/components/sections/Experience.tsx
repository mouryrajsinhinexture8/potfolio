import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, BookOpen } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { education, experience, training } from '../../data';

// Color config map to avoid dynamic Tailwind class generation
const colorConfig = {
    education: {
        bg: 'bg-cyan-500/20',
        text: 'text-cyan-400',
        border: 'border-cyan-400',
        glow: 'shadow-[0_0_12px_rgba(0,212,255,0.3)]',
    },
    experience: {
        bg: 'bg-purple-500/20',
        text: 'text-purple-400',
        border: 'border-purple-400',
        glow: 'shadow-[0_0_12px_rgba(168,85,247,0.3)]',
    },
    training: {
        bg: 'bg-emerald-500/20',
        text: 'text-emerald-400',
        border: 'border-emerald-400',
        glow: 'shadow-[0_0_12px_rgba(16,185,129,0.3)]',
    },
};

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
    const colors = colorConfig[type];

    const Icon = type === 'education' ? GraduationCap :
        type === 'experience' ? Briefcase : BookOpen;

    return (
        <motion.div
            className={`relative flex items-start mb-8 md:mb-12 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.15, duration: 0.5 }}
        >
            {/* Mobile Icon - positioned on the timeline line */}
            <div className={`md:hidden absolute left-0 top-1 w-9 h-9 rounded-full ${colors.bg} flex items-center justify-center z-10 ${colors.glow}`}>
                <Icon className={`w-4 h-4 ${colors.text}`} />
            </div>

            {/* Content */}
            <div className={`w-full md:w-[calc(50%-2rem)] ${isLeft ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'} ml-14 md:ml-0`}>
                <motion.div
                    className="glass rounded-xl p-5 md:p-6 hover:scale-[1.02] transition-transform duration-300"
                    whileHover={{ y: -5 }}
                >
                    {/* Header */}
                    <div className={`flex items-center gap-2 mb-3 flex-wrap ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}>
                        {item.current && (
                            <span className={`px-2 py-0.5 text-xs rounded-full ${colors.bg} ${colors.text} font-medium`}>
                                Current
                            </span>
                        )}
                        <span className="text-gray-400 text-sm">
                            {item.year || item.duration}
                        </span>
                    </div>

                    {/* Title */}
                    <h4 className="text-base md:text-lg font-semibold text-white mb-1">
                        {item.degree || item.role || item.title}
                    </h4>

                    {/* Institution/Company */}
                    <p className={`${colors.text} font-medium mb-2 text-sm md:text-base`}>
                        {item.institution || item.company}
                    </p>

                    {/* Grade */}
                    {item.grade && (
                        <p className="text-gray-400 text-sm mb-2">{item.grade}</p>
                    )}

                    {/* Description */}
                    {item.description && (
                        <p className="text-gray-400 text-sm mb-3 leading-relaxed">{item.description}</p>
                    )}

                    {/* Skills */}
                    {item.skills && (
                        <div className={`flex flex-wrap gap-1.5 ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}>
                            {item.skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="px-2 py-0.5 text-xs rounded-full bg-bg-primary text-gray-300"
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
                <div className={`w-8 h-8 rounded-full ${colors.bg} flex items-center justify-center ${colors.glow}`}>
                    <Icon className={`w-4 h-4 ${colors.text}`} />
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
            transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] as const },
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
        const yearA = getYear('year' in a ? a.year : 'duration' in a ? a.duration : '');
        const yearB = getYear('year' in b ? b.year : 'duration' in b ? b.duration : '');
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
                <motion.div className="text-center mb-12 md:mb-16" variants={itemVariants}>
                    <h2 className="text-section-title font-display gradient-text mb-4">
                        My Journey
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
                        Education, experience, and continuous learning
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-accent-cyan to-accent-purple mx-auto mt-4 rounded-full" />
                </motion.div>

                {/* Legend */}
                <motion.div
                    className="flex flex-wrap justify-center gap-4 md:gap-6 mb-10 md:mb-12"
                    variants={itemVariants}
                >
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center">
                            <GraduationCap className="w-3 h-3 text-cyan-400" />
                        </div>
                        <span className="text-gray-400 text-sm">Education</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center">
                            <Briefcase className="w-3 h-3 text-purple-400" />
                        </div>
                        <span className="text-gray-400 text-sm">Experience</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                            <BookOpen className="w-3 h-3 text-emerald-400" />
                        </div>
                        <span className="text-gray-400 text-sm">Training</span>
                    </div>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Center Line - Desktop */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-cyan via-accent-purple to-accent-green" />

                    {/* Left Line - Mobile */}
                    <div className="md:hidden absolute left-[17px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-cyan via-accent-purple to-accent-green" />

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
