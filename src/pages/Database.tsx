import React, { useState } from 'react';
import { Database as DatabaseIcon, Server, Search } from 'lucide-react';
import { mockDetections, mockMissions } from '../data/mock';

export function Database() {
  const [activeTab, setActiveTab] = useState<'MISSIONS' | 'PINGS' | 'DETECTIONS' | 'REVIEWS'>('DETECTIONS');

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="shrink-0 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Database</h2>
          <p className="text-text-secondary text-sm">Inspect structured records.</p>
        </div>
        <div className="bg-warning/10 border border-warning/30 text-warning px-3 py-1 rounded flex items-center gap-2 text-xs font-mono">
          <Server size={14} />
          LOCAL PROTOTYPE DATABASE
        </div>
      </div>

      <div className="flex-1 bg-surface border border-border rounded-lg flex flex-col overflow-hidden min-h-0">
        <div className="flex border-b border-border bg-surface-secondary shrink-0 overflow-x-auto">
          {(['MISSIONS', 'PINGS', 'DETECTIONS', 'REVIEWS'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-semibold whitespace-nowrap transition-colors ${activeTab === tab ? 'text-primary border-b-2 border-primary bg-surface' : 'text-text-secondary hover:text-text-primary hover:bg-surface/50'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-4 border-b border-border flex justify-between items-center shrink-0 gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" size={16} />
            <input type="text" placeholder={`Search ${activeTab.toLowerCase()}...`} className="w-full bg-surface-secondary border border-border rounded pl-9 pr-3 py-1.5 text-sm focus:outline-none focus:border-primary text-text-primary" />
          </div>
          <div className="text-xs text-text-secondary font-mono">
            {activeTab === 'DETECTIONS' ? mockDetections.length : activeTab === 'MISSIONS' ? mockMissions.length : 0} rows selected
          </div>
        </div>

        <div className="flex-1 overflow-auto bg-[#0a111a] p-4">
          {activeTab === 'DETECTIONS' && (
            <pre className="text-xs font-mono text-text-secondary w-full">
              <code className="block text-primary mb-4">SELECT * FROM detections ORDER BY confidence DESC LIMIT 100;</code>
              {JSON.stringify(mockDetections, null, 2)}
            </pre>
          )}
          {activeTab === 'MISSIONS' && (
            <pre className="text-xs font-mono text-text-secondary w-full">
              <code className="block text-primary mb-4">SELECT * FROM missions ORDER BY created_at DESC;</code>
              {JSON.stringify(mockMissions, null, 2)}
            </pre>
          )}
          {activeTab === 'PINGS' && (
            <div className="text-center text-text-muted mt-20 flex flex-col items-center justify-center font-mono">
              <DatabaseIcon size={32} className="mb-4 opacity-50" />
              Raw ping data table not exposed in prototype frontend.
            </div>
          )}
          {activeTab === 'REVIEWS' && (
             <div className="text-center text-text-muted mt-20 flex flex-col items-center justify-center font-mono">
             <DatabaseIcon size={32} className="mb-4 opacity-50" />
             Review logs table not exposed in prototype frontend.
           </div>
          )}
        </div>
      </div>
    </div>
  );
}
