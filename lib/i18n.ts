export const LOCALES = ["en", "es"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export function isValidLocale(locale: string): locale is Locale {
  return LOCALES.includes(locale as Locale);
}

export const translations = {
  en: {
    nav: {
      about: "About",
      expertise: "Expertise",
      work: "Work",
      experience: "Experience",
      blog: "Blog",
      contact: "Contact",
      shippingStatus: "Shipping side projects",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    hero: {
      typewriter: "Software Engineer — Backend · Fintech · ML",
      description:
        "Engineer obsessed with how things connect — from distributed architectures to financial flows across borders. With 4+ years in fintech and systems spanning 15+ countries, I build infrastructure that moves money across borders.",
      viewWork: "View my work ↓",
      getInTouch: "Get in touch",
      scroll: "SCROLL",
    },
    about: {
      sectionLabel: "About",
      headline1: "Not just what I build,",
      headline2: "but how I think.",
    },
    expertise: {
      sectionLabel: "Expertise",
      headline1: "What I bring",
      headline2: "to the table.",
      description:
        "Deep backend expertise with a full-stack perspective. I don't just write endpoints — I design the systems that make products possible.",
    },
    work: {
      sectionLabel: "Work",
      headline1: "Impact measured",
      headline2: "in real numbers.",
      description:
        "Systems I've built handle real money, real users, and real regulatory complexity across Mexico, USA, Europe, and Dominican Republic.",
      selectedProjects: "Selected Projects",
    },
    experience: {
      sectionLabel: "Experience",
      headline1: "Where I've been",
      headline2: "building.",
      description:
        "My career has been focused on building financial infrastructure in Latin America, with a constant thread of clean architecture and systems thinking.",
    },
    beyond: {
      sectionLabel: "Beyond Code",
      headline1: "The engineer",
      headline2: "outside the terminal.",
      description:
        "I believe the best engineers are the ones with lives outside their code editors. Context, curiosity, and movement fuel better thinking.",
    },
    contact: {
      headline1: "Let's build",
      headline2: "something",
      headline3: "together.",
      description:
        "Open to fintech opportunities, interesting backend challenges, and conversations about systems that matter.",
    },
    footer: {
      tagline: "Built with intention. Deployed with care.",
    },
    blog: {
      backToBlog: "Back to blog",
      home: "Home",
      blogTitle: "Blog",
      blogDescription:
        "Writing about backend architecture, fintech systems, and lessons learned building software at scale.",
      noPosts: "No posts yet. Stay tuned.",
    },
    meta: {
      title: "Daniel — Software Engineer | Backend, Fintech & ML",
      description:
        "Software Engineer specializing in Backend, Fintech & ML. Building cross-border payment infrastructure spanning 15+ countries across Mexico, USA, Europe, and Dominican Republic.",
      ogDescription:
        "Building cross-border payment infrastructure spanning 15+ countries. Backend architecture, fintech systems, and ML.",
      twitterDescription:
        "Backend, Fintech & ML. Cross-border payments across 15+ countries. AWS certified.",
    },
  },
  es: {
    nav: {
      about: "Sobre mí",
      expertise: "Especialidad",
      work: "Proyectos",
      experience: "Trayectoria",
      blog: "Blog",
      contact: "Contacto",
      shippingStatus: "Construyendo proyectos",
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú",
    },
    hero: {
      typewriter: "Ingeniero de Software — Backend · Fintech · ML",
      description:
        "Ingeniero obsesionado con cómo todo se conecta — desde arquitecturas distribuidas hasta flujos financieros entre fronteras. Con más de 4 años en fintech y sistemas que abarcan 15+ países, construyo infraestructura que mueve dinero.",
      viewWork: "Ver mi trabajo ↓",
      getInTouch: "Hablemos",
      scroll: "SCROLL",
    },
    about: {
      sectionLabel: "Sobre mí",
      headline1: "No solo lo que construyo,",
      headline2: "sino cómo pienso.",
    },
    expertise: {
      sectionLabel: "Especialidad",
      headline1: "Lo que traigo",
      headline2: "a la mesa.",
      description:
        "Experiencia profunda en backend con perspectiva full-stack. No solo escribo endpoints — diseño los sistemas que hacen posibles los productos.",
    },
    work: {
      sectionLabel: "Proyectos",
      headline1: "Impacto medido",
      headline2: "en números reales.",
      description:
        "Los sistemas que he construido manejan dinero real, usuarios reales y complejidad regulatoria real entre México, USA, Europa y República Dominicana.",
      selectedProjects: "Proyectos Seleccionados",
    },
    experience: {
      sectionLabel: "Trayectoria",
      headline1: "Dónde he estado",
      headline2: "construyendo.",
      description:
        "Mi carrera ha estado enfocada en construir infraestructura financiera en América Latina, con un hilo constante de arquitectura limpia y pensamiento sistémico.",
    },
    beyond: {
      sectionLabel: "Más allá del código",
      headline1: "El ingeniero",
      headline2: "fuera de la terminal.",
      description:
        "Creo que los mejores ingenieros son los que tienen vida fuera de su editor de código. El contexto, la curiosidad y el movimiento alimentan un mejor pensamiento.",
    },
    contact: {
      headline1: "Construyamos",
      headline2: "algo",
      headline3: "juntos.",
      description:
        "Abierto a oportunidades en fintech, retos de backend interesantes y conversaciones sobre sistemas que importan.",
    },
    footer: {
      tagline: "Construido con intención. Desplegado con cuidado.",
    },
    blog: {
      backToBlog: "Volver al blog",
      home: "Inicio",
      blogTitle: "Blog",
      blogDescription:
        "Escribiendo sobre arquitectura backend, sistemas fintech y lecciones aprendidas construyendo software a escala.",
      noPosts: "Aún no hay posts. Pronto...",
    },
    meta: {
      title: "Daniel — Ingeniero de Software | Backend, Fintech & ML",
      description:
        "Ingeniero de Software especializado en Backend, Fintech & ML. Construyendo infraestructura de pagos transfronterizos que abarca 15+ países.",
      ogDescription:
        "Construyendo infraestructura de pagos transfronterizos en 15+ países. Arquitectura backend, sistemas fintech y ML.",
      twitterDescription:
        "Backend, Fintech & ML. Pagos transfronterizos en 15+ países. Certificado en AWS.",
    },
  },
} as const;

export type Translations = typeof translations;
