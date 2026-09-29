import React, { useState } from 'react';
import { mockDetections } from '../data/mock';
import { Search, Filter, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Detections() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = mockDetections.filter(d => 
    d.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.className.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Detections</h2>
          <p className="text-text-secondary text-sm">Manage and filter all identified anomalies.</p>
        </div>
      </div>

      <div className="bg-surface rounded-lg border border-border flex flex-col flex-1 min-h-0">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" size={18} />
            <input 
              type="text" 
              placeholder="Search detection ID or class..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-surface-secondary border border-border rounded pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors text-text-primary"
            />
          </div>
          <button className="flex items-center justify-center gap-2 bg-surface-secondary border border-border px-4 py-2 rounded text-sm hover:bg-surface text-text-secondary">
            <Filter size={16} /> Filters
          </button>
        </div>

        {/* Mobile View: Cards */}
        <div className="md:hidden divide-y divide-border overflow-y-auto flex-1">
          {filtered.map(det => (
            <div key={det.id} className="p-4 flex flex-col gap-3" onClick={() => navigate('/analysis')}>
              <div className="flex justify-between items-center">
                <span className="font-mono text-sm text-primary font-bold">{det.id}</span>
                <span className={`text-xs px-2 py-1 rounded-full font-bold ${det.priority === 'HIGH' ? 'bg-danger/20 text-danger' : det.priority === 'MEDIUM' ? 'bg-warning/20 text-warning' : 'bg-surface-secondary text-text-secondary'}`}>
                  {det.priority}
                </span>
              </div>
              <div>
                <div className="font-semibold">{det.className}</div>
                <div className="text-xs text-text-secondary font-mono mt-1">
                  {det.latitude.toFixed(4)}°N, {det.longitude.toFixed(4)}°E (±{det.uncertainty}m)
                </div>
              </div>
              <div className="flex justify-between items-center text-xs pt-2 border-t border-border/50">
                <div className="flex items-center gap-1">
                  <span className="text-text-secondary">Conf:</span> 
                  <span className="font-semibold">{det.confidence}%</span>
                </div>
                <span className={`flex items-center gap-1 font-bold ${det.status === 'VERIFIED' ? 'text-success' : det.status === 'REJECTED' ? 'text-danger' : 'text-warning'}`}>
                  {det.status === 'VERIFIED' && <CheckCircle size={14} />}
                  {det.status === 'REJECTED' && <AlertCircle size={14} />}
                  {det.status === 'PENDING' && <AlertTriangle size={14} />}
                  {det.status}
                </span>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="p-8 text-center text-text-muted">No detections found</div>
          )}
        </div>

        {/* Desktop View: Table */}
        <div className="hidden md:block overflow-auto flex-1 relative">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-surface-secondary text-text-muted sticky top-0 z-10 shadow-sm">
              <tr>
                <th className="px-4 py-3 font-medium">Detection ID</th>
                <th className="px-4 py-3 font-medium">Class</th>
                <th className="px-4 py-3 font-medium">Confidence</th>
                <th className="px-4 py-3 font-medium">Priority</th>
                <th className="px-4 py-3 font-medium">Coordinates</th>
                <th className="px-4 py-3 font-medium">Uncertainty</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map(det => (
                <tr key={det.id} className="hover:bg-surface-secondary/50 transition-colors cursor-pointer" onClick={() => navigate('/analysis')}>
                  <td className="px-4 py-3 font-mono text-primary font-medium">{det.id}</td>
                  <td className="px-4 py-3 font-semibold">{det.className}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-background rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{width: `${det.confidence}%`}}></div>
                      </div>
                      <span className="text-xs">{det.confidence}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full ${det.priority === 'HIGH' ? 'bg-danger/20 text-danger border border-danger/30' : det.priority === 'MEDIUM' ? 'bg-warning/20 text-warning border border-warning/30' : 'bg-surface-secondary text-text-secondary border border-border'}`}>
                      {det.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-text-secondary">
                    {det.latitude.toFixed(4)}°N, {det.longitude.toFixed(4)}°E
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-text-secondary">
                    ±{det.uncertainty}m
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-bold flex items-center gap-1.5 ${det.status === 'VERIFIED' ? 'text-success' : det.status === 'REJECTED' ? 'text-danger' : 'text-warning'}`}>
                      {det.status === 'VERIFIED' && <CheckCircle size={14} />}
                      {det.status === 'REJECTED' && <AlertCircle size={14} />}
                      {det.status === 'PENDING' && <AlertTriangle size={14} />}
                      {det.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-text-muted">No detections found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
