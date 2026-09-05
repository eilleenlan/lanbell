import { affairs, events, learningGroups, notices, updatedAt } from './data.js';

const routes=[['/','首頁','⌂'],['/calendar','行事曆','📅']];
const categoryGroups={
  '重要日程':['開學/放假','活動','夜間課程/夜自習','田教/校外教學','畢業'],
  '考試':['考試-全民英檢','考試-學科競賽','考試-國際能力','考試-模擬考','考試-段考'],
  '家長參與':['一般家長','特定家長'],
  '行政與其他':['行政','健康','編班','其他'],
};
const groupFor=(category)=>Object.entries(categoryGroups).find(([,items])=>items.includes(category))?.[0]||'行政與其他';
const placeFor=(category)=>category==='考試-全民英檢'?'校外':'校內';
const state={grade:'all',place:'all',groups:[],categories:[],query:'',includePast:false,focusEvent:null};
const root=document.querySelector('#root');
const dateText=(event)=>{
  const weekdays='日一二三四五六';
  const short=(value)=>{const date=new Date(`${value}T00:00:00`);return `${date.getFullYear()}.${String(date.getMonth()+1).padStart(2,'0')}.${String(date.getDate()).padStart(2,'0')}（${weekdays[date.getDay()]}）`};
  return event.end&&event.end!==event.start?`${short(event.start)}<span class="date-connector">｜</span><span class="date-end">${short(event.end)}</span>`:short(event.start);
};
const gradeText=(grades)=>grades.length?grades.map(x=>`國${'七八九'[x-7]}`).join('、'):'國中部全體';
const head=(a,b,c)=>`<header class="page-header"><span class="eyebrow">${a}</span><h1>${b}</h1><p>${c}</p></header>`;
const localDate=(value)=>new Date(`${value}T00:00:00`);
const startOfToday=()=>{const today=new Date();return new Date(today.getFullYear(),today.getMonth(),today.getDate())};
const daysUntil=(value)=>Math.ceil((localDate(value)-startOfToday())/86400000);
const compactDate=(event)=>{
  const weekdays='日一二三四五六';
  const format=(value)=>{const date=localDate(value);return `${date.getFullYear()}.${String(date.getMonth()+1).padStart(2,'0')}.${String(date.getDate()).padStart(2,'0')}（${weekdays[date.getDay()]}）`};
  return event.end&&event.end!==event.start?`${format(event.start)}－${format(event.end)}`:format(event.start);
};
const countdownLabel=(date)=>{const days=daysUntil(date);return days===0?'就是今天':days>0?`還有 ${days} 天`:'已結束'};
const escapeHtml=(value)=>value.replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const isPast=(event)=>localDate(event.end||event.start)<startOfToday();
const addDays=(value,days)=>{const date=localDate(value);date.setDate(date.getDate()+days);return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`};
const googleCalendarUrl=(event)=>{
  const calendarDate=(value)=>value.replaceAll('-','');
  const details=[gradeText(event.grades),event.category,event.note||'', '本站為家長自行整理資訊，請以學校與導師最新公告為準。'].filter(Boolean).join('\n');
  const params=new URLSearchParams({action:'TEMPLATE',text:event.title,dates:`${calendarDate(event.start)}/${calendarDate(addDays(event.end||event.start,1))}`,details});
  return `https://calendar.google.com/calendar/render?${params}`;
};
const eventDetails=(event)=>{
  if(!event.schedule&&!event.examScope&&!event.reminders)return '';
  const scopeFor=(subject)=>event.examScope?.find(([name])=>subject.replace(/科|閱讀|聽力/g,'')===name.replace(/科/g,''))?.[1]||'—';
  const schedule=event.schedule?`<section><h3>考試時間與範圍</h3><div class="exam-table-wrap"><table><thead><tr><th>日期</th><th>時間</th><th>科目</th><th>測驗範圍</th></tr></thead><tbody>${event.schedule.map((item,index)=>`<tr class="${index>0&&item.date!==event.schedule[index-1].date?'new-exam-day':''}"><td>${item.date}</td><td>${item.time}</td><td>${item.subject}</td><td>${scopeFor(item.subject)}</td></tr>`).join('')}</tbody></table></div></section>`:'';
  const reminders=event.reminders?`<section><h3>重要提醒</h3><ul>${event.reminders.map(item=>`<li>${item}</li>`).join('')}</ul></section>`:'';
  return `<details class="event-details"><summary>查看考程與範圍</summary><div class="event-details-body">${schedule}${reminders}</div></details>`;
};

