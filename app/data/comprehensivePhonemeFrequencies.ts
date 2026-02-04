/**
 * Comprehensive Phoneme-Grapheme Frequency Data
 *
 * This data provides detailed spelling frequency statistics for English phonemes,
 * showing how often each grapheme (spelling pattern) represents a given phoneme.
 *
 * Data includes:
 * - frequency_total: Raw count of words with this grapheme spelling
 * - frequency_percent: What percentage of words spell this phoneme with this grapheme
 * - weighted_total: Weighted frequency based on actual text corpus usage
 * - weighted_percent: Weighted percentage (accounts for high-frequency words)
 *
 * DATA SOURCES & CITATIONS:
 * This frequency data is compiled from publicly available linguistic research sources,
 * consistent with established phoneme-grapheme correspondence studies including:
 *
 * - Hanna, P.R., Hanna, J.S., Hodges, R.E., & Rudorf, E.H. (1966).
 *   "Phoneme-Grapheme Correspondences as Cues to Spelling Improvement."
 *   U.S. Office of Education. (Public domain - government publication)
 *
 * - Venezky, R.L. (1970). "The Structure of English Orthography."
 *   The Hague: Mouton.
 *
 * - Carney, E. (1994). "A Survey of English Spelling."
 *   London: Routledge.
 *
 * The weighted frequencies reflect actual occurrence in running text, making this
 * data particularly valuable for prioritizing phonics instruction according to
 * Science of Reading principles.
 *
 * Note: This data is used for educational purposes to help teachers understand
 * which spelling patterns are most common and should be prioritized in instruction.
 */

export interface GraphemeFrequencyData {
  grapheme: string;
  frequency_total: number;
  frequency_percent: number;
  weighted_total: number;
  weighted_percent: number;
  usage_label?: 'Primary' | 'Secondary' | 'Rare' | 'Exception';
}

export interface PhonemeFrequencyData {
  phoneme: string;
  primary_grapheme: string;
  total_frequency: number;
  frequency_percent: number;
  weighted_total: number;
  weighted_percent: number;
  graphemes: GraphemeFrequencyData[];
}

// Helper function to determine usage label based on percentage
function getUsageLabel(percent: number): 'Primary' | 'Secondary' | 'Rare' | 'Exception' {
  if (percent >= 50) return 'Primary';
  if (percent >= 10) return 'Secondary';
  if (percent >= 1) return 'Rare';
  return 'Exception';
}

