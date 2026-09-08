// 原圖由整理者提供；暑測依檔案標示歸入同號學年度。
export const examFiles=[115,114].flatMap(year=>[7,8,9].map(grade=>({
  id:`${year}-summer-g${grade}`,year:String(year),grade:String(grade),term:'暑期',exam:'暑期學科競賽',
  date:year===115?'2026-08-21':'2025-08-22',
  revised:year===115?'2026-08-03':'2025-07-31',
  original:`./assets/exams/${year}/summer-g${grade}.jpg`,
  thumbnail:`./assets/exams/${year}/summer-g${grade}-thumb.jpg`,
  source:'家長整理提供；修訂日期依原圖落款',
})));

// 上學期第一次段考：113 國九尚未提供，不建立空白紀錄。
examFiles.push(...[114,113].flatMap(year=>(year===114?[7,8,9]:[7,8]).map(grade=>({
  id:`${year}-first-exam1-g${grade}`,year:String(year),grade:String(grade),term:'上學期',exam:'第一次段考',
  date:year===114?'2025-10-14':'2024-10-08',end:year===114?'2025-10-15':'2024-10-09',
  revised:year===114?'2025-09-27':null,
  note:grade===9?'另含 11/3～11/7 期中考週生活科技；詳見原圖。':`另含 ${year===114?'10/9':'10/4'} 國際能力考試；詳見原圖。`,
  original:`./assets/exams/${year}/first-semester-exam1-g${grade}.jpg`,
  thumbnail:`./assets/exams/${year}/first-semester-exam1-g${grade}-thumb.jpg`,
  source:'家長整理提供；日期依原圖，未標示修訂日期者留空',
}))));
// 上學期第二次段考，額外提前考科依各年級原圖記錄。
examFiles.push(...[114,113].flatMap(year=>[7,8,9].map(grade=>({
  id:`${year}-first-exam2-g${grade}`,year:String(year),grade:String(grade),term:'上學期',exam:'第二次段考',
  date:year===114?'2025-12-01':'2024-11-25',end:year===114?'2025-12-02':'2024-11-26',
  revised:year===114?(grade===9?'2025-11-21':'2025-11-18'):null,
  note:grade===7?'':year===113?(grade===8?'另含 11/13 國文寫作；詳見原圖。':'另含 11/13 國文寫作、11/22 生物；詳見原圖。'):(grade===8?'另含 11/19 國文寫作；詳見原圖。':'另含 11/19 國文寫作、11/28 生物；原圖地理複習冊別標示待確認，請依當次公告確認。'),
  original:`./assets/exams/${year}/first-semester-exam2-g${grade}.jpg`,
  thumbnail:`./assets/exams/${year}/first-semester-exam2-g${grade}-thumb.jpg`,
  source:'家長整理提供；日期依原圖，未標示修訂日期者留空',
}))));
// 上學期第三次段考在學年度的次年一月舉行。
examFiles.push(...[114,113].flatMap(year=>[7,8,9].map(grade=>({
  id:`${year}-first-exam3-g${grade}`,year:String(year),grade:String(grade),term:'上學期',exam:'第三次段考',
  date:year===114?'2026-01-19':'2025-01-16',end:year===114?'2026-01-20':'2025-01-17',
  revised:year===114?'2026-01-03':null,
  note:year===113?({7:'另含 2025/1/10 國際能力；詳見原圖。',8:'另含 2024/12/30 國文寫作、2025/1/10 國際能力；詳見原圖。',9:'另含 2024/12/30 國文寫作、2025/1/15 生活科技；詳見原圖。'}[grade]):({7:'另含 2026/1/16 國際能力；詳見原圖。',8:'另含 2026/1/2 國文寫作、1/16 國際能力；詳見原圖。',9:'另含 2026/1/2 國文寫作、1/13 生活科技；詳見原圖。'}[grade]),
  original:`./assets/exams/${year}/first-semester-exam3-g${grade}.jpg`,
  thumbnail:`./assets/exams/${year}/first-semester-exam3-g${grade}-thumb.jpg`,
  source:'家長整理提供；日期依原圖，未標示修訂日期者留空',
}))));
// 國九下學期分班：原圖「升」為外考班，「直」為直升班。
examFiles.push(...[114,113].flatMap(year=>['7','8','9-external','9-direct'].map(variant=>({
  id:`${year}-second-exam1-g${variant}`,year:String(year),grade:variant[0],term:'下學期',exam:'第一次段考',
  track:variant==='9-external'?'外考班':variant==='9-direct'?'直升班':'',
  date:year===114?'2026-03-30':'2025-03-25',end:year===114?'2026-03-31':'2025-03-26',
  revised:year===114?'2026-03-18':null,
  note:variant[0]==='9'?`另含 ${year===114?'2026/3/17':'2025/3/19'} 國文寫作；詳見原圖。`:year===113?'另含 2025/3/21 國際能力；詳見原圖。':'',
  original:`./assets/exams/${year}/second-semester-exam1-g${variant}.jpg`,
  thumbnail:`./assets/exams/${year}/second-semester-exam1-g${variant}-thumb.jpg`,
  source:'家長整理提供；國九班別依整理者說明及原圖標示，修訂日期依落款',
}))));
examFiles.push(...[114,113].flatMap(year=>['7','8','9-external','9-direct'].map(variant=>({
  id:`${year}-second-exam2-g${variant}`,year:String(year),grade:variant[0],term:'下學期',exam:'第二次段考',
  track:variant==='9-external'?'外考班':variant==='9-direct'?'直升班':'',
  date:year===114?'2026-05-12':'2025-05-12',end:year===114?'2026-05-13':'2025-05-13',
  revised:year===114?'2026-04-28':null,
  note:year===113?`另含 2025/4/28 國文寫作${variant==='9-external'?'、5/9 地球科學':variant==='9-direct'?'、5/9 生活科技':''}；詳見原圖。`:`另含 2026/4/27 國文寫作${variant==='9-external'?'、5/7 地球科學':variant==='9-direct'?'、4/30 國際能力、5/7 生活科技':''}；詳見原圖。`,
  original:`./assets/exams/${year}/second-semester-exam2-g${variant}.jpg`,
  thumbnail:`./assets/exams/${year}/second-semester-exam2-g${variant}-thumb.jpg`,
  source:'家長整理提供；國九班別依整理者說明及原圖標示，修訂日期依落款',
}))));
examFiles.push(...[114,113].flatMap(year=>(year===113?['7','8','9-direct']:['7','8']).map(variant=>({
  id:`${year}-second-exam3-g${variant}`,year:String(year),grade:variant[0],term:'下學期',exam:'第三次段考',
  track:variant==='9-direct'?'直升班':'',
  date:year===114?'2026-06-29':'2025-06-26',end:year===114?'2026-06-30':'2025-06-27',
  revised:year===114?'2026-06-17':null,
  note:year===114?'另含 2026/6/11 國文寫作、6/26 國際能力；詳見原圖。':variant==='9-direct'?'另含 2025/6/20 國際能力、6/25 生物；詳見原圖。':'另含 2025/6/11 國文寫作、6/20 國際能力；詳見原圖。',
  original:`./assets/exams/${year}/second-semester-exam3-g${variant}.jpg`,
  thumbnail:`./assets/exams/${year}/second-semester-exam3-g${variant}-thumb.jpg`,
  source:'家長整理提供；日期及班別依原圖，未標示修訂日期者留空',
}))));
examFiles.sort((a,b)=>Number(b.year)-Number(a.year)||a.date.localeCompare(b.date)||Number(a.grade)-Number(b.grade));
