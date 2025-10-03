// === Hepsiburada Yorum -> SQL (phpMyAdmin INSERT formatı) ===
// Hepsiburada ürün yorum sayfasında konsola yapıştırın.
(function () {
  const PRODUCT_ID = 51;
  const START_ID   = 754;
  const monthMap = {'Ocak':'01','Şubat':'02','Mart':'03','Nisan':'04','Mayıs':'05','Haziran':'06','Temmuz':'07','Ağustos':'08','Eylül':'09','Ekim':'10','Kasım':'11','Aralık':'12'};
  const sanitize = s => (s||'').replace(/\s+/g,' ').replace(/'/g,"''").trim();
  const toInsert = (id,p,a,c,d)=>"INSERT INTO `product_comments`(`id`,`product_id`,`author`,`comment`,`created_at`) VALUES ('"+id+"','"+p+"','"+a+"','"+c+"','"+d+"');";
  const randTime = ()=>{const h=Math.floor(Math.random()*10)+9,m=Math.floor(Math.random()*60),s=Math.floor(Math.random()*60);return String(h).padStart(2,'0')+':'+String(m).padStart(2,'0')+':'+String(s).padStart(2,'0')};
  const parseDateText = t=>{const m=(t||'').trim().match(/(\d{1,2})\s+([A-Za-zÇĞİÖŞÜçğıöşü]+)\s+(\d{4})/); if(m){const d=String(m[1]).padStart(2,'0'); const mo=monthMap[m[2]]||'01'; const y=m[3]; return y+'-'+mo+'-'+d+' '+randTime();} return '2025-01-01 '+randTime();};
  const cards=document.querySelectorAll('div[class*="hermes-ReviewCard-module-"]');
  const rows=[];
  cards.forEach(card=>{
    let d=null; const ds=card.querySelector('span[content^="20"]'); d=ds?(ds.getAttribute('content')+' '+randTime()):parseDateText(card.textContent);
    let a=card.querySelector('span[class*="ooww"]')?.textContent || card.querySelector('strong[data-testid="title"]')?.textContent || '';
    let c=card.querySelector('div[class*="KaU17"] span')?.textContent || card.querySelector('span[style*="text-align:start"]')?.textContent || '';
    a=sanitize(a); c=sanitize(c); if(a&&c) rows.push({a:a,c:c,d:d});
  });
  const seen=new Set(); const uniq=[]; rows.forEach(r=>{const k=(r.a+'||'+r.c).toLowerCase(); if(!seen.has(k)){seen.add(k); uniq.push(r);}});
  let id=START_ID; const sql=uniq.map(r=>toInsert(id++,PRODUCT_ID,r.a,r.c,r.d)).join('\n');
  console.clear(); console.log(sql); if(navigator.clipboard) navigator.clipboard.writeText(sql);
})();
