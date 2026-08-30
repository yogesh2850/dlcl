import { siteContent } from '@/constant/site-content';

function parsePct(value: string) {
  return Number.parseFloat(value);
}

function topRecoveryGains(rows: string[][], n = 4) {
  const pairs: {
    name: string;
    traj: string;
    from: string;
    to: string;
    delta: number;
  }[] = [];

  for (let i = 0; i < rows.length; i += 2) {
    const base = rows[i];
    const pr = rows[i + 1];
    if (!base || !pr) continue;

    const deltas = [1, 2, 3].map((j) => parsePct(pr[j]) - parsePct(base[j]));
    const best = deltas.reduce((m, d, j) => (d > deltas[m] ? j : m), 0);
    pairs.push({
      name: pr[0],
      traj: siteContent.recoveryTable.headers[best + 1] ?? `Traj. ${best + 1}`,
      from: base[best + 1],
      to: pr[best + 1],
      delta: deltas[best],
    });
  }

  return pairs.sort((a, b) => b.delta - a.delta).slice(0, n);
}

export default function RecoveryHighlights() {
  const { caption, headers, rows } = siteContent.recoveryTable;
  const highlights = topRecoveryGains(rows);
  const maxDelta = Math.max(...highlights.map((h) => h.delta), 1);

  return (
    <div className="mt-8">
      <p className="text-xs text-mist">{caption} — largest Perception Recovery gains</p>
      <div className="mt-4 space-y-4 rounded-xl border border-gray-200 bg-white p-5">
        {highlights.map((item) => (
          <div key={item.name}>
            <div className="flex items-baseline justify-between gap-3 text-sm">
              <span className="font-medium text-ink">{item.name}</span>
              <span className="shrink-0 font-medium text-gold">
                +{item.delta.toFixed(1)} pp
              </span>
            </div>
            <div className="mt-1.5 h-2 rounded-full bg-gray-100">
              <div
                className="h-2 rounded-full bg-gold"
                style={{ width: `${(item.delta / maxDelta) * 100}%` }}
              />
            </div>
            <p className="mt-1 text-xs text-mist">
              {item.traj}: {item.from} → {item.to}
            </p>
          </div>
        ))}
      </div>

      <details className="group mt-4">
        <summary className="cursor-pointer list-none text-sm font-medium text-gold hover:underline [&::-webkit-details-marker]:hidden">
          <span className="group-open:hidden">Show full comparison table</span>
          <span className="hidden group-open:inline">Hide full comparison table</span>
        </summary>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-gold">
                {headers.map((h) => (
                  <th key={h} className="py-2 pr-4 font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-ink">
              {rows.map((row) => (
                <tr
                  key={row[0]}
                  className={`border-b border-gray-200 ${
                    row[0].endsWith('-PR') ? 'bg-gold/5' : ''
                  }`}
                >
                  {row.map((cell, i) => (
                    <td key={`${row[0]}-${i}`} className="py-2 pr-4">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}
