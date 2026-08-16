'use client';

import { useState, useEffect } from 'react';
import { Shield, Plus, Trash2, Download, Upload } from 'lucide-react';

interface DocItem {
  id: number;
  title: string;
  type: string;
  date: string;
  size?: string;
  url: string;
}

const typeLabels: Record<string, string> = {
  REPORT: 'Informe', ANNOUNCEMENT: 'Convocatoria', REGULATION: 'Reglamento',
  FINANCIAL: 'Estado Financiero', OFFICIAL: 'Documento Oficial',
};

export default function AdminTransparencyPage() {
  const [docs, setDocs] = useState<DocItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', type: 'REPORT', date: '', url: '', size: '' });

  useEffect(() => {
    fetch('/api/transparency').then(r => r.json()).then(data => { setDocs(data); setLoading(false); });
  }, []);

  const handleSave = async () => {
    const res = await fetch('/api/transparency', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    const created = await res.json();
    setDocs(prev => [created, ...prev]);
    setForm({ title: '', type: 'REPORT', date: '', url: '', size: '' });
    setShowForm(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar?')) return;
    await fetch('/api/transparency', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    setDocs(prev => prev.filter(d => d.id !== id));
  };

  if (loading) return <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"/></div>;

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2"><Shield className="text-orange-500" size={24}/>Transparencia</h1>
          <p className="text-gray-500 text-sm mt-1">{docs.length} documentos en base de datos</p>
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2.5 gradient-orange text-white font-semibold rounded-xl shadow-md text-sm"><Upload size={16}/>Agregar documento</button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6">
            <h2 className="font-bold text-gray-800 text-lg mb-5">Nuevo documento</h2>
            <div className="space-y-4">
              <div><label className="block text-xs font-semibold text-gray-500 mb-1.5">Título</label><input type="text" value={form.title} onChange={e => setForm(p => ({...p, title: e.target.value}))} className="form-input"/></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs font-semibold text-gray-500 mb-1.5">Tipo</label>
                  <select value={form.type} onChange={e => setForm(p => ({...p, type: e.target.value}))} className="form-input">
                    {Object.entries(typeLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                  </select>
                </div>
                <div><label className="block text-xs font-semibold text-gray-500 mb-1.5">Fecha</label><input type="text" value={form.date} onChange={e => setForm(p => ({...p, date: e.target.value}))} className="form-input" placeholder="Julio 2026"/></div>
              </div>
              <div><label className="block text-xs font-semibold text-gray-500 mb-1.5">URL del archivo</label><input type="text" value={form.url} onChange={e => setForm(p => ({...p, url: e.target.value}))} className="form-input" placeholder="/docs/archivo.pdf"/></div>
              <div><label className="block text-xs font-semibold text-gray-500 mb-1.5">Tamaño</label><input type="text" value={form.size} onChange={e => setForm(p => ({...p, size: e.target.value}))} className="form-input" placeholder="2.5 MB"/></div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowForm(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600">Cancelar</button>
              <button onClick={handleSave} className="flex-1 py-2.5 gradient-orange text-white text-sm font-semibold rounded-xl shadow-md">Publicar</button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {docs.map(doc => (
          <div key={doc.id} className="group bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-3">
              <span className="bg-orange-50 text-orange-600 text-xs font-medium px-2.5 py-1 rounded-full border border-orange-100">{typeLabels[doc.type] || doc.type}</span>
              <button onClick={() => handleDelete(doc.id)} className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={14}/></button>
            </div>
            <h3 className="font-bold text-gray-800 text-sm mb-1 line-clamp-2">{doc.title}</h3>
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-3"><span>{doc.date}</span>{doc.size && <><span>·</span><span>{doc.size}</span></>}</div>
            <a href={doc.url} target="_blank" className="w-full flex items-center justify-center gap-1.5 py-2 bg-gray-50 hover:bg-orange-50 border border-gray-200 hover:border-orange-200 rounded-xl text-xs font-medium text-gray-500 hover:text-orange-500 transition-all">
              <Download size={13}/><span>Descargar</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
