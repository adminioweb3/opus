"use client";

import React, { useState } from 'react';
import { 
  Database, Files, Cpu, BadgeCheck, Palette, Users, Building2, Package, LifeBuoy,
  Plus, Settings, FolderPlus, Search, RefreshCcw, Folder, FileText, Globe, Network,
  ClipboardList, Cloud, ChevronLeft, ChevronRight, Check, Mic, FlaskConical, Briefcase,
  Target, AlertTriangle, Clock, CircleCheck, Loader2, MoreVertical, X, Zap, Sparkles
} from 'lucide-react';
import { toast } from 'sonner';

// Dummy Data
const ENGINE_COLORS: Record<string, string> = {ChatGPT:'#10A37F', Claude:'#D97706', Gemini:'#4285F4', Perplexity:'#20808D'};

const VAULT_KBS = [
  {id:'core', name:'Acme Core Brand', icon: Building2, tint:'#6366F1', bg:'#EEEEFE',
   desc:'Positioning, product story and FAQ that ground every answer engines give about you.',
   indexed:22, indexing:2, failed:0, tokens:'1.2M', fresh:94, updated:'2h ago',
   engines:['ChatGPT','Claude','Gemini','Perplexity']},
  {id:'product', name:'Product & Pricing', icon: Package, tint:'#2563EB', bg:'#EAF1FE',
   desc:'Feature pages, pricing tiers and comparison tables cited on evaluation queries.',
   indexed:18, indexing:0, failed:0, tokens:'860K', fresh:88, updated:'1d ago',
   engines:['ChatGPT','Claude','Perplexity']},
  {id:'support', name:'Support & Help Center', icon: LifeBuoy, tint:'#16A34A', bg:'#ECFDF3',
   desc:'Help articles and troubleshooting that win the how-to and fix-it questions.',
   indexed:39, indexing:1, failed:2, tokens:'2.1M', fresh:76, updated:'5h ago',
   engines:['ChatGPT','Gemini']}
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const VAULT_SRC: Record<string, any[]> = {
  core:[
    {f:1, name:'Press & announcements', items:6},
    {name:'Brand positioning 2026.pdf', type:'Upload', ic: FileText, tc:'#DC2626', status:'indexed', chunks:142, when:'2h ago'},
    {name:'acme.com/about', type:'Scrape', ic: Globe, tc:'#6366F1', status:'indexed', chunks:38, when:'2h ago'},
    {name:'Full site crawl — acme.com', type:'Crawl', ic: Network, tc:'#7C3AED', status:'indexing', progress:64, when:'just now'},
    {name:'Messaging guidelines', type:'Paste', ic: ClipboardList, tc:'#16A34A', status:'indexed', chunks:21, when:'3d ago'},
    {name:'Product wiki', type:'Notion', ic: Files, tc:'#475569', status:'queued', when:'pending'},
    {name:'Investor deck Q1.pdf', type:'Drive', ic: Cloud, tc:'#D97706', status:'failed', when:'failed'}
  ],
  product:[
    {name:'acme.com/pricing', type:'Scrape', ic: Globe, tc:'#6366F1', status:'indexed', chunks:54, when:'1d ago'},
    {name:'Feature matrix.csv', type:'Upload', ic: FileText, tc:'#16A34A', status:'indexed', chunks:31, when:'1d ago'},
    {name:'vs-competitors comparison', type:'Paste', ic: ClipboardList, tc:'#16A34A', status:'indexed', chunks:19, when:'4d ago'}
  ],
  support:[
    {f:1, name:'Troubleshooting', items:18},
    {f:1, name:'Account & billing', items:11},
    {name:'help.acme.com full crawl', type:'Crawl', ic: Network, tc:'#7C3AED', status:'indexing', progress:38, when:'just now'},
    {name:'Onboarding guide.pdf', type:'Upload', ic: FileText, tc:'#DC2626', status:'indexed', chunks:88, when:'5h ago'},
    {name:'Legacy FAQ export.pdf', type:'Upload', ic: FileText, tc:'#DC2626', status:'failed', when:'failed'}
  ]
};

const BRAND_KITS = [
  {name:'Acme — Primary', icon: Palette, tint:'#6366F1', bg:'#EEEEFE', voice:'Confident, plain-spoken, no jargon', sw:['#6366F1','#1E293B','#16A34A','#EAF1FE']},
  {name:'Acme Labs (beta)', icon: FlaskConical, tint:'#7C3AED', bg:'#F3EEFF', voice:'Playful, technical, builder-first', sw:['#7C3AED','#0EA5E9','#111827','#FDE68A']}
];

const SEGMENTS = [
  {name:'Mid-market RevOps', icon: Users, tint:'#2563EB', bg:'#EAF1FE', size:'~4,200 buyers', tags:['B2B SaaS','50–500 staff','North America']},
  {name:'Agency owners', icon: Briefcase, tint:'#16A34A', bg:'#ECFDF3', size:'~1,800 buyers', tags:['Web & design','Founder-led','Global']}
];

const ADD_METHODS = [
  {ic: Globe, t:'Scrape a page', d:'Pull clean content from one or more URLs.', tint:'#6366F1', bg:'#EEEEFE'},
  {ic: Files, t:'Upload files', d:'PDF, DOCX, CSV, TXT or Markdown.', tint:'#2563EB', bg:'#EAF1FE'},
  {ic: Network, t:'Crawl a website', d:'Index a whole site across many pages.', tint:'#7C3AED', bg:'#F3EEFF'},
  {ic: ClipboardList, t:'Paste text', d:'Drop raw text or notes straight in.', tint:'#16A34A', bg:'#ECFDF3'},
  {ic: Files, t:'Import from Notion', d:'Sync pages from a connected workspace.', tint:'#475569', bg:'#F1F5F9'},
  {ic: Cloud, t:'Google Drive', d:'Bring in docs from a linked account.', tint:'#D97706', bg:'#FEF6E7'}
];

export default function KnowledgeVaultPage() {
  const [activeTab, setActiveTab] = useState('kb');
  const [kbId, setKbId] = useState<string | null>(null);
  const [detailTab, setDetailTab] = useState('files');
  const [modalType, setModalType] = useState<string | null>(null);

  // Stats
  let totalSrc=0, totalIdx=0, indexing=0;
  VAULT_KBS.forEach(k => { totalSrc += k.indexed+k.indexing+k.failed; totalIdx+=k.indexed; indexing+=k.indexing; });
  const avgFresh = VAULT_KBS.length ? Math.round(VAULT_KBS.reduce((a,k)=>a+k.fresh,0)/VAULT_KBS.length) : 0;

  const RingSVG = ({ pct, color }: { pct: number, color: string }) => {
    const r=18, c=2*Math.PI*r, off=c*(1-pct/100);
    return (
      <svg width="48" height="48" viewBox="0 0 48 48" className="kb-ring">
        <circle cx="24" cy="24" r={r} fill="none" stroke="var(--line)" strokeWidth="4"/>
        <circle cx="24" cy="24" r={r} fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeDasharray={c.toFixed(1)} strokeDashoffset={off.toFixed(1)} transform="rotate(-90 24 24)"/>
        <text x="24" y="22" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--ink)">{pct}</text>
        <text x="24" y="31" textAnchor="middle" fontSize="6.5" fontWeight="600" fill="var(--faint)" letterSpacing=".5">FRESH</text>
      </svg>
    );
  };

  const renderLanding = () => (
    <>
      <div className="page-head">
        <div>
          <h1>Knowledge vault</h1>
          <p>The source of truth that grounds every AI answer about your brand.</p>
        </div>
        <div className="head-tools">
          <button className="export"><RefreshCcw size={15} className="mr-1" /> Re-sync all</button>
          <button className="btn primary" onClick={() => setModalType('create-kb')}>
            <Plus size={16} className="inline mr-1" style={{verticalAlign: '-2px'}} /> New knowledge base
          </button>
        </div>
      </div>

      <div className="v-strip">
        <div className="v-stat" style={{'--accent': '#6366F1'} as React.CSSProperties}>
          <div className="vl"><Database size={15} /> Knowledge bases</div>
          <div className="vv">{VAULT_KBS.length}</div>
          <div className="vmeta">grounding your AI presence</div>
        </div>
        <div className="v-stat" style={{'--accent': '#2563EB'} as React.CSSProperties}>
          <div className="vl"><Files size={15} /> Active sources</div>
          <div className="vv">{totalSrc}</div>
          <div className="vmeta">{totalIdx} indexed · {indexing} in progress</div>
        </div>
        <div className="v-stat" style={{'--accent': '#7C3AED'} as React.CSSProperties}>
          <div className="vl"><Cpu size={15} /> Indexed knowledge</div>
          <div className="vv">4.1<small>M tokens</small></div>
          <div className="vmeta">retrievable by every engine</div>
        </div>
        <div className="v-stat" style={{'--accent': '#16A34A'} as React.CSSProperties}>
          <div className="vl"><BadgeCheck size={15} /> Vault freshness</div>
          <div className="vv">{avgFresh}<small>%</small></div>
          <div className="vmeta">recency of cited content</div>
        </div>
      </div>

      <div className="v-tabs">
        <div className={`v-tab ${activeTab === 'kb' ? 'on' : ''}`} onClick={() => setActiveTab('kb')}>
          <Database size={17} /> Knowledge bases <span className="cnt">{VAULT_KBS.length}</span>
        </div>
        <div className={`v-tab ${activeTab === 'brand' ? 'on' : ''}`} onClick={() => setActiveTab('brand')}>
          <Palette size={17} /> Brand kits <span className="cnt">{BRAND_KITS.length}</span>
        </div>
        <div className={`v-tab ${activeTab === 'seg' ? 'on' : ''}`} onClick={() => setActiveTab('seg')}>
          <Users size={17} /> Audience segments <span className="cnt">{SEGMENTS.length}</span>
        </div>
      </div>

      {activeTab === 'kb' && (
        <div className="kb-grid">
          {VAULT_KBS.map((k, i) => {
            const Icon = k.icon;
            return (
              <div key={k.id} className="kb-card" style={{animationDelay: `${i*70}ms`} as React.CSSProperties} onClick={() => setKbId(k.id)}>
                <div className="kb-top">
                  <div className="kb-ic" style={{background: k.bg, color: k.tint}}><Icon size={23} /></div>
                  <RingSVG pct={k.fresh} color={k.tint} />
                </div>
                <div className="kb-name">{k.name}</div>
                <div className="kb-desc">{k.desc}</div>
                <div className="kb-foot">
                  <div className="kb-counts">
                    <span className="c"><b>{k.indexed}</b> indexed</span>
                    {k.indexing > 0 && <span className="c"><span className="dotpulse"></span> {k.indexing} indexing</span>}
                    {k.failed > 0 && <span className="c" style={{color: 'var(--red)'}}><AlertTriangle size={14} /> {k.failed}</span>}
                  </div>
                  <div className="kb-engines" title={k.engines.join(', ')}>
                    {k.engines.map(e => (
                      <span key={e} className="eng" style={{background: ENGINE_COLORS[e]||'#94A3B8'}}>{e.charAt(0)}</span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
          <div className="kb-card kb-new" style={{animationDelay: `${VAULT_KBS.length*70}ms`} as React.CSSProperties} onClick={() => setModalType('create-kb')}>
            <div className="plus"><Plus size={24} /></div>
            <div className="nt">New knowledge base</div>
            <div className="ns">Group sources around a theme — product, support, brand.</div>
          </div>
        </div>
      )}

      {activeTab === 'brand' && (
        <div className="kb-grid">
          {BRAND_KITS.map((b, i) => {
            const Icon = b.icon;
            return (
              <div key={i} className="kb-card" style={{animationDelay: `${i*70}ms`} as React.CSSProperties} onClick={() => toast.info(`Opening brand kit — ${b.name}`)}>
                <div className="kb-top"><div className="kb-ic" style={{background: b.bg, color: b.tint}}><Icon size={23} /></div></div>
                <div className="kb-name">{b.name}</div>
                <div className="bk-swatches">
                  {b.sw.map(c => <span key={c} className="bk-sw" style={{background: c}}></span>)}
                </div>
                <div className="bk-row"><Mic size={15} style={{color: 'var(--faint)'}} /> Voice: <b>{b.voice}</b></div>
                <div className="kb-foot"><div className="kb-counts"><span className="c"><Check size={14} style={{color: 'var(--green)'}} /> Applied to all answers</span></div></div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'seg' && (
        <div className="kb-grid">
          {SEGMENTS.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="kb-card" style={{animationDelay: `${i*70}ms`} as React.CSSProperties} onClick={() => toast.info(`Opening segment — ${s.name}`)}>
                <div className="kb-top"><div className="kb-ic" style={{background: s.bg, color: s.tint}}><Icon size={23} /></div></div>
                <div className="kb-name">{s.name}</div>
                <div className="kb-desc">{s.size}</div>
                <div>{s.tags.map(t => <span key={t} className="seg-tag">{t}</span>)}</div>
                <div className="kb-foot"><div className="kb-counts"><span className="c"><Target size={14} style={{color: s.tint}} /> Targeted prompts tuned</span></div></div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );

  const renderDetail = () => {
    const k = VAULT_KBS.find(x => x.id === kbId);
    if (!k) return null;
    const srcs = VAULT_SRC[k.id] || [];
    const fileCount = k.indexed + k.indexing + k.failed;
    const Icon = k.icon;

    return (
      <>
        <div className="crumb">
          <a onClick={() => setKbId(null)}><ChevronLeft size={14} /> Knowledge vault</a>
          <ChevronRight size={14} /><span>{k.name}</span>
        </div>
        <div className="v-dhead">
          <div className="kb-ic" style={{background: k.bg, color: k.tint}}><Icon size={26} /></div>
          <div>
            <h1>{k.name} <Settings size={17} className="gear" onClick={() => toast.info('Knowledge base settings')} /></h1>
            <div className="dmeta">
              <span>{fileCount} sources</span><span className="sep"></span>
              <span>{k.tokens} tokens</span><span className="sep"></span>
              <span style={{color: 'var(--green-ink)', fontWeight: 600}}>{k.fresh}% fresh</span><span className="sep"></span>
              <span>synced {k.updated}</span>
            </div>
          </div>
          <div className="dtools">
            <button className="btn" onClick={() => toast.success('New folder created')}>
              <FolderPlus size={16} className="inline mr-1" style={{verticalAlign: '-2px'}} /> New folder
            </button>
            <button className="btn primary" onClick={() => setModalType('add-source')}>
              <Plus size={16} className="inline mr-1" style={{verticalAlign: '-2px'}} /> Add source
            </button>
          </div>
        </div>

        <div className="dtabs">
          <button className={`dtab ${detailTab === 'files' ? 'on' : ''}`} onClick={() => setDetailTab('files')}>
            <Files size={15} /> Files
          </button>
          <button className={`dtab ${detailTab === 'search' ? 'on' : ''}`} onClick={() => setDetailTab('search')}>
            <Search size={15} /> Search
          </button>
        </div>

        {detailTab === 'files' ? (
          <div className="v-detail">
            <div>
              <div className="pathbar">
                <span className="p"><Database size={15} /> {k.name}</span>
                <div className="spacer"></div>
                <button className="btn" onClick={() => setModalType('add-source')}>
                  <Plus size={16} className="inline mr-1" style={{verticalAlign: '-2px'}} /> Add source
                </button>
              </div>
              {srcs.map((s, i) => {
                if (s.f) {
                  return (
                    <div key={i} className="src-row folder" style={{animationDelay: `${i*45}ms`} as React.CSSProperties} onClick={() => toast.info(`Opening folder — ${s.name}`)}>
                      <div className="src-ic fold"><Folder size={18} /></div>
                      <div className="src-main"><div className="src-nm">{s.name}</div><div className="src-sub">{s.items} sources</div></div>
                      <div className="src-meta"><ChevronRight size={18} style={{color: 'var(--faint)'}} /></div>
                    </div>
                  );
                }
                const SIcon = s.ic;
                return (
                  <div key={i} className="src-row" style={{animationDelay: `${i*45}ms`} as React.CSSProperties}>
                    <div className="src-ic"><SIcon size={18} style={{color: s.tc}} /></div>
                    <div className="src-main">
                      <div className="src-nm">{s.name}</div>
                      <div className="src-sub"><span className="type-chip">{s.type}</span></div>
                    </div>
                    <div className="src-meta">
                      {s.status === 'indexing' && <div className="miniprog"><i style={{width: `${s.progress}%`}}></i></div>}
                      {s.status === 'indexed' && <div className="src-chunks"><b>{s.chunks}</b>chunks</div>}
                      {s.status === 'failed' && <button className="btn" style={{fontSize: 11, padding: '5px 11px'}} onClick={(e)=>{e.stopPropagation();toast.info(`Retrying — ${s.name}`)}}>Retry</button>}
                      {(s.status !== 'indexing' && s.status !== 'indexed' && s.status !== 'failed') && <div className="src-chunks" style={{color: 'var(--faint)'}}>—</div>}
                      
                      {s.status === 'indexed' && <span className="st indexed"><CircleCheck size={13} /> Indexed</span>}
                      {s.status === 'indexing' && <span className="st indexing"><Loader2 size={13} /> Indexing</span>}
                      {s.status === 'queued' && <span className="st queued"><Clock size={13} /> Queued</span>}
                      {s.status === 'failed' && <span className="st failed"><AlertTriangle size={13} /> Failed</span>}
                      
                      <span className="src-when">{s.when}</span>
                      <button className="src-kebab" onClick={(e) => { e.stopPropagation(); toast.info('Source options'); }}><MoreVertical size={18} /></button>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="v-side">
              <div className="card">
                <div className="side-h"><Zap size={15} /> What this vault powers</div>
                <div style={{fontSize: 12, color: 'var(--muted)', marginBottom: 13, lineHeight: 1.5}}>Citations this base has earned across engines, last 30 days.</div>
                {k.engines.map(e => {
                  const w = 40 + Math.round(Math.random()*55);
                  return (
                    <div key={e} className="eng-line">
                      <span className="nm">{e}</span>
                      <div className="eng-bar"><i style={{width: `${w}%`, background: ENGINE_COLORS[e]||'#94A3B8'}}></i></div>
                      <span className="cc">{Math.round(w*1.6)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="v-bigsearch">
              <Search size={20} />
              <input placeholder="Search this vault the way an AI engine would…" defaultValue="what makes Acme fast" />
              <span className="kbd" style={{background: 'var(--bg)', border: '1px solid var(--line)', padding: '2px 6px', borderRadius: 4, fontSize: 12}}>↵</span>
            </div>
            <div className="v-searchhint">
              <Sparkles size={14} style={{color: 'var(--orange)', verticalAlign: '-2px'}} /> Semantic search — ranked by how a model would retrieve it, not keyword matching.
            </div>
            {/* Hardcoded search results */}
            <div className="res" style={{animationDelay: '0ms'}}>
              <div className="res-top"><div className="src-ic"><FileText size={15} style={{color: '#DC2626'}} /></div><span className="res-from">Brand positioning 2026.pdf</span><span className="res-rel">98% match</span></div>
              <div className="res-txt">Acme is the <mark>fastest way</mark> for revenue teams to ground AI answers in their own approved messaging, cutting hallucinated claims to near zero.</div>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="view opus-scope">
      {kbId ? renderDetail() : renderLanding()}

      {/* MODALS */}
      {modalType && (
        <div className="modal-host show">
          <div className="modal-ov" onClick={() => setModalType(null)}></div>
          <div className="modal">
            {modalType === 'create-kb' && (
              <>
                <div className="modal-head">
                  <div>
                    <div className="mt">New knowledge base</div>
                    <div className="ms">Group related sources so answers stay on-message.</div>
                  </div>
                  <button className="modal-x" onClick={() => setModalType(null)}><X size={18} /></button>
                </div>
                <div className="modal-body">
                  <div className="field"><label>Name</label><input type="text" placeholder="e.g. Product & pricing" /></div>
                  <div className="modal-actions">
                    <button className="btn" onClick={() => setModalType(null)}>Cancel</button>
                    <button className="btn primary" onClick={() => { setModalType(null); toast.success('Knowledge Base created'); }}><Check size={16} className="inline mr-1" /> Create base</button>
                  </div>
                </div>
              </>
            )}
            
            {modalType === 'add-source' && (
              <>
                <div className="modal-head">
                  <div>
                    <div className="mt">Add a source</div>
                    <div className="ms">Pick how Citationly should pull in this knowledge.</div>
                  </div>
                  <button className="modal-x" onClick={() => setModalType(null)}><X size={18} /></button>
                </div>
                <div className="modal-body">
                  <div className="add-grid">
                    {ADD_METHODS.map((m, i) => {
                      const Icon = m.ic;
                      return (
                        <button key={i} className="add-card" onClick={() => { setModalType(null); toast.success(`Starting: ${m.t} — indexing will begin shortly`); }}>
                          <div className="add-ic" style={{background: m.bg, color: m.tint}}><Icon size={21} /></div>
                          <div className="add-t">{m.t}</div>
                          <div className="add-d">{m.d}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