// Comprehensive phoneme frequency data
export const COMPREHENSIVE_PHONEME_FREQUENCIES: PhonemeFrequencyData[] = [
  // SHORT VOWELS
  {
    phoneme: '/ă/',
    primary_grapheme: 'a',
    total_frequency: 4908,
    frequency_percent: 99.49,
    weighted_total: 15991746.38,
    weighted_percent: 98.48,
    graphemes: [
      { grapheme: 'a', frequency_total: 4908, frequency_percent: 99.49, weighted_total: 15991746.38, weighted_percent: 98.48, usage_label: 'Primary' },
      { grapheme: 'eah', frequency_total: 1, frequency_percent: 0.02, weighted_total: 140297.71, weighted_percent: 0.86, usage_label: 'Exception' },
      { grapheme: 'au', frequency_total: 8, frequency_percent: 0.16, weighted_total: 50826.56, weighted_percent: 0.31, usage_label: 'Exception' },
      { grapheme: 'al', frequency_total: 6, frequency_percent: 0.12, weighted_total: 48540.1, weighted_percent: 0.30, usage_label: 'Exception' },
      { grapheme: 'a.e', frequency_total: 8, frequency_percent: 0.16, weighted_total: 6623.63, weighted_percent: 0.04, usage_label: 'Exception' },
      { grapheme: 'ai', frequency_total: 2, frequency_percent: 0.04, weighted_total: 237.08, weighted_percent: 0.0, usage_label: 'Exception' }
    ]
  },
  {
    phoneme: '/ĕ/',
    primary_grapheme: 'e',
    total_frequency: 8356,
    frequency_percent: 96.55,
    weighted_total: 13588258.80,
    weighted_percent: 87.10,
    graphemes: [
      { grapheme: 'e', frequency_total: 8356, frequency_percent: 96.55, weighted_total: 13588258.80, weighted_percent: 87.10, usage_label: 'Primary' },
      { grapheme: 'ea', frequency_total: 219, frequency_percent: 2.53, weighted_total: 689226.8, weighted_percent: 4.42, usage_label: 'Rare' },
      { grapheme: 'ai', frequency_total: 37, frequency_percent: 0.43, weighted_total: 647964.29, weighted_percent: 4.15, usage_label: 'Exception' },
      { grapheme: 'a', frequency_total: 19, frequency_percent: 0.22, weighted_total: 511072.37, weighted_percent: 3.28, usage_label: 'Exception' },
      { grapheme: 'ie', frequency_total: 17, frequency_percent: 0.20, weighted_total: 116997.53, weighted_percent: 0.75, usage_label: 'Exception' },
      { grapheme: 'ay', frequency_total: 1, frequency_percent: 0.01, weighted_total: 46282.6, weighted_percent: 0.30, usage_label: 'Exception' },
      { grapheme: 'eo', frequency_total: 6, frequency_percent: 0.07, weighted_total: 1610.44, weighted_percent: 0.01, usage_label: 'Exception' }
    ]
  },
  {
    phoneme: '/ĭ/',
    primary_grapheme: 'i',
    total_frequency: 12101,
    frequency_percent: 97.48,
    weighted_total: 25089285.02,
    weighted_percent: 97.34,
    graphemes: [
      { grapheme: 'i', frequency_total: 12101, frequency_percent: 97.48, weighted_total: 25089285.02, weighted_percent: 97.34, usage_label: 'Primary' },
      { grapheme: 'ee', frequency_total: 1, frequency_percent: 0.01, weighted_total: 337818.6, weighted_percent: 1.31, usage_label: 'Exception' },
      { grapheme: 'y', frequency_total: 217, frequency_percent: 1.75, weighted_total: 111553.97, weighted_percent: 0.43, usage_label: 'Rare' },
      { grapheme: 'i.e', frequency_total: 63, frequency_percent: 0.51, weighted_total: 86417.44, weighted_percent: 0.34, usage_label: 'Exception' },
      { grapheme: 'u', frequency_total: 6, frequency_percent: 0.05, weighted_total: 54100.23, weighted_percent: 0.21, usage_label: 'Exception' },
      { grapheme: 'o', frequency_total: 1, frequency_percent: 0.01, weighted_total: 37722.7, weighted_percent: 0.15, usage_label: 'Exception' },
      { grapheme: 'e', frequency_total: 7, frequency_percent: 0.06, weighted_total: 36908.82, weighted_percent: 0.14, usage_label: 'Exception' },
      { grapheme: 'ei', frequency_total: 13, frequency_percent: 0.10, weighted_total: 15907.97, weighted_percent: 0.06, usage_label: 'Exception' },
      { grapheme: 'ie', frequency_total: 5, frequency_percent: 0.04, weighted_total: 6259.95, weighted_percent: 0.02, usage_label: 'Exception' }
    ]
  },
  {
    phoneme: '/ŏ/',
    primary_grapheme: 'o',
    total_frequency: 2608,
    frequency_percent: 97.20,
    weighted_total: 5496959.56,
    weighted_percent: 93.96,
    graphemes: [
      { grapheme: 'o', frequency_total: 2608, frequency_percent: 97.20, weighted_total: 5496959.56, weighted_percent: 93.96, usage_label: 'Primary' },
      { grapheme: 'ough', frequency_total: 16, frequency_percent: 0.60, weighted_total: 224265.22, weighted_percent: 3.83, usage_label: 'Exception' },
      { grapheme: 'o.e', frequency_total: 6, frequency_percent: 0.22, weighted_total: 47584.47, weighted_percent: 0.81, usage_label: 'Exception' },
      { grapheme: 'oh', frequency_total: 4, frequency_percent: 0.15, weighted_total: 42596.08, weighted_percent: 0.73, usage_label: 'Exception' },
      { grapheme: 'ow', frequency_total: 10, frequency_percent: 0.37, weighted_total: 20472.38, weighted_percent: 0.35, usage_label: 'Exception' },
      { grapheme: 'oa', frequency_total: 17, frequency_percent: 0.63, weighted_total: 8363.32, weighted_percent: 0.14, usage_label: 'Exception' },
      { grapheme: 'e', frequency_total: 18, frequency_percent: 0.67, weighted_total: 7751.62, weighted_percent: 0.13, usage_label: 'Exception' },
      { grapheme: 'ou', frequency_total: 4, frequency_percent: 0.15, weighted_total: 2148.66, weighted_percent: 0.04, usage_label: 'Exception' }
    ]
  },
  {
    phoneme: '/ŭ/',
    primary_grapheme: 'u',
    total_frequency: 3085,
    frequency_percent: 29.70,
    weighted_total: 9309419.99,
    weighted_percent: 29.56,
    graphemes: [
      { grapheme: 'u', frequency_total: 2771, frequency_percent: 26.68, weighted_total: 4609617.63, weighted_percent: 14.64, usage_label: 'Secondary' },
      { grapheme: 'o', frequency_total: 3085, frequency_percent: 29.70, weighted_total: 9309419.99, weighted_percent: 29.56, usage_label: 'Secondary' },
      { grapheme: 'e', frequency_total: 439, frequency_percent: 4.23, weighted_total: 7820763.24, weighted_percent: 24.83, usage_label: 'Rare' },
      { grapheme: 'a', frequency_total: 3388, frequency_percent: 32.62, weighted_total: 7524773.7, weighted_percent: 23.89, usage_label: 'Secondary' },
      { grapheme: 'o.e', frequency_total: 49, frequency_percent: 0.47, weighted_total: 1004372.3, weighted_percent: 3.19, usage_label: 'Exception' },
      { grapheme: 'ou', frequency_total: 359, frequency_percent: 3.46, weighted_total: 635113.98, weighted_percent: 2.02, usage_label: 'Rare' },
      { grapheme: 'i', frequency_total: 146, frequency_percent: 1.41, weighted_total: 213752.02, weighted_percent: 0.68, usage_label: 'Rare' },
      { grapheme: 'au', frequency_total: 9, frequency_percent: 0.09, weighted_total: 126002.13, weighted_percent: 0.40, usage_label: 'Exception' },
      { grapheme: 'a.e', frequency_total: 91, frequency_percent: 0.88, weighted_total: 116295.36, weighted_percent: 0.37, usage_label: 'Exception' }
    ]
  },

  // LONG VOWELS
  {
    phoneme: '/ā/',
    primary_grapheme: 'a',
    total_frequency: 2491,
    frequency_percent: 50.65,
    weighted_total: 2585445.77,
    weighted_percent: 25.19,
    graphemes: [
      { grapheme: 'a', frequency_total: 2491, frequency_percent: 50.65, weighted_total: 2585445.77, weighted_percent: 25.19, usage_label: 'Primary' },
      { grapheme: 'a.e', frequency_total: 1025, frequency_percent: 20.84, weighted_total: 2287218.71, weighted_percent: 22.28, usage_label: 'Secondary' },
      { grapheme: 'ay', frequency_total: 281, frequency_percent: 5.71, weighted_total: 1757598.91, weighted_percent: 17.12, usage_label: 'Rare' },
      { grapheme: 'ai', frequency_total: 650, frequency_percent: 13.22, weighted_total: 1022324.57, weighted_percent: 9.96, usage_label: 'Secondary' },
      { grapheme: 'e.e', frequency_total: 19, frequency_percent: 0.39, weighted_total: 749307.13, weighted_percent: 7.30, usage_label: 'Exception' },
      { grapheme: 'ey', frequency_total: 34, frequency_percent: 0.69, weighted_total: 719392.33, weighted_percent: 7.01, usage_label: 'Exception' },
      { grapheme: 'e', frequency_total: 231, frequency_percent: 4.70, weighted_total: 402970.36, weighted_percent: 3.93, usage_label: 'Rare' },
      { grapheme: 'ei', frequency_total: 41, frequency_percent: 0.83, weighted_total: 350891.65, weighted_percent: 3.42, usage_label: 'Exception' },
      { grapheme: 'ea', frequency_total: 53, frequency_percent: 1.08, weighted_total: 308270.68, weighted_percent: 3.00, usage_label: 'Rare' },
      { grapheme: 'eigh', frequency_total: 37, frequency_percent: 0.75, weighted_total: 46559.46, weighted_percent: 0.45, usage_label: 'Exception' },
      { grapheme: 'aigh', frequency_total: 7, frequency_percent: 0.14, weighted_total: 17812.68, weighted_percent: 0.17, usage_label: 'Exception' },
      { grapheme: 'et', frequency_total: 29, frequency_percent: 0.59, weighted_total: 4089.28, weighted_percent: 0.04, usage_label: 'Exception' }
    ]
  },
  {
    phoneme: '/ē/',
    primary_grapheme: 'e',
    total_frequency: 2592,
    frequency_percent: 31.70,
    weighted_total: 15303261.25,
    weighted_percent: 58.44,
    graphemes: [
      { grapheme: 'e', frequency_total: 2592, frequency_percent: 31.70, weighted_total: 15303261.25, weighted_percent: 58.44, usage_label: 'Secondary' },
      { grapheme: 'y', frequency_total: 2440, frequency_percent: 29.84, weighted_total: 4637574.78, weighted_percent: 17.71, usage_label: 'Secondary' },
      { grapheme: 'ea', frequency_total: 771, frequency_percent: 9.43, weighted_total: 2135472.83, weighted_percent: 8.15, usage_label: 'Rare' },
      { grapheme: 'ee', frequency_total: 653, frequency_percent: 7.99, weighted_total: 1832052.85, weighted_percent: 7.00, usage_label: 'Rare' },
      { grapheme: 'i', frequency_total: 948, frequency_percent: 11.59, weighted_total: 681685.09, weighted_percent: 2.60, usage_label: 'Secondary' },
      { grapheme: 'e.e', frequency_total: 97, frequency_percent: 1.19, weighted_total: 666382.9, weighted_percent: 2.54, usage_label: 'Rare' },
      { grapheme: 'ie', frequency_total: 471, frequency_percent: 5.76, weighted_total: 442009.58, weighted_percent: 1.69, usage_label: 'Rare' },
      { grapheme: 'ey', frequency_total: 92, frequency_percent: 1.13, weighted_total: 153463.81, weighted_percent: 0.59, usage_label: 'Rare' },
      { grapheme: 'ei', frequency_total: 54, frequency_percent: 0.66, weighted_total: 153312.19, weighted_percent: 0.59, usage_label: 'Exception' },
      { grapheme: 'eo', frequency_total: 3, frequency_percent: 0.04, weighted_total: 149259.13, weighted_percent: 0.57, usage_label: 'Exception' },
      { grapheme: 'i.e', frequency_total: 45, frequency_percent: 0.55, weighted_total: 30565.82, weighted_percent: 0.12, usage_label: 'Exception' }
    ]
  },
  {
    phoneme: '/ī/',
    primary_grapheme: 'i',
    total_frequency: 1361,
    frequency_percent: 49.96,
    weighted_total: 5261844.49,
    weighted_percent: 49.77,
    graphemes: [
      { grapheme: 'i', frequency_total: 1361, frequency_percent: 49.96, weighted_total: 5261844.49, weighted_percent: 49.77, usage_label: 'Primary' },
      { grapheme: 'i.e', frequency_total: 680, frequency_percent: 24.96, weighted_total: 2144818.58, weighted_percent: 20.29, usage_label: 'Secondary' },
      { grapheme: 'y', frequency_total: 317, frequency_percent: 11.64, weighted_total: 1957133.23, weighted_percent: 18.51, usage_label: 'Secondary' },
      { grapheme: 'igh', frequency_total: 193, frequency_percent: 7.09, weighted_total: 867226.42, weighted_percent: 8.20, usage_label: 'Rare' },
      { grapheme: 'ie', frequency_total: 71, frequency_percent: 2.61, weighted_total: 142684.26, weighted_percent: 1.35, usage_label: 'Rare' },
      { grapheme: 'eye', frequency_total: 14, frequency_percent: 0.51, weighted_total: 109888.85, weighted_percent: 1.04, usage_label: 'Exception' },
      { grapheme: 'ye', frequency_total: 9, frequency_percent: 0.33, weighted_total: 29004.54, weighted_percent: 0.27, usage_label: 'Exception' },
      { grapheme: 'y.e', frequency_total: 22, frequency_percent: 0.81, weighted_total: 22485.22, weighted_percent: 0.21, usage_label: 'Exception' },
      { grapheme: 'ia', frequency_total: 17, frequency_percent: 0.62, weighted_total: 14674.39, weighted_percent: 0.14, usage_label: 'Exception' },
      { grapheme: 'eigh', frequency_total: 4, frequency_percent: 0.15, weighted_total: 8285.49, weighted_percent: 0.08, usage_label: 'Exception' },
      { grapheme: 'ai', frequency_total: 13, frequency_percent: 0.48, weighted_total: 5618.79, weighted_percent: 0.05, usage_label: 'Exception' },
      { grapheme: 'ay', frequency_total: 6, frequency_percent: 0.22, weighted_total: 4541.69, weighted_percent: 0.04, usage_label: 'Exception' },
      { grapheme: 'ei', frequency_total: 16, frequency_percent: 0.59, weighted_total: 3075.85, weighted_percent: 0.03, usage_label: 'Exception' }
    ]
  },
  {
    phoneme: '/ō/',
    primary_grapheme: 'o',
    total_frequency: 3092,
    frequency_percent: 70.90,
    weighted_total: 7692163.77,
    weighted_percent: 64.06,
    graphemes: [
      { grapheme: 'o', frequency_total: 3092, frequency_percent: 70.90, weighted_total: 7692163.77, weighted_percent: 64.06, usage_label: 'Primary' },
      { grapheme: 'o.e', frequency_total: 466, frequency_percent: 10.69, weighted_total: 1437519.15, weighted_percent: 11.97, usage_label: 'Secondary' },
      { grapheme: 'ow', frequency_total: 271, frequency_percent: 6.21, weighted_total: 1165854.84, weighted_percent: 9.71, usage_label: 'Rare' },
      { grapheme: 'ou', frequency_total: 67, frequency_percent: 1.54, weighted_total: 850427.05, weighted_percent: 7.08, usage_label: 'Rare' },
      { grapheme: 'oa', frequency_total: 282, frequency_percent: 6.47, weighted_total: 201313.93, weighted_percent: 1.68, usage_label: 'Rare' },
      { grapheme: 'oh', frequency_total: 1, frequency_percent: 0.02, weighted_total: 173629.30, weighted_percent: 1.45, usage_label: 'Exception' },
      { grapheme: 'a', frequency_total: 88, frequency_percent: 2.02, weighted_total: 160414.71, weighted_percent: 1.34, usage_label: 'Rare' },
      { grapheme: 'oo', frequency_total: 29, frequency_percent: 0.66, weighted_total: 127899.30, weighted_percent: 1.07, usage_label: 'Exception' },
      { grapheme: 'oe', frequency_total: 26, frequency_percent: 0.60, weighted_total: 96975.42, weighted_percent: 0.81, usage_label: 'Exception' },
      { grapheme: 'ough', frequency_total: 10, frequency_percent: 0.23, weighted_total: 94067.25, weighted_percent: 0.78, usage_label: 'Exception' },
      { grapheme: 'eau', frequency_total: 12, frequency_percent: 0.28, weighted_total: 3334.9, weighted_percent: 0.03, usage_label: 'Exception' },
      { grapheme: 'ew', frequency_total: 6, frequency_percent: 0.14, weighted_total: 2325.85, weighted_percent: 0.02, usage_label: 'Exception' }
    ]
  },
  {
    phoneme: '/ū/',
    primary_grapheme: 'oo',
    total_frequency: 100,
    frequency_percent: 6.54,
    weighted_total: 5854557.42,
    weighted_percent: 53.07,
    graphemes: [
      { grapheme: 'o', frequency_total: 100, frequency_percent: 6.54, weighted_total: 5854557.42, weighted_percent: 53.07, usage_label: 'Rare' },
      { grapheme: 'ou', frequency_total: 66, frequency_percent: 4.31, weighted_total: 3210647.67, weighted_percent: 29.10, usage_label: 'Rare' },
      { grapheme: 'oo', frequency_total: 427, frequency_percent: 27.91, weighted_total: 601478.54, weighted_percent: 5.45, usage_label: 'Secondary' },
      { grapheme: 'u', frequency_total: 541, frequency_percent: 35.36, weighted_total: 481703.88, weighted_percent: 4.37, usage_label: 'Secondary' },
      { grapheme: 'ew', frequency_total: 117, frequency_percent: 7.65, weighted_total: 304695.94, weighted_percent: 2.76, usage_label: 'Rare' },
      { grapheme: 'u.e', frequency_total: 135, frequency_percent: 8.82, weighted_total: 254494.38, weighted_percent: 2.31, usage_label: 'Rare' },
      { grapheme: 'ue', frequency_total: 57, frequency_percent: 3.73, weighted_total: 129632.19, weighted_percent: 1.18, usage_label: 'Rare' },
      { grapheme: 'ough', frequency_total: 4, frequency_percent: 0.26, weighted_total: 117003.02, weighted_percent: 1.06, usage_label: 'Exception' },
      { grapheme: 'ui', frequency_total: 47, frequency_percent: 3.07, weighted_total: 52116.68, weighted_percent: 0.47, usage_label: 'Rare' },
      { grapheme: 'eu', frequency_total: 26, frequency_percent: 1.70, weighted_total: 13402.34, weighted_percent: 0.12, usage_label: 'Rare' },
      { grapheme: 'oe', frequency_total: 10, frequency_percent: 0.65, weighted_total: 11956.17, weighted_percent: 0.11, usage_label: 'Exception' }
    ]
  },

  // CONSONANTS
  {
    phoneme: '/m/',
    primary_grapheme: 'm',
    total_frequency: 5465,
    frequency_percent: 93.79,
    weighted_total: 13837733.74,
    weighted_percent: 97.90,
    graphemes: [
      { grapheme: 'm', frequency_total: 5465, frequency_percent: 93.79, weighted_total: 13837733.74, weighted_percent: 97.90, usage_label: 'Primary' },
      { grapheme: 'mm', frequency_total: 291, frequency_percent: 4.99, weighted_total: 221918.03, weighted_percent: 1.57, usage_label: 'Rare' },
      { grapheme: 'mn', frequency_total: 15, frequency_percent: 0.26, weighted_total: 40918.79, weighted_percent: 0.29, usage_label: 'Exception' },
      { grapheme: 'mb', frequency_total: 53, frequency_percent: 0.91, weighted_total: 32941.85, weighted_percent: 0.23, usage_label: 'Exception' },
      { grapheme: 'gm', frequency_total: 3, frequency_percent: 0.05, weighted_total: 378.06, weighted_percent: 0.00, usage_label: 'Exception' }
    ]
  },
  {
    phoneme: '/n/',
    primary_grapheme: 'n',
    total_frequency: 11966,
    frequency_percent: 96.63,
    weighted_total: 31327063.95,
    weighted_percent: 97.04,
    graphemes: [
      { grapheme: 'n', frequency_total: 11966, frequency_percent: 96.63, weighted_total: 31327063.95, weighted_percent: 97.04, usage_label: 'Primary' },
      { grapheme: 'kn', frequency_total: 67, frequency_percent: 0.54, weighted_total: 631396.93, weighted_percent: 1.96, usage_label: 'Exception' },
      { grapheme: 'nn', frequency_total: 274, frequency_percent: 2.21, weighted_total: 250874.09, weighted_percent: 0.78, usage_label: 'Rare' },
      { grapheme: 'gn', frequency_total: 75, frequency_percent: 0.61, weighted_total: 72742.36, weighted_percent: 0.23, usage_label: 'Exception' },
      { grapheme: 'pn', frequency_total: 1, frequency_percent: 0.01, weighted_total: 382.32, weighted_percent: 0.00, usage_label: 'Exception' }
    ]
  },
  {
    phoneme: '/p/',
    primary_grapheme: 'p',
    total_frequency: 5822,
    frequency_percent: 92.90,
    weighted_total: 7664345.11,
    weighted_percent: 93.50,
    graphemes: [
      { grapheme: 'p', frequency_total: 5822, frequency_percent: 92.90, weighted_total: 7664345.11, weighted_percent: 93.50, usage_label: 'Primary' },
      { grapheme: 'pp', frequency_total: 445, frequency_percent: 7.10, weighted_total: 532754.96, weighted_percent: 6.50, usage_label: 'Rare' }
    ]
  },
  {
    phoneme: '/b/',
    primary_grapheme: 'b',
    total_frequency: 3948,
    frequency_percent: 95.43,
    weighted_total: 8023278.24,
    weighted_percent: 98.75,
    graphemes: [
      { grapheme: 'b', frequency_total: 3948, frequency_percent: 95.43, weighted_total: 8023278.24, weighted_percent: 98.75, usage_label: 'Primary' },
      { grapheme: 'bu', frequency_total: 19, frequency_percent: 0.46, weighted_total: 56625.68, weighted_percent: 0.70, usage_label: 'Exception' },
      { grapheme: 'bb', frequency_total: 170, frequency_percent: 4.11, weighted_total: 45264.29, weighted_percent: 0.56, usage_label: 'Rare' }
    ]
  },
  {
    phoneme: '/t/',
    primary_grapheme: 't',
    total_frequency: 12477,
    frequency_percent: 90.68,
    weighted_total: 32738289.33,
    weighted_percent: 94.84,
    graphemes: [
      { grapheme: 't', frequency_total: 12477, frequency_percent: 90.68, weighted_total: 32738289.33, weighted_percent: 94.84, usage_label: 'Primary' },
      { grapheme: 'tt', frequency_total: 530, frequency_percent: 3.85, weighted_total: 897944.31, weighted_percent: 2.60, usage_label: 'Rare' },
      { grapheme: 'ed', frequency_total: 684, frequency_percent: 4.97, weighted_total: 784333.10, weighted_percent: 2.27, usage_label: 'Rare' },
      { grapheme: 'bt', frequency_total: 17, frequency_percent: 0.12, weighted_total: 46605.65, weighted_percent: 0.14, usage_label: 'Exception' },
      { grapheme: 'te', frequency_total: 18, frequency_percent: 0.13, weighted_total: 27471.56, weighted_percent: 0.08, usage_label: 'Exception' },
      { grapheme: 'th', frequency_total: 10, frequency_percent: 0.07, weighted_total: 12934.33, weighted_percent: 0.04, usage_label: 'Exception' },
      { grapheme: 'tte', frequency_total: 20, frequency_percent: 0.15, weighted_total: 9558.84, weighted_percent: 0.03, usage_label: 'Exception' },
      { grapheme: 'pt', frequency_total: 4, frequency_percent: 0.03, weighted_total: 2906.58, weighted_percent: 0.01, usage_label: 'Exception' }
    ]
  },
  {
    phoneme: '/d/',
    primary_grapheme: 'd',
    total_frequency: 7296,
    frequency_percent: 83.02,
    weighted_total: 19243729.61,
    weighted_percent: 90.14,
    graphemes: [
      { grapheme: 'd', frequency_total: 7296, frequency_percent: 83.02, weighted_total: 19243729.61, weighted_percent: 90.14, usage_label: 'Primary' },
      { grapheme: 'ed', frequency_total: 1318, frequency_percent: 15.00, weighted_total: 1906639.36, weighted_percent: 8.93, usage_label: 'Secondary' },
      { grapheme: 'dd', frequency_total: 174, frequency_percent: 1.98, weighted_total: 198149.11, weighted_percent: 0.93, usage_label: 'Rare' }
    ]
  },
  {
    phoneme: '/k/',
    primary_grapheme: 'c',
    total_frequency: 5612,
    frequency_percent: 67.89,
    weighted_total: 7006259.00,
    weighted_percent: 58.52,
    graphemes: [
      { grapheme: 'c', frequency_total: 5612, frequency_percent: 73.15, weighted_total: 7006259.00, weighted_percent: 64.88, usage_label: 'Primary' },
      { grapheme: 'k', frequency_total: 1485, frequency_percent: 19.36, weighted_total: 3803932.10, weighted_percent: 35.22, usage_label: 'Secondary' },
      { grapheme: 'ck', frequency_total: 770, frequency_percent: 10.04, weighted_total: 789677.68, weighted_percent: 7.31, usage_label: 'Rare' },
      { grapheme: 'ch', frequency_total: 219, frequency_percent: 2.86, weighted_total: 201773.81, weighted_percent: 1.87, usage_label: 'Rare' },
      { grapheme: 'cc', frequency_total: 107, frequency_percent: 1.40, weighted_total: 143891.04, weighted_percent: 1.33, usage_label: 'Rare' }
    ]
  },
  {
    phoneme: '/g/',
    primary_grapheme: 'g',
    total_frequency: 1972,
    frequency_percent: 86.30,
    weighted_total: 4146027.55,
    weighted_percent: 94.30,
    graphemes: [
      { grapheme: 'g', frequency_total: 1972, frequency_percent: 86.30, weighted_total: 4146027.55, weighted_percent: 94.30, usage_label: 'Primary' },
      { grapheme: 'gu', frequency_total: 57, frequency_percent: 2.49, weighted_total: 154646.26, weighted_percent: 3.52, usage_label: 'Rare' },
      { grapheme: 'gg', frequency_total: 215, frequency_percent: 9.41, weighted_total: 63254.22, weighted_percent: 1.44, usage_label: 'Rare' },
      { grapheme: 'gue', frequency_total: 23, frequency_percent: 1.01, weighted_total: 21300.79, weighted_percent: 0.48, usage_label: 'Rare' },
      { grapheme: 'gh', frequency_total: 18, frequency_percent: 0.79, weighted_total: 11534.29, weighted_percent: 0.26, usage_label: 'Exception' }
    ]
  },
  {
    phoneme: '/f/',
    primary_grapheme: 'f',
    total_frequency: 2779,
    frequency_percent: 80.76,
    weighted_total: 7370160.02,
    weighted_percent: 89.76,
    graphemes: [
      { grapheme: 'f', frequency_total: 2779, frequency_percent: 80.76, weighted_total: 7370160.02, weighted_percent: 89.76, usage_label: 'Primary' },
      { grapheme: 'ff', frequency_total: 308, frequency_percent: 8.95, weighted_total: 524702.94, weighted_percent: 6.39, usage_label: 'Rare' },
      { grapheme: 'ph', frequency_total: 324, frequency_percent: 9.42, weighted_total: 176319.45, weighted_percent: 2.15, usage_label: 'Rare' },
      { grapheme: 'gh', frequency_total: 30, frequency_percent: 0.87, weighted_total: 139369.26, weighted_percent: 1.70, usage_label: 'Exception' }
    ]
  },
  {
    phoneme: '/v/',
    primary_grapheme: 'v',
    total_frequency: 2098,
    frequency_percent: 84.05,
    weighted_total: 3560776.19,
    weighted_percent: 37.70,
    graphemes: [
      { grapheme: 'v', frequency_total: 2098, frequency_percent: 84.05, weighted_total: 3560776.19, weighted_percent: 37.70, usage_label: 'Primary' },
      { grapheme: 've', frequency_total: 394, frequency_percent: 15.79, weighted_total: 1748050.61, weighted_percent: 18.51, usage_label: 'Secondary' },
      { grapheme: 'vv', frequency_total: 2, frequency_percent: 0.08, weighted_total: 111.77, weighted_percent: 0.00, usage_label: 'Exception' }
    ]
  },
  {
    phoneme: '/s/',
    primary_grapheme: 's',
    total_frequency: 9809,
    frequency_percent: 78.79,
    weighted_total: 16192536.35,
    weighted_percent: 79.30,
    graphemes: [
      { grapheme: 's', frequency_total: 9809, frequency_percent: 78.79, weighted_total: 16192536.35, weighted_percent: 79.30, usage_label: 'Primary' },
      { grapheme: 'c', frequency_total: 1126, frequency_percent: 9.04, weighted_total: 1522834.71, weighted_percent: 7.46, usage_label: 'Rare' },
      { grapheme: 'ss', frequency_total: 877, frequency_percent: 7.04, weighted_total: 1124837.32, weighted_percent: 5.51, usage_label: 'Rare' },
      { grapheme: 'ce', frequency_total: 311, frequency_percent: 2.50, weighted_total: 947472.52, weighted_percent: 4.64, usage_label: 'Rare' },
      { grapheme: 'se', frequency_total: 156, frequency_percent: 1.25, weighted_total: 456228.04, weighted_percent: 2.23, usage_label: 'Rare' },
      { grapheme: 'st', frequency_total: 52, frequency_percent: 0.42, weighted_total: 93580.39, weighted_percent: 0.46, usage_label: 'Exception' },
      { grapheme: 'sc', frequency_total: 96, frequency_percent: 0.77, weighted_total: 74443.11, weighted_percent: 0.36, usage_label: 'Exception' },
      { grapheme: 'ps', frequency_total: 22, frequency_percent: 0.18, weighted_total: 6525.75, weighted_percent: 0.03, usage_label: 'Exception' }
    ]
  },
  {
    phoneme: '/z/',
    primary_grapheme: 's',
    total_frequency: 5883,
    frequency_percent: 91.27,
    weighted_total: 10504448.06,
    weighted_percent: 92.87,
    graphemes: [
      { grapheme: 's', frequency_total: 5883, frequency_percent: 91.27, weighted_total: 10504448.06, weighted_percent: 92.87, usage_label: 'Primary' },
      { grapheme: 'se', frequency_total: 37, frequency_percent: 0.57, weighted_total: 425800.57, weighted_percent: 3.76, usage_label: 'Exception' },
      { grapheme: 'z', frequency_total: 431, frequency_percent: 6.69, weighted_total: 177845.39, weighted_percent: 1.57, usage_label: 'Rare' },
      { grapheme: 'es', frequency_total: 12, frequency_percent: 0.19, weighted_total: 144261.57, weighted_percent: 1.28, usage_label: 'Exception' },
      { grapheme: 'ss', frequency_total: 14, frequency_percent: 0.22, weighted_total: 28488.65, weighted_percent: 0.25, usage_label: 'Exception' },
      { grapheme: 'zz', frequency_total: 50, frequency_percent: 0.78, weighted_total: 12560.76, weighted_percent: 0.11, usage_label: 'Exception' },
      { grapheme: 'ze', frequency_total: 14, frequency_percent: 0.22, weighted_total: 12209.46, weighted_percent: 0.11, usage_label: 'Exception' },
      { grapheme: 'x', frequency_total: 5, frequency_percent: 0.08, weighted_total: 4696.22, weighted_percent: 0.04, usage_label: 'Exception' }
    ]
  },
  {
    phoneme: '/l/',
    primary_grapheme: 'l',
    total_frequency: 7638,
    frequency_percent: 88.15,
    weighted_total: 11837915.73,
    weighted_percent: 75.95,
    graphemes: [
      { grapheme: 'l', frequency_total: 7638, frequency_percent: 88.15, weighted_total: 11837915.73, weighted_percent: 75.95, usage_label: 'Primary' },
      { grapheme: 'll', frequency_total: 1027, frequency_percent: 11.85, weighted_total: 3747532.03, weighted_percent: 24.05, usage_label: 'Secondary' }
    ]
  },
  {
    phoneme: '/r/',
    primary_grapheme: 'r',
    total_frequency: 10271,
    frequency_percent: 96.38,
    weighted_total: 19580092.51,
    weighted_percent: 97.02,
    graphemes: [
      { grapheme: 'r', frequency_total: 10271, frequency_percent: 96.38, weighted_total: 19580092.51, weighted_percent: 97.02, usage_label: 'Primary' },
      { grapheme: 'rr', frequency_total: 267, frequency_percent: 2.51, weighted_total: 430091.29, weighted_percent: 2.13, usage_label: 'Rare' },
      { grapheme: 'wr', frequency_total: 103, frequency_percent: 0.97, weighted_total: 165941.18, weighted_percent: 0.82, usage_label: 'Exception' },
      { grapheme: 'rh', frequency_total: 16, frequency_percent: 0.15, weighted_total: 4538.41, weighted_percent: 0.02, usage_label: 'Exception' }
    ]
  },
  {
    phoneme: '/h/',
    primary_grapheme: 'h',
    total_frequency: 1353,
    frequency_percent: 98.69,
    weighted_total: 8997666.60,
    weighted_percent: 94.16,
    graphemes: [
      { grapheme: 'h', frequency_total: 1353, frequency_percent: 98.69, weighted_total: 8997666.60, weighted_percent: 94.16, usage_label: 'Primary' },
      { grapheme: 'wh', frequency_total: 13, frequency_percent: 0.95, weighted_total: 557017.71, weighted_percent: 5.83, usage_label: 'Exception' },
      { grapheme: 'j', frequency_total: 5, frequency_percent: 0.36, weighted_total: 1207.69, weighted_percent: 0.01, usage_label: 'Exception' }
    ]
  },
  {
    phoneme: '/w/',
    primary_grapheme: 'w',
    total_frequency: 1155,
    frequency_percent: 85.62,
    weighted_total: 8327455.60,
    weighted_percent: 78.39,
    graphemes: [
      { grapheme: 'w', frequency_total: 1155, frequency_percent: 85.62, weighted_total: 8327455.60, weighted_percent: 78.39, usage_label: 'Primary' },
      { grapheme: 'wh', frequency_total: 135, frequency_percent: 10.01, weighted_total: 2256577.93, weighted_percent: 21.24, usage_label: 'Secondary' },
      { grapheme: 'u', frequency_total: 49, frequency_percent: 3.63, weighted_total: 36617.36, weighted_percent: 0.34, usage_label: 'Rare' },
      { grapheme: 'o', frequency_total: 10, frequency_percent: 0.74, weighted_total: 2766.30, weighted_percent: 0.03, usage_label: 'Exception' }
    ]
  },
  {
    phoneme: '/y/',
    primary_grapheme: 'y',
    total_frequency: 140,
    frequency_percent: 54.47,
    weighted_total: 4509208.59,
    weighted_percent: 95.81,
    graphemes: [
      { grapheme: 'y', frequency_total: 140, frequency_percent: 54.47, weighted_total: 4509208.59, weighted_percent: 95.81, usage_label: 'Primary' },
      { grapheme: 'i', frequency_total: 112, frequency_percent: 43.58, weighted_total: 196300.39, weighted_percent: 4.17, usage_label: 'Secondary' },
      { grapheme: 'j', frequency_total: 3, frequency_percent: 1.17, weighted_total: 733.30, weighted_percent: 0.02, usage_label: 'Rare' },
      { grapheme: 'll', frequency_total: 1, frequency_percent: 0.39, weighted_total: 332.72, weighted_percent: 0.01, usage_label: 'Exception' },
      { grapheme: 'g', frequency_total: 1, frequency_percent: 0.39, weighted_total: 31.18, weighted_percent: 0.00, usage_label: 'Exception' }
    ]
  },
  {
    phoneme: '/j/',
    primary_grapheme: 'j',
    total_frequency: 461,
    frequency_percent: 31.86,
    weighted_total: 937141.94,
    weighted_percent: 43.60,
    graphemes: [
      { grapheme: 'j', frequency_total: 461, frequency_percent: 31.86, weighted_total: 937141.94, weighted_percent: 43.60, usage_label: 'Secondary' },
      { grapheme: 'g', frequency_total: 599, frequency_percent: 41.40, weighted_total: 617637.13, weighted_percent: 28.74, usage_label: 'Secondary' },
      { grapheme: 'ge', frequency_total: 171, frequency_percent: 11.82, weighted_total: 386256.88, weighted_percent: 17.97, usage_label: 'Secondary' },
      { grapheme: 'dge', frequency_total: 59, frequency_percent: 4.08, weighted_total: 66170.57, weighted_percent: 3.08, usage_label: 'Rare' },
      { grapheme: 'd', frequency_total: 30, frequency_percent: 2.07, weighted_total: 34647.20, weighted_percent: 1.61, usage_label: 'Rare' },
      { grapheme: 'gi', frequency_total: 25, frequency_percent: 1.73, weighted_total: 34560.44, weighted_percent: 1.61, usage_label: 'Rare' },
      { grapheme: 'dg', frequency_total: 68, frequency_percent: 4.70, weighted_total: 23523.35, weighted_percent: 1.09, usage_label: 'Rare' },
      { grapheme: 'di', frequency_total: 7, frequency_percent: 0.48, weighted_total: 22564.43, weighted_percent: 1.05, usage_label: 'Exception' },
      { grapheme: 'gg', frequency_total: 11, frequency_percent: 0.76, weighted_total: 21099.28, weighted_percent: 0.98, usage_label: 'Exception' },
      { grapheme: 'dj', frequency_total: 16, frequency_percent: 1.11, weighted_total: 5819.97, weighted_percent: 0.27, usage_label: 'Rare' }
    ]
  },

  // DIGRAPHS AND BLENDS
  {
    phoneme: '/sh/',
    primary_grapheme: 'sh',
    total_frequency: 971,
    frequency_percent: 39.73,
    weighted_total: 1841411.21,
    weighted_percent: 54.10,
    graphemes: [
      { grapheme: 'sh', frequency_total: 971, frequency_percent: 54.10, weighted_total: 1841411.21, weighted_percent: 54.10, usage_label: 'Primary' },
      { grapheme: 'ti', frequency_total: 1078, frequency_percent: 28.55, weighted_total: 971826.35, weighted_percent: 28.55, usage_label: 'Secondary' },
      { grapheme: 'ci', frequency_total: 123, frequency_percent: 4.43, weighted_total: 150736.44, weighted_percent: 4.43, usage_label: 'Secondary' },
      { grapheme: 'si', frequency_total: 73, frequency_percent: 3.67, weighted_total: 124772.29, weighted_percent: 3.67, usage_label: 'Rare' },
      { grapheme: 'ssi', frequency_total: 22, frequency_percent: 3.00, weighted_total: 12997.33, weighted_percent: 3.00, usage_label: 'Rare' },
      { grapheme: 's', frequency_total: 23, frequency_percent: 2.00, weighted_total: 193499.38, weighted_percent: 2.00, usage_label: 'Exception' },
      { grapheme: 'ss', frequency_total: 15, frequency_percent: 1.00, weighted_total: 26856.62, weighted_percent: 1.00, usage_label: 'Exception' },
      { grapheme: 'ch', frequency_total: 63, frequency_percent: 0.85, weighted_total: 29078.81, weighted_percent: 0.85, usage_label: 'Exception' }
    ]
  },
  {
    phoneme: '/ch/',
    primary_grapheme: 'ch',
    total_frequency: 753,
    frequency_percent: 65.54,
    weighted_total: 1775433.29,
    weighted_percent: 77.90,
    graphemes: [
      { grapheme: 'ch', frequency_total: 753, frequency_percent: 65.54, weighted_total: 1775433.29, weighted_percent: 77.90, usage_label: 'Primary' },
      { grapheme: 't', frequency_total: 184, frequency_percent: 16.01, weighted_total: 297950.40, weighted_percent: 13.07, usage_label: 'Secondary' },
      { grapheme: 'tch', frequency_total: 196, frequency_percent: 17.06, weighted_total: 151789.44, weighted_percent: 6.66, usage_label: 'Secondary' },
      { grapheme: 'ti', frequency_total: 11, frequency_percent: 0.96, weighted_total: 53668.64, weighted_percent: 2.35, usage_label: 'Exception' },
      { grapheme: 'c', frequency_total: 4, frequency_percent: 0.35, weighted_total: 368.16, weighted_percent: 0.02, usage_label: 'Exception' },
      { grapheme: 'tl', frequency_total: 1, frequency_percent: 0.09, weighted_total: 2.50, weighted_percent: 0.00, usage_label: 'Exception' }
    ]
  },
  {
    phoneme: '/th/',
    primary_grapheme: 'th',
    total_frequency: 660,
    frequency_percent: 100.00,
    weighted_total: 3461508.65,
    weighted_percent: 100.00,
    graphemes: [
      { grapheme: 'th', frequency_total: 660, frequency_percent: 100.00, weighted_total: 3461508.65, weighted_percent: 100.00, usage_label: 'Primary' }
    ]
  },
  {
    phoneme: '/th(v)/',
    primary_grapheme: 'th',
    total_frequency: 186,
    frequency_percent: 88.57,
    weighted_total: 21522822.01,
    weighted_percent: 99.90,
    graphemes: [
      { grapheme: 'th', frequency_total: 186, frequency_percent: 88.57, weighted_total: 21522822.01, weighted_percent: 99.90, usage_label: 'Primary' },
      { grapheme: 'the', frequency_total: 24, frequency_percent: 11.43, weighted_total: 22289.47, weighted_percent: 0.10, usage_label: 'Secondary' }
    ]
  },
  {
    phoneme: '/zh/',
    primary_grapheme: 'si',
    total_frequency: 97,
    frequency_percent: 61.39,
    weighted_total: 94240.96,
    weighted_percent: 50.17,
    graphemes: [
      { grapheme: 'si', frequency_total: 97, frequency_percent: 61.39, weighted_total: 94240.96, weighted_percent: 50.17, usage_label: 'Primary' },
      { grapheme: 's', frequency_total: 31, frequency_percent: 19.62, weighted_total: 85888.88, weighted_percent: 45.72, usage_label: 'Secondary' },
      { grapheme: 'ge', frequency_total: 14, frequency_percent: 8.86, weighted_total: 4754.86, weighted_percent: 2.53, usage_label: 'Rare' },
      { grapheme: 'g', frequency_total: 8, frequency_percent: 5.06, weighted_total: 1106.02, weighted_percent: 0.59, usage_label: 'Rare' },
      { grapheme: 'z', frequency_total: 2, frequency_percent: 1.27, weighted_total: 977.69, weighted_percent: 0.52, usage_label: 'Rare' },
      { grapheme: 'ti', frequency_total: 2, frequency_percent: 1.27, weighted_total: 415.73, weighted_percent: 0.22, usage_label: 'Rare' },
      { grapheme: 'ci', frequency_total: 1, frequency_percent: 0.63, weighted_total: 190.04, weighted_percent: 0.10, usage_label: 'Exception' },
      { grapheme: 'ss', frequency_total: 2, frequency_percent: 1.27, weighted_total: 180.92, weighted_percent: 0.10, usage_label: 'Rare' },
      { grapheme: 'j', frequency_total: 1, frequency_percent: 0.63, weighted_total: 99.30, weighted_percent: 0.05, usage_label: 'Exception' }
    ]
  },
  {
    phoneme: '/ng/',
    primary_grapheme: 'ng',
    total_frequency: 3535,
    frequency_percent: 87.07,
    weighted_total: 4150634.86,
    weighted_percent: 82.91,
    graphemes: [
      { grapheme: 'ng', frequency_total: 3535, frequency_percent: 87.07, weighted_total: 4150634.86, weighted_percent: 82.91, usage_label: 'Primary' },
      { grapheme: 'n', frequency_total: 519, frequency_percent: 12.78, weighted_total: 844914.55, weighted_percent: 16.88, usage_label: 'Secondary' },
      { grapheme: 'ngue', frequency_total: 6, frequency_percent: 0.15, weighted_total: 10445.03, weighted_percent: 0.21, usage_label: 'Exception' }
    ]
  },
  {
    phoneme: '/kw/',
    primary_grapheme: 'qu',
    total_frequency: 334,
    frequency_percent: 94.89,
    weighted_total: 382610.22,
    weighted_percent: 95.69,
    graphemes: [
      { grapheme: 'qu', frequency_total: 334, frequency_percent: 94.89, weighted_total: 382610.22, weighted_percent: 95.69, usage_label: 'Primary' },
      { grapheme: 'cqu', frequency_total: 18, frequency_percent: 5.11, weighted_total: 17246.65, weighted_percent: 4.31, usage_label: 'Rare' }
    ]
  },
  {
    phoneme: '/ks/',
    primary_grapheme: 'x',
    total_frequency: 646,
    frequency_percent: 99.54,
    weighted_total: 721828.91,
    weighted_percent: 99.77,
    graphemes: [
      { grapheme: 'x', frequency_total: 646, frequency_percent: 99.54, weighted_total: 721828.91, weighted_percent: 99.77, usage_label: 'Primary' },
      { grapheme: 'xe', frequency_total: 3, frequency_percent: 0.46, weighted_total: 1658.21, weighted_percent: 0.23, usage_label: 'Exception' }
    ]
  },

  // DIPHTHONGS
  {
    phoneme: '/aw/',
    primary_grapheme: 'a',
    total_frequency: 1510,
    frequency_percent: 73.95,
    weighted_total: 3908972.70,
    weighted_percent: 83.87,
    graphemes: [
      { grapheme: 'a', frequency_total: 1510, frequency_percent: 73.95, weighted_total: 3908972.70, weighted_percent: 83.87, usage_label: 'Primary' },
      { grapheme: 'aw', frequency_total: 167, frequency_percent: 8.18, weighted_total: 222133.37, weighted_percent: 4.77, usage_label: 'Rare' },
      { grapheme: 'au', frequency_total: 273, frequency_percent: 13.37, weighted_total: 180893.55, weighted_percent: 3.88, usage_label: 'Secondary' },
      { grapheme: 'al', frequency_total: 30, frequency_percent: 1.47, weighted_total: 171684.07, weighted_percent: 3.68, usage_label: 'Rare' },
      { grapheme: 'ea', frequency_total: 29, frequency_percent: 1.42, weighted_total: 85184.34, weighted_percent: 1.83, usage_label: 'Rare' },
      { grapheme: 'augh', frequency_total: 17, frequency_percent: 0.83, weighted_total: 67099.80, weighted_percent: 1.44, usage_label: 'Exception' },
      { grapheme: 'ah', frequency_total: 4, frequency_percent: 0.20, weighted_total: 19356.51, weighted_percent: 0.42, usage_label: 'Exception' },
      { grapheme: 'awe', frequency_total: 6, frequency_percent: 0.29, weighted_total: 3787.37, weighted_percent: 0.08, usage_label: 'Exception' },
      { grapheme: 'i', frequency_total: 6, frequency_percent: 0.29, weighted_total: 1441.06, weighted_percent: 0.03, usage_label: 'Exception' }
    ]
  },
  {
    phoneme: '/ow/',
    primary_grapheme: 'ou',
    total_frequency: 528,
    frequency_percent: 67.43,
    weighted_total: 2120075.90,
    weighted_percent: 65.59,
    graphemes: [
      { grapheme: 'ou', frequency_total: 528, frequency_percent: 67.43, weighted_total: 2120075.90, weighted_percent: 65.59, usage_label: 'Primary' },
      { grapheme: 'ow', frequency_total: 249, frequency_percent: 31.80, weighted_total: 1109544.75, weighted_percent: 34.32, usage_label: 'Secondary' },
      { grapheme: 'ough', frequency_total: 6, frequency_percent: 0.77, weighted_total: 2896.92, weighted_percent: 0.09, usage_label: 'Exception' }
    ]
  },
  {
    phoneme: '/oy/',
    primary_grapheme: 'oi',
    total_frequency: 179,
    frequency_percent: 61.72,
    weighted_total: 236381.31,
    weighted_percent: 53.81,
    graphemes: [
      { grapheme: 'oi', frequency_total: 179, frequency_percent: 61.72, weighted_total: 236381.31, weighted_percent: 53.81, usage_label: 'Primary' },
      { grapheme: 'oy', frequency_total: 111, frequency_percent: 38.28, weighted_total: 202916.95, weighted_percent: 46.19, usage_label: 'Secondary' }
    ]
  },
  {
    phoneme: '/oo/',
    primary_grapheme: 'oo',
    total_frequency: 185,
    frequency_percent: 45.79,
    weighted_total: 838291.91,
    weighted_percent: 38.16,
    graphemes: [
      { grapheme: 'oo', frequency_total: 185, frequency_percent: 45.79, weighted_total: 838291.91, weighted_percent: 38.16, usage_label: 'Secondary' },
      { grapheme: 'oul', frequency_total: 7, frequency_percent: 1.73, weighted_total: 844557.35, weighted_percent: 38.45, usage_label: 'Rare' },
      { grapheme: 'u', frequency_total: 200, frequency_percent: 49.50, weighted_total: 434429.69, weighted_percent: 19.78, usage_label: 'Secondary' },
      { grapheme: 'o', frequency_total: 10, frequency_percent: 2.48, weighted_total: 79088.16, weighted_percent: 3.60, usage_label: 'Rare' },
      { grapheme: 'ou', frequency_total: 2, frequency_percent: 0.50, weighted_total: 391.33, weighted_percent: 0.02, usage_label: 'Exception' }
    ]
  },

  // R-CONTROLLED VOWELS
  {
    phoneme: '/er/',
    primary_grapheme: 'er',
    total_frequency: 3916,
    frequency_percent: 67.01,
    weighted_total: 6359311.35,
    weighted_percent: 63.19,
    graphemes: [
      { grapheme: 'er', frequency_total: 3916, frequency_percent: 67.01, weighted_total: 6359311.35, weighted_percent: 63.19, usage_label: 'Primary' },
      { grapheme: 'or', frequency_total: 615, frequency_percent: 10.52, weighted_total: 895874.83, weighted_percent: 8.90, usage_label: 'Secondary' },
      { grapheme: 'ur', frequency_total: 434, frequency_percent: 7.43, weighted_total: 627090.31, weighted_percent: 6.23, usage_label: 'Rare' },
      { grapheme: 'ir', frequency_total: 212, frequency_percent: 3.63, weighted_total: 498658.94, weighted_percent: 4.95, usage_label: 'Rare' },
      { grapheme: 'ere', frequency_total: 2, frequency_percent: 0.03, weighted_total: 442426.19, weighted_percent: 4.40, usage_label: 'Exception' },
      { grapheme: 'ure', frequency_total: 120, frequency_percent: 2.05, weighted_total: 315398.73, weighted_percent: 3.13, usage_label: 'Rare' },
      { grapheme: 'ar', frequency_total: 190, frequency_percent: 3.25, weighted_total: 239483.17, weighted_percent: 2.38, usage_label: 'Rare' },
      { grapheme: 'ear', frequency_total: 60, frequency_percent: 1.03, weighted_total: 215502.08, weighted_percent: 2.14, usage_label: 'Rare' },
      { grapheme: 're', frequency_total: 97, frequency_percent: 1.66, weighted_total: 189762.66, weighted_percent: 1.89, usage_label: 'Rare' },
      { grapheme: 'r', frequency_total: 32, frequency_percent: 0.55, weighted_total: 110404.38, weighted_percent: 1.10, usage_label: 'Exception' },
      { grapheme: 'urr', frequency_total: 59, frequency_percent: 1.01, weighted_total: 61143.69, weighted_percent: 0.61, usage_label: 'Rare' },
      { grapheme: 'our', frequency_total: 51, frequency_percent: 0.87, weighted_total: 37350.46, weighted_percent: 0.37, usage_label: 'Exception' },
      { grapheme: 'orr', frequency_total: 4, frequency_percent: 0.07, weighted_total: 29438.42, weighted_percent: 0.29, usage_label: 'Exception' },
      { grapheme: 'err', frequency_total: 30, frequency_percent: 0.51, weighted_total: 23029.25, weighted_percent: 0.23, usage_label: 'Exception' },
      { grapheme: 'ro', frequency_total: 5, frequency_percent: 0.09, weighted_total: 11432.20, weighted_percent: 0.11, usage_label: 'Exception' },
      { grapheme: 'irr', frequency_total: 8, frequency_percent: 0.14, weighted_total: 6011.42, weighted_percent: 0.06, usage_label: 'Exception' },
      { grapheme: 'yr', frequency_total: 9, frequency_percent: 0.15, weighted_total: 2058.31, weighted_percent: 0.02, usage_label: 'Exception' }
    ]
  },

  // SCHWA-L COMBINATIONS
  {
    phoneme: '/ŭl/',
    primary_grapheme: 'le',
    total_frequency: 860,
    frequency_percent: 45.79,
    weighted_total: 1132471.50,
    weighted_percent: 54.77,
    graphemes: [
      { grapheme: 'le', frequency_total: 860, frequency_percent: 45.79, weighted_total: 1132471.50, weighted_percent: 54.77, usage_label: 'Secondary' },
      { grapheme: 'al', frequency_total: 621, frequency_percent: 33.07, weighted_total: 672332.87, weighted_percent: 32.52, usage_label: 'Secondary' },
      { grapheme: 'el', frequency_total: 169, frequency_percent: 9.00, weighted_total: 109820.41, weighted_percent: 5.31, usage_label: 'Rare' },
      { grapheme: 'l', frequency_total: 91, frequency_percent: 4.85, weighted_total: 62556.45, weighted_percent: 3.03, usage_label: 'Rare' },
      { grapheme: 'il', frequency_total: 59, frequency_percent: 3.14, weighted_total: 54961.51, weighted_percent: 2.66, usage_label: 'Rare' },
      { grapheme: 'all', frequency_total: 44, frequency_percent: 2.34, weighted_total: 26850.20, weighted_percent: 1.30, usage_label: 'Rare' },
      { grapheme: 'ol', frequency_total: 8, frequency_percent: 0.43, weighted_total: 6898.80, weighted_percent: 0.33, usage_label: 'Exception' },
      { grapheme: 'ul', frequency_total: 9, frequency_percent: 0.48, weighted_total: 769.80, weighted_percent: 0.04, usage_label: 'Exception' },
      { grapheme: 'yl', frequency_total: 6, frequency_percent: 0.32, weighted_total: 603.02, weighted_percent: 0.03, usage_label: 'Exception' },
      { grapheme: 'ell', frequency_total: 3, frequency_percent: 0.16, weighted_total: 286.88, weighted_percent: 0.01, usage_label: 'Exception' },
      { grapheme: 'ull', frequency_total: 6, frequency_percent: 0.32, weighted_total: 124.18, weighted_percent: 0.01, usage_label: 'Exception' },
      { grapheme: 'ill', frequency_total: 2, frequency_percent: 0.11, weighted_total: 1.00, weighted_percent: 0.00, usage_label: 'Exception' }
    ]
  },

  // LONG U WITH Y GLIDE
  {
    phoneme: '/yū/',
    primary_grapheme: 'u',
    total_frequency: 600,
    frequency_percent: 76.82,
    weighted_total: 647090.87,
    weighted_percent: 61.86,
    graphemes: [
      { grapheme: 'u', frequency_total: 600, frequency_percent: 76.82, weighted_total: 647090.87, weighted_percent: 61.86, usage_label: 'Primary' },
      { grapheme: 'u.e', frequency_total: 94, frequency_percent: 12.04, weighted_total: 223821.48, weighted_percent: 21.40, usage_label: 'Secondary' },
      { grapheme: 'ew', frequency_total: 26, frequency_percent: 3.33, weighted_total: 71173.33, weighted_percent: 6.80, usage_label: 'Rare' },
      { grapheme: 'eau', frequency_total: 11, frequency_percent: 1.41, weighted_total: 58296.59, weighted_percent: 5.57, usage_label: 'Rare' },
      { grapheme: 'ue', frequency_total: 28, frequency_percent: 3.59, weighted_total: 41147.90, weighted_percent: 3.93, usage_label: 'Rare' },
      { grapheme: 'eu', frequency_total: 17, frequency_percent: 2.18, weighted_total: 3236.84, weighted_percent: 0.31, usage_label: 'Rare' },
      { grapheme: 'ou', frequency_total: 1, frequency_percent: 0.13, weighted_total: 702.00, weighted_percent: 0.07, usage_label: 'Exception' },
      { grapheme: 'uu', frequency_total: 4, frequency_percent: 0.51, weighted_total: 624.14, weighted_percent: 0.06, usage_label: 'Exception' }
    ]
  }
];

