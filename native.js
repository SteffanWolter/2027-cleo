'use strict';
/* Cleo Days Android PWA platform adaptations; no tracking or external services */
(()=>{
let installPrompt=null;const q=s=>document.querySelector(s);
const standalone=()=>matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
function setupInstall(){
 if(standalone()||q('#installCleo'))return;
 const top=q('.top-actions');if(!top)return;
 const b=document.createElement('button');b.id='installCleo';b.type='button';b.hidden=true;
 b.setAttribute('aria-label','Cleo Days als App installieren');
 b.innerHTML='<svg class="icon" aria-hidden="true"><use href="#i-download"/></svg><span>App</span>';
 top.insertBefore(b,top.firstChild);
 b.addEventListener('click',async()=>{
   if(installPrompt){const p=installPrompt;installPrompt=null;b.hidden=true;await p.prompt();try{await p.userChoice}catch(_){}}
   else alert('In Chrome über das Menü „App installieren“ oder „Zum Startbildschirm hinzufügen“ auswählen.');
 });
 addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e;b.hidden=false;});
 addEventListener('appinstalled',()=>{installPrompt=null;b.hidden=true;});
}
function centerDay(){const s=q('.date-strip'),a=s?.querySelector('.day-pill.active');if(s&&a){s.scrollLeft=Math.max(0,a.offsetLeft-s.offsetLeft-(s.clientWidth-a.clientWidth)/2)}}
function boot(){document.documentElement.classList.toggle('installed-pwa',standalone());setupInstall();setTimeout(centerDay,90)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
document.addEventListener('click',e=>{
 if(e.target.closest?.('.day-pill')&&innerWidth<781)setTimeout(centerDay,50);
 if(e.target.closest?.('[data-fav]')&&navigator.vibrate&&!matchMedia('(prefers-reduced-motion: reduce)').matches){try{navigator.vibrate(8)}catch(_){}}
});
})();

/* Editorial polish: consistent Lucide-style iconography and useful date-led hero. */
(()=>{
 const symbols={
  home:'<path d="m3 10 9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
  calendar:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>',
  fork:'<path d="M4 3v7a4 4 0 0 0 8 0V3M8 3v19M16 2v9h5V2h-5zM18.5 11v11"/>',
  compass:'<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
  star:'<path d="m12 3 2.8 5.9 6.5.9-4.7 4.6 1.1 6.5-5.7-3-5.7 3 1.1-6.5L2.7 9.8l6.5-.9z"/>',
  menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  pin:'<path d="M20 10c0 5.5-8 12-8 12S4 15.5 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  check:'<path d="m20 6-11 11-5-5"/>',
  'up-right':'<path d="M7 17 17 7M7 7h10v10"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  close:'<path d="M18 6 6 18M6 6l12 12"/>',
  download:'<path d="M12 3v12m-5-5 5 5 5-5M5 18v3h14v-3"/>',
  waves:'<path d="M2 8c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 5-2M2 15c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 5-2"/>',
  photo:'<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'
 };
 function upgradeIcons(){
  for(const [id,markup] of Object.entries(symbols)){
   const el=document.getElementById('i-'+id);
   if(el&&el.innerHTML!==markup)el.innerHTML=markup;
  }
 }
 function editorialHero(){
  const hero=document.querySelector('#main .hero');
  if(!hero)return;
  const active=document.querySelector('#main .day-pill.active');
  const date=active?.dataset.date;
  if(!date||hero.dataset.editorialDate===date)return;
  const d=new Date(date+'T12:00:00Z');
  if(Number.isNaN(+d))return;
  const weekday=new Intl.DateTimeFormat('de-DE',{weekday:'long',timeZone:'UTC'}).format(d);
  const month=new Intl.DateTimeFormat('de-DE',{month:'long',timeZone:'UTC'}).format(d);
  const day=d.getUTCDate();
  const title=hero.querySelector('h1'),subtitle=hero.querySelector('p'),eyebrow=hero.querySelector('.eyebrow');
  if(title){title.textContent='';title.append(document.createTextNode(weekday+','),document.createElement('br'));const em=document.createElement('em');em.textContent=day+'. '+month+'.';title.append(em)}
  if(eyebrow)eyebrow.textContent='DEIN TAG · CLEOPATRA MAKADI BAY';
  if(subtitle)subtitle.textContent='Restaurants, Aktivitäten und Abendprogramm – alles Wichtige für euren Tag.';
  hero.dataset.editorialDate=date;
 }
 function start(){
  upgradeIcons(); editorialHero();
  const root=document.getElementById('main');
  if(root)new MutationObserver(()=>editorialHero()).observe(root,{childList:true});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
