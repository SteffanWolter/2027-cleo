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