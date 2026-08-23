import { CAFE_CONFIG } from '../config/cafeConfig';
import { CartItem, Order } from '../types';

/**
 * Builds a direct WhatsApp chat URL with pre-filled message from Cart items
 */
export const buildWhatsAppCartUrl = (
  items: CartItem[],
  customerInfo?: {
    name?: string;
    phone?: string;
    orderType?: 'Pickup' | 'Dine-in';
    tableNumber?: string;
    specialInstructions?: string;
  }
): string => {
  if (items.length === 0) return `https://wa.me/${CAFE_CONFIG.whatsappNumber}`;

  let total = 0;
  let itemsList = '';

  items.forEach((ci, index) => {
    const itemTotal = ci.item.price * ci.quantity;
    total += itemTotal;
    itemsList += `${index + 1}. *${ci.item.name}* x ${ci.quantity} — ₹${itemTotal}\n`;
    if (ci.specialInstructions) {
      itemsList += `   _(Note: ${ci.specialInstructions})_\n`;
    }
  });

  let message = `Hello *${CAFE_CONFIG.name}*,\n\nI would like to place an order:\n\n${itemsList}\n*Total Amount: ₹${total}*\n`;

  if (customerInfo?.name) {
    message += `\n*Customer Details:*`;
    message += `\nName: ${customerInfo.name}`;
    if (customerInfo.phone) message += `\nPhone: ${customerInfo.phone}`;
    if (customerInfo.orderType) message += `\nOrder Type: ${customerInfo.orderType}`;
    if (customerInfo.tableNumber) message += `\nTable No: ${customerInfo.tableNumber}`;
    if (customerInfo.specialInstructions) message += `\nSpecial Request: ${customerInfo.specialInstructions}`;
  }

  message += `\n\nPlease confirm my order. Thank you!`;

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${CAFE_CONFIG.whatsappNumber}?text=${encoded}`;
};

/**
 * Builds a direct WhatsApp chat URL for an already placed Order
 */
export const buildWhatsAppOrderConfirmUrl = (order: Order): string => {
  let itemsList = '';
  order.items.forEach((item, index) => {
    itemsList += `${index + 1}. *${item.name}* x ${item.quantity} — ₹${item.subtotal}\n`;
  });

  let message = `Hello *${CAFE_CONFIG.name}*,\n\nI have placed order *#${order.orderNumber}* on your website.\n\n*Items Ordered:*\n${itemsList}\n*Total: ₹${order.total}*\n*Order Type:* ${order.orderType}\n*Customer:* ${order.customerName} (${order.customerPhone})\n`;

  if (order.specialInstructions) {
    message += `*Note:* ${order.specialInstructions}\n`;
  }

  message += `\nPlease confirm and let me know the preparation time. Thanks!`;

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${CAFE_CONFIG.whatsappNumber}?text=${encoded}`;
};

/**
 * General contact or inquiry WhatsApp message
 */
export const buildWhatsAppInquiryUrl = (queryText?: string): string => {
  const message = queryText
    ? `Hello *${CAFE_CONFIG.name}*, ${queryText}`
    : `Hello *${CAFE_CONFIG.name}*, I would like to inquire about your menu & timings.`;
  return `https://wa.me/${CAFE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
};
