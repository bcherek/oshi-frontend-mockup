import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Shadcn uses this for tailwind
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
