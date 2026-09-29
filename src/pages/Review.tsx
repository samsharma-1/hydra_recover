import React, { useState } from 'react';
import { Check, X, RefreshCw, CheckCircle, AlertTriangle } from 'lucide-react';

export function Review() {
  const [status, setStatus] = useState<'PENDING' | 'VERIFIED' | 'REJECTED'>('PENDING');

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="shrink-0">
        <h2 className="text-2xl font-bold text-text-primary">Expert Verification</h2>
        <p className="text-text-secondary text-sm">Human-in-the-loop validation of AI targets.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-0">
        
        {/* Left: Sonar Crop */}
        <div className="flex-1 bg-surface rounded-lg border border-border flex flex-col min-h-[300px]">
          <div className="p-3 border-b border-border flex justify-between items-center bg-surface-secondary">
            <h3 className="font-semibold text-sm">Sonar Crop: ANOM-0042</h3>
            <span className="text-xs font-mono text-text-muted">MISSION-001</span>
          </div>
          <div className="flex-1 relative bg-[#0a111a] flex items-center justify-center p-4">
             {/* Simulating sonar crop */}
             <div className="w-full h-full max-w-sm max-h-sm relative overflow-hidden rounded border border-border" style={{
              backgroundImage: 'radial-gradient(#111e2d 1px, transparent 1px)',
              backgroundSize: '10px 10px'
            }}>
              <img src="/assets/sonar-demo.png" alt="Sonar Target" className="w-[200%] h-[200%] object-cover absolute top-[-50%] left-[-50%] opacity-80" onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}/>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-24 border-2 border-danger shadow-[0_0_15px_rgba(239,68,68,0.5)]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Review Tools */}
        <div className="w-full md:w-96 bg-surface rounded-lg border border-border flex flex-col shrink-0 overflow-y-auto">
          <div className="p-4 border-b border-border">
            <h3 className="text-lg font-bold mb-1">Target Assessment</h3>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-text-secondary">Prediction:</span>
              <span className="font-bold text-primary">Possible Ghost Net</span>
            </div>
            <div className="flex items-center gap-2 text-sm mt-1">
              <span className="text-text-secondary">Confidence:</span>
              <span className="font-bold">87%</span>
            </div>
            <div className="flex items-center gap-2 text-sm mt-1">
              <span className="text-text-secondary">AI Validation:</span>
              <span className="text-success font-bold flex items-center gap-1"><CheckCircle size={14} /> PASS</span>
            </div>
          </div>

          <div className="p-4 space-y-6 flex-1">
            {status !== 'PENDING' && (
              <div className={`p-3 rounded-lg flex items-center justify-center gap-2 font-bold ${status === 'VERIFIED' ? 'bg-success/20 text-success border border-success/30' : 'bg-danger/20 text-danger border border-danger/30'}`}>
                {status === 'VERIFIED' ? <CheckCircle size={20} /> : <AlertTriangle size={20} />}
                {status}
              </div>
            )}

            <div className="space-y-3">
              <label className="text-sm font-semibold block text-text-primary">Correct Class (If wrong)</label>
              <select className="w-full bg-surface-secondary border border-border rounded p-2 text-sm text-text-primary focus:outline-none focus:border-primary">
                <option>Possible Ghost Net</option>
                <option>Shipwreck</option>
                <option>Pipe/Cylinder</option>
                <option>Other Artificial Object</option>
                <option>Unknown Anomaly</option>
                <option>Natural Background</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold block text-text-primary">Reviewer Comment</label>
              <textarea 
                className="w-full bg-surface-secondary border border-border rounded p-2 text-sm text-text-primary focus:outline-none focus:border-primary h-24 resize-none" 
                placeholder="Add notes about structure, shadow, or validation..."
              ></textarea>
            </div>
          </div>

          <div className="p-4 border-t border-border bg-surface-secondary space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => setStatus('VERIFIED')}
                className="bg-success hover:bg-success/90 text-white font-bold py-2 px-4 rounded flex items-center justify-center gap-2 transition-colors"
              >
                <Check size={18} /> CONFIRM
              </button>
              <button 
                onClick={() => setStatus('REJECTED')}
                className="bg-surface hover:bg-surface border border-border hover:border-danger hover:text-danger text-text-primary font-bold py-2 px-4 rounded flex items-center justify-center gap-2 transition-colors"
              >
                <X size={18} /> REJECT
              </button>
            </div>
            <button className="w-full bg-surface hover:bg-surface border border-border text-text-primary font-bold py-2 px-4 rounded flex items-center justify-center gap-2 transition-colors mt-2">
              <RefreshCw size={18} /> UPDATE & SAVE
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
