'use client';

import { useState, useEffect } from 'react';
import { BarChart3, Save, RefreshCw } from 'lucide-react';

interface StatItem {
  id: number;
  label: string;
  value: number;
  prefix: string;
  suffix: string;
  icon: string;
}

export default function AdminStatsPage() {
  const [stats, setStats] = useState<StatItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/stats').then(r => r.json()).then(data => { setStats(data); setLoading(false); });
  }, []);

  const handleChange = (index: number, field: string, value: string | number) => {
    setStats(prev => prev.map((s, i) => i === index ? { ...s, [field]: field === 'value' ? Number(value) : value } : s));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    await fetch('/api/stats', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(stats) });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading) return <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"/></div>;

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2"><BarChart3 className="text-orange-500" size={24}/>Estadísticas</h1>
          <p className="text-gray-500 text-sm mt-1">Editar contadores animados del sitio</p>
        </div>
        <button onClick={handleSave} disabled={saving} className={`flex items-center gap-2 px-4 py-2.5 font-semibold rounded-xl shadow-md text-sm transition-all ${saved ? 'bg-green-500 text-white' : 'gradient-orange text-white'}`}>
          {saving ? <RefreshCw size={16} className="animate-spin"/> : <Save size={16}/>}
          <span>{saved ? '¡Guardado!' : 'Guardar'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {stats.map((stat, index) => (
          <div key={stat.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-700 mb-4">Contador #{index + 1}</h3>
            <div className="space-y-4">
              <div><label className="block text-xs font-semibold text-gray-500 mb-1.5">Valor</label><input type="number" value={stat.value} onChange={e => handleChange(index, 'value', e.target.value)} className="form-input"/></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs font-semibold text-gray-500 mb-1.5">Prefijo</label><input type="text" value={stat.prefix} onChange={e => handleChange(index, 'prefix', e.target.value)} className="form-input" placeholder="$"/></div>
                <div><label className="block text-xs font-semibold text-gray-500 mb-1.5">Sufijo</label><input type="text" value={stat.suffix} onChange={e => handleChange(index, 'suffix', e.target.value)} className="form-input" placeholder="+"/></div>
              </div>
              <div><label className="block text-xs font-semibold text-gray-500 mb-1.5">Etiqueta</label><input type="text" value={stat.label} onChange={e => handleChange(index, 'label', e.target.value)} className="form-input"/></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
