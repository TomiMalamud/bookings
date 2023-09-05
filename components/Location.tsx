import { useState } from 'react';
import Image from 'next/image';
import mapPlaceHolder from '../public/map-placeholder.png';

export default function Location({location, locationDescription, locationUrl, moving}) {
  const [showMap, setShowMap] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const handleIframeLoad = () => {
    setIframeLoaded(true);
  };

  return (
    <div className='py-10'>
      <h2 className='text-xl mb-6 font-medium'>¿Dónde van a estar?</h2>
      <div className={`relative w-full ${showMap ? 'hidden' : ''}`}>
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <button 
            onClick={() => setShowMap(!showMap)} 
            className="flex align-middle items-center py-2 px-4 bg-white hover:border-slate-700 transition border rounded-md border-slate-400 font-medium text-sm max-w-fit"
          >
            Ver Mapa
          </button>
        </div>
        { !showMap && <div className={`${showMap && !iframeLoaded ? 'animate-pulse' : ''} backdrop-blur-3xl bg-black/70 rounded-lg`}> <Image src={mapPlaceHolder} alt="Map Placeholder" height={450} className='opacity-50'/> </div> }
      </div>
      {showMap && (
        <iframe
          src={locationUrl}
          width="100%"
          height="450"
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="map"
          className="rounded-lg border-0 sm:rounded-xl"
          onLoad={handleIframeLoad}
        ></iframe>
      )}

      <div className="pt-8 prose">
        <h3 className="font-medium text-md mb-4">{location}</h3>
        <p>{locationDescription}</p>
        <br />
        <h3 className="font-medium text-md my-3">Cómo moverse</h3>
        <p>{moving}</p>
      </div>
    </div>
  );
}
