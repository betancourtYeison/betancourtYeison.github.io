/* Bilingual (EN/ES) portfolio content.

   Structure:
   - Language-INDEPENDENT data (assets, logos, dates, URLs, tech stacks,
     social links, display flags) is defined ONCE below.
   - Language-DEPENDENT text lives in `content.en` / `content.es`.
   - getPortfolio(lang) assembles the full portfolio object for a language,
     merging shared structural data with the per-language text.

   To change colors globally go to the _globalColor.scss file. */

import splashAnimation from "./assets/lottie/splashAnimation";

// Vite replacement for CRA's require(): every image/PDF under assets is
// resolved to its final URL, and asset("./assets/…") looks it up.
const assetUrls = import.meta.glob("./assets/{images,resources,cv}/**/*", {
  eager: true,
  query: "?url",
  import: "default"
});
const asset = path => assetUrls[path];

export const LANGUAGES = ["en", "es"];
export const DEFAULT_LANGUAGE = "en";

// Pick the initial language from the browser, falling back to English.
export const detectLanguage = () => {
  if (typeof navigator === "undefined") {
    return DEFAULT_LANGUAGE;
  }
  const nav = (
    navigator.language ||
    navigator.userLanguage ||
    ""
  ).toLowerCase();
  return nav.startsWith("es") ? "es" : "en";
};

// ---------------------------------------------------------------------------
// Language-independent data
// ---------------------------------------------------------------------------

const username = "betancourtYeison";
const resumeLink = asset("./assets/cv/CV-YeisonBetancourtSolis-EN.pdf");

const illustration = {animated: true};

const splashScreen = {
  enabled: true,
  animation: splashAnimation,
  duration: 2000
};

const socialMediaLinks = {
  github: "https://github.com/betancourtYeison",
  linkedin: "https://www.linkedin.com/in/betancourtYeison/",
  outlook: "yeisonbe10@hotmail.com",
  gmail: "yeisonbe4@gmail.com",
  facebook: "https://www.facebook.com/betancourtYeison",
  instagram: "https://www.instagram.com/betancourtyeison/",
  twitter: "https://twitter.com/betancourtYei",
  display: true
};

const openSource = {showGithubProfile: "true", display: true};

const techStack = {
  viewSkillBars: false,
  experience: [
    {Stack: "Frontend/Design", progressPercentage: "90%"},
    {Stack: "Backend", progressPercentage: "70%"},
    {Stack: "Programming", progressPercentage: "95%"}
  ],
  displayCodersrank: false
};

const isHireable = true;

// `icon` keys map to react-icons components in
// src/components/softwareSkills/SoftwareSkill.jsx. `categoryKey` is
// translated per language (see content.*.categories).
const softwareSkillGroups = [
  {
    categoryKey: "frontend",
    skills: [
      {skillName: "HTML5", icon: "html5"},
      {skillName: "CSS3", icon: "css"},
      {skillName: "Sass", icon: "sass"},
      {skillName: "JavaScript", icon: "javascript"},
      {skillName: "TypeScript", icon: "typescript"},
      {skillName: "React", icon: "react"},
      {skillName: "Next.js", icon: "nextjs"},
      {skillName: "Angular", icon: "angular"},
      {skillName: "Vue.js", icon: "vuejs"}
    ]
  },
  {
    categoryKey: "mobile",
    skills: [
      {skillName: "React Native", icon: "react"},
      {skillName: "Flutter", icon: "flutter"}
    ]
  },
  {
    categoryKey: "backend",
    skills: [
      {skillName: "Node.js", icon: "nodejs"},
      {skillName: "NestJS", icon: "nestjs"},
      {skillName: "GraphQL", icon: "graphql"},
      {skillName: "PHP", icon: "php"},
      {skillName: "Python", icon: "python"}
    ]
  },
  {
    categoryKey: "devops",
    skills: [
      {skillName: "AWS", icon: "aws"},
      {skillName: "Firebase", icon: "firebase"},
      {skillName: "Docker", icon: "docker"},
      {skillName: "Git", icon: "git"},
      {skillName: "GitHub", icon: "github"},
      {skillName: "Bitbucket", icon: "bitbucket"}
    ]
  }
];

