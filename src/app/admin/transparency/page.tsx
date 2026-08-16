'use client';

import { useState } from 'react';
import { Shield, Plus, Trash2, Download, Upload, Search } from 'lucide-react';
import { transparencyDocs } from '@/data/site-data';

const typeLabels: Record<string, string> = {
  report: 'Informe', announcement: 'Convocatoria', regulation: 'Reglamento',
  financial: 'Estado Financiero', official: 'Documento Oficial',
};

export default function AdminTransparencyPage() {
  const [docs, setDocs] = useState(transparencyDocs);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', type: 'report', date: '' });

  const filtered = docs.filter(d => d.title.toLowerCase().includes(search.toLowerCase()));

  const handleSave = () => {
    const newDoc = { ...form, id: Date.now(), size: '0 KB', url: '#' };
    setDocs(prev => [newDoc as typeof docs[0], ...prev]);
    setForm({ title: '', type: 'report', date: '' });
    setShowForm(false);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Shield className="text-orange-500" size={24}/>
            Documentos de Transparencia
          </h1>
          <p className="text-gray-500 text-sm mt-1">Subir y administrar documentos institucionales</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2.5 gradient-orange text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all text-sm">
            <Upload size={16}/><span>Subir documento</span>
          </button>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6">
            <h2 className="font-bold text-gray-800 text-lg mb-5">Subir documento</h2>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-orange-200 rounded-2xl p-6 text-center hover:border-orange-400 transition-colors cursor-pointer bg-orange-50">
                <Upload size={32} className="text-orange-300 mx-auto mb-2"/>
                <p className="text-sm text-gray-600 font-medium">Seleccionar archivo PDF</p>
                <p className="text-xs text-gray-400 mt-1">PDF · Máx. 20MB</p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Título del documento</label>
                <input type="text" value={form.title} onChange={e => setForm(p => ({...p, title: e.target.value}))} className="form-input" placeholder="Nombre del documento"/>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Tipo</label>
                  <select value={form.type} onChange={e => setForm(p => ({...p, type: e.target.value}))} className="form-input">
                    {Object.entries(typeLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Fecha</label>
                  <input type="month" value={form.date} onChange={e => setForm(p => ({...p, date: e.target.value}))} className="form-input"/>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowForm(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors">Cancelar</button>
              <button onClick={handleSave} className="flex-1 py-2.5 gradient-orange text-white text-sm font-semibold rounded-xl shadow-md transition-all">Publicar</button>
            </div>
          </div>
        </div>
      )}

      <div className="relative max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
        <input type="text" placeholder="Buscar documentos..." value={search} onChange={e => setSearch(e.target.value)} className="form-input pl-9"/>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(doc => (
          <div key={doc.id} className="group bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-3">
              <span className="bg-orange-50 text-orange-600 text-xs font-medium px-2.5 py-1 rounded-full border border-orange-100">
                {typeLabels[doc.type] || doc.type}
              </span>
              <button onClick={() => setDocs(prev => prev.filter(d => d.id !== doc.id))}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg">
                <Trash2 size={14}/>
              </button>
            </div>
            <h3 className="font-bold text-gray-800 text-sm mb-1 line-clamp-2">{doc.title}</h3>
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
              <span>{doc.date}</span><span>·</span><span>{doc.size}</span>
            </div>
            <button className="w-full flex items-center justify-center gap-1.5 py-2 bg-gray-50 hover:bg-orange-50 border border-gray-200 hover:border-orange-200 rounded-xl text-xs font-medium text-gray-500 hover:text-orange-500 transition-all">
              <Download size={13}/><span>Descargar</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
