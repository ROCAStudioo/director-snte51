// ============================================
// DATOS DEL SITIO - FONDO DE AHORRO SNTE 51
// Estos datos son editables desde el panel admin
// ============================================

import type {
  NavItem, TimelineItem, ActionCard, NewsItem,
  GalleryItem, Testimonial, Region, TransparencyDoc,
  StatCounter, SocialPost
} from '@/types';

export const siteConfig = {
  director: {
    name: 'Mtro. Omar Castañeda Ramiro',
    title: 'Director General',
    organization: 'Fondo de Ahorro para las y los Trabajadores de la Educación',
    section: 'Sección 51 del SNTE',
    bio: 'Trabajando con responsabilidad, cercanía y compromiso para fortalecer el patrimonio y bienestar de las y los trabajadores de la educación.',
    message: `Con profundo orgullo y compromiso, me dirijo a cada uno de los trabajadores de la educación de la Sección 51 del SNTE. El Fondo de Ahorro es su patrimonio, construido con el esfuerzo y la confianza de miles de maestras y maestros a lo largo del estado de Puebla.

Mi compromiso como Director General es administrar con transparencia, eficiencia y responsabilidad los recursos que ustedes nos confían. Trabajamos día a día para fortalecer los servicios, ampliar la cobertura regional y garantizar que cada peso sea utilizado en beneficio del magisterio poblano.

Juntos, seguiremos construyendo un fondo más sólido, más cercano y más comprometido con el bienestar de las y los trabajadores de la educación.`,
    signature: 'Mtro. Omar Castañeda Ramiro',
    photo: '/images/director.jpg',
    photoCircle: '/images/director-circle.jpg',
  },
  contact: {
    address: 'Av. Juan de Palafox y Mendoza No. 208, Centro Histórico, Heroica Puebla de Zaragoza, Puebla. C.P. 72000',
    phone: '222 246 0800',
    email: 'contacto@fondodeahorro51.edu.mx',
    schedule: 'Lunes a Viernes de 9:00 a 17:00 hrs.',
    mapLat: 19.0434,
    mapLng: -98.1981,
  },
  social: {
    facebook: 'https://facebook.com/fondoahorrosnte51',
    instagram: 'https://instagram.com/fondoahorrosnte51',
    youtube: 'https://youtube.com/@fondoahorrosnte51',
    twitter: 'https://twitter.com/fondoahorrosnte51',
  },
};

export const navItems: NavItem[] = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Director', href: '#director' },
  { label: 'Trayectoria', href: '#trayectoria' },
  { label: 'Acciones', href: '#acciones' },
  { label: 'Noticias', href: '#noticias' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Transparencia', href: '#transparencia' },
  { label: 'Contacto', href: '#contacto' },
];

export const timelineItems: TimelineItem[] = [
  {
    year: '1998',
    title: 'Licenciatura en Ciencias de la Educación',
    description: 'Universidad Autónoma de Puebla. Formación sólida en pedagogía y administración educativa con mención honorífica.',
    icon: 'graduation',
    category: 'academic',
  },
  {
    year: '2003',
    title: 'Maestría en Administración Pública',
    description: 'Instituto Nacional de Administración Pública. Especialización en finanzas públicas y gestión gubernamental.',
    icon: 'book',
    category: 'academic',
  },
  {
    year: '2005',
    title: 'Inicio en el Magisterio',
    description: 'Docente de educación primaria en la zona escolar 012. Inicio de su vocación de servicio al magisterio poblano.',
    icon: 'briefcase',
    category: 'professional',
  },
  {
    year: '2010',
    title: 'Secretario de Finanzas - SNTE Sección 51',
    description: 'Responsable de la administración financiera de la sección, impulsando la transparencia y modernización contable.',
    icon: 'chart',
    category: 'professional',
  },
  {
    year: '2014',
    title: 'Premio Estatal de Administración Pública',
    description: 'Reconocimiento por la implementación de buenas prácticas en la gestión de fondos del magisterio poblano.',
    icon: 'award',
    category: 'recognition',
  },
  {
    year: '2016',
    title: 'Subdirector del Fondo de Ahorro',
    description: 'Liderazgo en la reestructuración y modernización del fondo, logrando un incremento del 35% en la base de afiliados.',
    icon: 'users',
    category: 'professional',
  },
  {
    year: '2020',
    title: 'Digitalización del Fondo',
    description: 'Implementación del sistema digital de administración, facilitando el acceso remoto de los trabajadores a sus servicios.',
    icon: 'star',
    category: 'achievement',
  },
  {
    year: '2022',
    title: 'Director General del Fondo de Ahorro',
    description: 'Designación como Director General, asumiendo el compromiso de fortalecer el patrimonio de los trabajadores de la educación.',
    icon: 'trophy',
    category: 'institutional',
  },
];