// Work experience: shared meta; roles/descriptions are per language.
const experienceMeta = [
  {
    company: "Fullstack Labs",
    companylogo: asset("./assets/images/fullstacklabsWhiteLogo.png"),
    date: "August 2021 – Present",
    stack: [
      "TypeScript",
      "React",
      "React Native",
      "Next.js",
      "NestJS",
      "Node.js",
      "Flutter",
      "Redux",
      "MongoDB",
      "MySQL",
      "DynamoDB"
    ]
  },
  {
    company: "Fullstack Labs",
    companylogo: asset("./assets/images/fullstacklabsWhiteLogo.png"),
    date: "September 2019 – August 2021",
    stack: [
      "JavaScript",
      "TypeScript",
      "React",
      "React Native",
      "Node.js",
      "Redux",
      "MongoDB",
      "MySQL"
    ]
  },
  {
    company: "CETOCO SAS",
    companylogo: asset("./assets/images/cetocoLogo.png"),
    date: "February 2019 - September 2019",
    stack: [
      "JavaScript",
      "TypeScript",
      "React",
      "React Native",
      "Redux",
      ".NET",
      "Node.js",
      "MongoDB",
      "MySQL"
    ]
  },
  {
    company: "Adatec",
    companylogo: asset("./assets/images/adatecLogo.png"),
    date: "August 2016 - February 2019",
    stack: [
      "JavaScript",
      "TypeScript",
      "Angular",
      "React Native",
      "Python",
      "Django",
      "MongoDB",
      "MySQL"
    ]
  },
  {
    company: "ArquitecSOFT",
    companylogo: asset("./assets/images/arquitecSOFTLogo.png"),
    date: "September 2015 – August 2016",
    stack: ["Java", "Oracle ADF", "Oracle DB"]
  }
];

// Big projects: shared meta (image, name, url); descriptions per language.
const projectMeta = [
  {
    image: asset("./assets/images/gideonsLogo.png"),
    projectName: "The Gideons International",
    url: "https://www.gideons.org/"
  },
  {
    image: asset("./assets/images/scoutIQLogo.png"),
    projectName: "ScoutIQ",
    url: "https://www.scoutiq.co/"
  },
  {
    image: asset("./assets/images/monettaLogo.png"),
    projectName: "Monetta",
    url: "https://www.monetta.app/"
  },
  {
    image: asset("./assets/images/obtenMasLogo.png"),
    projectName: "ObtenMás",
    url: "https://obtenmas.com/"
  },
  {
    image: asset("./assets/images/daviviendaLogo.png"),
    projectName: "Davivienda CMS",
    url: "https://www.davivienda.com/"
  },
  {
    image: asset("./assets/images/daviviendaLogo.png"),
    projectName: "Davivienda Map",
    url: "https://www.davivienda.com/wps/portal/personas/nuevo#iframe"
  },
  {
    image: asset("./assets/images/daviplataLogo.png"),
    projectName: "Daviplata Map",
    url: "https://www.daviplata.com/wps/portal/daviplata/Home/"
  },
  {
    image: asset("./assets/images/owoLogo.png"),
    projectName: "OWO App",
    url: "https://owo.com.co/"
  },
  {
    image: asset("./assets/images/rsalesLogo.png"),
    projectName: "R-Sales",
    url: "https://adatec.co/r-sales/"
  }
];

