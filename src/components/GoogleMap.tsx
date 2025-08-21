import React, { useEffect, useRef, useState } from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';

declare global {
  interface Window {
    google: any;
  }
}

interface GoogleMapProps {
  center: { lat: number; lng: number };
  zoom: number;
  address?: string;
  className?: string;
}

const MapComponent: React.FC<GoogleMapProps> = ({ center, zoom, address, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>();

  useEffect(() => {
    if (ref.current && !map && window.google) {
      const newMap = new window.google.maps.Map(ref.current, {
        center,
        zoom,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'on' }]
          }
        ]
      });

      // Add marker
      new window.google.maps.Marker({
        position: center,
        map: newMap,
        title: address || 'Location',
        animation: window.google.maps.Animation.DROP,
      });

      setMap(newMap);
    }
  }, [ref, map, center, zoom, address]);

  return <div ref={ref} className={className} />;
};

const GoogleMap: React.FC<GoogleMapProps> = (props) => {
  const [apiKey, setApiKey] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Try to get API key from localStorage for now
    const fetchApiKey = async () => {
      try {
        const storedKey = localStorage.getItem('google_maps_api_key');
        if (storedKey) {
          setApiKey(storedKey);
        } else {
          setError('Google Maps API key not found. Please add it in the input below.');
        }
      } catch (err) {
        setError('Failed to load Google Maps API key');
      } finally {
        setLoading(false);
      }
    };

    fetchApiKey();
  }, []);

  const handleApiKeySubmit = (key: string) => {
    localStorage.setItem('google_maps_api_key', key);
    setApiKey(key);
    setError('');
  };

  if (loading) {
    return (
      <div className={props.className || "w-full h-64 bg-gray-100 rounded flex items-center justify-center"}>
        <div className="text-gray-500">Loading map...</div>
      </div>
    );
  }

  if (error || !apiKey) {
    return (
      <div className={props.className || "w-full h-64 bg-gray-100 rounded p-4"}>
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            To display the map, please enter your Google Maps API key:
          </p>
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="Enter Google Maps API key"
              className="w-full px-3 py-2 border border-gray-300 rounded mb-2"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleApiKeySubmit((e.target as HTMLInputElement).value);
                }
              }}
            />
            <p className="text-xs text-gray-500">
              Get your API key from{' '}
              <a 
                href="https://console.cloud.google.com/google/maps-apis/credentials" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Google Cloud Console
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Wrapper apiKey={apiKey}>
      <MapComponent {...props} />
    </Wrapper>
  );
};

export default GoogleMap;