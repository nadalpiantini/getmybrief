import { Card } from '@/components/ui';
import { cn } from '@/lib/utils/cn';
import type { Template } from '@/lib/types';
import { Lightbulb, BookOpen, Clapperboard, Heart, GraduationCap, Check } from 'lucide-react';

interface TemplateCardProps {
  template: Template;
  isSelected: boolean;
  onSelect: (template: Template) => void;
}

const TYPE_ICONS = {
  tip: Lightbulb,
  storytelling: BookOpen,
  proceso: Clapperboard,
  motivacional: Heart,
  educativo: GraduationCap,
};

const TYPE_COLORS = {
  tip: 'text-yellow-400 bg-yellow-400/10',
  storytelling: 'text-purple-400 bg-purple-400/10',
  proceso: 'text-blue-400 bg-blue-400/10',
  motivacional: 'text-pink-400 bg-pink-400/10',
  educativo: 'text-green-400 bg-green-400/10',
};

export function TemplateCard({ template, isSelected, onSelect }: TemplateCardProps) {
  const Icon = TYPE_ICONS[template.type];
  const colorClass = TYPE_COLORS[template.type];

  return (
    <Card
      hover
      padding="sm"
      onClick={() => onSelect(template)}
      className={cn(
        'relative transition-all duration-200',
        isSelected && 'ring-2 ring-primary border-primary'
      )}
    >
      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
          <Check className="w-4 h-4 text-white" />
        </div>
      )}

      {/* Icon */}
      <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center mb-3', colorClass)}>
        <Icon className="w-5 h-5" />
      </div>

      {/* Content */}
      <h3 className="font-medium text-white text-sm mb-1">{template.name}</h3>
      <p className="text-xs text-gray-400 line-clamp-2">{template.description}</p>

      {/* Structure preview */}
      <div className="mt-3 pt-3 border-t border-border">
        <p className="text-xs text-gray-500 line-clamp-1">{template.structure}</p>
      </div>
    </Card>
  );
}
