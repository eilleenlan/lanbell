// 施工單007：使用者提供文字，無公告圖片。
export const writingNote='考試時間以鐘聲為準。每節考試不得提早交卷。時程、考科得視實際狀況彈性調整。';
export const writingExams=[8,9,11,12].map(g=>({id:'115-exam2-writing-g'+g,year:'115',term:'上學期',grade:String(g),exam:'第二次段考',examCategory:'第二次段考',date:g===12?'2026-11-12':'2026-11-10',period:'未提供',time:g===12?'08:10–09:40':'08:10–09:00',subject:'國文寫作',scope:'未提供',note:'第二次段考提早考科－國文寫作。'+writingNote,textOnly:true,source:'使用者提供施工單007文字',checkedAt:'2026-10-30'}));

export const supplementalExams = [
  ['history', '10', '2026-11-16', '08:10–09:00', '歷史', 'B1 4-2～5-1'],
  ['physics', '10', '2026-11-18', '08:10–09:00', '物理', '5-1～5-3'],
  ['biology', '9', '2026-11-20', '15:10–16:00', '生物', '3-4～5-1']
].map(([key, grade, date, time, subject, scope]) => ({
  id: '115-exam2-' + key + '-g' + grade, year: '115', term: '上學期',
  grade, date, time, subject, scope, exam: '第二次段考', examCategory: '第二次段考',
  period: '未提供', textOnly: true, note: writingNote,
  source: '使用者提供施工單007補充文字', checkedAt: '2026-11-04'
}));

export function supplementalCalendarNote(exam) {
  return '考試時間：' + exam.time + '\n考試範圍：' + exam.scope + '\n' + exam.note;
}