export const actionCards: ActionCard[] = [
  {
    id: 1,
    title: 'Jornada Regional de Servicios - Tehuacán',
    description: 'Más de 800 trabajadores de la educación fueron atendidos en la jornada regional realizada en la ciudad de Tehuacán, ofreciendo servicios de préstamos, asesoría financiera y trámites.',
    date: '15 de julio de 2026',
    image: '/images/actions/action-1.jpg',
    category: 'Jornadas',
    slug: 'jornada-regional-tehuacan-2026',
  },
  {
    id: 2,
    title: 'Entrega de Apoyos Económicos - Zona Mixteca',
    description: 'El Director General encabezó la entrega de apoyos económicos a trabajadores de la zona Mixteca, beneficiando a más de 350 familias del magisterio.',
    date: '28 de junio de 2026',
    image: '/images/actions/action-2.jpg',
    category: 'Apoyos',
    slug: 'apoyos-zona-mixteca-2026',
  },
  {
    id: 3,
    title: 'Capacitación Financiera para Docentes',
    description: 'Taller de educación financiera dirigido a docentes de nivel básico, con el objetivo de fortalecer el manejo de sus finanzas personales y aprovechamiento del fondo.',
    date: '10 de junio de 2026',
    image: '/images/actions/action-3.jpg',
    category: 'Capacitación',
    slug: 'capacitacion-financiera-docentes-2026',
  },
  {
    id: 4,
    title: 'Firma de Convenio con Instituciones Educativas',
    description: 'Acuerdo de colaboración firmado con tres universidades del estado para ofrecer becas y facilidades de acceso a posgrado para hijos de trabajadores afiliados.',
    date: '5 de mayo de 2026',
    image: '/images/actions/action-4.jpg',
    category: 'Convenios',
    slug: 'convenio-universidades-2026',
  },
  {
    id: 5,
    title: 'Modernización del Sistema Digital',
    description: 'Lanzamiento de la nueva plataforma digital que permite a los trabajadores realizar trámites en línea, consultar saldos y solicitar préstamos desde cualquier dispositivo.',
    date: '20 de abril de 2026',
    image: '/images/actions/action-5.jpg',
    category: 'Tecnología',
    slug: 'modernizacion-sistema-digital-2026',
  },
  {
    id: 6,
    title: 'Asamblea General de Afiliados',
    description: 'Presentación del informe anual ante la asamblea general de afiliados, con presencia de más de 1,200 trabajadores de todas las regiones del estado.',
    date: '15 de marzo de 2026',
    image: '/images/actions/action-6.jpg',
    category: 'Asambleas',
    slug: 'asamblea-general-2026',
  },
];

export const newsItems: NewsItem[] = [
  {
    id: 1,
    title: 'Fondo de Ahorro supera los 500 millones en activos administrados',
    summary: 'Por primera vez en su historia, el Fondo de Ahorro de la Sección 51 supera la barrera de los 500 millones de pesos en activos bajo administración, reflejo del crecimiento y confianza del magisterio.',
    content: '',
    date: '1 de agosto de 2026',
    image: '/images/news/news-1.jpg',
    category: 'Finanzas',
    featured: true,
    slug: 'fondo-ahorro-500-millones',
  },
  {
    id: 2,
    title: 'Nuevas tasas preferenciales para préstamos al magisterio',
    summary: 'A partir del próximo ciclo escolar, los trabajadores de la educación podrán acceder a préstamos con tasas de interés reducidas, beneficiando a más de 8,000 afiliados activos.',
    content: '',
    date: '25 de julio de 2026',
    image: '/images/news/news-2.jpg',
    category: 'Servicios',
    featured: false,
    slug: 'nuevas-tasas-preferenciales',
  },
  {
    id: 3,
    title: 'Cobertura regional ampliada a 12 nuevos municipios',
    summary: 'El Fondo de Ahorro extiende su red de atención a 12 municipios adicionales de las regiones Sierra Norte y Huasteca, acercando los servicios a más trabajadores.',
    content: '',
    date: '18 de julio de 2026',
    image: '/images/news/news-3.jpg',
    category: 'Cobertura',
    featured: false,
    slug: 'cobertura-12-municipios',
  },
  {
    id: 4,
    title: 'Reconocimiento estatal por buenas prácticas financieras',
    summary: 'El gobierno del estado de Puebla reconoció al Fondo de Ahorro de la Sección 51 como modelo de transparencia y eficiencia en la administración de recursos del sector educativo.',
    content: '',
    date: '10 de julio de 2026',
    image: '/images/news/news-4.jpg',
    category: 'Reconocimientos',
    featured: false,
    slug: 'reconocimiento-buenas-practicas',
  },
];

