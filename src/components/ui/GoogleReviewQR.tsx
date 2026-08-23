import React, { useRef } from 'react';
import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react';
import { Star, Download, Printer, ExternalLink, Copy, Check, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { CAFE_CONFIG } from '../../config/cafeConfig';

interface GoogleReviewQRProps {
  variant?: 'card' | 'standee' | 'compact';
  className?: string;
}

export const GoogleReviewQR: React.FC<GoogleReviewQRProps> = ({
  variant = 'card',
  className = '',
}) => {
  const [copied, setCopied] = React.useState(false);
  const qrCanvasRef = useRef<HTMLDivElement>(null);
  const standeeRef = useRef<HTMLDivElement>(null);

  const reviewUrl = CAFE_CONFIG.maps.directionsUrl; // https://maps.app.goo.gl/eTTR8FrJrevixehe7

  const handleCopyLink = () => {
    navigator.clipboard.writeText(reviewUrl);
    setCopied(true);
    toast.success('Google Review link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQR = () => {
    if (!qrCanvasRef.current) return;
    const canvas = qrCanvasRef.current.querySelector('canvas');
    if (!canvas) return;

    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `Cafe-Perfect-Zone-Google-Review-QR.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    toast.success('Google Review QR Code downloaded!');
  };

  const handlePrint = () => {
    window.print();
  };

  if (variant === 'compact') {
    return (
      <div className={`p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 flex items-center gap-4 ${className}`}>
        <div className="p-2 rounded-xl bg-white flex-shrink-0 shadow-md">
          <QRCodeSVG
            value={reviewUrl}
            size={80}
            level="H"
            includeMargin={false}
          />
        </div>
        <div className="space-y-1.5 flex-1 min-w-0">
          <div className="flex items-center gap-1 text-yellow-400">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-3.5 h-3.5 fill-yellow-400" />
            ))}
          </div>
          <h4 className="font-bold text-white text-sm">Review Us on Google</h4>
          <p className="text-xs text-gray-400 truncate">Scan with phone camera</p>
        </div>
        <a
          href={reviewUrl}
          target="_blank"
          rel="noreferrer"
          className="gold-btn-primary p-2.5 rounded-xl text-xs flex-shrink-0"
          title="Open Google Review Link"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    );
  }

  return (
    <div className={`cafe-card p-6 sm:p-8 rounded-3xl border border-yellow-500/30 bg-gradient-to-b from-zinc-900/95 via-[#121217] to-zinc-950 shadow-2xl relative overflow-hidden ${className}`}>
      {/* Glow background accent */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hidden canvas for downloading PNG */}
      <div ref={qrCanvasRef} className="hidden">
        <QRCodeCanvas
          value={reviewUrl}
          size={600}
          level="H"
          marginSize={2}
        />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
        {/* QR Code Frame */}
        <div className="flex-shrink-0">
          <div className="p-4 sm:p-5 rounded-2xl bg-white border-4 border-yellow-400/80 shadow-xl shadow-yellow-500/15 flex flex-col items-center justify-center relative group">
            <QRCodeSVG
              value={reviewUrl}
              size={180}
              level="H"
              includeMargin={false}
              className="transition-transform duration-300 group-hover:scale-105"
            />
            <div className="mt-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 text-yellow-400 text-[11px] font-bold tracking-wider uppercase shadow">
              <Sparkles className="w-3 h-3 text-yellow-400" />
              <span>SCAN TO REVIEW</span>
            </div>
          </div>
        </div>

        {/* Content Details */}
        <div className="space-y-4 flex-1 font-poppins">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 font-poppins text-xs font-bold uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-yellow-400" />
            <span>Google Reviews & Ratings</span>
          </div>

          <div>
            <h3 className="font-heading text-3xl sm:text-4xl text-white uppercase tracking-wide">
              LOVE OUR FOOD & VIBES?
            </h3>
            <p className="font-poppins text-gray-300 text-sm mt-1 leading-relaxed">
              Help us grow! Scan the QR code with your phone camera or click below to share your experience on our official Google Maps page.
            </p>
          </div>

          {/* Stars visual */}
          <div className="flex items-center justify-center md:justify-start gap-2 pt-1 font-poppins">
            <div className="flex text-yellow-400">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-5 h-5 fill-yellow-400 drop-shadow-sm" />
              ))}
            </div>
            <span className="text-sm font-bold text-white font-poppins">5.0 Star Experience</span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 pt-2 font-poppins">
            <a
              href={reviewUrl}
              target="_blank"
              rel="noreferrer"
              className="gold-btn-primary px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              <span>REVIEW ON GOOGLE</span>
            </a>

            <button
              type="button"
              onClick={handleDownloadQR}
              className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-gray-200 hover:text-white text-xs font-bold flex items-center gap-2 transition-colors"
              title="Download QR Code Image"
            >
              <Download className="w-4 h-4 text-yellow-400" />
              <span>Download QR</span>
            </button>

            <button
              type="button"
              onClick={handleCopyLink}
              className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-gray-200 hover:text-white text-xs font-bold flex items-center gap-2 transition-colors"
              title="Copy Google Review URL"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-yellow-400" />}
              <span>{copied ? 'Copied' : 'Copy Link'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
