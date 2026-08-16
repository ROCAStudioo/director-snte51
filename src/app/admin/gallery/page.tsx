'use client';

import { useState, useEffect } from 'react';
import { Camera, Plus, Trash2, Upload } from 'lucide-react';

interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  category: string;
  width?: number;
  height?: number;
}

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ src: '', alt: '', category: 'REGIONAL', width: 800, height: 600 });

  useEffect(() => {
    fetch('/api/gallery').then(r => r.json()).then(data => { setItems(data); setLoading(false); });
  }, []);

  const handleSave = async () => {
    const res = await fetch('/api/gallery', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, type: 'IMAGE' }) });
    const created = await res.json();
    setItems(prev => [created, ...prev]);
    setForm({ src: '', alt: '', category: 'REGIONAL', width: 800, height: 600 });
    setShowForm(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar esta imagen?')) return;
    await fetch('/api/gallery', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    setItems(prev => prev.filter(i => i.id !== id));
  };

  if (loading) return <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"/></div>;

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2"><Camera className="text-orange-500" size={24}/>Galería</h1>
          <p className="text-gray-500 text-sm mt-1">Conectado a base de datos · {items.length} fotos</p>
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2.5 gradient-orange text-white font-semibold rounded-xl shadow-md text-sm"><Upload size={16}/>Agregar foto</button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6">
            <h2 className="font-bold text-gray-800 text-lg mb-5">Agregar imagen</h2>
            <div className="space-y-4">
              <div><label className="block text-xs font-semibold text-gray-500 mb-1.5">URL de la imagen</label><input type="text" value={form.src} onChange={e => setForm(p => ({...p, src: e.target.value}))} className="form-input" placeholder="/images/gallery/foto.jpg"/></div>
              <div><label className="block text-xs font-semibold text-gray-500 mb-1.5">Descripción</label><input type="text" value={form.alt} onChange={e => setForm(p => ({...p, alt: e.target.value}))} className="form-input" placeholder="Descripción de la foto"/></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs font-semibold text-gray-500 mb-1.5">Ancho (px)</label><input type="number" value={form.width} onChange={e => setForm(p => ({...p, width: Number(e.target.value)}))} className="form-input"/></div>
                <div><label className="block text-xs font-semibold text-gray-500 mb-1.5">Alto (px)</label><input type="number" value={form.height} onChange={e => setForm(p => ({...p, height: Number(e.target.value)}))} className="form-input"/></div>
              </div>
              <div><label className="block text-xs font-semibold text-gray-500 mb-1.5">Categoría</label>
                <select value={form.category} onChange={e => setForm(p => ({...p, category: e.target.value}))} className="form-input">
                  <option value="REGIONAL">Regional</option>
                  <option value="EVENTS">Eventos</option>
                  <option value="MEETINGS">Reuniones</option>
                  <option value="CONFERENCES">Conferencias</option>
                  <option value="TRAINING">Capacitación</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowForm(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600">Cancelar</button>
              <button onClick={handleSave} className="flex-1 py-2.5 gradient-orange text-white text-sm font-semibold rounded-xl shadow-md">Agregar</button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map(item => (
          <div key={item.id} className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="relative bg-gradient-to-br from-orange-50 to-orange-100" style={{ paddingBottom: '75%' }}>
              <img src={item.src} alt={item.alt} className="absolute inset-0 w-full h-full object-cover"/>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-500 rounded-xl text-white hover:bg-red-600 shadow-md"><Trash2 size={16}/></button>
              </div>
            </div>
            <div className="p-3">
              <p className="text-xs text-gray-500 font-medium line-clamp-1">{item.alt}</p>
            </div>
          </div>
        ))}

        <button onClick={() => setShowForm(true)} className="bg-white rounded-2xl border-2 border-dashed border-orange-200 hover:border-orange-400 hover:bg-orange-50 transition-all flex flex-col items-center justify-center gap-2 p-6 min-h-[120px]">
          <Plus size={24} className="text-orange-400"/><p className="text-xs text-orange-400 font-medium">Agregar foto</p>
        </button>
      </div>
    </div>
  );
}
