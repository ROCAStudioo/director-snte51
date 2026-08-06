'use client';

import { useRef, useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle, MessageSquare } from 'lucide-react';
import { siteConfig } from '@/data/site-data';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '', email: '', phone: '', subject: '', message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<FormData>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email inválido';
    if (!formData.subject.trim()) newErrors.subject = 'El asunto es requerido';
    if (!formData.message.trim() || formData.message.length < 10) newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setStatus('sending');
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setStatus('success');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const contactInfo = [
    { icon: MapPin, label: 'Dirección', value: siteConfig.contact.address, color: 'bg-blue-50 text-blue-500' },
    { icon: Phone, label: 'Teléfono', value: siteConfig.contact.phone, color: 'bg-green-50 text-green-500' },
    { icon: Mail, label: 'Correo', value: siteConfig.contact.email, color: 'bg-orange-50 text-orange-500' },
    { icon: Clock, label: 'Horario', value: siteConfig.contact.schedule, color: 'bg-purple-50 text-purple-500' },
  ];

  return (
    <section id="contacto" ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-full px-4 py-2 mb-4">
            <MessageSquare size={14} className="text-orange-500"/>
            <span className="text-orange-600 text-xs font-semibold uppercase tracking-wider">Contacto</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900">Estamos para <span className="gradient-text">Servirte</span></h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Contáctanos para cualquier consulta, sugerencia o para agendar una cita
          </p>
          <div className="w-16 h-1 gradient-orange rounded-full mx-auto mt-4"/>
        </div>

        <div className={`grid grid-cols-1 lg:grid-cols-5 gap-8 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Left: info + map */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact info cards */}
            <div className="space-y-4">
              {contactInfo.map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50 transition-all duration-200">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${item.color}`}>
                    <item.icon size={18}/>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{item.label}</p>
                    <p className="text-gray-700 text-sm mt-0.5 font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden shadow-card border border-gray-100 bg-gradient-to-br from-blue-50 to-blue-100" style={{ height: '220px' }}>
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center opacity-50">
                  <MapPin size={40} className="text-blue-400 mx-auto mb-2"/>
                  <p className="text-blue-600 text-sm font-medium">Mapa interactivo</p>
                  <p className="text-blue-400 text-xs mt-1">Centro Histórico, Puebla</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-card border border-gray-100">
              <h3 className="font-bold text-gray-800 text-xl mb-6">Envía tu mensaje</h3>

              {status === 'success' ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-green-500"/>
                  </div>
                  <h4 className="font-bold text-gray-800 text-lg mb-2">¡Mensaje enviado!</h4>
                  <p className="text-gray-500 text-sm mb-6">Te responderemos en un plazo de 24-48 horas hábiles.</p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="px-6 py-2.5 gradient-orange text-white rounded-xl font-medium text-sm hover:shadow-lg transition-all"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  {/* Row 1: Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                        Nombre completo <span className="text-orange-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Tu nombre"
                        className={`form-input ${errors.name ? 'border-red-400 focus:border-red-400' : ''}`}
                      />
                      {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                        Correo electrónico <span className="text-orange-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="tucorreo@email.com"
                        className={`form-input ${errors.email ? 'border-red-400' : ''}`}
                      />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Row 2: Phone + Subject */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">Teléfono</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="222 000 0000"
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                        Asunto <span className="text-orange-500">*</span>
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`form-input ${errors.subject ? 'border-red-400' : ''}`}
                      >
                        <option value="">Selecciona un asunto</option>
                        <option value="prestamo">Préstamo personal</option>
                        <option value="ahorro">Consulta de ahorro</option>
                        <option value="tramite">Trámite administrativo</option>
                        <option value="jornada">Jornada regional</option>
                        <option value="queja">Queja o sugerencia</option>
                        <option value="otro">Otro asunto</option>
                      </select>
                      {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject}</p>}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                      Mensaje <span className="text-orange-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Escribe tu mensaje aquí..."
                      rows={5}
                      className={`form-input resize-none ${errors.message ? 'border-red-400' : ''}`}
                    />
                    {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                    <p className="text-gray-300 text-xs mt-1 text-right">{formData.message.length}/500</p>
                  </div>

                  {/* Privacy note */}
                  <p className="text-xs text-gray-400">
                    Al enviar este formulario aceptas nuestro{' '}
                    <a href="#" className="text-orange-500 hover:underline">Aviso de Privacidad</a>
                    . Tu información está protegida.
                  </p>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full flex items-center justify-center gap-2 py-3.5 gradient-orange text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200 disabled:opacity-70 disabled:scale-100"
                  >
                    {status === 'sending' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"/>
                        <span>Enviando...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16}/>
                        <span>Enviar mensaje</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
