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
    address: '35 Norte 3626, Col. Ex-Rancho Colorado, Puebla, México. C.P. 72044',
    phone: '233 101 6818',
    email: 'omarcastanedaramiro@gmail.com',
    schedule: 'Lunes a Viernes de 9:00 a 17:00 hrs.',
    mapLat: 19.0434,
    mapLng: -98.1981,
  },
  social: {
    facebook: 'https://facebook.com/oficialmtroomar',
    instagram: 'https://instagram.com/oficialmtroomar',
    tiktok: 'https://tiktok.com/@oficialmtroomar',
    twitter: 'https://x.com/oficialmtroomar',
  },
};

export const navItems: NavItem[] = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Director', href: '#director' },
  { label: 'Trayectoria', href: '#trayectoria' },
  { label: 'Acciones', href: '#acciones' },
  { label: 'Noticias', href: '#noticias' },
  { label: 'Galería', href: '#galeria' },
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
    title: 'Reencuentro y cercanía con nuestras y nuestros maestros jubilados',
    description: 'Un gusto reencontrarnos con las y los maestros jubilados de la Delegación D-IV-7, en la ciudad de Puebla. Acercamos varios servicios que brindaron información  sobre prestaciones, seguros y temas laborales.  Gracias a la confianza de nuestros compañeros jubilados y pensionados, el Fondo de Ahorro brinda información sobre los servicios que presta, como la credencialización. Finalmente, felicitamos a los amigos que celebran un año más de vida en los meses de julio y agosto. ¡Gracias  por permitirnos seguir construyendo un vínculo cada vez más cercano con ustedes!.',
    date: '02 de julio de 2026',
    image: '/images/actions/action-1.jpg',
    category: 'Jornada',
    slug: 'jornada-regional-tehuacan-2026',
  },
  {
    id: 2,
    title: '¡Estuvimos en Tlachichuca, más cerca de las y los trabajadores de la educación!',
    description: 'El equipo del SNTE Sección 51 y del Fondo de Ahorro acercó atención personalizada y diversos servicios a las y los docentes, reafirmando el compromiso de brindar soluciones y beneficios donde más se necesitan. Durante la jornada se ofrecieron los servicios de: Fondo de Ahorro, Jurídico, Seguros, Secretaría de T y C de Bachilleratos Generales. Gracias a todas y todos los docentes que nos acompañaron. Seguimos trabajando para estar cada vez más cerca de ustedes.',
    date: '29 de junio de 2026',
    image: '/images/actions/action-2.jpg',
    category: 'Jornada',
    slug: 'jornada-Tlachichuca-2026',
  },
  {
    id: 3,
    title: 'XXIII Entrega de Estímulo Económico Único por Jubilación y/o Pensión',
    description: 'Los años de trabajo, esfuerzo y dedicación hoy son reconocidos y valorados por el Representante del Comité Ejecutivo Nacional en la Sección 51 del SNTE, Mtro. Elpidio Yañez Rubio, presidente del Fondo de Ahorro, Mtro. Alfredo Gómez Palacios y el director general, Mtro. Omar Castañeda Ramiro, celebramos con profundo agradecimiento la entrega de Estímulos a más de 90 pensionados y jubilados. Su experiencia y confianza en el Fondo de Ahorro, nos da el impulso para seguir trazando metas que lleven por buen camino a esta Dirección.',
    date: '25 de junio de 2026',
    image: '/images/actions/action-3.jpg',
    category: 'Entrega de Estímulo Económico Único por Jubilación y/o Pensión',
    slug: 'Entrega-Estímulo-Económico-2026',
  },
  {
    id: 4,
    title: 'Unidad y cercanía con el magisterio poblano',
    description: 'Una gran muestra de unidad se vivió en el convivio regional de San Martín Texmelucan, con la participación de autoridades sindicales, representantes nacionales del SNTE, directivos del Fondo de Ahorro y docentes de la Región VIII, en el marco de la celebración del Día del Maestro. El encuentro fortaleció los lazos de cercanía y compromiso con el magisterio poblano, así como la coordinación institucional en favor de la educación. En el Fondo de Ahorro seguimos sumando esfuerzos y trabajando, ¡Más cerca de ti!.',
    date: '21 de mayo de 2026',
    image: '/images/actions/action-4.jpg',
    category: 'Cercanía',
    slug: 'convivio-regional-2026',
  },
  {
    id: 5,
    title: 'XXII Entrega de Estímulo Económico: reconocimiento y gratitud',
    description: 'Compartimos algunos momentos de la XXII Entrega de Estímulo Económico Único por Jubilación y/o Pensión, un evento lleno de emoción, reconocimiento y gratitud hacia nuestras maestras y maestros jubilados. Cada fotografía refleja el orgullo de honrar a quienes dedicaron su vida a la formación de generaciones y al fortalecimiento de la educación. Con la presencia del Mtro. R. Alfredo Gómez Palacios, Presidente del #FondodeAhorro de la Sección 51, y del Mtro. Omar Castañeda Ramiro, Director General, seguimos reconociendo la trayectoria y el legado de quienes dejaron una huella imborrable en las aulas. Gracias por su entrega, compromiso y vocación de servicio.',
    date: '12 de mayo de 2026',
    image: '/images/actions/action-5.jpg',
    category: 'Entrega de Estímulo Económico',
    slug: 'Entrega-Estímulo-Económico-2026',
  },
  {
    id: 6,
    title: 'Unidos por las y los trabajadores de la educación',
    description: 'El Fondo de Ahorro de la Sección 51 del SNTE participó en el desfile conmemorativo del 1° de Mayo en la Ciudad de Puebla, acompañando con orgullo a las y los trabajadores de la educación. Con la presencia del Mtro. R. Alfredo Gómez Palacios y del Mtro. Omar Castañeda Ramiro, reafirmamos nuestro compromiso con la unidad, el bienestar y la generación de mayores beneficios para nuestra comunidad sindical.',
    date: '03 de mayo de 2026',
    image: '/images/actions/action-6.jpg',
    category: 'Desfile',
    slug: 'día-trabajo-2026',
  },
];

