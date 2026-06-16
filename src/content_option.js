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
    aboutme: "I am a dedicated full-stack developer based in Bengaluru, specializing in modern web technologies and mobile app development. With a passion for clean code and user-centric design, I strive to build efficient and scalable solutions that make a difference.",
};
const worktimeline = [{
        jobtitle: "Designer of week",
        where: "YAdfi",
        date: "2020",
    },
    {
        jobtitle: "Designer of week",
        where: "Jamalya",
        date: "2019",
    },
    {
        jobtitle: "Designer of week",
        where: "ALquds",
        date: "2019",
    },
];

const skills = [
    {
        name: "Javascript",
        value: 85,
    },
    {
        name: "React",
        value: 90,
    },{
        name: "Python",
        value: 80,
    },
    {
        name: "Django",
        value: 70,
    },
    
    {
        name: "Spring Boot",
        value: 70,
    },{
        name: "MySQL",
        value: 70,
    },{
        name: "MongoDB",
        value: 70,
    }
];

const services = [{
        title: "UI & UX Design",
        description: "Creating intuitive and visually appealing user interfaces with a focus on user experience and modern design principles.",
    },
    {
        title: "Mobile Apps",
        description: "Developing cross-platform mobile applications using React Native and other modern frameworks for seamless user experiences.",
    },
    {
        title: "Wordpress Design",
        description: "Building custom WordPress websites with responsive design, SEO optimization, and tailored functionality to meet client needs.",
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
    YOUR_EMAIL: "sonicc12866@gmail.com",
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
// Resume URL from environment variable
const resume = process.env.REACT_APP_RESUME_URL || "/resume.pdf";
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
};