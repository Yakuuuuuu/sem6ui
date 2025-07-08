import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const USD_TO_NPR = 133;
export function toNPR(usd: number) {
  return Math.round(usd * USD_TO_NPR);
}
