'use client';

import { useState, useEffect } from 'react';
import { MessageSquare, Plus, Trash2, Check, Star } from 'lucide-react';

interface TestimonialItem {
  id: number;
  name: string;
  municipality: string;
  role: string;
  comment: string;
  approved: boolean;
}

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', municipality: '', role: '', comment: '' });

  useEffect(() => {
    fetch('/api/testimonials').then(r => r.json()).then(data => { setItems(data); setLoading(false); });
  }, []);

  const handleSave = async () => {
    const res = await fetch('/api/testimonials', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, approved: true }) });
    const created = await res.json();
    setItems(prev => [created, ...prev]);
    setForm({ name: '', municipality: '', role: '', comment: '' });
    setShowForm(false);
  };

  const toggleApproval = async (item: TestimonialItem) => {
    const res = await fetch('/api/testimonials', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: item.id, approved: !item.approved }) });
    const updated = await res.json();
    setItems(prev => prev.map(i => i.id === item.id ? updated : i));
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar?')) return;
    await fetch('/api/testimonials', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    setItems(prev => prev.filter(i => i.id !== id));
  };

  if (loading) return <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"/></div>;

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2"><MessageSquare className="text-orange-500" size={24}/>Testimonios</h1>
          <p className="text-gray-500 text-sm mt-1">Conectado a la base de datos</p>
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2.5 gradient-orange text-white font-semibold rounded-xl shadow-md text-sm"><Plus size={16}/>Agregar</button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6">
            <h2 className="font-bold text-gray-800 text-lg mb-5">Nuevo testimonio</h2>
            <div className="space-y-4">
              <div><label className="block text-xs font-semibold text-gray-500 mb-1.5">Nombre</label><input type="text" value={form.name} onChange={e => setForm(p => ({...p, name: e.target.value}))} className="form-input"/></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs font-semibold text-gray-500 mb-1.5">Municipio</label><input type="text" value={form.municipality} onChange={e => setForm(p => ({...p, municipality: e.target.value}))} className="form-input"/></div>
                <div><label className="block text-xs font-semibold text-gray-500 mb-1.5">Cargo</label><input type="text" value={form.role} onChange={e => setForm(p => ({...p, role: e.target.value}))} className="form-input"/></div>
              </div>
              <div><label className="block text-xs font-semibold text-gray-500 mb-1.5">Testimonio</label><textarea rows={4} value={form.comment} onChange={e => setForm(p => ({...p, comment: e.target.value}))} className="form-input resize-none"/></div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowForm(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600">Cancelar</button>
              <button onClick={handleSave} className="flex-1 py-2.5 gradient-orange text-white text-sm font-semibold rounded-xl shadow-md">Guardar</button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {items.map(item => (
          <div key={item.id} className={`group bg-white rounded-2xl p-5 shadow-sm border transition-all ${item.approved ? 'border-green-100' : 'border-yellow-100 bg-yellow-50/30'}`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl gradient-orange flex items-center justify-center"><span className="text-white font-bold text-sm">{item.name.charAt(0)}</span></div>
                <div><p className="font-bold text-gray-800 text-sm">{item.name}</p><p className="text-orange-500 text-xs">{item.role}</p></div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => toggleApproval(item)} className={`p-1.5 rounded-lg ${item.approved ? 'text-green-500 bg-green-50' : 'text-yellow-500 bg-yellow-50'}`}><Check size={14}/></button>
                <button onClick={() => handleDelete(item.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100"><Trash2 size={14}/></button>
              </div>
            </div>
            <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} size={12} className="text-orange-400 fill-orange-400"/>)}</div>
            <p className="text-gray-600 text-sm line-clamp-3 italic">"{item.comment}"</p>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-400">📍 {item.municipality}</p>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${item.approved ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'}`}>{item.approved ? 'Publicado' : 'Pendiente'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
