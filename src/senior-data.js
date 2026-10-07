// Public dates transcribed from the supplied parent-organized images.
// grades: 10=高一, 11=高二, 12=高三. Every entry has an explicit audience.
export const seniorUpdatedAt = '2026年10月7日';
export const seniorSources = {
 summerExam10:{label:'高一暑期學科競賽考程與範圍整理',revised:'2026-08-03'},
  summer: {label:'高中暑期日期整理', revised:'2026-06-21'},
  exams: {label:'高中考試日期整理（修訂）', revised:'2026-07-29'},
  activities: {label:'高中活動日期整理（修訂）', revised:'2026-07-29'},
  trips10: {label:'高一田教日期整理（修訂）', revised:'2026-07-10'},
  trips11: {label:'高二田教日期整理', revised:'2026-06-21'},
};
export const seniorEvents = [
 {"id":"s-study-canada","start":"2026-07-10","grades":[10,11,12],"audiencePending":true,"category":"活動","title":"加拿大遊學團返臺","source":"summer","searchAliases":["遊學團","加拿大團","暑期國際遊學團"],"note":"暑期遊學團；整理圖列行程6/21～7/10、7/10返臺。僅適用參團者。"},
 {"id":"s-study-usa","start":"2026-07-11","grades":[10,11,12],"audiencePending":true,"category":"活動","title":"美國遊學團返臺","source":"summer","searchAliases":["遊學團","美國團","暑期國際遊學團"],"note":"依今年暑期行事曆列為7/11返臺；前一學期曾暫定7/12，可能為後續調整，實際返臺日期請以遊學團通知為準。僅適用參團者。"},
 {"id":"s-study-uk","start":"2026-07-22","grades":[10,11,12],"audiencePending":true,"category":"活動","title":"英國遊學團返臺","source":"summer","searchAliases":["遊學團","英國團","暑期國際遊學團"],"note":"暑期遊學團；整理圖列行程7/1～7/22、7/22返臺。僅適用參團者。"},
 {"id":"s-summer12","start":"2026-07-20","end":"2026-08-21","grades":[12],"category":"行政","title":"高三暑期輔導（暫）","tentative":true,"source":"summer","searchAliases":["暑輔"],"note":"原圖列高國三；高中部分僅高三，共5週。實際上課日及週末安排依公告，不代表期間每天上課。"},
 {"id":"s-summer-orientation","start":"2026-07-23","end":"2026-07-24","grades":[10,11,12],"audiencePending":true,"category":"活動","title":"新生訓練","source":"summer","note":"原整理圖未明列高中適用年級或班別，僅供查閱；實際參加對象請依學校或導師公告確認。 僅適用新生，未確認是否涵蓋轉入生。"},
 {"id":"s-summer1011","start":"2026-07-27","end":"2026-08-21","grades":[10,11],"category":"行政","title":"高一、高二暑期輔導（暫）","tentative":true,"source":"summer","searchAliases":["暑輔"],"note":"原圖列高國一二；高中部分僅高一、高二，共4週。實際上課日及週末安排依公告，不代表期間每天上課。"},
 {"id":"s-summer-makeup-list","start":"2026-07-26","end":"2026-08-01","grades":[10,11,12],"audiencePending":true,"category":"行政","title":"公告高中補考名單（本週）","timing":"week","source":"summer","note":"原圖列7/27當週，未指定公告單日。原整理圖未明列高中適用年級或班別，僅供查閱；實際參加對象請依學校或導師公告確認。"},
 {"id":"s-summer10-course","start":"2026-08-02","end":"2026-08-08","grades":[10],"category":"行政","title":"高一新生課業輔導課程開始（本週）","timing":"week","source":"summer","note":"原圖列8/3當週，未指定開課單日；實際日期及參加安排依公告。"},
 {"id":"s-parent-geng","start":"2026-08-06","grades":[10,12],"audience":"高一庚班、高三庚班","category":"家長參與","title":"高一庚班、高三庚班家長會（暫）","tentative":true,"source":"summer","note":"原圖列「一庚／三庚家長會」，屬高中暑期整理；依班別標示，不擴大至全年級。實際安排以班級公告為準。"},
 {"id":"s-summer-competition-pending","start":"2026-08-21","grades":[11,12],"audiencePending":true,"category":"考試","title":"暑期學科競賽（高二、高三適用待確認）","source":"summer","note":"原暑期圖未註明適用年級。高一已由考程原圖確認並另列；此筆供高二、高三查閱，不代表兩個年級均須參加，請依公告確認。"},
 {"id":"s-summer-end","start":"2026-08-21","grades":[10,11,12],"category":"行政","title":"暑期輔導結束","source":"summer","searchAliases":["暑輔結束"],"note":"僅適用參加暑期輔導者；依暑期整理圖所列結束日。"},
 {"id":"s-opening1","start":"2026-08-31","grades":[10,11,12],"audiencePending":true,"category":"行政","title":"開學日（暫）","tentative":true,"source":"activities","note":"夜自習開始；實際參加對象及安排依公告。 原整理圖未明列完整適用年級或班別，暫供各高中年級查閱；是否適用請依個人課程安排及學校、導師公告確認。"},
 {"id":"s-evening-start","start":"2026-09-14","grades":[10,11,12],"audiencePending":true,"category":"行政","title":"夜間課程開始","source":"activities","note":"僅適用參加夜間課程者。 原整理圖未明列完整適用年級或班別，暫供各高中年級查閱；是否適用請依個人課程安排及學校、導師公告確認。"},
 {"id":"s-parent-representatives","start":"2026-10-02","grades":[10,11,12],"audiencePending":true,"category":"家長參與","title":"家長代表大會","tentative":true,"source":"activities","note":"僅適用家長代表。 原整理圖未明列完整適用年級或班別，暫供各高中年級查閱；是否適用請依個人課程安排及學校、導師公告確認。"},
 {"id":"s-evening-pause1","start":"2026-10-05","end":"2026-10-14","grades":[10,11,12],"audiencePending":true,"category":"行政","title":"夜間課程暫停","source":"activities","note":"僅適用原有夜間課程安排；不是全校停課。 原整理圖未明列完整適用年級或班別，暫供各高中年級查閱；是否適用請依個人課程安排及學校、導師公告確認。"},
 {"id":"s-attendance-sep","start":"2026-10-04","end":"2026-10-10","grades":[10,11,12],"audiencePending":true,"category":"行政","title":"發放9月學生出缺勤資料核對（本週）","timing":"week","source":"activities","note":"原圖列10/5當週，未指定實際發放日期。 原整理圖未明列完整適用年級或班別，暫供各高中年級查閱；是否適用請依個人課程安排及學校、導師公告確認。"},
 {"id":"s-tabletennis","start":"2026-10-17","grades":[10,11,12],"audiencePending":true,"category":"活動","title":"桌球賽","tentative":true,"source":"activities","note":"參賽對象依公告。 原整理圖未明列完整適用年級或班別，暫供各高中年級查閱；是否適用請依個人課程安排及學校、導師公告確認。"},
 {"id":"s-flu-vaccine","start":"2026-10-20","end":"2026-10-21","grades":[10,11,12],"audiencePending":true,"category":"健康","title":"校園流感疫苗接種","timing":"window","source":"activities","note":"實際接種日期、對象及同意程序依通知；不代表每位學生連續兩日接種。 原整理圖未明列完整適用年級或班別，暫供各高中年級查閱；是否適用請依個人課程安排及學校、導師公告確認。"},
 {"id":"s-new-health","start":"2026-11-03","end":"2026-11-05","grades":[10],"category":"健康","title":"新生學生健檢","timing":"window","source":"activities","note":"高中部分為新生，實際班別及日期依通知。"},
 {"id":"s-attendance-oct","start":"2026-11-04","grades":[10,11,12],"audiencePending":true,"category":"行政","title":"發放10月學生出缺勤資料核對","source":"activities","note":" 原整理圖未明列完整適用年級或班別，暫供各高中年級查閱；是否適用請依個人課程安排及學校、導師公告確認。"},
 {"id":"s-evening-pause2","start":"2026-11-16","end":"2026-11-27","grades":[10,11,12],"audiencePending":true,"category":"行政","title":"夜間課程暫停","source":"activities","note":"僅適用原有夜間課程安排；不是全校停課。 原整理圖未明列完整適用年級或班別，暫供各高中年級查閱；是否適用請依個人課程安排及學校、導師公告確認。"},
 {"id":"s-intl-observation","start":"2026-11-16","end":"2026-11-20","grades":[10,11,12],"audiencePending":true,"category":"活動","title":"國際能力教學觀摩週","timing":"window","source":"activities","note":"國際能力相關課程活動，適用年級與班別待確認。 原整理圖未明列完整適用年級或班別，暫供各高中年級查閱；是否適用請依個人課程安排及學校、導師公告確認。"},
 {"id":"s-vision-followup","start":"2026-11-16","end":"2026-11-20","grades":[10,11,12],"audiencePending":true,"category":"健康","title":"視力健檢復健及矯治回條","timing":"window","source":"activities","note":"僅適用收到通知、需繳交回條者；實際期限依通知。 原整理圖未明列完整適用年級或班別，暫供各高中年級查閱；是否適用請依個人課程安排及學校、導師公告確認。"},
 {"id":"s-selection10","start":"2026-11-29","end":"2026-12-05","grades":[10],"category":"行政","title":"發放高一選組單（本週）","timing":"week","source":"activities","note":"原圖列11/30當週，未指定實際發放日期。"},
 {"id":"s-basketball","start":"2026-12-02","grades":[10,11,12],"audiencePending":true,"category":"活動","title":"高中班際籃球賽","source":"activities","note":"參賽班別及安排依公告。 原整理圖未明列完整適用年級或班別，暫供各高中年級查閱；是否適用請依個人課程安排及學校、導師公告確認。"},
 {"id":"s-attendance-nov","start":"2026-12-04","grades":[10,11,12],"audiencePending":true,"category":"行政","title":"發放11月學生出缺勤資料核對","source":"activities","note":" 原整理圖未明列完整適用年級或班別，暫供各高中年級查閱；是否適用請依個人課程安排及學校、導師公告確認。"},
 {"id":"s-intl-transfer-reg","start":"2026-12-06","end":"2026-12-12","grades":[10,11,12],"audiencePending":true,"category":"行政","title":"國內班轉國際班報名（本週）","timing":"week","source":"activities","note":"原圖列12/7當週；僅適用有意申請者，資格及期限依公告。 原整理圖未明列完整適用年級或班別，暫供各高中年級查閱；是否適用請依個人課程安排及學校、導師公告確認。"},
 {"id":"s-night-reg","start":"2026-12-14","end":"2026-12-26","grades":[10,11,12],"audiencePending":true,"category":"行政","title":"新學期混班夜自習申請","source":"activities","note":"僅適用有意申請者；實際開放及截止時間依公告。 原整理圖未明列完整適用年級或班別，暫供各高中年級查閱；是否適用請依個人課程安排及學校、導師公告確認。"},
 {"id":"s-christmas","start":"2026-12-18","grades":[10,11,12],"audiencePending":true,"category":"活動","title":"耶誕晚會","source":"activities","note":"參與對象及時間依公告。 原整理圖未明列完整適用年級或班別，暫供各高中年級查閱；是否適用請依個人課程安排及學校、導師公告確認。"},
 {"id":"s-attendance-term","start":"2027-01-03","end":"2027-01-09","grades":[10,11,12],"audiencePending":true,"category":"行政","title":"發放115-1學期學生出缺勤資料核對（本週）","timing":"week","source":"activities","note":"原圖列1/4當週，未指定實際發放日期。 原整理圖未明列完整適用年級或班別，暫供各高中年級查閱；是否適用請依個人課程安排及學校、導師公告確認。"},
 {"id":"s-evening-pause3","start":"2027-01-11","end":"2027-01-19","grades":[10,11,12],"audiencePending":true,"category":"行政","title":"夜間課程暫停","source":"activities","note":"僅適用原有夜間課程安排；不是全校停課。 原整理圖未明列完整適用年級或班別，暫供各高中年級查閱；是否適用請依個人課程安排及學校、導師公告確認。"},
 {"id":"s-night-end","start":"2027-01-17","end":"2027-01-23","grades":[10,11,12],"audiencePending":true,"category":"行政","title":"夜自習結束（本週、暫）","tentative":true,"timing":"week","source":"activities","note":"原圖列1/18當週；僅適用參加夜自習者，實際結束日依公告。 原整理圖未明列完整適用年級或班別，暫供各高中年級查閱；是否適用請依個人課程安排及學校、導師公告確認。"},
 {"id":"s-intl-transfer-group","start":"2027-01-17","end":"2027-01-23","grades":[10,11,12],"audiencePending":true,"category":"行政","title":"國際能力轉組（本週）","timing":"week","source":"activities","note":"原圖列1/18當週，實際日期及適用班別依公告。 原整理圖未明列完整適用年級或班別，暫供各高中年級查閱；是否適用請依個人課程安排及學校、導師公告確認。"},
 {"id":"s-intl-transfer-test","start":"2027-01-17","end":"2027-01-23","grades":[10,11,12],"audiencePending":true,"category":"考試","title":"國內班轉國際班測驗（本週）","timing":"week","source":"activities","note":"原圖列1/18當週；僅適用申請轉班者，實際日期依公告。 原整理圖未明列完整適用年級或班別，暫供各高中年級查閱；是否適用請依個人課程安排及學校、導師公告確認。"},
 {"id":"s-winter-tutoring","start":"2027-01-21","end":"2027-02-02","grades":[10,11,12],"audiencePending":true,"category":"行政","title":"寒期輔導（暫）","tentative":true,"timing":"window","source":"activities","note":"修訂由1/20開始改為1/21；各年級適用範圍、實際上課日與週末安排依公告，不代表區間內每天上課。 原整理圖未明列完整適用年級或班別，暫供各高中年級查閱；是否適用請依個人課程安排及學校、導師公告確認。"},
 {"id":"s-badminton","start":"2027-01-30","grades":[10,11,12],"audiencePending":true,"category":"活動","title":"115-2羽球賽","tentative":true,"source":"activities","note":"參賽對象依公告。 原整理圖未明列完整適用年級或班別，暫供各高中年級查閱；是否適用請依個人課程安排及學校、導師公告確認。"},
 {"id":"s-opening2","start":"2027-02-11","grades":[10,11,12],"audiencePending":true,"category":"行政","title":"開學日（暫）","tentative":true,"source":"activities","note":"115-2開學安排依最新公告確認。 原整理圖未明列完整適用年級或班別，暫供各高中年級查閱；是否適用請依個人課程安排及學校、導師公告確認。"},
 {id:'s-summer10',start:'2026-08-21',grades:[10],category:'考試',title:'高一暑期學科競賽',source:'summerExam10',note:'已結束行程供備查；已收錄高一考程與範圍。'},
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
