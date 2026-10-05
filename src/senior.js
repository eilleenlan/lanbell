import { seniorOverview, seniorOverviewRange } from './senior-overview.js?v=20261006';
import { seniorEvents, seniorSources, seniorUpdatedAt, gsatExam, gsatMilestones, gsatSource } from './senior-data.js?v=20261006-exam12';

export const seniorRoutes=[['/senior','高中首頁','⌂'],['/senior/calendar','行事曆','📅'],['/senior/gsat','學測重要日程','🎓']];
const grades={10:'高一',11:'高二',12:'高三'};
const categories=['考試','田教','家長參與','健康','行政','活動'];
const filter={grade:'all',category:'all',query:'',period:'semester',past:false,view:'overview',month:'2026-10'};
const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const utc=date=>Date.parse(date+'T00:00:00Z');
const today=()=>{const parts=new Intl.DateTimeFormat('en',{timeZone:'Asia/Taipei',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());return ['year','month','day'].map(k=>parts.find(p=>p.type===k).value).join('-');};
const shift=(date,n)=>new Date(utc(date)+n*86400000).toISOString().slice(0,10);
const dates=e=>e.start.replaceAll('-','/')+(e.end&&e.end!==e.start?'～'+e.end.replaceAll('-','/'):'');
const status=e=>today()> (e.end||e.start)?'已結束':today()>=e.start?'進行中':`還有 ${Math.round((utc(e.start)-utc(today()))/86400000)} 天`;
const eligible=e=>filter.grade==='all'||e.grades.includes(Number(filter.grade));
const sorted=items=>items.slice().sort((a,b)=>a.start.localeCompare(b.start)||a.id.localeCompare(b.id));
const sourceText=e=>{const source=seniorSources[e.source];return source?`${source.label}・修訂 ${source.revised.replaceAll('-','/')}`:gsatSource.label;};
const notice=()=>`<p class="senior-coverage" role="note">目前收錄 ${seniorEvents.length} 筆日期與適用年級明確的校內行程，其他活動仍在確認。空白日期不代表放假；請以最新公告為準。</p>`;
const gradeSelect=()=>`<label class="senior-grade">適用年級<select id="senior-grade"><option value="all" ${filter.grade==='all'?'selected':''}>全部高中</option>${Object.entries(grades).map(([g,l])=>`<option value="${g}" ${filter.grade===g?'selected':''}>${l}</option>`).join('')}</select></label>`;
const card=e=>`<article class="senior-event" id="${esc(e.id)}"><time datetime="${e.start}">${dates(e)}</time><div><div class="senior-tags"><span>${esc(e.category)}</span><span>${e.grades.map(g=>grades[g]).join('、')}</span>${e.tentative?'<span class="senior-tentative">暫定</span>':''}${today()>(e.end||e.start)?'<span>已結束</span>':''}</div><h2>${esc(e.title)}</h2>${e.note?`<p>${esc(e.note)}</p>`:''}<details><summary>來源與加入日曆</summary><p>${esc(sourceText(e))}</p><a class="google-calendar-link" target="_blank" rel="noopener noreferrer" href="${googleLink(e)}">＋ 加入 Google 日曆</a></details></div></article>`;
const googleLink=e=>'https://calendar.google.com/calendar/render?'+new URLSearchParams({action:'TEMPLATE',text:e.title,dates:e.start.replaceAll('-','')+'/'+shift(e.end||e.start,1).replaceAll('-',''),details:[e.grades.map(g=>grades[g]).join('、'),e.note||'',sourceText(e),'非官方整理，請以最新公告為準。'].join('\n')});
const empty=text=>`<p class="senior-empty" role="status">${text}</p>`;
function gsatSummary(){
 const content=`<div class="senior-gsat-summary"><div><span class="eyebrow">高三升學</span><h2>${gsatExam.title}</h2><p>${dates(gsatExam)}</p><a class="source-link" target="_blank" rel="noopener noreferrer" href="${gsatSource.url}">大考中心官方日程 ↗</a></div><strong>${status(gsatExam)}</strong></div><a class="primary" href="#/senior/gsat">🎓 查看學測重要日程</a>`;
 return filter.grade==='10'||filter.grade==='11'?`<details class="senior-gsat secondary-gsat"><summary>🎓 學測重要日程（高三）</summary>${content}</details>`:`<section class="senior-gsat" aria-label="學測倒數">${content}</section>`;
}
function home(){
 const upcoming=sorted(seniorEvents.filter(e=>eligible(e)&&e.category==='考試'&&(e.end||e.start)>=today()&&e.start<=shift(today(),30)));
 const weekly=sorted(seniorEvents.filter(e=>eligible(e)&&e.category!=='考試'&&e.start<=shift(today(),6)&&(e.end||e.start)>=today()));
 return `<section class="senior-home-heading"><span class="eyebrow">高中資訊</span><h1>高中重要日程，<br>按年級清楚整理。</h1><p>選擇你關心的年級，查看近期考試、校內活動與升學資訊。</p>${gradeSelect()}<div class="hero-actions"><a class="primary" href="${calendarHref()}">📅 查看高中行事曆</a><a class="secondary" href="#/senior/gsat">🎓 學測重要日程</a></div></section>${notice()}${gsatSummary()}<div class="senior-home-grid"><section><h2>近期考試</h2><p class="source-note">未來 30 天內開始或仍在進行的校內考試。</p>${upcoming.length?upcoming.map(e=>reminder(e)).join(''):empty('目前已收錄的行程中，未來一個月沒有符合年級的校內考試。')}</section><section><h2>一週內行程</h2><p class="source-note">今天起七天，含進行中的活動。</p>${weekly.length?weekly.map(e=>reminder(e)).join(''):empty('這七天內尚未收錄符合年級的非考試活動。')}</section></div>`;
}
const reminder=e=>`<a class="senior-reminder" href="${calendarHref(e.id)}"><strong>${status(e)}</strong><h3>${esc(e.title)}${e.tentative?' <small>暫定</small>':''}</h3><p>${dates(e)}・${e.grades.map(g=>grades[g]).join('、')}</p></a>`;
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
 return `<div class="senior-month-nav"><button data-senior-step="-1">‹ 上個月</button><h2>${filter.month.replace('-',' 年 ')} 月</h2><button data-senior-step="1">下個月 ›</button></div><p class="source-note">整月包含已結束行程；點選行程查看細節。</p><div class="senior-month-grid">${[...'日一二三四五六'].map(d=>`<strong class="senior-weekday">${d}</strong>`).join('')}${Array.from({length:offset},()=>'<div class="senior-month-blank"></div>').join('')}${Array.from({length:count},(_,i)=>{const date=filter.month+'-'+String(i+1).padStart(2,'0'),dayItems=items.filter(e=>e.start<=date&&(e.end||e.start)>=date);return `<div class="senior-day ${date===today()?'is-today':''}"><time datetime="${date}">${i+1}</time>${dayItems.map(e=>`<button data-senior-event="${e.id}">${esc(e.title)}${e.tentative?'（暫定）':''}</button>`).join('')}</div>`;}).join('')}</div>`;
}
const results=()=>{const items=matches();return `<p class="senior-result-count" aria-live="polite">目前只看：${filter.grade==='all'?'全部高中':grades[filter.grade]}・${items.length} 筆行程</p>${filter.view==='overview'?seniorOverview(items,{esc,shift,today,utc,grades}):filter.view==='month'?monthGrid(items):items.map(card).join('')||empty('沒有符合條件的行程，請調整年級、分類或日期範圍。')}`;};
function calendar(){return `<header class="page-header"><span class="eyebrow">115 學年度・高中</span><h1>高中活動行事曆</h1><p>只顯示高中行程。可依高一、高二、高三查詢；學測與其他升學資訊另放在「學測重要日程」。</p></header>${notice()}<form class="senior-tools" role="search"><div class="senior-filter-row">${gradeSelect()}<label>分類<select id="senior-category"><option value="all">全部分類</option>${categories.map(c=>`<option ${filter.category===c?'selected':''}>${c}</option>`).join('')}</select></label><label ${filter.view!=='list'?'hidden':''}>日期範圍<select id="senior-period"><option value="semester" ${filter.period==='semester'?'selected':''}>115 上學期</option><option value="summer" ${filter.period==='summer'?'selected':''}>115 暑期</option><option value="all" ${filter.period==='all'?'selected':''}>全部已收錄日期</option></select></label><label ${filter.view!=='month'?'hidden':''}>年月<input type="month" id="senior-month" value="${filter.month}" min="2026-01" max="2030-12"></label></div><div class="senior-filter-row"><label class="senior-search">搜尋目前學段<input type="search" id="senior-search" value="${esc(filter.query)}" placeholder="例如：模考、庚班、田教" autocomplete="off"></label><button type="button" id="senior-clear">清除搜尋</button><label class="senior-past"><input type="checkbox" id="senior-past" ${filter.view!=='list'?'checked disabled':filter.past?'checked':''}>包含已過期</label></div><div class="calendar-view-toggle" role="group" aria-label="顯示方式"><button type="button" data-senior-view="overview" aria-pressed="${filter.view==='overview'}">學期總覽</button><button type="button" data-senior-view="list" aria-pressed="${filter.view==='list'}">篩選查詢</button><button type="button" data-senior-view="month" aria-pressed="${filter.view==='month'}">月曆</button></div><p class="source-note">115 上學期分類範圍：2026/8/31～2027/2/10；範圍不代表放假安排。日期未確定或適用年級待確認的活動暫未公開。</p></form><div id="senior-results">${results()}</div>`;}
function gsat(){return `<header class="page-header"><span class="eyebrow">高三升學</span><h1>學測重要日程</h1><p>與校內行事曆分開整理，官方考試日程與校內辦理期限分別標示。</p></header><section class="senior-gsat"><div class="senior-gsat-summary"><div><h2>${gsatExam.title}</h2><p>${dates(gsatExam)}</p></div><strong>${status(gsatExam)}</strong></div></section><p class="senior-coverage">目前已核對學測考試日期，其他升學日程陸續整理中。未填日期的項目不會計入倒數；校內集體報名請以學校通知為準。</p><div class="senior-milestones">${gsatMilestones.map(m=>`<article><span class="senior-milestone-status">${m.status}</span><h2>${esc(m.title)}</h2>${m.start?`<time>${dates(m)}</time>`:'<span class="senior-pending">日期待核對</span>'}<p>${esc(m.note)}</p>${m.start?`<a href="${gsatSource.url}" target="_blank" rel="noopener noreferrer">查看官方日程 ↗</a>`:''}</article>`).join('')}</div><section class="senior-related"><h2>其他相關考試與升學管道</h2><p>英聽、術科、繁星、申請入學及分發資訊將分別整理，不與學測本身混為同一日程。</p><a class="secondary" target="_blank" rel="noopener noreferrer" href="https://www.ceec.edu.tw/">前往大考中心 ↗</a></section><p class="source-note">官方考試日期來源：<a href="${gsatSource.url}" target="_blank" rel="noopener noreferrer">${gsatSource.label}</a>。核對日期：${gsatSource.checkedAt}。</p>`;}
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
export function seniorPage(path){readFilters();return path==='/senior/calendar'?calendar():path==='/senior/gsat'?gsat():home();}
export function mountSenior(path){
 const main=document.querySelector('main');
 const refresh=()=>{if(path==='/senior/calendar')saveFilters();main.innerHTML=path==='/senior/calendar'?calendar():home();mountSenior(path);};
 main.querySelector('#senior-grade')?.addEventListener('change',e=>{filter.grade=e.target.value;refresh();});
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
