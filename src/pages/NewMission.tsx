import React, { useState } from 'react';
import { UploadCloud, CheckCircle, Play, FileText, Map as MapIcon, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function NewMission() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">Create New Mission</h2>
        <p className="text-text-secondary text-sm">Upload sonar data and navigation metadata to initiate AI analysis.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Sonar Upload */}
        <div className="bg-surface border border-border rounded-lg p-6 flex flex-col items-center justify-center text-center space-y-4 min-h-[250px] border-dashed hover:border-primary transition-colors cursor-pointer">
          <div className="bg-surface-secondary p-4 rounded-full">
            <UploadCloud size={32} className="text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-text-primary">Side-Scan Sonar Imagery</h3>
            <p className="text-xs text-text-secondary mt-1">Accepts PNG, JPG, TIFF</p>
          </div>
          <p className="text-xs text-text-muted mt-2">Drag and drop or click to browse</p>
        </div>

        {/* Nav Data Upload */}
        <div className="bg-surface border border-border rounded-lg p-6 flex flex-col items-center justify-center text-center space-y-4 min-h-[250px] border-dashed hover:border-primary transition-colors cursor-pointer">
          <div className="bg-surface-secondary p-4 rounded-full">
            <MapIcon size={32} className="text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-text-primary">Navigation Data</h3>
            <p className="text-xs text-text-secondary mt-1">Accepts CSV (GPS/INS format)</p>
          </div>
          <p className="text-xs text-text-muted mt-2">Drag and drop or click to browse</p>
        </div>

      </div>

      {/* Mission Information */}
      <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
        <h3 className="font-bold text-text-primary border-b border-border pb-2">Mission Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-text-secondary block mb-1">Mission Name</label>
            <input type="text" className="w-full bg-surface-secondary border border-border rounded p-2 text-sm text-text-primary focus:outline-none focus:border-primary" placeholder="e.g. Coastal Survey Alpha" />
          </div>
          <div>
            <label className="text-xs font-semibold text-text-secondary block mb-1">Survey Date</label>
            <input type="date" className="w-full bg-surface-secondary border border-border rounded p-2 text-sm text-text-primary focus:outline-none focus:border-primary" />
          </div>
          <div>
            <label className="text-xs font-semibold text-text-secondary block mb-1">Sonar Model</label>
            <select className="w-full bg-surface-secondary border border-border rounded p-2 text-sm text-text-primary focus:outline-none focus:border-primary">
              <option>EdgeTech 4125</option>
              <option>Klein 4900</option>
              <option>DeepVision</option>
              <option>Other / Unknown</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-semibold text-text-secondary block mb-1">Frequency (kHz)</label>
              <input type="number" className="w-full bg-surface-secondary border border-border rounded p-2 text-sm text-text-primary focus:outline-none focus:border-primary" placeholder="900" />
            </div>
            <div>
              <label className="text-xs font-semibold text-text-secondary block mb-1">Range (m)</label>
              <input type="number" className="w-full bg-surface-secondary border border-border rounded p-2 text-sm text-text-primary focus:outline-none focus:border-primary" placeholder="50" />
            </div>
          </div>
        </div>
      </div>

      {/* Validation */}
      <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
        {!validated ? (
           <button 
             onClick={() => setValidated(true)}
             className="w-full bg-surface-secondary hover:bg-surface border border-border text-text-primary font-bold py-3 rounded flex items-center justify-center gap-2 transition-colors"
           >
             <ShieldAlert size={18} /> VALIDATE MISSION
           </button>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs font-mono">
              <div className="bg-success/10 text-success p-2 rounded flex items-center gap-2 border border-success/20">
                <CheckCircle size={14} /> Sonar file valid
              </div>
              <div className="bg-success/10 text-success p-2 rounded flex items-center gap-2 border border-success/20">
                <CheckCircle size={14} /> Navigation file valid
              </div>
              <div className="bg-success/10 text-success p-2 rounded flex items-center gap-2 border border-success/20">
                <CheckCircle size={14} /> Timestamp matched
              </div>
              <div className="bg-success/10 text-success p-2 rounded flex items-center gap-2 border border-success/20">
                <CheckCircle size={14} /> Metadata available
              </div>
            </div>
            
            <button 
             onClick={() => navigate('/analysis')}
             className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded flex items-center justify-center gap-2 transition-colors"
           >
             <Play size={18} /> RUN ANALYSIS
           </button>
          </div>
        )}
      </div>

    </div>
  );
}
