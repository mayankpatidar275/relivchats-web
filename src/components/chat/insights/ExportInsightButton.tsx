// "use client";

// import { Download } from "lucide-react";
// import html2canvas from "html2canvas";
// import { jsPDF } from "jspdf";

// interface ExportInsightButtonProps {
//   insightId: string;
//   insightTitle: string;
// }

// export default function ExportInsightButton({
//   insightId,
//   insightTitle,
// }: ExportInsightButtonProps) {
//   const handleExport = async (format: "png" | "pdf") => {
//     const element = document.getElementById(`insight-${insightId}`);
//     if (!element) return;

//     const canvas = await html2canvas(element, {
//       scale: 2,
//       backgroundColor: "#ffffff",
//     });

//     if (format === "png") {
//       const link = document.createElement("a");
//       link.download = `${insightTitle}.png`;
//       link.href = canvas.toDataURL();
//       link.click();
//     } else {
//       const pdf = new jsPDF({
//         orientation: "portrait",
//         unit: "px",
//         format: [canvas.width, canvas.height],
//       });
//       pdf.addImage(
//         canvas.toDataURL(),
//         "PNG",
//         0,
//         0,
//         canvas.width,
//         canvas.height
//       );
//       pdf.save(`${insightTitle}.pdf`);
//     }
//   };

//   return (
//     <div className="relative group">
//       <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-purple-300 hover:bg-purple-50 transition-all">
//         <Download className="w-4 h-4" />
//         <span>Export</span>
//       </button>

//       {/* Dropdown */}
//       <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
//         <button
//           onClick={() => handleExport("png")}
//           className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg"
//         >
//           As Image
//         </button>
//         <button
//           onClick={() => handleExport("pdf")}
//           className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-b-lg"
//         >
//           As PDF
//         </button>
//       </div>
//     </div>
//   );
// }
