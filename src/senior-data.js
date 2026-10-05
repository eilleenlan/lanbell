// Public dates transcribed from the supplied parent-organized images.
// grades: 10=高一, 11=高二, 12=高三. Every entry has an explicit audience.
export const seniorUpdatedAt = '2026年10月6日';
export const seniorSources = {
  summer: {label:'高中暑期日期整理', revised:'2026-06-21'},
  exams: {label:'高中考試日期整理（修訂）', revised:'2026-07-29'},
  activities: {label:'高中活動日期整理（修訂）', revised:'2026-07-29'},
  trips10: {label:'高一田教日期整理（修訂）', revised:'2026-07-10'},
  trips11: {label:'高二田教日期整理', revised:'2026-06-21'},
};
export const seniorEvents = [
  {id:'s-exam1',start:'2026-10-13',end:'2026-10-14',grades:[10,11,12],category:'考試',title:'高中第一次段考',source:'exams',note:'依高中考試日期整理；使用者確認為全校共同考期，高一、高二、高三皆適用。各年級考科與範圍請以最新公告為準。',searchAliases:['段一','第一次段考']},
  {id:'s-exam2',start:'2026-11-26',end:'2026-11-27',grades:[10,11,12],category:'考試',title:'高中第二次段考',source:'exams',note:'依高中考試日期整理；使用者確認為全校共同考期，高一、高二、高三皆適用。各年級考科與範圍請以最新公告為準。',searchAliases:['段二','第二次段考']},
  {id:'s-mock1',start:'2026-07-29',end:'2026-07-30',grades:[12],category:'考試',title:'高三第一次模擬考',source:'summer',searchAliases:['模考']},
  {id:'s-parent10',start:'2026-08-06',grades:[10],category:'家長參與',title:'高一家長座談會',tentative:true,source:'summer'},
  {id:'s-photo12',start:'2026-08-07',grades:[12],category:'行政',title:'高三證件照拍攝',tentative:true,source:'summer'},
  {id:'s-mock2',start:'2026-09-02',end:'2026-09-03',grades:[12],category:'考試',title:'高三第二次模擬考',source:'exams',searchAliases:['模考']},
  {id:'s-trip10-gh',start:'2026-09-10',end:'2026-09-11',grades:[10],category:'田教',title:'高一過夜田教（庚、辛班）',source:'trips10',note:'原訂 2027/1/7～1/8，依修訂改為 2026/9/10～9/11。',searchAliases:['田野教育','教育旅行']},
  {id:'s-urine10',start:'2026-09-15',grades:[10],category:'健康',title:'高一新生尿液健康檢查',tentative:true,source:'activities'},
  {id:'s-trip11-ace',start:'2026-09-17',end:'2026-09-18',grades:[11],category:'田教',title:'高二過夜田教（甲、丙、戊班）',source:'trips11',searchAliases:['田野教育','教育旅行']},
  {id:'s-parent12',start:'2026-09-22',grades:[12],category:'家長參與',title:'高三家長會',source:'activities',note:'原表列高三／國九家長會；此處只列高中適用範圍，未套用國九專屬流程。'},
  {id:'s-xray10',start:'2026-09-30',grades:[10],category:'健康',title:'高一新生 X 光健康檢查',source:'activities',note:'下午進行。'},
  {id:'s-trip11-bdf',start:'2026-10-01',end:'2026-10-02',grades:[11],category:'田教',title:'高二過夜田教（乙、丁、己班）',source:'trips11',searchAliases:['田野教育','教育旅行']},
  {id:'s-trip11-gh',start:'2026-10-22',end:'2026-10-23',grades:[11],category:'田教',title:'高二過夜田教（庚、辛班）',source:'trips11',searchAliases:['田野教育','教育旅行']},
  {id:'s-heart10',start:'2026-10-22',grades:[10],category:'健康',title:'高一外縣市學生心臟病篩檢',source:'activities',note:'僅適用符合篩檢對象的外縣市學生，請依通知確認。'},
  {id:'s-drama10',start:'2026-10-23',grades:[10],category:'活動',title:'高一英語戲劇比賽',tentative:true,source:'activities',note:'夜間進行。'},
  {id:'s-mock3',start:'2026-10-28',end:'2026-10-29',grades:[12],category:'考試',title:'高三第三次模擬考',source:'exams',searchAliases:['模考']},
  {id:'s-parent1011',start:'2026-10-31',grades:[10,11],category:'家長參與',title:'高一、高二期中家長座談會',source:'activities',note:'原表列高國一二；此處只列高中適用年級。'},
  {id:'s-mock4',start:'2026-12-08',end:'2026-12-09',grades:[12],category:'考試',title:'高三第四次模擬考',source:'exams',searchAliases:['模考']},
  {id:'s-trip10-abc',start:'2026-12-14',end:'2026-12-15',grades:[10],category:'田教',title:'高一過夜田教（甲、乙、丙班）',source:'trips10',searchAliases:['田野教育','教育旅行']},
  {id:'s-final12',start:'2026-12-29',end:'2026-12-30',grades:[12],category:'考試',title:'高三期末考',source:'exams'},
  {id:'s-trip10-def',start:'2027-01-04',end:'2027-01-05',grades:[10],category:'田教',title:'高一過夜田教（丁、戊、己班）',source:'trips10',searchAliases:['田野教育','教育旅行']},
  {id:'s-exam3',start:'2027-01-19',end:'2027-01-20',grades:[10,11],category:'考試',title:'高一、高二第三次段考',source:'exams',note:'原訂 1/18～1/19，依修訂改為 1/19～1/20。',searchAliases:['段三']},
];
export const gsatSource = {
 label:'大考中心｜116學年度考試重要試務日期',
 url:'https://www.ceec.edu.tw/files/file_pool/1/0q215602074068375626/116%E5%AD%B8%E5%B9%B4%E5%BA%A6%E8%80%83%E8%A9%A6%E9%87%8D%E8%A6%81%E8%A9%A6%E5%8B%99%E6%97%A5%E6%9C%9F.pdf',
 checkedAt:'2026-10-06',
};
export const gsatExam = {id:'gsat-116',start:'2027-01-22',end:'2027-01-24',title:'116 學年度學科能力測驗',grades:[12],category:'學測'};
// Only the exam date has been mapped to its official table row here.
// Other milestones remain undated until independently verified.
export const gsatMilestones = [
 {id:'gsat-registration',title:'學測報名與資料確認',status:'整理中',note:'將分別整理官方報名期間與校內集體報名期限，請依學校通知辦理。'},
 {...gsatExam,status:'官方日程',note:'2027/1/22（五）～1/24（日）。實際應試科目、時間與試場請以大考中心公告為準。'},
 {id:'gsat-score',title:'成績公布與後續申請',status:'整理中',note:'成績查詢及各招生管道日程會分批核對後加入。'},
];
