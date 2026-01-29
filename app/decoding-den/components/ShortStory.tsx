import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// Story can be either a simple string or an object with metadata
interface StoryObject {
  title: string;
  text: string;
  level: 'easy' | 'medium' | 'advanced';
  word_count: number;
}

type StoryItem = string | StoryObject;

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
    notes?: string;
  }>;
  articulation: {
    place_of_articulation: string;
    manner_of_articulation: string;
    voicing: string;
    tongue_position: string;
    lip_position: string;
    airflow_description: string;
    step_by_step_instructions: string[];
    common_errors: string[];
    teacher_tips: string[];
  } | null;
  teaching_content: {
    explanations: Array<{ content: string; icon_emoji: string }>;
    rules: Array<{ content: string; icon_emoji: string }>;
    tips: Array<{ content: string; icon_emoji: string }>;
  };
  word_lists: {
    [grapheme: string]: {
      beginning: string[];
      medial: string[];
      ending: string[];
    };
  };
  practice_texts: {
    sentences: string[];
    stories: StoryItem[];
    word_ladders: string[];
  };
  research_citations: Array<{
    source_name: string;
    citation_text: string;
    url?: string;
  }>;
}

interface ShortStoryProps {
  phonemeData: PhonemeData;
  onClose?: () => void;
}

// Helper to check if story is an object or string
function isStoryObject(story: StoryItem): story is StoryObject {
  return typeof story === 'object' && story !== null && 'text' in story;
}

// Helper to get level badge styling
function getLevelBadge(level: string): { bg: string; text: string; label: string } {
  switch (level) {
    case 'easy':
      return { bg: 'bg-green-500', text: 'text-white', label: 'Easy' };
    case 'medium':
      return { bg: 'bg-yellow-500', text: 'text-white', label: 'Medium' };
    case 'advanced':
      return { bg: 'bg-red-500', text: 'text-white', label: 'Advanced' };
    default:
      return { bg: 'bg-gray-500', text: 'text-white', label: level };
  }
}

