export type HotspotStatus = 'Critical' | 'High' | 'Medium' | 'Low';
export type DomainCategory =
  | 'All'
  | 'Water & Drainage'
  | 'Roads & Transport'
  | 'Electricity & Lighting'
  | 'Waste Management'
  | 'Public Safety'
  | 'Public Health'
  | 'Public Space';

export interface WardPolygonData {
  id: string;
  name: string;
  wardNumber: number;
  center: [number, number, number];
  polygon: [number, number][]; // 2D vertices for THREE.Shape
  activeClustersCount: number;
  highestPriority: number;
  primaryDomain: string;
  color: string;
}

export interface CityHotspotData {
  id: string;
  code: string;
  wardNumber: number;
  wardName: string;
  title: string;
  category: DomainCategory;
  priority: number;
  reportCount: number;
  severity: number;
  vulnerability: number;
  serviceGap: number;
  status: HotspotStatus;
  position: [number, number, number];
  rootCauseHypothesis: string;
  affectedPopulation: number;
  primaryDepartment: string;
  estimatedBudget: string;
  trendHistory: [number, number, number, number]; // Week 1 to Week 4 priority values
  evidenceGraphId?: string;
}

export interface PriorityMapDataset {
  regionName: string;
  totalWardsCount: number;
  activeHotspotsCount: number;
  criticalCount: number;
  highCount: number;
  mediumCount: number;
  highestPriority: number;
  mostAffectedDomain: string;
  wards: WardPolygonData[];
  hotspots: CityHotspotData[];
}

