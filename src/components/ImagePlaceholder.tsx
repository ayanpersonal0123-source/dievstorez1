import React, { useState } from 'react';

interface Props {
  src: string;
  alt: string;
  className?: string;
}

const ImagePlaceholder: React.FC<Props> = ({ src, alt, className = '' }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`bg-gray-50 flex items-center justify-center ${className}`}
      >
        <div className="text-center p-6">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="m21 15-5-5L5 21" />
            </svg>
          </div>
          <p className="text-xs text-gray-400 uppercase tracking-[0.15em]">
            Image coming soon
          </p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
      loading="lazy"
    />
  );
};

export default ImagePlaceholder;
