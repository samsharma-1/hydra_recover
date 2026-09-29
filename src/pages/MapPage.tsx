import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { mockDetections } from '../data/mock';
import { useNavigate } from 'react-router-dom';

// Fix for default marker icons in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons based on priority
const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-icon',
    html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.5);"></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6]
  });
};

const highIcon = createCustomIcon('#ef4444');
const medIcon = createCustomIcon('#eab308');
const lowIcon = createCustomIcon('#94a3b8');

const surveyTrack: [number, number][] = [
  [12.9710, 77.5940],
  [12.9715, 77.5945],
  [12.9720, 77.5950],
  [12.9725, 77.5945],
  [12.9730, 77.5940]
];

export function MapPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">GIS Map</h2>
          <p className="text-text-secondary text-sm">Geospatial overview of detections and survey tracks.</p>
        </div>
      </div>

      <div className="flex-1 rounded-lg border border-border overflow-hidden bg-surface relative z-0 min-h-[320px]">
        <MapContainer 
          center={[12.9717, 77.5947]} 
          zoom={16} 
          style={{ height: '100%', width: '100%', backgroundColor: '#0a111a' }}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          
          <Polyline positions={surveyTrack} color="#10b981" weight={3} dashArray="5, 10" opacity={0.6} />

          {mockDetections.map((det) => {
            const icon = det.priority === 'HIGH' ? highIcon : det.priority === 'MEDIUM' ? medIcon : lowIcon;
            
            return (
              <Marker 
                key={det.id} 
                position={[det.latitude, det.longitude]}
                icon={icon}
              >
                <Popup className="custom-popup">
                  <div className="p-2 text-sm text-text-primary">
                    <h3 className="font-bold text-primary font-mono">{det.id}</h3>
                    <p className="font-semibold mb-2">{det.className}</p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                      <span className="text-text-secondary">Confidence:</span>
                      <span>{det.confidence}%</span>
                      <span className="text-text-secondary">Priority:</span>
                      <span className={det.priority === 'HIGH' ? 'text-danger font-bold' : ''}>{det.priority}</span>
                      <span className="text-text-secondary">Location:</span>
                      <span className="font-mono">{det.latitude.toFixed(4)}, {det.longitude.toFixed(4)}</span>
                      <span className="text-text-secondary">Uncertainty:</span>
                      <span>±{det.uncertainty}m</span>
                    </div>
                    <div className="mt-3 pt-3 border-t border-border/50">
                      <button 
                        onClick={() => navigate('/analysis')}
                        className="w-full bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 py-1 rounded transition-colors"
                      >
                        VIEW DETECTION
                      </button>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>

        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-surface/90 border border-border p-3 rounded shadow-lg backdrop-blur text-xs z-[400]">
          <h4 className="font-semibold mb-2 text-text-primary">Legend</h4>
          <div className="space-y-1">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-danger border border-white"></div>High Priority</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-warning border border-white"></div>Medium Priority</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-text-secondary border border-white"></div>Low Priority</div>
            <div className="flex items-center gap-2"><div className="w-4 h-0.5 bg-success opacity-60 mt-1 mb-1" style={{ borderStyle: 'dashed' }}></div>Survey Track</div>
          </div>
        </div>
      </div>
    </div>
  );
}
