export const initGeo = function initGeo(){
    ['geoTrend','geoSov'].forEach(function(id){ var c=Chart.getChart(id); if(c) c.destroy(); });
    var days=Array.from({length:30},function(_,i){return i+1;});
    var data=[120,138,150,142,128,160,148,135,158,152,140,165,158,148,170,162,155,175,168,160,178,172,165,182,176,170,185,178,172,188];
    new Chart(document.getElementById('geoTrend'),{type:'line',
      data:{labels:days, datasets:[{data:data, borderColor:'#6366F1', backgroundColor:'rgba(99,102,241,0.10)', fill:true, tension:0.4, pointRadius:0, borderWidth:2.5}]},
      options:{responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}, tooltip:{callbacks:{title:function(c){return 'Day '+c[0].label;}, label:function(c){return 'Score: '+c.parsed.y;}}}}, scales:{x:{ticks:{color:'#94A3B8',font:{size:10},maxTicksLimit:8},grid:{display:false}}, y:{min:0,max:220,ticks:{stepSize:50,color:'#94A3B8',font:{size:11}},grid:{color:'rgba(148,163,184,0.15)'}}}}});
    var sov=[{n:'Acme Corp',v:38.4,c:'#6366F1'},{n:'Profound',v:22.1,c:'#2563EB'},{n:'BrightEdge',v:15.7,c:'#7C3AED'},{n:'Semrush',v:12.3,c:'#16A34A'},{n:'Others',v:11.5,c:'#CBD5E1'}];
    new Chart(document.getElementById('geoSov'),{type:'doughnut',
      data:{labels:sov.map(function(s){return s.n;}), datasets:[{data:sov.map(function(s){return s.v;}), backgroundColor:sov.map(function(s){return s.c;}), borderWidth:2, borderColor:'#fff'}]},
      options:{responsive:true, maintainAspectRatio:false, cutout:'68%', plugins:{legend:{display:false}, tooltip:{callbacks:{label:function(c){return c.label+': '+c.parsed+'%';}}}}}});
    document.getElementById('geoSovList').innerHTML=sov.map(function(s){return '<div class="sov-row"><span class="sov-dot" style="background:'+s.c+';"></span><span class="sov-name">'+s.n+'</span><span class="sov-val">'+s.v+'%</span></div>';}).join('');
  };

export const initGeoOpt = function initGeoOpt(){ GO.mode='url'; GO.schema='Article'; };

export const initAnsSim = function initAnsSim(){ AS.result=null; AS.running=false; AS.battleComp=null; AS.runs=[]; };

export const asRun = function asRun(){
    if(AS.running) return;
    var prompt=(document.getElementById('asPrompt').value||'').trim();
    if(!prompt){ toast('Type a question first','info'); return; }
    AS.brand=(document.getElementById('asBrand').value||'your brand').trim()||'your brand';
    var sc=asScenario();
    AS.running=true;
    var btn=document.getElementById('asRunBtn'); btn.disabled=true;
    document.getElementById('asResults').classList.remove('on');
    var load=document.getElementById('asLoad'); load.classList.add('on');
    var i=0, stepEl=document.getElementById('asStep');
    var iv=setInterval(function(){ i=Math.min(i+1,AS_STEPS.length-1); stepEl.textContent=AS_STEPS[i]; },1300);

    var sys='You are an AI search assistant answering for '+sc.persona+' who is '+sc.stage+', in '+sc.region+'. Give a concise, well-structured answer (about 120-170 words) naming specific real products, brands, or sources where relevant, as a real AI search engine would for this person.';
    asCallClaude([{role:'user', content:prompt}], sys)
    .then(function(answer){
      var ap='Analyze the AI answer below for brand visibility. The brand we care about is "'+AS.brand+'".\n\nAnswer:\n"""\n'+answer+'\n"""\n\nReturn ONLY valid JSON, no prose:\n{"mentioned":true/false,"position":"e.g. 1st of 4 or Not mentioned","sentiment":"pos|neu|neg","sharePct":0-100,"competitors":[{"name":"X","sharePct":0-100}],"sources":[{"name":"domain or source","type":"you|comp|third"}],"summary":"one short sentence"}\nInclude our brand in competitors if mentioned. sharePct across named brands should roughly sum to 100.';
      return asCallClaude([{role:'user', content:ap}], 'You output only strict JSON. No markdown.')
        .then(function(jtxt){
          var data; try{ data=asParseJSON(jtxt); }catch(e){ data=asFallbackAnalysis(answer); }
          clearInterval(iv); load.classList.remove('on');
          AS.result={prompt:prompt, answer:answer, data:data, sc:sc};
          asRender();
          AS.running=false; btn.disabled=false;
        });
    })
    .catch(function(){
      clearInterval(iv); load.classList.remove('on');
      AS.result=asDemoResult(prompt, sc);
      asRender();
      toast('Live AI unavailable \u2014 showing a simulated result','info');
      AS.running=false; btn.disabled=false;
    });
  };

export const asPick = function asPick(q){ var el=document.getElementById('asPrompt'); el.value=q; asGrow(el); el.focus(); };

export const asGrow = function asGrow(el){ el.style.height='auto'; el.style.height=Math.min(el.scrollHeight,120)+'px'; };

