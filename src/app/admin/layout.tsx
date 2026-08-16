'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Image as ImageIcon,
  FileText,
  Newspaper,
  Zap,
  Camera,
  Shield,
  MessageSquare,
  BarChart3,
  MapPin,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  ChevronRight,
  Star,
} from 'lucide-react';

const navGroups = [
  {
    label: 'Principal',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
      { icon: Settings, label: 'Configuración', href: '/admin/settings' },
    ],
  },
  {
    label: 'Contenido',
    items: [
      { icon: ImageIcon, label: 'Banner / Hero', href: '/admin/hero' },
      { icon: Newspaper, label: 'Noticias', href: '/admin/news' },
      { icon: Zap, label: 'Acciones', href: '/admin/actions' },
      { icon: Camera, label: 'Galería', href: '/admin/gallery' },
      { icon: MessageSquare, label: 'Testimonios', href: '/admin/testimonials' },
    ],
  },
  {
    label: 'Información',
    items: [
      { icon: FileText, label: 'Transparencia', href: '/admin/transparency' },
      { icon: BarChart3, label: 'Estadísticas', href: '/admin/stats' },
      { icon: MapPin, label: 'Regiones', href: '/admin/regions' },
    ],
  },
  {
    label: 'Sistema',
    items: [
      { icon: Users, label: 'Usuarios', href: '/admin/users' },
    ],
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  // Simple client-side auth simulation
  useEffect(() => {
    const auth = sessionStorage.getItem('admin_auth');
    if (auth === 'true') setIsAuthenticated(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo credentials - in production this would be an API call
    if (loginData.username === 'admin' && loginData.password === 'snte51admin') {
      sessionStorage.setItem('admin_auth', 'true');
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Credenciales incorrectas. Intenta de nuevo.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    setIsAuthenticated(false);
  };

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl gradient-orange mx-auto flex items-center justify-center shadow-xl mb-4">
              <span className="text-white font-bold text-xl">FA</span>
            </div>
            <h1 className="text-white text-2xl font-bold">Panel Administrativo</h1>
            <p className="text-gray-400 text-sm mt-1">Fondo de Ahorro SNTE Sección 51</p>
          </div>

          {/* Login form */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <h2 className="font-bold text-gray-800 text-lg mb-6">Iniciar sesión</h2>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Usuario</label>
                <input
                  type="text"
                  value={loginData.username}
                  onChange={e => setLoginData(p => ({ ...p, username: e.target.value }))}
                  placeholder="tu_usuario"
                  className="form-input"
                  autoComplete="username"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Contraseña</label>
                <input
                  type="password"
                  value={loginData.password}
                  onChange={e => setLoginData(p => ({ ...p, password: e.target.value }))}
                  placeholder="••••••••"
                  className="form-input"
                  autoComplete="current-password"
                />
              </div>

              {loginError && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 gradient-orange text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
              >
                Ingresar al Panel
              </button>
            </form>

            <div className="mt-6 p-4 bg-orange-50 rounded-xl border border-orange-100">
              <p className="text-xs text-orange-600 font-medium">Acceso demo:</p>
              <p className="text-xs text-gray-500 mt-1">Usuario: <code className="bg-white px-1 rounded">admin</code></p>
              <p className="text-xs text-gray-500">Contraseña: <code className="bg-white px-1 rounded">snte51admin</code></p>
            </div>

            <div className="text-center mt-4">
              <Link href="/" className="text-orange-500 text-sm hover:text-orange-600 transition-colors">
                ← Volver al sitio principal
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside
        className={`admin-sidebar fixed inset-y-0 left-0 z-50 w-64 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
          <div className="w-9 h-9 rounded-xl gradient-orange flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">FA</span>
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-tight">Admin Panel</p>
            <p className="text-gray-400 text-xs">SNTE Sección 51</p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto lg:hidden text-gray-400 hover:text-white"
          >
            <X size={18}/>
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {navGroups.map(group => (
            <div key={group.label} className="mb-6">
              <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider px-3 mb-2">
                {group.label}
              </p>
              <div className="space-y-1">
                {group.items.map(item => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-orange-500 text-white shadow-md'
                          : 'text-gray-400 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <item.icon size={16}/>
                      <span>{item.label}</span>
                      {isActive && <ChevronRight size={14} className="ml-auto"/>}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* User info */}
        <div className="px-3 py-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-9 h-9 rounded-xl gradient-orange flex items-center justify-center">
              <span className="text-white font-bold text-sm">AD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">Administrador</p>
              <div className="flex items-center gap-1">
                <Star size={10} className="text-orange-400 fill-orange-400"/>
                <p className="text-gray-400 text-xs">Super Admin</p>
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-all duration-200 text-sm"
          >
            <LogOut size={15}/>
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 sm:px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors"
              >
                <Menu size={20}/>
              </button>
              <div>
                <p className="font-bold text-gray-800 text-sm">Panel de Administración</p>
                <p className="text-gray-400 text-xs">Fondo de Ahorro · SNTE Sección 51</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="relative p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors">
                <Bell size={18}/>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-orange-500"/>
              </button>
              <Link
                href="/"
                target="_blank"
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-xl text-sm text-gray-500 hover:text-orange-500 hover:border-orange-300 transition-all"
              >
                <span>Ver sitio</span>
                <ChevronRight size={14}/>
              </Link>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
