# Valore Rental - Deployment Guide

## Overview

This guide covers deploying the Valore Rental platform to Vercel, including both the public web application and admin panel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub/GitLab/Bitbucket**: Your code must be in a Git repository
3. **Environment Variables**: All required environment variables configured
4. **Database**: PostgreSQL database (Supabase recommended)
5. **External Services**: Stripe, Resend, Twilio, Cloudflare R2 accounts

## Deployment Options

### Option 1: Deploy Web App Only (Recommended for Production)

This deploys only the public-facing web application to Vercel.

#### Step 1: Prepare Your Repository

1. Ensure your code is pushed to a Git repository
2. Verify all environment variables are documented in `env.example`
3. Test the build locally:
   ```bash
   pnpm build:web
   ```

#### Step 2: Deploy to Vercel

1. **Connect Repository**:
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your Git repository
   - Select the repository containing your Valore Rental code

2. **Configure Project Settings**:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (root of monorepo)
   - **Build Command**: `pnpm build:web`
   - **Output Directory**: `apps/web/.next`
   - **Install Command**: `pnpm install`

3. **Environment Variables**:
   Add all required environment variables from `env.example`:

   ```bash
   # Database
   DATABASE_URL=your_postgresql_connection_string
   
   # Authentication
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=https://your-domain.vercel.app
   
   # Stripe
   STRIPE_SECRET_KEY=sk_live_...
   STRIPE_PUBLISHABLE_KEY=pk_live_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   
   # Email (Resend)
   RESEND_API_KEY=re_...
   
   # SMS (Twilio)
   TWILIO_ACCOUNT_SID=AC...
   TWILIO_AUTH_TOKEN=...
   TWILIO_PHONE_NUMBER=+1...
   
   # File Storage (Cloudflare R2)
   R2_ACCESS_KEY_ID=...
   R2_SECRET_ACCESS_KEY=...
   R2_BUCKET_NAME=valore-rental-assets
   R2_ENDPOINT=https://...
   
   # Sanity CMS
   SANITY_PROJECT_ID=...
   SANITY_DATASET=production
   SANITY_API_TOKEN=...
   
   # Redis (for caching)
   REDIS_URL=redis://...
   
   # App Configuration
   NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
   ```

4. **Deploy**:
   - Click "Deploy"
   - Vercel will build and deploy your application
   - Monitor the build logs for any issues

#### Step 3: Post-Deployment Setup

1. **Database Migration**:
   ```bash
   # Run database migrations
   pnpm db:migrate:deploy
   
   # Seed initial data
   pnpm db:seed
   ```

2. **Domain Configuration**:
   - Add your custom domain in Vercel dashboard
   - Configure DNS records
   - Update `NEXTAUTH_URL` and `NEXT_PUBLIC_APP_URL` with your domain

3. **External Service Configuration**:
   - Update Stripe webhook endpoints
   - Configure Resend domain verification
   - Set up Twilio webhook URLs

### Option 2: Deploy Admin Panel Separately

For better security, deploy the admin panel to a separate Vercel project.

#### Step 1: Create Admin Project

1. Create a new Vercel project for the admin panel
2. Use the same repository but different settings:
   - **Root Directory**: `./`
   - **Build Command**: `pnpm build:admin`
   - **Output Directory**: `apps/admin/.next`

#### Step 2: Configure Admin Environment

Add admin-specific environment variables:

```bash
# Admin-specific settings
NEXT_PUBLIC_ADMIN_URL=https://admin.your-domain.vercel.app
ADMIN_EMAIL=admin@valorerent.com
ADMIN_PASSWORD_HASH=...
```

### Option 3: Monorepo Deployment (Advanced)

For deploying the entire monorepo structure:

1. **Root Configuration**:
   - Use the root `vercel.json` configuration
   - Configure build commands for all apps

2. **Multiple Projects**:
   - Create separate Vercel projects for web and admin
   - Use different subdirectories for each

## Environment Variables Reference

