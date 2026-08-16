'use client';

import { useState } from 'react';
import { LayoutDashboard, Save, Upload, RefreshCw, Image as ImageIcon } from 'lucide-react';
import { siteConfig } from '@/data/site-data';

export default function AdminHeroPage() {
  const [data, setData] = useState(siteConfig.director);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <LayoutDashboard className="text-orange-500" size={24}/>
            Hero / Inicio
          </h1>
          <p className="text-gray-500 text-sm mt-1">Editar la sección principal del portal</p>
        </div>
        <button onClick={handleSave}
          className={`flex items-center gap-2 px-4 py-2.5 font-semibold rounded-xl shadow-md text-sm transition-all ${
            saved ? 'bg-green-500 text-white' : 'gradient-orange text-white hover:shadow-lg'
          }`}>
          {saved ? <RefreshCw size={16}/> : <Save size={16}/>}
          <span>{saved ? '¡Guardado!' : 'Guardar cambios'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Photo upload */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
            <ImageIcon size={18} className="text-orange-500"/>
            Fotografía del Director
          </h2>
          <div className="border-2 border-dashed border-orange-200 rounded-2xl p-8 text-center hover:border-orange-400 transition-colors cursor-pointer bg-orange-50 mb-4">
            <div className="w-20 h-20 rounded-2xl gradient-orange mx-auto flex items-center justify-center mb-3">
              <span className="text-white font-bold text-2xl">OC</span>
            </div>
            <p className="text-gray-600 text-sm font-medium">Haz clic para cambiar la foto</p>
            <p className="text-gray-400 text-xs mt-1">JPG o PNG · Mín. 800x1000px</p>
          </div>
          <button className="w-full flex items-center justify-center gap-2 py-2.5 border border-orange-200 rounded-xl text-sm text-orange-500 hover:bg-orange-50 transition-colors">
            <Upload size={14}/><span>Subir nueva fotografía</span>
          </button>
        </div>

        {/* Text fields */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
          <h2 className="font-bold text-gray-700 flex items-center gap-2">
            <LayoutDashboard size={18} className="text-orange-500"/>
            Textos del Hero
          </h2>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Nombre del Director</label>
            <input type="text" value={data.name} onChange={e => setData(p => ({...p, name: e.target.value}))} className="form-input"/>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Cargo</label>
            <input type="text" value={data.title} onChange={e => setData(p => ({...p, title: e.target.value}))} className="form-input"/>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Organización</label>
            <input type="text" value={data.organization} onChange={e => setData(p => ({...p, organization: e.target.value}))} className="form-input"/>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Sección</label>
            <input type="text" value={data.section} onChange={e => setData(p => ({...p, section: e.target.value}))} className="form-input"/>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Descripción breve</label>
            <textarea rows={3} value={data.bio} onChange={e => setData(p => ({...p, bio: e.target.value}))} className="form-input resize-none"/>
          </div>
        </div>
      </div>

      {/* Director message */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="font-bold text-gray-700 mb-4">Mensaje del Director</h2>
        <textarea rows={8} value={data.message} onChange={e => setData(p => ({...p, message: e.target.value}))}
          className="form-input resize-none"/>
        <p className="text-xs text-gray-400 mt-2">Usa párrafos separados con doble salto de línea (Enter+Enter)</p>
      </div>
    </div>
  );
}
