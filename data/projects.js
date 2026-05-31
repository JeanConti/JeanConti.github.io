const projects = [
  {
    id: '1',
    title: {
      fr: 'Site Web LE PAIN DE VIE',
      en: 'LE PAIN DE VIE Website',
      es: 'Sitio Web LE PAIN DE VIE',
    },
    shortDesc: {
      fr: 'Site web pour LE PAIN DE VIE',
      en: 'Website for LE PAIN DE VIE',
      es: 'Sitio web para LE PAIN DE VIE',
    },
    description: {
      fr: 'Site web réalisé pour LE PAIN DE VIE. Le site comprend plusieurs sections et une présentation vidéo.',
      en: 'Website created for LE PAIN DE VIE. The site includes multiple sections and a video presentation.',
      es: 'Sitio web creado para LE PAIN DE VIE. El sitio incluye varias secciones y una presentación en video.',
    },
    imageUrl: null,
    videoUrl: 'assets/video/Video-SiteWebDidier.mp4',
    projectUrl: 'https://shazia.fr',
    githubUrl: null,
    technologies: ['HTML', 'CSS', 'JavaScript', 'Vidéo'],
    category: {
      fr: 'Site Web',
      en: 'Website',
      es: 'Sitio Web',
    },
    featured: true,
    order: 1,
  },
  {
    id: '2',
    title: {
      fr: 'Projet Web Moderne',
      en: 'Modern Web Project',
      es: 'Proyecto Web Moderno',
    },
    shortDesc: {
      fr: 'Application web full-stack avec React et Node.js',
      en: 'Full-stack web application with React and Node.js',
      es: 'Aplicación web full-stack con React y Node.js',
    },
    description: {
      fr: 'Application web complète développée avec les dernières technologies. Inclut authentification, panel admin et API REST.',
      en: 'Complete web application developed with the latest technologies. Includes authentication, admin panel and REST API.',
      es: 'Aplicación web completa desarrollada con las últimas tecnologías. Incluye autenticación, panel de administración y API REST.',
    },
    imageUrl: '/images/projet1.jpg',
    projectUrl: 'https://exemple.com/projet1',
    githubUrl: 'https://github.com/jeanmichelconti/projet1',
    technologies: ['React', 'Node.js', 'MySQL', 'TypeScript'],
    category: {
      fr: 'Développement Web',
      en: 'Web Development',
      es: 'Desarrollo Web',
    },
    featured: true,
    order: 2,
  },
  {
    id: '3',
    title: {
      fr: 'Application Mobile',
      en: 'Mobile Application',
      es: 'Aplicación Móvil',
    },
    shortDesc: {
      fr: 'Application mobile multiplateforme avec React Native',
      en: 'Cross-platform mobile application with React Native',
      es: 'Aplicación móvil multiplataforma con React Native',
    },
    description: {
      fr: 'Application mobile multiplateforme avec design moderne et fonctionnalités avancées.',
      en: 'Cross-platform mobile application with modern design and advanced features.',
      es: 'Aplicación móvil multiplataforma con diseño moderno y funciones avanzadas.',
    },
    imageUrl: '/images/projet2.jpg',
    projectUrl: 'https://exemple.com/projet2',
    githubUrl: 'https://github.com/jeanmichelconti/projet2',
    technologies: ['React Native', 'Firebase', 'Redux'],
    category: {
      fr: 'Développement Mobile',
      en: 'Mobile Development',
      es: 'Desarrollo Móvil',
    },
    featured: true,
    order: 3,
  },
  {
    id: '4',
    title: {
      fr: 'Système de Gestion',
      en: 'Management System',
      es: 'Sistema de Gestión',
    },
    shortDesc: {
      fr: 'ERP personnalisé avec NestJS',
      en: 'Custom ERP with NestJS',
      es: 'ERP personalizado con NestJS',
    },
    description: {
      fr: 'Système complet de gestion enterprise avec multiples modules et rapports avancés.',
      en: 'Complete enterprise management system with multiple modules and advanced reports.',
      es: 'Sistema completo de gestión empresarial con múltiples módulos e informes avanzados.',
    },
    imageUrl: '/images/projet3.jpg',
    projectUrl: 'https://exemple.com/projet3',
    githubUrl: null,
    technologies: ['NestJS', 'Angular', 'PostgreSQL', 'Docker'],
    category: {
      fr: 'Entreprise',
      en: 'Enterprise',
      es: 'Empresarial',
    },
    featured: false,
    order: 4,
  },
];

if (typeof window !== 'undefined') {
  window.portfolioProjects = projects;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { projects };
}
