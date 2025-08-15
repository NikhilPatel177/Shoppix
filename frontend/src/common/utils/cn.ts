import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputValues: ClassValue[]) {
  return twMerge(clsx(...inputValues));
}