export const galleryItems: GalleryItem[] = [
  { id: 1, src: '/images/gallery/g1.jpg', alt: 'Jornada regional Tehuacán', category: 'regional', type: 'image', width: 800, height: 600 },
  { id: 2, src: '/images/gallery/g2.jpg', alt: 'Asamblea general de afiliados', category: 'events', type: 'image', width: 600, height: 800 },
  { id: 3, src: '/images/gallery/g3.jpg', alt: 'Reunión con delegados seccionales', category: 'meetings', type: 'image', width: 800, height: 500 },
  { id: 4, src: '/images/gallery/g4.jpg', alt: 'Conferencia de transparencia', category: 'conferences', type: 'image', width: 700, height: 700 },
  { id: 5, src: '/images/gallery/g5.jpg', alt: 'Capacitación financiera docentes', category: 'training', type: 'image', width: 800, height: 600 },
  { id: 6, src: '/images/gallery/g6.jpg', alt: 'Entrega de apoyos Mixteca', category: 'regional', type: 'image', width: 600, height: 400 },
  { id: 7, src: '/images/gallery/g7.jpg', alt: 'Firma de convenios', category: 'events', type: 'image', width: 800, height: 600 },
  { id: 8, src: '/images/gallery/g8.jpg', alt: 'Visita a escuelas rurales', category: 'regional', type: 'image', width: 700, height: 900 },
  { id: 9, src: '/images/gallery/g9.jpg', alt: 'Taller de educación financiera', category: 'training', type: 'image', width: 800, height: 600 },
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Mtra. Rosa Elena Pérez Flores',
    municipality: 'San Andrés Cholula, Puebla',
    comment: 'Gracias al Fondo de Ahorro pude solventar los gastos médicos de mi familia. La atención es excelente y el Director siempre está al pendiente de nuestras necesidades. Me siento orgullosa de pertenecer a esta sección.',
    avatar: '/images/testimonials/t1.jpg',
    role: 'Docente de Educación Primaria',
  },
  {
    id: 2,
    name: 'Prof. Juan Carlos Mendoza López',
    municipality: 'Tehuacán, Puebla',
    comment: 'El préstamo que obtuve del fondo me permitió ampliar mi vivienda. Los procesos son transparentes y el trato es muy humano. El Mtro. Omar ha transformado el fondo con cercanía y eficiencia.',
    avatar: '/images/testimonials/t2.jpg',
    role: 'Director de Escuela Secundaria',
  },
  {
    id: 3,
    name: 'Mtra. Lucía Hernández Castillo',
    municipality: 'Tlatlauquitepec, Puebla',
    comment: 'Las jornadas regionales son fundamentales para quienes vivimos lejos de la capital. Por primera vez el director vino a nuestra región y atendió personalmente nuestras inquietudes. Excelente liderazgo.',
    avatar: '/images/testimonials/t3.jpg',
    role: 'Docente de Educación Especial',
  },
  {
    id: 4,
    name: 'Prof. Miguel Ángel Torres Ramos',
    municipality: 'Izúcar de Matamoros, Puebla',
    comment: 'La digitalización del fondo ha sido un gran avance. Ahora puedo realizar mis trámites desde casa. La transparencia en el manejo de recursos nos da mucha confianza a todos los afiliados.',
    avatar: '/images/testimonials/t4.jpg',
    role: 'Supervisor de Zona Escolar',
  },
  {
    id: 5,
    name: 'Mtra. Patricia Ortega Velázquez',
    municipality: 'Huauchinango, Puebla',
    comment: 'El compromiso del Director con las zonas más alejadas del estado es admirable. Gracias a las jornadas regionales he podido acceder a todos los servicios del fondo sin tener que desplazarme a la capital.',
    avatar: '/images/testimonials/t5.jpg',
    role: 'Docente de Preescolar',
  },
];

