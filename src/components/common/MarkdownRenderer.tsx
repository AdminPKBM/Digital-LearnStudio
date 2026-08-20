import React, { useState } from 'react';
import { Copy, Check, Info, AlertTriangle, Lightbulb, Code2 } from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
  fontSize?: 'sm' | 'base' | 'lg';
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, fontSize = 'base' }) => {
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);

  const handleCopy = (codeText: string, index: number) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCodeIndex(index);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'sm':
        return 'text-xs leading-relaxed';
      case 'lg':
        return 'text-base leading-relaxed';
      default:
        return 'text-sm leading-relaxed';
    }
  };

  // Split content into blocks (paragraphs, headers, tables, lists, code blocks, blockquotes)
  const renderFormattedContent = () => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let i = 0;
    let codeBlockCounter = 0;

    while (i < lines.length) {
      const line = lines[i];

      // Code blocks (```lang ... ```)
      if (line.trim().startsWith('```')) {
        const lang = line.trim().replace('```', '') || 'text';
        const codeLines: string[] = [];
        i++;
        while (i < lines.length && !lines[i].trim().startsWith('```')) {
          codeLines.push(lines[i]);
          i++;
        }
        i++; // skip closing ```
        const codeText = codeLines.join('\n');
        const currentIndex = codeBlockCounter++;

        elements.push(
          <div key={`code-${i}-${currentIndex}`} className="my-5 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-xl">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-900/80 border-b border-slate-800 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 font-bold text-cyan-400 uppercase">
                <Code2 className="w-3.5 h-3.5" />
                {lang}
              </span>
              <button
                onClick={() => handleCopy(codeText, currentIndex)}
                className="flex items-center gap-1 text-slate-400 hover:text-cyan-300 transition cursor-pointer text-xs"
              >
                {copiedCodeIndex === currentIndex ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin Kode</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 font-mono text-xs text-cyan-300 overflow-x-auto leading-relaxed">
              <code>{codeText}</code>
            </pre>
          </div>
        );
        continue;
      }

      // Markdown Tables (| header | header |)
      if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
        const tableLines: string[] = [];
        while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
          tableLines.push(lines[i]);
          i++;
        }

        if (tableLines.length >= 2) {
          const parseRow = (rowStr: string) =>
            rowStr
              .split('|')
              .slice(1, -1)
              .map((cell) => cell.trim());

          const headerCells = parseRow(tableLines[0]);
          // Check if row 1 is separator line (| --- | --- |)
          const isSeparator = (str: string) => /^[:\s-]{3,}$/.test(str);
          const hasSeparator = tableLines.length > 1 && parseRow(tableLines[1]).every(isSeparator);
          const bodyStartIdx = hasSeparator ? 2 : 1;
          const bodyRows = tableLines.slice(bodyStartIdx).map(parseRow);

          elements.push(
            <div key={`table-${i}`} className="my-6 overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/60 p-1">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/90 text-cyan-300 font-bold">
                    {headerCells.map((cell, idx) => (
                      <th key={idx} className="p-3 font-semibold">
                        {renderInlineFormatting(cell)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {bodyRows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-slate-900/40 transition">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="p-3">
                          {renderInlineFormatting(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
          continue;
        }
      }

      // Blockquotes / Callout boxes (> ...)
      if (line.trim().startsWith('>')) {
        const quoteLines: string[] = [];
        while (i < lines.length && lines[i].trim().startsWith('>')) {
          quoteLines.push(lines[i].replace(/^>\s?/, ''));
          i++;
        }
        const quoteText = quoteLines.join(' ');
        let isWarning = quoteText.toLowerCase().includes('perhatian') || quoteText.toLowerCase().includes('peringatan') || quoteText.toLowerCase().includes('warning');
        let isTip = quoteText.toLowerCase().includes('tips') || quoteText.toLowerCase().includes('catatan') || quoteText.toLowerCase().includes('info');

        elements.push(
          <div
            key={`quote-${i}`}
            className={`my-5 p-4 rounded-2xl border flex items-start gap-3 backdrop-blur-md ${
              isWarning
                ? 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                : isTip
                ? 'bg-cyan-950/30 border-cyan-500/40 text-cyan-200'
                : 'bg-indigo-950/30 border-indigo-500/40 text-indigo-200'
            }`}
          >
            <div className="p-1.5 rounded-xl bg-slate-950/60 shrink-0">
              {isWarning ? (
                <AlertTriangle className="w-4 h-4 text-amber-400" />
              ) : isTip ? (
                <Lightbulb className="w-4 h-4 text-cyan-400" />
              ) : (
                <Info className="w-4 h-4 text-indigo-400" />
              )}
            </div>
            <div className="text-xs leading-relaxed font-medium">
              {renderInlineFormatting(quoteText)}
            </div>
          </div>
        );
        continue;
      }

      // Headers (#, ##, ###)
      if (line.startsWith('# ')) {
        const title = line.replace('# ', '').trim();
        const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        elements.push(
          <h1 key={`h1-${i}`} id={id} className="text-xl lg:text-2xl font-black text-white mt-8 mb-4 pb-2 border-b border-slate-800 scroll-mt-24 flex items-center gap-2">
            <span className="w-2 h-6 bg-cyan-500 rounded-full inline-block"></span>
            {renderInlineFormatting(title)}
          </h1>
        );
        i++;
        continue;
      }

      if (line.startsWith('## ')) {
        const title = line.replace('## ', '').trim();
        const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        elements.push(
          <h2 key={`h2-${i}`} id={id} className="text-lg lg:text-xl font-extrabold text-cyan-300 mt-7 mb-3 scroll-mt-24 flex items-center gap-2">
            <span className="text-cyan-400 font-mono text-sm">#</span>
            {renderInlineFormatting(title)}
          </h2>
        );
        i++;
        continue;
      }

      if (line.startsWith('### ')) {
        const title = line.replace('### ', '').trim();
        const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        elements.push(
          <h3 key={`h3-${i}`} id={id} className="text-base font-bold text-slate-100 mt-5 mb-2 scroll-mt-24">
            {renderInlineFormatting(title)}
          </h3>
        );
        i++;
        continue;
      }

      // Horizontal Divider (--- or ***)
      if (line.trim() === '---' || line.trim() === '***') {
        elements.push(<hr key={`hr-${i}`} className="my-6 border-slate-800/80" />);
        i++;
        continue;
      }

      // Unordered lists (- or *)
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        const listItems: string[] = [];
        while (i < lines.length && (lines[i].trim().startsWith('- ') || lines[i].trim().startsWith('* '))) {
          listItems.push(lines[i].trim().replace(/^[-*]\s+/, ''));
          i++;
        }

        elements.push(
          <ul key={`ul-${i}`} className="my-3 space-y-2 pl-1">
            {listItems.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0"></span>
                <span className="flex-1">{renderInlineFormatting(item)}</span>
              </li>
            ))}
          </ul>
        );
        continue;
      }

      // Ordered lists (1. , 2. )
      if (/^\d+\.\s/.test(line.trim())) {
        const listItems: string[] = [];
        while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
          listItems.push(lines[i].trim().replace(/^\d+\.\s+/, ''));
          i++;
        }

        elements.push(
          <ol key={`ol-${i}`} className="my-3 space-y-2.5 pl-1">
            {listItems.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-slate-300">
                <span className="flex items-center justify-center w-5 h-5 rounded-lg bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold shrink-0 border border-cyan-500/30">
                  {idx + 1}
                </span>
                <span className="flex-1 leading-relaxed">{renderInlineFormatting(item)}</span>
              </li>
            ))}
          </ol>
        );
        continue;
      }

      // Standard Paragraph
      if (line.trim().length > 0) {
        elements.push(
          <p key={`p-${i}`} className="my-2.5 text-slate-300 leading-relaxed">
            {renderInlineFormatting(line)}
          </p>
        );
      }

      i++;
    }

    return elements;
  };

  // Helper function to format inline **bold**, *italic*, `code`
  const renderInlineFormatting = (text: string): React.ReactNode => {
    // Replace **bold**, *italic*, `code`
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/g);

    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} className="font-bold text-cyan-300">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return (
          <em key={index} className="italic text-slate-200">
            {part.slice(1, -1)}
          </em>
        );
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={index} className="bg-slate-950 px-1.5 py-0.5 rounded-md text-amber-300 font-mono text-xs border border-slate-800 mx-0.5">
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  return <div className={`space-y-1 ${getFontSizeClass()}`}>{renderFormattedContent()}</div>;
};
