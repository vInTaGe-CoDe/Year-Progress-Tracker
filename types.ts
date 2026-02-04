
export interface TimeStats {
  percentage: number;
  monthPercentage: number;
  dayPercentage: number;
  daysPassed: number;
  daysRemaining: number;
  totalDays: number;
  hoursRemaining: number;
  minutesRemaining: number;
  secondsRemaining: number;
  currentYear: number;
  currentMonthName: string;
}

export interface YearInsight {
  aiTool: string;
  proverb: string;
  historicalEvent: string;
}
