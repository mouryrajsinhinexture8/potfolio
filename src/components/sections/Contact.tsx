import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { Send, Mail, Phone, MapPin, Linkedin, Github, Copy, Check, Sparkles } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { personalInfo } from '../../data';

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [copiedEmail, setCopiedEmail] = useState(false);
    const [sectionRef, isSectionVisible] = useIntersectionObserver<HTMLElement>({
        threshold: 0.1,
        triggerOnce: true,
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = async (_data: FormData) => {
        setIsSubmitting(true);

        // Simulate form submission (replace with EmailJS integration)
        try {
            // TODO: Integrate with EmailJS
            // await emailjs.send('service_id', 'template_id', data, 'public_key');

            await new Promise((resolve) => setTimeout(resolve, 1500));

            toast.success('Message sent successfully! I\'ll get back to you soon.', {
                duration: 5000,
                style: {
                    background: '#151932',
                    color: '#fff',
                    border: '1px solid rgba(0, 212, 255, 0.3)',
                },
                iconTheme: {
                    primary: '#00d4ff',
                    secondary: '#151932',
                },
            });

            reset();
        } catch {
            toast.error('Failed to send message. Please try again.', {
                style: {
                    background: '#151932',
                    color: '#fff',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                },
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const copyEmail = () => {
        navigator.clipboard.writeText(personalInfo.email);
        setCopiedEmail(true);
        toast.success('Email copied to clipboard!', {
            duration: 2000,
            style: {
                background: '#151932',
                color: '#fff',
                border: '1px solid rgba(0, 212, 255, 0.3)',
            },
        });
        setTimeout(() => setCopiedEmail(false), 2000);
    };

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

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="section bg-gradient-to-b from-bg-primary to-bg-secondary"
        >
            <Toaster position="top-right" />

            <motion.div
                className="container"
                variants={containerVariants}
                initial="hidden"
                animate={isSectionVisible ? 'visible' : 'hidden'}
            >
                {/* Section Title */}
                <motion.div className="text-center mb-10 md:mb-16" variants={itemVariants}>
                    <h2 className="text-section-title font-display gradient-text mb-4">
                        Let's Connect
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
                        Have a project in mind? Let's make it happen!
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-accent-cyan to-accent-purple mx-auto mt-4 rounded-full" />
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-20">
                    {/* Contact Form */}
                    <motion.div variants={itemVariants}>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {/* Name */}
                            <div className="relative">
                                <input
                                    {...register('name', { required: 'Name is required' })}
                                    type="text"
                                    placeholder="Your Name"
                                    className="w-full px-4 py-3 md:py-4 bg-bg-secondary border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-accent-cyan focus:outline-none focus:ring-1 focus:ring-accent-cyan transition-all duration-300 text-sm md:text-base"
                                />
                                {errors.name && (
                                    <span className="text-red-400 text-sm mt-1 block">{errors.name.message}</span>
                                )}
                            </div>

                            {/* Email */}
                            <div className="relative">
                                <input
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: 'Invalid email address',
                                        },
                                    })}
                                    type="email"
                                    placeholder="Your Email"
                                    className="w-full px-4 py-3 md:py-4 bg-bg-secondary border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-accent-cyan focus:outline-none focus:ring-1 focus:ring-accent-cyan transition-all duration-300 text-sm md:text-base"
                                />
                                {errors.email && (
                                    <span className="text-red-400 text-sm mt-1 block">{errors.email.message}</span>
                                )}
                            </div>

                            {/* Subject */}
                            <div className="relative">
                                <input
                                    {...register('subject')}
                                    type="text"
                                    placeholder="Subject (Optional)"
                                    className="w-full px-4 py-3 md:py-4 bg-bg-secondary border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-accent-cyan focus:outline-none focus:ring-1 focus:ring-accent-cyan transition-all duration-300 text-sm md:text-base"
                                />
                            </div>

                            {/* Message */}
                            <div className="relative">
                                <textarea
                                    {...register('message', { required: 'Message is required' })}
                                    placeholder="Your Message"
                                    rows={5}
                                    className="w-full px-4 py-3 md:py-4 bg-bg-secondary border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-accent-cyan focus:outline-none focus:ring-1 focus:ring-accent-cyan transition-all duration-300 resize-none text-sm md:text-base"
                                />
                                {errors.message && (
                                    <span className="text-red-400 text-sm mt-1 block">{errors.message.message}</span>
                                )}
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span className="flex items-center justify-center gap-2">
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            Send Message
                                        </>
                                    )}
                                </span>
                            </motion.button>
                        </form>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div className="space-y-8" variants={itemVariants}>
                        {/* Availability Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75" />
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-green" />
                            </span>
                            <span className="text-accent-green font-medium">Open to Opportunities</span>
                        </div>

                        {/* Contact Cards */}
                        <div className="space-y-4">
                            {/* Email */}
                            <motion.div
                                className="glass rounded-xl p-4 flex items-center justify-between group hover:bg-white/10 transition-colors cursor-pointer"
                                onClick={copyEmail}
                                whileHover={{ x: 5 }}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-accent-cyan/20 flex items-center justify-center">
                                        <Mail className="w-5 h-5 text-accent-cyan" />
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">Email</p>
                                        <p className="text-white font-medium text-sm md:text-base break-all">{personalInfo.email}</p>
                                    </div>
                                </div>
                                <button className="p-2 rounded-full hover:bg-white/10 transition-colors touch-target">
                                    {copiedEmail ? (
                                        <Check className="w-5 h-5 text-accent-green" />
                                    ) : (
                                        <Copy className="w-5 h-5 text-gray-400 group-hover:text-accent-cyan transition-colors" />
                                    )}
                                </button>
                            </motion.div>

                            {/* Phone */}
                            <motion.a
                                href={`tel:${personalInfo.phone}`}
                                className="glass rounded-xl p-4 flex items-center gap-4 group hover:bg-white/10 transition-colors block"
                                whileHover={{ x: 5 }}
                            >
                                <div className="w-12 h-12 rounded-full bg-accent-purple/20 flex items-center justify-center">
                                    <Phone className="w-5 h-5 text-accent-purple" />
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">Phone</p>
                                    <p className="text-white font-medium">{personalInfo.phone}</p>
                                </div>
                            </motion.a>

                            {/* Location */}
                            <motion.div
                                className="glass rounded-xl p-4 flex items-center gap-4"
                                whileHover={{ x: 5 }}
                            >
                                <div className="w-12 h-12 rounded-full bg-accent-green/20 flex items-center justify-center">
                                    <MapPin className="w-5 h-5 text-accent-green" />
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">Location</p>
                                    <p className="text-white font-medium">{personalInfo.location}</p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Social Links */}
                        <div>
                            <p className="text-gray-400 mb-4">Connect with me</p>
                            <div className="flex gap-4">
                                <motion.a
                                    href={personalInfo.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 glass rounded-xl flex items-center justify-center hover:bg-accent-cyan/20 transition-colors touch-target"
                                    whileHover={{ scale: 1.1, y: -3 }}
                                >
                                    <Linkedin className="w-5 h-5 text-accent-cyan" />
                                </motion.a>
                                <motion.a
                                    href={personalInfo.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 glass rounded-xl flex items-center justify-center hover:bg-accent-purple/20 transition-colors touch-target"
                                    whileHover={{ scale: 1.1, y: -3 }}
                                >
                                    <Github className="w-5 h-5 text-accent-purple" />
                                </motion.a>
                            </div>
                        </div>

                        {/* Fun message */}
                        <div className="glass rounded-xl p-6">
                            <div className="flex items-center gap-2 mb-2">
                                <Sparkles className="w-5 h-5 text-accent-cyan" />
                                <span className="text-white font-medium">Let's Create Something Amazing</span>
                            </div>
                            <p className="text-gray-400 text-sm">
                                Whether it's an AI project, a full-stack application, or just a chat about technology,
                                I'm always excited to connect with fellow developers and innovators.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}

export default Contact;
