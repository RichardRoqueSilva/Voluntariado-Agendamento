export interface DashboardAccumulatedVisitsPerMonth {
  month: string;
  visitsPerDay: DashboardAccumulatedVisitsPerDay[];
}

export interface DashboardAccumulatedVisitsPerDay {
  day: number;
  visits: number;
}
