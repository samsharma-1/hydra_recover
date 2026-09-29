import React from 'react';
import { mockMissions } from '../data/mock';
import { Plus, Play, Download, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Missions() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Missions</h2>
          <p className="text-text-secondary text-sm">Manage sonar survey missions.</p>
        </div>
        <button 
          className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md font-semibold transition-colors text-sm w-full md:w-auto justify-center"
          onClick={() => navigate('/missions/new')}
        >
          <Plus size={18} />
          NEW MISSION
        </button>
      </div>

      <div className="bg-surface rounded-lg border border-border overflow-hidden">
        {/* Mobile View */}
        <div className="md:hidden divide-y divide-border">
          {mockMissions.map(mission => (
            <div key={mission.id} className="p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-text-primary">{mission.name}</h3>
                  <p className="font-mono text-xs text-primary">{mission.id}</p>
                </div>
                <span className="text-xs px-2 py-1 rounded bg-surface-secondary text-text-secondary border border-border">
                  {mission.status}
                </span>
              </div>
              <div className="text-sm text-text-secondary grid grid-cols-2 gap-2">
                <div>Date: {mission.date}</div>
                <div>Coverage: {mission.coverage}</div>
                <div>Detections: <span className="text-text-primary font-medium">{mission.detectionsCount}</span></div>
              </div>
              <div className="flex gap-2 pt-2">
                <button className="flex-1 bg-surface-secondary hover:bg-surface border border-border py-1.5 rounded text-xs flex items-center justify-center gap-1">
                  <Search size={14} /> VIEW
                </button>
                <button className="flex-1 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 py-1.5 rounded text-xs flex items-center justify-center gap-1" onClick={() => navigate('/analysis')}>
                  <Play size={14} /> ANALYZE
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-secondary text-text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Mission ID</th>
                <th className="px-4 py-3 font-medium">Mission Name</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Sonar Source</th>
                <th className="px-4 py-3 font-medium">Coverage</th>
                <th className="px-4 py-3 font-medium">Detections</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockMissions.map(mission => (
                <tr key={mission.id} className="hover:bg-surface-secondary/30 transition-colors">
                  <td className="px-4 py-3 font-mono text-primary">{mission.id}</td>
                  <td className="px-4 py-3 font-medium text-text-primary">{mission.name}</td>
                  <td className="px-4 py-3 text-text-secondary">{mission.date}</td>
                  <td className="px-4 py-3 text-text-secondary">{mission.sonarSource}</td>
                  <td className="px-4 py-3 text-text-secondary">{mission.coverage}</td>
                  <td className="px-4 py-3 font-semibold">{mission.detectionsCount}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-1 rounded bg-surface-secondary text-text-secondary border border-border">
                      {mission.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button className="p-1.5 text-text-secondary hover:text-text-primary hover:bg-surface-secondary rounded" title="View">
                        <Search size={16} />
                      </button>
                      <button className="p-1.5 text-primary hover:text-primary-dark hover:bg-primary/10 rounded" title="Analyze" onClick={() => navigate('/analysis')}>
                        <Play size={16} />
                      </button>
                      <button className="p-1.5 text-text-secondary hover:text-text-primary hover:bg-surface-secondary rounded" title="Export">
                        <Download size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
