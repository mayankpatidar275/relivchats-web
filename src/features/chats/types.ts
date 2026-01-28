export interface Chat {
  chat_id: string;
  user_id: string;
  title: string;
  filename: string;
  participants: string[];
  user_display_name: string;
  chat_metadata: ChatMetadata;
  category_id?: string;
  category_slug?: string;
  category_name?: string;
  insights_unlocked: boolean; // Derived from insights_generation_status == "completed"
  insights_generation_status?: string; // "not_started" | "queued" | "generating" | "completed" | "partial_failure" | "failed"
  insights_unlocked_at?: string;
  created_at: string;
  status: string;
  vector_status: string;
  chunk_count: number;
  indexed_at?: string;
  error_log?: string;
}

export interface ChatMetadata {
  total_messages: number;
  total_words: number;
  date_range: {
    start: string;
    end: string;
  };
  total_days: number;
  messages_per_day_avg: number;
  messages_by_date: Record<string, number>; // ISO date string -> message count
  deleted_messages_count: number;
  media_shared_count: number;
  links_shared_count: number;
  busiest_hour: number;
  busiest_day: string;
  hourly_distribution: number[];
  daily_distribution: Record<string, number>;
  top_words: Array<{ word: string; count: number }>;
  top_emojis: Array<{ emoji: string; count: number }>;
  user_stats: Record<string, UserStats>;
  links?: Array<{
    url: string;
    user: string;
    timestamp: string;
  }>;
}

export interface UserStats {
  message_count: number;
  word_count: number;
  avg_words_per_message: number;
  avg_message_length_chars: number;
  deleted_messages: number;
  media_shared: number;
  links_shared: number;
  conversation_initiations: number;
  double_texting_rate: number;
  questions_asked: number;
  avg_response_time_seconds: number;
  top_words: Array<{ word: string; count: number }>;
  top_emojis: Array<{ emoji: string; count: number }>;
  busiest_hour: number;
  hourly_distribution: number[];
  longest_message: {
    word_count: number;
    char_count: number;
    timestamp: string;
    message?: string;
  };
}

export interface AssignCategoryRequest {
  chat_id: string;
  category_id: string;
}

export interface UnlockInsightsRequest {
  chat_id: string;
  category_id: string;
}

export interface UnlockInsightsResponse {
  success: boolean;
  job_id: string;
  coins_deducted: number;
  remaining_balance: number;
  total_insights: number;
  estimated_time_seconds: number;
}

export interface UploadChatResponse {
  chat_id: string;
  user_id: string;
  title: string;
  filename: string;
  participants: string[];
  user_display_name: string;
  chat_metadata: ChatMetadata;
  category_id?: string;
  category_slug?: string;
  category_name?: string;
  insights_unlocked: boolean;
  created_at: string;
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
