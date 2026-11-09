export const uniformGroups=[
  {
    "name": "女生",
    "bundleSupplyNames": [
      "帽子",
      "背包",
      "白襪",
      "童軍椅"
    ],
    "summer": [
      "短袖襯衫",
      "背心裙",
      "運動短衫",
      "運動短褲",
      "薄運外套",
      "薄運長褲"
    ],
    "winter": [
      "長袖襯衫",
      "背心",
      "百褶裙",
      "西裝",
      "運動長衫",
      "腰帶",
      "薄棉襪"
    ]
  },
  {
    "name": "男生",
    "bundleSupplyNames": [
      "帽子",
      "背包",
      "白襪",
      "童軍椅"
    ],
    "summer": [
      "短袖襯衫",
      "制服短褲",
      "運動短衫",
      "運動短褲",
      "薄運外套",
      "薄運長褲",
      "皮帶"
    ],
    "winter": [
      "長袖襯衫",
      "毛背心",
      "冬制西褲",
      "西裝",
      "運動長衫"
    ]
  }
];
export const schoolSupplies=["帽子","背包","手提袋","白襪","童軍椅"];
export const additionalWinterItems=["厚運外套","冬季厚體褲","帽T"];
export function uniforms(){
 const table=(title,items,extra=[])=>'<section class="uniform-season"><h3>'+title+'</h3><table><thead><tr><th>品項</th><th>配發數量</th></tr></thead><tbody>'+items.map(name=>'<tr><th scope="row">'+name+'</th><td>1</td></tr>').join('')+extra.map(name=>'<tr><th scope="row">'+name+'（另補充品項）</th><td>—</td></tr>').join('')+'</tbody></table></section>';
 return '<header class="page-header"><span class="eyebrow">UNIFORM GUIDE</span><h1>校服品項參考</h1><p>價格資訊暫停公開，保留品項與一般購買資訊供參考。</p></header><section class="uniform-info"><h2>購買方式</h2><ul><li>新生註冊時可選擇購買整套；校服與學用品分區列出。</li><li>不需整套者，可於開學後到校自行添購。</li></ul></section><div class="uniform-jump"><button type="button" data-uniform-target="uniform-girls">女生品項 ↓</button><button type="button" data-uniform-target="uniform-boys">男生品項 ↓</button><button type="button" data-uniform-target="school-supplies">學用品 ↓</button></div>'+uniformGroups.map((g,i)=>'<section class="uniform-group" id="uniform-'+(i?'boys':'girls')+'"><header><h2>'+g.name+'校服</h2><p class="source-note">原整套含校服及'+g.bundleSupplyNames.join('、')+'各 1 件；手提袋與另補充冬季品項不計入原整套。</p></header><div class="uniform-tables">'+table('夏季品項',g.summer)+table('冬季品項',g.winter,additionalWinterItems)+'</div></section>').join('')+'<section class="uniform-group" id="school-supplies"><header><h2>學用品（男女生共用）</h2></header><section class="uniform-season"><table><thead><tr><th>品項</th></tr></thead><tbody>'+schoolSupplies.map(name=>'<tr><th scope="row">'+name+'</th></tr>').join('')+'</tbody></table><p class="source-note">帽子、背包、白襪、童軍椅為原男女生整套內含品項；手提袋為另補充品項。</p></section></section><p class="source-note">配發數量為整套內容，單件添購可依需求購買。厚運外套、冬季厚體褲及帽T為另補充品項，男女通用，不計入原整套。</p>';
}
