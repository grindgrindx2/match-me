import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

interface BookingFormProps {
  onSuccess: () => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({ onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const bookingData = {
      nome: formData.get('nome') as string,
      email: formData.get('email') as string,
      telefono: formData.get('telefono') as string,
      eta: parseInt(formData.get('eta') as string),
      genere: formData.get('genere') as string,
      luogo: formData.get('luogo') as string,
      interessi: formData.get('interessi') as string,
      conosciuto: formData.get('conosciuto') as string,
      data: new Date().toISOString()
    };

    try {
      const { error: supabaseError } = await supabase
        .from('prenotazioni')
        .insert([bookingData]);

      if (supabaseError) {
        throw supabaseError;
      }

      // Reset form
      e.currentTarget.reset();
      onSuccess();
    } catch (err) {
      console.error('Error submitting booking:', err);
      setError('Si è verificato un errore durante l\'invio della prenotazione. Riprova più tardi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="nome" className="block text-sm font-medium text-gray-200">
            Nome *
          </label>
          <input
            type="text"
            name="nome"
            id="nome"
            required
            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-200">
            Email *
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>

        <div>
          <label htmlFor="telefono" className="block text-sm font-medium text-gray-200">
            Telefono *
          </label>
          <input
            type="tel"
            name="telefono"
            id="telefono"
            required
            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>

        <div>
          <label htmlFor="eta" className="block text-sm font-medium text-gray-200">
            Età *
          </label>
          <input
            type="number"
            name="eta"
            id="eta"
            required
            min="18"
            max="99"
            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>

        <div>
          <label htmlFor="genere" className="block text-sm font-medium text-gray-200">
            Genere *
          </label>
          <select
            name="genere"
            id="genere"
            required
            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500"
          >
            <option value="">Seleziona...</option>
            <option value="uomo">Uomo</option>
            <option value="donna">Donna</option>
            <option value="altro">Altro</option>
          </select>
        </div>

        <div>
          <label htmlFor="luogo" className="block text-sm font-medium text-gray-200">
            Luogo di provenienza *
          </label>
          <input
            type="text"
            name="luogo"
            id="luogo"
            required
            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>

        <div>
          <label htmlFor="interessi" className="block text-sm font-medium text-gray-200">
            Interessi *
          </label>
          <input
            type="text"
            name="interessi"
            id="interessi"
            required
            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>

        <div>
          <label htmlFor="conosciuto" className="block text-sm font-medium text-gray-200">
            Come ci hai conosciuto? *
          </label>
          <select
            name="conosciuto"
            id="conosciuto"
            required
            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500"
          >
            <option value="">Seleziona...</option>
            <option value="social">Social Media</option>
            <option value="amici">Amici</option>
            <option value="pubblicita">Pubblicità</option>
            <option value="altro">Altro</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="text-red-500 text-sm mt-2">
          {error}
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300 ${
            isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Invio in corso...' : 'Invia Prenotazione'}
        </button>
      </div>
    </form>
  );
};
