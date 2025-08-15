/**
 * Utility functions for consistent phoneme formatting across the application
 */
import React from 'react';

/**
 * Checks if content contains angle brackets (used for grapheme notation)
 * @param content - The text content to check
 * @returns true if content contains angle brackets
 */
export function hasAngleBrackets(content: string): boolean {
  return content.includes('〈') || content.includes('〉');
}

/**
 * Renders a spacer element for alignment when content doesn't have angle brackets
 * This ensures consistent text alignment when some lines have 〈sh〉 notation and others don't
 * @param content - The text content to check
 * @returns A spacer span element or null
 */
export function renderAlignmentSpacer(content: string): React.ReactElement | null {
  if (!hasAngleBrackets(content)) {
    return <span className="inline-block" style={{width: '0.5rem'}}></span>;
  }
  return null;
}

/**
 * Helper to render content with bold tags
 * Splits content by <strong> tags and renders them appropriately
 * @param content - The HTML content string with potential <strong> tags
 * @returns Array of React elements with proper bold formatting
 */
export function renderContentWithBold(content: string): (React.ReactElement | null)[] {
  const parts = content.split(/(<strong>|<\/strong>)/);
  let isBold = false;
  
  return parts.map((part, index) => {
    if (part === '<strong>') {
      isBold = true;
      return null;
    } else if (part === '</strong>') {
      isBold = false;
      return null;
    } else if (isBold) {
      return <strong key={index} className="font-bold">{part}</strong>;
    } else {
      return <span key={index}>{part}</span>;
    }
  }).filter(Boolean) as (React.ReactElement | null)[];
}

/**
 * Standard formatting for phoneme notation with angle brackets
 * @param grapheme - The grapheme to format (e.g., "sh")
 * @returns Formatted string with angle brackets (e.g., "〈sh〉")
 */
export function formatGrapheme(grapheme: string): string {
  return `〈${grapheme}〉`;
}

/**
 * Standard formatting for phoneme IPA notation
 * @param phoneme - The phoneme to format (e.g., "sh")
 * @returns Formatted string with slashes (e.g., "/sh/")
 */
export function formatPhoneme(phoneme: string): string {
  return `/${phoneme}/`;
}