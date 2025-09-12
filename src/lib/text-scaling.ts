import { cn } from '@/lib/utils';

/**
 * Utility function to apply text scaling with custom multiplier
 * @param className - Base CSS classes
 * @param customMultiplier - Optional custom multiplier (overrides global setting)
 * @returns Combined className with scaling applied
 */
export function withTextScaling(className: string, customMultiplier?: number): string {
  if (customMultiplier) {
    return cn(className, `[font-size:calc(1em*${customMultiplier})]`);
  }
  return className;
}

/**
 * Hook to get current text scaling multiplier
 * @returns Current text scaling multiplier
 */
export function useTextScaling() {
  if (typeof window === 'undefined') return 1;
  
  const root = document.documentElement;
  const computedStyle = getComputedStyle(root);
  const multiplier = computedStyle.getPropertyValue('--text-scale-multiplier');
  
  return parseFloat(multiplier) || 1;
}

/**
 * CSS utility classes for common text scaling scenarios
 */
export const textScalingClasses = {
  // Preset scaling multipliers
  small: '[font-size:calc(1em*0.875)]', // 0.875x
  normal: '[font-size:calc(1em*1)]',     // 1x
  large: '[font-size:calc(1em*1.125)]',  // 1.125x
  xlarge: '[font-size:calc(1em*1.25)]',  // 1.25x
  xxlarge: '[font-size:calc(1em*1.5)]',  // 1.5x
  
  // Responsive scaling
  responsive: '[font-size:calc(1em*var(--text-scale-multiplier,1))]',
} as const;