export const asRunDiff = function asRunDiff(){
    if(!AS.result){ toast('Run a simulation first','info'); return; }
    var content=(document.getElementById('asContent').value||'').trim();
    if(!content){ toast('Paste your page content first','info'); return; }
    var btn=document.getElementById('asDiffBtn'); btn.disabled=true;
    var out=document.getElementById('asDiffOut');
    out.innerHTML='<div class="as-ans-empty" style="padding:18px"><div class="as-spin" style="width:26px;height:26px;border-width:2.5px;margin:0 auto 10px"></div>Simulating both answers\u2026</div>';
    var p='Question: "'+AS.result.prompt+'"\nMy brand: "'+AS.brand+'"\nMy page content:\n"""\n'+content.slice(0,1500)+'\n"""\n\nSimulate two short AI answers (60-90 words each) to the question: one WITHOUT considering my content, one WITH my content available as a source. Return ONLY JSON: {"without":"...","with":"...","changed":true/false,"verdict":"one sentence on what changed for my brand"}';
    asCallClaude([{role:'user', content:p}], 'You output only strict JSON. No markdown.')
    .then(function(txt){ var d; try{ d=asParseJSON(txt); }catch(e){ d=null; } asRenderDiff(d, content); btn.disabled=false; })
    .catch(function(){ asRenderDiff(null, content); btn.disabled=false; });
  };

export const asRunBattle = function asRunBattle(){
    if(!AS.result) return;
    var comp=document.getElementById('asBattleSel').value;
    if(!comp){ document.getElementById('asBattleOut').innerHTML='<div class="as-ans-empty" style="padding:18px"><i class="ti ti-swords"></i>Pick a competitor to see how the answer shifts when framed in their favor.</div>'; return; }
    AS.battleComp=comp;
    var out=document.getElementById('asBattleOut');
    out.innerHTML='<div class="as-ans-empty" style="padding:18px"><div class="as-spin" style="width:26px;height:26px;border-width:2.5px;margin:0 auto 10px"></div>Simulating a '+comp+'-framed answer\u2026</div>';
    var p='Question: "'+AS.result.prompt+'". Imagine the question were subtly framed to favor "'+comp+'" over "'+AS.brand+'". Estimate the share of answer each would get. Return ONLY JSON: {"youPct":0-100,"compPct":0-100,"note":"one sentence on why the rival wins or loses ground"}';
    asCallClaude([{role:'user', content:p}], 'You output only strict JSON. No markdown.')
    .then(function(txt){ var d; try{ d=asParseJSON(txt); }catch(e){ d=null; } asRenderBattle(d, comp); })
    .catch(function(){ asRenderBattle(null, comp); });
  };

export const goptMode = function goptMode(m){
    GO.mode=m;
    var tabs=document.querySelectorAll('.gopt-tab');
    for(var i=0;i<tabs.length;i++){ tabs[i].classList.toggle('on', tabs[i].getAttribute('data-m')===m); }
    document.getElementById('goptUrlMode').style.display = m==='url'?'block':'none';
    document.getElementById('goptPasteMode').style.display = m==='paste'?'block':'none';
  };

export const goptRun = function goptRun(){
    var has = GO.mode==='url' ? (document.getElementById('goptUrl').value||'').trim() : (document.getElementById('goptPaste').value||'').trim();
    if(!has){ goptToast('Enter a URL or paste content first'); return; }
    var res=document.getElementById('goptResults'); res.classList.remove('on');
    var load=document.getElementById('goptLoad'); load.classList.add('on');
    var i=0, stepEl=document.getElementById('goptStep');
    var iv=setInterval(function(){ i++; if(i<GO_STEPS.length){ stepEl.textContent=GO_STEPS[i]; } },420);
    setTimeout(function(){
      clearInterval(iv);
      load.classList.remove('on');
      goptRender();
      var ex=document.getElementById('goptExport'); ex.disabled=false; ex.style.opacity='1'; ex.style.cursor='pointer';
      res.classList.add('on');
      res.scrollIntoView({behavior:'smooth', block:'start'});
    },2100);
  };

export const goptGenSchema = function goptGenSchema(){
    var k=document.getElementById('goptSchSelect').value;
    GO.schema=k;
    var out=document.getElementById('goptSchOut');
    out.innerHTML='<div class="sch-empty"><div class="gopt-spin" style="width:26px;height:26px;border-width:2.5px;"></div>Generating '+k+' schema\u2026</div>';
    setTimeout(function(){
      out.innerHTML='<div class="code-wrap"><div class="code-head"><span><i class="ti ti-braces"></i> '+k+' schema</span>'+
        '<button class="copy-btn" onclick="goptCopySchema()"><i class="ti ti-copy"></i>Copy</button></div><pre>'+GO_SCHEMA[k].pretty+'</pre></div>';
      goptToast(k+' schema generated');
    },650);
  };

export const goptSample = function goptSample(){
    goptMode('url');
    document.getElementById('goptUrl').value='https://acmecorp.com/guide/best-project-management-tools';
    document.getElementById('goptTarget').value='best project management tools for teams';
    document.getElementById('goptEngine').value='ChatGPT, Perplexity, AI Overviews';
    goptRun();
  };

export const goptToast = function goptToast(msg){
    var t=document.getElementById('goptToast'); if(!t) return;
    document.getElementById('goptToastMsg').textContent=msg;
    t.classList.add('on'); clearTimeout(GO.toastT);
    GO.toastT=setTimeout(function(){ t.classList.remove('on'); },2600);
  };

