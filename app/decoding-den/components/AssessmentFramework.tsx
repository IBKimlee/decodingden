import Image from 'next/image';
import { renderContentWithBold, renderAlignmentSpacer } from '@/app/utils/phonemeFormatting';

interface AssessmentDetails {
  assessment_type: string;
  frequency: string;
  focus_areas: string[];
  criteria: string[];
  tools?: string[];
  tips?: string[];
}

interface PhonemeData {
  phoneme: {
    id: string;
    ipa_symbol: string;
    common_name: string;
    phoneme_type: string;
    frequency_rank: number;
    is_voiced: boolean;
  };
  graphemes: Array<{
    id: string;
    grapheme: string;
    spelling_frequency: number;
    percentage?: number;
    usage_label?: 'Primary' | 'Secondary' | 'Rare' | 'Exception';
    context_notes?: string;
    notes?: string;
  }>;
  assessment_framework_details?: {
    daily_checks?: AssessmentDetails;
    weekly_reviews?: AssessmentDetails;
    summative_assessments?: AssessmentDetails;
    progress_monitoring?: AssessmentDetails;
    intervention_indicators?: string[];
    mastery_criteria?: string[];
  };
}

interface AssessmentFrameworkProps {
  phonemeData: PhonemeData;
  onClose?: () => void;
}

export default function AssessmentFramework({ phonemeData }: AssessmentFrameworkProps) {
  if (!phonemeData) return null;

  const { assessment_framework_details } = phonemeData;

  // If no assessment data, show empty state
  if (!assessment_framework_details) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <div className="text-4xl mb-4">📊</div>
          <p className="text-gray-600">
            Assessment framework for this phoneme is being developed.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Check back soon for assessment guidelines and tools!
          </p>
        </div>
      </div>
    );
  }

  const assessmentColors = {
    daily_checks: { bg: 'bg-blue-50', border: 'border-blue-200', icon: '📝' },
    weekly_reviews: { bg: 'bg-green-50', border: 'border-green-200', icon: '📅' },
    summative_assessments: { bg: 'bg-purple-50', border: 'border-purple-200', icon: '🎯' },
    progress_monitoring: { bg: 'bg-yellow-50', border: 'border-yellow-200', icon: '📈' }
  };

  const formatAssessmentTitle = (key: string): string => {
    return key.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="space-y-6">
      {/* Main Assessment Types */}
      {(['daily_checks', 'weekly_reviews', 'summative_assessments', 'progress_monitoring'] as const).map((assessmentType) => {
        const assessment = assessment_framework_details[assessmentType];
        if (!assessment) return null;

        const colors = assessmentColors[assessmentType];

        return (
          <div key={assessmentType} className={`${colors.bg} rounded-lg p-6 border ${colors.border}`}>
            <h3 className="text-xl font-semibold text-deepNavy mb-4 flex items-center">
              <span className="text-2xl mr-3">{colors.icon}</span>
              {formatAssessmentTitle(assessmentType)}
              {assessment.frequency && (
                <span className="ml-3 text-sm font-normal text-gray-600">
                  ({assessment.frequency})
                </span>
              )}
            </h3>

            {/* Focus Areas */}
            {assessment.focus_areas && assessment.focus_areas.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold text-gray-700 mb-2">Focus Areas:</h4>
                <div className="space-y-2 pl-4">
                  {assessment.focus_areas.map((area, index) => (
                    <div key={index} className="flex items-start space-x-1">
                      <span className="text-lg flex-shrink-0 font-black text-gray-700 -mt-0.5">•</span>
                      {renderAlignmentSpacer(area)}
                      <p className="text-gray-700">{renderContentWithBold(area)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Assessment Criteria */}
            {assessment.criteria && assessment.criteria.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold text-gray-700 mb-2">Assessment Criteria:</h4>
                <div className="grid md:grid-cols-2 gap-3 pl-4">
                  {assessment.criteria.map((criterion, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <span className="text-oceanBlue font-bold">✓</span>
                      <p className="text-gray-700 text-sm">{renderContentWithBold(criterion)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tools */}
            {assessment.tools && assessment.tools.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold text-gray-700 mb-2">Assessment Tools:</h4>
                <div className="flex flex-wrap gap-2 pl-4">
                  {assessment.tools.map((tool, index) => (
                    <span key={index} className="bg-white px-3 py-1 rounded-full text-sm border border-gray-300">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tips */}
            {assessment.tips && assessment.tips.length > 0 && (
              <div className="bg-white/50 rounded-lg p-3 border border-gray-200">
                <h4 className="font-semibold text-gray-700 mb-2 text-sm">💡 Tips:</h4>
                <div className="space-y-1">
                  {assessment.tips.map((tip, index) => (
                    <p key={index} className="text-sm text-gray-600 pl-4">
                      • {renderContentWithBold(tip)}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Intervention Indicators */}
      {assessment_framework_details.intervention_indicators && 
       assessment_framework_details.intervention_indicators.length > 0 && (
        <div className="bg-red-50 rounded-lg p-6 border border-red-200">
          <h3 className="text-xl font-semibold text-deepNavy mb-4 flex items-center">
            <span className="text-2xl mr-3">⚠️</span>
            Intervention Indicators
          </h3>
          <div className="space-y-2">
            {assessment_framework_details.intervention_indicators.map((indicator, index) => (
              <div key={index} className="flex items-start space-x-2 pl-4">
                <span className="text-red-500 font-bold">!</span>
                <p className="text-gray-700">{renderContentWithBold(indicator)}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mastery Criteria */}
      {assessment_framework_details.mastery_criteria && 
       assessment_framework_details.mastery_criteria.length > 0 && (
        <div className="bg-emerald-50 rounded-lg p-6 border border-emerald-200">
          <h3 className="text-xl font-semibold text-deepNavy mb-4 flex items-center">
            <span className="text-2xl mr-3">🏆</span>
            Mastery Criteria
          </h3>
          <div className="space-y-3">
            {assessment_framework_details.mastery_criteria.map((criterion, index) => (
              <div key={index} className="flex items-start space-x-2 pl-4">
                <span className="text-emerald-600 font-bold text-lg">✓</span>
                <p className="text-gray-700">{renderContentWithBold(criterion)}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Reference Card */}
      <div className="bg-oceanBlue/10 rounded-lg p-6 border border-oceanBlue/30">
        <h4 className="text-lg font-semibold text-deepNavy mb-4">📋 Assessment Quick Reference</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded p-4 border border-oceanBlue/20">
            <h5 className="font-semibold text-sm text-gray-700 mb-2">Frequency Guide:</h5>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• <strong>Daily:</strong> Quick formative checks</li>
              <li>• <strong>Weekly:</strong> Progress monitoring</li>
              <li>• <strong>Unit/Monthly:</strong> Summative assessments</li>
            </ul>
          </div>
          <div className="bg-white rounded p-4 border border-oceanBlue/20">
            <h5 className="font-semibold text-sm text-gray-700 mb-2">Data Collection:</h5>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Track accuracy rates</li>
              <li>• Note error patterns</li>
              <li>• Monitor fluency progress</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}