function home(){
  const descriptions=['依年級查找活動與重要日期','課表、考試範圍與學習資源','交通、制服、餐飲與行政流程','依年級整理的重要通知'];
  const today=startOfToday();
  const monthLater=new Date(today);monthLater.setDate(monthLater.getDate()+30);
  const upcomingExams=events.filter(x=>x.category.startsWith('考試-')&&localDate(x.start)>=today&&localDate(x.start)<=monthLater).sort((a,b)=>a.start.localeCompare(b.start));
  const entranceExam={start:'2027-05-15',end:'2027-05-16',title:'116年國中教育會考'};
  const examRows=upcomingExams.length?upcomingExams.map(x=>`<li><a class="countdown-event-link" href="#/calendar" data-event-index="${events.indexOf(x)}"><strong>${countdownLabel(x.start)}</strong><h2>${x.title}<span aria-hidden="true">›</span></h2><p>${compactDate(x)}${x.grades.length?`・${gradeText(x.grades)}`:''}</p></a></li>`).join(''):'<li class="countdown-empty">未來一個月內目前沒有考試。</li>';
  return `<section class="hero"><div class="hero-copy"><span class="eyebrow">MIDDLE SCHOOL INFO PORTAL</span><h1>不同年級的重要日期，<br>清楚整理在一處。</h1><p>快速依年級查找活動、課程、健康檢查、家長會與各項截止日。</p><div class="hero-actions"><a class="primary" href="#/calendar">📅 查看完整行事曆</a><a class="secondary" href="#/notices">★ 網站最新異動</a></div></div><aside class="today-card countdown-card"><span>◷ 重要日期倒數</span><section class="entrance-countdown"><strong>${countdownLabel(entranceExam.start)}</strong><h2>${entranceExam.title}</h2><p>${compactDate(entranceExam)}</p></section><div class="countdown-subheading"><b>未來一個月內的考試</b><span>${upcomingExams.length} 項</span></div><ul>${examRows}</ul><a href="#/calendar">查看完整行事曆 <b>›</b></a></aside></section><section class="quick-section"><div class="section-heading"><span>快速入口</span><h2>你今天要找什麼？</h2></div><div class="quick-grid">${routes.slice(1).map(([p,l,i],n)=>`<a href="#${p}"><span class="card-number">0${n+1}</span><i class="large-symbol">${i}</i><h3>${l}</h3><p>${descriptions[n]}</p><b class="arrow">›</b></a>`).join('')}</div></section><section class="status-band"><b>✓</b><div><strong>已匯入 ${events.length} 項日期</strong><span>資料來源：115學年度第一學期國中部活動日期整理；修訂日期已套用。</span></div></section>`;
}

