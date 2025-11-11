export const queryKeys = {
  // Chats
  chats: {
    all: ["chats"] as const,
    lists: () => [...queryKeys.chats.all, "list"] as const,
    list: (filters?: Record<string, unknown>) =>
      [...queryKeys.chats.lists(), { filters }] as const,
    details: () => [...queryKeys.chats.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.chats.details(), id] as const,
    stats: (id: string) => [...queryKeys.chats.detail(id), "stats"] as const,
    insights: (id: string) =>
      [...queryKeys.chats.detail(id), "insights"] as const,
  },

  // Categories
  categories: {
    all: ["categories"] as const,
    lists: () => [...queryKeys.categories.all, "list"] as const,
    list: (filters?: Record<string, unknown>) =>
      [...queryKeys.categories.lists(), { filters }] as const,
    details: () => [...queryKeys.categories.all, "detail"] as const,
    detail: (slug: string) =>
      [...queryKeys.categories.details(), slug] as const,
  },

  // Insights
  insights: {
    all: ["insights"] as const,
    lists: () => [...queryKeys.insights.all, "list"] as const,
    list: (filters?: Record<string, unknown>) =>
      [...queryKeys.insights.lists(), { filters }] as const,
    details: () => [...queryKeys.insights.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.insights.details(), id] as const,
    types: () => [...queryKeys.insights.all, "types"] as const,
  },

  // Credits
  credits: {
    all: ["credits"] as const,
    balance: () => [...queryKeys.credits.all, "balance"] as const,
    transactions: () => [...queryKeys.credits.all, "transactions"] as const,
    packages: () => [...queryKeys.credits.all, "packages"] as const,
  },

  // User
  user: {
    all: ["user"] as const,
    profile: () => [...queryKeys.user.all, "profile"] as const,
  },

  // Payments
  payments: {
    all: ["payments"] as const,
    orders: () => [...queryKeys.payments.all, "orders"] as const,
    // Typed order status key: ['payments', 'orders', 'status', orderId]
    orderStatus: (orderId: string) =>
      [...queryKeys.payments.orders(), "status", orderId] as const,
  },
} as const;
