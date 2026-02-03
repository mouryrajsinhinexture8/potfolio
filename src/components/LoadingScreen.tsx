import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsLoading(false), 500);
                    return 100;
                }
                return prev + Math.random() * 15;
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[100] bg-bg-primary flex flex-col items-center justify-center"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Logo */}
                    <motion.div
                        className="mb-8"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center">
                            <span className="text-4xl font-bold text-white">MJ</span>
                        </div>
                    </motion.div>

                    {/* Loading text */}
                    <motion.p
                        className="text-gray-400 mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        Loading experience...
                    </motion.p>

                    {/* Progress bar */}
                    <div className="w-48 h-1 bg-bg-secondary rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-accent-cyan to-accent-purple rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(progress, 100)}%` }}
                            transition={{ duration: 0.1 }}
                        />
                    </div>

                    {/* Percentage */}
                    <motion.p
                        className="text-accent-cyan mt-2 text-sm font-mono"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        {Math.min(Math.floor(progress), 100)}%
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default LoadingScreen;
