import React, { useState } from 'react';
import { CheckCircle, AlertTriangle, Play, Loader2, Database, Map as MapIcon } from 'lucide-react';
import clsx from 'clsx';

export function Analysis() {
  const [activeTab, setActiveTab] = useState<'RAW' | 'PROCESSED' | 'DETECTIONS'>('DETECTIONS');

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-text-primary font-mono text-primary">MISSION-001 <span className="text-text-primary font-sans text-xl">AI ANALYSIS</span></h2>
        </div>
        <div className="flex items-center gap-2 text-sm bg-success/10 text-success px-3 py-1.5 rounded border border-success/20">
          <CheckCircle size={16} />
          ANALYSIS COMPLETE
        </div>
      </div>

      {/* Pipeline Visualizer */}
      <div className="bg-surface p-4 rounded-lg border border-border overflow-x-auto shrink-0 hidden md:block">
        <div className="flex items-center justify-between min-w-[600px] text-xs font-semibold text-text-secondary">
          <div className="flex flex-col items-center gap-2 text-success">
            <Database size={20} />
            INPUT
          </div>
          <div className="h-0.5 flex-1 bg-success/50 mx-4"></div>
          <div className="flex flex-col items-center gap-2 text-success">
            <Loader2 size={20} />
            PREPROCESSING
          </div>
          <div className="h-0.5 flex-1 bg-success/50 mx-4"></div>
          <div className="flex flex-col items-center gap-2 text-success">
            <Play size={20} />
            AI DETECTION
          </div>
          <div className="h-0.5 flex-1 bg-success/50 mx-4"></div>
          <div className="flex flex-col items-center gap-2 text-success">
            <CheckCircle size={20} />
            VALIDATION
          </div>
          <div className="h-0.5 flex-1 bg-success/50 mx-4"></div>
          <div className="flex flex-col items-center gap-2 text-success">
            <MapIcon size={20} />
            GEOLOCATION
          </div>
          <div className="h-0.5 flex-1 bg-border mx-4"></div>
          <div className="flex flex-col items-center gap-2 text-primary">
            <AlertTriangle size={20} />
            REVIEW
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 flex-1 min-h-0">
        {/* Sonar Viewer */}
        <div className="flex-1 bg-surface rounded-lg border border-border flex flex-col overflow-hidden">
          <div className="flex items-center justify-between p-2 border-b border-border bg-surface-secondary">
            <div className="flex gap-1">
              {(['RAW', 'PROCESSED', 'DETECTIONS'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={clsx(
                    "px-3 py-1 text-xs font-semibold rounded",
                    activeTab === tab ? "bg-primary text-white" : "text-text-secondary hover:text-text-primary"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="text-xs text-text-muted px-2 font-mono">
              SIMULATED ANALYSIS
            </div>
          </div>
          <div className="flex-1 relative bg-black overflow-hidden flex items-center justify-center p-4">
            {/* Synthetic Sonar Image placeholder */}
            <div className="w-full h-full max-w-2xl relative border border-border/50 bg-[#0a111a] flex items-center justify-center" style={{
              backgroundImage: 'radial-gradient(#111e2d 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}>
              {/* Fake Sonar background noise */}
              <div className="absolute inset-0 opacity-20" style={{ background: 'linear-gradient(90deg, rgba(25,211,197,0.1) 0%, transparent 100%)' }}></div>
              
              <img src="/assets/sonar-demo.png" alt="Sonar Data" className="w-full h-full object-contain opacity-80" onError={(e) => {
                e.currentTarget.style.display = 'none';
              }} />
              
              {!document.querySelector('img[src="/assets/sonar-demo.png"]')?.complete && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-text-muted font-mono text-sm">
                  <span>[ SONAR DATA STREAM ]</span>
                  <span className="text-primary mt-2">Rendering target acoustic returns...</span>
                </div>
              )}

              {activeTab === 'DETECTIONS' && (
                <div className="absolute top-[30%] left-[45%] w-32 h-24 border-2 border-danger bg-danger/10 z-10 flex flex-col justify-end p-1">
                  <span className="bg-danger text-white text-[10px] px-1 font-bold inline-block w-max">ANOM-0042 (87%)</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Detection Panel */}
        <div className="w-full md:w-80 bg-surface rounded-lg border border-border flex flex-col overflow-y-auto">
          <div className="p-4 border-b border-border">
            <h3 className="font-bold text-primary font-mono mb-1">ANOM-0042</h3>
            <p className="text-xl font-bold text-text-primary uppercase tracking-wide">POSSIBLE GHOST NET</p>
          </div>
          
          <div className="p-4 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-border/50">
              <span className="text-text-secondary text-sm">Confidence</span>
              <span className="font-bold text-lg text-primary">87%</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-border/50">
              <span className="text-text-secondary text-sm">Priority</span>
              <span className="font-bold text-sm bg-danger/20 text-danger px-2 py-0.5 rounded">HIGH</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-border/50">
              <span className="text-text-secondary text-sm">Estimated Size</span>
              <span className="font-mono text-sm">4.8 m × 2.7 m</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-border/50">
              <span className="text-text-secondary text-sm">Location Uncertainty</span>
              <span className="font-mono text-sm">±6.5 m</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-border/50">
              <span className="text-text-secondary text-sm">Status</span>
              <span className="font-bold text-sm text-warning flex items-center gap-1"><AlertTriangle size={14}/> PENDING REVIEW</span>
            </div>
          </div>

          <div className="p-4 mt-auto bg-surface-secondary border-t border-border">
            <h4 className="text-xs font-semibold text-text-muted uppercase mb-3">Validation Evidence</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Model Confidence</span>
                <span className="text-success flex items-center gap-1"><CheckCircle size={12}/> PASS</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Acoustic Shadow</span>
                <span className="text-success flex items-center gap-1"><CheckCircle size={12}/> PASS</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Neighbouring Pings</span>
                <span className="text-success flex items-center gap-1"><CheckCircle size={12}/> PASS</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Shape / Size</span>
                <span className="text-success flex items-center gap-1"><CheckCircle size={12}/> PASS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
