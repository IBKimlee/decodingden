'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import { getMyStudents } from '@/lib/supabase/auth';
import type { Student } from '@/lib/supabase';

interface StudentViewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StudentViewModal({ isOpen, onClose }: StudentViewModalProps) {
  const { teacher } = useAuth();
  const [mode, setMode] = useState<'choose' | 'pickStudent'>('choose');
  const [students, setStudents] = useState<Student[]>([]);
  const [studentsLoading, setStudentsLoading] = useState(false);
  const [studentsError, setStudentsError] = useState<string | null>(null);
  const [selectedStudentId, setSelectedStudentId] = useState<string>('');

  useEffect(() => {
    if (!isOpen) {
      setMode('choose');
      setSelectedStudentId('');
      setStudentsError(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (mode !== 'pickStudent' || !teacher?.id) return;
    if (students.length > 0) return;

    setStudentsLoading(true);
    setStudentsError(null);
    getMyStudents(teacher.id)
      .then(({ students: data, error }) => {
        if (error) {
          setStudentsError(error.message);
          return;
        }
        setStudents((data || []).filter(s => s.is_active));
      })
      .catch((err) => setStudentsError(err.message || 'Failed to load students'))
      .finally(() => setStudentsLoading(false));
  }, [mode, teacher?.id, students.length]);

  const openGeneric = () => {
    window.open('/student?preview=generic', '_blank', 'noopener');
    onClose();
  };

  const openAsStudent = () => {
    if (!selectedStudentId) return;
    window.open(`/student?as=${encodeURIComponent(selectedStudentId)}`, '_blank', 'noopener');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-pineShadow flex items-center gap-2">
              <span aria-hidden="true">🎭</span> Student View
            </h2>
            <p className="text-sm text-mossGray mt-1">
              Opens in a new tab. Progress is not saved.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-2xl leading-none text-mossGray hover:text-pineShadow active:scale-95 transition"
            style={{ minWidth: '44px', minHeight: '44px', WebkitTapHighlightColor: 'transparent' }}
          >
            ×
          </button>
        </div>

        {mode === 'choose' && (
          <div className="space-y-3">
            <button
              type="button"
              onClick={openGeneric}
              className="w-full text-left p-4 rounded-xl border-2 border-forestMist hover:border-oceanBlue hover:bg-forestMist/20 active:scale-[0.99] transition"
              style={{ minHeight: '44px', WebkitTapHighlightColor: 'transparent' }}
            >
              <div className="flex items-center gap-3">
                <div className="text-3xl" aria-hidden="true">👥</div>
                <div>
                  <div className="font-semibold text-pineShadow">Generic Student View</div>
                  <div className="text-xs text-mossGray">
                    Fresh demo — for class projection or small groups
                  </div>
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setMode('pickStudent')}
              className="w-full text-left p-4 rounded-xl border-2 border-forestMist hover:border-oceanBlue hover:bg-forestMist/20 active:scale-[0.99] transition"
              style={{ minHeight: '44px', WebkitTapHighlightColor: 'transparent' }}
            >
              <div className="flex items-center gap-3">
                <div className="text-3xl" aria-hidden="true">👤</div>
                <div>
                  <div className="font-semibold text-pineShadow">View as a Specific Student</div>
                  <div className="text-xs text-mossGray">
                    See their actual progress (observation only)
                  </div>
                </div>
              </div>
            </button>
          </div>
        )}

        {mode === 'pickStudent' && (
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => setMode('choose')}
              className="text-xs text-mossGray hover:text-pineShadow"
            >
              ← Back
            </button>

            {studentsLoading && (
              <p className="text-sm text-mossGray">Loading students…</p>
            )}

            {studentsError && (
              <p className="text-sm text-red-600">Error: {studentsError}</p>
            )}

            {!studentsLoading && !studentsError && students.length === 0 && (
              <p className="text-sm text-mossGray">
                No students yet. Add students in{' '}
                <a href="/teacher/students" className="text-oceanBlue underline">
                  Manage Students
                </a>.
              </p>
            )}

            {students.length > 0 && (
              <>
                <label htmlFor="preview-student-select" className="block text-sm font-medium text-pineShadow">
                  Pick a student
                </label>
                <select
                  id="preview-student-select"
                  value={selectedStudentId}
                  onChange={(e) => setSelectedStudentId(e.target.value)}
                  className="w-full p-3 rounded-lg border-2 border-forestMist focus:border-oceanBlue outline-none text-base"
                  style={{ minHeight: '44px' }}
                >
                  <option value="">— Select a student —</option>
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.display_name || `${s.first_name}${s.last_name ? ' ' + s.last_name : ''}`}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={openAsStudent}
                  disabled={!selectedStudentId}
                  className="w-full py-3 bg-oceanBlue text-white rounded-xl font-semibold hover:bg-oceanBlue/90 active:scale-[0.99] transition disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ minHeight: '44px', WebkitTapHighlightColor: 'transparent' }}
                >
                  Open Student View
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
