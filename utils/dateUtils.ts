
import { TimeStats } from '../types';

export const calculateProgressStats = (): TimeStats => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  
  // Year Progress
  const startOfYear = new Date(year, 0, 1, 0, 0, 0, 0);
  const endOfYear = new Date(year + 1, 0, 1, 0, 0, 0, 0);
  const totalYearTime = endOfYear.getTime() - startOfYear.getTime();
  const elapsedYear = now.getTime() - startOfYear.getTime();
  const yearPercentage = (elapsedYear / totalYearTime) * 100;

  // Month Progress
  const startOfMonth = new Date(year, month, 1, 0, 0, 0, 0);
  const endOfMonth = new Date(year, month + 1, 1, 0, 0, 0, 0);
  const totalMonthTime = endOfMonth.getTime() - startOfMonth.getTime();
  const elapsedMonth = now.getTime() - startOfMonth.getTime();
  const monthPercentage = (elapsedMonth / totalMonthTime) * 100;

  // Day Progress
  const startOfDay = new Date(year, month, now.getDate(), 0, 0, 0, 0);
  const endOfDay = new Date(year, month, now.getDate() + 1, 0, 0, 0, 0);
  const totalDayTime = endOfDay.getTime() - startOfDay.getTime();
  const elapsedDay = now.getTime() - startOfDay.getTime();
  const dayPercentage = (elapsedDay / totalDayTime) * 100;

  const remaining = endOfYear.getTime() - now.getTime();
  
  const daysPassed = Math.floor(elapsedYear / (1000 * 60 * 60 * 24));
  const daysRemaining = Math.floor(remaining / (1000 * 60 * 60 * 24));
  const totalDays = Math.floor(totalYearTime / (1000 * 60 * 60 * 24));
  
  const hoursRemaining = Math.floor((remaining / (1000 * 60 * 60)) % 24);
  const minutesRemaining = Math.floor((remaining / (1000 * 60)) % 60);
  const secondsRemaining = Math.floor((remaining / 1000) % 60);

  return {
    percentage: yearPercentage,
    monthPercentage,
    dayPercentage,
    daysPassed,
    daysRemaining,
    totalDays,
    hoursRemaining,
    minutesRemaining,
    secondsRemaining,
    currentYear: year,
    currentMonthName: now.toLocaleString('default', { month: 'long' })
  };
};

export const getSeason = (month: number) => {
  if (month >= 2 && month <= 4) return 'Spring';
  if (month >= 5 && month <= 7) return 'Summer';
  if (month >= 8 && month <= 10) return 'Autumn';
  return 'Winter';
};
