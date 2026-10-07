import {examScopes,scopeUpdatedAt} from './exam-scopes.js?v=20261007';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const normalize=s=>s.normalize('NFKC').toLowerCase().replace(/\s+/g,'');
export function mountScopeSearch(host,files){
 const params=new URLSearchParams(location.hash.split('?')[1]||'');
 const entries=examScopes.map(s=>({...s,file:files.find(f=>f.id===s.examId)})).filter(s=>s.file).sort((a,b)=>files.indexOf(a.file)-files.indexOf(b.file));
 const years=[...new Set(entries.map(s=>s.file.year))].sort((a,b)=>b-a);
 host.innerHTML=`<details class="scope-search" ${params.has('unit')?'open':''}><summary>依單元查考試 <small>數學試用版</small></summary><p>想找某個單元在哪次段考出現？輸入範圍中的文字，就能找到對應考程。此處預設搜尋全部學年度，與下方原圖篩選分開。</p><p class="scope-coverage">已整理 ${entries.length}／${files.length} 份考程的數學範圍，其他科目尚未整理。查不到不代表沒考過；全冊或會考範圍尚未展開為各單元。整理日期：${scopeUpdatedAt}。</p><form class="scope-form"><label>單元關鍵字<input name="unit" type="search" placeholder="例如：二次函數、乘法公式" value="${esc(params.get('unit')||'')}"></label><label>學年度<select name="scopeYear"><option value="">全部學年度</option>${years.map(y=>`<option>${y}</option>`).join('')}</select></label><label>年級<select name="scopeGrade"><option value="">全部年級</option><option value="7">國七</option><option value="8">國八</option><option value="9">國九</option></select></label><button type="reset">清除單元查詢</button></form><div class="archive-actions scope-examples">試試看：<button data-unit-example="二次函數">二次函數</button><button data-unit-example="乘法公式">乘法公式</button><button data-unit-example="三角形">三角形</button></div><p class="scope-count" role="status"></p><div class="scope-results"></div></details>`;
 const form=host.querySelector('form');
 for(const key of ['scopeYear','scopeGrade']){const control=form.elements[key];if([...control.options].some(o=>o.value===params.get(key)))control.value=params.get(key);}
 function update(){
  const term=form.elements.unit.value.trim();
  const tokens=term.split(/\s+/).filter(Boolean).map(normalize);
  const hits=entries.filter(s=>(!form.elements.scopeYear.value||s.file.year===form.elements.scopeYear.value)&&(!form.elements.scopeGrade.value||s.file.grade===form.elements.scopeGrade.value)&&tokens.every(t=>normalize(s.text).includes(t)));
  host.querySelector('.scope-count').textContent=`${term?`「${term}」：`:''}找到 ${hits.length} 份考程（僅搜尋已整理的數學範圍）`;
  host.querySelector('.scope-results').innerHTML=hits.map(s=>{const f=s.file;return `<article class="scope-result"><span class="archive-year">${esc(f.year)}學年度 · ${esc(f.term)} · 國${'七八九'[Number(f.grade)-7]}${f.track?'・'+esc(f.track):''}</span><h3>${esc(f.exam)}</h3><p class="scope-source">數學｜原圖範圍${s.broad?'（概括範圍，未展開單元）':''}</p><p class="scope-text">${esc(s.text)}</p><p class="scope-source">主考期：${esc(f.date)}${f.end?'～'+esc(f.end):''}</p><button data-view="${esc(f.id)}">查看考程原圖</button></article>`}).join('')||'<p class="empty-state">已整理資料中沒有符合項目。可試試較短的單元名稱，或清除學年度、年級條件；其餘範圍仍可從下方考程原圖查閱。</p>';
  const p=new URLSearchParams(location.hash.split('?')[1]||'');
  for(const key of ['unit','scopeYear','scopeGrade'])p.set(key,form.elements[key].value);
  history.replaceState(null,'',`#/exams?${p}`);
 }
 form.addEventListener('submit',e=>{e.preventDefault();update()});
 form.addEventListener('input',e=>{if(!e.isComposing)update()});
 form.addEventListener('compositionend',update);
 form.addEventListener('change',update);
 form.addEventListener('reset',e=>{e.preventDefault();form.elements.unit.value='';form.elements.scopeYear.value='';form.elements.scopeGrade.value='';update();form.elements.unit.focus()});
 host.addEventListener('click',e=>{const button=e.target.closest('[data-unit-example]');if(button){form.elements.unit.value=button.dataset.unitExample;update();form.elements.unit.focus()}});
 // Initial results without changing the incoming archive URL.
 const initialUrl=location.href;update();history.replaceState(null,'',initialUrl);
}
