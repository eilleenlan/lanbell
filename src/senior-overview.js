// Display coverage, not a declaration of holidays or official teaching days.
export const seniorOverviewRange={start:'2026-07-19',opening:'2026-08-31',end:'2027-02-11'};
export function seniorOverview(items,{esc,shift,today,utc,grades}){
 const range=seniorOverviewRange;
 const short=d=>`${Number(d.slice(5,7))}/${Number(d.slice(8))}`;
 const months=[];let sections='',rows='',month='',current='';
 const finish=()=>{if(month)sections+=`<section class="semester-month" id="senior-month-${month}"><h2>${month.slice(0,4)} 年 ${Number(month.slice(5))} 月</h2><div class="semester-table"><div class="semester-table-head"><span>週次與日期</span><span>當週高中行程</span></div>${rows}</div></section>`;};
 for(let start=range.start;start<=range.end;start=shift(start,7)){
  const end=shift(start,6),key=start.slice(0,7);
  if(key!==month){finish();rows='';month=key;months.push(key);}
  const active=start<=today()&&end>=today(),id='senior-week-'+start;
  if(active)current=id;
  const week=start<shift(range.opening,-1)?'暑期':`第 ${Math.floor((utc(start)-utc(shift(range.opening,-1)))/604800000)+1} 週`;
  const inWeek=items.filter(e=>e.start<=end&&(e.end||e.start)>=start);
  const days=Array.from({length:7},(_,i)=>{const d=shift(start,i);const count=inWeek.filter(e=>e.start<=d&&(e.end||e.start)>=d).length;return `<span class="${i===0||i===6?'weekend ':''}${d===today()?'semester-today':''}" title="${d}${count?'・'+count+' 項':''}"><small>${'日一二三四五六'[i]}</small><b>${Number(d.slice(8))}</b><i ${count?'aria-label="有行程"':'aria-hidden="true"'}>${count?'•':'&nbsp;'}</i></span>`;}).join('');
  rows+=`<section class="semester-week ${active?'semester-current':''}" id="${id}"><div class="semester-dates"><strong>${week}${active?'・本週':''}</strong><span>${short(start)}～${short(end)}</span><div class="semester-days">${days}</div></div><div class="semester-events">${inWeek.length?inWeek.map(e=>`<button type="button" class="semester-event semester-${e.category==='考試'?'exam':e.category==='家長參與'?'parent':'other'}" data-senior-event="${e.id}"><time>${short(e.start)}${e.end&&e.end!==e.start?'～'+short(e.end):''}</time><span>${esc(e.title)}${e.tentative?' <em>暫定</em>':''}${e.start<start?' <em>持續中</em>':''}<small>${e.grades.map(g=>grades[g]).join('、')}</small></span><span aria-hidden="true">›</span></button>`).join(''):'<p class="semester-empty">本週尚未收錄符合條件的行程</p>'}</div></section>`;
 }
 finish();
 return `<section class="semester-overview senior-overview" aria-label="高中學期總覽"><header class="semester-heading"><div><span class="eyebrow">學期總覽</span><h2>115 學年度第一學期・高中</h2><p>2026 年暑期至 2027 年 2 月・按週查看已收錄行程</p></div></header><div class="semester-jumps" role="navigation" aria-label="跳至月份"><button type="button" data-senior-jump="${current}" ${current?'':'disabled'}>跳到本週</button>${months.map(m=>`<button type="button" data-senior-jump="senior-month-${m}">${Number(m.slice(5))} 月${m.startsWith('2027')?'（2027）':''}</button>`).join('')}</div><p class="source-note">總覽包含已結束行程，年級、分類與搜尋仍會套用。跨週活動會在各週顯示「持續中」，點選可查看細節。<br>空白週表示尚未收錄符合條件的資料，不代表放假；本總覽範圍不是正式放假區間。</p><div class="semester-legend"><span>考試</span><span class="senior-legend-other">活動／田教等</span><span>家長參與</span></div>${items.length?'': '<p class="senior-empty" role="status">沒有符合篩選的行程，請調整條件。</p>'}${sections}</section>`;
}
