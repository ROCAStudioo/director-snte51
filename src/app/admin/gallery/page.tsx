'use client';

import { useState } from 'react';
import { Camera, Plus, Trash2, Filter, Upload, Grid3X3 } from 'lucide-react';
import { galleryItems } from '@/data/site-data';

const categoryFilters = [
  { key: 'all', label: 'Todos' },
  { key: 'regional', label: 'Regionales' },
  { key: 'events', label: 'Eventos' },
  { key: 'meetings', label: 'Reuniones' },
  { key: 'conferences', label: 'Conferencias' },
  { key: 'training', label: 'Capacitación' },
];

export default function AdminGalleryPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [items, setItems] = useState(galleryItems);
  const [showUpload, setShowUpload] = useState(false);

  const filtered = activeFilter === 'all' ? items : items.filter(i => i.category === activeFilter);

  const handleDelete = (id: number) => {
    if (confirm('¿Eliminar esta imagen?')) setItems(prev => prev.filter(i => i.id !== id));
  };

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Camera className="text-orange-500" size={24}/>
            Galería de Imágenes
          </h1>
          <p className="text-gray-500 text-sm mt-1">Gestionar el archivo fotográfico del portal</p>
        </div>
        <button onClick={() => setShowUpload(true)}
          className="flex items-center gap-2 px-4 py-2.5 gradient-orange text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all text-sm">
          <Upload size={16}/><span>Subir fotos</span>
        </button>
      </div>

      {/* Upload modal */}
      {showUpload && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6">
            <h2 className="font-bold text-gray-800 text-lg mb-5">Subir imágenes</h2>
            <div className="border-2 border-dashed border-orange-200 rounded-2xl p-10 text-center hover:border-orange-400 transition-colors cursor-pointer bg-orange-50">
              <Upload size={40} className="text-orange-300 mx-auto mb-3"/>
              <p className="text-gray-600 font-medium">Arrastra y suelta tus fotos aquí</p>
              <p className="text-gray-400 text-sm mt-1">o haz clic para seleccionar</p>
              <p className="text-xs text-gray-300 mt-2">JPG, PNG, WEBP · Máx. 5MB por imagen</p>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Categoría</label>
                <select className="form-input">
                  {categoryFilters.slice(1).map(f => <option key={f.key} value={f.key}>{f.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Tipo</label>
                <select className="form-input">
                  <option value="image">Fotografía</option>
                  <option value="video">Video</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowUpload(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                Cancelar
              </button>
              <button onClick={() => setShowUpload(false)} className="flex-1 py-2.5 gradient-orange text-white text-sm font-semibold rounded-xl shadow-md transition-all">
                Subir imágenes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {categoryFilters.slice(1).map(cat => {
          const count = items.filter(i => i.category === cat.key).length;
          return (
            <div key={cat.key} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
              <p className="text-2xl font-bold text-gray-800">{count}</p>
              <p className="text-gray-500 text-xs mt-1">{cat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {categoryFilters.map(f => (
          <button key={f.key} onClick={() => setActiveFilter(f.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeFilter === f.key ? 'gradient-orange text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:border-orange-300'
            }`}>
            {f.label}
            <span className="ml-1.5 text-xs opacity-70">
              ({f.key === 'all' ? items.length : items.filter(i => i.category === f.key).length})
            </span>
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map(item => (
          <div key={item.id} className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="relative bg-gradient-to-br from-orange-50 to-orange-100" style={{ paddingBottom: '75%' }}>
              <div className="absolute inset-0 flex items-center justify-center opacity-30">
                <Camera size={32} className="text-orange-400"/>
              </div>
              {/* Actions overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button onClick={() => handleDelete(item.id)}
                  className="p-2 bg-red-500 rounded-xl text-white hover:bg-red-600 transition-colors shadow-md">
                  <Trash2 size={16}/>
                </button>
              </div>
            </div>
            <div className="p-3">
              <p className="text-xs text-gray-500 font-medium line-clamp-1">{item.alt}</p>
              <span className="text-xs text-orange-500 capitalize">{item.category} · {item.type}</span>
            </div>
          </div>
        ))}

        {/* Add placeholder */}
        <button onClick={() => setShowUpload(true)}
          className="bg-white rounded-2xl border-2 border-dashed border-orange-200 hover:border-orange-400 hover:bg-orange-50 transition-all flex flex-col items-center justify-center gap-2 p-6 min-h-[120px]">
          <Plus size={24} className="text-orange-400"/>
          <p className="text-xs text-orange-400 font-medium">Agregar foto</p>
        </button>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <Grid3X3 size={48} className="mx-auto mb-3 opacity-30"/>
          <p className="text-sm">No hay elementos en esta categoría</p>
        </div>
      )}
    </div>
  );
}
