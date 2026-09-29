import type { Detection, Mission } from '../types';

export const mockMissions: Mission[] = [
  {
    id: "MISSION-001",
    name: "Coastal Survey Alpha",
    date: "28 Sep 2026",
    sonarSource: "Side-Scan Sonar",
    coverage: "4.8 km",
    detectionsCount: 32,
    status: "Completed"
  },
  {
    id: "MISSION-002",
    name: "Harbor Inspection Beta",
    date: "27 Sep 2026",
    sonarSource: "Side-Scan Sonar",
    coverage: "2.1 km",
    detectionsCount: 14,
    status: "Completed"
  },
  {
    id: "MISSION-003",
    name: "Deep Water Search",
    date: "25 Sep 2026",
    sonarSource: "Side-Scan Sonar",
    coverage: "8.5 km",
    detectionsCount: 102,
    status: "Completed"
  }
];

export const mockDetections: Detection[] = [
  {
    id: "ANOM-0042",
    missionId: "MISSION-001",
    className: "Possible Ghost Net",
    confidence: 87,
    priority: "HIGH",
    latitude: 12.9717,
    longitude: 77.5947,
    uncertainty: 6.5,
    estimatedLength: 4.8,
    estimatedWidth: 2.7,
    validation: {
      confidence: true,
      acousticShadow: true,
      neighbouringPings: true,
      shapeSize: true
    },
    status: "PENDING"
  },
  {
    id: "ANOM-0043",
    missionId: "MISSION-001",
    className: "Shipwreck",
    confidence: 94,
    priority: "HIGH",
    latitude: 12.9725,
    longitude: 77.5931,
    uncertainty: 4.2,
    estimatedLength: 12.5,
    estimatedWidth: 4.0,
    validation: {
      confidence: true,
      acousticShadow: true,
      neighbouringPings: true,
      shapeSize: true
    },
    status: "VERIFIED"
  },
  {
    id: "ANOM-0044",
    missionId: "MISSION-002",
    className: "Pipe/Cylinder",
    confidence: 81,
    priority: "MEDIUM",
    latitude: 12.9708,
    longitude: 77.5952,
    uncertainty: 5.1,
    estimatedLength: 3.2,
    estimatedWidth: 0.8,
    validation: {
      confidence: true,
      acousticShadow: true,
      neighbouringPings: true,
      shapeSize: true
    },
    status: "VERIFIED"
  },
  {
    id: "ANOM-0045",
    missionId: "MISSION-003",
    className: "Unknown Anomaly",
    confidence: 52,
    priority: "LOW",
    latitude: 12.9699,
    longitude: 77.5961,
    uncertainty: 8.2,
    estimatedLength: 1.5,
    estimatedWidth: 1.2,
    validation: {
      confidence: false,
      acousticShadow: true,
      neighbouringPings: false,
      shapeSize: true
    },
    status: "REJECTED"
  },
  {
    id: "ANOM-0046",
    missionId: "MISSION-001",
    className: "Possible Ghost Net",
    confidence: 78,
    priority: "HIGH",
    latitude: 12.9730,
    longitude: 77.5920,
    uncertainty: 5.8,
    estimatedLength: 3.5,
    estimatedWidth: 2.1,
    validation: {
      confidence: true,
      acousticShadow: true,
      neighbouringPings: true,
      shapeSize: false
    },
    status: "PENDING"
  }
];
