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

// Confirmed discussion decisions; pending audiences are visible to all senior grades.
const pendingNote='此為國際能力課程相關安排，適用年級與班別尚待確認。暫列於各高中年級供查閱，不代表所有學生皆須參加；請依個人課程安排及學校、導師公告確認。';
const windowNote='此為提前考科安排區間，各年級實際考科、日期與時間將依後續公告更新；不代表區間內每天都有考試。';
const mockNote='本週預計安排英聽模擬考，實際實施日期與時間尚未公告，請自行留意學校或導師通知。';
seniorSources.advance={label:'第一次段考提前考科公告（使用者提供）',revised:'2026-10-06'};
seniorSources.ceec={...gsatSource,revised:'2026-10-06'};
seniorSources.cape={label:'大學術科考試委員會｜116學年度重要日程',url:'https://www.cape.edu.tw/116學年度大學術科考試-重要日程/',revised:'2026-10-06'};
export const admissionEvents=[
 {id:'a-listen-reg1',start:'2026-09-03',end:'2026-09-10',title:'英聽第一次考試・官方報名',examType:'英聽',kind:'報名',source:'ceec'},
 {id:'a-listen-exam1',start:'2026-10-17',title:'高中英語聽力測驗・第一次正式考試',examType:'英聽',source:'ceec'},
 {id:'a-listen-reg2',start:'2026-11-04',end:'2026-11-10',title:'英聽第二次考試・官方報名',examType:'英聽',kind:'報名',source:'ceec'},
 {id:'a-listen-exam2',start:'2026-12-12',title:'高中英語聽力測驗・第二次正式考試',examType:'英聽',source:'ceec'},
 {id:'a-gsat-reg',start:'2026-10-27',end:'2026-11-10',title:'學測・官方報名',examType:'學測',kind:'報名',source:'ceec'},
 {id:'a-cape-reg',start:'2026-10-27',end:'2026-11-10',title:'大學術科・官方報名',examType:'術科',kind:'報名',source:'cape',audience:'高三・需報考術科者'},
 {...gsatExam,id:'a-gsat-exam',examType:'學測',source:'ceec'},
].map(e=>({...e,grades:[12],category:'升學',note:(e.examType==='術科'?'僅適用需報考音樂、美術或體育術科者。':'')+(e.kind==='報名'?'官方報名期間，截止日下午5時。校內集體報名期限可能較早，請自行留意學校或導師通知。':'正式考試，實際考程與試場請以官方公告為準。'),...e}));
seniorEvents.push(
 {id:'s-advance12-writing',start:'2026-10-01',grades:[12],category:'考試',title:'高三提前考科・英文寫作',source:'advance',timeStart:'08:10',timeEnd:'09:00',note:'第1節（08:10～09:00）。'},
 {id:'s-advance10-science',start:'2026-10-07',grades:[10],category:'考試',title:'高一提前考科・科學研究大探索／醫學研究',source:'advance',timeStart:'08:10',timeEnd:'09:00',note:'第1節（08:10～09:00），實際應試科目依個人課程安排。'},
 {id:'s-intl-exam1',start:'2026-10-05',grades:[10],category:'考試',title:'高一國際能力段考一',source:'advance',timeStart:'15:10',timeEnd:'16:00',note:'第7節（15:10～16:00）。公告適用高一、國七、國八；本頁只顯示高中範圍。'},
 {id:'s-advance2-window',start:'2026-11-09',end:'2026-11-20',grades:[10,11,12],category:'考試',title:'提前考科安排區間（段考二前）',timing:'window',source:'exams',note:windowNote},
 {id:'s-advance3-window',start:'2027-01-04',end:'2027-01-15',grades:[10,11,12],category:'考試',title:'提前考科安排區間（期末）',timing:'window',source:'exams',note:windowNote},
 {id:'s-midterm-week',start:'2026-11-01',end:'2026-11-07',grades:[10,11,12],audiencePending:true,category:'考試',title:'期中考科考試（本週安排）',timing:'week',source:'exams',note:'原表列11/2當週；實施日期、考科與適用年級尚待確認，請自行留意學校或導師公告。'},
 {id:'s-intl-oral1',start:'2026-09-29',end:'2026-10-08',grades:[10,11,12],audiencePending:true,category:'考試',title:'國際能力口試安排',timing:'window',source:'exams',note:pendingNote},
 {id:'s-intl-project',start:'2026-11-02',end:'2026-11-13',grades:[10,11,12],audiencePending:true,category:'考試',title:'國際能力專題報告安排',timing:'window',source:'exams',note:pendingNote},
 {id:'s-intl-oral-final',start:'2027-01-04',end:'2027-01-15',grades:[10,11,12],audiencePending:true,category:'考試',title:'國際能力期末口試安排',timing:'window',source:'exams',note:pendingNote},
 {id:'s-intl-final',start:'2027-01-15',grades:[10,11,12],audiencePending:true,category:'考試',title:'國際能力期末考',source:'exams',note:pendingNote},
 {id:'s-listen-mock-week',start:'2026-09-27',end:'2026-10-03',grades:[12],category:'考試',title:'高三英聽模擬考（本週安排）',timing:'week',source:'exams',note:mockNote+'原始表為9/27～10/3週，不將9/29視為單日考試日期。'},
 {id:'s-final12-geng',start:'2026-12-28',end:'2026-12-31',grades:[12],audience:'高三庚班',category:'考試',title:'高三庚班期末考週',timing:'window',source:'exams',note:'僅適用高三庚班，實際考科與實施日期依班級公告。'},
 {id:'s-score12-geng',start:'2027-01-03',end:'2027-01-09',grades:[12],audience:'高三庚班',category:'行政',title:'高三庚班學習成績結算（本週）',timing:'week',source:'exams',note:'原表列1/4當週，僅適用高三庚班；本週進行結算，未指定單日。'},
 ...admissionEvents
);
export const audienceLabel=e=>e.audiencePending?'適用年級待確認':e.audience||e.grades.map(g=>({10:'高一',11:'高二',12:'高三'}[g])).join('、');
