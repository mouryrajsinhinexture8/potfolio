// Personal Information
export const personalInfo = {
    name: "Mouryrajsinh Jadeja",
    firstName: "Mouryrajsinh",
    lastName: "Jadeja",
    fullName: "Jadeja Mouryrajsinh Arjunsinh",
    title: "AI Developer & Full-Stack Engineer",
    taglines: [
        "AI Developer & Full-Stack Engineer",
        "Building Intelligent Solutions",
        "Crafting Digital Experiences",
        "Exploring AI Frontiers",
    ],
    headline: "Transforming Ideas into Intelligent Applications",
    bio: `I'm Mouryrajsinh Jadeja, an AI Developer and Full-Stack Engineer passionate about leveraging machine learning and natural language processing to build innovative, data-driven solutions. Currently pursuing M.Sc. in IT - Artificial Intelligence at Parul University, I specialize in creating scalable systems that solve complex real-world problems.

With expertise spanning AI research, web development, and software engineering, I bridge the gap between cutting-edge AI technologies and practical applications. I thrive on collaborating with cross-functional teams to develop solutions that enhance user experiences and drive business value.`,
    location: "Vadodara, Gujarat, India",
    email: "mouryrajjadeja@gmail.com",
    phone: "+91-8849317978",
    linkedin: "https://www.linkedin.com/in/jadeja-mouryrajsinh-b9250729b",
    github: "#", // Add your GitHub URL
    resumeUrl: "/resume.pdf",
};

// Stats
export const stats = [
    { label: "Years Experience", value: 2, suffix: "+" },
    { label: "Projects Completed", value: 10, suffix: "+" },
    { label: "Technologies", value: 15, suffix: "+" },
    { label: "Coffee Consumed", value: "∞", suffix: "" },
];

// What I Do
export const services = [
    {
        title: "AI & Machine Learning",
        description: "Developing intelligent solutions using NLP, ML algorithms, and data analysis",
        icon: "Brain",
    },
    {
        title: "Full-Stack Development",
        description: "Building modern web applications with React, Next.js, Node.js, and databases",
        icon: "Code",
    },
    {
        title: "Problem Solving",
        description: "Tackling complex challenges with innovative thinking and technical expertise",
        icon: "Puzzle",
    },
];

// Hobbies
export const hobbies = [
    { name: "Solving Cubes", icon: "Dices" },
    { name: "Driving", icon: "Car" },
    { name: "Horse Riding", icon: "Bike" },
    { name: "Outdoors", icon: "Mountain" },
    { name: "Traveling", icon: "Plane" },
];

// Skills
export const skills = {
    aiml: [
        { name: "Python", level: 90 },
        { name: "Machine Learning", level: 85 },
        { name: "NLP", level: 80 },
        { name: "Data Analysis", level: 85 },
    ],
    frontend: [
        { name: "React.js", level: 90 },
        { name: "Next.js", level: 85 },
        { name: "JavaScript", level: 90 },
        { name: "HTML/CSS", level: 95 },
    ],
    backend: [
        { name: "Node.js", level: 80 },
        { name: "PHP", level: 75 },
        { name: "MySQL", level: 85 },
        { name: "Database Design", level: 80 },
    ],
    tools: [
        { name: "Git/GitHub", level: 85 },
        { name: "Digital Marketing", level: 70 },
        { name: "UI/UX", level: 75 },
        { name: "Problem Solving", level: 95 },
    ],
};

// Tech Stack Icons (for display)
export const techStack = [
    "React", "Next.js", "Python", "Node.js", "TypeScript", "JavaScript",
    "PHP", "MySQL", "TensorFlow", "Git", "Tailwind CSS", "Three.js"
];

