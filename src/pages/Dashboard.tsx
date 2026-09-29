import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Target, CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react';
import { mockDetections, mockMissions } from '../data/mock';

const COLORS = ['#10b981', '#f97316', '#eab308', '#ef4444'];

const detectionData = [
  { name: 'Mon', count: 12 },
  { name: 'Tue', count: 19 },
  { name: 'Wed', count: 15 },
  { name: 'Thu', count: 22 },
  { name: 'Fri', count: 30 },
  { name: 'Sat', count: 28 },
  { name: 'Sun', count: 22 },
];

const classDistribution = [
  { name: 'Ghost Net', value: 45 },
  { name: 'Shipwreck', value: 12 },
  { name: 'Pipe/Cylinder', value: 25 },
  { name: 'Unknown', value: 18 },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header handled by Layout, can add specific dashboard sub-header if needed */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Overview</h2>
          <p className="text-text-secondary text-sm">Underwater Marine Intelligence Platform</p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-surface p-4 rounded-lg border border-border shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-text-muted text-xs font-semibold uppercase">Total Missions</h3>
            <Target size={16} className="text-primary" />
          </div>
          <p className="text-2xl font-bold text-text-primary">{mockMissions.length}</p>
        </div>
        <div className="bg-surface p-4 rounded-lg border border-border shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-text-muted text-xs font-semibold uppercase">Targets Detected</h3>
            <Target size={16} className="text-primary" />
          </div>
          <p className="text-2xl font-bold text-text-primary">148</p>
        </div>
        <div className="bg-surface p-4 rounded-lg border border-border shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-text-muted text-xs font-semibold uppercase">Verified Targets</h3>
            <CheckCircle size={16} className="text-success" />
          </div>
          <p className="text-2xl font-bold text-text-primary">96</p>
        </div>
        <div className="bg-surface p-4 rounded-lg border border-border shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-text-muted text-xs font-semibold uppercase">High Priority</h3>
            <AlertTriangle size={16} className="text-danger" />
          </div>
          <p className="text-2xl font-bold text-text-primary">11</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface p-4 rounded-lg border border-border">
          <h3 className="text-sm font-semibold mb-4">Detection Trend (7 Days)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={detectionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2d4560" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip cursor={{fill: '#1b2d41'}} contentStyle={{backgroundColor: '#111e2d', borderColor: '#2d4560', color: '#f8fafc'}} />
                <Bar dataKey="count" fill="#f97316" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-surface p-4 rounded-lg border border-border">
          <h3 className="text-sm font-semibold mb-4">Anomaly Class Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={classDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {classDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{backgroundColor: '#111e2d', borderColor: '#2d4560', color: '#f8fafc'}} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-2">
            {classDistribution.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2 text-xs">
                <span className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[index % COLORS.length]}}></span>
                <span className="text-text-secondary">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Detections Table / Cards */}
      <div className="bg-surface rounded-lg border border-border overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="text-sm font-semibold">Recent Detections</h3>
        </div>
        
        {/* Mobile View: Cards */}
        <div className="md:hidden divide-y divide-border">
          {mockDetections.slice(0, 5).map(det => (
            <div key={det.id} className="p-4 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="font-mono text-sm text-primary">{det.id}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${det.priority === 'HIGH' ? 'bg-danger/20 text-danger' : det.priority === 'MEDIUM' ? 'bg-warning/20 text-warning' : 'bg-surface-secondary text-text-secondary'}`}>
                  {det.priority}
                </span>
              </div>
              <div className="font-semibold">{det.className}</div>
              <div className="flex justify-between text-xs text-text-secondary">
                <span>Conf: {det.confidence}%</span>
                <span>{det.status}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View: Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-secondary text-text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">ID</th>
                <th className="px-4 py-3 font-medium">Class</th>
                <th className="px-4 py-3 font-medium">Confidence</th>
                <th className="px-4 py-3 font-medium">Priority</th>
                <th className="px-4 py-3 font-medium">Location</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockDetections.slice(0, 5).map(det => (
                <tr key={det.id} className="hover:bg-surface-secondary/50 transition-colors cursor-pointer">
                  <td className="px-4 py-3 font-mono text-primary">{det.id}</td>
                  <td className="px-4 py-3">{det.className}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-background rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{width: `${det.confidence}%`}}></div>
                      </div>
                      <span className="text-xs">{det.confidence}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${det.priority === 'HIGH' ? 'bg-danger/20 text-danger border border-danger/30' : det.priority === 'MEDIUM' ? 'bg-warning/20 text-warning border border-warning/30' : 'bg-surface-secondary text-text-secondary border border-border'}`}>
                      {det.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-text-secondary">
                    {det.latitude.toFixed(4)}, {det.longitude.toFixed(4)}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs flex items-center gap-1 ${det.status === 'VERIFIED' ? 'text-success' : det.status === 'REJECTED' ? 'text-danger' : 'text-warning'}`}>
                      {det.status === 'VERIFIED' && <CheckCircle size={12} />}
                      {det.status === 'REJECTED' && <AlertCircle size={12} />}
                      {det.status === 'PENDING' && <AlertTriangle size={12} />}
                      {det.status}
                    </span>
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
