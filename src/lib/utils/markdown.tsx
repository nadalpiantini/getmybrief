import { Fragment, type ReactNode } from 'react';

/**
 * Simple markdown renderer for chat messages
 * Supports: **bold**, *italic*, headers, lists, code blocks
 */
export function renderMarkdown(text: string): ReactNode {
  if (!text) return null;

  const lines = text.split('\n');
  const elements: ReactNode[] = [];
  let inCodeBlock = false;
  let codeContent: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code block start/end
    if (line.startsWith('```')) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeContent = [];
      } else {
        inCodeBlock = false;
        elements.push(
          <pre
            key={`code-${i}`}
            className="my-3 p-3 bg-black/30 rounded-lg overflow-x-auto text-xs font-mono border border-border"
          >
            <code>{codeContent.join('\n')}</code>
          </pre>
        );
      }
      continue;
    }

    if (inCodeBlock) {
      codeContent.push(line);
      continue;
    }

    // Empty line
    if (!line.trim()) {
      elements.push(<div key={`br-${i}`} className="h-2" />);
      continue;
    }

    // Headers
    if (line.startsWith('### ')) {
      elements.push(
        <h4 key={`h4-${i}`} className="text-sm font-bold text-white mt-3 mb-1">
          {parseInline(line.slice(4))}
        </h4>
      );
      continue;
    }
    if (line.startsWith('## ')) {
      elements.push(
        <h3 key={`h3-${i}`} className="text-base font-bold text-white mt-4 mb-2 flex items-center gap-2">
          {parseInline(line.slice(3))}
        </h3>
      );
      continue;
    }
    if (line.startsWith('# ')) {
      elements.push(
        <h2 key={`h2-${i}`} className="text-lg font-bold text-primary mt-4 mb-2">
          {parseInline(line.slice(2))}
        </h2>
      );
      continue;
    }

    // Numbered section headers like "1. HOOK"
    const numberedHeader = line.match(/^(\d+)\.\s+\*\*(.+?)\*\*(.*)$/);
    if (numberedHeader) {
      elements.push(
        <div key={`nh-${i}`} className="flex items-start gap-2 mt-4 mb-2">
          <span className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs font-bold text-white">
            {numberedHeader[1]}
          </span>
          <span className="font-bold text-white">
            {numberedHeader[2]}
            {numberedHeader[3] && <span className="font-normal text-gray-300">{parseInline(numberedHeader[3])}</span>}
          </span>
        </div>
      );
      continue;
    }

    // Bullet points
    if (line.match(/^[-•]\s+/)) {
      elements.push(
        <div key={`li-${i}`} className="flex items-start gap-2 my-1 ml-2">
          <span className="text-primary mt-1.5 text-xs">•</span>
          <span className="text-gray-200">{parseInline(line.slice(2))}</span>
        </div>
      );
      continue;
    }

    // Numbered lists
    const numberedList = line.match(/^(\d+)\.\s+(.+)$/);
    if (numberedList && !line.includes('**')) {
      elements.push(
        <div key={`ol-${i}`} className="flex items-start gap-2 my-1 ml-2">
          <span className="text-accent font-medium text-sm min-w-[1.5rem]">{numberedList[1]}.</span>
          <span className="text-gray-200">{parseInline(numberedList[2])}</span>
        </div>
      );
      continue;
    }

    // Quote lines starting with >
    if (line.startsWith('> ')) {
      elements.push(
        <blockquote
          key={`quote-${i}`}
          className="border-l-2 border-accent pl-3 my-2 text-gray-300 italic"
        >
          {parseInline(line.slice(2))}
        </blockquote>
      );
      continue;
    }

    // Horizontal rule
    if (line.match(/^[-=]{3,}$/)) {
      elements.push(<hr key={`hr-${i}`} className="my-4 border-border" />);
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={`p-${i}`} className="my-1 text-gray-200">
        {parseInline(line)}
      </p>
    );
  }

  return <div className="space-y-0">{elements}</div>;
}

/**
 * Parse inline markdown: **bold**, *italic*, `code`, [links]
 */
function parseInline(text: string): ReactNode {
  if (!text) return null;

  const parts: ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // Bold with **
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    if (boldMatch && boldMatch.index !== undefined) {
      if (boldMatch.index > 0) {
        parts.push(
          <Fragment key={key++}>{parseInlineSimple(remaining.slice(0, boldMatch.index))}</Fragment>
        );
      }
      parts.push(
        <strong key={key++} className="font-semibold text-white">
          {boldMatch[1]}
        </strong>
      );
      remaining = remaining.slice(boldMatch.index + boldMatch[0].length);
      continue;
    }

    // Inline code with `
    const codeMatch = remaining.match(/`([^`]+)`/);
    if (codeMatch && codeMatch.index !== undefined) {
      if (codeMatch.index > 0) {
        parts.push(<Fragment key={key++}>{remaining.slice(0, codeMatch.index)}</Fragment>);
      }
      parts.push(
        <code key={key++} className="px-1.5 py-0.5 bg-black/30 rounded text-accent text-xs font-mono">
          {codeMatch[1]}
        </code>
      );
      remaining = remaining.slice(codeMatch.index + codeMatch[0].length);
      continue;
    }

    // Italic with *
    const italicMatch = remaining.match(/\*([^*]+)\*/);
    if (italicMatch && italicMatch.index !== undefined) {
      if (italicMatch.index > 0) {
        parts.push(<Fragment key={key++}>{remaining.slice(0, italicMatch.index)}</Fragment>);
      }
      parts.push(
        <em key={key++} className="italic text-gray-300">
          {italicMatch[1]}
        </em>
      );
      remaining = remaining.slice(italicMatch.index + italicMatch[0].length);
      continue;
    }

    // Emoji enhancement for common patterns
    parts.push(<Fragment key={key++}>{parseInlineSimple(remaining)}</Fragment>);
    break;
  }

  return <>{parts}</>;
}

/**
 * Simple text with emoji enhancement
 */
function parseInlineSimple(text: string): string {
  return text
    .replace(/:\)/g, '😊')
    .replace(/:D/g, '😄')
    .replace(/<3/g, '❤️');
}
