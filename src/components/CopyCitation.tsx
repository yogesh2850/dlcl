'use client';

import { useState } from 'react';

export default function CopyCitation({ citation }: { citation: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(citation);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="mt-4 rounded-full border border-gold/40 px-4 py-1.5 text-xs font-medium text-gold transition-colors hover:bg-gold/10"
    >
      {copied ? 'Copied' : 'Copy BibTeX'}
    </button>
  );
}
