// 使用者提供公告；考程與行事曆共用，僅授權公開文字整理，不公開原始公告。
export const lifeTechnologyMidterm={
 id:'115-life-technology-midterm-g9',year:'115',grade:'9',term:'上學期',
 exam:'國九生活科技期中考',examCategory:'其他測驗',date:'2026-11-03',
 period:'第1節',time:'08:10～09:00',subject:'生活科技',scope:'電流熱效應與用電安全、化學電池',
 textOnly:true,checkedAt:'2026-10-19',source:'使用者提供學校公告圖片；學年度及完整考試名稱依施工單'
};
export const lifeTechnologyEvent={
 id:lifeTechnologyMidterm.id,start:lifeTechnologyMidterm.date,category:'考試-段考',grades:[9],title:lifeTechnologyMidterm.exam,
 source:lifeTechnologyMidterm.source,checkedAt:lifeTechnologyMidterm.checkedAt,
 searchAliases:['期中考科－生活科技'],
 schedule:[{date:lifeTechnologyMidterm.date+'（二）',time:lifeTechnologyMidterm.period+' '+lifeTechnologyMidterm.time,subject:lifeTechnologyMidterm.subject}],
 examScope:[[lifeTechnologyMidterm.subject,lifeTechnologyMidterm.scope]]
};
