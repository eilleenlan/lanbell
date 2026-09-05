# lanbell 專案記憶

更新：2026-09-05。這是後續協作可讀的檔案記憶，不代表帳號層級永久記憶。

- 使用者澄清只有一個 repository，「兩個」是手誤。
- 上游：https://github.com/eilleenlan/lanbell；網站：https://eilleenlan.github.io/lanbell/#/。
- 本次 clone main，基準 1b9bbd34ecb2c24c31a0c2bcfc63def8646271b5；本地位於本次工作區 outputs/lanbell，保留 .git 與 origin。
- 任務：下載、補足必要工具、閱讀、產生繁體中文說明及記憶。
- 原生 HTML/CSS/JavaScript ES modules；沒有 React/Vite/npm 建置、後端或資料庫。
- Git 與 Node 已存在，修正當次 Git helper 路徑後 clone；無需新增套件。
- data.js 管資料；app.js 管路由與互動；三份 CSS 順序見 index.html。
- 正式路由只有首頁與行事曆，learning/affairs/notices 尚未開放。
- 初次閱讀有 92 筆活動、8 筆暫定，日期 2026-07-25～2027-02-11；updatedAt 為 2026年9月3日。後續需重新核對這些數字。
- grades:[] 表國中部全體；end 包含末日；Google 日曆末日加一天。
- 會考日期另在 app.js，換學年不能只改 data.js。
- 校外判斷目前只有全民英檢，連田教都被判校內，是既有限制。
- 維持繁體中文及暖紙色、主藍色、暖金配色；不得保存學生個資、憑證、私人健康紀錄。
- push main 會觸發 Pages 部署；本次僅本地說明及預覽工具，未 commit、push、部署。
- 完整欄位、行為、更新流程與限制見 PROJECT_GUIDE.md。
- 2026-09-05：依使用者確認，國九教育旅行即畢業旅行；改列「重要日程 → 畢業」，備註加入「國九畢業旅行（畢旅）」，保留原日期與修訂說明。updatedAt 更新為 2026年9月5日，已使用小分類增為 15 種。

- 2026-09-05：行事曆新增即時搜尋欄，沿用既有關鍵字比對；輸入時只更新清單與筆數，保留焦點及中文組字。搜尋與年級、地點、大小分類、過期條件並用，清除搜尋只清空關鍵字。