export const BENGALURU_PRIORITY_MAP_DATA: PriorityMapDataset = {
  regionName: 'Greater Bengaluru Urban Basin',
  totalWardsCount: 12,
  activeHotspotsCount: 16,
  criticalCount: 4,
  highCount: 7,
  mediumCount: 5,
  highestPriority: 96,
  mostAffectedDomain: 'Water & Drainage',
  wards: [
    // Ward 150: Bellandur (Arterial Tech Corridor)
    {
      id: 'ward-150',
      name: 'Ward 150 - Bellandur',
      wardNumber: 150,
      center: [1.8, -0.6, 0],
      polygon: [
        [0.8, -0.2],
        [2.6, -0.1],
        [2.8, -1.2],
        [1.6, -1.4],
        [0.7, -0.9],
      ],
      activeClustersCount: 4,
      highestPriority: 94,
      primaryDomain: 'Water & Drainage',
      color: '#06b6d4',
    },
    // Ward 174: HSR Layout
    {
      id: 'ward-174',
      name: 'Ward 174 - HSR Layout',
      wardNumber: 174,
      center: [0.6, -1.2, 0],
      polygon: [
        [0.0, -0.8],
        [0.8, -0.7],
        [1.4, -1.5],
        [0.4, -1.8],
        [-0.2, -1.4],
      ],
      activeClustersCount: 3,
      highestPriority: 89,
      primaryDomain: 'Roads & Transport',
      color: '#f59e0b',
    },
    // Ward 151: Koramangala
    {
      id: 'ward-151',
      name: 'Ward 151 - Koramangala',
      wardNumber: 151,
      center: [0.1, -0.1, 0],
      polygon: [
        [-0.6, 0.4],
        [0.7, 0.3],
        [0.7, -0.6],
        [-0.4, -0.7],
        [-0.8, -0.1],
      ],
      activeClustersCount: 3,
      highestPriority: 76,
      primaryDomain: 'Waste Management',
      color: '#10b981',
    },
    // Ward 112: Marathahalli
    {
      id: 'ward-112',
      name: 'Ward 112 - Marathahalli',
      wardNumber: 112,
      center: [2.5, 0.6, 0],
      polygon: [
        [1.8, 0.1],
        [3.1, 0.2],
        [3.3, 1.1],
        [2.1, 1.2],
        [1.7, 0.7],
      ],
      activeClustersCount: 3,
      highestPriority: 96,
      primaryDomain: 'Public Safety',
      color: '#ef4444',
    },
    // Ward 85: Doddanekkundi
    {
      id: 'ward-85',
      name: 'Ward 85 - Doddanekkundi',
      wardNumber: 85,
      center: [1.7, 1.5, 0],
      polygon: [
        [1.0, 1.0],
        [2.3, 1.1],
        [2.5, 2.0],
        [1.2, 2.1],
        [0.8, 1.6],
      ],
      activeClustersCount: 2,
      highestPriority: 78,
      primaryDomain: 'Electricity & Lighting',
      color: '#3b82f6',
    },
    // Ward 149: Varthur
    {
      id: 'ward-149',
      name: 'Ward 149 - Varthur',
      wardNumber: 149,
      center: [3.4, -0.4, 0],
      polygon: [
        [2.8, 0.0],
        [4.2, -0.1],
        [4.0, -1.2],
        [2.9, -1.0],
      ],
      activeClustersCount: 2,
      highestPriority: 92,
      primaryDomain: 'Water & Drainage',
      color: '#06b6d4',
    },
    // Ward 176: BTM Layout
    {
      id: 'ward-176',
      name: 'Ward 176 - BTM Layout',
      wardNumber: 176,
      center: [-0.6, -1.8, 0],
      polygon: [
        [-1.3, -1.3],
        [-0.1, -1.3],
        [0.0, -2.3],
        [-1.1, -2.4],
      ],
      activeClustersCount: 2,
      highestPriority: 85,
      primaryDomain: 'Electricity & Lighting',
      color: '#3b82f6',
    },
    // Ward 138: Whitefield
    {
      id: 'ward-138',
      name: 'Ward 138 - Whitefield',
      wardNumber: 138,
      center: [3.6, 1.2, 0],
      polygon: [
        [2.9, 0.6],
        [4.4, 0.7],
        [4.3, 1.9],
        [3.0, 1.8],
      ],
      activeClustersCount: 2,
      highestPriority: 86,
      primaryDomain: 'Roads & Transport',
      color: '#f59e0b',
    },
    // Ward 80: Indiranagar
    {
      id: 'ward-80',
      name: 'Ward 80 - Indiranagar',
      wardNumber: 80,
      center: [0.6, 0.8, 0],
      polygon: [
        [0.0, 0.4],
        [1.3, 0.4],
        [1.2, 1.3],
        [-0.1, 1.2],
      ],
      activeClustersCount: 2,
      highestPriority: 75,
      primaryDomain: 'Electricity & Lighting',
      color: '#3b82f6',
    },
    // Ward 160: RR Nagar
    {
      id: 'ward-160',
      name: 'Ward 160 - RR Nagar',
      wardNumber: 160,
      center: [-2.2, -1.2, 0],
      polygon: [
        [-3.0, -0.6],
        [-1.6, -0.6],
        [-1.5, -1.8],
        [-2.9, -1.9],
      ],
      activeClustersCount: 2,
      highestPriority: 70,
      primaryDomain: 'Public Health',
      color: '#059669',
    },
    // Ward 28: Sanjaynagar
    {
      id: 'ward-28',
      name: 'Ward 28 - Sanjaynagar',
      wardNumber: 28,
      center: [-0.6, 1.8, 0],
      polygon: [
        [-1.4, 1.3],
        [0.1, 1.3],
        [0.0, 2.4],
        [-1.3, 2.3],
      ],
      activeClustersCount: 1,
      highestPriority: 65,
      primaryDomain: 'Public Space',
      color: '#8b5cf6',
    },
    // Ward 198: Hemmigepura
    {
      id: 'ward-198',
      name: 'Ward 198 - Hemmigepura',
      wardNumber: 198,
      center: [-2.6, -2.4, 0],
      polygon: [
        [-3.4, -1.8],
        [-1.9, -1.9],
        [-2.0, -3.0],
        [-3.3, -2.9],
      ],
      activeClustersCount: 1,
      highestPriority: 64,
      primaryDomain: 'Roads & Transport',
      color: '#f59e0b',
    },
  ],
  hotspots: [
    // Flagship Cluster #1: Bellandur Stormwater Drain Overflow
    {
      id: 'CL-BLR-150-01',
      code: 'CL-BLR-150-01',
      wardNumber: 150,
      wardName: 'Ward 150 - Bellandur',
      title: 'Outer Ring Road — Bellandur SWD Drain Overflow',
      category: 'Water & Drainage',
      priority: 94,
      reportCount: 312,
      severity: 87,
      vulnerability: 95,
      serviceGap: 87,
      status: 'Critical',
      position: [1.9, -0.6, 0.12],
      rootCauseHypothesis: 'Primary SWD Culvert #412 silted by 78%, causing severe arterial backflow into EcoSpace.',
      affectedPopulation: 84000,
      primaryDepartment: 'BBMP Stormwater Drainage Dept',
      estimatedBudget: '₹1.45 Cr',
      trendHistory: [82, 86, 91, 94],
      evidenceGraphId: 'CL-BLR-150-01',
    },
    // Hotspot #2: Marathahalli Bridge Pedestrian Hazard
    {
      id: 'CL-BLR-112-07',
      code: 'CL-BLR-112-07',
      wardNumber: 112,
      wardName: 'Ward 112 - Marathahalli',
      title: 'Marathahalli Flyover Pedestrian & Bus Bay Hazard',
      category: 'Public Safety',
      priority: 96,
      reportCount: 210,
      severity: 94,
      vulnerability: 98,
      serviceGap: 92,
      status: 'Critical',
      position: [2.5, 0.7, 0.12],
      rootCauseHypothesis: 'Non-functional crossing signals and severed skywalk lighting forcing high-speed highway crossings.',
      affectedPopulation: 65000,
      primaryDepartment: 'Traffic Police & BBMP Road Infrastructure',
      estimatedBudget: '₹85 Lakhs',
      trendHistory: [88, 91, 94, 96],
    },
    // Hotspot #3: Varthur Lake Outlet Breach
    {
      id: 'CL-BLR-149-02',
      code: 'CL-BLR-149-02',
      wardNumber: 149,
      wardName: 'Ward 149 - Varthur',
      title: 'Varthur Lake Southern Outlet Siltation Breach',
      category: 'Water & Drainage',
      priority: 92,
      reportCount: 184,
      severity: 89,
      vulnerability: 92,
      serviceGap: 85,
      status: 'Critical',
      position: [3.4, -0.3, 0.12],
      rootCauseHypothesis: 'Downstream weir obstruction causing agricultural and residential inundation.',
      affectedPopulation: 38000,
      primaryDepartment: 'Minor Irrigation & BBMP Lakes',
      estimatedBudget: '₹1.20 Cr',
      trendHistory: [79, 84, 88, 92],
    },
    // Hotspot #4: Channasandra Crater Array
    {
      id: 'CL-BLR-084-03',
      code: 'CL-BLR-084-03',
      wardNumber: 85,
      wardName: 'Ward 85 - Doddanekkundi',
      title: 'Channasandra Main Road Multi-Crater Array',
      category: 'Roads & Transport',
      priority: 89,
      reportCount: 246,
      severity: 86,
      vulnerability: 90,
      serviceGap: 78,
      status: 'High',
      position: [1.8, 1.4, 0.12],
      rootCauseHypothesis: 'Continuous sub-base failure due to unchanneled water runoff and heavy axle load.',
      affectedPopulation: 52000,
      primaryDepartment: 'BBMP Major Roads Dept',
      estimatedBudget: '₹95 Lakhs',
      trendHistory: [75, 80, 85, 89],
    },
    // Hotspot #5: HSR Sector 2 Sewer Collapse
    {
      id: 'CL-BLR-174-05',
      code: 'CL-BLR-174-05',
      wardNumber: 174,
      wardName: 'Ward 174 - HSR Layout',
      title: 'HSR 27th Main Trunk Sewer Line Collapse',
      category: 'Water & Drainage',
      priority: 88,
      reportCount: 142,
      severity: 85,
      vulnerability: 88,
      serviceGap: 82,
      status: 'High',
      position: [0.7, -1.2, 0.12],
      rootCauseHypothesis: 'Cracked RCC pipe causing ground subsidence and localized sewage stagnation.',
      affectedPopulation: 34000,
      primaryDepartment: 'BWSSB Sewerage Operations',
      estimatedBudget: '₹65 Lakhs',
      trendHistory: [74, 81, 85, 88],
    },
    // Hotspot #6: ITPL Main Road Transit Bottleneck
    {
      id: 'CL-BLR-138-09',
      code: 'CL-BLR-138-09',
      wardNumber: 138,
      wardName: 'Ward 138 - Whitefield',
      title: 'ITPL Main Road Transit Junction Gridlock',
      category: 'Roads & Transport',
      priority: 86,
      reportCount: 175,
      severity: 82,
      vulnerability: 86,
      serviceGap: 75,
      status: 'High',
      position: [3.6, 1.1, 0.12],
      rootCauseHypothesis: 'Unregulated commercial auto stands and poorly timed smart traffic signal phasing.',
      affectedPopulation: 72000,
      primaryDepartment: 'Bengaluru Traffic Police & BBMP',
      estimatedBudget: '₹40 Lakhs',
      trendHistory: [80, 83, 85, 86],
    },
    // Hotspot #7: BTM 2nd Stage Ring Light Blackout
    {
      id: 'CL-BLR-176-06',
      code: 'CL-BLR-176-06',
      wardNumber: 176,
      wardName: 'Ward 176 - BTM Layout',
      title: 'BTM 2nd Stage Ring Road Lighting Grid Blackout',
      category: 'Electricity & Lighting',
      priority: 82,
      reportCount: 128,
      severity: 78,
      vulnerability: 85,
      serviceGap: 72,
      status: 'High',
      position: [-0.6, -1.7, 0.12],
      rootCauseHypothesis: 'Underground feeder cable severed during fiber optic trenching without relay restoration.',
      affectedPopulation: 41000,
      primaryDepartment: 'BESCOM Street Lighting Division',
      estimatedBudget: '₹32 Lakhs',
      trendHistory: [70, 75, 79, 82],
    },
    // Hotspot #8: Koramangala 4th Block SWM Overflow
    {
      id: 'CL-BLR-151-04',
      code: 'CL-BLR-151-04',
      wardNumber: 151,
      wardName: 'Ward 151 - Koramangala',
      title: 'Koramangala 4th Block Secondary Waste Stagnation',
      category: 'Waste Management',
      priority: 76,
      reportCount: 95,
      severity: 72,
      vulnerability: 78,
      serviceGap: 68,
      status: 'High',
      position: [0.2, -0.2, 0.12],
      rootCauseHypothesis: 'Secondary transfer station equipment failure causing open roadside black-spot accumulation.',
      affectedPopulation: 22000,
      primaryDepartment: 'BBMP Solid Waste Management',
      estimatedBudget: '₹28 Lakhs',
      trendHistory: [68, 71, 74, 76],
    },
    // Hotspot #9: 100ft Road Cable Hazard
    {
      id: 'CL-BLR-080-08',
      code: 'CL-BLR-080-08',
      wardNumber: 80,
      wardName: 'Ward 80 - Indiranagar',
      title: '100ft Road Dangling High-Voltage Cable Array',
      category: 'Electricity & Lighting',
      priority: 74,
      reportCount: 68,
      severity: 70,
      vulnerability: 76,
      serviceGap: 65,
      status: 'Medium',
      position: [0.6, 0.8, 0.12],
      rootCauseHypothesis: 'Overburdened utility poles and unbundled optical lines sagging near pedestrian walkways.',
      affectedPopulation: 29000,
      primaryDepartment: 'BESCOM & Telecom Infrastructure Group',
      estimatedBudget: '₹22 Lakhs',
      trendHistory: [65, 68, 71, 74],
    },
    // Hotspot #10: RR Nagar Toxic Runoff
    {
      id: 'CL-BLR-160-10',
      code: 'CL-BLR-160-10',
      wardNumber: 160,
      wardName: 'Ward 160 - RR Nagar',
      title: 'Rajarajeshwari Nagar Storm Drain Industrial Runoff',
      category: 'Public Health',
      priority: 70,
      reportCount: 64,
      severity: 68,
      vulnerability: 72,
      serviceGap: 62,
      status: 'Medium',
      position: [-2.2, -1.3, 0.12],
      rootCauseHypothesis: 'Illegal nighttime industrial dye effluent discharge into Vrishabhavathi tributary.',
      affectedPopulation: 18000,
      primaryDepartment: 'KSPCB & BBMP Health Department',
      estimatedBudget: '₹45 Lakhs',
      trendHistory: [62, 65, 68, 70],
    },
    // Hotspot #11: Sanjaynagar Park Encroachment
    {
      id: 'CL-BLR-028-11',
      code: 'CL-BLR-028-11',
      wardNumber: 28,
      wardName: 'Ward 28 - Sanjaynagar',
      title: 'Sanjaynagar Community Park Pathway Encroachment',
      category: 'Public Space',
      priority: 65,
      reportCount: 42,
      severity: 60,
      vulnerability: 68,
      serviceGap: 58,
      status: 'Medium',
      position: [-0.6, 1.8, 0.12],
      rootCauseHypothesis: 'Illegal debris dumping on senior citizen walking tracks and broken perimeter fence.',
      affectedPopulation: 12000,
      primaryDepartment: 'BBMP Horticulture & Estates',
      estimatedBudget: '₹18 Lakhs',
      trendHistory: [58, 60, 63, 65],
    },
    // Hotspot #12: Hemmigepura Road Erosion
    {
      id: 'CL-BLR-198-12',
      code: 'CL-BLR-198-12',
      wardNumber: 198,
      wardName: 'Ward 198 - Hemmigepura',
      title: 'Hemmigepura Link Road Shoulder Erosion',
      category: 'Roads & Transport',
      priority: 64,
      reportCount: 38,
      severity: 58,
      vulnerability: 65,
      serviceGap: 55,
      status: 'Medium',
      position: [-2.6, -2.3, 0.12],
      rootCauseHypothesis: 'Rainwash shoulder collapse causing single-lane restriction for local bus transit.',
      affectedPopulation: 15000,
      primaryDepartment: 'BBMP Road Maintenance',
      estimatedBudget: '₹25 Lakhs',
      trendHistory: [56, 59, 62, 64],
    },
  ],
};
