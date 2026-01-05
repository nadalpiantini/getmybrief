import { useState, useEffect } from 'react';
import { RefreshCw, Copy, Check, Edit3, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import toast from 'react-hot-toast';

export interface ScriptSection {
  id: string;
  type: 'hook' | 'context' | 'content' | 'climax' | 'cta' | 'caption' | 'info';
  title: string;
  timing?: string;
  visual?: string;
  text?: string;
  audio?: string;
  raw: string;
}

interface ScriptCardProps {
  section: ScriptSection;
  onRegenerate?: (sectionId: string, type: string) => void;
  onUpdate?: (sectionId: string, content: string) => void;
  isRegenerating?: boolean;
}

const SECTION_COLORS: Record<string, { bg: string; border: string; icon: string }> = {
  hook: { bg: 'bg-red-500/10', border: 'border-red-500/30', icon: '🎣' },
  context: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', icon: '📍' },
  content: { bg: 'bg-green-500/10', border: 'border-green-500/30', icon: '💡' },
  climax: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', icon: '⚡' },
  cta: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', icon: '🎯' },
  caption: { bg: 'bg-pink-500/10', border: 'border-pink-500/30', icon: '📝' },
  info: { bg: 'bg-gray-500/10', border: 'border-gray-500/30', icon: '📋' },
};

export function ScriptCard({
  section,
  onRegenerate,
  onUpdate,
  isRegenerating = false,
}: ScriptCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(section.raw);
  const [copied, setCopied] = useState(false);

  // Sync editContent when section.raw changes from parent
  useEffect(() => {
    setEditContent(section.raw);
  }, [section.raw]);

  const colors = SECTION_COLORS[section.type] || SECTION_COLORS.info;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(section.raw);
    setCopied(true);
    toast.success('Section copied');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveEdit = () => {
    if (onUpdate && editContent !== section.raw) {
      onUpdate(section.id, editContent);
      toast.success('Section updated');
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditContent(section.raw);
    setIsEditing(false);
  };

  return (
    <div
      className={cn(
        'rounded-lg border transition-all duration-200',
        colors.bg,
        colors.border,
        isExpanded ? 'shadow-sm' : ''
      )}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-3 py-2 cursor-pointer"
        onClick={() => !isEditing && setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">{colors.icon}</span>
          <span className="font-medium text-white text-sm">{section.title}</span>
          {section.timing && (
            <span className="text-xs text-gray-400 bg-black/20 px-2 py-0.5 rounded">
              {section.timing}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          {!isEditing && (
            <>
              {/* Regenerate */}
              {onRegenerate && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRegenerate(section.id, section.type);
                  }}
                  disabled={isRegenerating}
                  className="p-1.5 hover:bg-white/10 rounded transition-colors"
                  title="Regenerate section"
                >
                  <RefreshCw
                    className={cn(
                      'w-3.5 h-3.5 text-gray-400',
                      isRegenerating && 'animate-spin'
                    )}
                  />
                </button>
              )}

              {/* Edit */}
              {onUpdate && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditing(true);
                    setIsExpanded(true);
                  }}
                  className="p-1.5 hover:bg-white/10 rounded transition-colors"
                  title="Edit section"
                >
                  <Edit3 className="w-3.5 h-3.5 text-gray-400" />
                </button>
              )}

              {/* Copy */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopy();
                }}
                className="p-1.5 hover:bg-white/10 rounded transition-colors"
                title="Copy section"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-green-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-gray-400" />
                )}
              </button>

              {/* Expand/Collapse */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
                className="p-1.5 hover:bg-white/10 rounded transition-colors"
              >
                {isExpanded ? (
                  <ChevronUp className="w-3.5 h-3.5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                )}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="px-3 pb-3 space-y-2">
          {isEditing ? (
            <div className="space-y-2">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-sm text-gray-200 resize-none focus:outline-none focus:ring-1 focus:ring-primary"
                rows={4}
                autoFocus
              />
              <div className="flex gap-2 justify-end">
                <button
                  onClick={handleCancelEdit}
                  className="px-3 py-1 text-xs text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-3 py-1 text-xs bg-primary text-white rounded hover:bg-primary/80 transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <>
              {section.visual && (
                <div className="text-xs">
                  <span className="text-gray-500">Visual: </span>
                  <span className="text-gray-300">{section.visual}</span>
                </div>
              )}
              {section.text && (
                <div className="text-xs">
                  <span className="text-gray-500">Text: </span>
                  <span className="text-white font-medium">{section.text}</span>
                </div>
              )}
              {section.audio && (
                <div className="text-xs">
                  <span className="text-gray-500">Audio: </span>
                  <span className="text-gray-300 italic">"{section.audio}"</span>
                </div>
              )}
              {!section.visual && !section.text && !section.audio && (
                <p className="text-xs text-gray-300 whitespace-pre-wrap">{section.raw}</p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

// Valid section types for type safety
const VALID_SECTION_TYPES = ['hook', 'context', 'content', 'climax', 'cta', 'caption', 'info'] as const;

function isValidSectionType(type: string): type is ScriptSection['type'] {
  return VALID_SECTION_TYPES.includes(type as ScriptSection['type']);
}

// Utility function to parse script content into sections
export function parseScriptSections(content: string): ScriptSection[] {
  const sections: ScriptSection[] = [];

  // Match SHOT patterns
  const shotRegex = /\*\*SHOT\s*(\d+)\s*\[([^\]]+)\]\s*-\s*([A-Z]+)\*\*([\s\S]*?)(?=\*\*SHOT|\*\*📝|📝\s*CAPTION|$)/gi;
  let match;

  while ((match = shotRegex.exec(content)) !== null) {
    const [, shotNum, timing, type, rawContent] = match;
    const normalizedType = type.toLowerCase();
    const sectionType: ScriptSection['type'] = isValidSectionType(normalizedType)
      ? normalizedType
      : 'content'; // Default to 'content' for unknown types

    const section: ScriptSection = {
      id: `shot-${shotNum}`,
      type: sectionType,
      title: `Shot ${shotNum} - ${type}`,
      timing,
      raw: rawContent.trim(),
    };

    // Parse visual, text, audio from content
    const visualMatch = rawContent.match(/Visual:\s*([^\n]+)/i);
    const textMatch = rawContent.match(/Text:\s*([^\n]+)/i);
    const audioMatch = rawContent.match(/Audio:\s*([^\n]+)/i);

    if (visualMatch) section.visual = visualMatch[1].trim();
    if (textMatch) section.text = textMatch[1].trim();
    if (audioMatch) section.audio = audioMatch[1].trim();

    sections.push(section);
  }

  // Match CAPTION section
  const captionMatch = content.match(/📝\s*CAPTION:?\s*([\s\S]*?)(?=---|$)/i);
  if (captionMatch) {
    sections.push({
      id: 'caption',
      type: 'caption',
      title: 'Caption',
      raw: captionMatch[1].trim(),
    });
  }

  // Match INFO section
  const infoMatch = content.match(/📋\s*INFO:?\s*([\s\S]*?)(?=🎬\s*SHOTS|$)/i);
  if (infoMatch) {
    sections.unshift({
      id: 'info',
      type: 'info',
      title: 'Info',
      raw: infoMatch[1].trim(),
    });
  }

  return sections;
}

// Check if content is a structured script
export function isStructuredScript(content: string): boolean {
  return (
    content.includes('**SHOT') ||
    content.includes('🎬 REEL') ||
    content.includes('📋 INFO')
  );
}
