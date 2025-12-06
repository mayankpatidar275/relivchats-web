# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Reliv Chats** is a web-based chat analysis platform that provides AI-powered insights from exported chat conversations (WhatsApp initially, expandable to other platforms). The system combines free stats from text processing with paid AI-generated category-specific insights.

**Key Features:**
- Users upload chat exports and select an analysis category (Romantic, Friendship, Family, Business, etc.)
- Free statistics are generated immediately via text processing
- Paid insights require spending points (credit system: 50-100 points per category)
- Users can purchase point packages ranging from $2.99 to $14.99
- Dashboard for managing uploaded chats and viewing insights

## Development Commands

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)

# Building & Production
npm run build            # Build for production
npm start                # Start production server

# Linting & Code Quality
npm run lint             # Run ESLint
npm run lint -- --fix   # Fix linting issues
```

## Codebase Architecture

### Directory Structure Overview

```
src/
├── app/              # Next.js App Router (routes, layouts, pages)
├── components/       # React components organized by feature/page
├── features/         # Feature-specific business logic & API integration
├── hooks/            # Custom React hooks
├── lib/              # Shared utilities, API clients, configuration
└── proxy.ts          # API proxy configuration
```

### Core Architectural Patterns

#### 1. Feature-Based Organization
Each major feature owns a self-contained directory under `src/features/` with its own API layer and types:

- `features/chats/` - Chat management (upload, list, retrieve)
- `features/insights/` - AI-generated insights (40+ insight type definitions)
- `features/categories/` - Chat categories and configuration
- `features/credits/` - Credit/coin system and balances
- `features/payments/` - Payment processing (Stripe + Razorpay)
- `features/users/` - User management and synchronization

Each feature follows this structure:
```
features/[feature]/
├── api/
│   ├── client-queries.ts    # Client-side data fetching
│   ├── server-queries.ts    # Server component queries
│   ├── mutations.ts         # Write operations
│   ├── hooks.ts             # React Query hooks
│   └── index.ts             # Barrel export
└── types.ts                 # Feature-specific types
```

#### 2. Two-Tiered API Architecture

**Client API** (`lib/api/client-api.ts`):
- Used in client components ("use client")
- Automatically attaches Clerk authentication tokens
- Methods: `get()`, `post()`, `postForm()`, `put()`, `patch()`, `delete()`
- Custom error classes: `UnauthorizedError`, `ForbiddenError`, `NotFoundError`, `ValidationError`, `ServerError`

**Server API** (`lib/api/server-api.ts`):
- Used in server components and server actions
- Gets auth token from Clerk server-side auth
- Identical interface to client API

#### 3. State Management Strategy

- **React Query v5** (TanStack Query) - Handles all server state (fetching, caching, synchronization)
- **Zustand v5** - Available for client-only state if needed
- **Clerk** - Manages authentication state

Query key structure is centralized in `src/lib/query/keys.ts` using a hierarchical factory pattern for proper cache invalidation:
```typescript
queryKeys = {
  chats: {
    all: ["chats"],
    list: (filters) => ["chats", "list", {filters}],
    detail: (id) => ["chats", "detail", id],
    stats: (id) => ["chats", "detail", id, "stats"],
    insights: (id) => ["chats", "detail", id, "insights"]
  },
  // ... other features
}
```

#### 4. Component Organization

Components are organized by feature/page context, not by type:

```
components/
├── layout/          # Header, Footer, Shell
├── home/            # Homepage sections
├── chat/            # Chat detail page (with insights/ subdirectory)
├── dashboard/       # Dashboard page
├── category/        # Category selection page
├── pricing/         # Pricing page
├── upload/          # File upload
├── modals/          # Modal dialogs
└── ui/              # Generic UI primitives
```

Large features have nested sub-directories (e.g., `chat/insights/views/` contains insight-type-specific renderers for different insight categories).

#### 5. Authentication & Authorization

- **Clerk** (`@clerk/nextjs`) handles all authentication
- `ClerkClientWrapper` wraps the app with `<ClerkProvider>`
- Protected routes use Clerk's built-in pages in the `(auth)` route group
- Use `useUser()` hook to access current user in components
- Tokens are automatically attached to API requests via QueryProvider setup

### Data Models

#### Chat (`features/chats/types.ts`)
```typescript
Chat {
  chat_id: string
  user_id: string
  title: string
  filename: string
  participants: string[]
  chat_metadata: ChatMetadata      // Free stats (text processing results)
  category_id?: string
  insights_unlocked: boolean
  created_at: string
  status: string
  vector_status: string
}

