import { useState, useMemo } from 'react';
import { DayCell } from './DayCell';
import { ReelModal } from './ReelModal';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui';
import { useReelsStore } from '@/lib/stores/reels-store';
import type { CalendarDay } from '@/lib/types';

const DAYS_OF_WEEK = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const { reels, addReel, updateReel, completeReel, deleteReel } = useReelsStore();

  // Generate 30 days of calendar data
  const calendarDays = useMemo((): CalendarDay[] => {
    const days: CalendarDay[] = [];
    const today = new Date();

    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];

      // Check if there's a reel for this date
      const reel = reels[dateStr];

      days.push({
        date: dateStr,
        reelId: reel?.id,
        status: reel?.status || 'empty',
        title: reel?.title,
      });
    }

    return days;
  }, [reels]);

  const todayStr = new Date().toISOString().split('T')[0];

  const stats = useMemo(() => {
    const completed = calendarDays.filter((d) => d.status === 'completed').length;
    const planned = calendarDays.filter((d) => d.status === 'planned').length;
    const empty = calendarDays.filter((d) => d.status === 'empty').length;
    return { completed, planned, empty };
  }, [calendarDays]);

  const handleDayClick = (day: CalendarDay) => {
    setSelectedDate(day.date);
    setModalOpen(true);
  };

  const selectedReel = selectedDate ? reels[selectedDate] : undefined;

  const handleSaveReel = (title: string, content: string) => {
    if (!selectedDate) return;

    if (selectedReel) {
      updateReel(selectedDate, { title, content });
    } else {
      addReel(selectedDate, title, content);
    }
  };

  const handleCompleteReel = () => {
    if (selectedDate) {
      completeReel(selectedDate);
    }
  };

  const handleDeleteReel = () => {
    if (selectedDate) {
      deleteReel(selectedDate);
    }
  };

  const prevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const nextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <CalendarIcon className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-white">Calendar</h2>
            <p className="text-xs text-gray-500">Next 30 days</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={prevMonth}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={nextMonth}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 p-4 border-b border-border">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-500">{stats.completed}</div>
          <div className="text-xs text-gray-500">Completed</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-500">{stats.planned}</div>
          <div className="text-xs text-gray-500">Planned</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-500">{stats.empty}</div>
          <div className="text-xs text-gray-500">Pending</div>
        </div>
      </div>

      {/* Days of week header */}
      <div className="grid grid-cols-7 gap-1 px-4 py-2">
        {DAYS_OF_WEEK.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-gray-500"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day) => (
            <DayCell
              key={day.date}
              day={day}
              isToday={day.date === todayStr}
              onClick={handleDayClick}
            />
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="px-4 py-3 border-t border-border flex justify-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-xs text-gray-400">Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <span className="text-xs text-gray-400">Planned</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-500" />
          <span className="text-xs text-gray-400">Empty</span>
        </div>
      </div>

      {/* Reel Modal */}
      <ReelModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        date={selectedDate || ''}
        existingReel={selectedReel}
        onSave={handleSaveReel}
        onComplete={handleCompleteReel}
        onDelete={handleDeleteReel}
      />
    </div>
  );
}