// Education
export const education = [
    {
        degree: "M.Sc. IT - Artificial Intelligence",
        institution: "Parul University",
        year: "2024 - 2026",
        grade: "CGPA: 7.32/10",
        current: true,
    },
    {
        degree: "B.Sc. IT - Artificial Intelligence",
        institution: "Parul Institute of Computer Application",
        year: "2021 - 2024",
        grade: "CGPA: 7.03/10",
        current: false,
    },
    {
        degree: "12th Grade (HSC)",
        institution: "Delta Science School, Upleta",
        year: "2021",
        grade: "56%",
        current: false,
    },
    {
        degree: "10th Grade (SSC)",
        institution: "Sanskar Vidyalaya, Jamjodhpur",
        year: "2019",
        grade: "56%",
        current: false,
    },
];

// Experience
export const experience = [
    {
        role: "Software Developer Intern",
        company: "Green Global Online",
        duration: "Oct 2023 - Apr 2024",
        description: "Gained hands-on experience in software development, working with JavaScript, PHP, HTML, and networking technologies. Contributed to real-world projects, enhancing management and technical skills.",
        skills: ["JavaScript", "PHP", "HTML", "Networking"],
    },
];

// Training
export const training = [
    {
        title: "Full-Stack Developer Training",
        institution: "Parul Institute of Computer Application",
        duration: "May 2025 - Jul 2025",
        skills: ["Software Development", "Python", "Java", "Advanced Java"],
    },
];

// Achievements
export const achievements = [
    "Java Developer in Forge",
    "Data & Network Management in GTPL",
    "Freelancer in IT",
];

// Projects
export const projects = [
    {
        id: 1,
        title: "Ecom Dropship",
        subtitle: "Modern E-commerce Platform",
        duration: "Sep 2025 - Nov 2025",
        description: "A full-featured dropshipping platform with role-based access for Admin, Seller, and Customer. Features secure authentication, real-time database, and responsive UI.",
        fullDescription: `Ecom Dropship is a comprehensive e-commerce platform built for the modern dropshipping business model. The platform supports multiple user roles including Admin, Seller, and Customer, each with their own dashboard and capabilities.

Key Features:
• Role-based access control with secure authentication
• Real-time inventory management with Supabase
• PayPal payment integration
• Responsive design for all devices
• Admin dashboard for complete platform management
• Seller portal for product and order management
• Customer-friendly shopping experience`,
        tech: ["Next.js", "React", "Supabase", "PayPal", "Tailwind CSS"],
        image: "/projects/ecom-dropship.png",
        liveUrl: "#",
        githubUrl: "#",
        featured: true,
    },
    {
        id: 2,
        title: "Warehouse Administration",
        subtitle: "Inventory Management Solution",
        duration: "Jul 2022 - Oct 2023",
        description: "Comprehensive warehouse management system using AOP principles to optimize inventory costs and improve customer satisfaction with enhanced agility and scalability.",
        fullDescription: `The Warehouse Administration System is an enterprise-grade inventory management solution designed to streamline warehouse operations and reduce overhead costs.

Key Features:
• Aspect-Oriented Programming (AOP) architecture
• Real-time inventory tracking
• Automated stock alerts and reordering
• AI-powered demand forecasting
• Multi-warehouse support
• Comprehensive reporting and analytics
• Role-based access for warehouse staff`,
        tech: ["PHP", "MySQL", "JavaScript", "Java", "AI"],
        image: "/projects/warehouse.png",
        liveUrl: "#",
        githubUrl: "#",
        featured: true,
    },
    {
        id: 3,
        title: "E-commerce Website",
        subtitle: "PHP-Based Online Store",
        duration: "Aug 2022 - Nov 2022",
        description: "Fully operational dropshipping platform that automatically forwards orders to suppliers for direct shipping to customers.",
        fullDescription: `A complete e-commerce dropshipping platform built with PHP and MySQL. The system automates the entire order fulfillment process by seamlessly connecting with suppliers.

Key Features:
• Automated order forwarding to suppliers
• Product catalog management
• Customer account management
• Order tracking system
• Payment gateway integration
• Admin panel for platform management
• Responsive WordPress theme integration`,
        tech: ["PHP", "MySQL", "HTML", "WordPress", "CSS"],
        image: "/projects/ecommerce.png",
        liveUrl: "#",
        githubUrl: "#",
        featured: true,
    },
];

// Navigation Items
export const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
];