ChatMetadata {
  total_messages, total_words, date_range
  hourly_distribution, daily_distribution
  top_words, top_emojis
  user_stats: Record<string, UserStats>
  links: Array<{url, user, timestamp}>
}
```

#### Insights (`features/insights/types.ts`)
Contains 40+ type definitions for different insight categories:
- `CommunicationBasicsContent` - Communication patterns
- `EmotionalIntimacyContent` - Vulnerability, support, affection
- `LoveLanguageContent` - Languages of appreciation
- `ConflictResolutionContent` - Conflict patterns and repair
- `FuturePlanningContent` - Relationship vision
- `PlayfulnessRomanceContent` - Humor, flirtation, spark

Each insight type contains evidence items (message quotes), participant-specific analysis, scores, and recommendations.

#### Categories (`features/categories/types.ts`)
```typescript
Category {
  id: string
  name: string                // slug
  display_name: string
  insight_types: InsightType[]
  base_cost: number
}
```

### Next.js App Router Structure

```
app/
├── (auth)/                     # Auth routes (grouped)
│   ├── sign-in/[[...sign-in]]
│   └── sign-up/[[...sign-up]]
├── (app)/                      # Protected app routes (grouped)
│   ├── dashboard/page.tsx
│   └── settings/page.tsx
├── page.tsx                    # Homepage
├── chat/[chatId]/page.tsx      # Chat details (dynamic)
├── category/[slug]/page.tsx    # Category page (dynamic)
├── pricing/page.tsx
├── share/[chatId]/page.tsx     # Shareable insights
├── layout.tsx                  # Root layout with providers
└── globals.css                 # Global Tailwind styles
```

Root layout wraps entire app with providers in this order:
1. `ClerkClientWrapper` - Authentication
2. `QueryProvider` - React Query
3. `ConfirmProvider` - Confirmation dialogs
4. `Header`, `Footer` - Layout components

### Technology Stack

**Framework & Runtime:**
- Next.js 16 (App Router)
- React 19.2
- TypeScript 5 (strict mode)

**State & Data Fetching:**
- React Query 5.90 (server state)
- Zustand 5.0 (client state, optional)

**Authentication:**
- Clerk v6.34

**UI & Styling:**
- Tailwind CSS 4.1
- Lucide React (icons)
- Shadcn/ui component patterns
- Recharts 3.3 (charts)
- Sonner 2.0 (toasts)
- Canvas Confetti (celebrations)

**Payments:**
- Stripe & React Stripe v5.3
- Razorpay 2.9

**Code Quality:**
- ESLint 9 (with @tanstack/eslint-plugin-query)

## Common Development Tasks

### Adding a New Insight Type

1. Add type definition to `features/insights/types.ts`
2. Create view component in `components/chat/insights/views/[InsightName]View.tsx`
3. Add import and case handling in `components/chat/insights/views/index.ts`
4. The insight will render in the `InsightsDisplaySection` automatically

### Adding a New Category

1. Add category definition to backend
2. Update `features/categories/types.ts` if needed
3. Create category page at `app/category/[slug]/page.tsx`
4. Add components in `components/category/`
5. Update categories list in `components/home/CategoriesSection.tsx`

### Adding a New Payment Method

1. Create payment flow in `components/pricing/`
2. Add mutation in `features/payments/api/mutations.ts`
3. Add hook in `features/payments/api/hooks.ts`
4. Update query keys in `lib/query/keys.ts`

### Making API Requests

**In client components:**
```typescript
import { useChat } from '@/features/chats/api/hooks'

const MyComponent = ({ chatId }: { chatId: string }) => {
  const { data: chat, isPending, error } = useChat(chatId)
  // ...
}
```

**In server components (using server-side API):**
```typescript
import { serverApi } from '@/lib/api/server-api'

export async function getData() {
  const data = await serverApi.get('/endpoint')
  return data
}
```

**Direct API calls (when hooks don't fit):**
```typescript
import { clientApi } from '@/lib/api/client-api'

const response = await clientApi.post('/chats', { title: 'Chat' })
```

### Invalidating Cache

When a mutation succeeds, invalidate related queries:
```typescript
const mutation = useMutation({
  mutationFn: async (data) => {
    return clientApi.post('/insights/unlock', data)
  },
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: queryKeys.insights.detail(chatId)
    })
    queryClient.invalidateQueries({
      queryKey: queryKeys.credits.all()
    })
  }
})
```

## Configuration & Environment

**Config files:**
- `tsconfig.json` - TypeScript configuration with path alias `@/*` pointing to project root
- `next.config.ts` - Next.js configuration (minimal)
- `lib/env.client.ts` - Client-side environment variables
- `lib/env.server.ts` - Server-side environment variables

**Build:**
- Production build runs `next build`
- Exports static files to `.next/`

## Important Implementation Details

1. **Type Colocations** - Types live with their feature in `features/[feature]/types.ts`, not in a global types folder
2. **Query Keys Pattern** - Use hierarchical factory pattern for cache invalidation; don't hardcode query keys
3. **Client vs Server Separation** - Use client API in components, server API in server components/actions
4. **Route Grouping** - Auth routes grouped separately from app routes for clear distinction
5. **Error Handling** - Use custom error classes from `lib/api/errors.ts` for typed error handling
6. **Pagination/Filtering** - Include in query key for proper caching: `queryKeys.chats.list(filters)`
7. **File Uploads** - Use `clientApi.postForm()` with FormData for multipart requests
8. **Toast Notifications** - Use Sonner library via `toast.success()`, `toast.error()`, etc.

## Debugging Tips

- React Query DevTools available in dev (from `@tanstack/react-query-devtools`)
- Check network tab for API errors
- Use Clerk's user hook to verify authentication state
- ESLint rules from @tanstack/eslint-plugin-query help catch improper query usage
- TypeScript strict mode catches many issues at compile time
