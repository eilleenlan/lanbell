// 施工單007：使用者提供文字，無公告圖片。
export const writingNote='考試時間以鐘聲為準。每節考試不得提早交卷。時程、考科得視實際狀況彈性調整。';
export const writingExams=[8,9,11,12].map(g=>({id:'115-exam2-writing-g'+g,year:'115',term:'上學期',grade:String(g),exam:'第二次段考',examCategory:'第二次段考',date:g===12?'2026-11-12':'2026-11-10',period:'未提供',time:g===12?'08:10–09:40':'08:10–09:00',subject:'國文寫作',scope:'未提供',note:'第二次段考提早考科－國文寫作。'+writingNote,textOnly:true,source:'使用者提供施工單007文字',checkedAt:'2026-10-30'}));
