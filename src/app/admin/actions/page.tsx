'use client';

import { useState } from 'react';
import { Zap, Plus, Edit3, Trash2, Search, Calendar } from 'lucide-react';
import { actionCards } from '@/data/site-data';

export default function AdminActionsPage() {
  const [search, setSearch] = useState('');
  const [items, setItems] = useState(actionCards);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', category: '', date: '' });

  const filtered = items.filter(i =>
    i.title.toLowerCase().includes(search.toLowerCase()) ||
    i.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = () => {
    const newItem = { ...form, id: Date.now(), image: '', slug: form.title.toLowerCase().replace(/\s+/g, '-') };
    setItems(prev => [newItem, ...prev]);
    setForm({ title: '', description: '', category: '', date: '' });
    setShowForm(false);
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Zap className="text-orange-500" size={24}/>
            Acciones del Director
          </h1>
          <p className="text-gray-500 text-sm mt-1">Registrar y publicar acciones institucionales</p>
        </div>
        <button onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2.5 gradient-orange text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all text-sm">
          <Plus size={16}/><span>Nueva acción</span>
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl p-6">
            <h2 className="font-bold text-gray-800 text-lg mb-5">Nueva acción</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Título</label>
                <input type="text" value={form.title} onChange={e => setForm(p => ({...p, title: e.target.value}))} className="form-input" placeholder="Título de la acción"/>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Categoría</label>
                  <select value={form.category} onChange={e => setForm(p => ({...p, category: e.target.value}))} className="form-input">
                    <option value="">Seleccionar</option>
                    <option>Jornadas</option><option>Apoyos</option>
                    <option>Capacitación</option><option>Convenios</option>
                    <option>Tecnología</option><option>Asambleas</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Fecha</label>
                  <input type="date" value={form.date} onChange={e => setForm(p => ({...p, date: e.target.value}))} className="form-input"/>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Descripción</label>
                <textarea rows={4} value={form.description} onChange={e => setForm(p => ({...p, description: e.target.value}))}
                  className="form-input resize-none" placeholder="Descripción de la acción..."/>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowForm(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors">Cancelar</button>
              <button onClick={handleSave} className="flex-1 py-2.5 gradient-orange text-white text-sm font-semibold rounded-xl shadow-md transition-all">Publicar acción</button>
            </div>
          </div>
        </div>
      )}

      <div className="relative max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
        <input type="text" placeholder="Buscar acciones..." value={search} onChange={e => setSearch(e.target.value)} className="form-input pl-9"/>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map(item => (
          <div key={item.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all group">
            <div className="flex items-start justify-between mb-3">
              <span className="bg-orange-50 text-orange-600 text-xs font-medium px-2.5 py-1 rounded-full border border-orange-100">
                {item.category}
              </span>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"><Edit3 size={13}/></button>
                <button onClick={() => setItems(prev => prev.filter(i => i.id !== item.id))}
                  className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={13}/></button>
              </div>
            </div>
            <h3 className="font-bold text-gray-800 text-sm mb-2 line-clamp-2">{item.title}</h3>
            <p className="text-gray-500 text-xs line-clamp-2 mb-3">{item.description}</p>
            <div className="flex items-center gap-1.5 text-gray-400 text-xs">
              <Calendar size={11}/><span>{item.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
