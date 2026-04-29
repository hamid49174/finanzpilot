import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatEUR(value: number, opts?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
    ...opts,
  }).format(value);
}

export function formatDate(d: Date | string) {
  const date = typeof d === "string" ? new Date(d) : d;
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  }).format(date);
}

export function formatTime(d: Date | string) {
  const date = typeof d === "string" ? new Date(d) : d;
  return new Intl.DateTimeFormat("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
