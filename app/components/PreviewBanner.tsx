'use client';

import { useAuth } from '@/app/contexts/AuthContext';

export default function PreviewBanner() {
  const { isPreviewMode, previewStudent } = useAuth();

  if (!isPreviewMode) return null;

  const isGeneric = previewStudent?.id === 'preview-generic';
  const label = isGeneric
    ? 'Generic Student View'
    : `Viewing as: ${previewStudent?.display_name || previewStudent?.first_name || 'Student'}`;

  const handleExit = () => {
    // Close the tab if it was opened by the modal; otherwise navigate back
    if (typeof window !== 'undefined') {
      if (window.opener) {
        window.close();
      } else {
        window.location.href = '/teacher';
      }
    }
  };

  return (
    <div
      role="status"
      className="sticky top-0 z-50 w-full bg-red-600 text-white shadow-md"
    >
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <span aria-hidden="true" className="text-lg">🎭</span>
          <span>PREVIEW MODE</span>
          <span className="hidden sm:inline text-white/80">·</span>
          <span className="text-white/90 font-normal">{label}</span>
          <span className="hidden md:inline text-white/80 text-xs font-normal ml-2">
            (progress is not saved)
          </span>
        </div>
        <button
          type="button"
          onClick={handleExit}
          className="text-xs sm:text-sm bg-white text-red-700 px-3 py-1 rounded font-semibold hover:bg-red-50 transition-colors active:scale-95"
          style={{ minHeight: '32px', WebkitTapHighlightColor: 'transparent' }}
        >
          Exit Preview
        </button>
      </div>
    </div>
  );
}
