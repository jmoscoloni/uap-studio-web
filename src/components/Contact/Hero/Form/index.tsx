'use client';
import { useState, FormEvent } from 'react';
import { Button, ButtonComponents } from '@/components';
import { useTranslations } from 'next-intl';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  message: ''
};

const Form = () => {
  const t = useTranslations();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Simular envío (reemplazar con tu API real)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Limpiar formulario después del envío exitoso
      setFormData(initialFormData);

      // Opcional: mostrar mensaje de éxito
      console.log('Form submitted successfully:', formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyles =
    'w-full px-1 py-1 p-lg border border-black/20 bg-transparent text-black placeholder:text-black/40 focus:outline-none focus:border-black transition-colors duration-300';

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-2">
      {/* First Name & Last Name */}
      <div className="grid grid-cols-2 gap-2">
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder={t('contact.form.name')}
          required
          disabled={isSubmitting}
          className={inputStyles}
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder={t('contact.form.last')}
          required
          disabled={isSubmitting}
          className={inputStyles}
        />
      </div>

      {/* Email */}
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder={t('contact.form.email')}
        required
        disabled={isSubmitting}
        className={inputStyles}
      />

      {/* Message */}
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder={t('contact.form.project')}
        required
        disabled={isSubmitting}
        // rows={6}
        className={`${inputStyles} min-h-[150px]`}
      />

      {/* Submit Button */}
      <Button type="submit" disabled={isSubmitting} className="ml-auto w-fit">
        <span
          className={`text-[1.125rem] text-black transition-colors duration-200 hover:text-[#FB2721] lg:text-2xl ${isSubmitting ? 'pointer-events-none opacity-50' : ''}`}
        >
          {isSubmitting ? `${t('contact.form.sending')}...` : `${t('contact.form.send')}`}
        </span>
      </Button>
    </form>
  );
};

export default Form;