function calendar(){
  const categories=state.groups.length?[...new Set(state.groups.flatMap(group=>categoryGroups[group]))]:Object.values(categoryGroups).flat();
  const query=state.query.trim().toLocaleLowerCase('zh-Hant');
  const matchesQuery=(x)=>{
    if(!query)return true;
    const dates=[x.start,x.end||''].flatMap(value=>value?[value,value.replaceAll('-','.'),value.replaceAll('-','/')]:[]);
    const haystack=[x.title,x.note||'',x.category,groupFor(x.category),placeFor(x.category),gradeText(x.grades),...dates].join(' ').toLocaleLowerCase('zh-Hant');
    return haystack.includes(query);
  };
  const filtered=events.filter(x=>(state.includePast||!isPast(x))&&(state.grade==='all'||x.grades.length===0||x.grades.includes(Number(state.grade)))&&(state.place==='all'||placeFor(x.category)===state.place)&&(state.groups.length===0||state.groups.includes(groupFor(x.category)))&&(state.categories.length===0||state.categories.includes(x.category))&&matchesQuery(x)).slice().sort((a,b)=>a.start.localeCompare(b.start)||a.title.localeCompare(b.title,'zh-Hant'));
  return head('115學年度第一學期','國中部活動行事曆','依年級、校內／校外、大分類與小分類快速篩選。標示「暫定」的日期仍須以最新公告為準。')+
    `${state.query?`<section class="search-summary"><span>搜尋「${escapeHtml(state.query)}」的結果</span><button id="search-clear" type="button">清除搜尋</button></section>`:''}<section class="calendar-tools" aria-label="行事曆篩選"><div class="select-filters"><label>適用年級<select id="grade-filter"><option value="all">全部年級</option><option value="7">國七</option><option value="8">國八</option><option value="9">國九</option></select></label><label>校內／校外<select id="place-filter"><option value="all">全部</option><option value="校內">校內</option><option value="校外">校外</option></select></label><label class="past-toggle"><input id="include-past" type="checkbox" ${state.includePast?'checked':''}><span>包含已過期</span></label><p>顯示 <strong>${filtered.length}</strong> 項</p></div><fieldset class="multi-filter"><legend>大分類（可複選；未選代表全部）</legend><div>${Object.keys(categoryGroups).map(x=>`<label><input type="checkbox" name="group-filter" value="${x}" ${state.groups.includes(x)?'checked':''}><span>${x}</span></label>`).join('')}</div></fieldset><fieldset class="multi-filter"><legend>小分類（可複選；未選代表全部）</legend><div>${categories.map(x=>`<label><input type="checkbox" name="category-filter" value="${x}" ${state.categories.includes(x)?'checked':''}><span>${x}</span></label>`).join('')}</div></fieldset></section>`+
    `<section class="timeline">${filtered.map(x=>`<article id="event-${events.indexOf(x)}" class="${isPast(x)?'past-event ':''}${state.focusEvent===events.indexOf(x)?'focused-event':''}"><time>${dateText(x)}</time><div class="event-copy"><div class="event-tags"><span class="place-tag">${placeFor(x.category)}</span><span class="group-tag">${groupFor(x.category)}</span><span class="tag">${x.category}</span><span class="grade-tag">${gradeText(x.grades)}</span>${x.tentative?'<span class="tentative-tag">暫定</span>':''}${isPast(x)?'<span class="expired-tag">已結束</span>':''}</div><h2>${x.title}</h2>${x.note?`<p>${x.note}</p>`:''}${eventDetails(x)}<a class="google-calendar-link" href="${googleCalendarUrl(x)}" target="_blank" rel="noopener">＋ 加入 Google 日曆</a></div></article>`).join('')||'<p class="empty-state">目前沒有符合條件的活動。</p>'}</section><p class="source-note">資料依使用者提供的「115-1 國中部活動日期統整」圖片整理；民國115／116年已轉為西元2026／2027年。</p>`+
    `<section class="source-gallery"><header><span class="eyebrow">SOURCE FILES</span><h2>田教日期原始資料</h2><p>點選圖片可另開原尺寸檢視。</p></header><div class="source-grid"><figure><a href="./assets/field-trips/grade-7-field-trip-dates.png" target="_blank" rel="noopener"><img src="./assets/field-trips/grade-7-field-trip-dates.png" alt="國七單日田教日期原始表格"></a><figcaption>國七｜單日田教</figcaption></figure><figure><a href="./assets/field-trips/grade-8-field-trip-dates.png" target="_blank" rel="noopener"><img src="./assets/field-trips/grade-8-field-trip-dates.png" alt="國八過夜田教日期原始表格"></a><figcaption>國八｜過夜田教</figcaption></figure><figure><a href="./assets/field-trips/grade-9-field-trip-dates.png" target="_blank" rel="noopener"><img src="./assets/field-trips/grade-9-field-trip-dates.png" alt="國九田教日期原始表格"></a><figcaption>國九｜田教</figcaption></figure></div></section>`;
}

function learning(){return head('EXAM SCHEDULE','考程整理','後續可依國七、國八、國九細分。')+`<section class="content-grid">${learningGroups.map(x=>`<article class="content-card"><i class="section-symbol">▤</i><h2>${x.title}</h2><ul>${x.items.map(y=>`<li>${y}<span>待補資料</span></li>`).join('')}</ul></article>`).join('')}</section>`}
function school(){return head('SCHOOL LIFE','校園事務','把常用行政與校園生活資訊變成容易查找的主題清單。')+`<section class="list-panel">${affairs.map((x,i)=>`<article><span class="list-index">0${i+1}</span><div><h2>${x.title}</h2><p>${x.detail}</p></div><b>›</b></article>`).join('')}</section>`}
function notice(){return head('CHANGELOG','網站最新異動','記錄本站資料新增與內容修訂。')+`<section class="notice-list">${notices.map(x=>`<article><div><time>${x.date}</time><span class="tag">${x.audience}</span></div><div><h2>${x.title}</h2><p>${x.summary}</p></div></article>`).join('')}</section>`}

