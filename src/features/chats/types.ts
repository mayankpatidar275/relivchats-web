export interface Chat {
  id: string;
  filename: string;
  platform: "whatsapp" | "telegram" | "instagram" | "other";
  category_id?: string;
  category_slug?: string;
  category_name?: string;
  uploaded_at: string;
  participant_count: number;
  message_count: number;
  date_range_start?: string;
  date_range_end?: string;
  file_size_bytes: number;
  processing_status: "pending" | "processed" | "failed";
  insights_unlocked: boolean; // NEW: Track if insights are unlocked
}

export interface ChatStats {
  chat_id: string;
  total_messages: number;
  participants: {
    name: string;
    message_count: number;
    percentage: number;
  }[];
  date_range: {
    start: string;
    end: string;
  };
  busiest_day: string;
  busiest_hour: number;
  media_count: {
    images: number;
    videos: number;
    documents: number;
    audio: number;
  };
  avg_message_length: number;
  most_active_participant: string;
}

export interface UnlockInsightsRequest {
  chat_id: string;
  category_slug: string; // Changed: now just need category
}

export interface UnlockInsightsResponse {
  success: boolean;
  coins_deducted: number;
  remaining_balance: number;
  job_id: string;
  insights: Insight[]; // All insights for the category
}

export interface Insight {
  id: string;
  chat_id: string;
  insight_type_id: string;
  insight_type_name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>; // The actual insight data from AI
  generated_at: string;
}

export interface UploadChatResponse {
  chat_id: string;
  user_id: string;
  title?: string;
  filename: string;
  participants?: string[];
  user_display_name?: string;
  chat_metadata?: Record<string, unknown>;
  category_id?: string;
  category_slug?: string;
  category_name?: string;
  created_at: string;
  insights_unlocked: boolean;
  status: string;
  vector_status: string;
  chunk_count: number;
  indexed_at?: string;
  error_log?: string;
}

export interface UploadChatRequest {
  file: File;
  categoryId?: string;
}
