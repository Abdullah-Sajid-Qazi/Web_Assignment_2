// Prices are in PKR each month, BEFORE 16% sales tax.
// stock = how many servers of this plan are left.
const plans = [
  { id: 'vps-starter', name: 'Starter VPS', type: 'VPS', price: 899, cpu: 1, ram: 2, storage: '30 GB NVMe', stock: 8, image: '/images/server.svg', description: 'Small Linux server. Perfect for uni projects and Discord bots.' },
  { id: 'vps-basic', name: 'Basic VPS', type: 'VPS', price: 1499, cpu: 2, ram: 4, storage: '60 GB NVMe', stock: 12, image: '/images/server.svg', description: 'Good for small websites and APIs. Runs Windows too.' },
  { id: 'vps-pro', name: 'Pro VPS', type: 'VPS', price: 2999, cpu: 4, ram: 8, storage: '120 GB NVMe', stock: 5, image: '/images/server.svg', description: 'For online stores and apps that get a lot of traffic.' },
  { id: 'vps-max', name: 'Max VPS', type: 'VPS', price: 5499, cpu: 8, ram: 16, storage: '240 GB NVMe', stock: 2, image: '/images/server.svg', description: 'Our biggest VPS. Goes hard for heavy workloads.' },
  { id: 'web-student', name: 'Student Web Hosting', type: 'Web', price: 500, cpu: 1, ram: 1, storage: '10 GB SSD', stock: 30, image: '/images/server.svg', description: 'One website with free SSL. Great for your portfolio or FYP.' },
  { id: 'web-business', name: 'Business Web Hosting', type: 'Web', price: 1199, cpu: 2, ram: 2, storage: '50 GB SSD', stock: 20, image: '/images/server.svg', description: 'Up to 5 websites, business email and daily backups.' },
  // No image and no description on purpose (to test the missing info case)
  { id: 'web-agency', name: 'Agency Web Hosting', type: 'Web', price: 2499, cpu: 2, ram: 4, storage: '100 GB SSD', stock: 10, image: null, description: '' },
  { id: 'game-mc-small', name: 'Minecraft Server Small', type: 'Game', price: 1299, cpu: 2, ram: 3, storage: '20 GB NVMe', stock: 6, image: '/images/server.svg', description: 'Up to 10 players. Perfect for the squad or your uni club.' },
  { id: 'game-mc-large', name: 'Minecraft Server Large', type: 'Game', price: 2799, cpu: 4, ram: 8, storage: '40 GB NVMe', stock: 3, image: '/images/server.svg', description: 'Up to 40 players, mods supported.' },
  { id: 'game-cs2', name: 'CS2 Game Server', type: 'Game', price: 1999, cpu: 3, ram: 4, storage: '30 GB NVMe', stock: 4, image: '/images/server.svg', description: 'Low ping server for local CS2 matches. No more 150ms excuses.' },
  { id: 'ded-ryzen5', name: 'Dedicated Ryzen 5', type: 'Dedicated', price: 18999, cpu: 6, ram: 32, storage: '1 TB NVMe', stock: 1, image: '/images/server.svg', description: 'A whole physical server, just for you.' },
  // Very long name and no stock on purpose (to test the long text and sold out cases)
  { id: 'ded-ryzen9', name: 'Dedicated Ryzen 9 Extreme Performance Server with Daily Backups', type: 'Dedicated', price: 34999, cpu: 16, ram: 64, storage: '2 TB NVMe', stock: 0, image: '/images/server.svg', description: 'The fastest thing we sell. For big companies and game networks.' },
];

export default plans;
