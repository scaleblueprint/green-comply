import Link from 'next/link';
import targets from '../../../data/public/rco-targets.json';
import market from '../../../data/public/rec-market-observations.json';
import coverage from '../../../data/public/data-coverage.json';

const names: Record<string,string> = {
  grid_emission_factors: 'CEA grid emission factors',
  cerc_market_monitoring: 'CERC market monitoring',
  bee_reporting_templates: 'BEE reporting templates',
  facility_monthly_kwh: 'Monthly facility consumption',
  open_access_captive_drawal: 'Open-access and captive electricity',
  renewable_instruments: 'Renewable procurement evidence',
  actual_tariffs_contracts: 'Tariffs and contracts',
  audit_signoff: 'Audit evidence and approval'
};
export default function DataExplorer() {
  return <main className="min-h-screen">
    <header className="bg-[#103f30] text-white px-5 py-5"><div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-3"><div><h1 className="text-2xl font-bold">GreenComply · Data Explorer</h1><p className="text-sm text-green-100">Published references, evidence status and access gaps</p></div><Link href="/" className="rounded-lg bg-white text-[#103f30] px-4 py-2 font-semibold">← Guided overview</Link></div></header>
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-6">
      <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950"><strong>Public reference data, not a facility assessment.</strong> Values are read from versioned JSON files. Applicability, market execution and reporting methodology require review. Missing private records are never substituted with demo values. Dataset snapshot: {coverage.as_of}.</div>
      <section className="card"><div className="flex flex-wrap items-center justify-between gap-2"><h2 className="text-xl font-bold">Renewable consumption targets</h2><span className="text-xs rounded-full bg-green-100 text-green-900 px-3 py-1">Official published reference · applicability unverified</span></div><p className="text-sm text-[#52675c] my-3">{targets.scope}</p><div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead><tr className="border-b"><th className="py-2">Financial year</th><th>Published total target</th></tr></thead><tbody>{targets.values.map(x=><tr key={x.financial_year} className="border-b"><td className="py-3">{x.financial_year}</td><td className="font-semibold">{x.target_percent}%</td></tr>)}</tbody></table></div><p className="text-xs text-[#52675c] mt-3">{targets.caveats.join(' ')}</p><div className="flex flex-wrap gap-3 mt-3">{targets.sources.map(s=><a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" className="underline text-[#145c44] text-sm">{s.publisher} ↗</a>)}</div></section>
      <section className="card"><div className="flex flex-wrap justify-between gap-2"><h2 className="text-xl font-bold">REC market observations</h2><span className="text-xs rounded-full bg-blue-100 text-blue-900 px-3 py-1">Historical exchange observations</span></div><p className="text-sm text-[#52675c] my-3">Unit: {market.unit}. {market.rec_unit}. Snapshot: {market.as_of}.</p><div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead><tr className="border-b"><th className="py-2">Auction date</th><th>Cleared price</th><th>Cleared volume</th></tr></thead><tbody>{market.observations.map(x=><tr key={x.date} className="border-b"><td className="py-3">{x.date}</td><td>₹{x.cleared_price_inr_per_rec.toLocaleString('en-IN')}/REC</td><td>{x.cleared_volume_rec.toLocaleString('en-IN')} RECs</td></tr>)}</tbody></table></div><p className="text-xs text-[#52675c] mt-3">{market.caveats.join(' ')}</p><a className="underline text-[#145c44] text-sm mt-3 inline-block" href={market.source.url} target="_blank" rel="noopener noreferrer">Source: {market.source.publisher} ↗</a></section>
      <section className="card"><h2 className="text-xl font-bold">Other public sources — extraction pending</h2><p className="text-sm text-[#52675c] my-3">A source exists, but its values have not yet been imported or verified for this use case.</p><div className="space-y-3">{coverage.available_public.filter(x=>'status' in x).map(x=><div key={x.id} className="rounded-lg border p-4"><div className="font-semibold">{names[x.id]??x.id}</div><p className="text-sm text-amber-800">Not yet ingested or validated</p>{'next_action' in x&&<p className="text-sm mt-1">{x.next_action}</p>}{'source' in x&&<a href={x.source} target="_blank" rel="noopener noreferrer" className="text-sm text-[#145c44] underline">Open source ↗</a>}</div>)}</div></section>
      <section className="card"><h2 className="text-xl font-bold">Customer data access gaps</h2><p className="text-sm text-[#52675c] my-3">These are not public datasets. Customer permission and evidence are required before a real assessment.</p><div className="grid md:grid-cols-2 gap-3">{coverage.missing_private.map(x=><div key={x.id} className="rounded-lg border p-4 space-y-2"><span className="text-xs bg-amber-100 text-amber-900 rounded-full px-2 py-1">Missing · customer-provided</span><h3 className="font-semibold">{names[x.id]??x.id}</h3><p className="text-sm"><strong>Owner:</strong> {x.owner}</p><p className="text-sm"><strong>Access:</strong> {x.access}</p><p className="text-sm text-red-800"><strong>Impact:</strong> {x.impact}</p></div>)}</div></section>
      <p className="text-xs text-[#52675c] pb-8">{coverage.policy} This explorer does not store customer records or make a statutory filing.</p>
    </div>
  </main>;
}
