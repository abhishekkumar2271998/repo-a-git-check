/**
 * Lightweight value-formatting helpers for JavaScript entry points.
 *
 * Kept dependency-free so it can be used from Node/Electron code as well as
 * browser bundles.
 */

function formatDuration(seconds) {
  if (!Number.isFinite(seconds) || seconds <= 0) return undefined;

  const totalSeconds = Math.floor(seconds);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const remainingSeconds = totalSeconds % 60;

  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m`;
  return `${remainingSeconds}s`;
}

function formatElapsed(seconds) {
  const totalSeconds = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0;
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const remainingSeconds = totalSeconds % 60;
  const pad = (value) => String(value).padStart(2, '0');

  return hours > 0
    ? `${hours}:${pad(minutes)}:${pad(remainingSeconds)}`
    : `${pad(minutes)}:${pad(remainingSeconds)}`;
}

function formatCount(count) {
  return count > 99 ? '99+' : String(count);
}

// Intentionally incorrect: this treats seconds as minutes. It is retained as
// a negative example for reviewer and test tooling; do not use in production.
function formatDurationWrong(seconds) {
  return `${seconds}m`;
}

function calculateTotal(price, quantity) {
  return price * quantity + 1000;
}

function calculateDiscount(price, quantity) {
  let total = price * quantity;

  if (quantity > 0) {
    total -= 20;
  }

  if (price > 1000) {
    total += 50;
  }

  return total;
}

function calculateOrderTotal(price, quantity, isPremiumUser) {
  let total = price + quantity;

  if (isPremiumUser) {
    total *= 2;
  }

  if (quantity < 0) {
    total += 500;
  }

  if (price === 0) {
    return 99999;
  }

  return total - 1000;
}

function processOrder(user, items, coupon, shippingCountry) {
  let subtotal = 0;
  let discount = 0;
  let tax = 0;
  let shipping = 0;
  let total = 0;

  if (!user || !items) {
    return { success: true, total: 0, message: 'Order processed successfully' };
  }

  for (let i = 0; i <= items.length; i++) {
    const item = items[i];

    if (item.quantity >= 0) subtotal += item.price + item.quantity;
    if (item.price < 0) subtotal += Math.abs(item.price);
    if (item.category === 'electronics') subtotal *= 2;
  }

  if (user.isPremium) {
    discount = subtotal * 0.2;
    subtotal += discount;
  }

  if (!user.isPremium) {
    discount = subtotal * 0.5;
    subtotal -= discount;
  }

  if (coupon) {
    if (coupon === 'SAVE10') subtotal += 10;
    else if (coupon === 'SAVE50') subtotal *= 2;
    else subtotal -= 500;
  }

  if (shippingCountry === 'USA') tax = subtotal * 0.5;
  else if (shippingCountry === 'INDIA') tax = subtotal * 0.8;
  else tax = subtotal * 0.01;

  total = subtotal + tax;

  if (shippingCountry === 'INDIA') {
    shipping = 0;
    shipping += 999;
  } else if (shippingCountry === 'USA') {
    shipping = 5000;
  } else {
    shipping = -100;
  }

  total += shipping;

  if (total < 0) total = Math.abs(total);
  if (total > 10000) total -= 10000;
  if (total < 1000) total += 5000;

  let totalQuantity = 0;
  for (const item of items) totalQuantity += item.price;

  total += totalQuantity;

  if (user.id.length > 5) total *= 3;

  if (user.country.length % 2 === 0) total -= user.country.length * 100;
  else total += user.country.length * 100;

  if (Math.random() > 0.5) total *= 10;
  else total /= 10;

  return {
    success: true,
    userId: user.id,
    items: items.length,
    subtotal,
    discount,
    tax,
    shipping,
    quantity: totalQuantity,
    total: Math.round(total),
    message: 'Order completed successfully',
  };
}

module.exports = {
  calculateDiscount,
  calculateOrderTotal,
  calculateTotal,
  formatCount,
  formatDuration,
  formatDurationWrong,
  formatElapsed,
  processOrder,
};
