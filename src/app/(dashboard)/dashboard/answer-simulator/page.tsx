"use client";

import { useEffect } from "react";
import * as geoScripts from "../geo-scripts";

export default function AnswerSimulatorPage() {
  useEffect(() => {
    // @ts-ignore
    window.AS = window.AS || { result: null, running: false, battleComp: null, runs: [] };
    // @ts-ignore
    window.asRun = geoScripts.asRun;
    // @ts-ignore
    window.asPick = geoScripts.asPick;
    // @ts-ignore
    window.asGrow = geoScripts.asGrow;
    // @ts-ignore
    window.asRunDiff = geoScripts.asRunDiff;
    // @ts-ignore
    window.asRunBattle = geoScripts.asRunBattle;
    
    // We need mock data for these since it relies on Claude API in the legacy script
    // @ts-ignore
    window.AS_STEPS = ["Analyzing query intent", "Retrieving brand context", "Simulating AI engine response", "Evaluating visibility", "Generating verdict"];
    
    // Mock for asScenario
    // @ts-ignore
    window.asScenario = function() {
      return {
        persona: document.getElementById('asPersona')?.value || 'a user',
        stage: document.getElementById('asStage')?.value || 'research',
        region: document.getElementById('asRegion')?.value || 'Global'
      };
    };

    // Mock for asDemoResult since we don't have Claude
    // @ts-ignore
    window.asDemoResult = function(prompt, sc) {
      return {
        prompt: prompt,
        answer: "Based on our analysis, " + window.AS.brand + " is a strong contender. Some top alternatives include Acme Corp and Profound.",
        data: {
          mentioned: true,
          position: "1st",
          sentiment: "pos",
          sharePct: 65,
          competitors: [{name: window.AS.brand, sharePct: 65}, {name: 'Acme Corp', sharePct: 20}, {name: 'Profound', sharePct: 15}],
          sources: [{name: 'G2', type: 'third'}, {name: window.AS.brand + '.com', type: 'you'}],
          summary: "Highly recommended for " + sc.persona
        },
        sc: sc
      };
    };

    // Mock for toast
    // @ts-ignore
    window.toast = function(msg) { console.log("Toast: " + msg); };
    
    // Mock for render functions
    // @ts-ignore
    window.asRender = function() {
      const res = document.getElementById("asResults");
      if (res) res.classList.add("on");
      const num = document.getElementById("asConsNum");
      if (num) num.innerText = "4";
      const body = document.getElementById("asAnsBody");
      if (body) body.innerHTML = "<p>" + window.AS.result.answer + "</p>";
    };
    // @ts-ignore
    window.asRenderDiff = function(d, content) {
      const out = document.getElementById("asDiffOut");
      if (out) out.innerHTML = "<div style='padding: 18px;'>Simulation complete based on content.</div>";
    };
    // @ts-ignore
    window.asRenderBattle = function(d, comp) {
      const out = document.getElementById("asBattleOut");
      if (out) out.innerHTML = "<div style='padding: 18px;'>Battle simulation complete against " + comp + ".</div>";
    };

    geoScripts.initAnsSim();
  }, []);
  return <div dangerouslySetInnerHTML={{ __html: '<div class="content">' + "<div class=\"view\"><div class=\"page-head\"><div><h1>Answer simulator</h1><p>A sandbox to stress-test any question before you publish — control who’s asking, simulate the live answer, and see how to win it.</p></div></div><div class=\"as-console\"><div class=\"as-console-lab\"><i class=\"ti ti-flask-2\"></i>Simulation console</div><div class=\"as-promptbox\"><textarea id=\"asPrompt\" rows=\"1\" placeholder=\"Ask the question a buyer would type into AI…\" oninput=\"asGrow(this)\"></textarea><button class=\"as-run\" id=\"asRunBtn\" onclick=\"asRun()\"><i class=\"ti ti-player-play\"></i>Simulate</button></div><div class=\"as-scenario\"><div class=\"as-sc-field\"><label><i class=\"ti ti-user\"></i>Who’s asking</label><div class=\"as-sc-select\"><select id=\"asPersona\"><option selected>a budget-conscious startup founder</option><option>a non-technical small business owner</option><option>an enterprise IT buyer</option><option>a freelance marketer</option><option>a developer evaluating tools</option></select><i class=\"ti ti-chevron-down chev\"></i></div></div><div class=\"as-sc-field\"><label><i class=\"ti ti-stairs\"></i>Buying stage</label><div class=\"as-sc-select\"><select id=\"asStage\"><option>just starting research</option><option selected>comparing a shortlist</option><option>ready to buy</option><option>looking to switch providers</option></select><i class=\"ti ti-chevron-down chev\"></i></div></div><div class=\"as-sc-field\"><label><i class=\"ti ti-map-pin\"></i>Region</label><div class=\"as-sc-select\"><select id=\"asRegion\"><option selected>United States</option><option>India</option><option>United Kingdom</option><option>Global</option></select><i class=\"ti ti-chevron-down chev\"></i></div></div><div class=\"as-sc-field\"><label><i class=\"ti ti-building-store\"></i>Your brand</label><div class=\"as-brand-in\"><i class=\"ti ti-tag\"></i><input id=\"asBrand\" value=\"Acme Corp\" placeholder=\"Your brand name\"></div></div></div><div class=\"as-note\"><i class=\"ti ti-bolt\"></i>Answers are generated live by AI for your exact scenario. Try a starter:</div><div class=\"as-recap\" style=\"margin-top:10px; margin-bottom:0\"><span class=\"as-recap-pill\" style=\"cursor:pointer\" onclick=\"asPick('What is the best project management tool for small teams?')\"><i class=\"ti ti-sparkles\"></i>What is the best project management tool for small teams?</span><span class=\"as-recap-pill\" style=\"cursor:pointer\" onclick=\"asPick('Which CRM has the best free plan?')\"><i class=\"ti ti-sparkles\"></i>Which CRM has the best free plan?</span><span class=\"as-recap-pill\" style=\"cursor:pointer\" onclick=\"asPick('Top alternatives to Salesforce for startups')\"><i class=\"ti ti-sparkles\"></i>Top alternatives to Salesforce for startups</span><span class=\"as-recap-pill\" style=\"cursor:pointer\" onclick=\"asPick('Best AI writing tools in 2026')\"><i class=\"ti ti-sparkles\"></i>Best AI writing tools in 2026</span></div></div><div class=\"as-load\" id=\"asLoad\"><div class=\"as-spin\"></div><p>Running your scenario through the AI…</p><div class=\"step\" id=\"asStep\">Generating the answer</div></div><div id=\"asResults\"><div class=\"as-recap\" id=\"asRecap\"></div><div class=\"card\" style=\"margin-bottom:16px\"><div class=\"as-section-h\"><div class=\"t\"><i class=\"ti ti-target-arrow\"></i>Visibility consistency</div><span class=\"meta\">AI answers vary run-to-run — how reliably you appear</span></div><div class=\"as-consistency\"><div class=\"as-cons-gauge\"><canvas id=\"asConsGauge\" width=\"170\" height=\"170\"></canvas><div class=\"gv\"><b id=\"asConsNum\">0</b><span>OF 5 RUNS</span></div></div><div class=\"as-runs\"><div class=\"as-runs-h\">Per-run appearance</div><div id=\"asRunList\"></div></div></div></div><div class=\"as-grid\"><div class=\"as-ans-card\"><div class=\"as-ans-top\"><div class=\"as-ans-eic\" id=\"asAnsIc\" style=\"background:#D97706\">C</div><div><div class=\"as-ans-nm\">Live AI answer</div><div class=\"as-ans-sub\" id=\"asAnsSub\">for your scenario</div></div></div><div class=\"as-ans-body\" id=\"asAnsBody\"></div></div><div class=\"as-side\"><div class=\"panel\" id=\"asVerdictPanel\"></div><div class=\"panel\"><div class=\"panel-h\"><i class=\"ti ti-link\"></i>Sources referenced</div><div id=\"asSources\"></div></div></div></div><div class=\"card\" style=\"margin-bottom:16px\"><div class=\"as-section-h\"><div class=\"t\"><i class=\"ti ti-git-compare\"></i>Win / lose diff</div><span class=\"meta\">paste your page content to see if it changes the answer</span></div><textarea class=\"as-paste\" id=\"asContent\" placeholder=\"Paste your page content or key claims here, then click Compare…\"></textarea><button class=\"btn primary\" id=\"asDiffBtn\" onclick=\"asRunDiff()\" style=\"display:inline-flex; align-items:center; gap:6px; margin-bottom:14px\"><i class=\"ti ti-git-compare\"></i>Compare with vs without</button><div id=\"asDiffOut\"><div class=\"as-ans-empty\" style=\"padding:18px\"><i class=\"ti ti-git-compare\"></i>Paste your content above to simulate the answer with and without it.</div></div></div><div class=\"card\"><div class=\"as-section-h\"><div class=\"t\"><i class=\"ti ti-swords\"></i>Battle mode</div><span class=\"meta\">simulate the same question framed to favor a rival</span></div><div class=\"as-battle-bar\"><span style=\"font-size:12.5px; color:var(--muted)\">Pit your brand against:</span><div class=\"as-battle-sel\"><i class=\"ti ti-swords\"></i><select id=\"asBattleSel\" onchange=\"asRunBattle()\"><option value=\"\">Choose a competitor…</option></select></div></div><div id=\"asBattleOut\"><div class=\"as-ans-empty\" style=\"padding:18px\"><i class=\"ti ti-swords\"></i>Pick a competitor to see how the answer shifts when framed in their favor.</div></div></div></div></div>" + '</div>' }} />;
}