// Achievements: shared meta (image, alt, footer links); title/subtitle per
// language. Footer link names are course/proper names, kept as-is.
const achievementMeta = [
  {
    image: asset("./assets/images/udemyLogo.png"),
    imageAlt: "Udemy",
    footerLink: [
      {
        name: "Angular Deep Dive 18",
        url: asset("./assets/resources/udemy/angularDeepDive18Certified.pdf")
      },
      {
        name: "Unity Video Games",
        url: asset("./assets/resources/udemy/unityCertified.pdf")
      },
      {
        name: "PHP from Scratch",
        url: asset("./assets/resources/udemy/phpFromScratchCertified.pdf")
      },
      {
        name: "Angular Master",
        url: asset("./assets/resources/udemy/angular15Certified.pdf")
      },
      {
        name: "React Developer",
        url: asset("./assets/resources/udemy/reactDeveloperCertified.pdf")
      },
      {
        name: "Leadership Skills",
        url: asset(
          "./assets/resources/udemy/practicalLeadershipSkillsCertified.pdf"
        )
      },
      {
        name: "Liderazgo",
        url: asset("./assets/resources/udemy/leadershipCertified.pdf")
      },
      {
        name: "Master CI/CD",
        url: asset("./assets/resources/udemy/masterCICDCertified.pdf")
      }
    ]
  },
  {
    image: asset("./assets/images/apolloLogo.png"),
    imageAlt: "Apollo",
    footerLink: [
      {
        name: "Certification",
        url: asset("./assets/resources/apollo/apolloCertified.pdf")
      }
    ]
  },
  {
    image: asset("./assets/images/devTallesLogo.png"),
    imageAlt: "React Query",
    footerLink: [
      {
        name: "Certification",
        url: asset("./assets/resources/devTalles/reactQueryCertified.pdf")
      }
    ]
  },
  {
    image: asset("./assets/images/fullstacklabsLogo.png"),
    imageAlt: "Machine Learning",
    footerLink: [
      {
        name: "Certification",
        url: asset(
          "./assets/resources/fullstacklabs/machileLearningCertified.pdf"
        )
      }
    ]
  },
  {
    image: asset("./assets/images/icesiLogo.png"),
    imageAlt: "ICESI",
    footerLink: [
      {
        name: "Certification",
        url: asset("./assets/resources/icesi/securityCertified.jpg")
      }
    ]
  },
  {
    image: asset("./assets/images/univalleLogo.png"),
    imageAlt: "Universidad del Valle",
    footerLink: [
      {
        name: "Certification",
        url: asset("./assets/resources/univalle/univalle.png")
      }
    ]
  },
  {
    image: asset("./assets/images/platziLogo.png"),
    imageAlt: "Platzi",
    footerLink: [
      {
        name: "Programación Básica",
        url: asset("./assets/resources/platzi/basic.pdf")
      }
    ]
  },
  {
    image: asset("./assets/images/senaLogo.png"),
    imageAlt: "Sena",
    footerLink: [
      {name: "English", url: asset("./assets/resources/sena/english1.pdf")},
      {
        name: "Database SQL",
        url: asset("./assets/resources/sena/databaseSQL.pdf")
      },
      {
        name: "HTML JavaScript",
        url: asset("./assets/resources/sena/htmlJavaScript.pdf")
      },
      {
        name: "Arquitectura",
        url: asset("./assets/resources/sena/architecture.pdf")
      },
      {name: "C++ II", url: asset("./assets/resources/sena/c++2.pdf")},
      {name: "C++ I", url: asset("./assets/resources/sena/c++1.pdf")}
    ]
  }
];

const educationMeta = [
  {
    schoolName: "Universidad del Valle",
    logo: asset("./assets/images/univalleWhiteLogo.png"),
    duration: "2016"
  },
  {
    schoolName: "Tulio Enrique Tascón",
    logo: asset("./assets/images/tetLogo.jpeg"),
    duration: "2010"
  }
];

// ---------------------------------------------------------------------------
// Per-language text
// ---------------------------------------------------------------------------

