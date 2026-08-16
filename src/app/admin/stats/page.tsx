'use client';

import { useState } from 'react';
import { BarChart3, Save, RefreshCw, Users, Map, Star, TrendingUp } from 'lucide-react';
import { statCounters } from '@/data/site-data';

const iconOptions = ['users', 'map', 'chart', 'star', 'trend'];
const iconComponents: Record<string, React.ComponentType<{size?: number; className?: string}>> = {
  users: Users, map: Map, chart: BarChart3, star: Star, trend: TrendingUp,
};

export default function AdminStatsPage() {
  const [stats, setStats] = useState(statCounters);
  const [saved, setSaved] = useState(false);

  const handleChange = (index: number, field: string, value: string | number) => {
    setStats(prev => prev.map((s, i) => i === index ? { ...s, [field]: field === 'value' ? Number(value) : value } : s));
    setSaved(false);
  };

  const handleSave = () => {
    // In production: API call to save
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <BarChart3 className="text-orange-500" size={24}/>
            Estadísticas del Portal
          </h1>
          <p className="text-gray-500 text-sm mt-1">Actualiza los contadores animados que aparecen en el sitio</p>
        </div>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-4 py-2.5 font-semibold rounded-xl shadow-md text-sm transition-all ${
            saved ? 'bg-green-500 text-white' : 'gradient-orange text-white hover:shadow-lg hover:scale-105'
          }`}
        >
          {saved ? <RefreshCw size={16} className="animate-spin"/> : <Save size={16}/>}
          <span>{saved ? '¡Guardado!' : 'Guardar cambios'}</span>
        </button>
      </div>

      {/* Preview */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-2xl p-6">
        <p className="text-white font-semibold mb-4 text-sm opacity-80 uppercase tracking-wide">Vista previa en el sitio</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => {
            const IconComponent = iconComponents[stat.icon] || Star;
            return (
              <div key={i} className="bg-white/15 rounded-xl p-4 text-center">
                <IconComponent size={20} className="text-white mx-auto mb-2"/>
                <p className="text-white text-2xl font-bold">{stat.prefix}{stat.value.toLocaleString('es-MX')}{stat.suffix}</p>
                <p className="text-orange-100 text-xs mt-1">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Edit cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {stats.map((stat, index) => {
          const IconComponent = iconComponents[stat.icon] || Star;
          return (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl gradient-orange flex items-center justify-center">
                  <IconComponent size={18} className="text-white"/>
                </div>
                <h3 className="font-bold text-gray-700">Contador #{index + 1}</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Valor numérico</label>
                  <input
                    type="number"
                    value={stat.value}
                    onChange={e => handleChange(index, 'value', e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Prefijo</label>
                    <input
                      type="text"
                      value={stat.prefix}
                      onChange={e => handleChange(index, 'prefix', e.target.value)}
                      placeholder="Ej: $"
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Sufijo</label>
                    <input
                      type="text"
                      value={stat.suffix}
                      onChange={e => handleChange(index, 'suffix', e.target.value)}
                      placeholder="Ej: +"
                      className="form-input"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Etiqueta</label>
                  <input
                    type="text"
                    value={stat.label}
                    onChange={e => handleChange(index, 'label', e.target.value)}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Icono</label>
                  <select
                    value={stat.icon}
                    onChange={e => handleChange(index, 'icon', e.target.value)}
                    className="form-input"
                  >
                    {iconOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
