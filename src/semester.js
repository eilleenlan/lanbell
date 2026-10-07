// Academic dates are explicit: do not infer a new semester from today's date.
export const semester={label:'115 學年度第一學期',start:'2026-07-19',opening:'2026-08-31',lastTeachingDay:'2027-01-20',end:'2027-02-11'};
export function semesterOverview(filtered,events,helpers){
 const {escapeHtml,addDays,localDate,daysUntil,eventGradeText,occursOn}=helpers;
 const short=date=>`${Number(date.slice(5,7))}/${Number(date.slice(8))}`;
 const tone=x=>x.category.startsWith('考試-')?'exam':x.category==='開學/放假'?'holiday':['一般家長','特定家長'].includes(x.category)?'parent':'other';
 let sections='',rows='',month='',jumps=[];
 const finish=()=>{if(month)sections+=`<section class="semester-month" id="semester-${month}"><h2>${month.slice(0,4)} 年 ${Number(month.slice(5))} 月</h2><div class="semester-table"><div class="semester-table-head"><span>週次與日期</span><span>當週行程</span></div>${rows}</div></section>`;};
 let current='';
 for(let start=semester.start;start<=semester.end;start=addDays(start,7)){
  const end=addDays(start,6),anchor=start<semester.start?semester.start:start,key=start.slice(0,7);
  if(key!==month){finish();rows='';month=key;jumps.push(key);}
  const inWeek=filtered.filter(x=>Array.from({length:7},(_,i)=>addDays(start,i)).some(d=>d>=semester.start&&d<=semester.end&&occursOn(x,d)));
  const active=daysUntil(start)<=0&&daysUntil(end)>=0;
  const weekId='semester-week-'+start;if(active)current=weekId;
  const week=start<addDays(semester.opening,-1)?'暑期':start>semester.lastTeachingDay?'寒假／開學銜接':`第 ${Math.floor((localDate(start)-localDate(addDays(semester.opening,-1)))/604800000)+1} 週`;
  const days=Array.from({length:7},(_,i)=>{const d=addDays(start,i),items=inWeek.filter(x=>occursOn(x,d));return `<span class="${i===0||i===6?'weekend ':''}${daysUntil(d)===0?'semester-today':''}" title="${d}${items.length?' · '+items.length+' 項':''}"><small>${'日一二三四五六'[i]}</small><b>${Number(d.slice(8))}</b>${items.length?'<i aria-label="有行程">•</i>':'<i aria-hidden="true">&nbsp;</i>'}</span>`;}).join('');
  rows+=`<section class="semester-week ${active?'semester-current':''}" id="${weekId}"><div class="semester-dates"><strong>${week}${active?' · 本週':''}</strong><span>${short(start)}～${short(end)}</span><div class="semester-days">${days}</div></div><div class="semester-events">${inWeek.length?inWeek.map(x=>`<button class="semester-event semester-${tone(x)}" data-month-event="${events.indexOf(x)}"><time>${short(x.start)}${x.end&&x.end!==x.start?'～'+short(x.end):''}</time><span>${escapeHtml(x.title)}${x.tentative?' <em>暫定</em>':''}${x.start<start?' <em>持續中</em>':''}<small>${eventGradeText(x)}${x.weekdays?' · 週一至週五':''}</small></span><span aria-hidden="true">›</span></button>`).join(''):'<p class="semester-empty">本週未收錄符合條件的行程</p>'}</div></section>`;
 }
 finish();
 return `<section class="semester-overview" aria-label="學期總覽"><header class="semester-heading"><div><span class="eyebrow">學期總覽</span><h2>${semester.label}</h2><p>2026 年暑期至 2027 年寒假・含下學期開學銜接</p></div></header><nav class="semester-jumps" aria-label="跳至月份"><button type="button" data-overview-top>↑ 回到搜尋／篩選</button><button data-overview-jump="${current||'semester-'+jumps[0]}" ${current?'':'disabled'}>跳到本週</button>${jumps.map(m=>`<button data-overview-jump="semester-${m}">${Number(m.slice(5))} 月${m.startsWith('2027')?'（2027）':''}</button>`).join('')}</nav><p class="source-note">依目前網站已收錄資料呈現；空白週不代表放假。跨週活動會在各週重複顯示，點選活動可查看完整備註。<br>寒輔週六、日免到校；每日上課／放假狀態可切換「月曆」查看。</p><div class="semester-legend"><span>考試</span><span>開學／放假</span><span>家長參與</span></div>${filtered.length?'':'<p class="empty-state" role="status">本學期沒有符合篩選的行程，請調整條件。</p>'}${sections}</section>`;
}