export interface Detection {
  id: string;
  missionId: string;
  className: string;
  confidence: number;
  priority: "HIGH" | "MEDIUM" | "LOW";
  latitude: number;
  longitude: number;
  uncertainty: number;
  estimatedLength: number;
  estimatedWidth: number;

  validation: {
    confidence: boolean;
    acousticShadow: boolean;
    neighbouringPings: boolean;
    shapeSize: boolean;
  };

  status: "PENDING" | "VERIFIED" | "REJECTED";
}

export interface Mission {
  id: string;
  name: string;
  date: string;
  sonarSource: string;
  coverage: string;
  detectionsCount: number;
  status: "Completed" | "In Progress" | "Pending";
}
