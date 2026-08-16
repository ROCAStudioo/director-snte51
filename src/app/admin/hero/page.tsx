'use client';

import { useState, useEffect } from 'react';
import { LayoutDashboard, Save, RefreshCw } from 'lucide-react';

export default function AdminHeroPage() {
  const [config, setConfig] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/config').then(r => r.json()).then(data => { setConfig(data); setLoading(false); });
  }, []);

  const handleChange = (key: string, value: string) => {
    setConfig(prev => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    await fetch('/api/config', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(config) });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading) return <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"/></div>;

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2"><LayoutDashboard className="text-orange-500" size={24}/>Hero / Inicio</h1>
          <p className="text-gray-500 text-sm mt-1">Editar textos principales del sitio</p>
        </div>
        <button onClick={handleSave} disabled={saving} className={`flex items-center gap-2 px-4 py-2.5 font-semibold rounded-xl shadow-md text-sm transition-all ${saved ? 'bg-green-500 text-white' : 'gradient-orange text-white'}`}>
          {saving ? <RefreshCw size={16} className="animate-spin"/> : <Save size={16}/>}
          <span>{saved ? '¡Guardado!' : 'Guardar'}</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
        <h2 className="font-bold text-gray-700">Información del Director</h2>
        <div><label className="block text-xs font-semibold text-gray-500 mb-1.5">Nombre completo</label><input type="text" value={config['director.name'] || ''} onChange={e => handleChange('director.name', e.target.value)} className="form-input"/></div>
        <div><label className="block text-xs font-semibold text-gray-500 mb-1.5">Cargo</label><input type="text" value={config['director.title'] || ''} onChange={e => handleChange('director.title', e.target.value)} className="form-input"/></div>
        <div><label className="block text-xs font-semibold text-gray-500 mb-1.5">Organización</label><input type="text" value={config['director.organization'] || ''} onChange={e => handleChange('director.organization', e.target.value)} className="form-input"/></div>
        <div><label className="block text-xs font-semibold text-gray-500 mb-1.5">Sección</label><input type="text" value={config['director.section'] || ''} onChange={e => handleChange('director.section', e.target.value)} className="form-input"/></div>
        <div><label className="block text-xs font-semibold text-gray-500 mb-1.5">Descripción breve (Hero)</label><textarea rows={3} value={config['director.bio'] || ''} onChange={e => handleChange('director.bio', e.target.value)} className="form-input resize-none"/></div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="font-bold text-gray-700 mb-4">Mensaje del Director</h2>
        <textarea rows={8} value={config['director.message'] || ''} onChange={e => handleChange('director.message', e.target.value)} className="form-input resize-none"/>
        <p className="text-xs text-gray-400 mt-2">Usa doble Enter para separar párrafos</p>
      </div>
    </div>
  );
}
