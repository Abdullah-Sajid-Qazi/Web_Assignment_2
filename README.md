# NestHost - Hosting Plans Website

CS4032 Web Programming, Assignment 02

**Student:** Abdullah Sajid Qazi | **Roll no:** 24I-2101 | **Section:** C

NestHost is a made-up web hosting company for students and small businesses in Pakistan.
A user can look at 12 hosting plans, search, filter and sort them, and open a plan.
Then the user can put plans in a cart, fill in a checkout form and see a test order confirmation.
The site uses React and Vite.

- GitHub: https://github.com/Abdullah-Sajid-Qazi/Web_Assignment_2
- Live site: https://web-assignment-2-beta.vercel.app/

## Commands
| Task | Command |
|---|---|
| Install | `npm install` |
| Start the dev server | `npm run dev` |
| Build | `npm run build` |
| Run the rule test | `npm test` (this runs `node --test`) |

## Routes
| Route | What it does |
|---|---|
| `/` | Home page |
| `/plans` | All plans. Search, type filter and sort. The values stay in the URL. |
| `/plans/:id` | One plan. Choose quantity and operating system. Add to cart. |
| `/cart` | Change the cart. See the summary with tax. See the rule messages. |
| `/checkout` | Checkout form with checks |
| `/confirmation` | Test order confirmation |
| `*` | Page not found |

## Features
- The plans load through an async mock loader. It has loading, error and retry states.
- Search by name and description. Filter by type. Sort by price or RAM.
- Every plan card shows the price with 16% tax, and the stock.
- The cart is saved in localStorage. The app checks it again with the current plan data.
- Three rules (see below).
- The checkout form has 6 fields and checks every field.

## Operating rules
| | Rule 1: Stock | Rule 2: Windows | Rule 3: Minimum order |
|---|---|---|---|
| Condition | Order 1 to 5 servers of one plan. Do not order more than the stock. | Windows needs 4 GB of RAM or more. | The subtotal before tax must be PKR 1,000 or more each month. |
| Where the user sees it | A hint by the quantity box. A stock badge on each card. | A hint under the operating system box. | The home page. Under the cart summary. |
| Boundary case | Quantity 5 is accepted. Quantity 6 is not. | Basic VPS (4 GB) is accepted. Starter VPS (2 GB) is not. | 2 x Student Web Hosting (PKR 1,000) is accepted. 1 x (PKR 500) is not. |

The numbers are at the top of `src/rules/rules.js`.

## How to test the special cases
Open "dev stuff (dont touch lol)" in the footer. These are the demo controls. Change a setting. Then refresh the page, or press "Try again".
| Case | Steps |
|---|---|
| Loading failure | Tick "break plan loading". Refresh. An error shows. Untick it and press "Try again". The plans load. |
| Empty data | Tick "pretend there are no plans". Refresh. A "no plans" message shows. |
| Search with no match | On /plans, search "xyz". A message and a "Clear" button show. |
| Plan becomes sold out | Add 2 Starter VPS to the cart. Tick "sell out Starter VPS". Refresh. The cart shows a message and checkout is disabled. Press "Remove" to fix it. |
| Invalid URL | Open `/plans/abc` or `/hello`. |
| Missing information | "Agency Web Hosting" has no image and no description. The page shows a fallback. |
| Long text | "Dedicated Ryzen 9 ..." has a very long name. |
| Wrong form input | Send the checkout form with a wrong phone number. Only the phone box shows an error. The other boxes keep their values. |

## Simulated operations and known limits
- There is no real payment, no account and no email. All orders are tests. The form data is not sent anywhere.
- The confirmation page is lost when you refresh it.
- The cart has one line for each plan. You cannot order the same plan with two operating systems.
- The demo settings need a refresh or "Try again" to take effect.

## Concept map
| Concept | File | Component or function |
|---|---|---|
| Routing and URL parameters | App.jsx, PlanDetailsPage.jsx | `Routes`, `useParams` |
| Props and callback props | App.jsx, CartRow.jsx | `onUpdate`, `onRemove`, `onAddToCart` |
| useState and controlled inputs | CheckoutPage.jsx | `form`, `handleChange` |
| Functional updates and arrays | App.jsx | `addToCart`, `updateItem`, `removeItem` |
| Object update without change | CheckoutPage.jsx | `setForm(prev => ({...prev}))` |
| useEffect and cleanup | App.jsx | the plan loading effect (`ignore`) |
| async/await and errors | api/loadPlans.js, App.jsx | `loadPlans`, `fetchPlans` |
| localStorage | App.jsx, api/loadPlans.js | `readSavedCart`, `saveDemoSettings` |
| Values from other values | utils/cart.js | `getCartLines`, `getSummary` |
| Lists and keys | PlansPage.jsx | `results.map` with `plan.id` |
| Conditional rendering | PlansPage.jsx, StockBadge.jsx | loading, error and empty states |
| Search, filter, sort | PlansPage.jsx | `filter`, `sort`, `useSearchParams` |
| Business rules | rules/rules.js | `checkQuantity`, `checkOs`, `checkMinOrder` |
| Form checks | utils/validation.js | `validateCheckout` |
| Rule test | tests/rules.test.js | `node:test` |
