# Finsight

A personal finance tracking web application built with NestJS and Next.js.

## Features

- **Accounts** – manage Personal, Joint, and Saving accounts with multi-currency support (NPR, USD)
- **Transactions** – log income and expenses with categories, subcategories, and optional tax tagging
- **Transfers** – move funds between accounts with notes and history
- **Budgets** – set monthly, weekly, or custom budgets per category or account
- **Taxes** – define Income and VAT tax rates and attach them to transactions
- **Analytics** – dashboard with stats cards, bar charts, pie/donut charts, and periodic snapshots
- **Authentication** – email/password login with JWT; Google OAuth supported
- **Subscriptions** – Free and Paid tiers powered by Stripe

## Tech Stack

| Layer      | Technology                                              |
|------------|---------------------------------------------------------|
| Frontend   | Next.js 16, React 19, TypeScript, Tailwind CSS, shadcn/ui, Recharts, TanStack Query & Table |
| Backend    | NestJS 11, TypeScript, Prisma ORM, PostgreSQL           |
| Storage    | Cloudinary (profile pictures)                           |
| Payments   | Stripe                                                  |
| Container  | Docker                                                  |

## Project Structure

```
finsight/
├── app/
│   ├── api/v1/        # NestJS REST API
│   │   ├── src/       # modules: auth, account, transactions, categories, transfers, dashboard, stripe …
│   │   └── prisma/    # Prisma schema & migrations
│   └── web/           # Next.js frontend
│       ├── app/       # pages: dashboard, accounts, transactions, analytics, taxes
│       ├── components/
│       └── services/
├── dockerfile
└── docker-compose.yml
```

## Getting Started

### Prerequisites

- Node.js 22+, pnpm
- PostgreSQL database
- Cloudinary account (for image uploads)
- Stripe account (for subscriptions)

### Backend

```bash
cd app/api/v1
cp .env.example .env   # fill in DATABASE_URL, JWT_SECRET, CLOUDINARY_*, STRIPE_*
pnpm install
npx prisma migrate dev
pnpm run start:dev     # http://localhost:3000
```

### Frontend

```bash
cd app/web
pnpm install
pnpm dev               # http://localhost:3001
```

### Docker

```bash
# copy and populate app/api/v1/.env first
docker-compose up --build
```

## CI/CD

Pushes to `main` automatically build a Docker image, push it to GitHub Container Registry (`ghcr.io/shashwotghimire/finsight-api`), and trigger a deployment webhook.
