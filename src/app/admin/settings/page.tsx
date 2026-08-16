'use client';

import { useState, useEffect } from 'react';
import { Settings, Save, RefreshCw, Phone, Globe } from 'lucide-react';

export default function AdminSettingsPage() {
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
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2"><Settings className="text-orange-500" size={24}/>Configuración</h1>
          <p className="text-gray-500 text-sm mt-1">Datos de contacto y redes sociales</p>
        </div>
        <button onClick={handleSave} disabled={saving} className={`flex items-center gap-2 px-4 py-2.5 font-semibold rounded-xl shadow-md text-sm transition-all ${saved ? 'bg-green-500 text-white' : 'gradient-orange text-white'}`}>
          {saving ? <RefreshCw size={16} className="animate-spin"/> : <Save size={16}/>}
          <span>{saved ? '¡Guardado!' : 'Guardar'}</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="font-bold text-gray-700 mb-4 flex items-center gap-2"><Phone size={18} className="text-orange-500"/>Contacto</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2"><label className="block text-xs font-semibold text-gray-500 mb-1.5">Dirección</label><input type="text" value={config['contact.address'] || ''} onChange={e => handleChange('contact.address', e.target.value)} className="form-input"/></div>
          <div><label className="block text-xs font-semibold text-gray-500 mb-1.5">Teléfono</label><input type="tel" value={config['contact.phone'] || ''} onChange={e => handleChange('contact.phone', e.target.value)} className="form-input"/></div>
          <div><label className="block text-xs font-semibold text-gray-500 mb-1.5">Correo</label><input type="email" value={config['contact.email'] || ''} onChange={e => handleChange('contact.email', e.target.value)} className="form-input"/></div>
          <div className="sm:col-span-2"><label className="block text-xs font-semibold text-gray-500 mb-1.5">Horario</label><input type="text" value={config['contact.schedule'] || ''} onChange={e => handleChange('contact.schedule', e.target.value)} className="form-input"/></div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="font-bold text-gray-700 mb-4 flex items-center gap-2"><Globe size={18} className="text-orange-500"/>Redes Sociales</h2>
        <div className="space-y-4">
          <div><label className="block text-xs font-semibold text-gray-500 mb-1.5">Facebook</label><input type="url" value={config['social.facebook'] || ''} onChange={e => handleChange('social.facebook', e.target.value)} className="form-input"/></div>
          <div><label className="block text-xs font-semibold text-gray-500 mb-1.5">Instagram</label><input type="url" value={config['social.instagram'] || ''} onChange={e => handleChange('social.instagram', e.target.value)} className="form-input"/></div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="font-bold text-gray-700 mb-4">Director</h2>
        <div className="space-y-4">
          <div><label className="block text-xs font-semibold text-gray-500 mb-1.5">Nombre</label><input type="text" value={config['director.name'] || ''} onChange={e => handleChange('director.name', e.target.value)} className="form-input"/></div>
          <div><label className="block text-xs font-semibold text-gray-500 mb-1.5">Cargo</label><input type="text" value={config['director.title'] || ''} onChange={e => handleChange('director.title', e.target.value)} className="form-input"/></div>
          <div><label className="block text-xs font-semibold text-gray-500 mb-1.5">Descripción breve</label><textarea rows={3} value={config['director.bio'] || ''} onChange={e => handleChange('director.bio', e.target.value)} className="form-input resize-none"/></div>
          <div><label className="block text-xs font-semibold text-gray-500 mb-1.5">Mensaje del Director</label><textarea rows={6} value={config['director.message'] || ''} onChange={e => handleChange('director.message', e.target.value)} className="form-input resize-none"/></div>
        </div>
      </div>
    </div>
  );
}
