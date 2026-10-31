/**
 * Centralized Portfolio Configuration & Data
 * All verified facts, links, and content are configured here for easy updates.
 */

export const PERSONAL_INFO = {
  name: "Jayraj Singh",
  tagline: "Software Builder & Product Engineer",
  headline: "I build software around real problems.",
  subheadline:
    "Final-year Computer Science student, full-stack engineer, and product builder. I combine algorithmic discipline with product thinking to ship reliable, high-utility web platforms.",
  status: "Available for Software Engineering roles & ambitious product collaborations",
  location: "India",
  email: "jayrajmthakur@gmail.com", // Configurable: Update with your primary inbox
  // Web3Forms configuration:
  // Paste your access key here OR set VITE_WEB3FORMS_ACCESS_KEY in your .env file
  web3FormsAccessKey: "",
  links: {
    github: "https://github.com/raj005-gitH",
    linkedin: "https://www.linkedin.com/in/jayrajsinght",
    leetcode: "https://leetcode.com/u/raj005-leetC/",
    resume: "https://drive.google.com/file/d/1mtGimgnDRADfsenhZGTyURYlePVYuF2O/view",
    legacyPortfolio: "https://www.jayrajsingh.in/"
  },
  // Portrait photo configuration
  // Place your real photo in public/portrait.jpg or src/assets/portrait.jpg
  portraitPath: "/portrait.jpg"
};

export const CORE_VALUES = [
  {
    number: "01",
    title: "Problem-First Discovery",
    tagline: "Understanding the 'Why' Before Writing Code",
    description:
      "Writing code is only the final step. I obsess over the core friction: why does this product need to exist, who feels the pain, and what is the leanest, most reliable way to solve it?"
  },
  {
    number: "02",
    title: "Engineering Discipline",
    tagline: "From Algorithmic Rigor to Scalable Architecture",
    description:
      "300+ LeetCode problems solved isn't just a metric—it's a daily habit of analyzing time/space trade-offs, edge cases, and algorithmic resilience that directly influences how I write backend services and data structures."
  },
  {
    number: "03",
    title: "End-to-End Ownership",
    tagline: "Bridging Backend Schemas to Frontend Polish",
    description:
      "I don't hand off half-finished features. Whether migrating monolithic codebases to Vite for instant HMR or structuring JWT RBAC middleware, I take full responsibility for stability and user delight."
  },
  {
    number: "04",
    title: "Continuous Curiosity",
    tagline: "Building Toward Entrepreneurial Vision",
    description:
      "Software engineering is my technical bedrock. My overarching ambition is to master product strategy, understand customer psychology, and build enduring technology ventures."
  }
];

