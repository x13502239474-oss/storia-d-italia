/* ============================================================
   app.js — 应用核心逻辑
   ============================================================ */
(function(){
  "use strict";

  // ---------- 本地存储 ----------
  const store = {
    get(k, d){ try{ const v = localStorage.getItem("storia_"+k); return v==null?d:JSON.parse(v); }catch(e){ return d; } },
    set(k, v){ try{ localStorage.setItem("storia_"+k, JSON.stringify(v)); }catch(e){} },
  };

  // 进度：{ [chapId]: scrollRatio }
  const progress = store.get("progress", {});
  const bookmarks = store.get("bookmarks", {});   // { [chapId]: {title, ts} }
  const notes = store.get("notes", {});           // { [chapId]: text }
  const lastRead = store.get("lastRead", null);   // { id, ts }

  const $ = (s)=>document.querySelector(s);
  const view = $("#view");
  const drawer = $("#drawer");

  let currentRoute = { view:"home" };
  let currentChapterId = null;
  let searchIndex = null;

  // ---------- 工具 ----------
  function esc(s){ return String(s).replace(/[&<>"]/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c])); }

  function allChapters(){ return Object.values(window.CHAPTERS).sort((a,b)=> (a.order||0)-(b.order||0)); }
  function allPeople(){ return Object.values(window.PEOPLE).sort((a,b)=>a.name.localeCompare(b.name,"zh")); }
  function allMaps(){ return Object.values(window.MAPS); }
  function allTopics(){ return Object.values(window.TOPICS); }

  // 初始化 order
  function assignOrders(){
    let o = 0;
    for(const p of PARTS){
      const chs = allChapters().filter(c=>c.part===p.id).sort((a,b)=>a.num-b.num);
      for(const c of chs){ c.order = o++; }
    }
  }

  // ---------- 视图渲染 ----------
  function setTitle(t){ $("#topbar-title").textContent = t; }

  function navigate(route){
    currentRoute = route;
    window.scrollTo(0,0);
    drawer.classList.remove("open");
    render();
  }

  function render(){
    const r = currentRoute;
    setActiveTab(r.view);
    if(r.view==="home") return renderHome();
    if(r.view==="timeline") return renderTimeline();
    if(r.view==="people") return renderPeople(r);
    if(r.view==="maps") return renderMaps(r);
    if(r.view==="search") return renderSearch();
    if(r.view==="part") return renderPart(r);
    if(r.view==="chapter") return renderChapter(r);
    if(r.view==="topic") return renderTopic(r);
    if(r.view==="person") return renderPerson(r);
    if(r.view==="map") return renderMap(r);
  }

  function setActiveTab(tab){
    document.querySelectorAll(".tab").forEach(t=>{
      t.classList.toggle("active", t.dataset.tab===tab || (tab==="chapter"&&false));
    });
    // 章节阅读时不高亮底部 tab
    const hidden = ["chapter","part","topic","person","map"].includes(tab);
    $("#tabbar").classList.toggle("hidden", hidden);
    $("#btn-back").classList.toggle("hidden", tab==="home");
  }

  function renderBackBtn(handler){
    const b = $("#btn-back");
    b.onclick = handler || (()=>navigate({view:"home"}));
    b.classList.remove("hidden");
  }

  // ---------- 首页 ----------
  function renderHome(){
    setTitle("意大利史诗");
    renderBackBtn(null);
    const cont = lastRead && CHAPTERS[lastRead.id] ? lastRead : null;
    let html = `
    <div class="hero">
      <div class="hero-kicker">${esc(SITE.subtitle)}</div>
      <h1>${esc(SITE.name)}<span class="it">${esc(SITE.nameIT)}</span></h1>
      <p class="sub">一部系统阅读意大利历史的数字图书馆</p>
      <p class="hero-motto">—— ${esc(SITE.motto)} ——</p>
      <div class="hero-cta">
        <a class="btn btn-gold" data-nav="timeline">开始阅读 · 时间轴</a>
        <a class="btn btn-ghost" data-nav="people">人物档案</a>
      </div>
      <div class="progress-wrap"><div id="reading-progress"></div></div>
    </div>`;

    if(cont){
      const ch = CHAPTERS[cont.id];
      const part = PARTS.find(p=>p.id===ch.part);
      html += `
      <div class="continue-card">
        <div class="continue-label">↻ 继续阅读</div>
        <a class="card" data-goto="${esc(cont.id)}">
          <span class="prog"></span>
          <div class="part-num">${esc(part.num)}</div>
          <h3>${esc(ch.title)}</h3>
          <div class="meta"><span>上次 ${timeAgo(cont.ts)}</span><span class="cnt">→ 回到这里</span></div>
        </a>
      </div>`;
    }

    html += `<div class="section">`;
    html += `<div class="section-head"><h2>章节目录</h2><span class="sub">${PARTS.length} 部分 · ${allChapters().length} 章</span></div>`;
    html += `<div class="home-cards">`;
    for(const p of PARTS){
      const chs = allChapters().filter(c=>c.part===p.id);
      const started = chs.some(c=> progress[c.id] > 0);
      const done = chs.filter(c=> progress[c.id] > 0.9).length;
      html += `
      <a class="card ${started?'started':''}" data-part="${p.id}">
        <span class="prog"></span>
        <div class="part-num">${esc(p.num)} · ${esc(p.period)}</div>
        <h3>${esc(p.title)}</h3>
        <p class="part-sub">${esc(p.it)}</p>
        <div class="meta"><span>${chs.length} 章</span><span class="cnt">${done>0?done+' 已读':''}</span></div>
      </a>`;
    }
    html += `</div></div>`;

    // 专题与地图入口
    html += `<div class="section">`;
    html += `<div class="section-head"><h2>专题研究</h2><span class="sub">${allTopics().length} 篇</span></div>`;
    html += `<div class="home-cards">`;
    for(const t of allTopics().slice(0,6)){
      html += `<a class="card" data-topic="${t.id}"><div class="part-num">专题</div><h3>${esc(t.title)}</h3><p class="part-sub">${esc(t.sub||'')}</p></a>`;
    }
    html += `</div></div>`;

    view.innerHTML = html;

    // 事件
    view.querySelectorAll("[data-part]").forEach(el=> el.onclick=()=>navigate({view:"part", id:el.dataset.part}));
    view.querySelectorAll("[data-topic]").forEach(el=> el.onclick=()=>navigate({view:"topic", id:el.dataset.topic}));
    view.querySelectorAll("[data-goto]").forEach(el=> el.onclick=()=>navigate({view:"chapter", id:el.dataset.goto}));
    view.querySelectorAll("[data-nav]").forEach(el=> el.onclick=()=>navigate({view:el.dataset.nav}));

    // 阅读进度条（全书）
    updateOverallProgress();
  }

  function updateOverallProgress(){
    const chs = allChapters();
    if(!chs.length) return;
    let sum = 0;
    for(const c of chs){ const r = progress[c.id]||0; sum += r>0.9?1:(r>0?0.5:0); }
    const el = $("#reading-progress");
    if(el) el.style.width = (sum/chs.length*100)+"%";
  }

  // ---------- 部分页 ----------
  function renderPart(r){
    const p = PARTS.find(x=>x.id===r.id);
    if(!p){ navigate({view:"home"}); return; }
    setTitle(p.title);
    renderBackBtn(()=>navigate({view:"home"}));
    const chs = allChapters().filter(c=>c.part===p.id).sort((a,b)=>a.num-b.num);
    let html = `
    <div class="part-hero">
      <div class="it">${esc(p.num)} · ${esc(p.it)}</div>
      <h1>${esc(p.title)}</h1>
      <p>${esc(p.period)}　·　${esc(p.desc)}</p>
    </div>
    <div class="chap-list">`;
    chs.forEach((c,i)=>{
      const r = progress[c.id]||0;
      const done = r>0.9;
      html += `
      <a class="chap-item" data-chap="${c.id}">
        <span class="chap-num">${c.num}</span>
        <div class="t"><h4>${esc(c.title)}</h4><p>${esc(c.sub||'')}</p></div>
        <span class="state ${done?'done':''}">${done?'✓':(r>0?'◐':'')}</span>
      </a>`;
    });
    html += `</div>`;
    view.innerHTML = html;
    view.querySelectorAll("[data-chap]").forEach(el=> el.onclick=()=>navigate({view:"chapter", id:el.dataset.chap}));
  }

  // ---------- 章节阅读页 ----------
  function renderChapter(r){
    const c = CHAPTERS[r.id];
    if(!c){ navigate({view:"home"}); return; }
    currentChapterId = c.id;
    const p = PARTS.find(x=>x.id===c.part);
    const chs = allChapters().filter(x=>x.part===c.part).sort((a,b)=>a.num-b.num);
    const idx = chs.findIndex(x=>x.id===c.id);
    const prev = idx>0?chs[idx-1]:null;
    const next = idx<chs.length-1?chs[idx+1]:null;
    const bookmarked = !!bookmarks[c.id];
    const note = notes[c.id]||"";

    setTitle(c.title);
    renderBackBtn(()=>navigate({view:"part", id:c.part}));

    let html = `
    <div class="reader">
      <div class="reader-top">
        <div class="kicker">${esc(p.num)} · 第 ${c.num} 章</div>
        <h1>${esc(c.title)}</h1>
        <p class="sub">${esc(c.sub||'')}</p>
        <div class="reader-tools">
          <button class="tool ${bookmarked?'on':''}" id="btn-bookmark">${bookmarked?'★ 已书签':'☆ 书签'}</button>
          <button class="tool" id="btn-note">✎ 笔记</button>
          <span class="wordcount">${c.words? '约 '+c.words+' 字':''}</span>
        </div>
      </div>
      <div class="prose" id="prose">${c.body||''}</div>
      <div class="note-editor hidden" id="note-editor">
        <textarea id="note-ta" placeholder="写下你的阅读笔记……">${esc(note)}</textarea>
        <div class="actions">
          <button class="tool" id="note-cancel">取消</button>
          <button class="tool" id="note-save">保存笔记</button>
        </div>
      </div>
      <div class="note-saved ${note?'':'hidden'}" id="note-saved">${esc(note)}</div>
      <div class="reader-nav">
        ${prev?`<button class="nav-btn prev" data-chap="${prev.id}"><span class="dir">‹ 上一章</span><div class="tt">${esc(prev.title)}</div></button>`:'<div></div>'}
        ${next?`<button class="nav-btn next" data-chap="${next.id}"><span class="dir">下一章 ›</span><div class="tt">${esc(next.title)}</div></button>`:'<div></div>'}
      </div>
    </div>`;
    view.innerHTML = html;

    // 关联跳转
    view.querySelectorAll(".entity").forEach(el=>{
      el.onclick = ()=>{
        const id = el.dataset.entity;
        if(PEOPLE[id]) navigate({view:"person", id});
        else if(TOPICS[id]) navigate({view:"topic", id});
        else if(CHAPTERS[id]) navigate({view:"chapter", id});
      };
    });
    // 图片灯箱
    view.querySelectorAll(".figure img").forEach(img=>{
      img.onclick = ()=>openLightbox(img);
    });
    // 上一章/下一章
    view.querySelectorAll("[data-chap]").forEach(el=> el.onclick=()=>navigate({view:"chapter", id:el.dataset.chap}));
    // 书签
    $("#btn-bookmark").onclick = ()=>{
      if(bookmarks[c.id]) delete bookmarks[c.id];
      else bookmarks[c.id] = { title:c.title, part:p.num, ts:Date.now() };
      store.set("bookmarks", bookmarks);
      renderChapter(r);
      restoreScroll(c.id);
    };
    // 笔记
    $("#btn-note").onclick = ()=>{
      const ed = $("#note-editor");
      ed.classList.toggle("hidden");
      if(!ed.classList.contains("hidden")) $("#note-ta").focus();
    };
    $("#note-cancel").onclick = ()=> $("#note-editor").classList.add("hidden");
    $("#note-save").onclick = ()=>{
      const v = $("#note-ta").value.trim();
      if(v) notes[c.id] = v; else delete notes[c.id];
      store.set("notes", notes);
      renderChapter(r);
      restoreScroll(c.id);
    };

    restoreScroll(c.id);

    // 记录进度（滚动监听）
    let lastSave = 0;
    const onScroll = ()=>{
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const ratio = max>0? Math.min(1, doc.scrollTop/max):0;
      progress[c.id] = ratio;
      const now = Date.now();
      if(now - lastSave > 400){
        lastSave = now;
        store.set("progress", progress);
        store.set("lastRead", { id:c.id, ts:now });
      }
    };
    window.addEventListener("scroll", onScroll, {passive:true});
    window.__chapterScroll = onScroll;
  }

  function restoreScroll(id){
    const r = progress[id]||0;
    if(r>0.01 && r<0.99){
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      requestAnimationFrame(()=>{ window.scrollTo(0, max*r); });
    }
  }

  // ---------- 专题 ----------
  function renderTopic(r){
    const t = TOPICS[r.id];
    if(!t){ navigate({view:"home"}); return; }
    setTitle(t.title);
    renderBackBtn(()=>navigate({view:"home"}));
    let html = `
    <div class="part-hero">
      <div class="it">专题研究 · APPROFONDIMENTO</div>
      <h1>${esc(t.title)}</h1>
      <p>${esc(t.sub||'')}</p>
    </div>
    <div class="reader"><div class="prose">${t.body||''}</div></div>`;
    view.innerHTML = html;
    bindProse();
  }

  function bindProse(){
    view.querySelectorAll(".entity").forEach(el=>{
      el.onclick = ()=>{
        const id = el.dataset.entity;
        if(PEOPLE[id]) navigate({view:"person", id});
        else if(TOPICS[id]) navigate({view:"topic", id});
        else if(CHAPTERS[id]) navigate({view:"chapter", id});
      };
    });
    view.querySelectorAll(".figure img").forEach(img=> img.onclick=()=>openLightbox(img));
    // 图片加载失败时优雅隐藏（避免裂图/空白占位）
    view.querySelectorAll("img").forEach(img=>{
      if(img.complete && img.naturalWidth===0){
        const f = img.closest("figure") || img.closest(".person-card");
        if(f) f.style.display = "none";
        else img.style.display = "none";
      }
    });
  }

  // 全局图片错误兜底（捕获阶段，error 不冒泡）
  document.addEventListener("error", (e)=>{
    const t = e.target;
    if(t && t.tagName === "IMG"){
      const f = t.closest("figure") || t.closest(".person-card");
      if(f) f.style.display = "none";
      else t.style.display = "none";
    }
  }, true);

  // ---------- 人物 ----------
  function renderPeople(r){
    setTitle("人物档案");
    renderBackBtn(()=>navigate({view:"home"}));
    const era = r.era || "all";
    const people = allPeople().filter(p=> era==="all" || p.era===era);
    // 时代筛选
    const eras = ["古代","中世纪","文艺复兴","近代","统一运动","现代"];
    let html = `<div class="list-page">
      <div class="page-title">历史人物档案 <span style="font-size:13px;color:var(--ink-soft)">PERSONAGGI</span></div>
      <div class="filter-row">
        <button class="chip ${era==='all'?'active':''}" data-era="all">全部</button>
        ${eras.map(e=>`<button class="chip ${era===e?'active':''}" data-era="${e}">${e}</button>`).join('')}
      </div>
      <div class="people-grid">`;
    for(const p of people){
      const avatarHtml = p.img
        ? `<img class="avatar-img" src="${esc(p.img)}" alt="${esc(p.name)}" loading="lazy">`
        : `<div class="avatar">${esc(p.name[0])}</div>`;
      html += `
      <a class="person-card" data-person="${p.id}">
        ${avatarHtml}
        <h4>${esc(p.name)}</h4>
        <div class="y">${esc(p.years||'')}</div>
        <div class="r">${esc(p.role||'')}</div>
      </a>`;
    }
    html += `</div></div>`;
    view.innerHTML = html;
    view.querySelectorAll("[data-era]").forEach(el=> el.onclick=()=>navigate({view:"people", era:el.dataset.era}));
    view.querySelectorAll("[data-person]").forEach(el=> el.onclick=()=>navigate({view:"person", id:el.dataset.person}));
  }

  function renderPerson(r){
    const p = PEOPLE[r.id];
    if(!p){ navigate({view:"people"}); return; }
    setTitle(p.name);
    renderBackBtn(()=>navigate({view:"people"}));
    let html = `
    <div class="part-hero">
      <div class="it">人物档案 · PERSONAGGIO</div>
      <h1>${esc(p.name)}</h1>
      <p>${esc(p.years||'')}　·　${esc(p.role||'')}</p>
    </div>
    <div class="reader"><div class="prose">${p.body||''}</div></div>`;
    view.innerHTML = html;
    if(p.img){
      const hero = view.querySelector(".part-hero");
      const fig = document.createElement("figure");
      fig.className = "portrait";
      fig.innerHTML = `<img src="${esc(p.img)}" alt="${esc(p.name)}" loading="lazy"><figcaption>${esc(p.name)} 肖像 · Wikimedia Commons</figcaption>`;
      hero.after(fig);
    }
    bindProse();
  }

  // ---------- 地图 ----------
  function renderMaps(r){
    setTitle("历史地图");
    renderBackBtn(()=>navigate({view:"home"}));
    const maps = allMaps();
    let html = `<div class="list-page"><div class="page-title">历史地图 <span style="font-size:13px;color:var(--ink-soft)">CARTE STORICHE</span></div>`;
    for(const m of maps){
      html += `
      <a class="map-card" data-map="${m.id}">
        <h4>${esc(m.title)}</h4>
        <div class="y">${esc(m.years||'')}</div>
        <p>${esc(m.desc||'')}</p>
      </a>`;
    }
    html += `</div>`;
    view.innerHTML = html;
    view.querySelectorAll("[data-map]").forEach(el=> el.onclick=()=>navigate({view:"map", id:el.dataset.map}));
  }

  function renderMap(r){
    const m = MAPS[r.id];
    if(!m){ navigate({view:"maps"}); return; }
    setTitle(m.title);
    renderBackBtn(()=>navigate({view:"maps"}));
    let html = `
    <div class="map-view">
      <div class="page-title">${esc(m.title)}</div>
      <div class="map-ctrl">
        <button id="map-in">＋ 放大</button>
        <button id="map-out">－ 缩小</button>
        <button id="map-reset">重置</button>
      </div>
      <div class="map-canvas" id="map-canvas">${m.svg||''}</div>
      ${m.legend?`<div class="map-legend">${m.legend}</div>`:''}
      <div class="map-desc">${m.body||''}</div>
    </div>`;
    view.innerHTML = html;

    // 地图缩放
    let scale = 1;
    const canvas = $("#map-canvas");
    const applyScale = ()=>{ canvas.style.transform = `scale(${scale})`; canvas.style.transformOrigin = "top left"; };
    $("#map-in").onclick = ()=>{ scale = Math.min(3, scale+0.2); applyScale(); };
    $("#map-out").onclick = ()=>{ scale = Math.max(0.5, scale-0.2); applyScale(); };
    $("#map-reset").onclick = ()=>{ scale=1; applyScale(); };

    // 地图区域高亮
    canvas.querySelectorAll("[data-region]").forEach(reg=>{
      reg.onclick = ()=>{
        const info = reg.dataset.info;
        if(info){
          // 简单提示
          const tip = document.createElement("div");
          tip.style.cssText = "position:absolute;top:10px;right:10px;background:#3f1824;color:#f6efe3;padding:10px 14px;border-radius:8px;font-size:13px;max-width:60%;z-index:5";
          tip.textContent = info;
          canvas.querySelectorAll(".map-tip").forEach(x=>x.remove());
          tip.className = "map-tip";
          canvas.style.position = "relative";
          canvas.appendChild(tip);
          setTimeout(()=>tip.remove(), 4000);
        }
      };
    });
    bindProse();
  }

  // ---------- 时间轴 ----------
  function renderTimeline(){
    setTitle("历史时间轴");
    renderBackBtn(()=>navigate({view:"home"}));
    const events = (window.TIMELINE || []);
    let html = `<div class="timeline">`;
    let curEra = null;
    for(const ev of events){
      if(ev.era !== curEra){ curEra = ev.era; html += `<div class="tl-era"><div class="era-head">${esc(curEra)}</div>`; }
      html += `
      <div class="tl-item">
        <div class="yr">${esc(ev.year)}</div>
        <div class="ev" data-goto="${ev.to?esc(ev.to):''}">${esc(ev.title)}</div>
        <div class="ds">${esc(ev.desc||'')}</div>
      </div>`;
      if(ev.eraEnd){ html += `</div>`; }
    }
    if(events.length) html += `</div></div>`;
    else html += `<div class="empty"><div class="big">◈</div>时间轴加载中</div>`;
    view.innerHTML = html;
    view.querySelectorAll("[data-goto]").forEach(el=>{
      if(el.dataset.goto) el.onclick=()=>{
        const id = el.dataset.goto;
        if(CHAPTERS[id]) navigate({view:"chapter", id});
        else if(TOPICS[id]) navigate({view:"topic", id});
        else if(PEOPLE[id]) navigate({view:"person", id});
      };
    });
  }

  // ---------- 搜索 ----------
  function renderSearch(){
    setTitle("全文搜索");
    renderBackBtn(()=>navigate({view:"home"}));
    view.innerHTML = `
    <div class="search-box"><span style="color:var(--gold);font-size:20px">⌕</span><input id="search-input" placeholder="搜索章节、人物、事件……" autocomplete="off"></div>
    <div class="search-results" id="search-results"></div>`;
    const input = $("#search-input");
    input.focus();
    input.oninput = ()=> doSearch(input.value.trim());
  }

  function buildSearchIndex(){
    if(searchIndex) return;
    searchIndex = [];
    for(const c of allChapters()){
      searchIndex.push({ id:c.id, type:"chapter", title:c.title, text:stripHtml(c.body), part:c.part });
    }
    for(const t of allTopics()){
      searchIndex.push({ id:t.id, type:"topic", title:t.title, text:stripHtml(t.body), part:"" });
    }
    for(const p of allPeople()){
      searchIndex.push({ id:p.id, type:"person", title:p.name, text:stripHtml(p.body), part:"" });
    }
  }
  function stripHtml(h){ const d=document.createElement("div"); d.innerHTML=h||""; return d.textContent||""; }

  function doSearch(q){
    const box = $("#search-results");
    if(!q){ box.innerHTML = `<div class="empty">输入关键词开始搜索</div>`; return; }
    buildSearchIndex();
    const ql = q.toLowerCase();
    const res = [];
    for(const it of searchIndex){
      const ti = it.title.toLowerCase();
      const tx = it.text.toLowerCase();
      if(ti.includes(ql) || tx.includes(ql)){
        const idx = tx.indexOf(ql);
        let snip = it.text.slice(Math.max(0,idx-30), idx+50);
        res.push({...it, snip});
      }
    }
    // 标题匹配优先
    res.sort((a,b)=>(b.title.toLowerCase().includes(ql)?1:0)-(a.title.toLowerCase().includes(ql)?1:0));
    if(!res.length){ box.innerHTML = `<div class="empty">没有找到与"${esc(q)}"相关的内容</div>`; return; }
    let html = `<div style="font-family:var(--sans);font-size:12px;color:var(--ink-soft);margin:6px 0 12px">${res.length} 条结果</div>`;
    for(const r of res.slice(0,80)){
      const tag = {chapter:"章节", topic:"专题", person:"人物"}[r.type];
      html += `
      <a class="sr-item" data-sr="${r.id}" data-type="${r.type}">
        <div class="tag">${tag}</div>
        <div class="t">${esc(r.title)}</div>
        <div class="snip">${highlight(r.snip, q)}</div>
      </a>`;
    }
    box.innerHTML = html;
    box.querySelectorAll("[data-sr]").forEach(el=> el.onclick=()=>{
      const id = el.dataset.sr, ty = el.dataset.type;
      navigate({view: ty==="topic"?"topic":ty==="person"?"person":"chapter", id});
    });
  }
  function highlight(text, q){
    const i = text.toLowerCase().indexOf(q.toLowerCase());
    if(i<0) return esc(text);
    return esc(text.slice(0,i)) + "<mark>" + esc(text.slice(i,i+q.length)) + "</mark>" + esc(text.slice(i+q.length));
  }

  // ---------- 灯箱 ----------
  function openLightbox(img){
    const lb = $("#lightbox");
    $("#lightbox-img").src = img.src;
    $("#lightbox-cap").textContent = img.closest("figure")?.querySelector("figcaption")?.textContent || img.alt || "";
    lb.classList.add("show");
  }
  function closeLightbox(){ $("#lightbox").classList.remove("show"); }

  // ---------- 抽屉 ----------
  function renderDrawer(){
    const body = $("#drawer-body");
    let html = `
    <a class="d-nav" data-nav="home"><span class="ico">⌂</span>首页</a>
    <a class="d-nav" data-nav="timeline"><span class="ico">◈</span>历史时间轴</a>
    <a class="d-nav" data-nav="people"><span class="ico">❦</span>人物档案</a>
    <a class="d-nav" data-nav="maps"><span class="ico">🗺</span>历史地图</a>
    <a class="d-nav" data-nav="search"><span class="ico">⌕</span>全文搜索</a>
    <div style="height:12px"></div>`;
    for(const p of PARTS){
      const chs = allChapters().filter(c=>c.part===p.id).sort((a,b)=>a.num-b.num);
      html += `<a class="d-part" data-part="${p.id}">${esc(p.num)} · ${esc(p.title)}</a>`;
      for(const c of chs){
        const done = (progress[c.id]||0)>0.9;
        html += `<a class="d-chap ${done?'done':''}" data-chap="${c.id}">${c.num}. ${esc(c.title)}</a>`;
      }
    }
    // 专题
    html += `<div style="height:12px"></div><div class="d-part" style="color:var(--gold)">专题研究</div>`;
    for(const t of allTopics()){
      html += `<a class="d-chap" data-topic="${t.id}">◆ ${esc(t.title)}</a>`;
    }
    body.innerHTML = html;
    body.querySelectorAll("[data-nav]").forEach(el=> el.onclick=()=>navigate({view:el.dataset.nav}));
    body.querySelectorAll("[data-part]").forEach(el=> el.onclick=()=>navigate({view:"part", id:el.dataset.part}));
    body.querySelectorAll("[data-chap]").forEach(el=> el.onclick=()=>navigate({view:"chapter", id:el.dataset.chap}));
    body.querySelectorAll("[data-topic]").forEach(el=> el.onclick=()=>navigate({view:"topic", id:el.dataset.topic}));
  }

  // ---------- 全局事件 ----------
  $("#btn-menu").onclick = ()=>{ renderDrawer(); drawer.classList.add("open"); };
  $("#drawer-mask").onclick = ()=> drawer.classList.remove("open");
  $("#btn-close-drawer").onclick = ()=> drawer.classList.remove("open");
  document.querySelectorAll(".tab").forEach(t=> t.onclick=()=> navigate({view:t.dataset.tab}));
  $("#lightbox-mask").onclick = closeLightbox;
  $("#lightbox-close").onclick = closeLightbox;
  $("#btn-back").onclick = ()=> navigate({view:"home"});

  function timeAgo(ts){
    const d = Date.now()-ts;
    if(d<60000) return "刚刚";
    if(d<3600000) return Math.floor(d/60000)+" 分钟前";
    if(d<86400000) return Math.floor(d/3600000)+" 小时前";
    return Math.floor(d/86400000)+" 天前";
  }

  // ---------- 启动 ----------
  assignOrders();
  // 延迟渲染首页
  render();

  window.__navigate = navigate;
})();