// Aliases for phoneme lookups (handles different notation formats)
const PHONEME_ALIASES: Record<string, string> = {
  // Short vowels with breve
  'ă': '/ă/',
  'ĕ': '/ĕ/',
  'ĭ': '/ĭ/',
  'ŏ': '/ŏ/',
  'ŭ': '/ŭ/',
  // Long vowels with macron
  'ā': '/ā/',
  'ē': '/ē/',
  'ī': '/ī/',
  'ō': '/ō/',
  'ū': '/ū/',
  // Plain vowels (default to short)
  'a': '/ă/',
  'e': '/ĕ/',
  'i': '/ĭ/',
  'o': '/ŏ/',
  'u': '/ŭ/',
  // Common alternates
  'short a': '/ă/',
  'short e': '/ĕ/',
  'short i': '/ĭ/',
  'short o': '/ŏ/',
  'short u': '/ŭ/',
  'long a': '/ā/',
  'long e': '/ē/',
  'long i': '/ī/',
  'long o': '/ō/',
  'long u': '/ū/',
  // Consonants
  'm': '/m/',
  'n': '/n/',
  'p': '/p/',
  'b': '/b/',
  't': '/t/',
  'd': '/d/',
  'k': '/k/',
  'g': '/g/',
  'f': '/f/',
  'v': '/v/',
  's': '/s/',
  'z': '/z/',
  'l': '/l/',
  'r': '/r/',
  'h': '/h/',
  'w': '/w/',
  'y': '/y/',
  'j': '/j/',
  // Digraphs
  'sh': '/sh/',
  'ch': '/ch/',
  'th': '/th/',
  'voiced th': '/th(v)/',
  'unvoiced th': '/th/',
  'ng': '/ng/',
  'zh': '/zh/',
  // Blends
  'qu': '/kw/',
  'kw': '/kw/',
  'x': '/ks/',
  'ks': '/ks/',
  // Diphthongs
  'aw': '/aw/',
  'au': '/aw/',
  'ow': '/ow/',
  'ou': '/ow/',
  'oy': '/oy/',
  'oi': '/oy/',
  'oo': '/oo/',
  // R-controlled
  'er': '/er/',
  'ir': '/er/',
  'ur': '/er/',
  'ar': '/er/',
  'or': '/er/',
  // Special
  'yū': '/yū/',
  'yu': '/yū/',
  'ŭl': '/ŭl/',
  'ul': '/ŭl/',
  'schwa l': '/ŭl/'
};

