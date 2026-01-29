import { toPng } from "html-to-image";

/**
 * Download a card component as PNG image
 * @param elementRef - React ref to the card element
 * @param filename - Name of the downloaded file (without extension)
 */
export async function downloadCard(
  elementRef: HTMLElement | null,
  filename: string
): Promise<void> {
  if (!elementRef) {
    console.error("Element ref is null");
    return;
  }

  try {
    // Convert the element to PNG with high quality
    const dataUrl = await toPng(elementRef, {
      cacheBust: true,
      pixelRatio: 2, // Higher resolution for better quality
      width: 1080, // Instagram Story width
      height: 1920, // Instagram Story height
    });

    // Create a download link
    const link = document.createElement("a");
    link.download = `${filename}.png`;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error("Failed to download card:", error);
    throw error;
  }
}

/**
 * Share a card component (opens native share dialog on mobile)
 * @param elementRef - React ref to the card element
 * @param title - Title for the share
 */
export async function shareCard(
  elementRef: HTMLElement | null,
  title: string
): Promise<void> {
  if (!elementRef) {
    console.error("Element ref is null");
    return;
  }

  try {
    // Convert to blob
    const dataUrl = await toPng(elementRef, {
      cacheBust: true,
      pixelRatio: 2,
      width: 1080,
      height: 1920,
    });

    // Convert data URL to blob
    const response = await fetch(dataUrl);
    const blob = await response.blob();
    const file = new File([blob], `${title}.png`, { type: "image/png" });

    // Use native share if available
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: title,
        text: `Check out my chat stats from Reliv Chats!`,
      });
    } else {
      // Fallback to download
      await downloadCard(elementRef, title);
    }
  } catch (error) {
    // Check if user canceled the share (AbortError is expected)
    if (error instanceof Error && error.name === "AbortError") {
      // User canceled share - this is normal, don't log or fallback
      return;
    }

    console.error("Failed to share card:", error);
    // Fallback to download on actual error
    await downloadCard(elementRef, title);
  }
}
