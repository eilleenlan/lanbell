// Shared calculation: calendar-day difference, independent of today's date and UI filters.
export function nextHolidayExams(holiday,exams,grades){
 const end=holiday.end||holiday.start;
 return grades.map(grade=>{
  const eligible=exams.filter(e=>e.start>end&&!e.audiencePending&&!e.pendingGrades?.includes(grade)&&!e.timing&&!e.audience&&(!e.grades.length||e.grades.includes(grade))).sort((a,b)=>a.start.localeCompare(b.start));
  const first=eligible[0];
  return {grade,exams:first?eligible.filter(e=>e.start===first.start):[],days:first?(Date.parse(first.start+'T00:00:00Z')-Date.parse(end+'T00:00:00Z'))/86400000:null};
 });
}
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function holidayExamReminder(event,exams,grades){
 if(!event.holidayExamReminder)return '';
 const names={7:'國七',8:'國八',9:'國九',10:'高一',11:'高二',12:'高三'};
 const rows=nextHolidayExams(event,exams,grades);
 return `<aside class="holiday-exam-reminder"><strong>假期後考試提醒</strong><ul>${rows.map(r=>`<li><b>${names[r.grade]}</b>：${r.exams.length?r.exams.map(e=>`${esc(e.start)}${e.end&&e.end!==e.start?'～'+esc(e.end):''} ${esc(e.title)}${e.tentative?'（暫定）':''}`).join('；')+`<br><span>首日為連假結束後第 ${r.days} 天</span>`:'尚未收錄後續主要考試'}</li>`).join('')}</ul><small>依已收錄的段考、模擬考、期末考${grades.includes(12)?'及學測':''}自動整理；不含提前考科、報名或日期／對象未定的安排。並非完整考試清單，請以學校最新公告為準。</small></aside>`;
}
