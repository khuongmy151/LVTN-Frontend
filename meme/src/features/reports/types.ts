// src/features/reports/types.ts
export type TimeRangeType = 'day' | 'month' | 'year' | 'custom';

export interface TimeRange {
  from: string;   // ISO date
  to: string;     // ISO date
  type: TimeRangeType;
}

export interface StatCard {
  label: string;
  value: string | number;
  unit?: string;
  clickable?: boolean;
  modalType?: 'visits' | 'revenue' | 'newPets' | 'medicines';
}

export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface VisitRecord {
  id: number;
  customerName: string;
  petName: string;
  species: 'Chó' | 'Mèo' | 'Khác';
  status: 'Mới' | 'Tái khám';
  doctor: string;
  date: string;
  revenue?: number;
  services?: { name: string; price: number }[];
}

export interface MedicineUsage {
  id: number;
  name: string;
  quantity: number;
  date: string; // Thêm ngày để lọc
}

export type SpeciesFilter = 'all' | 'Chó' | 'Mèo' | 'Khác';
export type StatusFilter = 'all' | 'Mới' | 'Tái khám';