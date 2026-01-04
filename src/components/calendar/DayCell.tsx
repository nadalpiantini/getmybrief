import { cn } from '@/lib/utils/cn';
import { Check, Clock, Plus } from 'lucide-react';
import type { CalendarDay } from '@/lib/types';

interface DayCellProps {
  day: CalendarDay;
  isToday: boolean;
  onClick: (day: CalendarDay) => void;
}

const STATUS_STYLES = {
  empty: {
    bg: 'bg-surface hover:bg-surface-hover',
    icon: Plus,
    iconColor: 'text-gray-500',
  },
  planned: {
    bg: 'bg-yellow-500/10 hover:bg-yellow-500/20 border-yellow-500/30',
    icon: Clock,
    iconColor: 'text-yellow-500',
  },
  completed: {
    bg: 'bg-green-500/10 hover:bg-green-500/20 border-green-500/30',
    icon: Check,
    iconColor: 'text-green-500',
  },
};

export function DayCell({ day, isToday, onClick }: DayCellProps) {
  const dayNumber = new Date(day.date).getDate();
  const style = STATUS_STYLES[day.status];
  const Icon = style.icon;

  return (
    <button
      onClick={() => onClick(day)}
      className={cn(
        'aspect-square rounded-lg border border-border flex flex-col items-center justify-center gap-1 transition-all duration-200',
        style.bg,
        isToday && 'ring-2 ring-primary ring-offset-2 ring-offset-background'
      )}
    >
      <span
        className={cn(
          'text-sm font-medium',
          isToday ? 'text-primary' : 'text-white'
        )}
      >
        {dayNumber}
      </span>
      <Icon className={cn('w-4 h-4', style.iconColor)} />
    </button>
  );
}