const content = {
  en: {
    ui: {
      navExperience: "Work Experience",
      navProjects: "Featured Projects",
      navSkills: "Tech Skills",
      navCertifications: "Certifications",
      navContact: "Get in Touch",
      openToOpportunities: "Open to opportunities",
      contactMe: "Contact me",
      seeResume: "See my resume",
      experiencesHeading: "Experiences",
      educationHeading: "Education",
      openSourceProjects: "Open Source Projects",
      moreProjects: "More Projects",
      reachOut: "Reach Out to me!",
      visitWebsite: "Visit Website",
      madeWith: "Made with ❤️ by Yeison Betancourt Solís",
      copyright: "Copyright 2026",
      languageName: "EN"
    },
    greetingTitle: "Hi all, I'm Yeison",
    greetingSubtitle:
      "Senior Software Engineer with 9+ years building web and mobile applications with JavaScript, TypeScript, React, React Native and Node.js. I lead features end to end for international clients and enjoy turning complex problems into simple, polished products. 🚀",
    skillsTitle: "My expertise",
    skillsSubtitle:
      "DYNAMIC FULL STACK DEVELOPER 🚀 WITH A HUNGER TO EXPLORE EVERY TECH STACKS",
    skillsBullets: [
      "⚡ Develop highly interactive Front end / User Interfaces for your web and mobile applications",
      "⚡ Implement efficient backend solutions for robust system architecture and data management",
      "⚡ Integration of third party services such as AWS / Firebase / Stripe"
    ],
    categories: {
      frontend: "Frontend",
      mobile: "Mobile",
      backend: "Backend",
      devops: "Cloud & DevOps"
    },
    experienceRoles: [
      "Senior Software Engineer",
      "Software Engineer",
      "Development Engineer",
      "Development Engineer",
      "Development Engineer"
    ],
    experienceDescs: [
      "As an experienced developer, I emphasize my pivotal role in international web and mobile projects. I specialize in innovating the Backend, optimizing efficiency to meet the needs of global clients. In mobile applications, I lead the development of advanced features to ensure engaging and functional experiences. My expertise includes the integration of advanced technologies, keeping applications aligned with the latest trends. Additionally, I have successfully implemented CI/CD through AppCenter, ensuring efficiency in software delivery. My proficiency extends to expert migrations, showcasing advanced technical skills and the ability to manage changes seamlessly.",
      "As a passionate application developer, I took pride in highlighting my key contributions to internationally-focused web and mobile projects, led the development of solutions for global clients, optimized CMS functionality on an international scale, and enriched mobile application experiences for diverse and culturally varied audiences.",
      "With a strong background as a web and mobile application developer, my focus is on creating and continually enhancing innovative digital experiences. My notable contributions involve leading the development of cutting-edge applications, optimizing the CMS by introducing exciting features, and consistently innovating in mobile applications to improve user experience and adopt cutting-edge technologies.",
      "As a passionate application developer, I have been a key driver in the development and implementation of innovative solutions for web and mobile applications. My focus stands out in leading creative and high-performance projects, effectively executing assigned tasks, continuously improving the CMS through the development of new features, constant innovation in mobile applications, and successfully mastering React Native to create new applications. This showcases my expertise in cutting-edge technologies and adaptability to new tools.",
      "As an application developer, I have played an essential role in the creation and continuous improvement of applications, excelling in various areas. This includes the efficient execution of new requirements with a proactive approach, detailed analysis and design of specialized solutions for Oracle databases, expertise in advanced technologies such as Java forms with Oracle's ADF, active collaboration and support for the business team, as well as the meticulous creation of test plans to ensure the robustness and effectiveness of the developed requirements."
    ],
    bigProjectsTitle: "Big Projects",
    bigProjectsSubtitle:
      "SOME STARTUPS AND COMPANIES THAT I HELPED TO CREATE THEIR TECH",
    projectDescs: [
      "I played a key role in developing the Gideon Bible app, offering free access to Scripture in multiple languages. The app provides adapted excerpts and audio for reading and listening, facilitating sharing in various languages. Users can easily search for Bibles by language or country, with versatile language options for a diverse and accessible experience",
      "I contributed to ScoutIQ's development, a dynamic retail arbitrage software for Amazon sellers. The innovative Team Mode enables efficient team management through a web portal, fostering collaboration and productivity in finding profitable opportunities.",
      "I led the development of an advanced digital wallet with a proprietary token, seamlessly integrating Polygon and blockchain. This empowers users for effortless transactions, limitless currency conversions, and global usability. The project includes Android and iOS apps and a robust CMS for comprehensive functionality.",
      "I contributed to Obtén Más, a user-friendly digital wallet consolidating voucher and social program cards. Effortlessly add beneficiaries, make 100% digital QR payments, and seamlessly track and manage expenses",
      "As a developer at Davivienda, I contributed to innovative solutions, including a proprietary CMS for efficient geolocation management on a customer-facing map, simplifying the discovery of offices, ATMs, and more.",
      "In my role as a developer at Davivienda, I was instrumental in creating a comprehensive map for Davivienda to aid bank customers in locating branches, ATMs, and other essential services, providing detailed information on services, operating hours, and directions to each designated location.",
      "In my role as a developer at Daviplata, I played a key role in developing a map feature for the Daviplata digital wallet, enabling users to easily find points for cash transactions, product purchases, and QR-based payments.",
      "I contributed to the development of OWO, a mobile application revolutionizing recharge and collection processes. Users can conveniently top up their balance through PSE or at over 10,000 physical points across our nationwide network of partners. Offering seamless mobile recharges for any telecom operator in Colombia, the app provides a diverse range of tailored packages.",
      "As a key contributor to the company, I played a pivotal role in the development of an Android application and CMS. The CMS effectively configures diverse functionalities within the application, enabling precise parameterization of its usage. This dynamic application serves as a robust tool for managing field workers, facilitating real-time monitoring of routes, tracking orders, and seamlessly managing the schedules and agendas of the workforce."
    ],
    achievementsTitle: "Achievements And Certifications 🏆",
    achievementsSubtitle:
      "Achievements, Certifications, Award Letters and Some Cool Stuff that I have done !",
    achievementCards: [
      {
        title: "Udemy",
        subtitle: "Udemy certificates for completing the courses"
      },
      {
        title: "Apollo",
        subtitle:
          "Certificate earned for completing the course, now skilled in GraphQL, Apollo Boost, Relay, and efficient web app development."
      },
      {
        title: "React Query",
        subtitle:
          "Dev/Talles Certificate for completing the course 'Powerful Asynchronous State Management'. 2023"
      },
      {
        title: "Machine Learning",
        subtitle:
          "For participating in the Bootcamp Machine Learning 2021 - 2022"
      },
      {
        title: "ICESI",
        subtitle:
          "Certificate from ICESI awarded for completing the Information Security diploma."
      },
      {
        title: "System Engineer",
        subtitle:
          "As a Systems Engineering graduate from the University of Valle, I specialize in ethical, environmental, and culturally aware project development. Proficient in software development, human-computer interaction design, and computer research, I demonstrate autonomous learning skills for ongoing professional growth."
      },
      {
        title: "Platzi",
        subtitle: "Platzi certificates for completing the courses"
      },
      {title: "Sena", subtitle: "Sena certificates for completing the courses"}
    ],
    educationSubHeaders: [
      "Information Systems Engineering",
      "Secondary education"
    ],
    contactTitle: "Contact Me ☎️",
    contactSubtitle:
      "Discuss a project or just want to say hi? My Inbox is open for all.",
    blogsTitle: "Blogs",
    blogsSubtitle:
      "With Love for Developing cool stuff, I love to write and teach others what I have learnt.",
    talksTitle: "TALKS",
    talksSubtitle:
      "I LOVE TO SHARE MY LIMITED KNOWLEDGE AND GET A SPEAKER BADGE 😅",
    podcastTitle: "Podcast 🎙️",
    podcastSubtitle: "I LOVE TO TALK ABOUT MYSELF AND TECHNOLOGY"
  },

  es: {
    ui: {
      navExperience: "Experiencia",
      navProjects: "Proyectos Destacados",
      navSkills: "Habilidades",
      navCertifications: "Certificaciones",
      navContact: "Contáctame",
      openToOpportunities: "Abierto a oportunidades",
      contactMe: "Contáctame",
      seeResume: "Ver mi CV",
      experiencesHeading: "Experiencia",
      educationHeading: "Educación",
      openSourceProjects: "Proyectos Open Source",
      moreProjects: "Más Proyectos",
      reachOut: "¡Contáctame!",
      visitWebsite: "Visitar sitio",
      madeWith: "Hecho con ❤️ por Yeison Betancourt Solís",
      copyright: "Copyright 2026",
      languageName: "ES"
    },
    greetingTitle: "Hola, soy Yeison",
    greetingSubtitle:
      "Ingeniero de Software Senior con más de 9 años construyendo aplicaciones web y móviles con JavaScript, TypeScript, React, React Native y Node.js. Lidero funcionalidades de principio a fin para clientes internacionales y disfruto convirtiendo problemas complejos en productos simples y pulidos. 🚀",
    skillsTitle: "Mi especialidad",
    skillsSubtitle:
      "DESARROLLADOR FULL STACK DINÁMICO 🚀 CON GANAS DE EXPLORAR TODOS LOS STACKS TECNOLÓGICOS",
    skillsBullets: [
      "⚡ Desarrollo interfaces de usuario / front-end altamente interactivas para tus aplicaciones web y móviles",
      "⚡ Implemento soluciones backend eficientes para una arquitectura robusta y una buena gestión de datos",
      "⚡ Integración de servicios de terceros como AWS / Firebase / Stripe"
    ],
    categories: {
      frontend: "Frontend",
      mobile: "Móvil",
      backend: "Backend",
      devops: "Cloud y DevOps"
    },
    experienceRoles: [
      "Ingeniero de Software Senior",
      "Ingeniero de Software",
      "Ingeniero de Desarrollo",
      "Ingeniero de Desarrollo",
      "Ingeniero de Desarrollo"
    ],
    experienceDescs: [
      "Como desarrollador con amplia experiencia, destaco mi papel clave en proyectos web y móviles internacionales. Me especializo en innovar el Backend, optimizando la eficiencia para satisfacer las necesidades de clientes globales. En aplicaciones móviles, lidero el desarrollo de funcionalidades avanzadas para garantizar experiencias atractivas y funcionales. Mi experiencia incluye la integración de tecnologías avanzadas, manteniendo las aplicaciones alineadas con las últimas tendencias. Además, he implementado con éxito CI/CD mediante AppCenter, asegurando eficiencia en la entrega de software. Mi destreza se extiende a migraciones expertas, demostrando habilidades técnicas avanzadas y la capacidad de gestionar cambios sin problemas.",
      "Como desarrollador de aplicaciones apasionado, me enorgullece destacar mis contribuciones clave a proyectos web y móviles con enfoque internacional: lideré el desarrollo de soluciones para clientes globales, optimicé la funcionalidad del CMS a escala internacional y enriquecí la experiencia de las aplicaciones móviles para audiencias diversas y culturalmente variadas.",
      "Con una sólida trayectoria como desarrollador de aplicaciones web y móviles, me enfoco en crear y mejorar continuamente experiencias digitales innovadoras. Mis contribuciones destacan por liderar el desarrollo de aplicaciones de vanguardia, optimizar el CMS incorporando nuevas funcionalidades e innovar constantemente en aplicaciones móviles para mejorar la experiencia del usuario y adoptar tecnologías de punta.",
      "Como desarrollador de aplicaciones apasionado, he sido un motor clave en el desarrollo e implementación de soluciones innovadoras para aplicaciones web y móviles. Mi enfoque destaca por liderar proyectos creativos y de alto rendimiento, ejecutar eficazmente las tareas asignadas, mejorar continuamente el CMS mediante el desarrollo de nuevas funcionalidades, innovar constantemente en aplicaciones móviles y dominar React Native para crear nuevas aplicaciones, demostrando mi experiencia en tecnologías de punta y mi adaptabilidad a nuevas herramientas.",
      "Como desarrollador de aplicaciones, he desempeñado un papel esencial en la creación y mejora continua de aplicaciones, destacando en diversas áreas: ejecución eficiente de nuevos requerimientos con enfoque proactivo, análisis y diseño detallado de soluciones especializadas en bases de datos Oracle, dominio de tecnologías avanzadas como formularios Java con ADF de Oracle, colaboración activa y soporte al equipo de negocio, y la creación meticulosa de planes de prueba para garantizar la robustez y efectividad de los requerimientos desarrollados."
    ],
    bigProjectsTitle: "Proyectos Destacados",
    bigProjectsSubtitle:
      "ALGUNAS STARTUPS Y EMPRESAS A LAS QUE AYUDÉ A CONSTRUIR SU TECNOLOGÍA",
    projectDescs: [
      "Tuve un papel clave en el desarrollo de la app Gideon Bible, que ofrece acceso gratuito a las Escrituras en varios idiomas. La app brinda extractos adaptados y audio para leer y escuchar, facilitando compartir en distintos idiomas. Los usuarios pueden buscar Biblias por idioma o país, con opciones versátiles para una experiencia diversa y accesible.",
      "Contribuí al desarrollo de ScoutIQ, un software dinámico de arbitraje minorista para vendedores de Amazon. Su innovador Modo Equipo permite una gestión eficiente a través de un portal web, fomentando la colaboración y la productividad al encontrar oportunidades rentables.",
      "Lideré el desarrollo de una billetera digital avanzada con un token propio, integrando Polygon y blockchain de forma fluida. Esto permite a los usuarios realizar transacciones sin esfuerzo, conversiones de moneda ilimitadas y uso a nivel global. El proyecto incluye apps para Android e iOS y un CMS robusto con funcionalidad integral.",
      "Contribuí a Obtén Más, una billetera digital fácil de usar que consolida bonos y tarjetas de programas sociales. Agrega beneficiarios sin esfuerzo, realiza pagos QR 100% digitales y haz seguimiento y gestión de gastos de forma sencilla.",
      "Como desarrollador en Davivienda, contribuí a soluciones innovadoras, incluido un CMS propio para la gestión eficiente de geolocalización en un mapa de cara al cliente, simplificando el descubrimiento de oficinas, cajeros y más.",
      "En mi rol como desarrollador en Davivienda, fui clave en la creación de un mapa integral para ayudar a los clientes del banco a ubicar sucursales, cajeros y otros servicios esenciales, con información detallada sobre servicios, horarios y direcciones de cada punto.",
      "En mi rol como desarrollador en Daviplata, tuve un papel clave en el desarrollo de una función de mapa para la billetera digital Daviplata, permitiendo a los usuarios encontrar fácilmente puntos para transacciones en efectivo, compras y pagos con QR.",
      "Contribuí al desarrollo de OWO, una aplicación móvil que revoluciona los procesos de recarga y recaudo. Los usuarios pueden recargar su saldo mediante PSE o en más de 10.000 puntos físicos de nuestra red nacional de aliados. Con recargas móviles para cualquier operador en Colombia, la app ofrece una amplia variedad de paquetes a la medida.",
      "Como colaborador clave de la empresa, tuve un papel fundamental en el desarrollo de una aplicación Android y su CMS. El CMS configura diversas funcionalidades dentro de la aplicación, permitiendo una parametrización precisa de su uso. Esta aplicación dinámica es una herramienta robusta para gestionar trabajadores de campo, facilitando el monitoreo en tiempo real de rutas, el seguimiento de pedidos y la gestión de horarios y agendas del personal."
    ],
    achievementsTitle: "Logros y Certificaciones 🏆",
    achievementsSubtitle:
      "Logros, certificaciones, cartas de reconocimiento y otras cosas geniales que he hecho.",
    achievementCards: [
      {
        title: "Udemy",
        subtitle: "Certificados de Udemy por completar los cursos"
      },
      {
        title: "Apollo",
        subtitle:
          "Certificado obtenido por completar el curso; ahora con conocimientos en GraphQL, Apollo Boost, Relay y desarrollo web eficiente."
      },
      {
        title: "React Query",
        subtitle:
          "Certificado de Dev/Talles por completar el curso 'Powerful Asynchronous State Management'. 2023"
      },
      {
        title: "Machine Learning",
        subtitle:
          "Por participar en el Bootcamp de Machine Learning 2021 - 2022"
      },
      {
        title: "ICESI",
        subtitle:
          "Certificado de ICESI por completar el diplomado en Seguridad de la Información."
      },
      {
        title: "Ingeniero de Sistemas",
        subtitle:
          "Como egresado de Ingeniería de Sistemas de la Universidad del Valle, me especializo en el desarrollo de proyectos con conciencia ética, ambiental y cultural. Con dominio en desarrollo de software, diseño de interacción humano-computador e investigación en computación, demuestro capacidad de aprendizaje autónomo para un crecimiento profesional continuo."
      },
      {
        title: "Platzi",
        subtitle: "Certificados de Platzi por completar los cursos"
      },
      {
        title: "Sena",
        subtitle: "Certificados del Sena por completar los cursos"
      }
    ],
    educationSubHeaders: [
      "Ingeniería de Sistemas de Información",
      "Educación secundaria"
    ],
    contactTitle: "Contáctame ☎️",
    contactSubtitle:
      "¿Quieres hablar de un proyecto o simplemente saludar? Mi bandeja de entrada está abierta para todos.",
    blogsTitle: "Blogs",
    blogsSubtitle:
      "Con amor por desarrollar cosas geniales, me encanta escribir y enseñar a otros lo que he aprendido.",
    talksTitle: "CHARLAS",
    talksSubtitle:
      "ME ENCANTA COMPARTIR MI CONOCIMIENTO Y GANAR UNA INSIGNIA DE PONENTE 😅",
    podcastTitle: "Podcast 🎙️",
    podcastSubtitle: "ME ENCANTA HABLAR SOBRE MÍ Y LA TECNOLOGÍA"
  }
};

