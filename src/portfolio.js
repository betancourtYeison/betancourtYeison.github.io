/* Change this file to get your personal Portfolio */

// To change portfolio colors globally go to the  _globalColor.scss file

import splashAnimation from "./assets/lottie/splashAnimation"; // Rename to your file name for custom animation

// Vite replacement for CRA's require(): every image/PDF under assets is
// resolved to its final URL, and asset("./assets/…") looks it up.
const assetUrls = import.meta.glob("./assets/{images,resources,cv}/**/*", {
  eager: true,
  query: "?url",
  import: "default"
});
const asset = path => assetUrls[path];

// Splash Screen

const splashScreen = {
  enabled: true, // set false to disable splash screen
  animation: splashAnimation,
  duration: 2000 // Set animation duration as per your animation
};

// Summary And Greeting Section

const illustration = {
  animated: true // Set to false to use static SVG
};

const greeting = {
  username: "betancourtYeison",
  title: "Hi all, I'm Yeison",
  subTitle:
    "Senior Software Engineer with 9+ years building web and mobile applications with JavaScript, TypeScript, React, React Native and Node.js. I lead features end to end for international clients and enjoy turning complex problems into simple, polished products. 🚀",
  resumeLink: asset("./assets/cv/CV-YeisonBetancourtSolis-EN.pdf"), // Set to empty to hide the button
  displayGreeting: true // Set false to hide this section, defaults to true
};

// Social Media Links

const socialMediaLinks = {
  github: "https://github.com/betancourtYeison",
  linkedin: "https://www.linkedin.com/in/betancourtYeison/",
  outlook: "yeisonbe10@hotmail.com",
  gmail: "yeisonbe4@gmail.com",
  // gitlab: "https://gitlab.com/betancourtYeison",
  facebook: "https://www.facebook.com/betancourtYeison",
  instagram: "https://www.instagram.com/betancourtyeison/",
  twitter: "https://twitter.com/betancourtYei",
  // medium: "https://medium.com/@betancourtYeison",
  // stackoverflow: "https://stackoverflow.com/users/10422806/saad-pasta",
  // Instagram, Twitter and Kaggle are also supported in the links!
  // To customize icons and social links, tweak src/components/SocialMedia
  display: true // Set true to display this section, defaults to false
};

// Skills Section

