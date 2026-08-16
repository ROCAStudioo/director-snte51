# Portal Institucional - Fondo de Ahorro SNTE Sección 51
## Mtro. Omar Castañeda Ramiro · Director General

Portal web institucional de nivel premium para el Director General del Fondo de Ahorro para las y los Trabajadores de la Educación de la Sección 51 del SNTE.

---

## 🚀 Tecnologías

- **Next.js 16** (App Router + Turbopack)
- **React 19** + TypeScript
- **Tailwind CSS v4**
- **Framer Motion** — Animaciones
- **Lucide React** — Iconografía
- **Swiper** — Carruseles
- **Prisma ORM** + **PostgreSQL** — Base de datos
- **NextAuth.js** — Autenticación segura
- **bcryptjs** — Encriptación de contraseñas

---

## 📂 Estructura del proyecto

```
src/
├── app/
│   ├── page.tsx              ← Página principal
│   ├── layout.tsx            ← Layout raíz con SEO
│   ├── globals.css           ← Estilos globales
│   └── admin/                ← Panel de administración
│       ├── layout.tsx        ← Layout + autenticación
│       ├── page.tsx          ← Dashboard
│       ├── news/             ← Gestión de noticias
│       ├── actions/          ← Acciones del director
│       ├── gallery/          ← Galería de fotos
│       ├── transparency/     ← Documentos
│       ├── testimonials/     ← Testimonios
│       ├── regions/          ← Regiones del mapa
│       ├── stats/            ← Estadísticas
│       ├── users/            ← Usuarios y roles
│       ├── hero/             ← Hero / Banner inicio
│       └── settings/         ← Configuración general
├── components/               ← Componentes del sitio
│   ├── Navbar.tsx
│   ├── HeroSection.tsx
│   ├── DirectorMessage.tsx
│   ├── TimelineSection.tsx
│   ├── ActionsSection.tsx
│   ├── StatsSection.tsx
│   ├── NewsSection.tsx
│   ├── GallerySection.tsx
│   ├── MapSection.tsx
│   ├── TransparencySection.tsx
│   ├── TestimonialsSection.tsx
│   ├── SocialSection.tsx
│   ├── ContactSection.tsx
│   └── Footer.tsx
├── data/
│   └── site-data.ts          ← Datos del sitio (editables)
└── types/
    └── index.ts              ← Tipos TypeScript
prisma/
└── schema.prisma             ← Esquema de base de datos
```

---

## ⚡ Inicio rápido

### 1. Instalar dependencias
```bash
npm install --legacy-peer-deps
```

### 2. Configurar variables de entorno
```bash
cp .env.example .env.local
# Editar .env.local con tus valores
```

### 3. Configurar base de datos (opcional para desarrollo)
```bash
# Con PostgreSQL instalado:
npm run db:push
```

### 4. Iniciar servidor de desarrollo
```bash
node node_modules/next/dist/bin/next dev
```

Abrir: **http://localhost:3000**

---

## 🔐 Panel de Administración

URL: **http://localhost:3000/admin**

**Credenciales de demostración:**
- Usuario: `admin`
- Contraseña: `snte51admin`

> ⚠️ Cambiar las credenciales antes de ir a producción.

### Módulos disponibles:
| Módulo | Descripción |
|--------|-------------|
| Hero/Banner | Foto, título y texto del Director |
| Noticias | Crear, editar y publicar noticias |
| Acciones | Registrar actividades institucionales |
| Galería | Subir y organizar fotos/videos |
| Transparencia | Documentos descargables |
| Estadísticas | Contadores animados |
| Testimonios | Aprobar/moderar testimonios |
| Regiones | Cobertura en el mapa |
| Usuarios | Roles: Admin, Editor, Consulta |
| Configuración | Datos de contacto y redes |

---

## 🗄️ Base de datos

El proyecto usa **PostgreSQL + Prisma**. Modelos disponibles:
- `User` — Usuarios del panel
- `News` — Noticias
- `Action` — Acciones del director
- `GalleryItem` — Galería
- `TransparencyDoc` — Documentos
- `Testimonial` — Testimonios
- `Region` — Regiones atendidas
- `Stat` — Estadísticas
- `SiteConfig` — Configuración general

---

## 🌐 Secciones del portal

1. **Navbar** — Fija, responsive, con indicador de sección activa
2. **Hero** — Foto del director, stats flotantes, CTA
3. **Mensaje del Director** — Con firma digital
4. **Trayectoria** — Timeline horizontal/vertical animado
5. **Acciones** — Grid de tarjetas con filtros
6. **Estadísticas** — Contadores animados al hacer scroll
7. **Noticias** — Tipo periódico digital con buscador
8. **Galería** — Masonry con lightbox y filtros
9. **Mapa de Cobertura** — SVG interactivo del estado de Puebla
10. **Transparencia** — Tarjetas de descarga de documentos
11. **Testimonios** — Carrusel automático
12. **Redes Sociales** — Posts recientes
13. **Contacto** — Formulario + mapa + datos institucionales
14. **Footer** — Links, redes y copyright

---

## 📸 Agregar fotografías

Colocar imágenes en la carpeta `public/images/`:

```
public/images/
├── director.jpg          ← Foto principal hero
├── director-circle.jpg   ← Foto circular mensaje
├── actions/              ← Fotos de acciones
├── news/                 ← Fotos de noticias
├── gallery/              ← Galería
├── testimonials/         ← Avatares testimonios
└── regions/              ← Fotos de regiones
```

---

## 🚢 Despliegue en producción

### Vercel (recomendado)
```bash
npm install -g vercel
vercel
```

### Variables de entorno en producción:
```
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://tu-dominio.com
```

---

## 📝 Licencia

© 2026 Fondo de Ahorro para las y los Trabajadores de la Educación · Sección 51 SNTE · Puebla, México.
