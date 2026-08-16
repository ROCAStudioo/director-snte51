'use client';

import Link from 'next/link';
import {
  LayoutDashboard, Users, Newspaper, Zap, Camera,
  Shield, BarChart3, TrendingUp, ArrowUpRight,
  Eye, Edit3, Plus, Clock, CheckCircle, AlertCircle
} from 'lucide-react';

const statsCards = [
  { label: 'Total Noticias', value: '24', change: '+3', icon: Newspaper, color: 'bg-blue-50 text-blue-600', trend: 'up' },
  { label: 'Acciones', value: '18', change: '+2', icon: Zap, color: 'bg-green-50 text-green-600', trend: 'up' },
  { label: 'Fotos en Galería', value: '156', change: '+12', icon: Camera, color: 'bg-purple-50 text-purple-600', trend: 'up' },
  { label: 'Documentos', value: '32', change: '+1', icon: Shield, color: 'bg-orange-50 text-orange-600', trend: 'up' },
];

const quickActions = [
  { label: 'Nueva noticia', icon: Plus, href: '/admin/news', color: 'gradient-orange text-white' },
  { label: 'Agregar acción', icon: Zap, href: '/admin/actions', color: 'bg-green-500 text-white' },
  { label: 'Subir fotos', icon: Camera, href: '/admin/gallery', color: 'bg-purple-500 text-white' },
  { label: 'Subir documento', icon: Shield, href: '/admin/transparency', color: 'bg-blue-500 text-white' },
  { label: 'Editar estadísticas', icon: BarChart3, href: '/admin/stats', color: 'bg-yellow-500 text-white' },
  { label: 'Ver testimonios', icon: Users, href: '/admin/testimonials', color: 'bg-pink-500 text-white' },
];

const recentActivity = [
  { action: 'Nueva noticia publicada', item: 'Fondo supera 500 millones en activos', time: 'Hace 2 horas', status: 'success', icon: Newspaper },
  { action: 'Acción agregada', item: 'Jornada Regional Tehuacán 2026', time: 'Hace 1 día', status: 'success', icon: Zap },
  { action: 'Documento subido', item: 'Estado Financiero 1S 2026', time: 'Hace 3 días', status: 'success', icon: Shield },
  { action: 'Foto de galería', item: '12 nuevas fotos de evento', time: 'Hace 5 días', status: 'info', icon: Camera },
  { action: 'Testimonio nuevo', item: 'Prof. Juan Carlos Mendoza', time: 'Hace 1 semana', status: 'pending', icon: Users },
];

const contentModules = [
  { title: 'Hero / Banner', description: 'Editar foto, título y texto del inicio', href: '/admin/hero', icon: LayoutDashboard, color: 'bg-orange-100 text-orange-600' },
  { title: 'Noticias', description: 'Crear, editar y publicar noticias', href: '/admin/news', icon: Newspaper, color: 'bg-blue-100 text-blue-600' },
  { title: 'Acciones', description: 'Gestionar acciones del Director', href: '/admin/actions', icon: Zap, color: 'bg-green-100 text-green-600' },
  { title: 'Galería', description: 'Administrar fotos y videos', href: '/admin/gallery', icon: Camera, color: 'bg-purple-100 text-purple-600' },
  { title: 'Transparencia', description: 'Subir y organizar documentos', href: '/admin/transparency', icon: Shield, color: 'bg-teal-100 text-teal-600' },
  { title: 'Estadísticas', description: 'Actualizar contadores del sitio', href: '/admin/stats', icon: BarChart3, color: 'bg-yellow-100 text-yellow-600' },
  { title: 'Testimonios', description: 'Moderar testimonios del magisterio', href: '/admin/testimonials', icon: Users, color: 'bg-pink-100 text-pink-600' },
  { title: 'Regiones', description: 'Gestionar cobertura en el mapa', href: '/admin/regions', icon: TrendingUp, color: 'bg-indigo-100 text-indigo-600' },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8 max-w-7xl">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold">¡Bienvenido, Administrador!</h1>
            <p className="text-orange-100 mt-1 text-sm">
              Panel de gestión del portal institucional · Fondo de Ahorro SNTE Sección 51
            </p>
          </div>
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
          >
            <Eye size={16}/>
            <span>Ver sitio en vivo</span>
            <ArrowUpRight size={14}/>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                <stat.icon size={18}/>
              </div>
              <span className="text-green-500 text-xs font-bold bg-green-50 px-2 py-0.5 rounded-full">
                {stat.change} este mes
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
            <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick actions */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Plus size={18} className="text-orange-500"/>
            Acciones rápidas
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, i) => (
              <Link
                key={i}
                href={action.href}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl text-center hover:scale-105 transition-all duration-200 shadow-sm ${action.color}`}
              >
                <action.icon size={20}/>
                <span className="text-xs font-medium leading-tight">{action.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Clock size={18} className="text-orange-500"/>
            Actividad reciente
          </h2>
          <div className="space-y-3">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  activity.status === 'success' ? 'bg-green-50 text-green-500' :
                  activity.status === 'pending' ? 'bg-yellow-50 text-yellow-500' :
                  'bg-blue-50 text-blue-500'
                }`}>
                  <activity.icon size={15}/>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700">{activity.action}</p>
                  <p className="text-xs text-gray-400 truncate">{activity.item}</p>
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span className="text-xs text-gray-400">{activity.time}</span>
                  {activity.status === 'success' ? (
                    <CheckCircle size={12} className="text-green-400"/>
                  ) : activity.status === 'pending' ? (
                    <AlertCircle size={12} className="text-yellow-400"/>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content modules grid */}
      <div>
        <h2 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
          <Edit3 size={18} className="text-orange-500"/>
          Módulos de contenido
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contentModules.map((module, i) => (
            <Link
              key={i}
              href={module.href}
              className="group bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-orange-200 transition-all duration-200"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${module.color} group-hover:scale-110 transition-transform`}>
                <module.icon size={22}/>
              </div>
              <h3 className="font-bold text-gray-800 text-sm group-hover:text-orange-600 transition-colors">
                {module.title}
              </h3>
              <p className="text-gray-400 text-xs mt-1 leading-relaxed">{module.description}</p>
              <div className="flex items-center gap-1 mt-3 text-orange-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Gestionar</span>
                <ArrowUpRight size={12}/>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
