import {holidayExamReminder} from './holiday-exams.js?v=20261007';
import { seniorOverview, seniorOverviewRange } from './senior-overview.js?v=20261007-summer';
import { seniorEvents, seniorSources, seniorUpdatedAt, gsatExam, gsatMilestones, gsatSource, admissionEvents, seniorExternalNotices, audienceLabel } from './senior-data.js?v=20261010-g12-corrected';

import { mountExams } from './exams.js?v=20261007-unit';
import { seniorExamFiles } from './senior-exam-data.js?v=20261010-g12-corrected';
export const seniorRoutes=[['/senior','高中首頁','⌂'],['/senior/calendar','行事曆','📅'],['/senior/exams','考程與範圍','▤'],['/senior/gsat','升學重要日程','🎓']];
const grades={10:'高一',11:'高二',12:'高三'};
const categories=['校外培育／競賽','放假','升學','考試','田教','家長參與','健康','行政','活動'];
const filter={grade:'all',category:'all',query:'',period:'semester',past:false,view:'overview',month:'2026-10'};
const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const utc=date=>Date.parse(date+'T00:00:00Z');
const today=()=>{const parts=new Intl.DateTimeFormat('en',{timeZone:'Asia/Taipei',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());return ['year','month','day'].map(k=>parts.find(p=>p.type===k).value).join('-');};
const shift=(date,n)=>new Date(utc(date)+n*86400000).toISOString().slice(0,10);
const isRange=e=>Boolean(e.timing);
const ended=e=>today()>(e.end||e.start);
const dates=e=>e.start.replaceAll('-','/')+(e.end&&e.end!==e.start?'～'+e.end.replaceAll('-','/'):'');
const status=e=>isRange(e)?(e.timing==='week'?'本週安排・實際日期未定':'安排區間・實際日期依公告'):today()> (e.end||e.start)?'已結束':today()>=e.start?'進行中':`還有 ${Math.round((utc(e.start)-utc(today()))/86400000)} 天`;
const eligible=e=>filter.grade==='all'||e.grades.includes(Number(filter.grade));
const sorted=items=>items.slice().sort((a,b)=>a.start.localeCompare(b.start)||a.id.localeCompare(b.id));
const sourceText=e=>{const source=seniorSources[e.source];return source?`${source.label}・資料日期 ${(source.revised||source.checkedAt).replaceAll('-','/')}`:gsatSource.label;};
const notice=()=>`<p class="senior-coverage" role="note">目前收錄 ${seniorEvents.filter(e=>!['升學','校外培育／競賽'].includes(e.category)).length} 筆校內行程、${seniorEvents.filter(e=>e.category==='校外培育／競賽').length} 筆校外培育／競賽與 ${admissionEvents.length} 筆官方升學提醒。待確認對象及週區間已另行標示，其他活動仍在整理。空白日期不代表放假；請以最新公告為準。</p>`;
const gradeSelect=()=>`<label class="senior-grade">適用年級<select id="senior-grade"><option value="all" ${filter.grade==='all'?'selected':''}>全部高中</option>${Object.entries(grades).map(([g,l])=>`<option value="${g}" ${filter.grade===g?'selected':''}>${l}</option>`).join('')}</select></label>`;
const seniorExamLink=e=>{const files=seniorExamFiles.filter(x=>x.date===e.start||(e.id==='s-advance12-writing'&&x.id==='115-first-exam1-g12')||(['s-intl-exam1','s-advance10-science'].includes(e.id)&&x.id==='115-first-exam1-g10'));return files.map(x=>`<a class="google-calendar-link" href="#/senior/exams?year=${x.year}&grade=${x.grade}&term=${encodeURIComponent(x.term)}&exam=${encodeURIComponent(x.exam)}">查看${grades[x.grade]}考程與範圍</a>`).join('');};
const card=e=>`<article class="senior-event${ended(e)?' senior-ended':''}" id="${esc(e.id)}"><time datetime="${e.start}">${dates(e)}</time><div><div class="senior-tags"><span>${esc(e.category)}</span><span class="${e.audiencePending?'senior-tentative':''}">${esc(audienceLabel(e))}</span>${isRange(e)?`<span>${e.timing==='week'?'週區間・實際日期未定':'區間安排・實際日期依公告'}</span>`:''}${e.tentative?'<span class="senior-tentative">暫定</span>':''}${ended(e)?'<span>已結束</span>':''}</div><h2>${esc(e.title)}</h2>${e.note?`<p>${esc(e.note)}</p>`:''}${holidayExamReminder(e,[...seniorEvents.filter(x=>/^s-(exam[123]|mock[1234]|final12)$/.test(x.id)),gsatExam],[10,11,12])}${seniorExamLink(e)}<details><summary>來源與加入日曆</summary><p>${esc(sourceText(e))}${seniorSources[e.source]?.url?`・<a href="${esc(seniorSources[e.source].url)}" target="_blank" rel="noopener noreferrer">官方公告 ↗</a>`:''}</p>${isRange(e)?'<p>實際日期未定，暫不提供加入 Google 日曆。</p>':`<a class="google-calendar-link" target="_blank" rel="noopener noreferrer" href="${googleLink(e)}">＋ 加入 Google 日曆</a>`}</details></div></article>`;
const googleLink=e=>'https://calendar.google.com/calendar/render?'+new URLSearchParams({action:'TEMPLATE',text:e.title,dates:e.timeStart?e.start.replaceAll('-','')+'T'+e.timeStart.replace(':','')+'00/'+e.start.replaceAll('-','')+'T'+e.timeEnd.replace(':','')+'00':e.start.replaceAll('-','')+'/'+shift(e.end||e.start,1).replaceAll('-',''),ctz:'Asia/Taipei',details:[audienceLabel(e),e.note||'',sourceText(e),'非官方整理，請以最新公告為準。'].join('\n')});
const empty=text=>`<p class="senior-empty" role="status">${text}</p>`;
function gsatSummary(){
 const content=`<div class="senior-gsat-summary"><div><span class="eyebrow">高三升學</span><h2>${gsatExam.title}</h2><p>${dates(gsatExam)}</p><a class="source-link" target="_blank" rel="noopener noreferrer" href="${gsatSource.url}">大考中心官方日程 ↗</a></div><strong>${status(gsatExam)}</strong></div><a class="primary" href="#/senior/gsat">🎓 查看升學重要日程</a>`;
 return filter.grade==='10'||filter.grade==='11'?`<details class="senior-gsat secondary-gsat"><summary>🎓 升學重要日程（高三）</summary>${content}</details>`:`<section class="senior-gsat" aria-label="學測倒數">${content}</section>`;
}
function home(){
 const upcoming=sorted(seniorEvents.filter(e=>eligible(e)&&e.category==='考試'&&!isRange(e)&&(e.end||e.start)>=today()&&e.start<=shift(today(),30)));
 const weekly=sorted(seniorEvents.filter(e=>eligible(e)&&(e.category!=='考試'||isRange(e))&&e.category!=='升學'&&e.start<=shift(today(),6)&&(e.end||e.start)>=today()));
 return `<section class="senior-home-heading"><span class="eyebrow">高中資訊</span><h1>高中重要日程，<br>按年級清楚整理。</h1><p>選擇你關心的年級，查看近期考試、校內活動與升學資訊。</p>${gradeSelect()}<div class="hero-actions"><a class="primary" href="${calendarHref()}">📅 查看高中行事曆</a><a class="secondary" href="#/senior/gsat">🎓 升學重要日程</a></div></section>${notice()}${gsatSummary()}<div class="senior-home-grid"><section><h2>近期考試</h2><p class="source-note">未來 30 天內開始或仍在進行的校內考試。</p>${upcoming.length?upcoming.map(e=>reminder(e)).join(''):empty('目前已收錄的行程中，未來一個月沒有符合年級的校內考試。')}</section><section><h2>一週內行程</h2><p class="source-note">今天起七天，含進行中的活動。</p>${weekly.length?weekly.map(e=>reminder(e)).join(''):empty('這七天內尚未收錄符合年級的非考試活動。')}</section></div>`;
}
const reminder=e=>`<a class="senior-reminder" href="${calendarHref(e.id)}"><strong>${status(e)}</strong><h3>${esc(e.title)}${e.tentative?' <small>暫定</small>':''}</h3><p>${dates(e)}・${audienceLabel(e)}</p></a>`;
function calendarHref(id=''){const p=new URLSearchParams();if(filter.grade!=='all')p.set('grade',filter.grade);if(id){p.set('view','list');p.set('event',id);p.set('period','all');p.set('past','1');}return '#/senior/calendar'+(p.size?'?'+p:'');}
function matches(){
 const q=filter.query.trim().toLocaleLowerCase('zh-Hant');
 const overlaps=(e,start,end)=>e.start<=end&&(e.end||e.start)>=start;
 const inRange=e=>filter.view==='overview'?overlaps(e,seniorOverviewRange.start,seniorOverviewRange.end):filter.view==='month'?overlaps(e,filter.month+'-01',monthEnd()):(filter.past||(e.end||e.start)>=today())&&(filter.period==='all'||(filter.period==='summer'?overlaps(e,'2026-07-01','2026-08-30'):overlaps(e,'2026-08-31','2027-02-10')));
 return sorted(seniorEvents.filter(e=>eligible(e)&&inRange(e)&&(filter.category==='all'||e.category===filter.category)&&(!q||[e.title,e.note||'',e.start,e.end||'',e.start.replaceAll('-','/'),...e.grades.map(g=>grades[g]),...(e.searchAliases||[])].join(' ').toLocaleLowerCase('zh-Hant').includes(q))));
}
const monthEnd=()=>{const [y,m]=filter.month.split('-').map(Number);return new Date(Date.UTC(y,m,0)).toISOString().slice(0,10);};
function monthGrid(items){
 const first=filter.month+'-01',offset=new Date(utc(first)).getUTCDay(),count=Number(monthEnd().slice(8));
 return `<div class="senior-month-nav"><button data-senior-step="-1">‹ 上個月</button><h2>${filter.month.replace('-',' 年 ')} 月</h2><button data-senior-step="1">下個月 ›</button></div><p class="source-note">整月包含已結束行程；點選行程查看細節。</p><div class="senior-month-grid">${[...'日一二三四五六'].map(d=>`<strong class="senior-weekday">${d}</strong>`).join('')}${Array.from({length:offset},()=>'<div class="senior-month-blank"></div>').join('')}${Array.from({length:count},(_,i)=>{const date=filter.month+'-'+String(i+1).padStart(2,'0'),dayItems=items.filter(e=>!isRange(e)&&e.start<=date&&(e.end||e.start)>=date);return `<div class="senior-day ${date===today()?'is-today':''}"><time datetime="${date}">${i+1}</time>${dayItems.map(e=>`<button class="${ended(e)?'senior-ended':''}" data-senior-event="${e.id}">${esc(e.title)}${e.tentative?'（暫定）':''}${ended(e)?'（已結束）':''}</button>`).join('')}</div>`;}).join('')}</div>${items.some(isRange)?'<section class="senior-range-agenda"><h2>本月週安排／區間提醒</h2><p class="source-note">以下不是每天各有一場考試，實際日期請依公告。</p>'+items.filter(isRange).map(card).join('')+'</section>':''}`;
}
const referenceNotes=()=>{const q=filter.query.trim().toLocaleLowerCase('zh-Hant');return (filter.category==='all'||filter.category==='校外培育／競賽')?seniorExternalNotices.filter(n=>!q||(n.title+n.note).toLocaleLowerCase('zh-Hant').includes(q)).map(n=>`<aside class="senior-reference-note" role="note"><span>校外培育／競賽・備查說明</span><h3>${esc(n.title)}</h3><p>${esc(n.note)}</p><p>公告 ${esc(n.published)}・核對 ${esc(n.checkedAt)}</p><a href="${esc(n.url)}" target="_blank" rel="noopener noreferrer">查看官方停辦公告 ↗</a></aside>`).join(''):'';};
const results=()=>{const items=matches();const references=referenceNotes();return `<p class="senior-result-count" aria-live="polite">目前只看：${filter.grade==='all'?'全部高中':grades[filter.grade]}・${items.length} 筆行程</p>${filter.view==='overview'?seniorOverview(items,{esc,shift,today,utc,grades,audienceLabel}):filter.view==='month'?monthGrid(items):items.map(card).join('')||(references?'':empty('沒有符合條件的行程，請調整年級、分類或日期範圍。'))}${references}`;};
function calendar(){return `<header class="page-header"><span class="eyebrow">115 學年度・高中</span><h1>高中活動行事曆</h1><p>只顯示高中行程。可依高一、高二、高三查詢；學測與其他升學資訊另放在「升學重要日程」。</p></header>${notice()}<form class="senior-tools" id="senior-tools" role="search"><div class="senior-filter-row">${gradeSelect()}<label>分類<select id="senior-category"><option value="all">全部分類</option>${categories.map(c=>`<option ${filter.category===c?'selected':''}>${c}</option>`).join('')}</select></label><label ${filter.view!=='list'?'hidden':''}>日期範圍<select id="senior-period"><option value="semester" ${filter.period==='semester'?'selected':''}>115 上學期</option><option value="summer" ${filter.period==='summer'?'selected':''}>115 暑期</option><option value="all" ${filter.period==='all'?'selected':''}>全部已收錄日期</option></select></label><label ${filter.view!=='month'?'hidden':''}>年月<input type="month" id="senior-month" value="${filter.month}" min="2026-01" max="2030-12"></label></div><div class="senior-filter-row"><label class="senior-search">搜尋目前學段<input type="search" id="senior-search" value="${esc(filter.query)}" placeholder="例如：模考、庚班、田教" autocomplete="off"></label><button type="button" id="senior-clear">清除搜尋</button><label class="senior-past"><input type="checkbox" id="senior-past" ${filter.view!=='list'?'checked disabled':filter.past?'checked':''}>包含已過期</label></div><div class="calendar-view-toggle" role="group" aria-label="顯示方式"><button type="button" data-senior-view="overview" aria-pressed="${filter.view==='overview'}">學期總覽</button><button type="button" data-senior-view="list" aria-pressed="${filter.view==='list'}">篩選查詢</button><button type="button" data-senior-view="month" aria-pressed="${filter.view==='month'}">月曆</button></div><p class="source-note">115 上學期分類範圍：2026/8/31～2027/2/10；範圍不代表放假安排。週安排與區間不代表每天考試；待確認對象已另行標示。</p></form><div id="senior-results">${results()}</div>`;}
const admissionSections=[{type:"學測",id:"gsat"},{type:"英聽",id:"listening"},{type:"術科",id:"arts"}];
function gsat(){return `<header class="page-header" id="senior-admission-top"><span class="eyebrow">高三升學</span><h1>升學重要日程</h1><p>學測、英聽與術科分開整理；以下報名區間為官方日期，校內集體報名可能較早。</p></header><div class="semester-jumps senior-admission-jumps" role="navigation" aria-label="升學日程分類跳轉"><button type="button" data-admission-jump="senior-admission-top">↑ 回到頁首</button>${admissionSections.map(({type,id})=>`<button type="button" data-admission-jump="senior-admission-${id}">${type}</button>`).join('')}</div><section class="senior-gsat"><div class="senior-gsat-summary"><div><h2>${gsatExam.title}</h2><p>${dates(gsatExam)}</p></div><strong>${status(gsatExam)}</strong></div></section>${admissionSections.map(({type,id})=>`<section class="senior-admission-group" id="senior-admission-${id}" aria-labelledby="senior-admission-heading-${id}"><h2 id="senior-admission-heading-${id}" tabindex="-1">${type}</h2>${sorted(admissionEvents.filter(e=>e.examType===type)).map(card).join('')}</section>`).join('')}<p class="senior-coverage">校內報名期限、成績公布及後續招生管道仍在整理；請自行留意官方與學校公告。術科僅適用需報考者。</p><p class="source-note">官方資料核對日期：${gsatSource.checkedAt}。英聽模擬考屬校內安排，請至高中行事曆查看。</p>`;}
function readFilters(){
 const params=new URLSearchParams(location.hash.split('?')[1]||'');
 if(params.has('grade'))filter.grade=['10','11','12'].includes(params.get('grade'))?params.get('grade'):'all';
 if(location.hash.split('?')[0]==='#/senior/calendar'){
  filter.category=categories.includes(params.get('category'))?params.get('category'):'all';filter.query=params.get('q')||'';
  filter.period=['summer','all'].includes(params.get('period'))?params.get('period'):'semester';filter.past=params.get('past')==='1';filter.view=['month','list'].includes(params.get('view'))?params.get('view'):'overview';
  const month=params.get('month');filter.month=/^20[2-3]\d-(0[1-9]|1[0-2])$/.test(month||'')?month:today().slice(0,7);
 }
}
function saveFilters(){const params=new URLSearchParams();if(filter.grade!=='all')params.set('grade',filter.grade);if(filter.category!=='all')params.set('category',filter.category);if(filter.query)params.set('q',filter.query);if(filter.period!=='semester')params.set('period',filter.period);if(filter.past)params.set('past','1');if(filter.view!=='overview')params.set('view',filter.view);if(filter.view==='month')params.set('month',filter.month);history.replaceState(null,'',location.pathname+location.search+'#/senior/calendar'+(params.size?'?'+params:''));}
export function seniorPage(path){readFilters();return path==='/senior/exams'?'<div id="senior-exam-root"></div>':path==='/senior/calendar'?calendar():path==='/senior/gsat'?gsat():home();}
export function mountSenior(path){
 const main=document.querySelector('main');
 if(path==='/senior/exams'){mountExams(main.querySelector('#senior-exam-root'),{files:seniorExamFiles,route:'/senior/exams'});return;}
 const refresh=()=>{if(path==='/senior/calendar')saveFilters();main.innerHTML=path==='/senior/calendar'?calendar():home();mountSenior(path);};
 main.querySelector('#senior-grade')?.addEventListener('change',e=>{filter.grade=e.target.value;refresh();});
 if(path==='/senior/gsat'){
  main.querySelectorAll('[data-admission-jump]').forEach(button=>button.onclick=()=>{
   const target=document.getElementById(button.dataset.admissionJump);if(!target)return;
   main.querySelectorAll('[data-admission-jump]').forEach(b=>b.removeAttribute('aria-current'));
   button.setAttribute('aria-current','location');
   target.querySelector('h1,h2')?.focus({preventScroll:true});
   target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
  });
  return;
 }
 if(path!=='/senior/calendar')return;
 main.querySelector('form').onsubmit=e=>e.preventDefault();
 for(const [id,key] of [['senior-category','category'],['senior-period','period'],['senior-month','month']])main.querySelector('#'+id).onchange=e=>{if(key==='month'&&!/^20[2-3]\d-(0[1-9]|1[0-2])$/.test(e.target.value)){e.target.value=filter.month;return;}filter[key]=e.target.value;refresh();};
 main.querySelector('#senior-past').onchange=e=>{filter.past=e.target.checked;refresh();};
 main.querySelectorAll('[data-senior-view]').forEach(b=>b.onclick=()=>{filter.view=b.dataset.seniorView;refresh();});
 const updateSearch=()=>{filter.query=main.querySelector('#senior-search').value;saveFilters();main.querySelector('#senior-results').innerHTML=results();};
 let composing=false;const input=main.querySelector('#senior-search');input.oncompositionstart=()=>{composing=true;};input.oncompositionend=()=>{composing=false;updateSearch();};input.oninput=e=>{if(!composing&&!e.isComposing)updateSearch();};main.querySelector('#senior-clear').onclick=()=>{input.value='';updateSearch();input.focus();};
 main.querySelector('#senior-results').onclick=e=>{
  const jump=e.target.closest('[data-senior-jump]');if(jump){document.getElementById(jump.dataset.seniorJump)?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});return;}
  const step=e.target.closest('[data-senior-step]');if(step){const [y,m]=filter.month.split('-').map(Number);filter.month=new Date(Date.UTC(y,m-1+Number(step.dataset.seniorStep),1)).toISOString().slice(0,7);refresh();return;}
  const button=e.target.closest('[data-senior-event]');if(!button)return;const event=seniorEvents.find(x=>x.id===button.dataset.seniorEvent);if(!event)return;
  const dialog=document.createElement('dialog');dialog.className='month-dialog senior-dialog';dialog.setAttribute('aria-label','高中行程細節');dialog.innerHTML='<button class="month-close" autofocus>關閉</button>'+card(event);document.body.append(dialog);dialog.querySelector('button').onclick=()=>dialog.close();dialog.addEventListener('close',()=>{dialog.remove();button.focus();});dialog.showModal();
 };
 const focus=new URLSearchParams(location.hash.split('?')[1]||'').get('event');if(focus){const target=main.querySelector('#'+CSS.escape(focus));if(target){target.classList.add('senior-focused');requestAnimationFrame(()=>target.scrollIntoView({block:'center'}));}}
}
export { seniorUpdatedAt };
