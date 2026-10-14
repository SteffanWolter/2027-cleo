/* Cleo Days · prompt and safe auto-refresh for installed PWAs.
   Online: check on launch, focus, reconnect, and every five minutes.
   Offline: keep cached app usable and update at next successful check.
   No analytics, no forced refresh while a form or dialog is in use. */
(()=>{
'use strict';
const current=document.querySelector('meta[name="cleo-app-version"]')?.content||'';
const VERSION='./app-version.json';
let checking=false,pending=false,lastCheck=0,reloaded=false,notification=null;
let lastKnown=!!navigator.serviceWorker?.controller;
function editing(){
 const active=document.activeElement;
 return !!(document.querySelector('dialog[open]')||
   (active&&(
      active.isContentEditable||
      active.matches?.('textarea,input:not([type="checkbox"]):not([type="radio"]),select')
   )));
}
function banner(){
 if(notification)return notification;
 const bar=document.createElement('div');
 bar.id='cleoUpdateBanner';bar.setAttribute('role','status');bar.setAttribute('aria-live','polite');
 bar.innerHTML='<span class="up-symbol" aria-hidden="true">↻</span><span class="up-label"><strong>Neue Cleo-Days-Version</strong><small>Das Hotelprogramm wurde aktualisiert.</small></span><button type="button" id="cleoUpdateNow">Aktualisieren</button>';
 const css=document.createElement('style');
 css.textContent='#cleoUpdateBanner{position:fixed;z-index:2000;bottom:calc(88px + env(safe-area-inset-bottom));left:50%;transform:translateX(-50%);display:flex;align-items:center;gap:11px;max-width:calc(100vw - 28px);width:min(460px,calc(100vw - 28px));padding:12px 13px;border-radius:17px;background:#233b3e;color:#f7fafa;box-shadow:0 14px 38px #142b3266;font-family:system-ui,-apple-system,sans-serif}.up-symbol{flex:none;width:32px;height:32px;display:grid;place-items:center;border-radius:11px;background:#415c60;font-size:22px}#cleoUpdateBanner .up-label{flex:1;min-width:0}#cleoUpdateBanner strong{display:block;font-size:12px}#cleoUpdateBanner small{display:block;font-size:10px;color:#bfccd0;margin-top:3px}#cleoUpdateBanner button{border:0;min-height:40px;border-radius:11px;padding:8px 11px;background:#dcf0e7;color:#27564e;font-weight:730;font-size:12px;flex:none}#cleoUpdateBanner button:focus-visible{outline:3px solid #ade8d9;outline-offset:2px}@media(min-width:781px){#cleoUpdateBanner{bottom:30px}}';
 document.head.append(css);document.body.append(bar);
 document.getElementById('cleoUpdateNow').addEventListener('click',()=>{
   // User explicitly asked for the reload. Persisted notes/favorites survive.
   safeRefresh(true);
 });
 notification=bar;return bar;
}
function safeRefresh(force=false){
 if(reloaded)return;
 if(!force&&editing()){banner();return}
 reloaded=true;
 const now=new URL(location.href);
 now.searchParams.delete('_cleoUpdate');
 try{sessionStorage.setItem('cleo-last-reload',current+'@'+Date.now())}catch{}
 location.replace(now.href);
}
function updateReady(){
 pending=true;
 if(editing())banner();
 else safeRefresh();
}
async function check(force=false){
 if(checking||!navigator.onLine||document.hidden)return;
 if(!force&&Date.now()-lastCheck<20_000)return;
 lastCheck=Date.now();checking=true;
 try{
  const res=await fetch(VERSION+'?ts='+Date.now(),{cache:'no-store',redirect:'follow'});
  if(!res.ok)throw Error('version unavailable');
  const data=await res.json();
  if(data.version && current && data.version!==current){
   try{const reg=await navigator.serviceWorker?.getRegistration?.();await reg?.update?.()}catch{}
   updateReady();
  }else{
   const reg=await navigator.serviceWorker?.getRegistration?.();
   if(reg?.waiting && lastKnown){try{reg.waiting.postMessage({type:'SKIP_WAITING'})}catch{}}
  }
 }catch{
  // Can't check at the moment. Don't interrupt offline trips.
 }finally{checking=false}
}
if('serviceWorker' in navigator){
 navigator.serviceWorker.addEventListener('controllerchange',()=>{
  if(lastKnown)updateReady();
  lastKnown=true;
 });
}
addEventListener('focus',()=>check(true));
addEventListener('online',()=>check(true));
document.addEventListener('visibilitychange',()=>{if(!document.hidden)check(true)});
setInterval(()=>check(),5*60*1000);
setTimeout(()=>check(true),1400);
// Expose only diagnostic information without personal data.
window.CleoAppUpdates={check:()=>check(true),version:current,isWaiting:()=>pending};
})();
