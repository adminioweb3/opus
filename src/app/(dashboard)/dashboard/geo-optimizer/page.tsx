"use client";

import { useEffect } from "react";
import * as geoScripts from "../geo-scripts";

export default function GeoOptimizerPage() {
  useEffect(() => {
    // @ts-ignore
    window.GO = window.GO || { mode: 'url', schema: 'Article', toastT: null };
    // @ts-ignore
    window.goptMode = geoScripts.goptMode;
    // @ts-ignore
    window.goptRun = geoScripts.goptRun;
    // @ts-ignore
    window.goptGenSchema = geoScripts.goptGenSchema;
    // @ts-ignore
    window.goptSample = geoScripts.goptSample;
    // @ts-ignore
    window.goptToast = geoScripts.goptToast;
    
    // We also need the fake data for the simulation to work if they click run
    // @ts-ignore
    window.GO_STEPS = ["Crawling content structure", "Analyzing semantic relevance", "Checking entity coverage", "Evaluating authority signals", "Scoring against AI engine preferences"];
    // @ts-ignore
    window.GO_SCHEMA = {
      'Article': { pretty: '{\n  "@context": "https://schema.org",\n  "@type": "Article",\n  "headline": "Example",\n  "author": {\n    "@type": "Person",\n    "name": "Jane Doe"\n  }\n}' },
      'FAQPage': { pretty: '{\n  "@context": "https://schema.org",\n  "@type": "FAQPage"\n}' },
      'HowTo': { pretty: '{\n  "@context": "https://schema.org",\n  "@type": "HowTo"\n}' },
      'Product': { pretty: '{\n  "@context": "https://schema.org",\n  "@type": "Product"\n}' },
      'Organization': { pretty: '{\n  "@context": "https://schema.org",\n  "@type": "Organization"\n}' },
      'BreadcrumbList': { pretty: '{\n  "@context": "https://schema.org",\n  "@type": "BreadcrumbList"\n}' },
      'Review': { pretty: '{\n  "@context": "https://schema.org",\n  "@type": "Review"\n}' },
      'VideoObject': { pretty: '{\n  "@context": "https://schema.org",\n  "@type": "VideoObject"\n}' },
      'Event': { pretty: '{\n  "@context": "https://schema.org",\n  "@type": "Event"\n}' }
    };
    
    // @ts-ignore
    window.goptCopySchema = function() { geoScripts.goptToast("Copied to clipboard"); };
    
    // Mock goptRender
    // @ts-ignore
    window.goptRender = function() {
      const gv = document.getElementById("goptScoreNum");
      if (gv) gv.innerText = "85";
      const v = document.getElementById("goptVerdict");
      if (v) { v.className = "gopt-verdict gv-good"; v.innerText = "Excellent"; }
    };

    geoScripts.initGeoOpt();
  }, []);
  return <div dangerouslySetInnerHTML={{ __html: '<div class="content">' + "<div class=\"view\"><div class=\"page-head\"><div><h1>GEO Optimizer</h1><p>Audit a page and optimize it to get cited, quoted, and surfaced by AI search engines.</p></div><div class=\"head-tools\"><button class=\"export\" onclick=\"goptSample()\"><i class=\"ti ti-flask\"></i>Load sample</button><button class=\"export\" id=\"goptExport\" onclick=\"goptToast('Report exported as PDF')\" disabled style=\"opacity:.5;cursor:not-allowed;\"><i class=\"ti ti-download\"></i>Export</button></div></div><div class=\"gopt-input\"><div class=\"gopt-tabs\"><button class=\"gopt-tab on\" data-m=\"url\" onclick=\"goptMode('url')\"><i class=\"ti ti-link\"></i>Analyze URL</button><button class=\"gopt-tab\" data-m=\"paste\" onclick=\"goptMode('paste')\"><i class=\"ti ti-clipboard-text\"></i>Paste content</button></div><div id=\"goptUrlMode\"><div class=\"gopt-row\"><div class=\"gopt-url\"><i class=\"ti ti-world\"></i><input id=\"goptUrl\" placeholder=\"https://yourdomain.com/blog/best-crm-software\"></div><button class=\"gopt-go\" onclick=\"goptRun()\"><i class=\"ti ti-sparkles\"></i>Analyze</button></div></div><div id=\"goptPasteMode\" style=\"display:none;\"><textarea class=\"gopt-paste\" id=\"goptPaste\" placeholder=\"Paste your article, landing page copy, or markdown here…\"></textarea><div style=\"text-align:right; margin-top:11px;\"><button class=\"gopt-go\" onclick=\"goptRun()\"><i class=\"ti ti-sparkles\"></i>Analyze content</button></div></div><div class=\"gopt-targets\"><div class=\"gopt-tf\"><i class=\"ti ti-target-arrow\"></i><input id=\"goptTarget\" placeholder=\"Target query — e.g. best CRM for small business\"></div><div class=\"gopt-tf\"><i class=\"ti ti-robot\"></i><input id=\"goptEngine\" placeholder=\"Optimize for — ChatGPT, Perplexity, Gemini, AI Overviews\"></div></div><div class=\"gopt-hint\"><i class=\"ti ti-bulb\"></i>Scores how likely AI engines are to cite this page, then gives exact fixes ranked by impact.</div></div><div class=\"gopt-load\" id=\"goptLoad\"><div class=\"gopt-spin\"></div><p>Analyzing page for AI citation readiness…</p><div class=\"step\" id=\"goptStep\">Crawling content structure</div></div><div id=\"goptResults\"><div class=\"gopt-top\"><div class=\"card gopt-score\"><div class=\"card-head\" style=\"width:100%;\"><div class=\"t\">GEO score</div></div><div class=\"gopt-gauge\"><canvas id=\"goptGauge\" width=\"180\" height=\"180\"></canvas><div class=\"gv\"><b id=\"goptScoreNum\">0</b><span>OF 100</span></div></div><div class=\"gopt-verdict gv-mid\" id=\"goptVerdict\">Needs work</div><div class=\"gopt-sub\" id=\"goptSub\"></div></div><div class=\"card\"><div class=\"card-head\"><div class=\"t\">Fix recommendations</div><span class=\"meta\" id=\"goptFixMeta\">0 issues</span></div><div id=\"goptFixList\"></div></div></div><div class=\"gopt-half\"><div class=\"card\"><div class=\"card-head\"><div class=\"t\">Competitor citation gap</div><span class=\"meta\" id=\"goptCompMeta\">who AI cites for this query</span></div><div id=\"goptComp\"></div></div><div class=\"card\"><div class=\"card-head\"><div class=\"t\">Prompt coverage</div><span class=\"meta\" id=\"goptPromptMeta\">buyer questions</span></div><div id=\"goptPrompt\"></div></div></div><div class=\"gopt-half\"><div class=\"card\"><div class=\"card-head\"><div class=\"t\">Citation gap analysis</div><span class=\"meta\">authority signals</span></div><div id=\"goptCite\"></div></div><div class=\"card\"><div class=\"card-head\"><div class=\"t\">Schema generator</div><span class=\"meta\">JSON-LD</span></div><div class=\"sch-gen\"><div class=\"sch-field\"><label>Schema type</label><div class=\"sch-select\"><i class=\"ti ti-code\"></i><select id=\"goptSchSelect\"><option value=\"Article\">Article</option><option value=\"FAQPage\">FAQPage</option><option value=\"HowTo\">HowTo</option><option value=\"Product\">Product</option><option value=\"Organization\">Organization</option><option value=\"BreadcrumbList\">BreadcrumbList</option><option value=\"Review\">Review</option><option value=\"VideoObject\">VideoObject</option><option value=\"Event\">Event</option></select><i class=\"ti ti-chevron-down sch-chev\"></i></div></div><button class=\"gopt-go sch-genbtn\" onclick=\"goptGenSchema()\"><i class=\"ti ti-sparkles\"></i>Generate</button></div><div id=\"goptSchOut\"><div class=\"sch-empty\"><i class=\"ti ti-code\"></i>Pick a schema type and hit Generate to get copy-ready JSON-LD.</div></div></div></div></div><div class=\"gopt-toast\" id=\"goptToast\"><i class=\"ti ti-circle-check\"></i><span id=\"goptToastMsg\">Done</span></div></div>" + '</div>' }} />;
}