function render(resetScroll=false){
  const previousScroll=window.scrollY;
  const raw=location.hash.slice(1)||'/';
  const path=routes.some(([p])=>p===raw)?raw:'/';
  const pages={'/':home,'/calendar':calendar,'/learning':learning,'/affairs':school,'/notices':notice};
  root.innerHTML=`<div class="site-shell"><header class="site-header"><a class="brand" href="#/"><b>◆</b><span>小鈴鐺資訊整合</span></a><button class="menu-button" aria-label="切換導覽">☰</button><nav aria-label="主要導覽">${routes.map(([p,l,i])=>`<a class="${path===p?'active':''}" href="#${p}"><b>${i}</b><span>${l}</span></a>`).join('')}</nav></header><main>${pages[path]()}</main><footer>本站為家長自行整理資訊，請以學校與導師最新公告為準。<span>最後更新：${updatedAt}</span></footer></div>`;
  document.querySelector('.menu-button').onclick=()=>document.querySelector('nav').classList.toggle('open');
  if(path==='/'){
    const actions=document.querySelector('.hero-actions');
    actions.querySelector('.secondary')?.remove();
    document.querySelector('.quick-section')?.remove();
    actions.insertAdjacentHTML('beforebegin','<form class="calendar-search home-search" id="home-search" role="search"><label for="home-search-input">搜尋所有行程</label><div><input id="home-search-input" type="search" placeholder="例如：段考、國九、10/23" autocomplete="off"><button class="search-button" type="submit">搜尋</button></div></form>');
    const homeSearch=document.querySelector('#home-search');
    const homeSearchInput=document.querySelector('#home-search-input');
    homeSearchInput.value=state.query;
    homeSearch.onsubmit=(event)=>{event.preventDefault();state.query=homeSearchInput.value.trim();if(!state.query)return;state.includePast=true;location.hash='#/calendar'};
    document.querySelectorAll('.countdown-event-link').forEach(link=>link.onclick=()=>{state.grade='all';state.place='all';state.groups=[];state.categories=[];state.query='';state.includePast=false;state.focusEvent=Number(link.dataset.eventIndex)});
  }
  if(path==='/calendar'){
    const searchClear=document.querySelector('#search-clear');
    const grade=document.querySelector('#grade-filter');
    const place=document.querySelector('#place-filter');
    const includePast=document.querySelector('#include-past');
    const groupChecks=[...document.querySelectorAll('[name="group-filter"]')];
    const categoryChecks=[...document.querySelectorAll('[name="category-filter"]')];
    grade.value=state.grade; place.value=state.place;
    if(searchClear)searchClear.onclick=()=>{state.query='';state.includePast=false;render()};
    grade.onchange=()=>{state.grade=grade.value;render()};
    place.onchange=()=>{state.place=place.value;render()};
    includePast.onchange=()=>{state.includePast=includePast.checked;render()};
    groupChecks.forEach(input=>input.onchange=()=>{state.groups=groupChecks.filter(x=>x.checked).map(x=>x.value);const allowed=state.groups.length?state.groups.flatMap(x=>categoryGroups[x]):Object.values(categoryGroups).flat();state.categories=state.categories.filter(x=>allowed.includes(x));render()});
    categoryChecks.forEach(input=>input.onchange=()=>{state.categories=categoryChecks.filter(x=>x.checked).map(x=>x.value);render()});
    if(state.focusEvent!==null){const target=document.querySelector(`#event-${state.focusEvent}`);requestAnimationFrame(()=>target?.scrollIntoView({behavior:'smooth',block:'center'}));state.focusEvent=null}
  }
  window.scrollTo(0,resetScroll?0:previousScroll);
}
addEventListener('hashchange',()=>render(true));render();
