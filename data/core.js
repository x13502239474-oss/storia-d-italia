/* ============================================================
   core.js — 全局数据结构与常量
   ============================================================ */

// 全书元信息
window.SITE = {
  name: "意大利史诗",
  nameIT: "STORIA D'ITALIA",
  subtitle: "从罗马文明到现代意大利",
  motto: "阅读为主，学习为辅 —— 一部可长期阅读的意大利历史数字著作",
};

// 8 个部分（part）
window.PARTS = [
  { id:"p1", num:"第一部分", it:"L'Italia Antica e Roma", title:"古代意大利与罗马文明", period:"约公元前20万年 — 公元476年", desc:"从史前人类、伊特鲁里亚与希腊殖民城邦，到罗马共和国的兴衰与帝国的建立，直至西罗马帝国灭亡。" },
  { id:"p2", num:"第二部分", it:"Il Medioevo", title:"中世纪意大利", period:"公元476年 — 14世纪", desc:"日耳曼民族迁徙、东哥特与伦巴第王国、教皇国形成、城市共和国兴起，直至黑死病。" },
  { id:"p3", num:"第三部分", it:"Il Rinascimento", title:"意大利文艺复兴", period:"14世纪 — 16世纪", desc:"佛罗伦萨与美第奇、人文主义、达·芬奇与米开朗基罗、马基雅维利，直至意大利战争与文艺复兴的欧洲传播。" },
  { id:"p4", num:"第四部分", it:"Il Dominio Straniero", title:"近代意大利与外国统治", period:"16世纪 — 18世纪末", desc:"西班牙与奥地利哈布斯堡统治、反宗教改革、巴洛克文化、启蒙改革。" },
  { id:"p5", num:"第五部分", it:"Il Risorgimento", title:"意大利统一运动", period:"1789年 — 1870年", desc:"法国大革命与拿破仑、马志尼、加富尔、加里波第，直至1861年王国建立与罗马并入。" },
  { id:"p6", num:"第六部分", it:"L'Italia Liberale", title:"自由主义意大利与社会转型", period:"1861年 — 1922年", desc:"统一后国家建设、南北问题、工业化、殖民扩张、一战与战后危机。" },
  { id:"p7", num:"第七部分", it:"L'Italia Fascista", title:"法西斯意大利", period:"1919年 — 1945年", desc:"墨索里尼崛起、法西斯政权、与纳粹结盟、二战、倒台与抵抗运动。" },
  { id:"p8", num:"第八部分", it:"La Repubblica", title:"现代意大利共和国", period:"1946年 — 至今", desc:"共和国建立、经济奇迹、铅色年代、第一与第二共和国、欧洲一体化。" },
];

// 章节注册表：每个部分通过 window.CHAPTERS_PX 数组注册
window.CHAPTERS = {};      // id -> 章节对象（由 part 文件填充）
window.TOPICS = {};        // id -> 专题对象
window.PEOPLE = {};        // id -> 人物对象
window.MAPS = {};          // id -> 地图对象
window.ALL_IDS = [];       // 所有可跳转实体 id

// 章节对象规范：
// { id, part, num, title, sub, period, words, body }  body 为 HTML 字符串
// 关联跳转：正文中用 <span class="entity" data-entity="ID">名称</span>
// 图片：<figure class="figure"><img data-src="..." ...><figcaption>...</figcaption></figure>
