const logotext = "Srikanth";
const meta = {
    title: "Yepalagunta Srikanth",
    description: "I’m Yepalagunta Srikanth Full stack developer,currently working in Bengaluru. I love to create simple yet beautiful websites with great user experience.",
};

const introdata = {
    title: "I’m Yepalagunta Srikanth",
    animated: {
        first: "I love coding",
        second: "I develop web apps",
        third: "I design cool websites",
    },
    description: "Passionate full-stack developer with expertise in creating dynamic web applications and mobile apps. Let's build something amazing together.",
    your_img_url: "https://images.unsplash.com/photo-1514790193030-c89d266d5a9d",
};

const dataabout = {
    title: "a bit about myself",
    aboutme: "Software Engineer with experience in Warehouse Management Systems (WMS), Inventory & Order Management. Skilled in building microservices and RESTful APIs with Java and Spring Boot, and responsive frontends using React.js and Redux. Experienced in database design with MySQL and applying best practices across the SDLC.",
};
const worktimeline = [
    {
        jobtitle: "Software Engineer",
        where: "Vyshnavi Information Technologies Pvt Ltd",
        date: "January 2024 – Present",
    },
    {
        jobtitle: "Software Engineer Trainee",
        where: "Vyshnavi Information Technologies Pvt Ltd",
        date: "July 2023 – December 2023",
    },
];

const skills = [
    { name: "Microservices", value: 0 },
    { name: "Java", value: 0 },
    { name: "JavaScript (ES6+)", value: 0 },
    { name: "SQL", value: 0 },
    { name: "HTML5", value: 0 },
    { name: "CSS3", value: 0 },
    { name: "Spring Boot", value: 0 },
    { name: "Spring Security", value: 0 },
    { name: "Spring Data JPA", value: 0 },
    { name: "Hibernate", value: 0 },
    { name: "RESTful APIs", value: 0 },
    { name: "Microservices", value: 0 },
    { name: "React.js", value: 0 },
    { name: "Redux", value: 0 },
    { name: "Bootstrap", value: 0 },
    { name: "Material UI", value: 0 },
    { name: "Axios", value: 0 },
    { name: "MySQL", value: 0 },
    { name: "Git", value: 0 },
    { name: "GitHub", value: 0 },
    { name: "Maven", value: 0 },
    { name: "IntelliJ IDEA", value: 0 },
    { name: "VS Code", value: 0 },
    { name: "WMS (Warehouse Management Systems)", value: 0 },
    { name: "Inventory & Order Management", value: 0 },
    { name: "SDLC", value: 0 },
];

// Grouped skills for compact display
const skillGroups = {
    Core: ["Microservices", "Java", "JavaScript (ES6+)", "React.js", "Spring Boot", "SQL", "Git"],
    Backend: ["Spring Security", "Spring Data JPA", "Hibernate", "RESTful APIs", "Microservices"],
    Frontend: ["Redux", "Bootstrap", "Material UI", "Axios", "HTML5", "CSS3"],
    Tools: ["MySQL", "Maven", "IntelliJ IDEA", "VS Code", "GitHub"],
    Domains: ["WMS (Warehouse Management Systems)", "Inventory & Order Management", "SDLC"],
};

const services = [
    {
        title: "Microservices Architecture",
        description:
            "Design and implement microservices-based systems using Java and Spring Boot, including service decomposition, inter-service communication patterns, and resilience.",
    },
    {
        title: "Backend Development",
        description:
            "Build robust RESTful APIs and backend services with Spring Boot, Spring Security, Spring Data JPA and Hibernate; focus on scalability, security, and maintainability.",
    },
    {
        title: "Frontend Development",
        description:
            "Develop performant, responsive single-page applications using React.js, Redux, Bootstrap/Material UI and Axios for API integration.",
    },
    {
        title: "WMS & Inventory Solutions",
        description:
            "Implement warehouse management features (receiving, put-away, picking, packing, shipping) and integrate inventory/order workflows with existing systems.",
    },
    {
        title: "Database Design & Optimization",
        description:
            "Design relational schemas, optimize MySQL queries and indexing strategies, and improve data access performance with Spring Data JPA.",
    },
    {
        title: "DevOps & CI/CD",
        description:
            "Automate builds and deployments using Maven and CI/CD pipelines; provide basic containerization and deployment guidance.",
    },
    {
        title: "Consulting & SDLC Support",
        description:
            "Requirements analysis, architecture reviews, code reviews, and agile delivery support to help teams ship reliable software.",
    },
];

const dataportfolio = [{
        img: "https://picsum.photos/400/?grayscale",
        description: "The wisdom of life consists in the elimination of non-essentials.",
        link: "#",
    },
    {
        img: "https://picsum.photos/400/800/?grayscale",
        description: "The wisdom of life consists in the elimination of non-essentials.",
        link: "#",
    },
    {
        img: "https://picsum.photos/400/?grayscale",
        description: "The wisdom of life consists in the elimination of non-essentials.",
        link: "#",
    },
    {
        img: "https://picsum.photos/400/600/?grayscale",
        description: "The wisdom of life consists in the elimination of non-essentials.",
        link: "#",
    },
    {
        img: "https://picsum.photos/400/300/?grayscale",
        description: "The wisdom of life consists in the elimination of non-essentials.",
        link: "#",
    },
    {
        img: "https://picsum.photos/400/700/?grayscale",
        description: "The wisdom of life consists in the elimination of non-essentials.",
        link: "#",
    },

    {
        img: "https://picsum.photos/400/600/?grayscale",
        description: "The wisdom of life consists in the elimination of non-essentials.",
        link: "#",
    },
    {
        img: "https://picsum.photos/400/300/?grayscale",
        description: "The wisdom of life consists in the elimination of non-essentials.",
        link: "#",
    },
    {
        img: "https://picsum.photos/400/?grayscale",
        description: "The wisdom of life consists in the elimination of non-essentials.",
        link: "#",
    },
    {
        img: "https://picsum.photos/400/550/?grayscale",
        description: "The wisdom of life consists in the elimination of non-essentials.",
        link: "#",
    },
    {
        img: "https://picsum.photos/400/?grayscale",
        description: "The wisdom of life consists in the elimination of non-essentials.",
        link: "#",
    },
    {
        img: "https://picsum.photos/400/700/?grayscale",
        description: "The wisdom of life consists in the elimination of non-essentials.",
        link: "#",
    },
];

const contactConfig = {
    YOUR_EMAIL: "srikanthy12866@gmail.com",
    description: "Feel free to reach out for collaborations, projects, or just to say hello! I'm always excited to discuss new opportunities and ideas.",
    // creat an emailjs.com account 
    // check out this tutorial https://www.emailjs.com/docs/examples/reactjs/
    YOUR_SERVICE_ID: "service_97daj3d",
    YOUR_TEMPLATE_ID: "template_lfinicu",
    YOUR_USER_ID: "RJ9FjqHZA0HsapsnE",
};

const socialprofils = {
    github: "https://github.com/Srikanthy12866?tab=repositories",
    facebook: "https://www.facebook.com/srikanth12866/?locale=en_GB",
    linkedin: "https://www.linkedin.com/in/sri12866/",
    instagram: "https://www.instagram.com/sri.12866/"
};
// Resume URL from environment variable (Google Drive file ID)
const resume = import.meta.env.VITE_RESUME_URL || "";
export {
    meta,
    dataabout,
    dataportfolio,
    worktimeline,
    skills,
    services,
    introdata,
    contactConfig,
    socialprofils,
    logotext,
    resume,
    skillGroups,
};