import { seniorRoutes, seniorPage, mountSenior, seniorUpdatedAt } from './senior.js?v=20261007-g11-exams';
import { academicPeriods, overlapsPeriod } from './academic-periods.js?v=20261003';
import { semesterOverview, semester } from './semester.js?v=20261007-audience';
import { uniforms } from './uniforms.js?v=20260910';
import { mountExams, examLink } from './exams.js?v=20261007-unit';
import { affairs, events, learningGroups, notices, updatedAt } from './data.js?v=20261007-evening-pending';

const routes=[['/','首頁','⌂'],['/calendar','行事曆','📅'],['/exams','考程與範圍','▤'],['/uniforms','校服價格','👕']];
const categoryGroups={
  '重要日程':['開學/放假','活動','夜間課程/夜自習','田教/校外教學','畢業'],
  '考試':['考試-全民英檢','考試-學科競賽','考試-國際能力','考試-模擬考','考試-段考'],
  '家長參與':['一般家長','特定家長'],
  '行政與其他':['行政','健康','編班','其他'],
};
const groupFor=(category)=>Object.entries(categoryGroups).find(([,items])=>items.includes(category))?.[0]||'行政與其他';
const placeFor=(category)=>category==='考試-全民英檢'?'校外':'校內';
const state={academicYear:'115',term:'上學期',view:'overview',year:String(new Date().getFullYear()),month:'all',grade:'all',place:'all',groups:[],categories:[],query:'',includePast:false,focusEvent:null};
const root=document.querySelector('#root');
const dateText=(event)=>{
  const weekdays='日一二三四五六';
  const short=(value)=>{const date=new Date(`${value}T00:00:00`);return `${date.getFullYear()}.${String(date.getMonth()+1).padStart(2,'0')}.${String(date.getDate()).padStart(2,'0')}（${weekdays[date.getDay()]}）`};
  return event.end&&event.end!==event.start?`${short(event.start)}<span class="date-connector">｜</span><span class="date-end">${short(event.end)}</span>`:short(event.start);
};
const gradeText=(grades)=>grades.length?grades.map(x=>`國${'七八九'[x-7]}`).join('、'):'國中部全體';
const eventGradeText=x=>[x.grades.length||!x.pendingGrades?.length?gradeText(x.grades):'',x.pendingGrades?.length?(x.pendingLabel||`${gradeText(x.pendingGrades)}是否可參加待確認`):''].filter(Boolean).join('；');
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
const examStatus=(event)=>localDate(event.start)<=startOfToday()&&localDate(event.end||event.start)>=startOfToday()?'進行中':countdownLabel(event.start);
const formatNote=value=>escapeHtml(value).replace(/https:\/\/[^\s<>]+/g,url=>`<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`);
const isPast=(event)=>localDate(event.end||event.start)<startOfToday();
const addDays=(value,days)=>{const date=localDate(value);date.setDate(date.getDate()+days);return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`};
const googleCalendarUrl=(event)=>{
  const calendarDate=(value)=>value.replaceAll('-','');
  const details=[eventGradeText(event),event.category,event.note||'', '本站為家長自行整理資訊，請以學校與導師最新公告為準。'].filter(Boolean).join('\n');
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
  const upcomingExams=events.filter(x=>x.category.startsWith('考試-')&&localDate(x.end||x.start)>=today&&localDate(x.start)<=monthLater).sort((a,b)=>a.start.localeCompare(b.start));
  const weekEnd=new Date(today);weekEnd.setDate(weekEnd.getDate()+7);
  const weeklyEvents=events.filter(x=>!x.category.startsWith('考試-')&&localDate(x.start)<weekEnd&&localDate(x.end||x.start)>=today).sort((a,b)=>a.start.localeCompare(b.start)||a.title.localeCompare(b.title,'zh-Hant'));
  const weeklySection=`<section class="weekly-agenda" aria-labelledby="weekly-heading"><div class="countdown-subheading"><h2 id="weekly-heading">一週內行程</h2><span>${weeklyEvents.length} 項</span></div><p class="weekly-caption">今天起七天內的安排，含進行中的活動。點選行程查看細節。</p><ul>${weeklyEvents.length?weeklyEvents.map(x=>`<li><a class="countdown-event-link" href="#/calendar" data-event-index="${events.indexOf(x)}"><span class="weekly-status">${localDate(x.start)<today?'進行中':countdownLabel(x.start)}</span><h3>${escapeHtml(x.title)}${x.tentative?' <small>暫定</small>':''}</h3><p>${compactDate(x)}・${eventGradeText(x)}</p></a></li>`).join(''):'<li class="weekly-empty">這七天內目前沒有安排活動。</li>'}</ul></section>`;
  const entranceExam={start:'2027-05-15',end:'2027-05-16',title:'116年國中教育會考'};
  const examRows=upcomingExams.length?upcomingExams.map(x=>`<li><a class="countdown-event-link" href="#/calendar" data-event-index="${events.indexOf(x)}"><strong>${examStatus(x)}</strong><h2>${x.title}<span aria-hidden="true">›</span></h2><p>${compactDate(x)}${x.grades.length?`・${eventGradeText(x)}`:''}</p></a></li>`).join(''):'<li class="countdown-empty">未來一個月內目前沒有考試。</li>';
  return `<section class="hero"><div class="hero-copy"><span class="eyebrow">MIDDLE SCHOOL INFO PORTAL</span><h1>不同年級的重要日期，<br>清楚整理在一處。</h1><p>快速依年級查找活動、課程、健康檢查、家長會與各項截止日。</p><div class="hero-actions"><a class="primary" href="#/calendar">📅 查看完整行事曆</a><a class="secondary" href="#/notices">★ 網站最新異動</a></div></div><aside class="today-card countdown-card"><span>◷ 重要日期倒數</span><section class="entrance-countdown"><strong>${examStatus(entranceExam)}</strong><h2>${entranceExam.title}</h2><p>${compactDate(entranceExam)}</p></section><div class="countdown-subheading"><b>進行中與未來一個月的考試</b><span>${upcomingExams.length} 項</span></div><ul>${examRows}</ul><a href="#/calendar">查看完整行事曆 <b>›</b></a></aside></section>${weeklySection}<section class="quick-section"><div class="section-heading"><span>快速入口</span><h2>你今天要找什麼？</h2></div><div class="quick-grid">${routes.slice(1).map(([p,l,i],n)=>`<a href="#${p}"><span class="card-number">0${n+1}</span><i class="large-symbol">${i}</i><h3>${l}</h3><p>${descriptions[n]}</p><b class="arrow">›</b></a>`).join('')}</div></section><section class="status-band"><b>✓</b><div><strong>已匯入 ${events.length} 項日期</strong><span>資料來源：115學年度第一學期國中部活動日期整理；修訂日期已套用。</span></div></section>`;
}



const occursOn=(x,date)=>x.start<=date&&(x.end||x.start)>=date&&(!x.weekdays||x.weekdays.includes(localDate(date).getDay()));
function winterDay(date,filtered){
 const holiday=filtered.find(x=>x.calendarKind==='winter-break'&&occursOn(x,date));
 if(!holiday)return '';
 const course=events.find(x=>x.calendarKind==='winter-course'&&x.start<=date&&(x.end||x.start)>=date);
 const lesson=course&&occursOn(course,date);
 const tentative=holiday.tentative||course?.tentative;
 return '<button class="winter-status '+(lesson?'winter-class':'winter-free')+'" data-month-event="'+events.indexOf(lesson&&filtered.includes(course)?course:holiday)+'">'+(lesson?'寒輔上課':'寒假免到校')+(tentative?'（暫定）':'')+'</button>';
}

function monthGrid(filtered){
 const first=state.year+'-'+state.month+'-01',offset=localDate(first).getDay(),count=new Date(+state.year,+state.month,0).getDate();
 let cells=[...'日一二三四五六'].map(x=>'<div class="month-weekday">'+x+'</div>').join('');
 for(let i=0;i<Math.ceil((offset+count)/7)*7;i++){
 const day=i-offset+1;if(day<1||day>count){cells+='<div class="month-blank"></div>';continue;}
 const date=state.year+'-'+state.month+'-'+String(day).padStart(2,'0'),status=winterDay(date,filtered),items=filtered.filter(x=>occursOn(x,date)&&!(status&&['winter-break','winter-course'].includes(x.calendarKind)));
 cells+='<section class="month-day '+(daysUntil(date)===0?'month-today':'')+'" aria-label="'+date+'"><time datetime="'+date+'">'+day+(daysUntil(date)===0?'<small>今天</small>':'')+'</time>'+status+items.slice(0,2).map(x=>'<button class="month-event" data-month-event="'+events.indexOf(x)+'" title="'+escapeHtml(x.title)+'">'+escapeHtml(x.calendarKind==='winter-course'?'寒輔上課':x.title)+(x.tentative?'（暫定）':'')+(x.pendingGrades?.length?'（'+escapeHtml(x.pendingLabel||gradeText(x.pendingGrades)+'參加待確認')+'）':'')+'</button>').join('')+(items.length>2?'<button class="month-more" data-month-day="'+date+'">還有 '+(items.length-2)+' 項</button>':'')+'</section>';
 }
 return '<section class="month-calendar"><div class="month-nav"><button data-month-step="-1">‹ 上個月</button><h2>'+state.year+' 年 '+Number(state.month)+' 月</h2><button data-month-step="1">下個月 ›</button></div><p class="source-note">'+(academicPeriods.filter(p=>p.start<=state.year+'-'+state.month+'-'+String(count).padStart(2,'0')&&p.end>=first).map(p=>p.year+' 學年度 '+p.term).join('／')||'此月份尚未設定學期')+'</p><p class="source-note">空白日期表示目前未收錄符合篩選的行程，仍請以學校公告為準。</p><div class="month-grid">'+cells+'</div>'+(!filtered.length?'<p class="empty-state">本月沒有符合篩選的行程。</p>':'')+'</section>';
}
function bindMonthActions(){
 document.querySelector('#month-view')?.addEventListener('click',event=>{
 const top=event.target.closest('[data-overview-top]');if(top){const form=document.querySelector('.calendar-search');const header=document.querySelector('.site-header');document.querySelector('#calendar-search-input')?.focus({preventScroll:true});window.scrollTo({top:window.scrollY+form.getBoundingClientRect().top-header.getBoundingClientRect().height-16,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});return;}
 const jump=event.target.closest('[data-overview-jump]');if(jump){document.getElementById(jump.dataset.overviewJump)?.scrollIntoView({behavior:'smooth',block:'start'});return;}
 const step=event.target.closest('[data-month-step]');if(step){const d=new Date(+state.year,+state.month-1+Number(step.dataset.monthStep),1);state.year=String(d.getFullYear());state.month=String(d.getMonth()+1).padStart(2,'0');render();return;}
 const button=event.target.closest('[data-month-event],[data-month-day]');if(!button)return;
 const ids=button.dataset.monthEvent!==undefined?[Number(button.dataset.monthEvent)]:[...document.querySelectorAll('.timeline article')].map(x=>Number(x.id.slice(6))).filter(i=>events[i].start<=button.dataset.monthDay&&(events[i].end||events[i].start)>=button.dataset.monthDay);
 const dialog=document.createElement('dialog');dialog.className='month-dialog';dialog.setAttribute('aria-label','行程細節');dialog.innerHTML='<button class="month-close" autofocus>關閉</button><div class="timeline"></div>';
 ids.forEach(i=>{const card=document.getElementById('event-'+i).cloneNode(true);card.removeAttribute('id');card.querySelectorAll('details').forEach(d=>d.open=true);dialog.querySelector('.timeline').append(card)});
 document.body.append(dialog);dialog.querySelector('.month-close').onclick=()=>dialog.close();dialog.addEventListener('close',()=>{dialog.remove();button.focus()});dialog.showModal();
 });
}

function calendar(){
  if(state.view==='month'){if(state.year==='all')state.year=String(new Date().getFullYear());if(state.month==='all')state.month=String(new Date().getMonth()+1).padStart(2,'0');}
  const years=new Set([String(new Date().getFullYear())]);
  events.forEach(x=>{for(let y=Number(x.start.slice(0,4));y<=Number((x.end||x.start).slice(0,4));y++)years.add(String(y));});
  if(state.year!=='all')years.add(state.year);
  const yearOptions=[...years].sort();
  const periodSelected=state.year!=='all';
  const showWholeMonth=state.view==='month'&&periodSelected&&state.month!=='all';
  const academicYears=[...new Set(academicPeriods.map(p=>p.year))].sort((a,b)=>b-a);
  const matchesAcademic=x=>(state.academicYear==='all'&&state.term==='all')||academicPeriods.some(p=>(state.academicYear==='all'||p.year===state.academicYear)&&(state.term==='all'||p.term===state.term)&&overlapsPeriod(x,p));
  const from=state.month==='all'?`${state.year}-01-01`:`${state.year}-${state.month}-01`;
  const until=state.month==='all'?`${Number(state.year)+1}-01-01`:addDays(from,32).slice(0,7)+'-01';
  const matchesMonth=x=>state.view==='overview'?(x.start<=semester.end&&(x.end||x.start)>=semester.start):state.view==='list'?matchesAcademic(x):!periodSelected||(x.start<until&&(x.end||x.start)>=from);
  const categories=state.groups.length?[...new Set(state.groups.flatMap(group=>categoryGroups[group]))]:Object.values(categoryGroups).flat();
  const query=state.query.trim().toLocaleLowerCase('zh-Hant');
  const matchesQuery=(x)=>{
    if(!query)return true;
    const dates=[x.start,x.end||''].flatMap(value=>value?[value,value.replaceAll('-','.'),value.replaceAll('-','/')]:[]);
    const haystack=[x.title,...(x.searchAliases||[]),x.note||'',x.category,groupFor(x.category),placeFor(x.category),eventGradeText(x),...dates].join(' ').toLocaleLowerCase('zh-Hant');
    return haystack.includes(query);
  };
  const filtered=events.filter(x=>matchesMonth(x)&&(state.view==='overview'||showWholeMonth||state.includePast||!isPast(x))&&(state.grade==='all'||(x.grades.length===0&&!x.pendingGrades?.length)||x.grades.includes(Number(state.grade))||x.pendingGrades?.includes(Number(state.grade)))&&(state.place==='all'||placeFor(x.category)===state.place)&&(state.groups.length===0||state.groups.includes(groupFor(x.category)))&&(state.categories.length===0||state.categories.includes(x.category))&&matchesQuery(x)).slice().sort((a,b)=>a.start.localeCompare(b.start)||a.title.localeCompare(b.title,'zh-Hant'));
  return head('115學年度第一學期','國中部活動行事曆','學期總覽按週呈現已收錄行程，含暑期及寒假；可切換月曆或篩選查詢。點選活動查看細節，暫定日期以最新公告為準。')+
    `<section class="calendar-tools ${state.view==='overview'?'overview-tools':''}" aria-label="行事曆篩選"><div class="calendar-view-toggle" role="group" aria-label="顯示方式"><button type="button" data-calendar-view="overview" aria-pressed="${state.view==='overview'}">學期總覽</button><button type="button" data-calendar-view="list" aria-pressed="${state.view==='list'}">篩選查詢</button><button type="button" data-calendar-view="month" aria-pressed="${state.view==='month'}">月曆</button></div><div class="calendar-shortcuts" role="group" aria-label="快速篩選">${['全部行程','考試','家長參與','放假與補課'].map(x=>`<button type="button" data-calendar-shortcut="${x}" aria-pressed="${x==='全部行程'?!state.groups.length&&!state.categories.length:x==='放假與補課'?state.categories.length===2&&state.categories.includes('開學/放假'):state.groups.length===1&&state.groups[0]===x&&!state.categories.length}">${x}</button>`).join('')}</div><div class="select-filters"><label class="academic-control" ${state.view!=='list'?'hidden':''}>學年度<select id="academic-year-filter"><option value="all">全部學年度</option>${academicYears.map(y=>`<option value="${y}" ${state.academicYear===y?'selected':''}>${y} 學年度</option>`).join('')}</select></label><label class="academic-control" ${state.view!=='list'?'hidden':''}>學期<select id="term-filter">${['all','上學期','下學期','暑期'].map(t=>`<option value="${t}" ${state.term===t?'selected':''}>${t==='all'?'全部學期':t}</option>`).join('')}</select></label><label class="period-control" ${state.view!=='month'?'hidden':''}>年份<select id="year-filter"><option value="all">全部年份</option>${yearOptions.map(y=>`<option value="${y}" ${state.year===y?'selected':''}>${y} 年</option>`).join('')}</select></label><label class="period-control" ${state.view!=='month'?'hidden':''}>月份<select id="month-filter" ${!periodSelected?'disabled':''}><option value="all">全部月份</option>${Array.from({length:12},(_,i)=>String(i+1).padStart(2,'0')).map(m=>`<option value="${m}" ${state.month===m?'selected':''}>${Number(m)} 月</option>`).join('')}</select></label><button type="button" class="current-month-button" id="current-month" ${state.view!=='month'?'hidden':''}>本月</button><label>適用年級<select id="grade-filter"><option value="all">全部年級</option><option value="7">國七</option><option value="8">國八</option><option value="9">國九</option></select></label><label>校內／校外<select id="place-filter"><option value="all">全部</option><option value="校內">校內</option><option value="校外">校外</option></select></label><label class="past-toggle"><input id="include-past" type="checkbox" ${state.view==='overview'||showWholeMonth?'checked disabled':state.includePast?'checked':''}><span>包含已過期</span></label><p>顯示 <strong>${filtered.length}</strong> 項</p></div><details class="calendar-advanced"><summary>更多分類篩選</summary><fieldset class="multi-filter"><legend>大分類（可複選；未選代表全部）</legend><div>${Object.keys(categoryGroups).map(x=>`<label><input type="checkbox" name="group-filter" value="${x}" ${state.groups.includes(x)?'checked':''}><span>${x}</span></label>`).join('')}</div></fieldset><fieldset class="multi-filter"><legend>小分類（可複選；未選代表全部）</legend><div>${categories.map(x=>`<label><input type="checkbox" name="category-filter" value="${x}" ${state.categories.includes(x)?'checked':''}><span>${x}</span></label>`).join('')}</div></fieldset></details></section>`+
    `${state.view==='list'?'<p class="source-note">依學年度查詢跨年行程；暑期歸入即將開始的學年度，寒假歸入上學期。115 上學期：2026/8/31～2027/2/10。</p>':''}<div id="search-expansion">${!filtered.length&&query?'<p class="source-note">找不到行程？可擴大日期範圍（包含已結束行程，保留年級與分類）。</p><button type="button" id="search-all-years" class="current-month-button">搜尋所有學年度</button>':''}</div><div id="month-view">${state.view==='overview'?semesterOverview(filtered,events,{escapeHtml,addDays,localDate,daysUntil,eventGradeText,occursOn}):state.view==='month'?monthGrid(filtered):''}</div><section class="timeline" ${state.view!=='list'?'hidden':''}>${filtered.map(x=>`<article id="event-${events.indexOf(x)}" class="${isPast(x)?'past-event ':''}${state.focusEvent===events.indexOf(x)?'focused-event':''}"><time>${dateText(x)}</time><div class="event-copy"><div class="event-tags"><span class="place-tag">${placeFor(x.category)}</span><span class="group-tag">${groupFor(x.category)}</span><span class="tag">${x.category}</span><span class="grade-tag">${eventGradeText(x)}</span>${x.tentative?'<span class="tentative-tag">暫定</span>':''}${isPast(x)?'<span class="expired-tag">已結束</span>':''}</div><h2>${x.title}</h2>${x.note?(x.collapsibleNote?`<details class="event-details"><summary>查看細節</summary><div class="event-details-body"><p class="event-note">${formatNote(x.note)}</p></div></details>`:`<p class="event-note">${formatNote(x.note)}</p>`):''}${eventDetails(x)}${examLink(x)}<a class="google-calendar-link" href="${googleCalendarUrl(x)}" target="_blank" rel="noopener">＋ 加入 Google 日曆</a></div></article>`).join('')||'<p class="empty-state">目前沒有符合條件的活動。</p>'}</section><p class="source-note">資料依使用者提供的「115-1 國中部活動日期統整」圖片整理；民國115／116年已轉為西元2026／2027年。</p>`+
    `<section class="source-gallery"><header><span class="eyebrow">SOURCE FILES</span><h2>田教日期原始資料</h2><p>點選圖片可另開原尺寸檢視。</p></header><div class="source-grid"><figure><a href="./assets/field-trips/grade-7-field-trip-dates.png" target="_blank" rel="noopener"><img src="./assets/field-trips/grade-7-field-trip-dates.png" alt="國七單日田教日期原始表格"></a><figcaption>國七｜單日田教</figcaption></figure><figure><a href="./assets/field-trips/grade-8-field-trip-dates.png" target="_blank" rel="noopener"><img src="./assets/field-trips/grade-8-field-trip-dates.png" alt="國八過夜田教日期原始表格"></a><figcaption>國八｜過夜田教</figcaption></figure><figure><a href="./assets/field-trips/grade-9-field-trip-dates.png" target="_blank" rel="noopener"><img src="./assets/field-trips/grade-9-field-trip-dates.png" alt="國九田教日期原始表格"></a><figcaption>國九｜田教</figcaption></figure></div></section>`;
}

function learning(){return head('EXAM SCHEDULE','考程整理','後續可依國七、國八、國九細分。')+`<section class="content-grid">${learningGroups.map(x=>`<article class="content-card"><i class="section-symbol">▤</i><h2>${x.title}</h2><ul>${x.items.map(y=>`<li>${y}<span>待補資料</span></li>`).join('')}</ul></article>`).join('')}</section>`}
function school(){return head('SCHOOL LIFE','校園事務','把常用行政與校園生活資訊變成容易查找的主題清單。')+`<section class="list-panel">${affairs.map((x,i)=>`<article><span class="list-index">0${i+1}</span><div><h2>${x.title}</h2><p>${x.detail}</p></div><b>›</b></article>`).join('')}</section>`}
function notice(){return head('CHANGELOG','網站最新異動','記錄本站資料新增與內容修訂。')+`<section class="notice-list">${notices.map(x=>`<article><div><time>${x.date}</time><span class="tag">${x.audience}</span></div><div><h2>${x.title}</h2><p>${x.summary}</p></div></article>`).join('')}</section>`}

function render(resetScroll=false){
  const previousScroll=window.scrollY;
  const raw=(location.hash.slice(1)||'/').split('?')[0];
  const path=[...routes,...seniorRoutes].some(([p])=>p===raw)?raw:'/';
  const isSenior=path.startsWith('/senior');
  const displayRoutes=isSenior?seniorRoutes:routes;
  document.title='小鈴鐺資訊整合（'+(isSenior?'高中':'國中')+'）';
  const pages={'/uniforms':uniforms,'/':home,'/calendar':calendar,'/exams':()=>'<div id="exam-root"></div>','/senior':()=>seniorPage('/senior'),'/senior/calendar':()=>seniorPage('/senior/calendar'),'/senior/exams':()=>seniorPage('/senior/exams'),'/senior/gsat':()=>seniorPage('/senior/gsat'),'/learning':learning,'/affairs':school,'/notices':notice};
  root.innerHTML=`<div class="site-shell ${isSenior?'senior-site':''}"><header class="site-header"><a class="brand" href="${isSenior?'#/senior':'#/'}"><b>◆</b><span>小鈴鐺資訊整合（中學）</span></a><button class="menu-button" aria-label="切換導覽">☰</button><nav aria-label="主要導覽">${displayRoutes.map(([p,l,i])=>`<a class="${path===p?'active':''}" href="#${p}"><b>${i}</b><span>${l}</span></a>`).join('')}</nav></header><div class="school-level-switch" role="navigation" aria-label="切換學段"><span class="school-level-label">逛逛小鈴鐺</span><a href="https://eilleenlan.github.io/lanbell-elementary-pages/#/" aria-label="前往小學資訊網站"><span aria-hidden="true">🔔</span><span>小學鈴噹</span></a>${[['#/','國中'],['#/senior','高中']].map(([href,label])=>(label==='高中')===isSenior?`<span class="school-level-current" aria-current="true"><span><span aria-hidden="true">🔔</span> ${label}鈴鐺</span><span class="school-level-hint">你在這裡</span></span>`:`<a href="${href}" aria-label="前往${label}資訊網站"><span aria-hidden="true">🔔</span><span>${label}鈴鐺</span></a>`).join('')}</div><div class="site-disclaimer" role="note"><p>本站為家長整理的<strong>非官方資訊網站</strong>，內容僅供參考；如與學校公告有差異，請以<strong>學校最新公告為準</strong>。</p><p>資料仍在陸續整理與補充中，目前尚未完整收錄。</p></div><main>${pages[path]()}</main><footer>非官方網站，純屬家長交流參考，一切資訊以學校最新公告為準<span>最後更新：${isSenior?seniorUpdatedAt:updatedAt}</span></footer></div>`;
  document.querySelector('.menu-button').onclick=()=>document.querySelector('.site-header nav').classList.toggle('open');
  if(isSenior){mountSenior(path);if(resetScroll&&!new URLSearchParams(location.hash.split('?')[1]||'').has('event'))window.scrollTo(0,0);return;}
  if(path==='/uniforms')document.querySelectorAll('[data-uniform-target]').forEach(button=>button.onclick=()=>document.getElementById(button.dataset.uniformTarget)?.scrollIntoView({behavior:'smooth'}));
  if(path==='/exams')mountExams(document.querySelector('#exam-root'));
  if(path==='/'){
    document.querySelectorAll('a[href="#/calendar"]:not([data-event-index])').forEach(a=>a.onclick=()=>{state.view='overview';state.grade='all';state.place='all';state.groups=[];state.categories=[];state.query=''});
    const actions=document.querySelector('.hero-actions');
    const archiveLink=actions.querySelector('.secondary');archiveLink.href='#/exams';archiveLink.textContent='▤ 考程與範圍';
    document.querySelector('.quick-section')?.remove();
    actions.insertAdjacentHTML('beforebegin','<form class="calendar-search home-search" id="home-search" role="search"><label for="home-search-input">搜尋所有行程</label><div><input id="home-search-input" type="search" placeholder="例如：段考、國九、10/23" autocomplete="off"><button class="search-button" type="submit">搜尋</button></div></form>');
    const homeSearch=document.querySelector('#home-search');
    const homeSearchInput=document.querySelector('#home-search-input');
    homeSearchInput.value=state.query;
    homeSearch.onsubmit=(event)=>{event.preventDefault();state.query=homeSearchInput.value.trim();if(!state.query)return;state.view='list';state.academicYear='all';state.term='all';state.year='all';state.month='all';state.includePast=true;location.hash='#/calendar'};
    document.querySelectorAll('.countdown-event-link').forEach(link=>link.onclick=()=>{state.view='list';state.year='all';state.month='all';state.grade='all';state.place='all';state.groups=[];state.categories=[];state.query='';state.includePast=false;state.focusEvent=Number(link.dataset.eventIndex)});
  }
  if(path==='/calendar'){
    document.querySelectorAll('[data-calendar-view]').forEach(b=>b.onclick=()=>{state.view=b.dataset.calendarView;render()});
    document.querySelectorAll('[data-calendar-shortcut]').forEach(b=>b.onclick=()=>{const key=b.dataset.calendarShortcut;state.groups=['考試','家長參與'].includes(key)?[key]:[];state.categories=key==='放假與補課'?['開學/放假','夜間課程/夜自習']:[];state.place='all';state.query='';render()});
    bindMonthActions();

    document.querySelector('#academic-year-filter').onchange=e=>{state.academicYear=e.target.value;render()};
    document.querySelector('#term-filter').onchange=e=>{state.term=e.target.value;render()};
    const bindExpansion=()=>{const button=document.querySelector('#search-all-years');if(button)button.onclick=()=>{state.view='list';state.academicYear='all';state.term='all';state.includePast=true;render()};};
    bindExpansion();
    const year=document.querySelector('#year-filter');
    year.onchange=()=>{state.year=year.value;if(state.year==='all'){state.month='all';state.view='list';}render()};
    document.querySelector('#current-month').onclick=()=>{const now=new Date();state.year=String(now.getFullYear());state.month=String(now.getMonth()+1).padStart(2,'0');render()};
    const month=document.querySelector('#month-filter');
    month.onchange=()=>{state.month=month.value;if(state.month==='all')state.view='list';render()};
    const grade=document.querySelector('#grade-filter');
    const place=document.querySelector('#place-filter');
    const includePast=document.querySelector('#include-past');
    const groupChecks=[...document.querySelectorAll('[name="group-filter"]')];
    const categoryChecks=[...document.querySelectorAll('[name="category-filter"]')];
    grade.value=state.grade; place.value=state.place;
    const searchForm=document.createElement('form');
    searchForm.className='calendar-search';
    searchForm.setAttribute('role','search');
    searchForm.innerHTML='<label for="calendar-search-input">搜尋行事曆</label><div><input id="calendar-search-input" type="search" placeholder="例如：段考、畢旅、10/23" autocomplete="off"><button class="search-button" type="submit">搜尋</button><button class="clear-button" type="button">清除搜尋</button></div>';
    document.querySelector('.calendar-tools').before(searchForm);
    const searchInput=searchForm.querySelector('input');
    searchInput.value=state.query;
    // Keep the input node alive to preserve focus, selection and IME composition.
    const updateSearch=()=>{
      state.query=searchInput.value;
      const template=document.createElement('template');
      template.innerHTML=calendar();
      document.querySelector('.timeline').replaceWith(template.content.querySelector('.timeline'));
      document.querySelector('#month-view').replaceWith(template.content.querySelector('#month-view'));
      document.querySelector('#search-expansion').replaceWith(template.content.querySelector('#search-expansion'));
      bindExpansion();
      bindMonthActions();
      document.querySelector('.select-filters strong').textContent=template.content.querySelector('.select-filters strong').textContent;
    };
    let composing=false;
    searchInput.addEventListener('compositionstart',()=>{composing=true});
    searchInput.addEventListener('compositionend',()=>{composing=false;updateSearch()});
    searchInput.oninput=(event)=>{if(!composing&&!event.isComposing)updateSearch()};
    searchForm.onsubmit=(event)=>{event.preventDefault();if(!composing)updateSearch()};
    searchForm.querySelector('.clear-button').onclick=()=>{searchInput.value='';updateSearch();searchInput.focus()};
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
