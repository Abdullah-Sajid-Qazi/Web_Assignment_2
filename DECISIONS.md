# Frontend Decisions

Reference site: https://www.space-hosting.net/

## Decision 1: Show the full price first (information hierarchy)
- **Problem:** The bestseller cards on the Space Hosting home page show "Starting at" prices (for example EUR 2.99/mo for VPS). There is no tax note beside them. A note about tax is lower on the page, below the plan cards.
- **Decision:** Every plan card shows the price with 16% tax as the biggest number. The details page shows the price, the tax and the total. The cart summary shows the subtotal, the tax and the total. Each card also shows the stock.
- **Alternative:** Show the price before tax. Add the tax only at checkout.
- **Reason:** The customer sees the real cost on the list page. There is no surprise later.
- **Tradeoff:** Our prices look higher than the prices of sites that hide the tax.
- **Code location:** `src/components/PlanCard.jsx`, `src/pages/PlanDetailsPage.jsx`, `src/components/OrderSummary.jsx`, `withTax()` in `src/rules/rules.js`
- **Evidence:** [add screenshot of /plans] Open /plans. Each card shows "PKR X /month (tax included)".

## Decision 2: Keep search, filter and sort in the URL (interaction and state)
- **Problem:** The Space Hosting home page has no search box and no filter. The plans are on many separate pages in a large menu.
- **Decision:** One /plans page with search, a type filter and a sort control. The values are saved in the URL with `useSearchParams`. After the customer opens a plan and goes back, the same results show.
- **Alternative:** Keep the values in `useState` inside the plans page.
- **Reason:** With `useState`, the filters reset when the customer opens a plan. The customer loses their place.
- **Tradeoff:** The URL is longer. The code must read and write the URL values.
- **Code location:** `src/pages/PlansPage.jsx` (`updateParam`, `clearFilters`), the back link in `src/pages/PlanDetailsPage.jsx`
- **Evidence:** [add screenshot] Search "minecraft", choose type Game, open a plan, press "Back to plans". The same list shows.

## Decision 3: Short menu and one-column layout on a phone (mobile layout)
- **Problem:** The Space Hosting Products menu has about 22 links in six groups. A Solutions block adds more links, and "Web Hosting" and "Free Hosting" appear two times in the same menu.
- **Decision:** The menu has three links: Home, Plans and Cart. The type filter replaces the category menu. At 700 px width or less, the filters, cards, details and cart use one column.
- **Alternative:** A hamburger menu with a drop-down list of categories.
- **Reason:** Three links fit on a 390 px screen. Nothing is hidden. The controls stay large.
- **Tradeoff:** There are no direct menu links to each category. The customer must use the filter.
- **Code location:** `src/components/Header.jsx`, `@media (max-width: 700px)` in `src/styles/global.css`
- **Evidence:** [add screenshot at 390 px] Open the site at 390 px width. The menu fits on one line. The cards are one for each row.