export const newsItems: NewsItem[] = [
  {
    id: 1,
    title: 'Reencuentro y cercanía con nuestras y nuestros maestros jubilados',
    summary: 'Un gusto reencontrarnos con las y los maestros jubilados de la Delegación D-IV-7, en la ciudad de Puebla. Acercamos varios servicios que brindaron información sobre prestaciones, seguros y temas laborales.',
    content: '',
    date: '02 de julio de 2026',
    image: '/images/actions/action-1.jpg',
    category: 'Jornada',
    featured: true,
    slug: 'reencuentro-maestros-jubilados',
  },
  {
    id: 2,
    title: '¡Estuvimos en Tlachichuca, más cerca de las y los trabajadores de la educación!',
    summary: 'El equipo del SNTE Sección 51 y del Fondo de Ahorro acercó atención personalizada y diversos servicios a las y los docentes, reafirmando el compromiso de brindar soluciones y beneficios donde más se necesitan.',
    content: '',
    date: '29 de junio de 2026',
    image: '/images/actions/action-2.jpg',
    category: 'Jornada',
    featured: false,
    slug: 'jornada-tlachichuca-2026',
  },
  {
    id: 3,
    title: 'XXIII Entrega de Estímulo Económico Único por Jubilación y/o Pensión',
    summary: 'Los años de trabajo, esfuerzo y dedicación hoy son reconocidos y valorados. Celebramos con profundo agradecimiento la entrega de Estímulos a más de 90 pensionados y jubilados.',
    content: '',
    date: '25 de junio de 2026',
    image: '/images/actions/action-3.jpg',
    category: 'Estímulos',
    featured: false,
    slug: 'entrega-estimulo-xxiii',
  },
  {
    id: 4,
    title: 'Unidad y cercanía con el magisterio poblano',
    summary: 'Una gran muestra de unidad se vivió en el convivio regional de San Martín Texmelucan, con la participación de autoridades sindicales, representantes nacionales del SNTE y docentes de la Región VIII.',
    content: '',
    date: '21 de mayo de 2026',
    image: '/images/actions/action-4.jpg',
    category: 'Cercanía',
    featured: false,
    slug: 'convivio-regional-san-martin',
  },
  {
    id: 5,
    title: 'XXII Entrega de Estímulo Económico: reconocimiento y gratitud',
    summary: 'Un evento lleno de emoción, reconocimiento y gratitud hacia nuestras maestras y maestros jubilados. Cada fotografía refleja el orgullo de honrar a quienes dedicaron su vida a la educación.',
    content: '',
    date: '12 de mayo de 2026',
    image: '/images/actions/action-5.jpg',
    category: 'Estímulos',
    featured: false,
    slug: 'entrega-estimulo-xxii',
  },
  {
    id: 6,
    title: 'Unidos por las y los trabajadores de la educación',
    summary: 'El Fondo de Ahorro participó en el desfile conmemorativo del 1° de Mayo en la Ciudad de Puebla, acompañando con orgullo a las y los trabajadores de la educación.',
    content: '',
    date: '03 de mayo de 2026',
    image: '/images/actions/action-6.jpg',
    category: 'Desfile',
    featured: false,
    slug: 'desfile-1-mayo-2026',
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
  { value: 350, label: 'Jornadas Regionales', suffix: '+', prefix: '', icon: 'map' },
  { value: 98, label: 'Satisfacción', suffix: '%', prefix: '', icon: 'star' },
];

export const socialPosts: SocialPost[] = [
  {
    id: 'fb1',
    platform: 'facebook',
    content: 'Te compartimos un resumen de las actividades realizadas durante el mes de junio, en las que acercamos información y servicios a las y los trabajadores de la educación en diferentes regiones del estado. En esta emisión también conocerás algunos de los momentos más importantes de la XXIII Entrega de Estímulo Económico Único por Jubilación y/o Pensión, así como los testimonios de maestras y maestros que participaron en nuestras jornadas. Porque nuestro compromiso es seguir trabajando más cerca de ti.',
    image: '/images/social/fb1.jpg',
    date: '06 Jul 2026',
    likes: 262,
    url: 'https://www.facebook.com/share/v/1BZ5j72VuV/',
  },
  {
    id: 'ig1',
    platform: 'instagram',
    content: 'Compartimos una excelente jornada con las y los maestros jubilados de la Delegación D-IV-7, en la ciudad de Puebla. Durante el encuentro se brindó orientación sobre prestaciones, seguros, temas laborales y los servicios que ofrece el Fondo de Ahorro, entre ellos el proceso de credencialización.',
    image: '/images/social/ig1.jpg',
    date: '02 Jul 2026',
    likes: 45,
    url: 'https://www.instagram.com/p/DaTOcsqRk2G/',
  },
];