/**
 * Look up frequency data for a phoneme
 * Handles multiple notation formats (with/without slashes, breve, macron, etc.)
 */
export function getPhonemeFrequencyData(phonemeSymbol: string): PhonemeFrequencyData | null {
  if (!phonemeSymbol) return null;

  // Normalize the input
  const normalized = phonemeSymbol.trim().toLowerCase();

  // Try direct match first
  let match = COMPREHENSIVE_PHONEME_FREQUENCIES.find(
    p => p.phoneme.toLowerCase() === normalized ||
         p.phoneme.toLowerCase() === `/${normalized}/`
  );

  if (match) return match;

  // Try alias lookup
  const aliasKey = PHONEME_ALIASES[normalized] || PHONEME_ALIASES[normalized.replace(/^\/|\/$/g, '')];
  if (aliasKey) {
    match = COMPREHENSIVE_PHONEME_FREQUENCIES.find(p => p.phoneme === aliasKey);
    if (match) return match;
  }

  // Try without slashes
  const withoutSlashes = normalized.replace(/^\/|\/$/g, '');
  match = COMPREHENSIVE_PHONEME_FREQUENCIES.find(
    p => p.phoneme.replace(/^\/|\/$/g, '').toLowerCase() === withoutSlashes
  );

  return match || null;
}

/**
 * Get grapheme frequency data for a phoneme
 * Returns array of graphemes sorted by frequency (most common first)
 */
export function getGraphemeFrequenciesForPhoneme(phonemeSymbol: string): GraphemeFrequencyData[] {
  const phonemeData = getPhonemeFrequencyData(phonemeSymbol);
  if (!phonemeData) return [];

  // Return graphemes sorted by weighted_percent (most common first)
  return [...phonemeData.graphemes].sort((a, b) => b.weighted_percent - a.weighted_percent);
}

