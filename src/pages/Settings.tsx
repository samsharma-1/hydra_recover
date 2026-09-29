import React, { useState } from 'react';
import { Settings as SettingsIcon, Save, Cpu, ShieldAlert, Globe, MonitorSmartphone } from 'lucide-react';

export function Settings() {
  const [demoMode, setDemoMode] = useState(true);
  const [offlineMode, setOfflineMode] = useState(true);
  const [shadowValidation, setShadowValidation] = useState(true);
  const [pingValidation, setPingValidation] = useState(true);
  const [confidence, setConfidence] = useState(50);

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">Settings</h2>
        <p className="text-text-secondary text-sm">Configure AI models, validation thresholds, and system behavior.</p>
      </div>

      <div className="space-y-6">
        
        {/* AI MODEL */}
        <div className="bg-surface border border-border rounded-lg overflow-hidden">
          <div className="p-4 border-b border-border bg-surface-secondary flex items-center gap-2">
            <Cpu size={18} className="text-primary" />
            <h3 className="font-semibold text-text-primary">AI MODEL</h3>
          </div>
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold block text-text-primary mb-2">Active Model Architecture</label>
                <select className="w-full bg-background border border-border rounded p-2 text-sm text-text-primary focus:outline-none focus:border-primary">
                  <option>YOLOv8n-Seg (Default)</option>
                  <option>YOLOv8s-Seg</option>
                  <option>Mask R-CNN</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold block text-text-primary mb-2">Confidence Threshold ({confidence/100})</label>
                <input 
                  type="range" 
                  min="10" 
                  max="90" 
                  value={confidence} 
                  onChange={(e) => setConfidence(parseInt(e.target.value))}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-xs text-text-muted mt-1">
                  <span>0.10 (More false positives)</span>
                  <span>0.90 (More missed targets)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* VALIDATION */}
        <div className="bg-surface border border-border rounded-lg overflow-hidden">
          <div className="p-4 border-b border-border bg-surface-secondary flex items-center gap-2">
            <ShieldAlert size={18} className="text-primary" />
            <h3 className="font-semibold text-text-primary">VALIDATION ENGINE</h3>
          </div>
          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <div>
                <p className="font-semibold text-text-primary text-sm">Acoustic Shadow Validation</p>
                <p className="text-xs text-text-secondary">Corroborate object height using shadow length.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={shadowValidation} onChange={() => setShadowValidation(!shadowValidation)} />
                <div className="w-11 h-6 bg-surface-secondary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-semibold text-text-primary text-sm">Neighbouring Ping Validation</p>
                <p className="text-xs text-text-secondary">Ensure anomaly exists across multiple consecutive pings.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={pingValidation} onChange={() => setPingValidation(!pingValidation)} />
                <div className="w-11 h-6 bg-surface-secondary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>

        {/* SYSTEM & DEMO */}
        <div className="bg-surface border border-border rounded-lg overflow-hidden">
          <div className="p-4 border-b border-border bg-surface-secondary flex items-center gap-2">
            <MonitorSmartphone size={18} className="text-primary" />
            <h3 className="font-semibold text-text-primary">SYSTEM & ENVIRONMENT</h3>
          </div>
          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <div>
                <p className="font-semibold text-text-primary text-sm flex items-center gap-2"><Globe size={14}/> Offline Mode</p>
                <p className="text-xs text-text-secondary">Run entirely on local compute without external API calls.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={offlineMode} onChange={() => setOfflineMode(!offlineMode)} />
                <div className="w-11 h-6 bg-surface-secondary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-semibold text-warning text-sm flex items-center gap-2">Demo Mode</p>
                <p className="text-xs text-text-secondary">Use synthetic data and simulated analysis for presentations.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={demoMode} onChange={() => setDemoMode(!demoMode)} />
                <div className="w-11 h-6 bg-surface-secondary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-warning"></div>
              </label>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end pt-4">
           <button className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-6 rounded flex items-center gap-2 transition-colors">
              <Save size={18} /> SAVE CONFIGURATION
           </button>
        </div>

      </div>
    </div>
  );
}
