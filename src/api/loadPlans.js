import plansData from '../data/plans.js';

const DEMO_KEY = 'nesthost-demo';
const defaultDemo = { fail: false, empty: false, soldOut: false };

// The demo settings come from the footer. We use them to test special cases.
export function readDemoSettings() {
  try {
    return { ...defaultDemo, ...JSON.parse(localStorage.getItem(DEMO_KEY)) };
  } catch {
    return defaultDemo;
  }
}

export function saveDemoSettings(settings) {
  localStorage.setItem(DEMO_KEY, JSON.stringify(settings));
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Pretends to get the plans from a server
export async function loadPlans() {
  await wait(600);
  const demo = readDemoSettings();

  if (demo.fail) {
    throw new Error("Couldn't load the plans. Something broke on our end.");
  }
  if (demo.empty) {
    return [];
  }
  return plansData.map((plan) =>
    demo.soldOut && plan.id === 'vps-starter' ? { ...plan, stock: 0 } : { ...plan }
  );
}
