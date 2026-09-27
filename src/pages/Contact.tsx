import React, { useState } from 'react';
import { Mail, Phone, MapPin, Instagram } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen pt-28 sm:pt-32 pb-28 bg-white">
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="text-center py-16 sm:py-20">
          <p className="text-[11px] uppercase tracking-[0.3em] text-gray-500 font-medium mb-4">
            Get in Touch
          </p>
          <h1 className="font-['Playfair_Display'] text-5xl sm:text-6xl text-black">
            Contact Us
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Contact Info */}
          <div className="space-y-10">
            <div>
              <h2 className="font-['Playfair_Display'] text-3xl text-black mb-6">
                We'd love to hear from you.
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Have a question about a product, need help with an order, or just want to say hello? Reach out through any of the channels below.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-black" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 font-medium mb-2">
                    Email
                  </p>
                  <p className="text-base text-black">hello@diev.store</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Phone size={18} className="text-black" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 font-medium mb-2">
                    WhatsApp
                  </p>
                  <a
                    href="https://wa.me/919277406933"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-black hover:underline"
                  >
                    +91 9277406933
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Instagram size={18} className="text-black" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 font-medium mb-2">
                    Instagram
                  </p>
                  <a
                    href="https://www.instagram.com/dievstorez/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-black hover:underline"
                  >
                    @dievstorez
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-black" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 font-medium mb-2">
                    Location
                  </p>
                  <p className="text-base text-black">India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            {submitted ? (
              <div className="bg-gray-50 p-10 text-center">
                <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-white flex items-center justify-center">
                  <Mail size={22} className="text-black" />
                </div>
                <h3 className="font-['Playfair_Display'] text-2xl text-black mb-3">
                  Message Sent
                </h3>
                <p className="text-base text-gray-600">
                  Thank you for reaching out. We'll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-gray-50 p-8 sm:p-10 space-y-7">
                <div>
                  <label className="block text-xs text-gray-600 mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-5 py-4 bg-white border border-gray-200 text-sm text-black focus:outline-none focus:border-black transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-5 py-4 bg-white border border-gray-200 text-sm text-black focus:outline-none focus:border-black transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-2">Message</label>
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-5 py-4 bg-white border border-gray-200 text-sm text-black focus:outline-none focus:border-black transition-colors resize-none"
                    placeholder="How can we help?"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-black text-white py-5 text-sm uppercase tracking-[0.15em] font-medium hover:bg-gray-800 transition-colors"
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