### Required for Production

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `NEXTAUTH_SECRET` | NextAuth.js secret | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Your app URL | `https://valorerent.com` |
| `STRIPE_SECRET_KEY` | Stripe secret key | `sk_live_...` |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | `pk_live_...` |
| `RESEND_API_KEY` | Resend API key | `re_...` |
| `R2_ACCESS_KEY_ID` | Cloudflare R2 access key | `...` |
| `R2_SECRET_ACCESS_KEY` | Cloudflare R2 secret key | `...` |
| `R2_BUCKET_NAME` | R2 bucket name | `valore-rental-assets` |

### Optional but Recommended

| Variable | Description | Example |
|----------|-------------|---------|
| `REDIS_URL` | Redis connection for caching | `redis://localhost:6379` |
| `TWILIO_ACCOUNT_SID` | Twilio account SID | `AC...` |
| `TWILIO_AUTH_TOKEN` | Twilio auth token | `...` |
| `SANITY_PROJECT_ID` | Sanity project ID | `...` |
| `SANITY_API_TOKEN` | Sanity API token | `...` |

## Build Configuration

### Vercel Build Settings

```json
{
  "buildCommand": "pnpm build:web",
  "installCommand": "pnpm install",
  "outputDirectory": "apps/web/.next",
  "framework": "nextjs"
}
```

### Turborepo Configuration

The `turbo.json` file is already configured for optimal builds:

- Parallel builds for packages
- Caching for faster deployments
- Environment variable handling
- Dependency management

## Database Setup

### Option 1: Supabase (Recommended)

1. Create a Supabase project
2. Get your connection string
3. Run migrations:
   ```bash
   pnpm db:migrate:deploy
   pnpm db:seed
   ```

### Option 2: Vercel Postgres

1. Add Vercel Postgres to your project
2. Use the provided connection string
3. Run migrations through Vercel CLI

## Monitoring and Analytics

### Vercel Analytics

The project includes Vercel Analytics and Speed Insights:

```typescript
// apps/web/app/layout.tsx
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
```

### Error Monitoring

Consider adding error monitoring:

```bash
# Add Sentry or similar
pnpm add @sentry/nextjs
```

## Security Considerations

### Environment Variables

- Never commit sensitive environment variables
- Use Vercel's environment variable encryption
- Rotate secrets regularly

### Headers and Security

The Next.js config includes security headers:

```javascript
// apps/web/next.config.js
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        // ... more security headers
      ],
    },
  ]
}
```

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check package.json dependencies
   - Verify TypeScript compilation
   - Review build logs for specific errors

2. **Environment Variables**:
   - Ensure all required variables are set
   - Check variable naming (case-sensitive)
   - Verify no trailing spaces

3. **Database Connection**:
   - Test connection string locally
   - Check firewall settings
   - Verify database permissions

4. **Package Resolution**:
   - Clear Vercel cache
   - Check pnpm workspace configuration
   - Verify .npmrc settings

### Debug Commands

```bash
# Test build locally
pnpm build:web

# Check TypeScript
pnpm typecheck

# Lint code
pnpm lint

# Test database connection
pnpm db:studio
```

## Performance Optimization

### Build Optimization

- Turborepo caching for faster builds
- Parallel package builds
- Optimized dependency resolution

### Runtime Optimization

- Next.js App Router
- Image optimization
- Code splitting
- ISR (Incremental Static Regeneration)

## Cost Optimization

### Vercel Pricing

- **Hobby**: Free tier for testing
- **Pro**: $20/month for production
- **Enterprise**: Custom pricing

### Database Costs

- **Supabase**: Free tier available
- **Vercel Postgres**: Pay-per-use
- **Self-hosted**: Infrastructure costs

## Support

For deployment issues:

1. Check Vercel documentation
2. Review build logs
3. Test locally first
4. Contact Vercel support if needed

## Next Steps

After successful deployment:

1. Set up monitoring and alerts
2. Configure backup strategies
3. Implement CI/CD pipelines
4. Set up staging environment
5. Plan for scaling
