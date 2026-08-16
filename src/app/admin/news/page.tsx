'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit3, Trash2, Search, Calendar, Newspaper } from 'lucide-react';

interface NewsItem {
  id: number;
  title: string;
  summary: string;
  category: string;
  date: string;
  featured: boolean;
  image?: string;
}

export default function AdminNewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ title: '', summary: '', category: '', date: '', featured: false, image: '' });

  useEffect(() => {
    fetch('/api/news').then(r => r.json()).then(data => { setNews(data); setLoading(false); });
  }, []);

  const filtered = news.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleNew = () => {
    setEditingId(null);
    setForm({ title: '', summary: '', category: '', date: '', featured: false, image: '' });
    setShowForm(true);
  };

  const handleEdit = (item: NewsItem) => {
    setEditingId(item.id);
    setForm({ title: item.title, summary: item.summary, category: item.category, date: item.date, featured: item.featured, image: item.image || '' });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (editingId) {
      const res = await fetch('/api/news', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editingId, ...form }) });
      const updated = await res.json();
      setNews(prev => prev.map(n => n.id === editingId ? updated : n));
    } else {
      const res = await fetch('/api/news', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const created = await res.json();
      setNews(prev => [created, ...prev]);
    }
    setShowForm(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar esta noticia?')) return;
    await fetch('/api/news', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    setNews(prev => prev.filter(n => n.id !== id));
  };

  if (loading) return <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"/></div>;

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Newspaper className="text-orange-500" size={24}/>Gestión de Noticias
          </h1>
          <p className="text-gray-500 text-sm mt-1">Los cambios se guardan en la base de datos</p>
        </div>
        <button onClick={handleNew} className="flex items-center gap-2 px-4 py-2.5 gradient-orange text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all text-sm">
          <Plus size={16}/><span>Nueva noticia</span>
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl p-6">
            <h2 className="font-bold text-gray-800 text-lg mb-5">{editingId ? 'Editar noticia' : 'Nueva noticia'}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Título</label>
                <input type="text" value={form.title} onChange={e => setForm(p => ({...p, title: e.target.value}))} className="form-input" placeholder="Título"/>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Categoría</label>
                  <input type="text" value={form.category} onChange={e => setForm(p => ({...p, category: e.target.value}))} className="form-input" placeholder="Ej: Jornada"/>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Fecha</label>
                  <input type="text" value={form.date} onChange={e => setForm(p => ({...p, date: e.target.value}))} className="form-input" placeholder="Ej: 15 de julio de 2026"/>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Imagen (URL)</label>
                <input type="text" value={form.image} onChange={e => setForm(p => ({...p, image: e.target.value}))} className="form-input" placeholder="/images/news/foto.jpg"/>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Resumen</label>
                <textarea rows={4} value={form.summary} onChange={e => setForm(p => ({...p, summary: e.target.value}))} className="form-input resize-none" placeholder="Resumen..."/>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowForm(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50">Cancelar</button>
              <button onClick={handleSave} className="flex-1 py-2.5 gradient-orange text-white text-sm font-semibold rounded-xl shadow-md">{editingId ? 'Guardar' : 'Publicar'}</button>
            </div>
          </div>
        </div>
      )}

      <div className="relative max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
        <input type="text" placeholder="Buscar..." value={search} onChange={e => setSearch(e.target.value)} className="form-input pl-9"/>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase">Noticia</th>
              <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Categoría</th>
              <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase hidden sm:table-cell">Fecha</th>
              <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(item => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-5 py-4"><p className="font-medium text-gray-800 text-sm line-clamp-1">{item.title}</p></td>
                <td className="px-4 py-4 hidden md:table-cell"><span className="bg-orange-50 text-orange-600 text-xs font-medium px-2.5 py-1 rounded-full">{item.category}</span></td>
                <td className="px-4 py-4 hidden sm:table-cell"><span className="text-gray-500 text-sm">{item.date}</span></td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => handleEdit(item)} className="p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg"><Edit3 size={15}/></button>
                    <button onClick={() => handleDelete(item.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={15}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="text-center py-12 text-gray-400"><p>No hay noticias</p></div>}
      </div>
    </div>
  );
}
