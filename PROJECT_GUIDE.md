# 小鈴鐺資訊整合｜專案說明與維護指南

閱讀日期：2026-09-05。Repository：https://github.com/eilleenlan/lanbell 。網站：https://eilleenlan.github.io/lanbell/#/ 。本次 checkout 為 `main`，基準 commit `1b9bbd34ecb2c24c31a0c2bcfc63def8646271b5`。

## 專案定位與目前狀態

這是供國中家長與學生查找重要日期、考試、田野教育與校園活動的公開資訊網站，由家長自行整理，資訊以學校與導師最新公告為準。目前以國七、國八、國九為主，並沒有高中部完整功能。

目前有 92 筆活動、15 種已使用的小分類、8 筆暫定日期，日期涵蓋 2026-07-25 至 2027-02-11，資料更新標記為「2026年9月5日」。以上是程式資料盤點，未逐項向校方核實。依使用者確認，國九教育旅行為畢業旅行，已改列「重要日程 → 畢業」，備註包含「畢業旅行（畢旅）」供搜尋。

原生 HTML、CSS、JavaScript ES modules，沒有 React、Vite、package.json、npm 套件、後端、資料庫或登入系統。原 DESIGN.md 所述 React + Vite 已過時；README 所稱全部為示意資料也不符合現有活動資料。

## 檔案職責

| 檔案 | 職責 |
| --- | --- |
| index.html | HTML 入口、SEO／社群分享標籤、樣式與模組載入 |
| src/app.js | hash 路由、HTML 模板、篩選狀態、日期計算及事件綁定 |
| src/data.js | events、updatedAt、保留的課務／事務／公告資料 |
| src/styles.css | 全站字型、色彩、版面、行動導覽 |
| src/calendar.css | 搜尋、篩選、清單、考程表及來源圖片 |
| src/countdown.css | 倒數卡片與首頁配置覆寫，最後載入 |
| assets/og.png | 社群分享圖片 |
| assets/field-trips/ | 國七、國八、國九田教來源圖片 |
| .github/workflows/pages.yml | GitHub Pages 自動部署 |
| vercel.json | Vercel 的 noindex 回應 header 設定 |

app.js 匯入 data.js，render 根據 hash 與記憶體 state 產生 HTML，再綁定事件。沒有資料 API 或持續同步；重新整理會重設篩選，URL 只保存頁面路由。

## 使用者功能與實際行為

- `#/` 首頁：行程搜尋、會考倒數、未來 30 天內開始的考試及行事曆入口。會考日期在 app.js 另寫為 2027-05-15～2027-05-16，不在 events 內。考試清單不包含已開始但尚未結束的考試。
- `#/calendar` 行事曆：年級、校內／校外、大分類、小分類複選、包含已過期切換、考程與範圍展開、Google 日曆新增連結、田教來源圖片。
- `#/learning`、`#/affairs`、`#/notices` 有保留函式與部分骨架資料，但不在 routes 白名單，會回到首頁。首頁原有快速入口及異動按鈕也會被 render 移除。

首頁搜尋比對標題、備註、類別、大分類、推導地點、年級文字、日期；日期支援連字號、點或斜線形式的子字串。搜尋會開啟「包含已過期」，但不會清掉既有年級／分類，因此結果可能仍受舊篩選限制。點擊倒數考試則會清空條件並跳至活動。

行事曆預設隱藏已結束活動，以 end（無則 start）早於瀏覽器本機今天午夜判斷。指定年級也會包含 grades 空陣列的全體活動。未選分類等同全部；變更大分類會移除不適用小分類；結果依開始日、標題排序。

Google 日曆連結開啟預填新增頁，需使用者自行儲存，並非自動同步。使用全天事件，結束日轉為末日隔天。考程明細使用 schedule、examScope、reminders；目前國九第一次模擬考含詳細資料。只有 examScope 而無 schedule 時不會獨立顯示範圍表，科目名稱對不到時顯示「—」。

## 資料格式

| 欄位 | 格式／意義 |
| --- | --- |
| start | 必填，西元 YYYY-MM-DD |
| end | 選填，包含當天的最後日期，不可早於 start |
| category | 必填，需與 app.js 的 categoryGroups 配合 |
| grades | 必填，[] 表示國中部全體，或 [7]、[8,9] 等 |
| title | 必填，活動標題 |
| note | 選填，班別、修訂、報名資訊 |
| tentative | 選填布林值，true 顯示暫定 |
| schedule | 選填陣列，每筆含 date、time、subject 顯示字串 |
| examScope | 選填，如 [['數學','第 1～2 冊']] |
| reminders | 選填，提醒文字陣列 |

