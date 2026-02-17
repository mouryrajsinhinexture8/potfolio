import { Heart } from 'lucide-react';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-8 border-t border-white/5">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Logo */}
                    <a href="#home" className="text-xl font-bold gradient-text">
                        MJ
                    </a>

                    {/* Copyright */}
                    <p className="text-gray-400 text-sm flex items-center gap-1">
                        © {currentYear} Mouryrajsinh Jadeja.
                        <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                        
                    </p>

                    {/* Quick Links */}
                    <div className="flex gap-4">
                        <a
                            href="#about"
                            className="text-gray-400 hover:text-accent-cyan transition-colors text-sm"
                        >
                            About
                        </a>
                        <a
                            href="#projects"
                            className="text-gray-400 hover:text-accent-cyan transition-colors text-sm"
                        >
                            Projects
                        </a>
                        <a
                            href="#contact"
                            className="text-gray-400 hover:text-accent-cyan transition-colors text-sm"
                        >
                            Contact
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