export default function ShortStory({ phonemeData }: ShortStoryProps) {
  // State to track which stories are expanded (all expanded by default)
  const [expandedStories, setExpandedStories] = useState<boolean[]>([]);

  // Get stories from practice texts
  const stories: StoryItem[] = phonemeData.practice_texts?.stories || [];
  
  // Initialize expanded stories if not already set
  useEffect(() => {
    if (expandedStories.length !== stories.length) {
      setExpandedStories(new Array(stories.length).fill(false));
    }
  }, [stories.length, expandedStories.length]);

  if (!phonemeData) return null;

  const { practice_texts, phoneme } = phonemeData;

  // Toggle function for individual stories
  const toggleStory = (index: number) => {
    setExpandedStories(prev => 
      prev.map((expanded, i) => i === index ? !expanded : expanded)
    );
  };

  // If no stories, show empty state
  if (stories.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
        <Image 
          src="/images/short story.png" 
          alt="Short Story" 
          width={64} 
          height={64} 
          className="mx-auto mb-4"
        />
        <p className="text-gray-600">
          Short stories for {phoneme?.ipa_symbol || 'this phoneme'} are being developed.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Check back soon for engaging, decodable stories!
        </p>
      </div>
    );
  }


  return (
    <div className="space-y-6">

      {/* Stories */}
      {stories.map((story, index) => {
        const storyObj = isStoryObject(story) ? story : null;
        const storyText: string = storyObj ? storyObj.text : (story as string);
        const storyTitle = storyObj?.title || `Story ${index + 1}`;
        const levelBadge = storyObj ? getLevelBadge(storyObj.level) : null;

        return (
          <div key={index} className="rounded-xl p-4 border border-blue-200 shadow-lg bg-gradient-to-br from-blue-200 to-blue-400">
            <div className="mb-1">
              {/* Clickable Header */}
              <div
                className="flex items-center justify-between mb-2 cursor-pointer hover:bg-white/10 rounded-lg p-2 transition-colors"
                onClick={() => toggleStory(index)}
              >
                <h3 className="text-2xl font-bold text-deepNavy flex items-center">
                  <Image
                    src="/images/short story.png"
                    alt="Short Story"
                    width={32}
                    height={32}
                    className="mr-2"
                  />
                  {storyTitle}
                  {/* Expand/Collapse Arrow */}
                  <span className="ml-2 text-deepNavy transition-transform duration-200">
                    {expandedStories[index] ? (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    )}
                  </span>
                </h3>
                <div className="flex items-center gap-2">
                  {/* Level Badge */}
                  {levelBadge && (
                    <div className={`${levelBadge.bg} ${levelBadge.text} px-3 py-1 rounded-full text-sm font-medium`}>
                      {levelBadge.label}
                    </div>
                  )}
                  {/* Word Count Badge */}
                  {storyObj?.word_count && (
                    <div className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {storyObj.word_count} words
                    </div>
                  )}
                  {/* Target Phoneme Badge */}
                  <div className="bg-oceanBlue text-white px-3 py-1 rounded-full text-sm font-medium">
                    Target: {phoneme.ipa_symbol}
                  </div>
                </div>
              </div>
            </div>

            {/* Collapsible Story Content */}
            {expandedStories[index] && (
              <div className="bg-white rounded-lg p-3 border border-blue-100 shadow-sm transition-all duration-300 ease-in-out">
                <div className="prose prose-lg max-w-none">
                  {storyText.split('\n').map((paragraph: string, pIndex: number) => (
                    <p key={pIndex} className="text-gray-800 leading-relaxed text-xl mb-4 last:mb-0">
                      {paragraph.trim()}
                    </p>
                  ))}
                </div>
              </div>
            )}

          </div>
        );
      })}

      {/* Reading Activities */}
      <div className="bg-green-50 rounded-lg p-6 border border-green-200">
        <h4 className="text-lg font-semibold text-deepNavy mb-4">📝 Reading Activities</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded p-4 border border-green-100">
            <h5 className="font-medium text-deepNavy mb-2">👥 Shared Reading</h5>
            <p className="text-sm text-gray-700">Read the story together as a class, with students following along.</p>
          </div>
          <div className="bg-white rounded p-4 border border-green-100">
            <h5 className="font-medium text-deepNavy mb-2">🔍 Sound Search</h5>
            <p className="text-sm text-gray-700">Have students find and circle all words with the target sound.</p>
          </div>
          <div className="bg-white rounded p-4 border border-green-100">
            <h5 className="font-medium text-deepNavy mb-2">🎭 Story Acting</h5>
            <p className="text-sm text-gray-700">Act out the story with students playing different characters.</p>
          </div>
          <div className="bg-white rounded p-4 border border-green-100">
            <h5 className="font-medium text-deepNavy mb-2">🖼️ Story Sequencing</h5>
            <p className="text-sm text-gray-700">Draw pictures of story events in the correct order.</p>
          </div>
        </div>
      </div>


      {/* Extension Activities */}
      <div className="bg-amber-50 rounded-lg p-6 border border-amber-200">
        <h4 className="text-lg font-semibold text-deepNavy mb-4">🚀 Extension Activities</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="bg-white rounded p-3 border border-amber-100">
              <strong className="text-amber-700">📖 Retelling:</strong>
              <p className="text-sm text-gray-700 mt-1">
                Have students retell the story in their own words.
              </p>
            </div>
            <div className="bg-white rounded p-3 border border-amber-100">
              <strong className="text-amber-700">✏️ Story Writing:</strong>
              <p className="text-sm text-gray-700 mt-1">
                Students write their own short story using the target sound.
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="bg-white rounded p-3 border border-amber-100">
              <strong className="text-amber-700">🎨 Story Illustration:</strong>
              <p className="text-sm text-gray-700 mt-1">
                Draw and color scenes from the story.
              </p>
            </div>
            <div className="bg-white rounded p-3 border border-amber-100">
              <strong className="text-amber-700">🗣️ Story Discussion:</strong>
              <p className="text-sm text-gray-700 mt-1">
                Talk about the characters&apos; feelings and motivations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Differentiation */}
      <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
        <h4 className="text-lg font-semibold text-deepNavy mb-4">🎯 Differentiation</h4>
        <div className="space-y-3">
          <div>
            <strong className="text-blue-700">Beginning Readers:</strong>
            <p className="text-sm text-gray-700 mt-1">
              Read the story aloud while students follow along. Focus on listening for the target sound.
            </p>
          </div>
          <div>
            <strong className="text-blue-700">Developing Readers:</strong>
            <p className="text-sm text-gray-700 mt-1">
              Students read along during shared reading and practice reading independently.
            </p>
          </div>
          <div>
            <strong className="text-blue-700">Advanced Readers:</strong>
            <p className="text-sm text-gray-700 mt-1">
              Independent reading with comprehension questions and creative extension activities.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}