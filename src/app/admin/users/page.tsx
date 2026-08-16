'use client';

import { useState } from 'react';
import { Users, Plus, Edit3, Trash2, Shield, User, Eye, Search } from 'lucide-react';

type UserRole = 'admin' | 'editor' | 'viewer';

interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  lastLogin: string;
  active: boolean;
}

const roleConfig: Record<UserRole, { label: string; color: string }> = {
  admin: { label: 'Administrador', color: 'bg-red-50 text-red-600 border-red-200' },
  editor: { label: 'Editor', color: 'bg-blue-50 text-blue-600 border-blue-200' },
  viewer: { label: 'Consulta', color: 'bg-gray-50 text-gray-600 border-gray-200' },
};

const initialUsers: AdminUser[] = [
  { id: 1, name: 'Administrador Principal', email: 'admin@fondoahorro51.edu.mx', role: 'admin', lastLogin: 'Hoy, 9:30 AM', active: true },
  { id: 2, name: 'Editor de Contenido', email: 'editor@fondoahorro51.edu.mx', role: 'editor', lastLogin: 'Ayer, 3:45 PM', active: true },
  { id: 3, name: 'Consultor Externo', email: 'consulta@fondoahorro51.edu.mx', role: 'viewer', lastLogin: 'Hace 3 días', active: true },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>(initialUsers);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', role: 'editor' as UserRole, password: '' });

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    if (!form.name || !form.email) return;
    const newUser: AdminUser = {
      id: Date.now(), name: form.name, email: form.email,
      role: form.role, lastLogin: 'Nunca', active: true,
    };
    setUsers(prev => [...prev, newUser]);
    setForm({ name: '', email: '', role: 'editor', password: '' });
    setShowForm(false);
  };

  const handleDelete = (id: number) => {
    if (id === 1) { alert('No puedes eliminar al administrador principal'); return; }
    if (confirm('¿Eliminar este usuario?')) setUsers(prev => prev.filter(u => u.id !== id));
  };

  const toggleActive = (id: number) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, active: !u.active } : u));
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Users className="text-orange-500" size={24}/>
            Gestión de Usuarios
          </h1>
          <p className="text-gray-500 text-sm mt-1">Administrar accesos y roles del panel administrativo</p>
        </div>
        <button onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2.5 gradient-orange text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all text-sm">
          <Plus size={16}/><span>Nuevo usuario</span>
        </button>
      </div>

      {/* Role legend */}
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(roleConfig).map(([role, config]) => (
          <div key={role} className={`rounded-xl p-4 border ${config.color}`}>
            <div className="flex items-center gap-2 mb-1">
              <Shield size={16}/><p className="font-bold text-sm">{config.label}</p>
            </div>
            <p className="text-xs opacity-70">
              {role === 'admin' ? 'Acceso total al panel y configuración' :
               role === 'editor' ? 'Crear y editar contenido del sitio' :
               'Solo lectura, sin modificaciones'}
            </p>
          </div>
        ))}
      </div>

      {/* Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6">
            <h2 className="font-bold text-gray-800 text-lg mb-5">Nuevo usuario</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Nombre completo</label>
                <input type="text" value={form.name} onChange={e => setForm(p => ({...p, name: e.target.value}))}
                  placeholder="Nombre del usuario" className="form-input"/>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Correo electrónico</label>
                <input type="email" value={form.email} onChange={e => setForm(p => ({...p, email: e.target.value}))}
                  placeholder="usuario@email.com" className="form-input"/>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Contraseña temporal</label>
                <input type="password" value={form.password} onChange={e => setForm(p => ({...p, password: e.target.value}))}
                  placeholder="Mínimo 8 caracteres" className="form-input"/>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Rol</label>
                <select value={form.role} onChange={e => setForm(p => ({...p, role: e.target.value as UserRole}))} className="form-input">
                  <option value="admin">Administrador</option>
                  <option value="editor">Editor</option>
                  <option value="viewer">Consulta</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowForm(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                Cancelar
              </button>
              <button onClick={handleAdd} className="flex-1 py-2.5 gradient-orange text-white text-sm font-semibold rounded-xl shadow-md transition-all">
                Crear usuario
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="relative max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
        <input type="text" placeholder="Buscar usuarios..." value={search}
          onChange={e => setSearch(e.target.value)} className="form-input pl-9"/>
      </div>

      {/* Users table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Usuario</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Rol</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Último acceso</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Estado</th>
                <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(user => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl gradient-orange flex items-center justify-center flex-shrink-0">
                        <User size={16} className="text-white"/>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 text-sm">{user.name}</p>
                        <p className="text-gray-400 text-xs">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${roleConfig[user.role].color}`}>
                      {roleConfig[user.role].label}
                    </span>
                  </td>
                  <td className="px-4 py-4 hidden lg:table-cell">
                    <p className="text-gray-500 text-sm">{user.lastLogin}</p>
                  </td>
                  <td className="px-4 py-4">
                    <button onClick={() => toggleActive(user.id)}
                      className={`text-xs font-medium px-2.5 py-1 rounded-full border transition-colors ${
                        user.active ? 'bg-green-50 text-green-600 border-green-200' : 'bg-gray-50 text-gray-500 border-gray-200'
                      }`}>
                      {user.active ? 'Activo' : 'Inactivo'}
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"><Eye size={15}/></button>
                      <button className="p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"><Edit3 size={15}/></button>
                      <button onClick={() => handleDelete(user.id)} disabled={user.id === 1}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
                        <Trash2 size={15}/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
