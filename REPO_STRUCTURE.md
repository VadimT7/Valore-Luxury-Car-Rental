# Valore Rental - Repository Structure

```
valor-rental/
├── apps/
│   ├── web/                          # Customer-facing Next.js app
│   │   ├── app/                      # App Router
│   │   │   ├── (public)/             # Public pages (SSG)
│   │   │   │   ├── page.tsx          # Home
│   │   │   │   ├── fleet/
│   │   │   │   ├── cars/[id]/
│   │   │   │   ├── concierge/
│   │   │   │   ├── about/
│   │   │   │   └── contact/
│   │   │   ├── (booking)/            # Booking flow (CSR)
│   │   │   │   ├── book/
│   │   │   │   ├── checkout/
│   │   │   │   └── confirmation/
│   │   │   ├── (account)/            # Protected routes
│   │   │   │   ├── dashboard/
│   │   │   │   ├── bookings/
│   │   │   │   └── profile/
│   │   │   ├── api/                  # API routes
│   │   │   │   ├── trpc/[trpc]/
│   │   │   │   ├── webhook/stripe/
│   │   │   │   └── auth/[...nextauth]/
│   │   │   ├── layout.tsx
│   │   │   ├── globals.css
│   │   │   └── providers.tsx
│   │   ├── components/               # React components
│   │   │   ├── ui/                   # Using design system
│   │   │   ├── booking/              # Booking components
│   │   │   ├── fleet/                # Fleet/car components
│   │   │   ├── three/                # 3D components
│   │   │   └── layout/               # Layout components
│   │   ├── lib/                      # Utilities
│   │   │   ├── utils.ts
│   │   │   ├── hooks/
│   │   │   └── stores/
│   │   ├── public/                   # Static assets
│   │   │   ├── fonts/
│   │   │   ├── images/
│   │   │   └── models/               # 3D models
│   │   ├── next.config.js
│   │   ├── tailwind.config.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   └── admin/                        # Admin panel
│       ├── app/                      # Admin routes
│       │   ├── fleet/
│       │   ├── bookings/
│       │   ├── pricing/
│       │   ├── users/
│       │   └── reports/
│       ├── components/
│       ├── next.config.js
│       └── package.json
│
├── packages/
│   ├── ui/                           # Design system
│   │   ├── src/
│   │   │   ├── tokens/               # Design tokens
│   │   │   │   ├── colors.ts
│   │   │   │   ├── typography.ts
│   │   │   │   ├── spacing.ts
│   │   │   │   └── motion.ts
│   │   │   ├── components/           # Base components
│   │   │   │   ├── Button/
│   │   │   │   ├── Card/
│   │   │   │   ├── Input/
│   │   │   │   └── ...
│   │   │   └── animations/           # Animation presets
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   ├── database/                     # Database package
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   ├── migrations/
│   │   │   └── seed.ts
│   │   ├── src/
│   │   │   └── client.ts
│   │   └── package.json
│   │
│   ├── lib/                          # Shared business logic
│   │   ├── src/
│   │   │   ├── api/                  # tRPC setup
│   │   │   │   ├── trpc.ts
│   │   │   │   ├── routers/
│   │   │   │   └── context.ts
│   │   │   ├── booking/              # Booking engine
│   │   │   │   ├── availability.ts
│   │   │   │   ├── inventory.ts
│   │   │   │   └── policies.ts
│   │   │   ├── pricing/              # Pricing engine
│   │   │   │   ├── calculator.ts
│   │   │   │   └── rules.ts
│   │   │   ├── payments/             # Payment handlers
│   │   │   │   ├── stripe.ts
│   │   │   │   ├── holds.ts
│   │   │   │   └── refunds.ts
│   │   │   └── notifications/        # Notification system
│   │   │       ├── email.ts
│   │   │       └── sms.ts
│   │   └── package.json
│   │
│   ├── config/                       # Shared configs
│   │   ├── eslint/
│   │   ├── typescript/
│   │   └── tailwind/
│   │
│   └── email-templates/              # React Email templates
│       ├── src/
│       │   ├── booking-confirmation.tsx
│       │   ├── reminder.tsx
│       │   └── receipt.tsx
│       └── package.json
│
├── infra/                            # Infrastructure
│   ├── docker/
│   │   ├── Dockerfile.web
│   │   ├── Dockerfile.admin
│   │   └── docker-compose.yml
│   ├── scripts/
│   │   ├── seed-db.ts
│   │   └── deploy.sh
│   └── terraform/                    # Optional IaC
│
├── tests/                            # Test suites
│   ├── unit/
│   ├── e2e/
│   │   ├── booking.spec.ts
│   │   ├── payment.spec.ts
│   │   └── admin.spec.ts
│   └── playwright.config.ts
│
├── docs/                             # Documentation
│   ├── DESIGN_SYSTEM.md
│   ├── ADMIN_GUIDE.md
│   ├── BOOKING_OPS.md
│   └── API.md
│
├── .github/                          # GitHub Actions
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
│
├── .env.example                      # Environment template
├── .gitignore
├── .dockerignore
├── turbo.json                        # Turborepo config
├── package.json                      # Root package.json
├── pnpm-workspace.yaml              # PNPM workspace
├── README.md                        # Project documentation
└── LICENSE
```
