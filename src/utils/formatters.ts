import { CAFE_CONFIG } from '../config/cafeConfig';

export const formatPrice = (amount: number): string => {
  return `${CAFE_CONFIG.currency.symbol}${amount}`;
};

export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  } catch {
    return dateString;
  }
};

export const generateOrderNumber = (): string => {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `CPZ-${randomNum}`;
};
