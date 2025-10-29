// // src/features/uploads/UploadForm.tsx
// "use client";

// import React, { useRef, useState } from "react";
// import { useRouter } from "next/navigation";
// import { uploadChatFile } from "./api";
// import { useToast } from "@/hooks/useToast";

// export default function UploadForm({
//   preselectedCategory,
// }: {
//   preselectedCategory?: string | null;
// }) {
//   const fileRef = useRef<HTMLInputElement | null>(null);
//   const [loading, setLoading] = useState(false);
//   const toast = useToast();
//   const router = useRouter();

//   async function handleFile(file: File) {
//     setLoading(true);
//     try {
//       const fd = new FormData();
//       fd.append("file", file);
//       if (preselectedCategory) fd.append("category", preselectedCategory);

//       const resp = await uploadChatFile(fd);
//       // backend should return created chat id
//       const chatId = (resp as any).chatId;
//       if (chatId) {
//         router.push(`/chat/${chatId}`);
//       } else {
//         toast.error("Upload succeeded but no chat id returned");
//       }
//     } catch (err: any) {
//       toast.error(err?.message ?? "Upload failed");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="p-4 border rounded-md">
//       <input
//         ref={fileRef}
//         type="file"
//         accept=".txt,.json"
//         onChange={(e) => {
//           const f = e.target.files?.[0];
//           if (f) handleFile(f);
//         }}
//         className="mb-2"
//       />
//       <div className="flex gap-2">
//         <button
//           onClick={() => fileRef.current?.click()}
//           className="px-4 py-2 rounded bg-slate-700 text-white"
//         >
//           Choose file
//         </button>
//         <button
//           onClick={() =>
//             fileRef.current?.files && handleFile(fileRef.current.files[0])
//           }
//           className="px-4 py-2 rounded border"
//           disabled={loading}
//         >
//           Upload
//         </button>
//       </div>
//       <p className="text-sm mt-2 text-muted-foreground">
//         Supported: WhatsApp export (.txt). No payment required for upload.
//       </p>
//     </div>
//   );
// }
