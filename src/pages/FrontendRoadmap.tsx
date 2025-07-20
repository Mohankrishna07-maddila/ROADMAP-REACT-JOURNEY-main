import React from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const roadmapData = {
  frontend: {
    title: "Frontend Developer Roadmap",
    banner: "/roadmaps/4320250207131454.png",
    roadmapImg: "/roadmaps/WhatsApp Image 2025-07-19 at 10.34.22 PM.jpeg",
    summary:
      "Frontend development means designing the face of a website or application. It involves working on the appearance, interactivity, and user experience of web pages using technologies like HTML, CSS, and JavaScript. Frontend developers are in high demand and enjoy lucrative career opportunities.",
    steps: [
      { title: "Basics of Computer", description: "Understand computer fundamentals for a smooth journey into web development." },
      { title: "Internet and Web", description: "Learn how the internet and web work, as they are the foundation of web applications." },
      { title: "Programming: HTML, CSS, JavaScript, TypeScript", description: "Master the building blocks of the web: HTML for structure, CSS for style, JavaScript for interactivity, and TypeScript for type safety." },
      { title: "Frameworks: React, Angular, Vue", description: "Learn popular frontend frameworks to build scalable and maintainable applications." },
      { title: "Version Control System", description: "Use Git and platforms like GitHub to manage and collaborate on code." },
      { title: "Build Projects", description: "Apply your knowledge by building real-world projects and portfolios." },
    ],
  },
  backend: {
    title: "Backend Developer Roadmap",
    banner: "/roadmaps/backend_banner.jpeg",
    roadmapImg: "/roadmaps/backend_roadmap.jpeg",
    summary:
      "Backend development focuses on server-side logic, databases, APIs, and application architecture. Backend developers build and maintain the core functional logic and operations of a web application, ensuring scalability, security, and performance.",
    steps: [
      { title: "Programming Languages", description: "Learn backend languages such as Node.js, Python, Java, Ruby, or PHP." },
      { title: "Databases", description: "Understand relational (MySQL, PostgreSQL) and NoSQL (MongoDB) databases." },
      { title: "APIs & Frameworks", description: "Build RESTful APIs using frameworks like Express, Django, Rails, or Laravel." },
      { title: "Authentication & Security", description: "Implement authentication, authorization, and security best practices." },
      { title: "Version Control & Deployment", description: "Use Git for version control and deploy applications using cloud services or platforms like Heroku, AWS, or DigitalOcean." },
      { title: "Testing & Monitoring", description: "Write tests and monitor application health and performance." },
    ],
  },
  "full-stack": {
    title: "Full Stack Developer Roadmap",
    banner: "/roadmaps/fullstack_banner.jpeg",
    roadmapImg: "/roadmaps/fullstack_roadmap.jpeg",
    summary:
      "Full stack development combines both frontend and backend skills, enabling developers to build complete web applications from user interface to server logic and databases. Full stack developers are versatile and can handle all layers of a web project.",
    steps: [
      { title: "Frontend Skills", description: "Master HTML, CSS, JavaScript, and frontend frameworks like React, Angular, or Vue." },
      { title: "Backend Skills", description: "Learn backend languages (Node.js, Python, Java, etc.) and frameworks (Express, Django, etc.)." },
      { title: "Databases", description: "Work with both SQL (MySQL, PostgreSQL) and NoSQL (MongoDB) databases." },
      { title: "APIs", description: "Build and consume RESTful and GraphQL APIs." },
      { title: "Version Control & Deployment", description: "Use Git for version control and deploy full stack apps to cloud platforms." },
      { title: "DevOps & Testing", description: "Understand CI/CD, containerization (Docker), and write tests for your applications." },
    ],
  },
  mobile: {
    title: "Mobile Developer Roadmap",
    banner: "/roadmaps/mobiledeveloper_banner.jpeg",
    roadmapImg: "/roadmaps/andrioddevelopment_roadmap.jpeg",
    summary:
      "Mobile development focuses on building applications for mobile devices using platforms like Android and iOS. Mobile developers need to understand platform-specific languages, UI/UX design, APIs, and deployment to app stores.",
    steps: [
      { title: "Programming Languages", description: "Learn Java, Kotlin (Android), or Swift (iOS) for native app development." },
      { title: "Development Tools", description: "Get familiar with Android Studio, Xcode, and emulators/simulators." },
      { title: "UI/UX Design", description: "Understand mobile UI/UX principles and platform-specific guidelines." },
      { title: "APIs & Data Storage", description: "Work with REST APIs, local databases (SQLite, Room), and cloud storage." },
      { title: "Testing & Debugging", description: "Write unit and UI tests, and use debugging tools effectively." },
      { title: "Deployment", description: "Publish apps to Google Play Store or Apple App Store." },
    ],
  },
  "data-science": {
    title: "Data Science Roadmap",
    banner: "/roadmaps/datascience_banner.jpeg",
    roadmapImg: "/roadmaps/datascience_roadmap.jpeg",
    summary:
      "Data science is an interdisciplinary field that uses scientific methods, algorithms, and systems to extract knowledge and insights from structured and unstructured data. Data scientists combine skills in programming, mathematics, and domain expertise to analyze data, build predictive models, and drive decision-making. If you enjoy working with data, solving problems, and uncovering patterns, data science is a rewarding and high-impact career path.",
    steps: [
      { title: "Mathematics & Statistics", description: "Master linear algebra, calculus, probability, and statistics for data analysis and modeling." },
      { title: "Programming", description: "Learn Python and R, and use libraries like NumPy, pandas, and scikit-learn for data manipulation and machine learning." },
      { title: "Data Visualization", description: "Use tools like Tableau, Power BI, or matplotlib to visualize and communicate insights from data." },
      { title: "Machine Learning & Deep Learning", description: "Build predictive models using supervised and unsupervised learning, and explore deep learning with neural networks." },
      { title: "Natural Language Processing", description: "Work with text data, classification, and word vectors for NLP tasks." },
      { title: "Deployment & Cloud", description: "Deploy models using cloud platforms (AWS, Azure, GCP) and frameworks like Flask or Django." },
    ],
  },
  cybersecurity: {
    title: "Cybersecurity Roadmap",
    banner: "/roadmaps/cyber_banner.jpeg",
    roadmapImg: "/roadmaps/cyber_roadmap.jpeg",
    summary:
      "Cybersecurity is the practice of protecting systems, networks, and data from digital attacks. Cybersecurity professionals identify vulnerabilities, defend against threats, and respond to incidents to ensure the safety and privacy of information. If you are interested in problem-solving, critical thinking, and safeguarding technology, cybersecurity offers a dynamic and impactful career path.",
    steps: [
      { title: "Fundamentals & Networking", description: "Learn the basics of computer networks, protocols, and security principles." },
      { title: "Security Tools & Techniques", description: "Get hands-on with firewalls, intrusion detection systems, and encryption." },
      { title: "Threat Detection & Response", description: "Understand how to detect, respond to, and recover from security incidents." },
      { title: "Penetration Testing & Vulnerability Assessment", description: "Learn to identify and exploit vulnerabilities ethically to improve security." },
      { title: "Compliance & Risk Management", description: "Study security policies, compliance standards, and risk assessment." },
      { title: "Career Pathways", description: "Explore roles such as analyst, engineer, architect, and consultant at various levels." },
    ],
  },
  uiux: {
    title: "UI/UX Design Roadmap",
    banner: "/roadmaps/uiux_banner.jpeg",
    roadmapImg: "/roadmaps/uiux_roadmap.jpeg",
    summary:
      "UI/UX design focuses on creating user-friendly, visually appealing, and effective digital experiences. UI (User Interface) designers work on the look and feel of a product, while UX (User Experience) designers ensure the product is easy to use and meets user needs. If you enjoy creativity, empathy, and problem-solving, UI/UX design is a rewarding and impactful career path.",
    steps: [
      { title: "Learn the Fundamentals", description: "Understand the basics of design principles, color theory, and typography." },
      { title: "Design Tools", description: "Get hands-on with tools like Adobe XD, Sketch, and Figma for creating designs." },
      { title: "User Testing", description: "Learn to test your designs with real users using tools like Hotjar and Maze." },
      { title: "Wireframing", description: "Create wireframes and prototypes using Moqups and UXPin." },
      { title: "Prototyping", description: "Build interactive prototypes with Webflow and Flinto." },
      { title: "Visual Design", description: "Enhance your designs with tools like Adobe and Canva." },
      { title: "Create Portfolio", description: "Showcase your work and land your first job or freelance project." },
    ],
  },
  "digital-marketing": {
    title: "Digital Marketing Roadmap",
    banner: "/roadmaps/digitalmarketing_banner.jpeg",
    roadmapImg: "/roadmaps/digitalmarketing_roadmap.jpeg",
    summary:
      "Digital marketing is the practice of promoting products or services using digital channels such as search engines, social media, email, and websites. Digital marketers use a variety of strategies and tools to reach audiences, drive traffic, and achieve business goals. If you enjoy creativity, analytics, and working with technology, digital marketing is a dynamic and rewarding field.",
    steps: [
      { title: "Reflect", description: "Define your company values, understand your goals, and create a client avatar." },
      { title: "Build/Create", description: "Research topics, create content, build forms, and write blog posts." },
      { title: "Educate", description: "Share your story, grow your network, and educate at every opportunity." },
      { title: "Promote", description: "Direct traffic, run ads, and search for more opportunities to boost exposure." },
      { title: "Manage", description: "Continue to share valuable content and use tools to measure and manage results." },
    ],
  },
  devops: {
    title: "DevOps Roadmap",
    banner: "/roadmaps/devopsbanner.jpeg",
    roadmapImg: "/roadmaps/devops_roadmap.jpeg",
    summary:
      "DevOps is a set of practices that combines software development (Dev) and IT operations (Ops) to shorten the development lifecycle and deliver high-quality software continuously. DevOps engineers automate processes, manage infrastructure, and ensure smooth collaboration between development and operations teams. If you enjoy automation, problem-solving, and working with cloud and infrastructure tools, DevOps is a fast-growing and rewarding field.",
    steps: [
      { title: "Version Control & Collaboration", description: "Master Git, GitHub, and GitLab for source control and team collaboration." },
      { title: "Continuous Integration & Delivery (CI/CD)", description: "Set up automated pipelines using Jenkins, GitLab CI, or similar tools." },
      { title: "Cloud Platforms", description: "Work with AWS, Azure, or Google Cloud for scalable infrastructure." },
      { title: "Containerization & Orchestration", description: "Use Docker for containers and Kubernetes for orchestration." },
      { title: "Configuration Management", description: "Automate infrastructure with Ansible, Chef, or similar tools." },
      { title: "Monitoring & Logging", description: "Monitor systems and applications using Grafana, Graylog, and other tools." },
    ],
  },
  "ml-engineer": {
    title: "Machine Learning Engineer Roadmap",
    banner: "/roadmaps/ml_banner.jpeg",
    roadmapImg: "/roadmaps/ml_roadmap.jpeg",
    summary:
      "Machine learning engineers build systems that can learn from data and make predictions or decisions. This field combines programming, mathematics, and domain expertise to create intelligent applications. If you enjoy working with algorithms, data, and solving real-world problems, machine learning is an exciting and impactful career path.",
    steps: [
      { title: "Maths & Statistics", description: "Master the fundamentals of mathematics and statistics for ML algorithms." },
      { title: "Python Programming", description: "Learn Python and its ecosystem for data science and machine learning." },
      { title: "SQL & Database", description: "Work with SQL and databases to manage and query data." },
      { title: "Data Science Tools", description: "Use tools like Anaconda, Jupyter, and others for data analysis." },
      { title: "Data Science Libraries", description: "Utilize libraries like Pandas, NumPy, and Matplotlib for data manipulation and visualization." },
      { title: "Machine Learning Concepts", description: "Understand supervised, unsupervised, and reinforcement learning." },
      { title: "ML Advanced Libraries", description: "Work with Scikit-learn, NLTK, OpenCV, and other advanced libraries." },
      { title: "Deep Learning Concepts", description: "Learn about neural networks and deep learning principles." },
      { title: "Deep Learning Frameworks", description: "Use TensorFlow, PyTorch, and similar frameworks for deep learning projects." },
      { title: "Real World Projects & Competitions", description: "Participate in Kaggle competitions and build real-world ML projects." },
      { title: "Soft Skills", description: "Develop communication, teamwork, and problem-solving skills." },
      { title: "Resume & Job Prep", description: "Prepare your resume and apply for ML engineering jobs." },
    ],
  },
  // Add more paths here (backend, data-science, etc.)
};

export default function CareerRoadmap() {
  const { path } = useParams();
  const data = roadmapData[path] || roadmapData["frontend"];
  return (
    <div className="container mx-auto py-8">
      <motion.h1 initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-3xl font-bold mb-4 text-center">{data.title}</motion.h1>
      <motion.img src={data.banner} alt={data.title + " Banner"} className="w-full max-w-2xl mx-auto rounded shadow-lg mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }} />
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }} className="mb-8 text-lg text-center">
        {data.summary}
      </motion.p>
      <motion.img src={data.roadmapImg} alt={data.title + " Visual Roadmap"} className="w-full max-w-2xl mx-auto rounded shadow-lg mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.8 }} />
      <div className="space-y-8 max-w-2xl mx-auto">
        {data.steps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 + idx * 0.2, duration: 0.6 }}
            className="p-6 bg-white rounded-lg shadow-md border-l-4 border-primary"
          >
            <h2 className="text-xl font-semibold mb-2">{step.title}</h2>
            <p className="text-gray-700">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 