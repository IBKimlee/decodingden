import type { jsPDF } from 'jspdf';

const FONT_FAMILY = 'NotoSans';
const REGULAR_PATH = '/fonts/NotoSans-Regular.ttf';
const BOLD_PATH = '/fonts/NotoSans-Bold.ttf';

let cachedRegular: string | null = null;
let cachedBold: string | null = null;

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  let binary = '';
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

async function fetchAsBase64(path: string): Promise<string> {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load font ${path}: ${response.status}`);
  }
  return arrayBufferToBase64(await response.arrayBuffer());
}

export async function registerPdfUnicodeFont(pdf: jsPDF): Promise<void> {
  if (!cachedRegular) cachedRegular = await fetchAsBase64(REGULAR_PATH);
  if (!cachedBold) cachedBold = await fetchAsBase64(BOLD_PATH);

  pdf.addFileToVFS('NotoSans-Regular.ttf', cachedRegular);
  pdf.addFont('NotoSans-Regular.ttf', FONT_FAMILY, 'normal');
  pdf.addFileToVFS('NotoSans-Bold.ttf', cachedBold);
  pdf.addFont('NotoSans-Bold.ttf', FONT_FAMILY, 'bold');

  pdf.setFont(FONT_FAMILY, 'normal');
}

export const PDF_FONT_FAMILY = FONT_FAMILY;
