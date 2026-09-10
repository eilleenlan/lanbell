export const uniformGroups=[
 {name:'女生',summer:[['短袖襯衫',600],['背心裙',2300],['運動短衫',500],['運動短褲',500],['薄運外套',1100],['薄運長褲',800],['帽子',350],['背包',900],['白襪',70],['童軍衫',250]],winter:[['長袖襯衫',700],['背心',1300],['百褶裙',2100],['西裝',2600],['運動長衫',700],['腰帶',300],['薄棉襪',140]]},
 {name:'男生',summer:[['短袖襯衫',600],['制服短褲',1100],['運動短衫',500],['運動短褲',500],['薄運外套',1100],['薄運長褲',800],['帽子',350],['背包',900],['白襪',70],['童軍衫',250],['皮帶',350]],winter:[['長袖襯衫',700],['毛背心',660],['冬制西褲',1800],['西裝',3600],['運動長衫',700]]}
];
const money=n=>n.toLocaleString('zh-TW');
const total=items=>items.reduce((sum,[,price])=>sum+price,0);
export function uniforms(){
 const table=(title,items)=>`<section class="uniform-season"><h3>${title}</h3><table><thead><tr><th scope="col">品項</th><th scope="col">配發數量</th><th scope="col">單價（元）</th></tr></thead><tbody>${items.map(([name,price])=>`<tr><th scope="row">${name}</th><td>1</td><td>${money(price)}</td></tr>`).join('')}</tbody><tfoot><tr><th scope="row">整套小計</th><td>${items.length}</td><td>${money(total(items))}</td></tr></tfoot></table></section>`;
 return `<header class="page-header"><span class="eyebrow">UNIFORM PRICE GUIDE</span><h1>校服品項與價格參考</h1><p>查詢單件價格，也了解新生整套配發的內容與費用。</p></header><section class="uniform-info"><h2>購買方式</h2><ul><li>新生註冊時可選擇購買整套，依下列表列數量配發。</li><li>不需整套者，可於開學後到校自行添購。</li><li>依本年度新生配發價目整理，據家長購買經驗，單件添購價格相同；實際售價以學校現場資訊為準。</li></ul><p>金額單位：新臺幣元｜整理日期：2026/9/10</p></section><div class="uniform-jump"><button type="button" data-uniform-target="uniform-girls">女生品項 ↓</button><button type="button" data-uniform-target="uniform-boys">男生品項 ↓</button></div>${uniformGroups.map((g,i)=>`<section class="uniform-group" id="uniform-${i?'boys':'girls'}"><header><h2>${g.name}校服</h2><p>夏冬季整套合計 <strong>NT$ ${money(total(g.summer)+total(g.winter))}</strong></p></header><div class="uniform-tables">${table('夏季品項',g.summer)}${table('冬季品項',g.winter)}</div></section>`).join('')}<p class="source-note">資料依家長提供的學校新生配發價目表整理；品名沿用原表。配發數量為整套內容，單件添購可依需求購買。</p>`;
}
