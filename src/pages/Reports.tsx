import React from 'react';
import { Download, FileText, Database as DatabaseIcon } from 'lucide-react';
import { mockDetections, mockMissions } from '../data/mock';

export function Reports() {
  const verifiedCount = mockDetections.filter(d => d.status === 'VERIFIED').length;
  
  const generateCSV = () => {
    let csv = "ID,Class,Confidence,Priority,Latitude,Longitude,Status\n";
    mockDetections.forEach(d => {
      csv += `${d.id},${d.className},${d.confidence}%,${d.priority},${d.latitude},${d.longitude},${d.status}\n`;
    });
    downloadFile(csv, 'report.csv', 'text/csv');
  };

  const generateJSON = () => {
    const json = JSON.stringify(mockDetections, null, 2);
    downloadFile(json, 'report.json', 'application/json');
  };

  const generateGeoJSON = () => {
    const geojson = {
      type: "FeatureCollection",
      features: mockDetections.map(d => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [d.longitude, d.latitude] // GeoJSON uses [lon, lat]
        },
        properties: {
          id: d.id,
          class: d.className,
          confidence: d.confidence,
          priority: d.priority,
          status: d.status
        }
      }))
    };
    downloadFile(JSON.stringify(geojson, null, 2), 'report.geojson', 'application/json');
  };

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">Mission Reports</h2>
        <p className="text-text-secondary text-sm">Export verified anomalies for further analysis and handover.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-surface border border-border p-6 rounded-lg shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="font-mono text-primary font-bold text-xl mb-1">MISSION-001</h3>
              <p className="text-text-secondary">Coastal Survey Alpha</p>
              <div className="flex items-center gap-4 mt-4 text-sm font-semibold">
                <span className="bg-surface-secondary px-3 py-1 rounded border border-border">
                  Total: {mockDetections.length}
                </span>
                <span className="bg-success/10 text-success px-3 py-1 rounded border border-success/20 flex items-center gap-2">
                  Verified Detections: {verifiedCount}
                </span>
              </div>
            </div>
            
            <div className="flex flex-col gap-2 w-full md:w-48">
              <button onClick={generateCSV} className="flex items-center justify-between px-4 py-2 bg-surface-secondary hover:bg-surface border border-border rounded text-sm font-medium transition-colors">
                DOWNLOAD CSV <Download size={16} />
              </button>
              <button onClick={generateJSON} className="flex items-center justify-between px-4 py-2 bg-surface-secondary hover:bg-surface border border-border rounded text-sm font-medium transition-colors">
                DOWNLOAD JSON <Download size={16} />
              </button>
              <button onClick={generateGeoJSON} className="flex items-center justify-between px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 rounded text-sm font-bold transition-colors">
                DOWNLOAD GEOJSON <MapIcon /> 
              </button>
            </div>
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-surface border border-border rounded-lg overflow-hidden">
          <div className="p-4 border-b border-border bg-surface-secondary flex items-center gap-2">
            <FileText size={18} className="text-text-secondary" />
            <h3 className="font-semibold text-sm">Report Preview</h3>
          </div>
          <div className="p-4 font-mono text-xs overflow-x-auto text-text-muted">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border text-text-primary">
                  <th className="py-2">ID</th>
                  <th className="py-2">Class</th>
                  <th className="py-2">Confidence</th>
                  <th className="py-2">Priority</th>
                  <th className="py-2">Coordinates</th>
                  <th className="py-2">Uncertainty</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {mockDetections.slice(0, 5).map(det => (
                  <tr key={det.id} className="hover:bg-surface-secondary/20">
                    <td className="py-2 text-primary">{det.id}</td>
                    <td className="py-2 text-text-primary">{det.className}</td>
                    <td className="py-2">{det.confidence}%</td>
                    <td className="py-2">
                      <span className={det.priority === 'HIGH' ? 'text-danger' : det.priority === 'MEDIUM' ? 'text-warning' : 'text-text-secondary'}>
                        {det.priority}
                      </span>
                    </td>
                    <td className="py-2">{det.latitude.toFixed(4)}°N, {det.longitude.toFixed(4)}°E</td>
                    <td className="py-2">±{det.uncertainty}m</td>
                    <td className="py-2">
                      <span className={det.status === 'VERIFIED' ? 'text-success' : det.status === 'REJECTED' ? 'text-danger' : 'text-warning'}>
                        {det.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 pt-4 border-t border-border text-center">
              ... {mockDetections.length - 5} more records
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const MapIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21 3 6"></polygon><line x1="9" y1="3" x2="9" y2="18"></line><line x1="15" y1="6" x2="15" y2="21"></line></svg>;