// ---------------------------------------------------------------------------
// Assembler
// ---------------------------------------------------------------------------

export function getPortfolio(lang) {
  const t = content[lang] || content[DEFAULT_LANGUAGE];

  return {
    ui: t.ui,
    illustration,
    splashScreen,
    socialMediaLinks,
    openSource,
    techStack,
    isHireable,

    greeting: {
      username,
      title: t.greetingTitle,
      subTitle: t.greetingSubtitle,
      resumeLink,
      displayGreeting: true
    },

    skillsSection: {
      title: t.skillsTitle,
      subTitle: t.skillsSubtitle,
      skills: t.skillsBullets,
      softwareSkills: softwareSkillGroups.map(group => ({
        category: t.categories[group.categoryKey],
        skills: group.skills
      })),
      display: true
    },

    workExperiences: {
      display: true,
      experience: experienceMeta.map((meta, i) => ({
        ...meta,
        role: t.experienceRoles[i],
        desc: t.experienceDescs[i]
      }))
    },

    bigProjects: {
      title: t.bigProjectsTitle,
      subtitle: t.bigProjectsSubtitle,
      display: true,
      projects: projectMeta.map((meta, i) => ({
        image: meta.image,
        projectName: meta.projectName,
        projectDesc: t.projectDescs[i],
        footerLink: [{name: t.ui.visitWebsite, url: meta.url}]
      }))
    },

    achievementSection: {
      title: t.achievementsTitle,
      subtitle: t.achievementsSubtitle,
      display: true,
      achievementsCards: achievementMeta.map((meta, i) => ({
        title: t.achievementCards[i].title,
        subtitle: t.achievementCards[i].subtitle,
        image: meta.image,
        imageAlt: meta.imageAlt,
        footerLink: meta.footerLink
      }))
    },

    educationInfo: {
      display: true,
      schools: educationMeta.map((meta, i) => ({
        schoolName: meta.schoolName,
        logo: meta.logo,
        subHeader: t.educationSubHeaders[i],
        duration: meta.duration,
        desc: "",
        descBullets: []
      }))
    },

    blogSection: {
      title: t.blogsTitle,
      subtitle: t.blogsSubtitle,
      displayMediumBlogs: "false",
      blogs: [],
      display: false
    },

    talkSection: {
      title: t.talksTitle,
      subtitle: t.talksSubtitle,
      talks: [],
      display: false
    },

    podcastSection: {
      title: t.podcastTitle,
      subtitle: t.podcastSubtitle,
      podcast: [],
      display: false
    },

    contactInfo: {
      title: t.contactTitle,
      subtitle: t.contactSubtitle,
      number: "+57-3162793738",
      email_address: "yeisonbe10@hotmail.com"
    }
  };
}
