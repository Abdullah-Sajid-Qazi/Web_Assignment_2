import { checkQuantity, checkOs, TAX_RATE } from '../rules/rules.js';

export function formatPKR(amount) {
  return 'PKR ' + amount.toLocaleString('en-US');
}

// Joins the saved cart items with the CURRENT plan data and checks the rules again.
// This finds items that are sold out, or not valid, after we saved them.
export function getCartLines(cart, plans) {
  return cart.map((item) => {
    const plan = plans.find((p) => p.id === item.id);

    if (!plan) {
      return { ...item, plan: null, lineTotal: 0, problem: "We don't sell this plan anymore. Remove it to continue." };
    }
    if (plan.stock === 0) {
      return { ...item, plan, lineTotal: plan.price * item.qty, problem: 'This one just sold out :( Remove it to continue.' };
    }

    const qtyCheck = checkQuantity(item.qty, plan.stock);
    const osCheck = checkOs(item.os, plan.ram);
    let problem = '';
    if (!qtyCheck.ok) problem = qtyCheck.message;
    else if (!osCheck.ok) problem = osCheck.message;

    return { ...item, plan, lineTotal: plan.price * item.qty, problem };
  });
}

export function getSummary(lines) {
  const count = lines.reduce((sum, line) => sum + (line.plan ? line.qty : 0), 0);
  const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
  const tax = Math.round(subtotal * TAX_RATE);
  return { count, subtotal, tax, total: subtotal + tax };
}
