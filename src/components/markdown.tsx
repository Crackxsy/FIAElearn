import type { ReactNode } from "react";

// Kleiner, sicherer Markdown-Renderer für die eigenen Lektionstexte
// (Überschriften, Listen, Tabellen, Code, Zitate, fett/kursiv/Code inline).

function inline(text: string, keyBase: string): ReactNode[] {
  const out: ReactNode[] = [];
  const pattern = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*\s][^*]*\*)/g;
  let last = 0;
  let i = 0;
  for (const match of text.matchAll(pattern)) {
    const idx = match.index ?? 0;
    if (idx > last) out.push(text.slice(last, idx));
    const token = match[0];
    const key = `${keyBase}-${i++}`;
    if (token.startsWith("`")) out.push(<code key={key}>{token.slice(1, -1)}</code>);
    else if (token.startsWith("**")) out.push(<strong key={key}>{token.slice(2, -2)}</strong>);
    else out.push(<em key={key}>{token.slice(1, -1)}</em>);
    last = idx + token.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function splitRow(line: string) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split(/(?<!\\)\|/)
    .map((c) => c.trim().replace(/\\\|/g, "|"));
}

export function Markdown({ source, className = "prose-lesson" }: { source: string; className?: string }) {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let i = 0;
  let k = 0;

  while (i < lines.length) {
    const line = lines[i];
    const key = `b${k++}`;

    if (line.startsWith("```")) {
      const code: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) code.push(lines[i++]);
      i++;
      blocks.push(
        <pre key={key}>
          <code>{code.join("\n")}</code>
        </pre>,
      );
      continue;
    }
    if (line.startsWith("### ")) {
      blocks.push(<h3 key={key}>{inline(line.slice(4), key)}</h3>);
      i++;
      continue;
    }
    if (line.startsWith("## ")) {
      blocks.push(<h2 key={key}>{inline(line.slice(3), key)}</h2>);
      i++;
      continue;
    }
    if (line.trim().startsWith("|") && lines[i + 1]?.trim().match(/^\|?\s*:?-{2,}/)) {
      const header = splitRow(line);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) rows.push(splitRow(lines[i++]));
      blocks.push(
        <div key={key} className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                {header.map((h, j) => (
                  <th key={j}>{inline(h, `${key}h${j}`)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, ri) => (
                <tr key={ri}>
                  {r.map((c, ci) => (
                    <td key={ci}>{inline(c, `${key}r${ri}c${ci}`)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }
    if (line.startsWith("> ")) {
      const quote: string[] = [];
      while (i < lines.length && lines[i].startsWith("> ")) quote.push(lines[i++].slice(2));
      blocks.push(<blockquote key={key}>{inline(quote.join(" "), key)}</blockquote>);
      continue;
    }
    if (/^\s*[-*] /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*] /.test(lines[i])) items.push(lines[i++].replace(/^\s*[-*] /, ""));
      blocks.push(
        <ul key={key}>
          {items.map((it, j) => (
            <li key={j}>{inline(it, `${key}-${j}`)}</li>
          ))}
        </ul>,
      );
      continue;
    }
    if (/^\d+\. /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\. /.test(lines[i])) items.push(lines[i++].replace(/^\d+\. /, ""));
      blocks.push(
        <ol key={key}>
          {items.map((it, j) => (
            <li key={j}>{inline(it, `${key}-${j}`)}</li>
          ))}
        </ol>,
      );
      continue;
    }
    if (!line.trim()) {
      i++;
      continue;
    }
    const para: string[] = [];
    while (i < lines.length && lines[i].trim() && !/^(```|## |### |> |\s*[-*] |\d+\. |\|)/.test(lines[i])) para.push(lines[i++]);
    if (!para.length) para.push(lines[i++]);
    blocks.push(<p key={key}>{inline(para.join(" "), key)}</p>);
  }

  return <div className={className}>{blocks}</div>;
}
