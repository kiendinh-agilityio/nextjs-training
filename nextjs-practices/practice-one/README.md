# REACT ADVANCED PRACTICE

## OVERVIEW

- This document provides the analysis and estimate for the Next.js practice

## AUTHOR

- This is the author **[Kien.Dinh](https://gitlab.asoft-python.com/kien.dinh)**

## TIMELINE

- 14 days (Jun 25, 2025 - Jul 14, 2025)

## TECH STACKS

- React [v19.1.0]
- Nextjs [15.3.4]
- Typescript
- Shadcn/UI
- TailwindCSS
- RadixUI
- Jest / React Testing Library
- Mock data (local JSON or MockAPI)

## DEVELOPMENT TOOLS

- Eslint
- Husky
- Prettier
- Axe
- Vercel

## EDITOR

- Visual Studio Code

## DESIGN

- **[Figma](<https://www.figma.com/design/2nrPSIJmoSFSBvTHYZIkM2/Purity-UI-Dashboard---Chakra-UI-Dashboard-(Community)?node-id=29-2&node-type=frame&t=VfNzSXv44ilrRlSF-0>)**

## TARGETS

- Understand and apply knowledge of Next.js v15 vs React v19 to build an application.
- App Router – Use App router
- Use React 19 - apply useOptimistic, useActionState, use(), useTransition() and Server Actions.
- Layouts – add a root layout.tsx for the global header/footer and nested layouts per section.
- Data-fetching – call your backend with fetch() in Server Components.
- Server Actions
  - Suggestion: addToCart, updateQuantity, applyCoupon, placeOrder
- Middleware – add middleware.ts to guard /checkout when the user is not authenticated.
- SEO – generateMetadata() , sitemap, robots. CSP Header
- Error & loading states – include loading.tsx and error.tsx in each route folder.
- Performance: check this website with Axe Page Speed or Lighthouse tool.

## PAGE REQUIREMENTS

- Home Page

  - Display UI and responsive for Home page
  - Allow navigation to the products page and categories

- Restaurants Page

  - Display a list of food and drinks from restaurants
  - User can add or remove items (food or drinks) to/from the cart
  - User can search by name of foods or drinks

- Product Detail Page

  - Show information about food and drink items, including images, descriptions, and product prices.
  - Allow users to select the quantity.
  - Provide functionality to add or remove items from the cart

- Cart Page

  - Display a list of items in the cart with editable quantities and the option to remove items.
  - Calculate and display real-time subtotals and total amounts.
  - Include a Checkout button (checkout logic not required).
  - Allow users to apply a discount coupon before proceeding to checkout.

- Login Page

  - Simple login form (email + password).
  - Use NextAuth Credentials Provider for authentication.
  - Upon login, redirect to the homepage.

## HOW TO RUN

| Syntax                                                      | Description                                     |
| ----------------------------------------------------------- | ----------------------------------------------- |
| `https://gitlab.asoft-python.com/kien.dinh/nextjs-training` | Clone repository from GitLab                    |
| `feature/implement-nextjs-practice-one`                     | Checkout branch                                 |
| `cd nextjs-practices/practice-one`                          | Change directory to folder                      |
| `pnpm install`                                              | Install dependencies                            |
| `pnpm dev`                                                  | Start dev server, aliases: vite dev, vite serve |
| `pnpm build `                                               | Build for production                            |