const skillsSection = {
  title: "My expertise",
  subTitle:
    "DYNAMIC FULL STACK DEVELOPER 🚀 WITH A HUNGER TO EXPLORE EVERY TECH STACKS",
  skills: [
    "⚡ Develop highly interactive Front end / User Interfaces for your web and mobile applications",
    "⚡ Implement efficient backend solutions for robust system architecture and data management",
    "⚡ Integration of third party services such as AWS / Firebase / Stripe"
  ],

  /* `icon` keys map to react-icons components in
     src/components/softwareSkills/SoftwareSkill.jsx — add new entries there */

  softwareSkills: [
    {
      category: "Frontend",
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
      category: "Mobile",
      skills: [
        {skillName: "React Native", icon: "react"},
        {skillName: "Flutter", icon: "flutter"}
      ]
    },
    {
      category: "Backend",
      skills: [
        {skillName: "Node.js", icon: "nodejs"},
        {skillName: "NestJS", icon: "nestjs"},
        {skillName: "GraphQL", icon: "graphql"},
        {skillName: "PHP", icon: "php"},
        {skillName: "Python", icon: "python"}
      ]
    },
    {
      category: "Cloud & DevOps",
      skills: [
        {skillName: "AWS", icon: "aws"},
        {skillName: "Firebase", icon: "firebase"},
        {skillName: "Docker", icon: "docker"},
        {skillName: "Git", icon: "git"},
        {skillName: "GitHub", icon: "github"},
        {skillName: "Bitbucket", icon: "bitbucket"}
      ]
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Education Section

const educationInfo = {
  display: true, // Set false to hide this section, defaults to true
  schools: [
    {
      schoolName: "Universidad del Valle",
      logo: asset("./assets/images/univalleWhiteLogo.png"),
      subHeader: "Information Systems Engineering",
      duration: "2016",
      desc: "",
      descBullets: []
    },
    {
      schoolName: "Tulio Enrique Tascón",
      logo: asset("./assets/images/tetLogo.jpeg"),
      subHeader: "Secondary education",
      duration: "2010",
      desc: "",
      descBullets: []
    }
  ]
};

// Your top 3 proficient stacks/tech experience

const techStack = {
  viewSkillBars: false, // Hidden: percentage bars read as arbitrary — stack chips per role tell more (Fase 3)
  experience: [
    {
      Stack: "Frontend/Design", //Insert stack or technology you have experience in
      progressPercentage: "90%" //Insert relative proficiency in percentage
    },
    {
      Stack: "Backend",
      progressPercentage: "70%"
    },
    {
      Stack: "Programming",
      progressPercentage: "95%"
    }
  ],
  displayCodersrank: false // Set true to display codersrank badges section need to changes your username in src/containers/skillProgress/skillProgress.js:17:62, defaults to false
};

// Work experience section

const workExperiences = {
  display: true, //Set it to true to show workExperiences Section
  experience: [
    {
      role: "Senior Software Engineer",
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
      ],
      desc: "As an experienced developer, I emphasize my pivotal role in international web and mobile projects. I specialize in innovating the Backend, optimizing efficiency to meet the needs of global clients. In mobile applications, I lead the development of advanced features to ensure engaging and functional experiences. My expertise includes the integration of advanced technologies, keeping applications aligned with the latest trends. Additionally, I have successfully implemented CI/CD through AppCenter, ensuring efficiency in software delivery. My proficiency extends to expert migrations, showcasing advanced technical skills and the ability to manage changes seamlessly."
    },
    {
      role: "Software Engineer",
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
      ],
      desc: "As a passionate application developer, I took pride in highlighting my key contributions to internationally-focused web and mobile projects, led the development of solutions for global clients, optimized CMS functionality on an international scale, and enriched mobile application experiences for diverse and culturally varied audiences."
    },
    {
      role: "Development Engineer",
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
      ],
      desc: "With a strong background as a web and mobile application developer, my focus is on creating and continually enhancing innovative digital experiences. My notable contributions involve leading the development of cutting-edge applications, optimizing the CMS by introducing exciting features, and consistently innovating in mobile applications to improve user experience and adopt cutting-edge technologies."
    },
    {
      role: "Development Engineer",
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
      ],
      desc: "As a passionate application developer, I have been a key driver in the development and implementation of innovative solutions for web and mobile applications. My focus stands out in leading creative and high-performance projects, effectively executing assigned tasks, continuously improving the CMS through the development of new features, constant innovation in mobile applications, and successfully mastering React Native to create new applications. This showcases my expertise in cutting-edge technologies and adaptability to new tools."
    },
    {
      role: "Development Engineer",
      company: "ArquitecSOFT",
      companylogo: asset("./assets/images/arquitecSOFTLogo.png"),
      date: "September 2015 – August 2016",
      stack: ["Java", "Oracle ADF", "Oracle DB"],
      desc: "As an application developer, I have played an essential role in the creation and continuous improvement of applications, excelling in various areas. This includes the efficient execution of new requirements with a proactive approach, detailed analysis and design of specialized solutions for Oracle databases, expertise in advanced technologies such as Java forms with Oracle's ADF, active collaboration and support for the business team, as well as the meticulous creation of test plans to ensure the robustness and effectiveness of the developed requirements."
    }
  ]
};

/* Your Open Source Section to View Your Github Pinned Projects
To know how to get github key look at readme.md */

const openSource = {
  showGithubProfile: "true", // Set true or false to show Contact profile using Github, defaults to true
  display: true // Set false to hide this section, defaults to true
};

// Some big projects you have worked on

