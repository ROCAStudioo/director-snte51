'use client';

import { useState } from 'react';
import { Plus, Edit3, Trash2, Eye, Search, Filter, Newspaper, Calendar, Tag, ToggleLeft, ToggleRight } from 'lucide-react';
import { newsItems } from '@/data/site-data';

export default function AdminNewsPage() {
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [news, setNews] = useState(newsItems);
  const [form, setForm] = useState({
    title: '', summary: '', category: '', date: '', featured: false, image: ''
  });

  const filtered = news.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleNew = () => {
    setEditingId(null);
    setForm({ title: '', summary: '', category: '', date: '', featured: false, image: '' });
    setShowForm(true);
  };

  const handleEdit = (id: number) => {
    const item = news.find(n => n.id === id);
    if (!item) return;
    setEditingId(id);
    setForm({ title: item.title, summary: item.summary, category: item.category, date: item.date, featured: item.featured, image: item.image });
    setShowForm(true);
  };

  const handleSave = () => {
    if (editingId) {
      setNews(prev => prev.map(n => n.id === editingId ? { ...n, ...form } : n));
    } else {
      const newItem = { ...form, id: Date.now(), content: '', slug: form.title.toLowerCase().replace(/\s+/g, '-') };
      setNews(prev => [newItem, ...prev]);
    }
    setShowForm(false);
  };

  const handleDelete = (id: number) => {
    if (confirm('¿Eliminar esta noticia?')) {
      setNews(prev => prev.filter(n => n.id !== id));
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Newspaper className="text-orange-500" size={24}/>
            Gestión de Noticias
          </h1>
          <p className="text-gray-500 text-sm mt-1">Crear, editar y administrar las noticias del portal</p>
        </div>
        <button
          onClick={handleNew}
          className="flex items-center gap-2 px-4 py-2.5 gradient-orange text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all text-sm"
        >
          <Plus size={16}/>
          <span>Nueva noticia</span>
        </button>
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl p-6">
            <h2 className="font-bold text-gray-800 text-lg mb-5">
              {editingId ? 'Editar noticia' : 'Nueva noticia'}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Título</label>
                <input type="text" value={form.title} onChange={e => setForm(p => ({...p, title: e.target.value}))}
                  placeholder="Título de la noticia" className="form-input"/>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Categoría</label>
                  <select value={form.category} onChange={e => setForm(p => ({...p, category: e.target.value}))} className="form-input">
                    <option value="">Seleccionar</option>
                    <option>Finanzas</option><option>Servicios</option>
                    <option>Cobertura</option><option>Reconocimientos</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Fecha</label>
                  <input type="date" value={form.date} onChange={e => setForm(p => ({...p, date: e.target.value}))} className="form-input"/>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Resumen</label>
                <textarea rows={4} value={form.summary} onChange={e => setForm(p => ({...p, summary: e.target.value}))}
                  placeholder="Resumen de la noticia..." className="form-input resize-none"/>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => setForm(p => ({...p, featured: !p.featured}))} className="text-orange-500">
                  {form.featured ? <ToggleRight size={28}/> : <ToggleLeft size={28} className="text-gray-400"/>}
                </button>
                <label className="text-sm text-gray-600 font-medium">Marcar como noticia destacada</label>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowForm(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors">
                Cancelar
              </button>
              <button onClick={handleSave} className="flex-1 py-2.5 gradient-orange text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all">
                {editingId ? 'Guardar cambios' : 'Publicar noticia'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="flex gap-4 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
          <input type="text" placeholder="Buscar noticias..." value={search} onChange={e => setSearch(e.target.value)}
            className="form-input pl-9"/>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-500 hover:bg-gray-50 transition-colors">
          <Filter size={14}/>
          <span>Filtrar</span>
        </button>
      </div>

      {/* News table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Noticia</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Categoría</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">Fecha</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Estado</th>
                <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(item => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-medium text-gray-800 text-sm line-clamp-1">{item.title}</p>
                    <p className="text-gray-400 text-xs line-clamp-1 mt-0.5 hidden sm:block">{item.summary.substring(0, 60)}...</p>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <span className="bg-orange-50 text-orange-600 text-xs font-medium px-2.5 py-1 rounded-full border border-orange-100">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-4 py-4 hidden sm:table-cell">
                    <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                      <Calendar size={12}/>
                      <span>{item.date}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    {item.featured ? (
                      <span className="bg-green-50 text-green-600 text-xs font-medium px-2.5 py-1 rounded-full">Destacada</span>
                    ) : (
                      <span className="bg-gray-100 text-gray-500 text-xs font-medium px-2.5 py-1 rounded-full">Normal</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye size={15}/>
                      </button>
                      <button onClick={() => handleEdit(item.id)} className="p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors">
                        <Edit3 size={15}/>
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={15}/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <Newspaper size={40} className="mx-auto mb-3 opacity-30"/>
            <p className="text-sm">No se encontraron noticias</p>
          </div>
        )}
      </div>
    </div>
  );
}
