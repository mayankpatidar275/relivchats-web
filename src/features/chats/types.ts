export interface Chat {
  id: string;
  filename: string;
  platform: "whatsapp" | "telegram" | "instagram" | "other";
  category_id?: string;
  category_name?: string;
  uploaded_at: string;
  participant_count: number;
  message_count: number;
  date_range_start?: string;
  date_range_end?: string;
  file_size_bytes: number;
  processing_status: "pending" | "processed" | "failed";
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

export interface UnlockInsightRequest {
  chat_id: string;
  insight_type_ids: string[];
}

export interface UnlockInsightResponse {
  success: boolean;
  coins_deducted: number;
  remaining_balance: number;
  job_id: string;
}

export interface UploadChatResponse {
  chat_id: string;
  filename: string;
  processing_status: string;
  message: string;
}
