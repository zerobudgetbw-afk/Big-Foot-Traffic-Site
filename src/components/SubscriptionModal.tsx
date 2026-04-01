import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2 } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
}

export const SubscriptionModal = ({ isOpen, onClose, planName }: ModalProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    industry: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Formspree submission
    try {
      const response = await fetch('https://formspree.io/f/mqakprow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          plan: planName
        })
      });

      if (response.ok) {
        setIsSubmitted(true);
        
        // Open WhatsApp link in new tab
        const whatsappUrl = `https://wa.me/26772833448?text=Hi%20Big%20Foot%20Traffic%2C%20I%20just%20submitted%20an%20enquiry%20from%20your%20website.%0A%0ACompany%3A%20${encodeURIComponent(formData.companyName)}%0APlan%3A%20${encodeURIComponent(planName)}`;
        window.open(whatsappUrl, '_blank');

        setTimeout(() => {
          onClose();
          setIsSubmitted(false);
          setFormData({
            companyName: '',
            contactName: '',
            email: '',
            phone: '',
            industry: '',
            message: ''
          });
        }, 3000);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-end justify-center sm:items-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-xl glass-dark border border-white/10 rounded-t-3xl sm:rounded-3xl overflow-hidden"
          >
            <div className="p-8 md:p-12">
              <button onClick={onClose} className="absolute top-6 right-6 text-white/30 hover:text-white transition-colors">
                <X size={20} />
              </button>
              
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold text-brand-yellow tracking-tight">
                      Start Your Campaign
                    </h2>
                    <p className="text-white/40 text-sm font-medium uppercase tracking-widest">{planName} — Join the ride.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input 
                      required 
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="Company Name" 
                      className="bg-white/5 border border-white/5 p-4 rounded-xl focus:border-brand-yellow/50 outline-none transition-all text-sm" 
                    />
                    <input 
                      required 
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleChange}
                      placeholder="Contact Name" 
                      className="bg-white/5 border border-white/5 p-4 rounded-xl focus:border-brand-yellow/50 outline-none transition-all text-sm" 
                    />
                    <input 
                      required 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email" 
                      className="bg-white/5 border border-white/5 p-4 rounded-xl focus:border-brand-yellow/50 outline-none transition-all text-sm" 
                    />
                    <input 
                      required 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone" 
                      className="bg-white/5 border border-white/5 p-4 rounded-xl focus:border-brand-yellow/50 outline-none transition-all text-sm" 
                    />
                  </div>

                  <select 
                    required 
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/5 p-4 rounded-xl focus:border-brand-yellow/50 outline-none transition-all text-sm appearance-none text-white/60"
                  >
                    <option value="" className="bg-brand-black">Select Industry</option>
                    <option value="FMCG" className="bg-brand-black">FMCG</option>
                    <option value="Insurance" className="bg-brand-black">Insurance</option>
                    <option value="Bank" className="bg-brand-black">Bank</option>
                    <option value="Telco" className="bg-brand-black">Telco</option>
                    <option value="Government" className="bg-brand-black">Government</option>
                    <option value="Other" className="bg-brand-black">Other</option>
                  </select>

                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message (Optional)" 
                    rows={3} 
                    className="w-full bg-white/5 border border-white/5 p-4 rounded-xl focus:border-brand-yellow/50 outline-none transition-all text-sm" 
                  />

                  <button
                    type="submit"
                    className="w-full bg-brand-yellow text-brand-black font-bold py-5 rounded-xl hover:scale-[1.01] active:scale-95 transition-all text-xs uppercase tracking-[0.2em]"
                  >
                    START MY CAMPAIGN
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-8"
                >
                  <div className="flex justify-center">
                    <CheckCircle2 size={64} className="text-brand-yellow/40" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold text-brand-yellow tracking-tight">You're on the road!</h2>
                    <p className="text-white/40 font-medium">We'll be in touch within 24 hours.</p>
                  </div>
                  <div className="relative h-1 w-full bg-white/5 overflow-hidden rounded-full">
                    <motion.div
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      className="absolute inset-0 bg-brand-yellow subtle-glow-yellow"
                    />
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
