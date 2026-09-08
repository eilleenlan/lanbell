import {examFiles} from './exam-data.js?v=20260909-second3';
const labels={year:'學年度',grade:'年級',term:'時期',exam:'考試'};
const options={year:[...new Set(examFiles.map(x=>x.year))].sort((a,b)=>b-a),grade:['7','8','9'],term:['上學期','下學期','暑期'],exam:['第一次段考','第二次段考','第三次段考','暑期學科競賽']};
const gradeName=g=>`國${'七八九'[Number(g)-7]}`;
const name=x=>`${x.year}學年度・${x.term}・${x.exam}・${gradeName(x.grade)}${x.track?`（${x.track}）`:""}`;
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const examLink=event=>{
 const matches=examFiles.filter(x=>x.date===event.start&&x.exam===event.title);
 return matches.length?`<a class="google-calendar-link" href="#/exams?year=${matches[0].year}&term=${encodeURIComponent(matches[0].term)}&exam=${encodeURIComponent(matches[0].exam)}">查看考程原圖</a>`:'';
};
export function mountExams(host){
 const params=new URLSearchParams(location.hash.split('?')[1]||'');
 const filters=Object.fromEntries(Object.keys(labels).map(key=>[key,params.has(key)?params.get(key).split(',').filter(v=>options[key].includes(v)):key==='year'?[options.year[0]]:[]]));
 let selected=[];
 host.innerHTML=`<section class="exam-library"><header class="page-header"><span class="eyebrow">EXAM ARCHIVE</span><h1>考程與範圍</h1><p>找到需要的考程，下載原圖、列印，或選兩份一起比較。</p></header><div class="archive-intro"><strong>${options.year.at(-1)}–${options.year[0]} 學年度 · 考程原圖收藏</strong><span>目前收錄 ${examFiles.length} 份考程｜歷年資料供參考，以當次最新公告為準。</span></div><section class="archive-filters" aria-label="考程篩選"><p>每類皆可複選，未選代表全部。</p><div id="archive-fields"></div><div class="archive-actions"><button id="archive-reset">清除全部篩選</button><button id="archive-share">複製篩選連結</button></div></section><p id="archive-notice" role="status"></p><div class="archive-result-heading"><h2 id="archive-count" aria-live="polite"></h2><span>依學年度由新到舊排列</span></div><div class="archive-grid" id="archive-results"></div><aside class="compare-bar" aria-label="比較清單"><span id="compare-summary" aria-live="polite"></span><button id="compare-open" disabled>並排比較</button><button id="compare-clear">清空比較</button></aside><dialog class="exam-dialog" aria-labelledby="exam-dialog-title"><div class="dialog-heading"><h2 id="exam-dialog-title"></h2><button id="dialog-close" autofocus>關閉</button></div><div id="dialog-content"></div></dialog></section>`;
 const q=s=>host.querySelector(s);
 const notice=message=>{q('#archive-notice').textContent=message};
 const allowedExams=()=>options.exam.filter(x=>!filters.term.length||filters.term.some(t=>t==='暑期'?x==='暑期學科競賽':x!=='暑期學科競賽'));
 const syncUrl=()=>{const p=new URLSearchParams();Object.keys(labels).forEach(k=>p.set(k,filters[k].join(',')));history.replaceState(null,'',`#/exams?${p}`)};
 function fields(){q('#archive-fields').innerHTML=Object.entries(labels).map(([key,label])=>`<fieldset><legend>${label} <small>${filters[key].length?`已選 ${filters[key].length} 項`:'全部'}</small></legend><div class="archive-choices">${(key==='exam'?allowedExams():options[key]).map(value=>`<label><input type="checkbox" data-filter="${key}" value="${value}" ${filters[key].includes(value)?'checked':''}><span>${key==='grade'?gradeName(value):key==='year'?value+'學年度':value}</span></label>`).join('')}<button data-clear="${key}">清除${label}</button></div></fieldset>`).join('')}
 const actions=x=>`<div class="archive-actions"><button data-view="${x.id}">查看大圖</button><a href="${x.original}" download="${name(x)}.jpg">下載原圖</a><button data-print="${x.id}">列印</button></div>`;
 function results(){
  const files=examFiles.filter(x=>Object.keys(labels).every(k=>!filters[k].length||filters[k].includes(x[k])));
  q('#archive-count').textContent=`顯示 ${files.length} 份考程`;
  q('#archive-results').innerHTML=files.map(x=>`<article class="archive-card"><div class="archive-card-heading"><span class="archive-year">${x.year}學年度 · ${x.term}</span><span class="grade-tag">${gradeName(x.grade)}${x.track?`・${x.track}`:""}</span></div><h3>${x.exam}</h3><p>考試日期：${x.date}${x.end?`～${x.end}`:""}<br>原圖修訂：${x.revised||'未標示'}${x.note?`<br>${escape(x.note)}`:""}</p><button class="archive-thumbnail" data-view="${x.id}" aria-label="查看 ${name(x)} 大圖"><img src="${x.thumbnail}" alt="${name(x)}考程與範圍" loading="lazy" width="480"></button>${actions(x)}<label class="compare-choice"><input type="checkbox" data-compare="${x.id}" ${selected.includes(x.id)?'checked':''}>加入比較</label></article>`).join('')||'<p class="empty-state">目前尚未收錄符合條件的考程。請調整篩選，或清除全部篩選查看現有資料。</p>';
  compareState();
 }
 function compareState(){
  q('#compare-summary').textContent=selected.length?`已選 ${selected.length}/2：${selected.map(id=>name(examFiles.find(x=>x.id===id))).join('；')}`:'勾選兩份考程，即可並排比較';
  q('#compare-open').disabled=selected.length!==2;
  host.querySelectorAll('[data-compare]').forEach(input=>{input.checked=selected.includes(input.dataset.compare);input.disabled=selected.length===2&&!input.checked});
 }
 function openViewer(ids){
  q('#exam-dialog-title').textContent=ids.length===2?'考程並排比較':'考程原圖';
  q('#dialog-content').className=ids.length===2?'comparison-panes':'single-pane';
  q('#dialog-content').innerHTML=ids.map(id=>{const x=examFiles.find(x=>x.id===id);return `<section class="image-pane"><h3>${name(x)}</h3><label class="zoom-control">縮放 <input type="range" min="100" max="250" step="25" value="100" aria-label="${name(x)}縮放"><output>100%</output></label><div class="image-scroll" tabindex="0" aria-label="${name(x)}圖片捲動區"><img src="${x.original}" alt="${name(x)}考程與範圍"></div>${actions(x)}</section>`}).join('');
  if(!q('dialog').open)q('dialog').showModal();
 }
 async function printFile(id){
  const x=examFiles.find(x=>x.id===id);
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
}