export const regions: Region[] = [
  {
    id: 'puebla-capital',
    name: 'Puebla Capital',
    lat: 19.0434,
    lng: -98.1981,
    photo: '/images/regions/puebla.jpg',
    date: 'Julio 2026',
    services: ['Préstamos personales', 'Asesoría financiera', 'Trámites administrativos', 'Ahorro programado'],
    attendees: 1250,
    description: 'Sede central con atención directa al magisterio de la zona metropolitana.',
  },
  {
    id: 'tehuacan',
    name: 'Tehuacán',
    lat: 18.4616,
    lng: -97.3926,
    photo: '/images/regions/tehuacan.jpg',
    date: 'Junio 2026',
    services: ['Préstamos personales', 'Jornadas de servicio', 'Capacitación financiera'],
    attendees: 820,
    description: 'Segunda región más importante, con amplia cobertura en el sur del estado.',
  },
  {
    id: 'san-martin',
    name: 'San Martín Texmelucan',
    lat: 19.2848,
    lng: -98.4343,
    photo: '/images/regions/san-martin.jpg',
    date: 'Mayo 2026',
    services: ['Préstamos emergentes', 'Gestión de documentos', 'Orientación previsional'],
    attendees: 640,
    description: 'Zona de alto crecimiento con incremento del 20% en afiliaciones.',
  },
  {
    id: 'izucar',
    name: 'Izúcar de Matamoros',
    lat: 18.5997,
    lng: -98.4668,
    photo: '/images/regions/izucar.jpg',
    date: 'Abril 2026',
    services: ['Jornadas regionales', 'Préstamos personales', 'Talleres financieros'],
    attendees: 480,
    description: 'Región de la mixteca con alta demanda de servicios de apoyo económico.',
  },
  {
    id: 'huauchinango',
    name: 'Huauchinango',
    lat: 20.1761,
    lng: -98.0567,
    photo: '/images/regions/huauchinango.jpg',
    date: 'Marzo 2026',
    services: ['Atención regional', 'Préstamos', 'Gestoría de trámites'],
    attendees: 390,
    description: 'Sierra Norte con programas especiales para docentes de zonas remotas.',
  },
  {
    id: 'teziutlan',
    name: 'Teziutlán',
    lat: 19.8167,
    lng: -97.3667,
    photo: '/images/regions/teziutlan.jpg',
    date: 'Febrero 2026',
    services: ['Jornada regional', 'Orientación jurídica', 'Préstamos personales'],
    attendees: 430,
    description: 'Zona Sierra-Huasteca con fuerte presencia magisterial y amplia cobertura.',
  },
];

export const transparencyDocs: TransparencyDoc[] = [
  {
    id: 1,
    title: 'Informe Anual de Actividades 2025',
    type: 'report',
    date: 'Enero 2026',
    size: '4.2 MB',
    url: '/docs/informe-anual-2025.pdf',
  },
  {
    id: 2,
    title: 'Estado Financiero Primer Semestre 2026',
    type: 'financial',
    date: 'Julio 2026',
    size: '2.8 MB',
    url: '/docs/estado-financiero-1s-2026.pdf',
  },
  {
    id: 3,
    title: 'Convocatoria Jornadas Regionales 2026',
    type: 'announcement',
    date: 'Marzo 2026',
    size: '1.1 MB',
    url: '/docs/convocatoria-jornadas-2026.pdf',
  },
  {
    id: 4,
    title: 'Reglamento Interno del Fondo de Ahorro',
    type: 'regulation',
    date: 'Octubre 2024',
    size: '3.5 MB',
    url: '/docs/reglamento-interno.pdf',
  },
  {
    id: 5,
    title: 'Acuerdo de Transparencia y Rendición de Cuentas',
    type: 'official',
    date: 'Enero 2026',
    size: '0.9 MB',
    url: '/docs/acuerdo-transparencia.pdf',
  },
  {
    id: 6,
    title: 'Estadísticas de Atención 2025',
    type: 'report',
    date: 'Diciembre 2025',
    size: '1.7 MB',
    url: '/docs/estadisticas-2025.pdf',
  },
];

export const statCounters: StatCounter[] = [
  { value: 25000, label: 'Socios Atendidos', suffix: '+', prefix: '', icon: 'users' },
  { value: 150, label: 'Jornadas Regionales', suffix: '+', prefix: '', icon: 'map' },
  { value: 500, label: 'Millones Administrados', suffix: 'M+', prefix: '$', icon: 'chart' },
  { value: 98, label: 'Satisfacción', suffix: '%', prefix: '', icon: 'star' },
];

export const socialPosts: SocialPost[] = [
  {
    id: 'fb1',
    platform: 'facebook',
    content: '✅ Hoy realizamos con éxito la Jornada Regional en Tehuacán. Más de 800 trabajadores de la educación fueron atendidos. ¡Gracias por su confianza! 🎓🧡',
    image: '/images/social/fb1.jpg',
    date: '15 Jul 2026',
    likes: 342,
    url: '#',
  },
  {
    id: 'ig1',
    platform: 'instagram',
    content: '🧡 Comprometidos con el bienestar del magisterio poblano. Hoy entregamos apoyos en la región Mixteca. #FondoAhorro #SNTE51 #MagisterioPoblano',
    image: '/images/social/ig1.jpg',
    date: '28 Jun 2026',
    likes: 512,
    url: '#',
  },
  {
    id: 'yt1',
    platform: 'youtube',
    content: '📺 Informe del Director General: Resultados del primer semestre 2026. Ver video completo en nuestro canal oficial.',
    image: '/images/social/yt1.jpg',
    date: '1 Jul 2026',
    likes: 189,
    url: '#',
  },
];