const bigProjects = {
  title: "Big Projects",
  subtitle: "SOME STARTUPS AND COMPANIES THAT I HELPED TO CREATE THEIR TECH",
  projects: [
    {
      image: asset("./assets/images/gideonsLogo.png"),
      projectName: "The Gideons International",
      projectDesc:
        "I played a key role in developing the Gideon Bible app, offering free access to Scripture in multiple languages. The app provides adapted excerpts and audio for reading and listening, facilitating sharing in various languages. Users can easily search for Bibles by language or country, with versatile language options for a diverse and accessible experience",
      footerLink: [
        {
          name: "Visit Website",
          url: "https://www.gideons.org/"
        }
        //  you can add extra buttons here.
      ]
    },
    {
      image: asset("./assets/images/scoutIQLogo.png"),
      projectName: "ScoutIQ",
      projectDesc:
        "I contributed to ScoutIQ's development, a dynamic retail arbitrage software for Amazon sellers. The innovative Team Mode enables efficient team management through a web portal, fostering collaboration and productivity in finding profitable opportunities.",
      footerLink: [
        {
          name: "Visit Website",
          url: "https://www.scoutiq.co/"
        }
        //  you can add extra buttons here.
      ]
    },
    {
      image: asset("./assets/images/monettaLogo.png"),
      projectName: "Monetta",
      projectDesc:
        "I led the development of an advanced digital wallet with a proprietary token, seamlessly integrating Polygon and blockchain. This empowers users for effortless transactions, limitless currency conversions, and global usability. The project includes Android and iOS apps and a robust CMS for comprehensive functionality.",
      footerLink: [
        {
          name: "Visit Website",
          url: "https://www.monetta.app/"
        }
        //  you can add extra buttons here.
      ]
    },
    {
      image: asset("./assets/images/obtenMasLogo.png"),
      projectName: "ObtenMás",
      projectDesc:
        "I contributed to Obtén Más, a user-friendly digital wallet consolidating voucher and social program cards. Effortlessly add beneficiaries, make 100% digital QR payments, and seamlessly track and manage expenses",
      footerLink: [
        {
          name: "Visit Website",
          url: "https://obtenmas.com/"
        }
      ]
    },
    {
      image: asset("./assets/images/daviviendaLogo.png"),
      projectName: "Davivienda CMS",
      projectDesc:
        "As a developer at Davivienda, I contributed to innovative solutions, including a proprietary CMS for efficient geolocation management on a customer-facing map, simplifying the discovery of offices, ATMs, and more.",
      footerLink: [
        {
          name: "Visit Website",
          url: "https://www.davivienda.com/"
        }
      ]
    },
    {
      image: asset("./assets/images/daviviendaLogo.png"),
      projectName: "Davivienda Map",
      projectDesc:
        "In my role as a developer at Davivienda, I was instrumental in creating a comprehensive map for Davivienda to aid bank customers in locating branches, ATMs, and other essential services, providing detailed information on services, operating hours, and directions to each designated location.",
      footerLink: [
        {
          name: "Visit Website",
          url: "https://www.davivienda.com/wps/portal/personas/nuevo#iframe"
        }
      ]
    },
    {
      image: asset("./assets/images/daviplataLogo.png"),
      projectName: "Daviplata Map",
      projectDesc:
        "In my role as a developer at Daviplata, I played a key role in developing a map feature for the Daviplata digital wallet, enabling users to easily find points for cash transactions, product purchases, and QR-based payments.",
      footerLink: [
        {
          name: "Visit Website",
          url: "https://www.daviplata.com/wps/portal/daviplata/Home/"
        }
      ]
    },
    {
      image: asset("./assets/images/owoLogo.png"),
      projectName: "OWO App",
      projectDesc:
        "I contributed to the development of OWO, a mobile application revolutionizing recharge and collection processes. Users can conveniently top up their balance through PSE or at over 10,000 physical points across our nationwide network of partners. Offering seamless mobile recharges for any telecom operator in Colombia, the app provides a diverse range of tailored packages.",
      footerLink: [
        {
          name: "Visit Website",
          url: "https://owo.com.co/"
        }
      ]
    },
    {
      image: asset("./assets/images/rsalesLogo.png"),
      projectName: "R-Sales",
      projectDesc:
        "As a key contributor to the company, I played a pivotal role in the development of an Android application and CMS. The CMS effectively configures diverse functionalities within the application, enabling precise parameterization of its usage. This dynamic application serves as a robust tool for managing field workers, facilitating real-time monitoring of routes, tracking orders, and seamlessly managing the schedules and agendas of the workforce.",
      footerLink: [
        {
          name: "Visit Website",
          url: "https://adatec.co/r-sales/"
        }
      ]
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Achievement Section
// Include certificates, talks etc

const achievementSection = {
  title: "Achievements And Certifications 🏆 ",
  subtitle:
    "Achievements, Certifications, Award Letters and Some Cool Stuff that I have done !",
  achievementsCards: [
    {
      title: "Udemy",
      subtitle: "Udemy certificates for completing the courses",
      image: asset("./assets/images/udemyLogo.png"),
      imageAlt: "Certifications Udemy",
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
      title: "Apollo",
      subtitle:
        "Certificate earned for completing the course, now skilled in GraphQL, Apollo Boost, Relay, and efficient web app development.",
      image: asset("./assets/images/apolloLogo.png"),
      imageAlt: "Certification Apollo",
      footerLink: [
        {
          name: "Certification",
          url: asset("./assets/resources/apollo/apolloCertified.pdf")
        }
      ]
    },
    {
      title: "React Query",
      subtitle:
        "Dev/Talles Certificate for completing the course 'Powerful Asynchronous State Management. 2023",
      image: asset("./assets/images/devTallesLogo.png"),
      imageAlt: "Certification React Query",
      footerLink: [
        {
          name: "Certification",
          url: asset("./assets/resources/devTalles/reactQueryCertified.pdf")
        }
      ]
    },
    {
      title: "Machine Learning",
      subtitle:
        "For participating in the Bootcamp Machine Learning 2021 - 2022",
      image: asset("./assets/images/fullstacklabsLogo.png"),
      imageAlt: "Certification Machine Learning",
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
      title: "ICESI",
      subtitle:
        "Certificate from ICESI awarded for completing the Information Security diploma.",
      image: asset("./assets/images/icesiLogo.png"),
      imageAlt: "Certification ICESI",
      footerLink: [
        {
          name: "Certification",
          url: asset("./assets/resources/icesi/securityCertified.jpg")
        }
      ]
    },
    {
      title: "System Engineer",
      subtitle:
        "As a Systems Engineering graduate from the University of Valle, I specialize in ethical, environmental, and culturally aware project development. Proficient in software development, human-computer interaction design, and computer research, I demonstrate autonomous learning skills for ongoing professional growth.",
      image: asset("./assets/images/univalleLogo.png"),
      imageAlt: "Certification Univalle",
      footerLink: [
        {
          name: "Certification",
          url: asset("./assets/resources/univalle/univalle.png")
        }
      ]
    },
    {
      title: "Platzi",
      subtitle: "Platzi certificates for completing the courses",
      image: asset("./assets/images/platziLogo.png"),
      imageAlt: "Certification Platzi",
      footerLink: [
        {
          name: "Programación Básica",
          url: asset("./assets/resources/platzi/basic.pdf")
        }
      ]
    },
    {
      title: "Sena",
      subtitle: "Sena certificates for completing the courses",
      image: asset("./assets/images/senaLogo.png"),
      imageAlt: "Certification Sena",
      footerLink: [
        {
          name: "English",
          url: asset("./assets/resources/sena/english1.pdf")
        },
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
        {
          name: "C++ II",
          url: asset("./assets/resources/sena/c++2.pdf")
        },
        {
          name: "C++ I",
          url: asset("./assets/resources/sena/c++1.pdf")
        }
      ]
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Blogs Section

const blogSection = {
  title: "Blogs",
  subtitle:
    "With Love for Developing cool stuff, I love to write and teach others what I have learnt.",
  displayMediumBlogs: "false", // Set true to display fetched medium blogs instead of hardcoded ones
  blogs: [
    {
      url: "https://www.fullstacklabs.co/blog/airbnbs-lottie-library-adobe-after-effects-animations-and-react-native",
      title: "Airbnb's Lottie: After Effects Animations and React Native",
      description:
        "Explore an easy-to-follow tutorial for crafting a React Native application enriched with animations, leveraging third-party libraries like Lottie."
    }
  ],
  display: false // Set false to hide this section, defaults to true
};

// Talks Sections

const talkSection = {
  title: "TALKS",
  subtitle: "I LOVE TO SHARE MY LIMITED KNOWLEDGE AND GET A SPEAKER BADGE 😅",
  talks: [],
  display: false // Set false to hide this section, defaults to true
};

// Podcast Section

const podcastSection = {
  title: "Podcast 🎙️",
  subtitle: "I LOVE TO TALK ABOUT MYSELF AND TECHNOLOGY",

  // Please Provide with Your Podcast embeded Link
  podcast: [],
  display: false // Set false to hide this section, defaults to true
};

const contactInfo = {
  title: "Contact Me ☎️",
  subtitle:
    "Discuss a project or just want to say hi? My Inbox is open for all.",
  number: "+57-3162793738",
  email_address: "yeisonbe10@hotmail.com"
};

const isHireable = true; // Set false if you are not looking for a job. Also isHireable will be display as Open for opportunities: Yes/No in the GitHub footer

export {
  illustration,
  greeting,
  socialMediaLinks,
  splashScreen,
  skillsSection,
  educationInfo,
  techStack,
  workExperiences,
  openSource,
  bigProjects,
  achievementSection,
  blogSection,
  talkSection,
  podcastSection,
  contactInfo,
  isHireable
};
