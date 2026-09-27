import React, { useState } from 'react';
import { Mail, Phone, MapPin, Instagram } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real scenario, this would send an email or message
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen pt-20 sm:pt-24 pb-20 bg-[#FFF8F5]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center py-12 sm:py-16">
          <p className="text-xs uppercase tracking-[0.2em] text-[#C97B63] font-medium mb-4">
            Get in Touch
          </p>
          <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl text-[#4E342E]">
            Contact Us
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="font-['Playfair_Display'] text-2xl text-[#4E342E] mb-4">
                We'd love to hear from you.
              </h2>
              <p className="text-[#4E342E]/70 leading-relaxed">
                Have a question about a product, need help with an order, or just want to say hello? Reach out through any of the channels below.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#F3E9D9] flex items-center justify-center flex-shrink-0">
                  <Mail size={16} className="text-[#C97B63]" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#4E342E]/50 font-medium mb-1">
                    Email
                  </p>
                  <p className="text-sm text-[#4E342E]">hello@diev.store</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#F3E9D9] flex items-center justify-center flex-shrink-0">
                  <Phone size={16} className="text-[#C97B63]" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#4E342E]/50 font-medium mb-1">
                    WhatsApp
                  </p>
                  <a
                    href="https://wa.me/919277406933"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#C97B63] hover:underline"
                  >
                    +91 9277406933
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#F3E9D9] flex items-center justify-center flex-shrink-0">
                  <Instagram size={16} className="text-[#C97B63]" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#4E342E]/50 font-medium mb-1">
                    Instagram
                  </p>
                  <a
                    href="https://www.instagram.com/dievstorez/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#C97B63] hover:underline"
                  >
                    @dievstorez
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#F3E9D9] flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} className="text-[#C97B63]" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#4E342E]/50 font-medium mb-1">
                    Location
                  </p>
                  <p className="text-sm text-[#4E342E]">India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            {submitted ? (
              <div className="bg-white border border-[#E6B89C]/10 p-8 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-green-50 flex items-center justify-center">
                  <Mail size={20} className="text-green-600" />
                </div>
                <h3 className="font-['Playfair_Display'] text-xl text-[#4E342E] mb-2">
                  Message Sent
                </h3>
                <p className="text-sm text-[#4E342E]/60">
                  Thank you for reaching out. We'll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white border border-[#E6B89C]/10 p-6 sm:p-8 space-y-5">
                <div>
                  <label className="block text-xs text-[#4E342E]/60 mb-1.5">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FFF8F5] border border-[#E6B89C]/20 text-sm text-[#4E342E] focus:outline-none focus:border-[#C97B63] transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#4E342E]/60 mb-1.5">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FFF8F5] border border-[#E6B89C]/20 text-sm text-[#4E342E] focus:outline-none focus:border-[#C97B63] transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#4E342E]/60 mb-1.5">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FFF8F5] border border-[#E6B89C]/20 text-sm text-[#4E342E] focus:outline-none focus:border-[#C97B63] transition-colors resize-none"
                    placeholder="How can we help?"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#C97B63] text-white py-3 text-sm uppercase tracking-wider font-medium hover:bg-[#4E342E] transition-colors"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
