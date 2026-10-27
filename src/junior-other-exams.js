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

// 施工單005：僅使用家長人工整理文字；學年度／學期／年份暫定。
export const grade8WeeklyExams=[
 ['09-21',4,'國文','五柳先生傳',30],
 ['09-29',5,'數學','方根與商高定理；主題一 平方根的意義；主題二 方根的運算；主題三 商高定理',40],
 ['11-02',10,'理化','3-3 聲波的反射與超聲波；3-4 多變的聲音',40],
 ['11-09',11,'英語','B4U1；V2000 p.213–222',30],
 ['12-21',17,'國文','樂府詩選',30],
 ['12-28',18,'數學','數列與級數；主題一 等差數列；主題二 等差級數；主題三 等比數列；主題四 數型關係',40]
].map(([date,week,subject,scope,duration])=>({
 id:'115-weekly-g8-'+date,year:'115',grade:'8',term:'上學期',
 exam:'國八學科競賽（週考）－'+subject,examCategory:'其他測驗',date:'2026-'+date,
 dateKind:'collection',week,duration,period:'未提供',time:'各該科目課堂內（'+duration+'分鐘）',subject,scope,
 note:'領卷日期不是統一考試日期，實際測驗依各班當週該科課程安排。',
 textOnly:true,checkedAt:'2026-10-24',source:'使用者提供施工單005人工整理文字'
}));
// 10/27新通知：更新既有國八英語，新增國七；維持同一識別碼。
const english8=grade8WeeklyExams.find(x=>x.id==='115-weekly-g8-11-09');
Object.assign(english8,{testDate:'依各班當週英語課程安排',time:'30分鐘',note:'領卷日期不是統一考試日期，實際測驗依各班當週英語課程安排。',checkedAt:'2026-10-27',source:'使用者提供施工單005補充：11/9英語週考新通知文字'});
export const grade7WeeklyExams=[{...english8,id:'115-weekly-g7-11-09',grade:'7',exam:'國七學科競賽（週考）－英語',scope:'B1U5；V2000 p.31–42'}];
grade7WeeklyExams.push({
 id:'115-weekly-g7-11-02',year:'115',grade:'7',term:'上學期',exam:'國七學科競賽（週考）－生物',examCategory:'其他測驗',
 date:'2026-11-02',dateKind:'collection',week:10,duration:40,period:'未提供',time:'40分鐘',testDate:'依各班當週生物課程安排',subject:'生物',
 scope:'實驗 3-1 澱粉與糖分的測定；實驗 3-2 溫度對唾液分解澱粉的影響；實驗 3-3 光與光合作用；3-4 人體如何獲得養分',
 note:'領卷日期不是統一考試日期，實際測驗依各班當週生物課程安排。',textOnly:true,checkedAt:'2026-10-27',source:'使用者提供施工單006最新通知文字；預定範圍已調整'
});
export const grade8WeeklyEvents=grade8WeeklyExams.map(x=>({
 id:x.id,start:x.date,category:'考試-學科競賽',grades:[8],title:x.exam+'－領卷',tentative:!x.testDate,
 note:(x.testDate?'115學年度上學期；第':'暫定115學年度上學期；第')+x.week+'週。'+x.note,source:x.source,checkedAt:x.checkedAt,
 reminders:['領卷日期：'+x.date,...(x.testDate?['測驗日期：'+x.testDate]:[]),'測驗時間：'+x.time,'預定測驗範圍：'+x.scope]
}));

export const grade7WeeklyEvents=grade7WeeklyExams.map(x=>({id:x.id,start:x.date,category:'考試-學科競賽',grades:[7],title:x.exam+'－領卷',tentative:false,note:'115學年度上學期；第'+x.week+'週。'+x.note,source:x.source,checkedAt:x.checkedAt,reminders:['領卷日期：'+x.date,'測驗日期：'+x.testDate,'測驗時間：'+x.time,'預定測驗範圍：'+x.scope]}));
