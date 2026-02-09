import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, ChevronRight } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { projects } from '../../data';

interface Project {
    id: number;
    title: string;
    subtitle: string;
    duration: string;
    description: string;
    fullDescription: string;
    tech: string[];
    image: string;
    liveUrl: string;
    githubUrl: string;
    featured: boolean;
}

interface ProjectModalProps {
    project: Project;
    isOpen: boolean;
    onClose: () => void;
}

function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        className="fixed inset-4 md:inset-10 lg:inset-20 bg-bg-secondary rounded-2xl z-50 overflow-hidden flex flex-col"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', duration: 0.5 }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 md:p-6 border-b border-white/10">
                            <div>
                                <h3 className="text-xl md:text-2xl font-bold text-white">{project.title}</h3>
                                <p className="text-accent-cyan">{project.subtitle}</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-white/10 transition-colors touch-target"
                                aria-label="Close modal"
                            >
                                <X className="w-6 h-6 text-gray-400" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-4 md:p-6">
                            <div className="grid lg:grid-cols-2 gap-8">
                                {/* Image */}
                                <div className="bg-gradient-to-br from-accent-cyan/20 to-accent-purple/20 rounded-xl aspect-video flex items-center justify-center">
                                    <span className="text-gray-400">Project Screenshot</span>
                                </div>

                                {/* Details */}
                                <div>
                                    <div className="mb-6">
                                        <h4 className="text-lg font-semibold text-white mb-2">Duration</h4>
                                        <p className="text-gray-400">{project.duration}</p>
                                    </div>

                                    <div className="mb-6">
                                        <h4 className="text-lg font-semibold text-white mb-2">Tech Stack</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tech.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="px-3 py-1 rounded-full bg-accent-cyan/10 text-accent-cyan text-sm"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn-primary text-sm"
                                        >
                                            <span className="flex items-center gap-2">
                                                <ExternalLink className="w-4 h-4" />
                                                Live Demo
                                            </span>
                                        </a>
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn-secondary text-sm"
                                        >
                                            <span className="flex items-center gap-2">
                                                <Github className="w-4 h-4" />
                                                Source Code
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Full Description */}
                            <div className="mt-8">
                                <h4 className="text-lg font-semibold text-white mb-4">About This Project</h4>
                                <div className="text-gray-400 whitespace-pre-line leading-relaxed">
                                    {project.fullDescription}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

interface ProjectCardProps {
    project: Project;
    index: number;
    onClick: () => void;
    isVisible: boolean;
}

function ProjectCard({ project, index, onClick, isVisible }: ProjectCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className="group relative glass rounded-2xl overflow-hidden cursor-pointer"
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
            whileHover={{ y: -10 }}
            style={{
                transformStyle: 'preserve-3d',
            }}
        >
            {/* Image */}
            <div className="relative h-48 md:h-56 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/20 to-accent-purple/20 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Screenshot Placeholder</span>
                </div>

                {/* Overlay on hover */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />

                {/* Border glow */}
                <motion.div
                    className="absolute inset-0 border-2 border-transparent group-hover:border-accent-cyan/50 rounded-t-2xl transition-colors duration-300"
                    animate={isHovered ? { boxShadow: '0 0 30px rgba(0, 212, 255, 0.3)' } : {}}
                />
            </div>

            {/* Content */}
            <div className="p-6">
                {/* Duration */}
                <span className="text-accent-cyan text-sm mb-2 block">{project.duration}</span>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:gradient-text transition-all duration-300">
                    {project.title}
                </h3>

                {/* Subtitle */}
                <p className="text-gray-400 text-sm mb-4">{project.subtitle}</p>

                {/* Description */}
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{project.description}</p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 3).map((tech) => (
                        <span
                            key={tech}
                            className="px-2 py-1 text-xs rounded-full bg-bg-primary text-gray-400"
                        >
                            {tech}
                        </span>
                    ))}
                    {project.tech.length > 3 && (
                        <span className="px-2 py-1 text-xs rounded-full bg-bg-primary text-gray-400">
                            +{project.tech.length - 3}
                        </span>
                    )}
                </div>

                {/* View Details */}
                <div className="flex items-center gap-2 text-accent-cyan group-hover:translate-x-2 transition-transform duration-300">
                    <span className="text-sm font-medium">View Details</span>
                    <ChevronRight className="w-4 h-4" />
                </div>
            </div>
        </motion.div>
    );
}

export function Projects() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
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

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="section bg-bg-primary"
        >
            <motion.div
                className="container"
                initial="hidden"
                animate={isSectionVisible ? 'visible' : 'hidden'}
            >
                {/* Section Title */}
                <motion.div className="text-center mb-16" variants={itemVariants}>
                    <h2 className="text-section-title font-display gradient-text mb-4">
                        Featured Projects
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Crafting Solutions, One Line of Code at a Time
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-accent-cyan to-accent-purple mx-auto mt-4 rounded-full" />
                </motion.div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                            onClick={() => setSelectedProject(project)}
                            isVisible={isSectionVisible}
                        />
                    ))}
                </div>

                {/* Modal */}
                <ProjectModal
                    project={selectedProject!}
                    isOpen={!!selectedProject}
                    onClose={() => setSelectedProject(null)}
                />
            </motion.div>
        </section>
    );
}

export default Projects;
