// 原圖由整理者提供；暑測依檔案標示歸入同號學年度。
export const examFiles=[115,114].flatMap(year=>[7,8,9].map(grade=>({
  id:`${year}-summer-g${grade}`,year:String(year),grade:String(grade),term:'暑期',exam:'暑期學科競賽',
  date:year===115?'2026-08-21':'2025-08-22',
  revised:year===115?'2026-08-03':'2025-07-31',
  original:`./assets/exams/${year}/summer-g${grade}.jpg`,
  thumbnail:`./assets/exams/${year}/summer-g${grade}-thumb.jpg`,
  source:'家長整理提供；修訂日期依原圖落款',
})));
