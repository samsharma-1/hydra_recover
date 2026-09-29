import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Missions } from './pages/Missions';
import { NewMission } from './pages/NewMission';
import { Analysis } from './pages/Analysis';
import { Detections } from './pages/Detections';
import { MapPage } from './pages/MapPage';
import { Review } from './pages/Review';
import { Reports } from './pages/Reports';
import { Database } from './pages/Database';
import { Settings } from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="missions" element={<Missions />} />
          <Route path="missions/new" element={<NewMission />} />
          <Route path="analysis" element={<Analysis />} />
          <Route path="detections" element={<Detections />} />
          <Route path="map" element={<MapPage />} />
          <Route path="review" element={<Review />} />
          <Route path="reports" element={<Reports />} />
          <Route path="database" element={<Database />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
