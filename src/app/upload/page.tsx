// src/app/upload/page.tsx

import UploadForm from "@/src/features/uploads/UploadForm";

export default function UploadPage() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Upload your chat</h1>
      <p className="mb-6">
        Upload a WhatsApp export to see free stats. No coins required for
        upload.
      </p>
      <UploadForm />
    </div>
  );
}