export const PROJECTS = [
  {
    id: "avoa",
    title: "Avoa",
    tagline: "Travel & Stays Listing Platform",
    category: "Full-Stack Web Platform",
    featured: true,
    image: "/avoa.png",
    liveUrl: "https://avoa.in/",
    githubUrl: "https://github.com/raj005-gitH/Avoa---Find-Your-Next-Stay/",
    statusBadge: "Live Production Platform",
    summary:
      "A complete travel listing marketplace engineered with the MERN stack. Designed with responsive discovery feeds, multi-role listing workflows, authenticated review mechanisms, and a performance-driven React frontend migrated to Vite.",
    metrics: [
      { label: "Frontend Speed", value: "Sub-second HMR & load via Vite" },
      { label: "Architecture", value: "MERN + RESTful Validation" },
      { label: "Auth Flow", value: "JWT Session & Role Management" }
    ],
    techStack: ["React", "Vite", "Node.js", "Express.js", "MongoDB", "JWT", "REST API", "CSS Modules"],
    highlightFeatures: [
      "Migrated the legacy frontend to modern React with Vite, drastically reducing bundle size and build times.",
      "Engineered secure authentication, authorization middlewares, and strict server-side validation schemas.",
      "Developed rich listing management lifecycle (CRUD, geolocation data, photo attachments, and community reviews).",
      "Integrated payment architecture pipelines (Razorpay integration explored in development staging environment)."
    ],
    challengeAndLearnings:
      "Balancing client-side state responsiveness with complex search filtering and server-side validation taught me the importance of normalized state structures and resilient API contract boundaries."
  },
  {
    id: "hukoom",
    title: "Hukoom",
    tagline: "On-Demand Services Marketplace",
    category: "Full-Stack Web Platform",
    featured: true,
    image: "/hukoom.png",
    liveUrl: "https://hukoomweb.vercel.app/",
    githubUrl: "https://github.com/raj005-gitH/Hukoom-Web",
    statusBadge: "Live Prototype",
    summary:
      "A dual-sided service platform bridging local customers with vetted service specialists. Features distinct consumer vs. provider workflows, role-based access control, interactive scheduling logic, and service cataloging.",
    metrics: [
      { label: "Role Division", value: "Customer & Vendor Workflows" },
      { label: "Stack", value: "React + Node.js + Express + MongoDB" },
      { label: "Deployment", value: "Vercel & Cloud Backend" }
    ],
    techStack: ["React", "Node.js", "Express.js", "MongoDB Atlas", "REST API", "Modern CSS"],
    highlightFeatures: [
      "Engineered role-based access control (RBAC) separating customer booking experiences from vendor management dashboards.",
      "Architected scheduling logic endpoints and service catalog schemas for multi-category provider discovery.",
      "Implemented responsive mobile-first UI components ensuring smooth interaction across handheld touchscreens.",
      "Collaborated closely within a team context, strictly isolating personal backend controllers and UI modules."
    ],
    challengeAndLearnings:
      "Designing state synchronization between vendor availability calendars and client booking slots required rigorous concurrency checks and clear status transitions."
  },
  {
    id: "tradeblitz",
    title: "TradeBlitz",
    tagline: "Market Simulation & Algorithmic Tooling",
    category: "Systems & Data Exploration",
    featured: false,
    liveUrl: null, // Exploratory prototype
    githubUrl: "https://github.com/raj005-gitH/TradeBlitz",
    statusBadge: "Engineering Exploration",
    summary:
      "An experimental financial tooling exploration focusing on real-time data feeds, mock order matching logic, and responsive charting interactions.",
    metrics: [
      { label: "Focus", value: "State Performance & Data Visuals" },
      { label: "Complexity", value: "Event Loop & Mock Matching" }
    ],
    techStack: ["JavaScript", "React", "Node.js", "Canvas / Charting"],
    highlightFeatures: [
      "Explored low-latency state updates using event-driven architectures.",
      "Implemented simulated order book transitions and dynamic volume rendering."
    ],
    challengeAndLearnings:
      "Taught valuable lessons in rendering performance optimizations and memory hygiene when receiving rapid event streams."
  }
];

export const ENGINEERING_METRICS = {
  leetcodeCount: "300+",
  leetcodeUrl: "https://leetcode.com/u/raj005-leetC/",
  leetcodeHeadline: "Algorithmic Rigor & Problem Solving",
  leetcodeNote:
    "300+ problems solved across Data Structures & Algorithms (LeetCode profile raj005-leetC). Focused on developing intuitive complexity analysis (O(N) time/space trade-offs) and systematic edge-case debugging.",
  coreSubjects: [
    {
      name: "Data Structures & Algorithms",
      topics: "Arrays, Two-Pointers, Hash Tables, Trees, Graphs, Dynamic Programming, Heaps",
      application: "Writing time/space optimal backend queries and clean data transformation pipelines."
    },
    {
      name: "Object-Oriented Programming (OOP)",
      topics: "Inheritance, Polymorphism, Encapsulation, Abstraction, SOLID Principles",
      application: "Designing modular, testable backend architectures and reusable controller patterns."
    },
    {
      name: "Database Management Systems (DBMS)",
      topics: "Indexing, Normalization, ACID Transactions, Schema Design, SQL & NoSQL queries",
      application: "Structuring high-throughput MongoDB collections, compound indexes, and relational schemas."
    },
    {
      name: "Operating Systems & Networking",
      topics: "Process vs. Thread Concurrency, Memory Management, TCP/IP, HTTP/1.1 & HTTP/2, REST",
      application: "Diagnosing connection bottlenecks, caching layers, and asynchronous event loops."
    },
    {
      name: "System Design Principles",
      topics: "Client-Server Architecture, Caching (Redis concepts), Load Balancing, Rate Limiting",
      application: "Designing reliable REST APIs with sensible rate bounds and error-boundary fallbacks."
    }
  ]
};

