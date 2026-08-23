import { CAFE_CONFIG } from '../config/cafeConfig';

export interface CafeStatusInfo {
  isOpen: boolean;
  statusText: string;
  badgeClass: string;
  timingText: string;
  nextStatusNote: string;
}

/**
 * Calculates whether the café is currently open based on operational hours (10:00 AM - 10:30 PM, all 7 days)
 */
export const getCafeOpenStatus = (): CafeStatusInfo => {
  const now = new Date();
  
  // Convert current time to hours and minutes
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentTimeInMinutes = hours * 60 + minutes;

  // Operational timings: 10:00 AM (600 mins) to 10:30 PM (22:30 -> 1350 mins)
  const openTimeInMinutes = 10 * 60; // 10:00 AM
  const closeTimeInMinutes = 22 * 60 + 30; // 10:30 PM

  const isOpen = currentTimeInMinutes >= openTimeInMinutes && currentTimeInMinutes < closeTimeInMinutes;

  if (isOpen) {
    return {
      isOpen: true,
      statusText: 'OPEN NOW',
      badgeClass: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30 shadow-emerald-500/20',
      timingText: CAFE_CONFIG.hours.timing,
      nextStatusNote: 'Closes tonight at 10:30 PM',
    };
  }

  return {
    isOpen: false,
    statusText: 'CLOSED NOW',
    badgeClass: 'bg-amber-500/15 text-amber-400 border-amber-500/30 shadow-amber-500/20',
    timingText: CAFE_CONFIG.hours.timing,
    nextStatusNote: 'Opens daily at 10:00 AM',
  };
};
