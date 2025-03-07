import React, { useState, useEffect } from 'react';
import { Heart, Calendar, MapPin, Phone, Mail, ArrowRight, CheckCircle, Timer, Music, ChevronUp, ChevronDown, AlertCircle, Instagram, Facebook } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AbstractBackground from './components/AbstractBackground';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [contactFormSubmitted, setContactFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '25',
    gender: '',
    location: '',
    interests: '',
    referral: ''
  });
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [contactFormErrors, setContactFormErrors] = useState<Record<string, boolean>>({});
  const [showContactValidationMessage, setShowContactValidationMessage] = useState(false);
  const [pageTransition, setPageTransition] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, boolean>>({});
  const [showValidationMessage, setShowValidationMessage] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handlePageChange = (page: string) => {
    setPageTransition(true);
    setTimeout(() => {
      setCurrentPage(page);
      setPageTransition(false);
    }, 300);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: false
      }));
    }
  };

  const handleContactInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (contactFormErrors[name]) {
      setContactFormErrors(prev => ({
        ...prev,
        [name]: false
      }));
    }
  };

  const handleAgeChange = (increment: boolean) => {
    const currentAge = parseInt(formData.age) || 18;
    const newAge = increment ? 
      Math.min(currentAge + 1, 99) : 
      Math.max(currentAge - 1, 18);
    
    setFormData(prev => ({
      ...prev,
      age: newAge.toString()
    }));
  };

  const validateForm = () => {
    const errors: Record<string, boolean> = {};
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = true;
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      errors.email = true;
      isValid = false;
    }
    
    if (!formData.phone.trim()) {
      errors.phone = true;
      isValid = false;
    }
    
    if (!formData.gender) {
      errors.gender = true;
      isValid = false;
    }
    
    if (!formData.location.trim()) {
      errors.location = true;
      isValid = false;
    }
    
    if (!formData.referral) {
      errors.referral = true;
      isValid = false;
    }

    setValidationErrors(errors);
    
    if (!isValid) {
      setShowValidationMessage(true);
      setTimeout(() => {
        setShowValidationMessage(false);
      }, 5000);
    }
    
    return isValid;
  };

  const validateContactForm = () => {
    const errors: Record<string, boolean> = {};
    let isValid = true;

    if (!contactFormData.name.trim()) {
      errors.name = true;
      isValid = false;
    }
    
    if (!contactFormData.email.trim()) {
      errors.email = true;
      isValid = false;
    }
    
    if (!contactFormData.subject.trim()) {
      errors.subject = true;
      isValid = false;
    }
    
    if (!contactFormData.message.trim()) {
      errors.message = true;
      isValid = false;
    }

    setContactFormErrors(errors);
    
    if (!isValid) {
      setShowContactValidationMessage(true);
      setTimeout(() => {
        setShowContactValidationMessage(false);
      }, 5000);
    }
    
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setFormSubmitted(true);
      console.log(formData);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const firstErrorField = document.querySelector('[data-error="true"]');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateContactForm()) {
      console.log('Contact form data:', contactFormData);
      // Here you would typically send the form data to your backend
      setContactFormSubmitted(true);
      setContactFormData({ name: '', email: '', subject: '', message: '' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const firstErrorField = document.querySelector('[data-error="true"]');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const renderHome = () => (
    <div className="min-h-screen flex flex-col relative">
      <section className="min-h-screen flex items-center justify-center relative animate-fade-in pt-20">
        <div className="container mx-auto px-6 py-20">
          <div className="bg-gradient-to-br from-purple-900/60 to-purple-800/50 p-10 backdrop-blur-sm rounded-3xl shadow-xl border border-purple-500/30 max-w-3xl mx-auto transform transition-all duration-500 hover:shadow-purple-500/20 hover:scale-[1.01]">
            <Heart className="text-pink-500 mb-6 mx-auto animate-pulse-slow" size={60} strokeWidth={1.5} />
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 text-center">Match Me</h1>
            <p className="text-xl md:text-2xl text-purple-200 mb-8 max-w-2xl mx-auto text-center">
              Un'esperienza di speed date unica in discoteca.
              <br />
              Incontra nuove persone, crea connessioni e continua la serata ballando.
            </p>
            <button 
              onClick={() => handlePageChange('booking')}
              className="group bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-3 px-8 rounded-full flex items-center hover:from-purple-700 hover:to-pink-600 transition-all duration-300 shadow-lg shadow-purple-900/30 hover:shadow-purple-600/40 hover:translate-y-[-2px] transform hover:scale-105 overflow-hidden relative mx-auto"
            >
              <span className="relative z-10 flex items-center">
                Prenota Ora
                <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" size={20} />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-pink-600/0 via-pink-600/30 to-pink-600/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 relative border-t border-purple-500/20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-white mb-16 animate-slide-up">Come Funziona</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="group bg-gradient-to-br from-purple-900/60 to-purple-800/50 p-8 rounded-3xl text-center shadow-lg hover:shadow-purple-900/30 hover:translate-y-[-5px] transition-all duration-500 backdrop-blur-sm border border-purple-500/20 animate-slide-up overflow-hidden relative" style={{ animationDelay: '100ms' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-pink-500/0 opacity-0 group-hover:opacity-20 transform scale-95 group-hover:scale-110 transition-all duration-700 rounded-3xl"></div>
              
              <div className="w-16 h-16 bg-gradient-to-br from-purple-700 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md shadow-purple-800/40 transition-all duration-500 relative z-10">
                <Timer className="text-white group-hover:text-purple-100 transition-colors duration-300 transform group-hover:rotate-12 transition-transform" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 relative z-10 transform group-hover:scale-105 transition-transform duration-500">Speed Date</h3>
              <p className="text-purple-200 group-hover:text-white transition-colors duration-500 relative z-10">Un'ora di speed date con tavoli composti da 3 ragazze.
              <br />
              Avrai l'opportunità di conoscere diverse persone in un ambiente divertente e rilassato.</p>
            </div>
            
            <div className="group bg-gradient-to-br from-purple-900/60 to-purple-800/50 p-8 rounded-3xl text-center shadow-lg hover:shadow-purple-900/30 hover:translate-y-[-5px] transition-all duration-500 backdrop-blur-sm border border-purple-500/20 animate-slide-up overflow-hidden relative" style={{ animationDelay: '200ms' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-pink-500/0 opacity-0 group-hover:opacity-20 transform scale-95 group-hover:scale-110 transition-all duration-700 rounded-3xl"></div>
              
              <div className="w-16 h-16 bg-gradient-to-br from-purple-700 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md shadow-purple-800/40 transition-all duration-500 relative z-10">
                <Heart className="text-white group-hover:text-purple-100 transition-colors duration-300 transform group-hover:scale-110 group-hover:animate-pulse-slow" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 relative z-10 transform group-hover:scale-105 transition-transform duration-500">Connessioni</h3>
              <p className="text-purple-200 group-hover:text-white transition-colors duration-500 relative z-10">Crea connessioni autentiche in un ambiente stimolante.
              <br />
              Ogni incontro è un'opportunità per trovare qualcuno di speciale.</p>
            </div>
            
            <div className="group bg-gradient-to-br from-purple-900/60 to-purple-800/50 p-8 rounded-3xl text-center shadow-lg hover:shadow-purple-900/30 hover:translate-y-[-5px] transition-all duration-500 backdrop-blur-sm border border-purple-500/20 animate-slide-up overflow-hidden relative" style={{ animationDelay: '300ms' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-pink-500/0 opacity-0 group-hover:opacity-20 transform scale-95 group-hover:scale-110 transition-all duration-700 rounded-3xl"></div>
              
              <div className="w-16 h-16 bg-gradient-to-br from-purple-700 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md shadow-purple-800/40 transition-all duration-500 relative z-10">
                <Music className="text-white group-hover:text-purple-100 transition-colors duration-300 transform group-hover:rotate-12 transition-transform" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 relative z-10 transform group-hover:scale-105 transition-transform duration-500">Serata Disco</h3>
              <p className="text-purple-200 group-hover:text-white transition-colors duration-500 relative z-10">Dopo lo speed date, la serata continua con musica e balli.
              <br />
              Un'occasione perfetta per approfondire le conoscenze fatte.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative border-t border-purple-500/20">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-br from-purple-800/70 to-indigo-900/70 rounded-3xl p-12 backdrop-blur-sm shadow-xl border border-purple-500/30 overflow-hidden relative transform transition-all duration-500 hover:shadow-purple-500/20 hover:scale-[1.01] animate-slide-up">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-indigo-500/20 to-purple-600/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
            
            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Pronto a Vivere un'Esperienza Unica?</h2>
              <p className="text-xl text-purple-200 mb-10">
                I posti sono limitati, prenota ora per assicurarti di partecipare!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => handlePageChange('booking')}
                  className="group bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-3 px-8 rounded-full hover:from-purple-700 hover:to-pink-600 transition-all duration-300 hover:shadow-lg hover:shadow-purple-600/40 hover:translate-y-[-2px] transform hover:scale-105 overflow-hidden relative"
                >
                  <span className="relative z-10 flex items-center">
                    Prenota il Tuo Posto
                    <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" size={20} />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-pink-600/0 via-pink-600/30 to-pink-600/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
                </button>
                <button 
                  onClick={() => handlePageChange('contact')}
                  className="group bg-transparent border-2 border-purple-500/50 text-white font-bold py-3 px-8 rounded-full hover:bg-purple-900/30 transition-all duration-300 hover:border-purple-400 hover:translate-y-[-2px] transform hover:scale-105 overflow-hidden relative"
                >
                  <span className="relative z-10">Contattaci</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const renderBooking = () => (
    <div className="min-h-screen py-20 relative z-10 animate-fade-in pt-24">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-white mb-12">Prenota il Tuo Posto</h1>
        
        {formSubmitted ? (
          <div className="max-w-xl mx-auto bg-gradient-to-br from-purple-900/60 to-purple-800/50 rounded-3xl p-8 shadow-lg border border-purple-500/30 animate-scale-in">
            <div className="text-center">
              <div className="relative mb-4">
                <CheckCircle className="text-green-500 mx-auto animate-float" size={60} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">✅ Prenotazione Confermata!</h2>
              <div className="text-purple-200 space-y-4 mb-8">
                <p>Grazie per aver scelto Match Me! 🎉</p>
                <p>Ti abbiamo inviato tutti i dettagli della tua prenotazione.</p>
                <p>Se hai domande o bisogno di assistenza, visita la nostra sezione Contatti.</p>
                <p>Ci vediamo presto! 😉</p>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => handlePageChange('home')}
                  className="flex-1 group bg-transparent border-2 border-purple-500/50 text-white font-bold py-3 px-6 rounded-full hover:bg-purple-900/30 transition-all duration-300 hover:border-purple-400 hover:translate-y-[-2px] transform hover:scale-105"
                >
                  Home
                </button>
                <button 
                  onClick={() => handlePageChange('contact')}
                  className="flex-1 group bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-3 px-6 rounded-full hover:from-purple-700 hover:to-pink-600 transition-all duration-300 hover:shadow-lg hover:shadow-purple-600/40 hover:translate-y-[-2px] transform hover:scale-105"
                >
                  Contatti
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-xl mx-auto bg-gradient-to-br from-purple-900/60 to-purple-800/50 rounded-3xl p-8 shadow-lg border border-purple-500/30 animate-slide-up">
            {showValidationMessage && (
              <div className="mb-6 bg-gradient-to-r from-pink-600/70 to-red-600/70 p-4 rounded-xl flex items-start space-x-3 animate-shake">
                <AlertCircle className="text-white mt-0.5 flex-shrink-0" size={20} />
                <div>
                  <p className="text-white font-medium">Per favore completa tutti i campi richiesti</p>
                  <p className="text-pink-200 text-sm">Tutti i campi contrassegnati sono obbligatori</p>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-6">
                <label htmlFor="name" className="block text-purple-200 mb-2">
                  Nome Completo <span className="text-pink-400">*</span>
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    data-error={validationErrors.name || undefined}
                    className={`w-full bg-purple-900/40 text-white border ${validationErrors.name ? 'border-pink-500' : 'border-purple-600/40'} rounded-xl py-3 px-4 focus:outline-none focus:ring-2 ${validationErrors.name ? 'focus:ring-pink-500' : 'focus:ring-purple-500'} transition-all duration-300 focus:border-transparent`}
                  />
                  {validationErrors.name && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <AlertCircle className="text-pink-500" size={18} />
                    </div>
                  )}
                </div>
                {validationErrors.name && (
                  <p className="mt-1 text-pink-400 text-sm">Campo obbligatorio</p>
                )}
              </div>
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-purple-200 mb-2">
                  Email <span className="text-pink-400">*</span>
                </label>
                <div className="relative">
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    data-error={validationErrors.email || undefined}
                    className={`w-full bg-purple-900/40 text-white border ${validationErrors.email ? 'border-pink-500' : 'border-purple-600/40'} rounded-xl py-3 px-4 focus:outline-none focus:ring-2 ${validationErrors.email ? 'focus:ring-pink-500' : 'focus:ring-purple-500'} transition-all duration-300 focus:border-transparent`}
                  />
                  {validationErrors.email && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <AlertCircle className="text-pink-500" size={18} />
                    </div>
                  )}
                </div>
                {validationErrors.email && (
                  <p className="mt-1 text-pink-400 text-sm">Campo obbligatorio</p>
                )}
              </div>
              
              <div className="mb-6">
                <label htmlFor="phone" className="block text-purple-200 mb-2">
                  Numero di Telefono <span className="text-pink-400">*</span>
                </label>
                <div className="relative">
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    data-error={validationErrors.phone || undefined}
                    className={`w-full bg-purple-900/40 text-white border ${validationErrors.phone ? 'border-pink-500' : 'border-purple-600/40'} rounded-xl py-3 px-4 focus:outline-none focus:ring-2 ${validationErrors.phone ? 'focus:ring-pink-500' : 'focus:ring-purple-500'} transition-all duration-300 focus:border-transparent`}
                  />
                  {validationErrors.phone && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <AlertCircle className="text-pink-500" size={18} />
                    </div>
                  )}
                </div>
                {validationErrors.phone && (
                  <p className="mt-1 text-pink-400 text-sm">Campo obbligatorio</p>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="mb-6">
                  <label htmlFor="age" className="block text-purple-200 mb-2">
                    Età <span className="text-pink-400">*</span>
                  </label>
                  <div className="flex items-center">
                    <div className="relative flex-1">
                      <input 
                        type="text" 
                        id="age" 
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-purple-900/40 text-white border border-purple-600/40 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 focus:border-transparent text-center"
                      />
                      <div className="absolute right-0 inset-y-0 flex flex-col">
                        <button 
                          type="button"
                          onClick={() => handleAgeChange(true)}
                          className="flex-1 px-3 bg-gradient-to-r from-purple-600/40 to-pink-500/40 rounded-tr-xl hover:from-purple-600/60 hover:to-pink-500/60 transition-all duration-300 flex items-center justify-center hover:scale-105"
                        >
                          <ChevronUp size={18} className="text-purple-200" />
                        </button>
                        <button 
                          type="button"
                          onClick={() => handleAgeChange(false)}
                          className="flex-1 px-3 bg-gradient-to-r from-purple-600/40 to-pink-500/40 rounded-br-xl hover:from-purple-600/60 hover:to-pink-500/60 transition-all duration-300 flex items-center justify-center hover:scale-105"
                        >
                          <ChevronDown size={18} className="text-purple-200" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="gender" className="block text-purple-200 mb-2">
                    Genere <span className="text-pink-400">*</span>
                  </label>
                  <div data-error={validationErrors.gender || undefined}>
                    <div className={`grid grid-cols-3 gap-2 ${validationErrors.gender ? 'border border-pink-500 rounded-xl p-1' : ''}`}>
                      <button
                        type="button"
                        onClick={() => setFormData({...formData, gender: 'male'})}
                        className={`group py-3 px-4 rounded-xl text-center transition-all duration-300 overflow-hidden relative ${
                          formData.gender === 'male' 
                            ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold shadow-lg shadow-purple-900/30' 
                            : 'bg-purple-900/40 text-purple-200 border border-purple-600/40 hover:bg-purple-800/40'
                        }`}
                      >
                        <span className="relative z-10">Uomo</span>
                        {formData.gender !== 'male' && (
                          <span className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({...formData, gender: 'female'})}
                        className={`group py-3 px-4 rounded-xl text-center transition-all duration-300 overflow-hidden relative ${
                          formData.gender === 'female' 
                            ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold shadow-lg shadow-purple-900/30' 
                            : 'bg-purple-900/40 text-purple-200 border border-purple-600/40 hover:bg-purple-800/40'
                        }`}
                      >
                        <span className="relative z-10">Donna</span>
                        {formData.gender !== 'female' && (
                          <span className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({...formData, gender: 'other'})}
                        className={`group py-3 px-4 rounded-xl text-center transition-all duration-300 overflow-hidden relative ${
                          formData.gender === 'other' 
                            ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold shadow-lg shadow-purple-900/30' 
                            : 'bg-purple-900/40 text-purple-200 border border-purple-600/40 hover:bg-purple-800/40'
                        }`}
                      >
                        <span className="relative z-10">Altro</span>
                        {formData.gender !== 'other' && (
                          <span className="absolute inset-0 bg-gradient-to-r from-purple-500 /0 via-purple-500/10 to-purple-500/0 -translate-x-full group-hover:translate-x-full -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
                        )}
                      </button>
                      <input type="hidden" name="gender" value={formData.gender} required />
                    </div>
                    {validationErrors.gender && (
                      <p className="mt-1 text-pink-400 text-sm">Seleziona un'opzione</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="location" className="block text-purple-200 mb-2">
                  Luogo di Provenienza <span className="text-pink-400">*</span>
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    id="location" 
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    data-error={validationErrors.location || undefined}
                    className={`w-full bg-purple-900/40 text-white border ${validationErrors.location ? 'border-pink-500' : 'border-purple-600/40'} rounded-xl py-3 px-4 focus:outline-none focus:ring-2 ${validationErrors.location ? 'focus:ring-pink-500' : 'focus:ring-purple-500'} transition-all duration-300 focus:border-transparent`}
                    placeholder="Città, Provincia"
                  />
                  {validationErrors.location && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <AlertCircle className="text-pink-500" size={18} />
                    </div>
                  )}
                </div>
                {validationErrors.location && (
                  <p className="mt-1 text-pink-400 text-sm">Campo obbligatorio</p>
                )}
              </div>
              
              <div className="mb-6">
                <label htmlFor="interests" className="block text-purple-200 mb-2">
                  Interessi
                </label>
                <textarea 
                  id="interests" 
                  name="interests"
                  value={formData.interests}
                  onChange={handleInputChange}
                  className="w-full bg-purple-900/40 text-white border border-purple-600/40 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 focus:border-transparent h-24 resize-none"
                  placeholder="Racconta qualcosa sui tuoi interessi, hobby o passioni..."
                ></textarea>
              </div>
              
              <div className="mb-8">
                <label htmlFor="referral" className="block text-purple-200 mb-2">
                  Come ci hai conosciuto? <span className="text-pink-400">*</span>
                </label>
                <div data-error={validationErrors.referral || undefined}>
                  <div className={`grid grid-cols-2 md:grid-cols-5 gap-2 mb-2 ${validationErrors.referral ? 'border border-pink-500 rounded-xl p-1' : ''}`}>
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, referral: 'social'})}
                      className={`group py-3 px-2 rounded-xl text-center transition-all duration-300 overflow-hidden relative ${
                        formData.referral === 'social' 
                          ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold shadow-lg shadow-purple-900/30' 
                          : 'bg-purple-900/40 text-purple-200 border border-purple-600/40 hover:bg-purple-800/40'
                      }`}
                    >
                      <span className="relative z-10">Social Media</span>
                      {formData.referral !== 'social' && (
                        <span className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, referral: 'friend'})}
                      className={`group py-3 px-2 rounded-xl text-center transition-all duration-300 overflow-hidden relative ${
                        formData.referral === 'friend' 
                          ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold shadow-lg shadow-purple-900/30' 
                          : 'bg-purple-900/40 text-purple-200 border border-purple-600/40 hover:bg-purple-800/40'
                      }`}
                    >
                      <span className="relative z-10">Amici</span>
                      {formData.referral !== 'friend' && (
                        <span className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, referral: 'search'})}
                      className={`group py-3 px-2 rounded-xl text-center transition-all duration-300 overflow-hidden relative ${
                        formData.referral === 'search' 
                          ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold shadow-lg shadow-purple-900/30' 
                          : 'bg-purple-900/40 text-purple-200 border border-purple-600/40 hover:bg-purple-800/40'
                      }`}
                    >
                      <span className="relative z-10">Motore di Ricerca</span>
                      {formData.referral !== 'search' && (
                        <span className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, referral: 'ad'})}
                      className={`group py-3 px-2 rounded-xl text-center transition-all duration-300 overflow-hidden relative ${
                        formData.referral === 'ad' 
                          ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold shadow-lg shadow-purple-900/30' 
                          : 'bg-purple-900/40 text-purple-200 border border-purple-600/40 hover:bg-purple-800/40'
                      }`}
                    >
                      <span className="relative z-10">Pubblicità</span>
                      {formData.referral !== 'ad' && (
                        <span className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, referral: 'other'})}
                      className={`group py-3 px-2 rounded-xl text-center transition-all duration-300 overflow-hidden relative ${
                        formData.referral === 'other' 
                          ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold shadow-lg shadow-purple-900/30' 
                          : 'bg-purple-900/40 text-purple-200 border border-purple-600/40 hover:bg-purple-800/40'
                      }`}
                    >
                      <span className="relative z-10">Altro</span>
                      {formData.referral !== 'other' && (
                        <span className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
                      )}
                    </button>
                    <input type="hidden" name="referral" value={formData.referral} required />
                  </div>
                  {validationErrors.referral && (
                    <p className="mt-1 text-pink-400 text-sm">Seleziona un'opzione</p>
                  )}
                </div>
              </div>
              
              <button 
                type="submit"
                className="group w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-3 px-8 rounded-full hover:from-purple-700 hover:to-pink-600 transition-all duration-300 hover:shadow-lg hover:shadow-purple-600/30 transform hover:translate-y-[-2px] hover:scale-[1.02] overflow-hidden relative"
              >
                <span className="relative z-10">Conferma la tua Prenotazione</span>
                <span className="absolute inset-0 bg-gradient-to-r from-pink-600/0 via-pink-600/30 to-pink-600/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="min-h-screen py-20 relative z-10 animate-fade-in pt-24">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-white mb-12">Contattaci</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-gradient-to-br from-purple-900/60 to-purple-800/50 p-8 rounded-3xl shadow-lg border border-purple-500/30 animate-slide-up" style={{ animationDelay: '100ms' }}>
            <h2 className="text-2xl font-bold text-white mb-6">Informazioni di Contatto</h2>
            
            <div className="space-y-6">
              <div className="flex items-start group hover:translate-x-1 transition-transform duration-300">
                <MapPin className="text-pink-400 mr-4 mt-1 group-hover:text-pink-300 transition-colors duration-300" size={24} />
                <div>
                  <h3 className="text-white font-bold">Indirizzo</h3>
                  <a 
                    href="https://maps.google.com/?q=Via+San+Marco+114,+37138+Verona" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-purple-200 hover:text-white transition-colors duration-300"
                  >
                    Via San Marco 114, 37138 Verona
                  </a>
                </div>
              </div>
              
              <div className="flex items-start group hover:translate-x-1 transition-transform duration-300">
                <Phone className="text-pink-400 mr-4 mt-1 group-hover:text-pink-300 transition-colors duration-300" size={24} />
                <div>
                  <h3 className="text-white font-bold">Telefono</h3>
                  <a 
                    href="tel:+393481609492" 
                    className="text-purple-200 hover:text-white transition-colors duration-300"
                  >
                    +39 348 160 9492
                  </a>
                </div>
              </div>
              
              <div className="flex items-start group hover:translate-x-1 transition-transform duration-300">
                <Mail className="text-pink-400 mr-4 mt-1 group-hover:text-pink-300 transition-colors duration-300" size={24} />
                <div>
                  <h3 className="text-white font-bold">Email</h3>
                  <a 
                    href="mailto:info@matchme.it" 
                    className="text-purple-200 hover:text-white transition-colors duration-300"
                  >
                    info@matchme.it
                  </a>
                </div>
              </div>
              
              <div className="flex items-start group hover:translate-x-1 transition-transform duration-300">
                <Instagram className="text-pink-400 mr-4 mt-1 group-hover:text-pink-300 transition-colors duration-300" size={24} />
                <div>
                  <h3 className="text-white font-bold">Instagram</h3>
                  <a 
                    href="https://www.instagram.com/matchme.vr/?igsh=ZTZ6NWx3anBnYnpl#" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-purple-200 hover:text-white transition-colors duration-300"
                  >
                    @matchme.vr
                  </a>
                </div>
              </div>
              
              <div className="flex items-start group hover:translate-x-1 transition-transform duration-300">
                <Facebook className="text-pink-400 mr-4 mt-1 group-hover:text-pink-300 transition-colors duration-300" size={24} />
                <div>
                  <h3 className="text-white font-bold">Facebook</h3>
                  <a 
                    href="https://www.facebook.com/people/MATCH-ME-Verona/61572689409935/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-purple-200 hover:text-white transition-colors duration-300"
                  >
                    MATCH ME Verona
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-900/60 to-purple-800/50 p-8 rounded-3xl shadow-lg border border-purple-500/30 animate-slide-up" style={{ animationDelay: '200ms' }}>
            {contactFormSubmitted ? (
              <div className="text-center animate-scale-in">
                <div className="relative mb-4">
                  <CheckCircle className="text-green-500 mx-auto animate-float" size={60} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">✅ Messaggio Inviato!</h2>
                <div className="text-purple-200 space-y-4 mb-8">
                  <p>Grazie per averci contattato! 🎉</p>
                  <p>Ti risponderemo il prima possibile.</p>
                </div>
                <button 
                  onClick={() => setContactFormSubmitted(false)}
                  className="group bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-3 px-8 rounded-full hover:from-purple-700 hover:to-pink-600 transition-all duration-300 hover:shadow-lg hover:shadow-purple-600/30 transform hover:translate-y-[-2px] hover:scale-[1.02] overflow-hidden relative"
                >
                  <span className="relative z-10">Invia un altro messaggio</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-pink-600/0 via-pink-600/30 to-pink-600/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-white mb-6">Inviaci un Messaggio</h2>
                
                {showContactValidationMessage && (
                  <div className="mb-6 bg-gradient-to-r from-pink-600/70 to-red-600/70 p-4 rounded-xl flex items-start space-x-3 animate-shake">
                    <AlertCircle className="text-white mt-0.5 flex-shrink-0" size={20} />
                    <div>
                      <p className="text-white font-medium">Per favore completa tutti i campi richiesti</p>
                      <p className="text-pink-200 text-sm">Tutti i campi sono obbligatori</p>
                    </div>
                  </div>
                )}
                
                <form onSubmit={handleContactSubmit} noValidate>
                  <div className="mb-6">
                    <label htmlFor="contact-name" className="block text-purple-200 mb-2">
                      Nome <span className="text-pink-400">*</span>
                    </label>
                    <div className="relative">
                      <input 
                        type="text" 
                        id="contact-name" 
                        name="name"
                        value={contactFormData.name}
                        onChange={handleContactInputChange}
                        required
                        data-error={contactFormErrors.name || undefined}
                        className={`w-full bg-purple-900/40 text-white border ${contactFormErrors.name ? 'border-pink-500' : 'border-purple-600/40'} rounded-xl py-3 px-4 focus:outline-none focus:ring-2 ${contactFormErrors.name ? 'focus:ring-pink-500' : 'focus:ring-purple-500'} transition-all duration-300 focus:border-transparent`}
                      />
                      {contactFormErrors.name && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <AlertCircle className="text-pink-500" size={18} />
                        </div>
                      )}
                    </div>
                    {contactFormErrors.name && (
                      <p className="mt-1 text-pink-400 text-sm">Campo obbligatorio</p>
                    )}
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="contact-email" className="block text-purple-200 mb-2">
                      Email <span className="text-pink-400">*</span>
                    </label>
                    <div className="relative">
                      <input 
                        type="email" 
                        id="contact-email" 
                        name="email"
                        value={contactFormData.email}
                        onChange={handleContactInputChange}
                        required
                        data-error={contactFormErrors.email || undefined}
                        className={`w-full bg-purple-900/40 text-white border ${contactFormErrors.email ? 'border-pink-500' : 'border-purple-600/40'} rounded-xl py-3 px-4 focus:outline-none focus:ring-2 ${contactFormErrors.email ? 'focus:ring-pink-500' : 'focus:ring-purple-500'} transition-all duration-300 focus:border-transparent`}
                      />
                      {contactFormErrors.email && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <AlertCircle className="text-pink-500" size={18} />
                        </div>
                      )}
                    </div>
                    {contactFormErrors.email && (
                      <p className="mt-1 text-pink-400 text-sm">Campo obbligatorio</p>
                    )}
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="contact-subject" className="block text-purple-200 mb-2">
                      Oggetto <span className="text-pink-400">*</span>
                    </label>
                    <div className="relative">
                      <input 
                        type="text" 
                        id="contact-subject" 
                        name="subject"
                        value={contactFormData.subject}
                        onChange={handleContactInputChange}
                        required
                        data-error={contactFormErrors.subject || undefined}
                        className={`w-full bg-purple-900/40 text-white border ${contactFormErrors.subject ? 'border-pink-500' : 'border-purple-600/40'} rounded-xl py-3 px-4 focus:outline-none focus:ring-2 ${contactFormErrors.subject ? 'focus:ring-pink-500' : 'focus:ring-purple-500'} transition-all duration-300 focus:border-transparent`}
                      />
                      {contactFormErrors.subject && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <AlertCircle className="text-pink-500" size={18} />
                        </div>
                      )}
                    </div>
                    {contactFormErrors.subject && (
                      <p className="mt-1 text-pink-400 text-sm">Campo obbligatorio</p>
                    )}
                  </div>
                  
                  <div className="mb-8">
                    <label htmlFor="contact-message" className="block text-purple-200 mb-2">
                      Messaggio <span className="text-pink-400">*</span>
                    </label>
                    <div className="relative">
                      <textarea 
                        id="contact-message" 
                        name="message"
                        value={contactFormData.message}
                        onChange={handleContactInputChange}
                        required
                        data-error={contactFormErrors.message || undefined}
                        className={`w-full bg-purple-900/40 text-white border ${contactFormErrors.message ? 'border-pink-500' : 'border-purple-600/40'} rounded-xl py-3 px-4 focus:outline-none focus:ring-2 ${contactFormErrors.message ? 'focus:ring-pink-500' : 'focus:ring-purple-500'} transition-all duration-300 focus:border-transparent resize-none h-32`}
                      ></textarea>
                      {contactFormErrors.message && (
                        <div className="absolute top-3 right-3 pointer-events-none">
                          <AlertCircle className="text-pink-500" size={18} />
                        </div>
                      )}
                    </div>
                    {contactFormErrors.message && (
                      <p className="mt-1 text-pink-400 text-sm">Campo obbligatorio</p>
                    )}
                  </div>
                  
                  <button 
                    type="submit"
                    className="group w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-3 px-8 rounded-full hover:from-purple-700 hover:to-pink-600 transition-all duration-300 hover:shadow-lg hover:shadow-purple-600/30 transform hover:translate-y-[-2px] hover:scale-[1.02] overflow-hidden relative"
                  >
                    <span className="relative z-10">Invia Messaggio</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-pink-600/0 via-pink-600/30 to-pink-600/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-black text-white min-h-screen">
      <AbstractBackground />
      
      <Navbar currentPage={currentPage} setCurrentPage={handlePageChange} />
      
      <div className={`transition-opacity duration-300 ${pageTransition ? 'opacity-0' : 'opacity-100'}`}>
        {currentPage === 'home' && renderHome()}
        {currentPage === 'booking' && renderBooking()}
        {currentPage === 'contact' && renderContact()}
      </div>
      
      <Footer setCurrentPage={handlePageChange} />
    </div>
  );
}

export default App;