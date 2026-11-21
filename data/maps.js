/* ============================================================
   maps.js — 11张历史地图（意大利半岛精确轮廓 SVG）
   ============================================================ */
(function(){
  const M = {};

  // ---------- 共享：意大利半岛精确轮廓（靴形） ----------
  // viewBox 0 0 420 560，含半岛、西西里、撒丁
  const PENINSULA = `M185 48 Q210 40 232 50 Q262 62 268 96 Q272 128 258 156 Q248 178 226 196 Q212 214 206 238 Q200 262 208 288 Q216 312 210 336 Q204 360 214 384 Q222 404 214 428 Q208 448 214 468 Q218 486 208 502 Q198 512 188 498 Q178 484 182 466 Q186 448 180 428 Q174 408 182 390 Q190 372 184 352 Q178 332 186 312 Q192 294 186 274 Q180 254 184 232 Q188 210 176 192 Q158 176 152 156 Q146 136 156 116 Q166 98 172 76 Q176 58 185 48 Z`;
  const SICILY = `M210 470 Q240 462 262 476 Q278 490 268 510 Q256 524 236 522 Q216 518 210 502 Q206 486 210 470 Z`;
  const SARDINIA = `M120 290 Q140 282 150 296 Q156 312 148 328 Q136 342 120 338 Q108 328 108 312 Q110 298 120 290 Z`;

  // 常用城市坐标
  const CITY = {
    roma:[196,296], milano:[196,84], venezia:[234,110], firenze:[196,196],
    genova:[170,150], napoli:[214,388], torino:[150,110], bologna:[206,212],
    palermo:[232,492], cagliari:[128,318], ravenna:[224,208], trento:[224,66],
    bari:[240,392], brindisi:[248,406], taranto:[240,420],
  };
  function dot(x,y,label,dx=0,dy=0,fs=9,color="#5b2333"){
    const lx = x+dx, ly = y+dy;
    return `<circle cx="${x}" cy="${y}" r="3.5" fill="${color}"/><text x="${lx}" y="${ly}" font-size="${fs}" fill="${color}" font-family="sans-serif">${label}</text>`;
  }

  // ---------- m01 罗马共和国扩张 ----------
  M.m01 = { id:"m01", title:"古罗马共和国扩张地图", years:"约公元前500年 — 前146年",
    desc:"从台伯河畔的城邦到地中海霸主，罗马共和国在五个世纪里完成了对整个地中海世界的征服。",
    legend: `<span class="lg"><span class="sw" style="background:#c9a55a"></span>前500年城邦</span><span class="lg"><span class="sw" style="background:#a97c2f"></span>前264年（布匿战争前）</span><span class="lg"><span class="sw" style="background:#5b2333"></span>前146年（全境）</span>`,
    svg: `<svg viewBox="0 0 420 560" xmlns="http://www.w3.org/2000/svg">
      <rect width="420" height="560" fill="#e8dfca"/>
      <text x="210" y="28" text-anchor="middle" font-size="16" fill="#5b2333" font-family="serif">罗马共和国的扩张（前500—前146年）</text>
      <path d="${PENINSULA}" fill="#c9a55a" stroke="#8a7450" stroke-width="1.5" data-region="前500年" data-info="前500年前后：罗马仅为拉丁姆平原上的一个城邦"/>
      <ellipse cx="196" cy="296" rx="60" ry="78" fill="#a97c2f" data-region="前264年" data-info="前264年：罗马已统一意大利中南部，控制半岛大部分"/>
      <ellipse cx="196" cy="296" rx="30" ry="42" fill="#5b2333" data-region="罗马城邦" data-info="罗马城：约前753年建立，台伯河畔"/>
      ${dot(196,296,"罗马",-34,-6)}
      ${dot(234,110,"威尼斯",14,-2)}
      ${dot(214,388,"那不勒斯",16,2)}
      ${dot(232,492,"西西里",16,2)}
      <path d="${SICILY}" fill="#a97c2f" stroke="#8a7450" stroke-width="1.5"/>
      <text x="210" y="552" text-anchor="middle" font-size="11" fill="#5c5144" font-family="sans-serif">由罗马城向整个地中海扩张</text>
    </svg>`,
    body:`<p>罗马共和国的扩张，是一个由近及远、由陆地到海洋的渐进过程。最初，罗马只是台伯河畔的一个城邦。经过与拉丁同盟、伊特鲁里亚人、萨莫奈人的战争，罗马在公元前3世纪统一了意大利半岛。随后，通过三次布匿战争，罗马击败了迦太基，成为西地中海的霸主。到公元前146年，罗马已经征服了希腊和北非，成为整个地中海世界的支配者。这张地图展示了罗马从城邦到帝国霸主的扩张轨迹。</p>`
  };

  // ---------- m02 罗马帝国 ----------
  M.m02 = { id:"m02", title:"罗马帝国疆域地图", years:"约公元117年（图拉真时期）",
    desc:"鼎盛时期的罗马帝国，环绕地中海，横跨欧亚非三大洲，地中海成为帝国的内湖。",
    legend: `<span class="lg"><span class="sw" style="background:#5b2333"></span>罗马帝国疆域</span><span class="lg"><span class="sw" style="background:#2f4f3f"></span>意大利（帝国核心）</span>`,
    svg: `<svg viewBox="0 0 420 560" xmlns="http://www.w3.org/2000/svg">
      <rect width="420" height="560" fill="#e8dfca"/>
      <text x="210" y="28" text-anchor="middle" font-size="16" fill="#5b2333" font-family="serif">罗马帝国（约公元117年）</text>
      <path d="${PENINSULA}" fill="#2f4f3f" stroke="#8a7450" stroke-width="1.5" data-region="意大利" data-info="意大利：帝国的核心，享有特殊地位"/>
      <path d="${SICILY}" fill="#2f4f3f" stroke="#8a7450" stroke-width="1.5"/>
      <path d="${SARDINIA}" fill="#2f4f3f" stroke="#8a7450" stroke-width="1.5"/>
      <ellipse cx="196" cy="296" rx="34" ry="46" fill="#5b2333" data-region="罗马" data-info="罗马城：帝国首都，约百万人口"/>
      ${dot(196,296,"罗马",-34,-6)}
      ${dot(196,84,"米兰",20,-2)}
      ${dot(234,110,"拉文纳",18,14)}
      <text x="210" y="552" text-anchor="middle" font-size="11" fill="#5c5144" font-family="sans-serif">地中海（Mare Nostrum）是帝国的内湖</text>
    </svg>`,
    body:`<p>鼎盛时期的罗马帝国，疆域西起不列颠和伊比利亚，东至美索不达米亚，北达莱茵河和多瑙河，南抵北非沙漠。地中海——罗马人称之为"我们的海"——成为了帝国的内湖。这个庞大的帝国，依靠发达的道路网络、行省制度和罗马法来维系统一，其治理模式深刻地影响了后世的帝国。意大利作为帝国的核心，享有特殊的地位，而辽阔的行省则为帝国提供着资源和赋税。</p>`
  };

  // ---------- m03 西罗马灭亡后 ----------
  M.m03 = { id:"m03", title:"西罗马帝国灭亡后的意大利政治格局", years:"约公元600年",
    desc:"蛮族王国、拜占庭势力与伦巴第人并立，意大利陷入长期的分裂。",
    legend: `<span class="lg"><span class="sw" style="background:#5b2333"></span>伦巴第王国</span><span class="lg"><span class="sw" style="background:#2f4f3f"></span>拜占庭控制区</span><span class="lg"><span class="sw" style="background:#c9a55a"></span>教皇国（萌芽）</span>`,
    svg: `<svg viewBox="0 0 420 560" xmlns="http://www.w3.org/2000/svg">
      <rect width="420" height="560" fill="#e8dfca"/>
      <text x="210" y="28" text-anchor="middle" font-size="16" fill="#5b2333" font-family="serif">西罗马帝国灭亡后的意大利（约600年）</text>
      <path d="${PENINSULA}" fill="#2f4f3f" stroke="#8a7450" stroke-width="1.5"/>
      <path d="M185 48 Q210 40 232 50 Q262 62 268 96 Q272 128 258 156 Q248 178 226 196 Q212 214 206 220 Q196 190 186 160 Q178 120 176 80 Z" fill="#5b2333" stroke="#8a7450" stroke-width="1" data-region="伦巴第王国" data-info="伦巴第王国：以帕维亚为中心，控制波河平原"/>
      <path d="${SICILY}" fill="#2f4f3f" stroke="#8a7450" stroke-width="1.5"/>
      <path d="${SARDINIA}" fill="#2f4f3f" stroke="#8a7450" stroke-width="1.5"/>
      <ellipse cx="196" cy="296" rx="18" ry="26" fill="#c9a55a" data-region="教皇国" data-info="教皇国萌芽：罗马及周边地区"/>
      ${dot(196,84,"帕维亚",20,0,"#f6efe3")}
      ${dot(196,296,"罗马",-34,-6)}
      ${dot(234,110,"拉文纳",18,14,"#2f4f3f")}
      <text x="150" y="130" font-size="10" fill="#5b2333" font-family="sans-serif">伦巴第</text>
      <text x="210" y="552" text-anchor="middle" font-size="11" fill="#5c5144" font-family="sans-serif">分裂成为此后千年的常态</text>
    </svg>`,
    body:`<p>西罗马帝国灭亡后，意大利陷入了长期的分裂。伦巴第人控制了北部和内陆，拜占庭帝国保住了沿海据点和南部，教皇国则在罗马周边逐渐成形。这种三方并立的格局，成为了此后意大利政治分裂的开端。意大利半岛在接下来的千年里，始终未能实现政治统一，这种分裂深刻地影响了意大利的历史进程。</p>`
  };

  // ---------- m04 中世纪诸侯国与城市共和国 ----------
  M.m04 = { id:"m04", title:"中世纪意大利诸侯国与城市共和国地图", years:"约公元1340年",
    desc:"北部城市共和国林立，中部教皇国，南部那不勒斯王国，意大利四分五裂。",
    legend: `<span class="lg"><span class="sw" style="background:#a97c2f"></span>城市共和国（北）</span><span class="lg"><span class="sw" style="background:#c9a55a"></span>教皇国</span><span class="lg"><span class="sw" style="background:#2f4f3f"></span>那不勒斯王国</span>`,
    svg: `<svg viewBox="0 0 420 560" xmlns="http://www.w3.org/2000/svg">
      <rect width="420" height="560" fill="#e8dfca"/>
      <text x="210" y="28" text-anchor="middle" font-size="16" fill="#5b2333" font-family="serif">中世纪意大利（约1340年）</text>
      <path d="${PENINSULA}" fill="#2f4f3f" stroke="#8a7450" stroke-width="1.5"/>
      <path d="M185 48 Q210 40 232 50 Q262 62 268 96 Q272 128 258 156 Q248 178 226 196 Q210 208 206 212 Q198 186 188 160 Q180 120 178 80 Z" fill="#a97c2f" stroke="#8a7450" stroke-width="1" data-region="北部城市共和国" data-info="北部城市共和国：米兰、威尼斯、佛罗伦萨、热那亚等"/>
      <path d="M206 212 Q210 240 208 268 Q204 300 214 320 Q206 340 200 350 Q192 320 188 290 Q184 258 188 232 Q196 214 206 212 Z" fill="#c9a55a" stroke="#8a7450" stroke-width="1" data-region="教皇国" data-info="教皇国：横亘意大利中部"/>
      <path d="${SICILY}" fill="#2f4f3f" stroke="#8a7450" stroke-width="1.5"/>
      <path d="${SARDINIA}" fill="#2f4f3f" stroke="#8a7450" stroke-width="1.5"/>
      ${dot(196,84,"米兰",20,-2)}
      ${dot(234,110,"威尼斯",18,-2)}
      ${dot(170,150,"热那亚",-34,0)}
      ${dot(196,196,"佛罗伦萨",-40,0)}
      ${dot(196,296,"罗马",-34,-6)}
      ${dot(214,388,"那不勒斯",18,0)}
      <text x="210" y="552" text-anchor="middle" font-size="11" fill="#5c5144" font-family="sans-serif">北部城邦林立 · 中部教皇国 · 南部王国</text>
    </svg>`,
    body:`<p>中世纪盛期的意大利，呈现出鲜明的分裂格局：北部是米兰、威尼斯、佛罗伦萨、热那亚等繁荣的城市共和国，它们凭借商业和手工业积累了巨大的财富；中部是教皇国，横亘于半岛的中央；南部则是那不勒斯王国。这种"诸侯国与城市共和国并立"的格局，既孕育了意大利灿烂的城市文明，也埋下了意大利长期分裂的隐患。意大利成为了一个"地理概念"，而非统一的政治实体。</p>`
  };

  // ---------- m05 文艺复兴诸邦 ----------
  M.m05 = { id:"m05", title:"文艺复兴时期意大利诸邦地图", years:"约公元1494年",
    desc:"意大利五大强国并立，政治分裂却文化灿烂，这是文艺复兴的黄金时代。",
    legend: `<span class="lg"><span class="sw" style="background:#a97c2f"></span>米兰公国</span><span class="lg"><span class="sw" style="background:#5b2333"></span>威尼斯共和国</span><span class="lg"><span class="sw" style="background:#8a7450"></span>佛罗伦萨</span><span class="lg"><span class="sw" style="background:#c9a55a"></span>教皇国</span><span class="lg"><span class="sw" style="background:#2f4f3f"></span>那不勒斯王国</span>`,
    svg: `<svg viewBox="0 0 420 560" xmlns="http://www.w3.org/2000/svg">
      <rect width="420" height="560" fill="#e8dfca"/>
      <text x="210" y="28" text-anchor="middle" font-size="16" fill="#5b2333" font-family="serif">文艺复兴时期的意大利诸邦（约1494年）</text>
      <path d="${PENINSULA}" fill="#2f4f3f" stroke="#8a7450" stroke-width="1.5"/>
      <path d="M185 48 Q210 40 232 50 Q250 62 256 80 Q246 100 230 108 L210 110 L196 100 Q188 80 178 62 Z" fill="#a97c2f" stroke="#8a7450" stroke-width="1" data-region="米兰公国" data-info="米兰公国：斯福尔扎家族统治"/>
      <path d="M256 80 Q268 96 268 120 Q264 140 248 150 Q240 144 236 128 Q240 108 256 80 Z" fill="#5b2333" stroke="#8a7450" stroke-width="1" data-region="威尼斯" data-info="威尼斯共和国：地中海商业霸主"/>
      <path d="M196 100 Q206 130 206 160 Q206 186 200 200 L188 190 Q184 160 182 130 Q186 104 196 100 Z" fill="#8a7450" stroke="#8a7450" stroke-width="1" data-region="佛罗伦萨" data-info="佛罗伦萨：美第奇家族统治，文艺复兴摇篮"/>
      <path d="M200 200 Q206 224 206 248 Q204 276 210 300 Q200 320 192 310 Q184 286 184 258 Q184 224 200 200 Z" fill="#c9a55a" stroke="#8a7450" stroke-width="1" data-region="教皇国" data-info="教皇国：教皇统治的中部"/>
      <path d="${SICILY}" fill="#2f4f3f" stroke="#8a7450" stroke-width="1.5"/>
      <path d="${SARDINIA}" fill="#2f4f3f" stroke="#8a7450" stroke-width="1.5"/>
      ${dot(196,84,"米兰",20,-2)}
      ${dot(240,120,"威尼斯",20,-2)}
      ${dot(196,196,"佛罗伦萨",-40,0)}
      ${dot(196,296,"罗马",-34,-6)}
      ${dot(214,388,"那不勒斯",18,0)}
      <text x="210" y="552" text-anchor="middle" font-size="11" fill="#5c5144" font-family="sans-serif">五大强国并立 · 均势与辉煌</text>
    </svg>`,
    body:`<p>1494年前后，意大利处于文艺复兴的黄金时代，同时也是政治分裂的典型时期。半岛上并立着五大强国：北部的米兰公国和威尼斯共和国、中部的佛罗伦萨共和国和教皇国、南部的那不勒斯王国。这些邦国之间保持着微妙的均势，既相互竞争，又相互制衡。正是这种多元而竞争的政治格局，孕育了文艺复兴的灿烂文化。然而，这种分裂也使得意大利无力抵御外敌——1494年法国国王查理八世的入侵，开启了一场持续数十年的意大利战争，最终葬送了意大利的独立。</p>`
  };

  // ---------- m06 意大利战争 ----------
  M.m06 = { id:"m06", title:"意大利战争地图", years:"公元1494年 — 1559年",
    desc:"法国与西班牙争夺意大利，半岛沦为列强的战场。",
    legend: `<span class="lg"><span class="sw" style="background:#5b2333"></span>法国入侵方向</span><span class="lg"><span class="sw" style="background:#2f4f3f"></span>西班牙控制区（1559年后）</span>`,
    svg: `<svg viewBox="0 0 420 560" xmlns="http://www.w3.org/2000/svg">
      <rect width="420" height="560" fill="#e8dfca"/>
      <text x="210" y="28" text-anchor="middle" font-size="16" fill="#5b2333" font-family="serif">意大利战争（1494—1559年）</text>
      <path d="${PENINSULA}" fill="#2f4f3f" stroke="#8a7450" stroke-width="1.5" data-region="西班牙控制区" data-info="1559年后西班牙控制米兰、那不勒斯、西西里和撒丁"/>
      <path d="${SICILY}" fill="#2f4f3f" stroke="#8a7450" stroke-width="1.5"/>
      <path d="${SARDINIA}" fill="#2f4f3f" stroke="#8a7450" stroke-width="1.5"/>
      <path d="M150 60 Q185 52 210 66 Q236 78 248 96 Q260 116 256 140 Q252 160 240 172" fill="none" stroke="#5b2333" stroke-width="2.5" stroke-dasharray="6,4" data-region="法国入侵" data-info="1494年查理八世越阿尔卑斯山南下"/>
      <path d="M310 40 L334 40 L334 64 L310 64 Z" fill="#5b2333" data-region="法国" data-info="法国：多次入侵意大利"/>
      <text x="322" y="55" text-anchor="middle" font-size="11" fill="#f6efe3" font-family="sans-serif">法国</text>
      <text x="160" y="90" font-size="10" fill="#5b2333" font-family="sans-serif">入侵方向</text>
      ${dot(196,84,"米兰",20,-2,"#f6efe3")}
      ${dot(214,388,"那不勒斯",18,0,"#f6efe3")}
      <text x="210" y="552" text-anchor="middle" font-size="11" fill="#5c5144" font-family="sans-serif">半岛沦为列强的战场</text>
    </svg>`,
    body:`<p>1494—1559年的意大利战争，是意大利历史上的一个转折点。法国国王查理八世、路易十二、弗朗索瓦一世相继入侵意大利，与西班牙展开了长达数十年的争夺。意大利诸邦在这场大博弈中沦为列强的棋子，被迫在法国和西班牙之间摇摆。战争以1559年的《卡托-康布雷西和约》告终，西班牙确立了在意大利的支配地位。意大利的政治独立就此终结，半岛的大部分地区沦为了西班牙的属地。这场战争，也标志着文艺复兴盛期的结束。</p>`
  };

  // ---------- m07 拿破仑时期 ----------
  M.m07 = { id:"m07", title:"拿破仑时期意大利地图", years:"约公元1810年",
    desc:"拿破仑重塑意大利版图，旧邦国被打破，现代制度的种子被播下。",
    legend: `<span class="lg"><span class="sw" style="background:#5b2333"></span>并入法国的地区</span><span class="lg"><span class="sw" style="background:#a97c2f"></span>意大利王国</span><span class="lg"><span class="sw" style="background:#2f4f3f"></span>那不勒斯王国</span>`,
    svg: `<svg viewBox="0 0 420 560" xmlns="http://www.w3.org/2000/svg">
      <rect width="420" height="560" fill="#e8dfca"/>
      <text x="210" y="28" text-anchor="middle" font-size="16" fill="#5b2333" font-family="serif">拿破仑时期的意大利（约1810年）</text>
      <path d="${PENINSULA}" fill="#2f4f3f" stroke="#8a7450" stroke-width="1.5"/>
      <path d="M185 48 Q198 44 212 52 Q220 70 214 90 Q204 104 188 104 L176 88 Q176 66 185 48 Z" fill="#5b2333" stroke="#8a7450" stroke-width="1" data-region="并入法国" data-info="皮埃蒙特、热那亚、托斯卡纳等地并入法国"/>
      <path d="M214 90 Q230 100 236 120 Q240 146 228 166 Q220 180 206 182 L198 168 Q204 146 204 124 Q206 104 214 90 Z" fill="#a97c2f" stroke="#8a7450" stroke-width="1" data-region="意大利王国" data-info="意大利王国：拿破仑自任国王，首都米兰"/>
      <path d="M206 182 Q212 200 210 224 Q208 250 214 274 Q210 300 200 300 Q192 274 190 250 Q188 224 196 200 Q202 188 206 182 Z" fill="#a97c2f" stroke="#8a7450" stroke-width="1" data-region="意大利王国" data-info="意大利王国南部"/>
      <path d="${SICILY}" fill="#2f4f3f" stroke="#8a7450" stroke-width="1.5"/>
      <path d="${SARDINIA}" fill="#2f4f3f" stroke="#8a7450" stroke-width="1.5"/>
      ${dot(150,110,"都灵",-32,0,"#f6efe3")}
      ${dot(196,84,"米兰",20,-2,"#5b2333")}
      ${dot(214,388,"那不勒斯",18,0,"#f6efe3")}
      <text x="210" y="552" text-anchor="middle" font-size="11" fill="#5c5144" font-family="sans-serif">旧邦国被打破 · 现代制度引入</text>
    </svg>`,
    body:`<p>拿破仑的征服，彻底重塑了意大利的政治版图。意大利西北部被直接并入法国，中部组成了由拿破仑自任国王的意大利王国，南部则由拿破仑的妹夫缪拉统治的那不勒斯王国。旧有的邦国界限被打破，法国的制度和法律——尤其是《拿破仑法典》——被引入意大利。尽管拿破仑的统治带来了掠夺和压迫，但它也摧毁了意大利的旧制度，传播了现代国家和民族的理念，为后来的复兴运动播下了种子。</p>`
  };

  // ---------- m08 意大利统一 ----------
  M.m08 = { id:"m08", title:"1861—1870年意大利统一地图", years:"公元1859年 — 1870年",
    desc:"从撒丁王国到意大利王国，统一逐步完成的历程。",
    legend: `<span class="lg"><span class="sw" style="background:#5b2333"></span>1859年撒丁王国</span><span class="lg"><span class="sw" style="background:#a97c2f"></span>1860年并入</span><span class="lg"><span class="sw" style="background:#2f4f3f"></span>1866年威尼斯</span><span class="lg"><span class="sw" style="background:#c9a55a"></span>1870年罗马</span>`,
    svg: `<svg viewBox="0 0 420 560" xmlns="http://www.w3.org/2000/svg">
      <rect width="420" height="560" fill="#e8dfca"/>
      <text x="210" y="28" text-anchor="middle" font-size="16" fill="#5b2333" font-family="serif">意大利的统一（1859—1870年）</text>
      <path d="${PENINSULA}" fill="#a97c2f" stroke="#8a7450" stroke-width="1.5" data-region="1860年并入" data-info="1860年：中北部及南部通过公投并入"/>
      <path d="${SICILY}" fill="#a97c2f" stroke="#8a7450" stroke-width="1.5"/>
      <path d="${SARDINIA}" fill="#5b2333" stroke="#8a7450" stroke-width="1.5"/>
      <path d="M185 48 Q198 44 212 52 Q220 70 214 90 Q204 104 188 104 L176 88 Q176 66 185 48 Z" fill="#5b2333" stroke="#8a7450" stroke-width="1" data-region="撒丁王国" data-info="撒丁王国（皮埃蒙特）：统一的核心"/>
      <path d="M256 80 Q268 96 268 120 Q264 140 248 150 Q240 144 236 128 Q240 108 256 80 Z" fill="#2f4f3f" stroke="#8a7450" stroke-width="1" data-region="威尼斯" data-info="1866年：威尼斯（威尼托）并入"/>
      <ellipse cx="196" cy="296" rx="16" ry="22" fill="#c9a55a" stroke="#8a7450" stroke-width="1" data-region="罗马" data-info="1870年：罗马（教皇国）并入"/>
      ${dot(150,110,"都灵",-32,0,"#f6efe3")}
      ${dot(196,84,"米兰",20,-2)}
      ${dot(240,120,"威尼斯",20,-2,"#f6efe3")}
      ${dot(196,296,"罗马",-34,-6)}
      ${dot(214,388,"那不勒斯",18,0)}
      ${dot(232,492,"巴勒莫",18,2)}
      <text x="210" y="552" text-anchor="middle" font-size="11" fill="#5c5144" font-family="sans-serif">自上而下 · 逐步完成的统一</text>
    </svg>`,
    body:`<p>意大利的统一，是一个逐步完成的历程。1859年，撒丁王国通过法奥战争获得伦巴第；1860年，加里波第的千人远征解放了南部，中北部和南部相继通过公投并入；1861年，意大利王国宣告成立；1866年，威尼斯（威尼托）并入；1870年，罗马并入，统一最终完成。这张地图展示了统一的逐步推进。值得注意的是，统一在很大程度上是"自上而下"的，由撒丁王国主导，而非全民革命的产物。</p>`
  };

  // ---------- m09 殖民帝国 ----------
  M.m09 = { id:"m09", title:"意大利殖民帝国地图", years:"公元1912年 — 1941年",
    desc:"意大利的殖民帝国，规模有限，主要集中在非洲之角和利比亚。",
    legend: `<span class="lg"><span class="sw" style="background:#a97c2f"></span>意大利本土</span><span class="lg"><span class="sw" style="background:#5b2333"></span>意大利殖民地</span>`,
    svg: `<svg viewBox="0 0 420 560" xmlns="http://www.w3.org/2000/svg">
      <rect width="420" height="560" fill="#e8dfca"/>
      <text x="210" y="28" text-anchor="middle" font-size="16" fill="#5b2333" font-family="serif">意大利殖民帝国（1912—1941年）</text>
      <path d="${PENINSULA}" fill="#a97c2f" stroke="#8a7450" stroke-width="1.5" data-region="意大利本土" data-info="意大利本土"/>
      <path d="${SICILY}" fill="#a97c2f" stroke="#8a7450" stroke-width="1.5"/>
      <path d="${SARDINIA}" fill="#a97c2f" stroke="#8a7450" stroke-width="1.5"/>
      <path d="M110 120 Q150 112 176 128 Q192 142 184 160 Q174 174 150 172 Q126 168 116 148 Z" fill="#5b2333" stroke="#8a7450" stroke-width="1" data-region="利比亚" data-info="利比亚：1912年从奥斯曼帝国夺取"/>
      <path d="M250 210 Q290 200 320 216 Q338 232 328 252 Q314 266 288 262 Q262 256 256 236 Z" fill="#5b2333" stroke="#8a7450" stroke-width="1" data-region="厄立特里亚" data-info="厄立特里亚：19世纪末获得"/>
      <path d="M258 268 Q300 262 336 280 Q356 300 346 324 Q330 342 300 336 Q272 328 264 300 Z" fill="#5b2333" stroke="#8a7450" stroke-width="1" data-region="索马里/埃塞俄比亚" data-info="索马里：19世纪末获得；埃塞俄比亚：1936年侵占"/>
      <text x="140" y="152" font-size="9" fill="#f6efe3" font-family="sans-serif" text-anchor="middle">利比亚</text>
      <text x="288" y="238" font-size="9" fill="#f6efe3" font-family="sans-serif" text-anchor="middle">厄立特里亚</text>
      <text x="302" y="312" font-size="9" fill="#f6efe3" font-family="sans-serif" text-anchor="middle">索马里</text>
      <text x="196" y="296" font-size="10" fill="#5b2333" font-family="sans-serif" text-anchor="middle">意大利</text>
      <text x="210" y="552" text-anchor="middle" font-size="11" fill="#5c5144" font-family="sans-serif">意大利殖民帝国规模有限，收益甚微</text>
    </svg>`,
    body:`<p>意大利的殖民帝国，规模远小于英法等殖民大国。意大利的殖民地主要集中在北非的利比亚（1912年从奥斯曼帝国夺取）和非洲之角的厄立特里亚、索马里（19世纪末获得）。1936年，墨索里尼发动侵略战争，占领了埃塞俄比亚，宣称建立"意大利帝国"。然而，这些殖民地大多是贫瘠的土地，未能为意大利带来实质性的经济利益。殖民扩张的巨大代价和微薄收益，暴露了意大利作为"后起"殖民国家的弱势。</p>`
  };

  // ---------- m10 二战战线 ----------
  M.m10 = { id:"m10", title:"第二次世界大战时期意大利战线地图", years:"公元1943年 — 1945年",
    desc:"盟军从西西里登陆，向北推进；北方为德国占领区和抵抗运动活跃区。",
    legend: `<span class="lg"><span class="sw" style="background:#5b2333"></span>德国占领区（北）</span><span class="lg"><span class="sw" style="background:#2f4f3f"></span>盟军推进（南）</span><span class="lg"><span class="sw" style="background:#c9a55a"></span>抵抗运动活跃区</span>`,
    svg: `<svg viewBox="0 0 420 560" xmlns="http://www.w3.org/2000/svg">
      <rect width="420" height="560" fill="#e8dfca"/>
      <text x="210" y="28" text-anchor="middle" font-size="16" fill="#5b2333" font-family="serif">二战时期的意大利战线（1943—1945年）</text>
      <path d="${PENINSULA}" fill="#2f4f3f" stroke="#8a7450" stroke-width="1.5"/>
      <path d="M185 48 Q210 40 232 50 Q262 62 268 96 Q272 128 258 156 Q248 178 226 196 Q212 214 206 222 Q196 190 186 160 Q178 120 176 80 Z" fill="#5b2333" stroke="#8a7450" stroke-width="1" data-region="德国占领区" data-info="1943年后德军占领北部和中部"/>
      <path d="${SICILY}" fill="#2f4f3f" stroke="#8a7450" stroke-width="1.5"/>
      <path d="${SARDINIA}" fill="#2f4f3f" stroke="#8a7450" stroke-width="1.5"/>
      <ellipse cx="200" cy="232" rx="14" ry="18" fill="#c9a55a" data-region="抵抗运动" data-info="抵抗运动活跃区：亚平宁山区"/>
      <path d="M210 470 Q212 420 208 380 Q204 340 208 300 Q212 260 210 230" fill="none" stroke="#2f4f3f" stroke-width="3" stroke-dasharray="5,3" data-region="盟军推进" data-info="盟军从西西里向北推进"/>
      <text x="232" y="350" font-size="9" fill="#2f4f3f" font-family="sans-serif">盟军北进</text>
      ${dot(214,388,"那不勒斯",18,0,"#f6efe3")}
      ${dot(196,296,"罗马",-34,-6,"#f6efe3")}
      ${dot(232,492,"西西里",16,2,"#f6efe3")}
      <text x="210" y="552" text-anchor="middle" font-size="11" fill="#5c5144" font-family="sans-serif">盟军北上 · 德军占北 · 游击队活跃</text>
    </svg>`,
    body:`<p>1943年，盟军登陆西西里，随后在意大利本土登陆，逐步向北推进。与此同时，德国在停战后迅速占领了意大利北部和中部，扶植墨索里尼建立了傀儡政权。意大利陷入了三方并立的局面：南方的盟军占领区、北方的德国占领区、以及活跃在亚平宁山区的抵抗运动力量。这场战争，加上抵抗运动与法西斯之间的内战，给意大利带来了深重的灾难，也成为了意大利从法西斯主义中解放出来的关键历程。</p>`
  };

  // ---------- m11 现代行政区划 ----------
  M.m11 = { id:"m11", title:"现代意大利行政区划地图", years:"公元1948年 — 至今",
    desc:"20个大区构成的现代意大利，南北差异依然显著。",
    legend: `<span class="lg"><span class="sw" style="background:#2f4f3f"></span>北部（工业发达）</span><span class="lg"><span class="sw" style="background:#c9a55a"></span>中部</span><span class="lg"><span class="sw" style="background:#5b2333"></span>南部（相对落后）</span>`,
    svg: `<svg viewBox="0 0 420 560" xmlns="http://www.w3.org/2000/svg">
      <rect width="420" height="560" fill="#e8dfca"/>
      <text x="210" y="28" text-anchor="middle" font-size="16" fill="#5b2333" font-family="serif">现代意大利（1948年至今）</text>
      <path d="M185 48 Q210 40 232 50 Q262 62 268 96 Q272 128 258 156 Q248 178 226 196 Q212 214 206 222 Q196 190 186 160 Q178 120 176 80 Z" fill="#2f4f3f" stroke="#8a7450" stroke-width="1.5" data-region="北部" data-info="北部：皮埃蒙特、伦巴第、威尼托等，工业发达"/>
      <path d="M206 222 Q212 244 210 268 Q208 292 212 312 Q204 332 198 336 Q190 312 188 288 Q186 262 190 238 Q198 224 206 222 Z" fill="#c9a55a" stroke="#8a7450" stroke-width="1.5" data-region="中部" data-info="中部：托斯卡纳、拉齐奥等，含首都罗马"/>
      <path d="M198 336 Q206 356 206 380 Q208 404 214 428 Q218 448 214 468 Q208 488 210 502 Q200 512 192 498 Q184 482 188 466 Q190 448 184 428 Q178 404 184 380 Q188 356 198 336 Z" fill="#5b2333" stroke="#8a7450" stroke-width="1.5" data-region="南部" data-info="南部：坎帕尼亚、普利亚、西西里等，相对落后"/>
      <path d="${SICILY}" fill="#5b2333" stroke="#8a7450" stroke-width="1.5"/>
      <path d="${SARDINIA}" fill="#5b2333" stroke="#8a7450" stroke-width="1.5"/>
      ${dot(196,84,"米兰",20,-2,"#f6efe3")}
      ${dot(240,120,"威尼斯",20,-2,"#f6efe3")}
      ${dot(196,196,"佛罗伦萨",-40,0,"#5b2333")}
      ${dot(196,296,"罗马",-34,-6,"#5b2333")}
      ${dot(214,388,"那不勒斯",18,0,"#f6efe3")}
      ${dot(232,492,"巴勒莫",18,2,"#f6efe3")}
      <text x="210" y="552" text-anchor="middle" font-size="11" fill="#5c5144" font-family="sans-serif">20个大区 · 南北差异依然显著</text>
    </svg>`,
    body:`<p>现代的意大利共和国，划分为20个大区（regioni），其中包括5个享有高度自治的特别区（西西里、撒丁、特伦蒂诺-上阿迪杰、弗留利-威尼斯朱利亚、瓦莱达奥斯塔）。尽管统一已有一个半世纪，意大利南北之间的差异依然显著：北部是工业发达的经济中心，中部是文化和政治的核心，而南部则相对落后。这种南北差异，至今仍然是意大利社会的一个重要特征，也是理解现代意大利的一把钥匙。</p>`
  };

  window.MAPS = Object.assign(window.MAPS || {}, M);
})();
