import { affairs, events, learningGroups, notices, updatedAt } from './data.js';

const routes=[['/','首頁','⌂'],['/calendar','行事曆','▣'],['/learning','課務學習','▤'],['/affairs','校園事務','◇'],['/notices','公告','◉']];
const state={grade:'all',category:'all'};
const root=document.querySelector('#root');
const dateText=(event)=>{
  const short=(value)=>{const date=new Date(`${value}T00:00:00`);return `${date.getFullYear()}.${String(date.getMonth()+1).padStart(2,'0')}.${String(date.getDate()).padStart(2,'0')}`};
  return event.end&&event.end!==event.start?`${short(event.start)}–${short(event.end)}`:short(event.start);
};
const gradeText=(grades)=>grades.length?grades.map(x=>`國${'七八九'[x-7]}`).join('、'):'國中部全體';
const head=(a,b,c)=>`<header class="page-header"><span class="eyebrow">${a}</span><h1>${b}</h1><p>${c}</p></header>`;

function home(){
  const descriptions=['依年級查找活動與重要日期','課表、考試範圍與學習資源','交通、制服、餐飲與行政流程','依年級整理的重要通知'];
  const next=events[0];
  return `<section class="hero"><div class="hero-copy"><span class="eyebrow">MIDDLE SCHOOL INFO PORTAL</span><h1>不同年級的重要日期，<br>清楚整理在一處。</h1><p>快速依年級查找活動、課程、健康檢查、家長會與各項截止日。</p><div class="hero-actions"><a class="primary" href="#/calendar">▣ 查看完整行事曆</a><a class="secondary" href="#/notices">◉ 最新公告</a></div></div><aside class="today-card"><span>◷ 第一筆行程</span><strong>${dateText(next).slice(5)}</strong><h2>${next.title}</h2><p>${gradeText(next.grades)}${next.note?`・${next.note}`:''}</p><a href="#/calendar">依年級篩選 <b>›</b></a></aside></section><section class="quick-section"><div class="section-heading"><span>快速入口</span><h2>你今天要找什麼？</h2></div><div class="quick-grid">${routes.slice(1).map(([p,l,i],n)=>`<a href="#${p}"><span class="card-number">0${n+1}</span><i class="large-symbol">${i}</i><h3>${l}</h3><p>${descriptions[n]}</p><b class="arrow">›</b></a>`).join('')}</div></section><section class="status-band"><b>✓</b><div><strong>已匯入 ${events.length} 項日期</strong><span>資料來源：115學年度第一學期國中部活動日期整理；修訂日期已套用。</span></div></section>`;
}

function calendar(){
  const categories=[...new Set(events.map(x=>x.category))];
  const filtered=events.filter(x=>(state.grade==='all'||x.grades.length===0||x.grades.includes(Number(state.grade)))&&(state.category==='all'||x.category===state.category)).slice().sort((a,b)=>a.start.localeCompare(b.start)||a.title.localeCompare(b.title,'zh-Hant'));
  return head('115學年度第一學期','國中部活動行事曆','依年級與活動類型快速篩選。標示「暫定」的日期仍須以最新公告為準。')+
    `<section class="calendar-tools" aria-label="行事曆篩選"><label>適用年級<select id="grade-filter"><option value="all">全部年級</option><option value="7">國七</option><option value="8">國八</option><option value="9">國九</option></select></label><label>活動類型<select id="category-filter"><option value="all">全部類型</option>${categories.map(x=>`<option value="${x}">${x}</option>`).join('')}</select></label><p>顯示 <strong>${filtered.length}</strong> 項</p></section>`+
    `<section class="timeline">${filtered.map(x=>`<article><time>${dateText(x)}</time><div class="event-copy"><div class="event-tags"><span class="tag">${x.category}</span><span class="grade-tag">${gradeText(x.grades)}</span>${x.tentative?'<span class="tentative-tag">暫定</span>':''}</div><h2>${x.title}</h2>${x.note?`<p>${x.note}</p>`:''}</div></article>`).join('')||'<p class="empty-state">目前沒有符合條件的活動。</p>'}</section><p class="source-note">資料依使用者提供的「115-1 國中部活動日期統整」圖片整理；民國115／116年已轉為西元2026／2027年。</p>`+
    `<section class="source-gallery"><header><span class="eyebrow">SOURCE FILES</span><h2>田教日期原始資料</h2><p>點選圖片可另開原尺寸檢視。</p></header><div class="source-grid"><figure><a href="./assets/field-trips/grade-7-field-trip-dates.png" target="_blank" rel="noopener"><img src="./assets/field-trips/grade-7-field-trip-dates.png" alt="國七單日田教日期原始表格"></a><figcaption>國七｜單日田教</figcaption></figure><figure><a href="./assets/field-trips/grade-8-field-trip-dates.png" target="_blank" rel="noopener"><img src="./assets/field-trips/grade-8-field-trip-dates.png" alt="國八過夜田教日期原始表格"></a><figcaption>國八｜過夜田教</figcaption></figure><figure><a href="./assets/field-trips/grade-9-field-trip-dates.png" target="_blank" rel="noopener"><img src="./assets/field-trips/grade-9-field-trip-dates.png" alt="國九田教日期原始表格"></a><figcaption>國九｜田教</figcaption></figure></div></section>`;
}

function learning(){return head('LEARNING','課務與學習','後續可依國七、國八、國九細分。')+`<section class="content-grid">${learningGroups.map(x=>`<article class="content-card"><i class="section-symbol">▤</i><h2>${x.title}</h2><ul>${x.items.map(y=>`<li>${y}<span>待補資料</span></li>`).join('')}</ul></article>`).join('')}</section>`}
function school(){return head('SCHOOL LIFE','校園事務','把常用行政與校園生活資訊變成容易查找的主題清單。')+`<section class="list-panel">${affairs.map((x,i)=>`<article><span class="list-index">0${i+1}</span><div><h2>${x.title}</h2><p>${x.detail}</p></div><b>›</b></article>`).join('')}</section>`}
function notice(){return head('NOTICES','最新公告','依國中部及各年級整理重要通知。')+`<section class="notice-list">${notices.map(x=>`<article><div><time>${x.date}</time><span class="tag">${x.audience}</span></div><div><h2>${x.title}</h2><p>${x.summary}</p></div></article>`).join('')}</section>`}

function render(){
  const raw=location.hash.slice(1)||'/';
  const path=routes.some(([p])=>p===raw)?raw:'/';
  const pages={'/':home,'/calendar':calendar,'/learning':learning,'/affairs':school,'/notices':notice};
  root.innerHTML=`<div class="site-shell"><header class="site-header"><a class="brand" href="#/"><b>◆</b><span>小鈴鐺資訊整合</span></a><button class="menu-button" aria-label="切換導覽">☰</button><nav aria-label="主要導覽">${routes.map(([p,l,i])=>`<a class="${path===p?'active':''}" href="#${p}"><b>${i}</b><span>${l}</span></a>`).join('')}</nav></header><main>${pages[path]()}</main><footer>本站為家長自行整理資訊，請以學校與導師最新公告為準。<span>最後更新：${updatedAt}</span></footer></div>`;
  document.querySelector('.menu-button').onclick=()=>document.querySelector('nav').classList.toggle('open');
  if(path==='/calendar'){
    const grade=document.querySelector('#grade-filter');
    const category=document.querySelector('#category-filter');
    grade.value=state.grade; category.value=state.category;
    grade.onchange=()=>{state.grade=grade.value;render()};
    category.onchange=()=>{state.category=category.value;render()};
  }
  scrollTo(0,0);
}
addEventListener('hashchange',render);render();
