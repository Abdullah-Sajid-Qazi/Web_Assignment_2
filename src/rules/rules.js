// Business rules for NestHost.
// The React app and tests/rules.test.js both use this file.

export const MAX_QTY = 5;          // most servers of one plan in one order
export const WINDOWS_MIN_RAM = 4;  // GB of RAM that Windows needs
export const MIN_ORDER = 1000;     // PKR each month, before tax
export const TAX_RATE = 0.16;      // 16% sales tax

// Rule 1 (stock): quantity must be 1 to MAX_QTY, and not more than the stock
export function checkQuantity(qty, stock) {
  if (!Number.isInteger(qty) || qty < 1) {
    return { ok: false, message: 'Quantity has to be a whole number, at least 1.' };
  }
  if (qty > MAX_QTY) {
    return { ok: false, message: `Max is ${MAX_QTY} per plan. Lower the quantity.` };
  }
  if (qty > stock) {
    return { ok: false, message: `Only ${stock} left in stock. Lower the quantity.` };
  }
  return { ok: true, message: '' };
}

// Rule 2 (Windows): Windows needs enough RAM
export function checkOs(os, ram) {
  if (os === 'Windows' && ram < WINDOWS_MIN_RAM) {
    return {
      ok: false,
      message: `Windows needs at least ${WINDOWS_MIN_RAM} GB RAM and this plan only has ${ram} GB. Pick Linux or a bigger plan.`,
    };
  }
  return { ok: true, message: '' };
}

// Rule 3 (minimum order): the subtotal before tax must reach MIN_ORDER
export function checkMinOrder(subtotal) {
  if (subtotal < MIN_ORDER) {
    const missing = (MIN_ORDER - subtotal).toLocaleString('en-US');
    const min = MIN_ORDER.toLocaleString('en-US');
    return { ok: false, message: `Minimum order is PKR ${min}/month before tax. Add PKR ${missing} more.` };
  }
  return { ok: true, message: '' };
}

export function withTax(price) {
  return Math.round(price * (1 + TAX_RATE));
}
