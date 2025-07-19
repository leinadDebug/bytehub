import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function fetchLodges<T>(url: string): Promise<T[]> {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch lodges");
  return res.json();
}