export const SKILLS_TOOLKIT = [
  {
    category: "Languages",
    description: "Core programming languages for algorithmic problem solving and web systems.",
    skills: [
      { name: "JavaScript (ES6+)", level: "Primary", context: "Modern async/await, closures, functional array methods, DOM APIs" },
      { name: "Java", level: "Core", context: "Strong OOP principles, DSA implementations, multithreading basics" },
      { name: "C++", level: "Foundation", context: "Algorithmic problem solving, pointer mechanics, STL containers" }
    ]
  },
  {
    category: "Frontend Architecture",
    description: "Modern, component-driven interfaces built for speed, accessibility, and craft.",
    skills: [
      { name: "React.js", level: "Primary", context: "Hooks, custom hooks, context, state orchestration, component lifecycle" },
      { name: "Vite", level: "Primary", context: "Ultra-fast build tooling, HMR, modern bundling configuration" },
      { name: "HTML5 & Modern CSS", level: "Primary", context: "Semantic HTML, Flexbox/Grid, CSS Modules, animations, responsive layouts" },
      { name: "UI/UX & Design Systems", level: "Core", context: "Typography hierarchy, dark-mode aesthetics, micro-interactions, accessibility" }
    ]
  },
  {
    category: "Backend & Systems",
    description: "Robust RESTful services, secure authentication, and data persistence.",
    skills: [
      { name: "Node.js", level: "Primary", context: "Event-driven runtime, asynchronous I/O, backend application logic" },
      { name: "Express.js", level: "Primary", context: "Routing, middleware architecture, error handling, rate limiting" },
      { name: "REST API Design", level: "Primary", context: "HTTP verbs, status codes, payload validation, clean endpoints" },
      { name: "Authentication (JWT)", level: "Core", context: "Token-based auth, protected routes, bcrypt hashing, role enforcement" }
    ]
  },
  {
    category: "Databases & Cloud",
    description: "Data modeling, schema design, and production deployment environments.",
    skills: [
      { name: "MongoDB & Mongoose", level: "Primary", context: "Document schema modeling, validation, aggregation pipelines" },
      { name: "SQL", level: "Core", context: "Relational queries, JOIN operations, foreign keys, normalization" },
      { name: "MongoDB Atlas", level: "Core", context: "Cloud cluster configuration, network access, database user management" },
      { name: "Render & Vercel", level: "Core", context: "CI/CD deployment for full-stack Node.js backends and Vite frontends" }
    ]
  },
  {
    category: "Dev Tools & Workflow",
    description: "Essential tooling for version control, API testing, and daily engineering.",
    skills: [
      { name: "Git & GitHub", level: "Primary", context: "Feature branches, pull requests, merge conflict resolution, repo management" },
      { name: "Postman", level: "Primary", context: "API endpoint testing, environment variables, payload mock assertions" },
      { name: "npm / modern package ecosystem", level: "Primary", context: "Dependency auditing, scripts, package management" }
    ]
  }
];

export const EDUCATION_DATA = {
  degree: "Bachelor of Technology (B.Tech) in Computer Science & Engineering",
  institution: "Dr. A.P.J. Abdul Kalam Technical University (AKTU)",
  duration: "August 2023 – August 2027",
  status: "Final-Year Student",
  cgpa: "7.42 / 10.00",
  cgpaNote: "Cumulative Grade Point Average verified through sixth semester",
  highlights: [
    "Core focus on Systems Engineering, Algorithmic Analysis, and Operating Systems.",
    "Active participant in technical workshops, peer coding sessions, and software hackathons.",
    "Balancing rigorous academic coursework with self-directed full-stack product building."
  ]
};
