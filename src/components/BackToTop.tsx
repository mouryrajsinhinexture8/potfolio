import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 500);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <motion.button
            onClick={scrollToTop}
            className={`fixed bottom-6 right-4 md:bottom-8 md:right-8 z-50 w-11 h-11 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-accent-cyan to-accent-purple flex items-center justify-center shadow-lg hover:shadow-accent-cyan/30 transition-shadow touch-target ${isVisible ? 'pointer-events-auto' : 'pointer-events-none'
                }`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Back to top"
        >
            <ArrowUp className="w-5 h-5 text-white" />
        </motion.button>
    );
}

export default BackToTop;
