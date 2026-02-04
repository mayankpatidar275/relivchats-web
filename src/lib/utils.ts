import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-US").format(num);
}

export function formatDateRange(start: string, end: string): string {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // If same day, show only one date
  if (startDate.toDateString() === endDate.toDateString()) {
    return formatter.format(startDate);
  }

  // If same year, omit year from start date
  if (startDate.getFullYear() === endDate.getFullYear()) {
    const shortFormatter = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    });
    return `${shortFormatter.format(startDate)} - ${formatter.format(endDate)}`;
  }

  // Different years, show both full dates
  return `${formatter.format(startDate)} - ${formatter.format(endDate)}`;
}
