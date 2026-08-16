'use client';

import { useState } from 'react';
import { Settings, Save, RefreshCw, Phone, Mail, MapPin, Globe, Shield } from 'lucide-react';
import { siteConfig } from '@/data/site-data';

export default function AdminSettingsPage() {
  const [contact, setContact] = useState(siteConfig.contact);
  const [social, setSocial] = useState(siteConfig.social);
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
            <Settings className="text-orange-500" size={24}/>
            Configuración del Portal
          </h1>
          <p className="text-gray-500 text-sm mt-1">Editar datos de contacto y redes sociales</p>
        </div>
        <button onClick={handleSave}
          className={`flex items-center gap-2 px-4 py-2.5 font-semibold rounded-xl shadow-md text-sm transition-all ${
            saved ? 'bg-green-500 text-white' : 'gradient-orange text-white hover:shadow-lg'
          }`}>
          {saved ? <RefreshCw size={16}/> : <Save size={16}/>}
          <span>{saved ? '¡Guardado!' : 'Guardar cambios'}</span>
        </button>
      </div>

      {/* Contact info */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
          <Phone size={18} className="text-orange-500"/>
          Información de Contacto
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Dirección</label>
            <input type="text" value={contact.address} onChange={e => setContact(p => ({...p, address: e.target.value}))} className="form-input"/>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Teléfono</label>
            <input type="tel" value={contact.phone} onChange={e => setContact(p => ({...p, phone: e.target.value}))} className="form-input"/>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Correo electrónico</label>
            <input type="email" value={contact.email} onChange={e => setContact(p => ({...p, email: e.target.value}))} className="form-input"/>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Horario de atención</label>
            <input type="text" value={contact.schedule} onChange={e => setContact(p => ({...p, schedule: e.target.value}))} className="form-input"/>
          </div>
        </div>
      </div>

      {/* Social media */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
          <Globe size={18} className="text-orange-500"/>
          Redes Sociales
        </h2>
        <div className="space-y-4">
          {Object.entries(social).map(([platform, url]) => (
            <div key={platform}>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">{platform}</label>
              <input type="url" value={url} onChange={e => setSocial(p => ({...p, [platform]: e.target.value}))}
                className="form-input" placeholder={`https://${platform}.com/...`}/>
            </div>
          ))}
        </div>
      </div>

      {/* Security */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
          <Shield size={18} className="text-orange-500"/>
          Seguridad
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Contraseña actual</label>
            <input type="password" className="form-input" placeholder="••••••••"/>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Nueva contraseña</label>
              <input type="password" className="form-input" placeholder="••••••••"/>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Confirmar contraseña</label>
              <input type="password" className="form-input" placeholder="••••••••"/>
            </div>
          </div>
          <button className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors">
            Cambiar contraseña
          </button>
        </div>
      </div>
    </div>
  );
}
