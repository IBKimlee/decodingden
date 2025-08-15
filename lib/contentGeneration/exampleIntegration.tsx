// 🎯 EXAMPLE INTEGRATION
// Demonstrates how to use enhanced content generation with existing UI components

import React from 'react';
import Image from 'next/image';
import { ContentIntegration, getEnhancedPhonemeData } from './uiIntegration';

/**
 * Enhanced Phoneme Insight Component Example
 * Shows how to integrate the content generation rules with the existing UI
 */
interface EnhancedPhonemeInsightProps {
  phoneme: string; // e.g., "/sh/"
  onClose?: () => void;
}

export function EnhancedPhonemeInsight({ phoneme }: EnhancedPhonemeInsightProps) {
  // Get all enhanced content data
  const enhancedData = ContentIntegration.getPhonemeInsightData(phoneme);
  const fullContent = getEnhancedPhonemeData(phoneme);
  
  if (!fullContent) {
    return (
      <div className="p-6 bg-yellow-50 rounded-lg border border-yellow-200">
        <h3 className="font-semibold text-yellow-800 mb-2">Content Generation in Progress</h3>
        <p className="text-yellow-700">
          Enhanced content for {phoneme} is being developed using our content generation rules.
          Basic framework data is available.
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      
      {/* Header with Stage Information */}
      <div className="bg-gradient-to-r from-oceanBlue to-lightOcean p-4 rounded-lg text-white">
        <h2 className="text-2xl font-bold">{phoneme}</h2>
        <p className="opacity-90">Stage {fullContent.stage} • {enhancedData.type?.category}</p>
      </div>
      
      {/* Frequency Section - Enhanced */}
      {enhancedData.frequency && (
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-deepNavy">Frequency Ranking</h3>
            <span className={`px-2 py-1 rounded text-sm font-bold ${
              enhancedData.frequency.badgeColor === 'green' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-blue-100 text-blue-800'
            }`}>
              #{enhancedData.frequency.rank}
            </span>
          </div>
          <p className="text-gray-700">{enhancedData.frequency.description}</p>
        </div>
      )}
      
      {/* Type Classification - Enhanced */}
      {enhancedData.type && (
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h3 className="font-semibold text-deepNavy mb-2">Phoneme Type</h3>
          <div className="space-y-1">
            <p className="font-medium text-oceanBlue">{enhancedData.type.category}</p>
            <p className="text-sm text-gray-600">{enhancedData.type.description}</p>
            <p className="text-xs text-gray-500 italic">{enhancedData.type.explanation}</p>
          </div>
        </div>
      )}
      
      {/* Spelling Patterns - Enhanced with Examples */}
      {enhancedData.spelling && (
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h3 className="font-semibold text-deepNavy mb-2">Most Common Spelling</h3>
          <p className="text-2xl font-bold text-oceanBlue mb-2">{enhancedData.spelling.mostCommon}</p>
          
          {enhancedData.spelling.hasAlternatives && (
            <div className="mt-3">
              <h4 className="font-medium text-sm text-gray-700 mb-1">Alternate Spellings</h4>
              <p className="text-sm text-gray-600">{enhancedData.spelling.alternativesList}</p>
            </div>
          )}
          
          {enhancedData.spelling.examples && (
            <div className="mt-3">
              <h4 className="font-medium text-sm text-gray-700 mb-2">Example Words by Spelling</h4>
              <div className="grid gap-2">
                {Object.entries(enhancedData.spelling.examples).map(([spelling, words]) => (
                  <div key={spelling} className="bg-gray-50 p-2 rounded">
                    <span className="font-mono font-bold text-oceanBlue">{spelling}:</span>{' '}
                    <span className="text-sm text-gray-700">{words.slice(0, 4).join(', ')}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Voicing Information - Enhanced */}
      {enhancedData.voicing && (
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Image src="/viocing.png" alt="Voicing" width={24} height={24} />
            <h3 className="font-semibold text-deepNavy">Voicing</h3>
          </div>
          <p className="text-lg font-medium text-oceanBlue">{enhancedData.voicing.fullText}</p>
        </div>
      )}
      
      {/* NEW: Articulation Guidance */}
      {enhancedData.articulation && (
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <h3 className="font-semibold text-deepNavy mb-3">🗣️ Articulation Guidance</h3>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-green-800 mb-1">Placement & Manner</h4>
              <p className="text-sm text-gray-700">{enhancedData.articulation.summary}</p>
            </div>
            <div>
              <h4 className="font-medium text-green-800 mb-1">Teaching Tips</h4>
              <p className="text-sm text-gray-700">{enhancedData.articulation.tipsText}</p>
            </div>
            <div>
              <h4 className="font-medium text-red-700 mb-1">Watch for Common Errors</h4>
              <p className="text-sm text-gray-700">{enhancedData.articulation.errorsText}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* NEW: Assessment Criteria */}
      {enhancedData.assessment && (
        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
          <h3 className="font-semibold text-deepNavy mb-3">📊 Assessment Criteria</h3>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-purple-800 mb-2">
                Mastery Indicators ({enhancedData.assessment.criteriaCount} total)
              </h4>
              <ul className="text-sm text-gray-700 space-y-1">
                {enhancedData.assessment.primaryCriteria.map((criteria, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    {criteria}
                  </li>
                ))}
                {enhancedData.assessment.stageCriteria.length > 0 && (
                  <li className="text-purple-600 italic">
                    + {enhancedData.assessment.stageCriteria.length} stage-specific criteria
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
      
      {/* NEW: Research Backing */}
      {enhancedData.research && (
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <h3 className="font-semibold text-deepNavy mb-3">📚 Research Foundation</h3>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-blue-800 mb-1">Pedagogical Rationale</h4>
              <p className="text-sm text-gray-700">{enhancedData.research.pedagogicalRationale}</p>
            </div>
            <div>
              <h4 className="font-medium text-blue-800 mb-1">
                Supporting Research ({enhancedData.research.citationCount} citations)
              </h4>
              <ul className="text-xs text-gray-600 space-y-1">
                {enhancedData.research.primaryCitations.map((citation, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    {citation}
                  </li>
                ))}
                {enhancedData.research.citationCount > 3 && (
                  <li className="text-blue-600 italic">
                    + {enhancedData.research.citationCount - 3} additional citations
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
      
      {/* Framework Status Indicator */}
      <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
          <p className="text-sm font-medium text-emerald-800">
            ✅ Enhanced with rule-based content generation
          </p>
        </div>
        <p className="text-xs text-emerald-600 mt-1">
          This content was automatically generated using our Science of Reading framework rules.
          All data is research-backed and aligned with the 8-stage progression system.
        </p>
      </div>
      
    </div>
  );
}

/**
 * Integration Example for existing components
 * Shows how to drop-in enhance any component that displays phoneme data
 */
export function useEnhancedPhonemeContent(phoneme: string) {
  const enhancedData = getEnhancedPhonemeData(phoneme);
  const hasContent = ContentIntegration.shouldShowContent(phoneme, 'all');
  
  return {
    // Direct access to all enhanced data
    enhancedData,
    hasContent,
    
    // Convenient display helpers
    frequency: ContentIntegration.getPhonemeInsightData(phoneme).frequency,
    type: ContentIntegration.getPhonemeInsightData(phoneme).type,
    spelling: ContentIntegration.getPhonemeInsightData(phoneme).spelling,
    voicing: ContentIntegration.getPhonemeInsightData(phoneme).voicing,
    articulation: ContentIntegration.getPhonemeInsightData(phoneme).articulation,
    assessment: ContentIntegration.getPhonemeInsightData(phoneme).assessment,
    research: ContentIntegration.getPhonemeInsightData(phoneme).research,
    
    // Fallback for when enhanced content isn't available
    fallback: ContentIntegration.getFallbackContent(phoneme)
  };
}

// Example usage in existing components:
/*
function YourExistingComponent({ phoneme }) {
  const { enhancedData, frequency, type, hasContent, fallback } = useEnhancedPhonemeContent(phoneme);
  
  return (
    <div>
      {hasContent ? (
        <>
          <h3>Frequency: {frequency?.description}</h3>
          <p>Type: {type?.category}</p>
          {enhancedData?.articulation && (
            <div>Articulation: {enhancedData.articulation.summary}</div>
          )}
        </>
      ) : (
        <div>Using fallback: {fallback.frequency.description}</div>
      )}
    </div>
  );
}
*/