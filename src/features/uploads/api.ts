// src/features/uploads/api.ts

import { clientFetch } from "@/src/lib/api-client";

export async function uploadChatFile(formData: FormData) {
  // backend expects multipart form with 'file' and optionally 'platform'
  return clientFetch("/v1/uploads", {
    method: "POST",
    body: formData,
  });
}
