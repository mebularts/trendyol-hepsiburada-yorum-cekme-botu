// === Trendyol Yorum -> SQL (phpMyAdmin INSERT formatı) ===
// Trendyol ürün yorumları sayfasında (URL .../yorumlar) konsola yapıştırın.
(function () {
  const PRODUCT_ID = 51;
  const START_ID   = 754;
  const monthMap = {'Ocak':'01','Şubat':'02','Mart':'03','Nisan':'04','Mayıs':'05','Haziran':'06','Temmuz':'07','Ağustos':'08','Eylül':'09','Ekim':'10','Kasım':'11','Aralık':'12'};
  const sanitize = s => (s||'').replace(/\s+/g,' ').replace(/'/g,"''").trim();
  const toInsert = (id,p,a,c,d)=>"INSERT INTO `product_comments`(`id`,`product_id`,`author`,`comment`,`created_at`) VALUES ('"+id+"','"+p+"','"+a+"','"+c+"','"+d+"');";
  const randTime = ()=>{const h=Math.floor(Math.random()*10)+9,m=Math.floor(Math.random()*60),s=Math.floor(Math.random()*60);return String(h).padStart(2,'0')+':'+String(m).padStart(2,'0')+':'+String(s).padStart(2,'0')};
  const parseDate = el=>{
    if(!el) return '2025-01-01 '+randTime();
    const spans=el.querySelectorAll('span');
    if(spans.length>=3){
      const d=String(spans[0].textContent.trim()).padStart(2,'0');
      const mo=monthMap[spans[1].textContent.trim()]||'01';
      const y=spans[2].textContent.trim();
      return y+'-'+mo+'-'+d+' '+randTime();
    }
    return '2025-01-01 '+randTime();
  };
  const reviews=[];
  document.querySelectorAll('div.review').forEach(el=>{
    const a=sanitize(el.querySelector('div.name')?.textContent);
    const c=sanitize(el.querySelector('span.review-comment')?.textContent);
    const d=parseDate(el.querySelector('div.date'));
    if(a&&c) reviews.push({a:a,c:c,d:d});
  });
  // tekilleştir
  const seen=new Set(); const uniq=[];
  reviews.forEach(r=>{ const key=(r.a+'||'+r.c).toLowerCase(); if(!seen.has(key)){seen.add(key); uniq.push(r);} });
  let id=START_ID;
  const sql=uniq.map(r=>toInsert(id++,PRODUCT_ID,r.a,r.c,r.d)).join('\n');
  console.clear(); console.log(sql); if(navigator.clipboard) navigator.clipboard.writeText(sql);
})();