格式示例（非新增活動事實）：

```js
{ start:'2026-10-13', end:'2026-10-14', category:'考試-段考',
  grades:[7,8], title:'示例考試', note:'以正式公告為準', tentative:true }
```

大分類有重要日程、考試、家長參與、行政與其他。除已用的 15 種小分類，程式另保留「其他」。「畢業」歸於重要日程。新增類別須同步 categoryGroups，否則不會正確出現在小分類選項。目前沒有通用的逐筆來源欄位，需保留來源檔或補充維護紀錄。

## 本機工具與執行

本環境已有 Git 與 Node.js v24.19.0，不需安裝 npm、React、Vite 或 Python。必須以 HTTP 預覽，避免直接雙擊 HTML 導致 ES module 載入限制。本次交付的 outputs 內有與 lanbell 並列的 preview.mjs；在 outputs 目錄執行：

```sh
node preview.mjs
```

開啟 http://127.0.0.1:8000/#/ ，Ctrl+C 停止。此工具僅使用 Node.js 內建模組，提供 index.html、src 與 assets，不提供 Git metadata 或記憶文件。它未加入上游網站原始碼。

若電腦已有 Python，也可在 repository 根目錄執行 `python -m http.server 8000 --bind 127.0.0.1`。

本次 Git HTTPS helper 存在，但預設 exec path 缺失。在 PowerShell 該次 shell 設定後成功 clone：

```powershell
$env:GIT_EXEC_PATH = 'C:\Users\user\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\git\mingw64\bin'
```

此為本機位置，不適用所有電腦。跨沙箱使用者遇到 dubious ownership，本次以命令級 `git -c safe.directory=<repository絕對路徑> ...` 處理，沒有修改全域 Git 信任設定。

## 維護與部署

1. 確認來源、年級、西元日期及修訂；未確認日期設 tentative。
2. 修改 data.js，避免留下同一活動舊版本；同步 updatedAt。
3. 新學年另檢查 app.js 的 entranceExam、學期文字、來源說明及圖片。notices 可記錄異動，但目前公告頁未開放。
4. 新類別同步 categoryGroups；CSS 注意載入順序與 index.html 的版本參數。
5. 執行 `node --check src/app.js`、`node --check src/data.js`，再以 HTTP 檢查首頁搜尋、年級／分類、過期切換、考程與日曆連結。
6. 檢查 diff 與來源附件，再依工作需求提交與發布。

push main 或手動 workflow_dispatch 會執行 Pages workflow，直接上傳 repository 根目錄，沒有編譯步驟。GitHub Pages 需以 Actions 作為發布來源；本次未修改遠端設定、commit、push 或部署。相對資產路徑與 hash 路由適用 /lanbell/ 子目錄。

外部依賴為 Google Fonts 與使用者點擊的 Google Calendar 頁面。vercel.json 的 noindex header 僅適用 Vercel，不能視為 GitHub Pages 已生效。根目錄部署可能使 Markdown 文件公開，因此說明與記憶只能保存可公開資訊。

## 視覺與資料界線

目前是暖紙色背景 #f6f0e6、表面 #fffdf9、主藍色 #496a83、暖金棕 #b77943。使用 Noto Sans TC 與 Noto Serif TC，備援系統字型；行動版有折疊導覽、單欄配置及可捲動考程表格。

公開 repository 不加入學生姓名、班級名冊、成績、個人健康紀錄、個人聯絡方式、帳密、QR Code 或未整理群組對話。健康活動的公開日程與個人健康紀錄不同；附件也需檢查。

## 已知限制

- 地點目前由 category 推導：全民英檢為校外，其餘全部校內，包含田教；精確地點篩選需另增欄位。
- 倒數與過期使用本機日期，未固定台北時區，也無午夜自動更新計時器。
- 活動沒有穩定 ID，跳轉以陣列索引定位，不適合當永久識別碼。
- 多處資料直接插入 HTML，目前只應維護受信任人工資料；外部匯入需先處理 escaping。
- 附件只有三張田教來源圖，未建立所有活動的逐筆來源核對。
- 原始 repository 未附 LICENSE。

## 本次驗證

已核對 origin、main 與 commit，閱讀應用程式、資料、樣式及部署設定。app.js、data.js 語法檢查通過；92 筆資料的標題、開始日期格式與可解析性、日期順序、年級值基本檢查通過。本機預覽入口、兩個 JS、三份 CSS、四張圖片均回傳 HTTP 200，Git 設定與記憶文件回傳 404；git diff --check 通過。未進行完整瀏覽器互動回歸，也未向校方逐筆核實內容。
