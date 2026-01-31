'use client';

import { useState, useEffect, useRef } from 'react';
import { useStudent } from '@/app/contexts/AuthContext';

interface ActivityCompletionProps {
  activityType: 'elkonin_box' | 'whiteboard' | 'phoneme_keyboard' | 'story_circle' | 'word_work';
  onComplete?: () => void;
}

interface Assignment {
  id: string;
  assignment_id: string;
  student_id: string;
  status: string;
  assignment?: {
    title: string;
    activity_type: string;
    phoneme_id?: string;
    grapheme?: string;
  };
}

export default function ActivityCompletion({ activityType, onComplete }: ActivityCompletionProps) {
  const { student, isStudent } = useStudent();
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  // Fetch active assignment for this activity type
  useEffect(() => {
    async function fetchAssignment() {
      if (!student?.id) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/student-progress?student_id=${student.id}`);
        const data = await response.json();

        if (data.assignments) {
          // Find an assignment for this activity type that isn't completed
          const activeAssignment = data.assignments.find(
            (a: Assignment) =>
              a.assignment?.activity_type === activityType &&
              (a.status === 'assigned' || a.status === 'in_progress')
          );

          if (activeAssignment) {
            setAssignment(activeAssignment);

            // Mark as in_progress if it's assigned
            if (activeAssignment.status === 'assigned') {
              await fetch('/api/student-progress', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  assignment_id: activeAssignment.assignment_id,
                  student_id: student.id,
                  status: 'in_progress',
                }),
              });
            }
          }
        }
      } catch (err) {
        console.error('Error fetching assignment:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchAssignment();
    startTimeRef.current = Date.now();
  }, [student?.id, activityType]);

  const handleComplete = async () => {
    if (!assignment || !student?.id) return;

    setSubmitting(true);
    setError(null);

    const timeSpentSeconds = Math.round((Date.now() - startTimeRef.current) / 1000);

    try {
      const response = await fetch('/api/student-progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assignment_id: assignment.assignment_id,
          student_id: student.id,
          status: 'completed',
          time_spent_seconds: timeSpentSeconds,
          score: 100, // Default to 100 for completion
          attempts: 1,
        }),
      });

      if (response.ok) {
        setCompleted(true);
        onComplete?.();
      } else {
        setError('Failed to save progress');
      }
    } catch (err) {
      console.error('Error completing assignment:', err);
      setError('Failed to save progress');
    } finally {
      setSubmitting(false);
    }
  };

  // Don't show anything if not a student or no assignment
  if (!isStudent || loading) {
    return null;
  }

  if (!assignment) {
    return null;
  }

  if (completed) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-bounce">
          <span className="text-2xl">🎉</span>
          <span className="font-semibold">Great job! Activity completed!</span>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl p-4 border-2 border-green-400 max-w-xs">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">📋</span>
          <span className="font-semibold text-gray-800">Assignment</span>
        </div>
        <p className="text-sm text-gray-600 mb-3">
          {assignment.assignment?.title || 'Practice Activity'}
        </p>
        {error && (
          <p className="text-sm text-red-500 mb-2">{error}</p>
        )}
        <button
          onClick={handleComplete}
          disabled={submitting}
          className="w-full py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {submitting ? (
            <>
              <span className="animate-spin">⏳</span>
              Saving...
            </>
          ) : (
            <>
              <span>✅</span>
              Mark Complete
            </>
          )}
        </button>
      </div>
    </div>
  );
}
