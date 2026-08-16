'use client';

import { useState, useEffect } from 'react';
import { MapPin, Plus, Edit3, Trash2, Users, Calendar } from 'lucide-react';

interface RegionItem {
  id: string;
  name: string;
  description?: string;
  attendees: number;
  date: string;
  services: string[];
  lat: number;
  lng: number;
}

export default function AdminRegionsPage() {
  const [items, setItems] = useState<RegionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', attendees: '', date: '', services: '', lat: '19.0', lng: '-98.2' });

  useEffect(() => {
    fetch('/api/regions').then(r => r.json()).then(data => { setItems(data); setLoading(false); });
  }, []);

  const handleSave = async () => {
    const newRegion = {
      id: form.name.toLowerCase().replace(/\s+/g, '-'),
      name: form.name,
      lat: parseFloat(form.lat),
      lng: parseFloat(form.lng),
      date: form.date,
      services: form.services.split(',').map(s => s.trim()),
      attendees: parseInt(form.attendees) || 0,
      description: form.description,
    };
    const res = await fetch('/api/regions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newRegion) });
    const created = await res.json();
    setItems(prev => [...prev, created]);
    setForm({ name: '', description: '', attendees: '', date: '', services: '', lat: '19.0', lng: '-98.2' });
    setShowForm(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar esta región?')) return;
    await fetch('/api/regions', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    setItems(prev => prev.filter(i => i.id !== id));
  };

  if (loading) return <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"/></div>;

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2"><MapPin className="text-orange-500" size={24}/>Regiones</h1>
          <p className="text-gray-500 text-sm mt-1">Cobertura regional · {items.length} regiones</p>
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2.5 gradient-orange text-white font-semibold rounded-xl shadow-md text-sm"><Plus size={16}/>Agregar región</button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6">
            <h2 className="font-bold text-gray-800 text-lg mb-5">Nueva región</h2>
            <div className="space-y-4">
              <div><label className="block text-xs font-semibold text-gray-500 mb-1.5">Nombre</label><input type="text" value={form.name} onChange={e => setForm(p => ({...p, name: e.target.value}))} className="form-input"/></div>
              <div><label className="block text-xs font-semibold text-gray-500 mb-1.5">Descripción</label><textarea rows={2} value={form.description} onChange={e => setForm(p => ({...p, description: e.target.value}))} className="form-input resize-none"/></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs font-semibold text-gray-500 mb-1.5">Asistentes</label><input type="number" value={form.attendees} onChange={e => setForm(p => ({...p, attendees: e.target.value}))} className="form-input"/></div>
                <div><label className="block text-xs font-semibold text-gray-500 mb-1.5">Fecha</label><input type="text" value={form.date} onChange={e => setForm(p => ({...p, date: e.target.value}))} className="form-input" placeholder="Julio 2026"/></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs font-semibold text-gray-500 mb-1.5">Latitud</label><input type="text" value={form.lat} onChange={e => setForm(p => ({...p, lat: e.target.value}))} className="form-input"/></div>
                <div><label className="block text-xs font-semibold text-gray-500 mb-1.5">Longitud</label><input type="text" value={form.lng} onChange={e => setForm(p => ({...p, lng: e.target.value}))} className="form-input"/></div>
              </div>
              <div><label className="block text-xs font-semibold text-gray-500 mb-1.5">Servicios (separados por coma)</label><input type="text" value={form.services} onChange={e => setForm(p => ({...p, services: e.target.value}))} className="form-input" placeholder="Préstamos, Asesoría"/></div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowForm(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600">Cancelar</button>
              <button onClick={handleSave} className="flex-1 py-2.5 gradient-orange text-white text-sm font-semibold rounded-xl shadow-md">Guardar</button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map(region => (
          <div key={region.id} className="group bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl gradient-orange flex items-center justify-center"><MapPin size={18} className="text-white"/></div>
              <button onClick={() => handleDelete(region.id)} className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={13}/></button>
            </div>
            <h3 className="font-bold text-gray-800 text-base mb-1">{region.name}</h3>
            <p className="text-gray-500 text-xs mb-3 line-clamp-2">{region.description}</p>
            <div className="flex gap-3 mb-3">
              <div className="flex items-center gap-1 text-xs text-gray-500"><Users size={11} className="text-orange-500"/><span>{region.attendees.toLocaleString()}</span></div>
              <div className="flex items-center gap-1 text-xs text-gray-500"><Calendar size={11} className="text-orange-500"/><span>{region.date}</span></div>
            </div>
            <div className="flex flex-wrap gap-1">
              {region.services?.slice(0, 2).map((s, i) => (
                <span key={i} className="text-xs bg-orange-50 text-orange-600 border border-orange-100 px-2 py-0.5 rounded-full">{s}</span>
              ))}
              {(region.services?.length || 0) > 2 && <span className="text-xs text-gray-400">+{region.services.length - 2}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
