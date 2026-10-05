# 小學站學段切換交接包

日期：2026-10-05。最新版本為可愛版：標題「逛逛小鈴鐺」，入口「🔔 小學鈴噹／🔔 國中鈴鐺」，目前學段下方顯示「你在這裡」。請將本文件交給小學網站的協作者。

此可愛版已由使用者確認。小學站請將「你在這裡」放在小學標籤下方，國中標籤作為連結；順序固定為小學、國中。這些是切換入口的文字，不要求更名小學網站。

## 可直接使用的工作指示

請先閱讀小學專案自己的協作指南與原始碼，再比照國中站加入全站共用的「切換學段」入口。保留小學站現有名稱、架構與視覺風格，不需要搬移或合併兩站資料。這系列是家長整理的非官方資訊網站；網站名稱、導覽、標誌及分享文字不要加入學校名稱、校徽，也不要出現「薇中」。

已確認的網址：

| 學段 | 網址 | 小學站上的行為 |
| --- | --- | --- |
| 小學 | https://eilleenlan.github.io/lanbell-elementary-pages/#/ | 顯示「🔔 小學鈴噹」及下方「你在這裡」，不可點擊 |
| 國中 | https://eilleenlan.github.io/lanbell/#/ | 顯示「🔔 國中鈴鐺」，點擊在同一分頁前往 |

高中尚未提供網址，先不顯示高中入口，也不放空連結。未來高中完成再同步新增三站入口。

## 國中站已完成的規格

- 原站名保留「小鈴鐺資訊整合（中學）」，學段切換使用「國中」。
- 位置：共用頁首下方、非官方提醒上方，與首頁／行事曆等站內導覽分開。
- 桌機、手機皆直接顯示「逛逛小鈴鐺　🔔 小學鈴噹　🔔 國中鈴鐺〔你在這裡〕」，不需要先打開手機選單。
- 目前學段以實心主色及「你在這裡」文字標示，使用非連結元素和 aria-current="true"，不只靠顏色區別。
- 其他學段使用一般連結，可鍵盤操作，有明確焦點樣式；點擊在同一分頁前往，瀏覽器上一頁可返回。
- 每個入口至少 52px 高，窄螢幕允許換行；切換列不固定，不增加原有固定頁首高度。
- 手機 600px 以下「逛逛小鈴鐺」獨立一行，兩個膠囊標籤在下一行。標籤寬度隨內容，鈴鐺圖案隱藏於輔助閱讀語意；目前學段的名稱與「你在這裡」上下排列。
- 國中站既有非官方提醒保留於全站導覽下方及頁尾：「非官方網站，純屬家長交流參考，一切資訊以學校最新公告為準」。小學站若已有等義聲明可保留。
- 只改導覽及樣式；活動、年級、分類、來源與資料 updatedAt 均未變更。

## 小學站參考 HTML

請放進小學站的共用版面，勿只加在首頁。依小學技術架構調整語法：

```html
<div class="school-level-switch" role="navigation" aria-label="切換學段">
  <span class="school-level-label">逛逛小鈴鐺</span>
  <span class="school-level-current" aria-current="true">
    <span><span aria-hidden="true">🔔</span> 小學鈴噹</span>
    <span class="school-level-hint">你在這裡</span>
  </span>
  <a href="https://eilleenlan.github.io/lanbell/#/" aria-label="前往國中資訊網站"><span aria-hidden="true">🔔</span><span>國中鈴鐺</span></a>
</div>
```

國中站採 div + role="navigation"，因為既有全域 nav 樣式與手機選單程式直接選取 nav。小學站可使用自己的導覽元件，但要避免被站內選單樣式或切換程式誤選。

## 參考 CSS

以下是獨立可用的範例；小學站可換成既有主色與字體。

```css
.school-level-switch {
  display: flex; align-items: center; flex-wrap: wrap; gap: 10px;
  padding: 12px 16px; background: #fffdf9;
  border-bottom: 1px solid #ddd2c3; font-size: 14px;
}
.school-level-label { color: #b77943; font-size: 13px; font-weight: 700; margin-right: 6px; }
.school-level-switch > a, .school-level-current {
  display: inline-flex; align-items: center; justify-content: center; gap: 6px;
  box-sizing: border-box; min-height: 52px; padding: 8px 18px;
  border: 1px solid #ddd2c3; border-radius: 999px;
  font-weight: 700; line-height: 1.5;
}
.school-level-switch > a { background: #fff7e8; color: #496a83; text-decoration: none; }
.school-level-switch > a:hover { background: #eff2f0; border-color: #496a83; }
.school-level-switch > a:focus-visible { outline: 3px solid #b77943; outline-offset: 3px; }
.school-level-current { flex-direction: column; gap: 1px; background: #496a83; border-color: #496a83; color: white; }
.school-level-hint { font-size: 11px; font-weight: 500; line-height: 1.4; }
@media (max-width: 600px) {
  .school-level-switch { padding: 10px 16px; gap: 6px; }
  .school-level-label { width: 100%; margin-right: 0; }
  .school-level-switch > a, .school-level-current { padding: 8px 12px; }
}
```

國中實作位置為 src/app.js 的共用 render、src/styles.css 的 school-level 樣式；index.html 已更新 CSS／JS 快取版本參數。

預覽截圖：桌機 [1280.png](outputs/school-level/1280.png)、手機 [375.png](outputs/school-level/375.png) 及 [320.png](outputs/school-level/320.png)。交接時可將本文件與這三張圖一起提供；只提供本文件也足以實作。

## 驗收與交付

1. 小學每個正式頁面都有入口；目前學段顯示小學，國中連結網址完整包含 /lanbell/#/。
2. 手機 320px、375px 與桌機寬度沒有切換列水平溢出，不干擾手機選單與原固定導覽。
3. Tab 能聚焦國中連結且焦點可見；目前學段不會被當作按鈕。
4. 核對實際往返小學／國中網站，瀏覽器上一頁可返回。
5. 檢查名稱與非官方說明，更新小學站自己的維護文件及快取版本。
6. 完成後回報變更檔案、驗證結果及是否發布。國中此次僅完成本地修改，發布需另處理；本交接包不要求自行發布。

本次未能透過網頁讀取工具確認小學站實際版面，因此上述是共同功能規格，不是對小學現有程式的假設。國中實際驗證結果見 PROJECT_GUIDE.md 的 2026-10-05 記錄。
