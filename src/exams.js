import {mountScopeSearch} from './scope-search.js?v=20261020';
import {examFiles as juniorExamFiles} from './exam-data.js?v=20261019-text';
const labels={year:'學年度',grade:'年級',term:'時期',exam:'考試'};
const juniorOptions={year:[...new Set(juniorExamFiles.map(x=>x.year))].sort((a,b)=>b-a),grade:['7','8','9'],term:['上學期','下學期','暑期'],exam:['第一次段考','第二次段考','第三次段考','暑期學科競賽']};
const baseExamOptions=[...juniorOptions.exam];
juniorOptions.exam.push('其他測驗');
const juniorGradeName=g=>`國${'七八九'[Number(g)-7]}`;
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const examLink=event=>{
 const title=({'段考一':'第一次段考','段考二':'第二次段考','段考三':'第三次段考'})[event.title]||event.title;
 const matches=juniorExamFiles.filter(x=>x.date===event.start&&x.exam===title);
 return matches.length?`<a class="google-calendar-link" href="#/exams?year=${matches[0].year}&term=${encodeURIComponent(matches[0].term)}&exam=${encodeURIComponent(matches[0].examCategory||matches[0].exam)}">${matches[0].textOnly?'查看考程資料':'查看考程原圖'}</a>`:'';
};
export function mountExams(host,config={}){
 const examFiles=config.files||juniorExamFiles;
 const options=config.files?{...juniorOptions,year:[...new Set(examFiles.map(x=>x.year))].sort((a,b)=>b-a),grade:['10','11','12'],exam:baseExamOptions}:juniorOptions;
 const gradeName=config.files?g=>({10:'高一',11:'高二',12:'高三'}[g]):juniorGradeName;
 const name=x=>`${x.year}學年度・${x.term}・${x.exam}・${gradeName(x.grade)}${x.track?`（${x.track}）`:""}`;
 const route=config.route||'/exams';
 const params=new URLSearchParams(location.hash.split('?')[1]||'');
 const filters=Object.fromEntries(Object.keys(labels).map(key=>[key,params.has(key)?params.get(key).split(',').filter(v=>options[key].includes(v)):key==='year'?[options.year[0]]:[]]));
 let selected=[];
 host.innerHTML=`<section class="exam-library"><header class="page-header"><span class="eyebrow">EXAM ARCHIVE</span><h1>考程與範圍</h1><p>找到需要的考程，下載原圖、列印，或選兩份一起比較。</p></header><div class="archive-intro"><strong>${options.year.at(-1)}–${options.year[0]} 學年度 · 考程原圖收藏</strong><span>目前收錄 ${examFiles.length} 份考程｜歷年資料供參考，以當次最新公告為準。</span></div>${config.files?'':'<div id="scope-search-host"></div>'}<section class="archive-filters" aria-label="考程篩選"><p>每類皆可複選，未選代表全部。</p><div id="archive-fields"></div><div class="archive-actions"><button id="archive-reset">清除全部篩選</button><button id="archive-share">複製篩選連結</button></div></section><p id="archive-notice" role="status"></p><div class="archive-result-heading"><h2 id="archive-count" aria-live="polite"></h2><span>依學年度由新到舊排列</span></div><div class="archive-grid" id="archive-results"></div><aside class="compare-bar" aria-label="比較清單"><span id="compare-summary" aria-live="polite"></span><button id="compare-open" disabled>並排比較</button><button id="compare-clear">清空比較</button></aside><dialog class="exam-dialog" aria-labelledby="exam-dialog-title"><div class="dialog-heading"><h2 id="exam-dialog-title"></h2><button id="dialog-close" autofocus>關閉</button></div><div id="dialog-content"></div></dialog></section>`;
 const q=s=>host.querySelector(s);
 const notice=message=>{q('#archive-notice').textContent=message};
 const allowedExams=()=>options.exam.filter(x=>!filters.term.length||filters.term.some(t=>x==='其他測驗'||(t==='暑期'?x==='暑期學科競賽':x!=='暑期學科競賽')));
 const syncUrl=()=>{const p=new URLSearchParams(location.hash.split('?')[1]||'');Object.keys(labels).forEach(k=>p.set(k,filters[k].join(',')));history.replaceState(null,'',`#${route}?${p}`)};
 function fields(){q('#archive-fields').innerHTML=Object.entries(labels).map(([key,label])=>`<fieldset><legend>${label} <small>${filters[key].length?`已選 ${filters[key].length} 項`:'全部'}</small></legend><div class="archive-choices">${(key==='exam'?allowedExams():options[key]).map(value=>`<label><input type="checkbox" data-filter="${key}" value="${value}" ${filters[key].includes(value)?'checked':''}><span>${key==='grade'?gradeName(value):key==='year'?value+'學年度':value}</span></label>`).join('')}<button data-clear="${key}">清除${label}</button></div></fieldset>`).join('')}
 const actions=x=>`<div class="archive-actions"><button data-view="${x.id}">查看大圖</button><a href="${x.original}" download="${name(x)}.${x.original.split('.').pop()}">下載原圖</a><button data-print="${x.id}">列印</button></div>`;
 function results(){
  const files=examFiles.filter(x=>Object.keys(labels).every(k=>!filters[k].length||filters[k].includes(k==='exam'&&!config.files?(x.examCategory||x.exam):x[k])));
  q('#archive-count').textContent=`顯示 ${files.length} 份考程`;
  q('#archive-results').innerHTML=files.map(x=>x.textOnly?`<article class="archive-card archive-text-card" data-text-card="${escape(x.id)}"><div class="archive-card-heading"><span class="archive-year">${x.year}學年度 · ${x.term}</span><span class="grade-tag">${gradeName(x.grade)}</span></div><h3>${escape(x.exam)}</h3><p>考試日期：${escape(x.date)}<br>節次：${escape(x.period)}<br>時間：${escape(x.time)}<br>科目：${escape(x.subject)}<br>測驗範圍：${escape(x.scope)}</p><p class="source-note">非官方網站，純屬家長交流參考，一切資訊以學校最新公告為準</p><button type="button" data-details="${escape(x.id)}" aria-haspopup="dialog">查看詳細資料</button></article>`:`<article class="archive-card"><div class="archive-card-heading"><span class="archive-year">${x.year}學年度 · ${x.term}</span><span class="grade-tag">${gradeName(x.grade)}${x.track?`・${x.track}`:""}</span></div><h3>${x.exam}</h3><p>考試日期：${x.date}${x.end?`～${x.end}`:""}<br>原圖修訂：${x.revised||'未標示'}${x.note?`<br>${escape(x.note)}`:""}${!config.files&&x.examCategory?`<br>${escape(x.period)} ${escape(x.time)}<br>科目：${escape(x.subject)}<br>測驗範圍：${escape(x.scope)}`:""}</p><button class="archive-thumbnail" data-view="${x.id}" aria-label="查看 ${name(x)} 大圖"><img src="${x.thumbnail}" alt="${name(x)}考程與範圍" loading="lazy" width="480"></button>${actions(x)}<label class="compare-choice"><input type="checkbox" data-compare="${x.id}" ${selected.includes(x.id)?'checked':''}>加入比較</label></article>`).join('')||'<p class="empty-state">目前尚未收錄符合條件的考程。請調整篩選，或清除全部篩選查看現有資料。</p>';
  compareState();
 }
 function compareState(){
  q('#compare-summary').textContent=selected.length?`已選 ${selected.length}/2：${selected.map(id=>name(examFiles.find(x=>x.id===id))).join('；')}`:'勾選兩份考程，即可並排比較';
  q('#compare-open').disabled=selected.length!==2;
  host.querySelectorAll('[data-compare]').forEach(input=>{input.checked=selected.includes(input.dataset.compare);input.disabled=selected.length===2&&!input.checked});
 }
 let textTrigger=null;
 q('dialog').addEventListener('close',()=>{if(textTrigger?.isConnected)textTrigger.focus({preventScroll:true});textTrigger=null;});
 q('dialog').addEventListener('keydown',e=>{
  if(e.key!=='Tab'||!q('dialog').classList.contains('text-exam-dialog'))return;
  const controls=[...q('dialog').querySelectorAll('button:not(:disabled),a[href],input:not(:disabled),select:not(:disabled),textarea:not(:disabled),[tabindex="0"]')].filter(el=>el.getClientRects().length);
  const first=controls[0],last=controls.at(-1);
  if(first&&((e.shiftKey&&document.activeElement===first)||(!e.shiftKey&&document.activeElement===last))){e.preventDefault();(e.shiftKey?last:first).focus();}
 });
 function openTextDetails(id,trigger){
  const x=examFiles.find(f=>f.id===id);if(!x?.textOnly||q('dialog').open)return;
  textTrigger=trigger;
  q('dialog').classList.add('text-exam-dialog');
  q('#exam-dialog-title').textContent=x.exam;
  q('#dialog-content').className='text-exam-details';
  const rows=[['學年度／學期／年級',x.year+'學年度 · '+x.term+' · '+gradeName(x.grade)+(x.track?'・'+x.track:'')],['考試日期',x.date+(x.end?'～'+x.end:'')],['節次與時間',x.period+' '+x.time],['科目',x.subject]];
  q('#dialog-content').innerHTML='<dl>'+rows.map(([label,value])=>'<div><dt>'+escape(label)+'</dt><dd>'+escape(value)+'</dd></div>').join('')+'</dl><section class="text-exam-scope"><h3>測驗範圍</h3><p>'+escape(x.scope)+'</p></section><p class="source-note">非官方網站，純屬家長交流參考，一切資訊以學校最新公告為準</p>';
  q('dialog').showModal();q('#dialog-close').focus();
 }
 function openViewer(ids){
  ids=ids.filter(id=>{const x=examFiles.find(x=>x.id===id);return x&&!x.textOnly&&x.original});if(!ids.length)return;
  q('dialog').classList.remove('text-exam-dialog');
  q('#exam-dialog-title').textContent=ids.length===2?'考程並排比較':'考程原圖';
  q('#dialog-content').className=ids.length===2?'comparison-panes':'single-pane';
  q('#dialog-content').innerHTML=ids.map(id=>{const x=examFiles.find(x=>x.id===id);return `<section class="image-pane"><h3>${name(x)}</h3><label class="zoom-control">縮放 <input type="range" min="100" max="250" step="25" value="100" aria-label="${name(x)}縮放"><output>100%</output></label><div class="image-scroll" tabindex="0" aria-label="${name(x)}圖片捲動區"><img src="${x.original}" alt="${name(x)}考程與範圍"></div>${actions(x)}</section>`}).join('');
  if(!q('dialog').open)q('dialog').showModal();
 }
 async function printFile(id){
  const x=examFiles.find(x=>x.id===id);if(!x||x.textOnly||!x.original)return;
  const frame=document.createElement('iframe');frame.className='exam-print-frame';frame.title=`列印 ${name(x)}`;document.body.append(frame);
  const doc=frame.contentDocument;
  doc.open();doc.write(`<!doctype html><html lang="zh-Hant"><head><title>${escape(name(x))}</title><style>@page{size:A4 portrait;margin:10mm}html,body{margin:0}img{display:block;width:190mm;height:276mm;object-fit:contain}</style></head><body><img src="${new URL(x.original,location.href).href}" alt="${escape(name(x))}"></body></html>`);doc.close();
  try{await doc.querySelector('img').decode();frame.contentWindow.addEventListener('afterprint',()=>frame.remove(),{once:true});frame.contentWindow.focus();frame.contentWindow.print()}catch{frame.remove();notice('圖片載入失敗，請重新嘗試或下載原圖列印。')}
 }
 host.onchange=e=>{
  if(e.target.dataset.filter){const key=e.target.dataset.filter;filters[key]=[...host.querySelectorAll(`[data-filter="${key}"]:checked`)].map(x=>x.value);let message='';if(key==='term'){const old=filters.exam;filters.exam=old.filter(x=>allowedExams().includes(x));if(old.length!==filters.exam.length)message='已移除不適用目前時期的考試選擇。'}syncUrl();fields();results();notice(message)}
  if(e.target.dataset.compare){const id=e.target.dataset.compare;selected=e.target.checked?[...selected,id].slice(0,2):selected.filter(x=>x!==id);compareState()}
 };
 host.oninput=e=>{if(e.target.type==='range'){const pane=e.target.closest('.image-pane');pane.querySelector('img').style.width=e.target.value+'%';pane.querySelector('output').textContent=e.target.value+'%'}};
 host.onclick=async e=>{
  const detailsButton=e.target.closest('[data-details]');
  if(detailsButton){openTextDetails(detailsButton.dataset.details,detailsButton);return;}
  const card=e.target.closest('[data-text-card]');
  if(card&&!e.target.closest('button,a,input,select,textarea,label,summary,[role="button"],[role="link"],[contenteditable],[tabindex]')){
   if(!window.getSelection()?.toString())openTextDetails(card.dataset.textCard,card.querySelector('[data-details]'));
   return;
  }
  const button=e.target.closest('button');if(!button)return;
  if(button.dataset.clear){filters[button.dataset.clear]=[];syncUrl();fields();results();notice('')}
  if(button.id==='archive-reset'){Object.keys(filters).forEach(k=>filters[k]=[]);syncUrl();fields();results();notice('已清除全部篩選。')}
  if(button.id==='archive-share'){syncUrl();try{await navigator.clipboard.writeText(location.href);notice('已複製篩選連結，可以貼給朋友。')}catch{notice('請複製瀏覽器網址列，即可分享目前篩選。')}}
  if(button.dataset.view)openViewer([button.dataset.view]);
  if(button.dataset.print)await printFile(button.dataset.print);
  if(button.id==='compare-open'&&selected.length===2)openViewer(selected);
  if(button.id==='compare-clear'){selected=[];compareState()}
  if(button.id==='dialog-close')q('dialog').close();
 };
 fields();results();
 if(!config.files)mountScopeSearch(q('#scope-search-host'),examFiles);
}
