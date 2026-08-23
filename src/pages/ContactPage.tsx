import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Phone, 
  Clock, 
  MessageCircle, 
  Mail, 
  Send, 
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { InstagramIcon } from '../components/ui/Icons';
import { CAFE_CONFIG } from '../config/cafeConfig';
import { toast } from 'sonner';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      toast.error('Please enter your name and message');
      return;
    }

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      toast.success('Message Sent Successfully!', {
        description: "Thank you for reaching out. We will get back to you shortly!",
      });
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 800);
  };

  return (
    <div className="pt-24 pb-20 min-h-screen font-poppins">
      {/* Banner */}
      <div className="bg-radial-glow py-10 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 font-poppins text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>We'd Love To Hear From You</span>
          </div>

          <h1 className="font-heading text-5xl sm:text-7xl lg:text-8xl text-white uppercase tracking-wide">
            CONTACT & VISIT US
          </h1>

          <p className="font-poppins text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
            Have questions about party orders, menu customizations, or directions? Get in touch with our team directly.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Details & Quick Links */}
          <div className="lg:col-span-5 space-y-6">
            <div className="cafe-card p-6 sm:p-8 rounded-3xl space-y-6 border border-zinc-800">
              <h2 className="font-heading text-2xl font-black text-white uppercase border-b border-zinc-800 pb-3">
                Cafe Information
              </h2>

              <div className="space-y-4 text-sm text-gray-300">
                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Location Address</h4>
                    <p className="text-gray-400 text-xs mt-0.5 leading-relaxed">
                      {CAFE_CONFIG.address.full}
                    </p>
                    <a
                      href={CAFE_CONFIG.maps.directionsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-yellow-400 font-semibold hover:underline inline-flex items-center gap-1 mt-1.5"
                    >
                      <span>Open in Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Call Direct</h4>
                    <a href={`tel:${CAFE_CONFIG.phoneRaw}`} className="text-gray-400 text-xs hover:text-yellow-400 transition-colors">
                      {CAFE_CONFIG.phone}
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">WhatsApp Orders & Enquiries</h4>
                    <a
                      href={`https://wa.me/${CAFE_CONFIG.whatsappNumber}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-green-400 text-xs hover:underline"
                    >
                      {CAFE_CONFIG.whatsappDisplay}
                    </a>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Operational Hours</h4>
                    <p className="text-gray-400 text-xs">{CAFE_CONFIG.hours.timing}</p>
                    <p className="text-[11px] text-yellow-400 font-medium">{CAFE_CONFIG.hours.days}</p>
                  </div>
                </div>

                {/* Instagram */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <InstagramIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Instagram</h4>
                    <a
                      href={CAFE_CONFIG.social.instagramUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-pink-400 text-xs hover:underline"
                    >
                      {CAFE_CONFIG.social.instagramHandle}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7 space-y-6">
            <form onSubmit={handleSubmit} className="cafe-card p-6 sm:p-8 rounded-3xl space-y-5 border border-zinc-800">
              <h2 className="font-heading text-2xl font-black text-white uppercase border-b border-zinc-800 pb-3">
                Send Us A Message
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anand Shinde"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-yellow-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 7666599406"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-yellow-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-yellow-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                  Your Message or Inquiry *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Ask about birthday celebrations, bulk snacks orders, or general queries..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-yellow-500 focus:outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="gold-btn-primary w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-yellow-500/20 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSending ? 'Sending...' : 'Send Message'}</span>
              </button>
            </form>
          </div>
        </div>

        {/* Embedded Interactive Google Map */}
        <div className="cafe-card p-4 sm:p-6 rounded-3xl space-y-4 border border-zinc-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-yellow-400" />
              <h3 className="font-heading text-xl font-bold text-white uppercase">
                Find Us on Google Maps
              </h3>
            </div>
            <a
              href={CAFE_CONFIG.maps.directionsUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-yellow-400 hover:underline flex items-center gap-1"
            >
              <span>Get Directions</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="h-96 rounded-2xl overflow-hidden border border-zinc-800 relative shadow-inner">
            <iframe
              title="Cafe Perfect Zone Map"
              src={CAFE_CONFIG.maps.embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(20%) invert(90%) hue-rotate(180deg)' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
