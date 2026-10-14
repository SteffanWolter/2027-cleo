/* Cleo Days GPS · Opt-in, local-only location, active only while the map is open.
 * OpenStreetMap anchors: Pool Bar & Restaurant (node 6746120116);
 * Hippo Kids Club (way 1068456810);
 * Cleopatra Beach Adult Only (way 420719057).
 * The hotel illustration is not georeferenced or to scale. Affine interpolation
 * between OSM references therefore provides APPROXIMATE location only.
 */
(()=>{
'use strict';
const KEY='cleo-location-when-map-open-v1';
const lat0=26.9864,lon0=33.9045,cos0=Math.cos(lat0*Math.PI/180);
const EARTH_LON=111320*cos0,EARTH_LAT=111320;
const $=s=>document.querySelector(s);
let enabled=false,watchId=null,latest=null,stage=null,world=null,marker=null,ring=null,toggle=null,status=null,active=false,blocked=false,awaiting=false,lastCenter=false;
try{enabled=localStorage.getItem(KEY)==='1'}catch{}
const map=()=>$('#ceMap');
const isOpen=()=>Boolean(map()&&!map().hidden&&!document.hidden);
const gpsSupported=()=>Boolean(navigator.geolocation && window.isSecureContext);
const toSchematic=(lat,lon)=>{
 const east=(lon-lon0)*EARTH_LON,north=(lat-lat0)*EARTH_LAT;
 return {x:0.921389548*east+0.53486615*north+603.328801,
         y:1.33091172*east-0.601258464*north+310.361409};
};
function statusText(text,warning=false){
 if(!status)return;
 status.textContent=text;
 status.hidden=!text;
 status.classList.toggle('warning',warning);
}
function updateButton(){
 if(!toggle)return;
 toggle.classList.toggle('on',enabled);
 toggle.setAttribute('aria-pressed',String(enabled));
 toggle.setAttribute('aria-label',enabled?'GPS auf der Karte deaktivieren':'GPS auf der Karte aktivieren');
 toggle.title=enabled?'GPS ist eingeschaltet · zum Deaktivieren tippen':'GPS einschalten';
 if(toggle.querySelector('span'))toggle.querySelector('span').textContent=enabled?'GPS an':'GPS aus';
}
function clearVisual(){
 if(marker)marker.hidden=true;
 if(ring)ring.hidden=true;
}
function suspend(){
 if(watchId!==null){try{navigator.geolocation.clearWatch(watchId)}catch{}watchId=null}
 awaiting=false;
 latest=null;
 clearVisual();
}
function showFix(position){
 if(!enabled||!isOpen())return;
 const {latitude,longitude,accuracy}=position.coords;
 if(![latitude,longitude,accuracy].every(Number.isFinite))return;
 latest={latitude,longitude,accuracy,time:position.timestamp||Date.now()};
 const p=toSchematic(latitude,longitude);
 // Never project faraway coordinates onto the resort plan.
 const inside=p.x>-100&&p.x<1100&&p.y>-100&&p.y<840;
 if(!inside){
  clearVisual();statusText('GPS aktiv · außerhalb des Kartenausschnitts · '+Math.round(accuracy)+' m Genauigkeit',true);
  return;
 }
 const v=window.CleoResort?.state()?.view||{};
 const rotated=Boolean(v.rotated),x=rotated?732-p.y:p.x,y=rotated?p.x:p.y;
 marker.style.left=x+'px';marker.style.top=y+'px';marker.hidden=false;
 ring.style.left=x+'px';ring.style.top=y+'px';
 // Ring is a visual approximation, not a navigationally accurate boundary.
 const radius=Math.min(300,Math.max(15,accuracy*1.15));
 ring.style.width=(2*radius)+'px';ring.style.height=(2*radius)+'px';ring.hidden=false;
 const stale=Date.now()-latest.time>120000;
 statusText((stale?'Letztes GPS-Signal':'GPS aktiv')+' · ±'+Math.round(accuracy)+' m · Position auf der Illustration ungefähr'+(accuracy>80?' · schwaches Signal':''),accuracy>80||stale);
 if(!lastCenter&&isOpen()&&v.z&&accuracy<65){
  lastCenter=true;
  // Do not override the existing map controls or map orientation.
  const gpsButton=toggle;
  gpsButton?.classList.add('has-fix');
 }
}
function onError(error){
 if(!enabled||!isOpen())return;
 clearVisual();
 if(error.code===1){blocked=true;statusText('Standortzugriff blockiert · Browser-Berechtigung für diese Seite erlauben',true);suspend()}
 else if(error.code===2)statusText('GPS-Signal nicht verfügbar · Standortdienste prüfen',true);
 else statusText('Warte auf besseres GPS-Signal · unter freiem Himmel erneut versuchen',true);
}
function start(){
 if(!enabled||!isOpen())return;
 updateButton();
 if(!gpsSupported()){statusText('GPS benötigt Chrome/Android mit HTTPS und Standortfreigabe',true);return}
 if(blocked){statusText('Standortberechtigung im Browser freigeben; GPS aus- und wieder einschalten',true);return}
 if(watchId!==null||awaiting)return;
 awaiting=true;
 statusText('Standort wird ermittelt …');
 try {
  watchId=navigator.geolocation.watchPosition(
   p=>{awaiting=false;showFix(p)},
   e=>{awaiting=false;onError(e)},
   {enableHighAccuracy:true,maximumAge:5000,timeout:20000}
  );
 }catch(e){awaiting=false;watchId=null;statusText('GPS nicht verfügbar: Browser-Berechtigung prüfen',true)}
}
function refresh(){
 active=isOpen();
 updateButton();
 if(!enabled||!active){
  suspend();if(status)status.hidden=true;
  return;
 }
 if(status)status.hidden=false;
 start();
 if(latest)showFix({coords:{latitude:latest.latitude,longitude:latest.longitude,accuracy:latest.accuracy},timestamp:latest.time});
}
function mount(){
 stage=$('#ceStage');world=$('#ceWorld');
 const controls=$('#ceMap .ce-map-controls');
 if(!stage||!world||!controls)return;
 if($('#ceGpsButton'))return;
 toggle=document.createElement('button');
 toggle.id='ceGpsButton';toggle.type='button';toggle.className='ce-icon-button';
 toggle.dataset.gpsToggle='1';
 toggle.setAttribute('aria-pressed',String(enabled));
 toggle.innerHTML='<svg class="ce-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3" fill="currentColor" stroke="none"/><path d="M12 1v3m0 16v3M1 12h3m16 0h3"/></svg><span class="ce-gps-button-caption">GPS aus</span>';
 controls.insertAdjacentElement('afterbegin',toggle);
 const tools=$('#ceMap .ce-map-tools');
 status=document.createElement('div');
 status.id='ceGpsStatus';status.setAttribute('role','status');status.setAttribute('aria-live','polite');
 status.hidden=true;status.textContent='';
 tools?.appendChild(status);
 ring=document.createElement('div');ring.className='ce-gps-accuracy';ring.hidden=true;
 marker=document.createElement('button');marker.type='button';marker.id='ceGpsMarker';marker.hidden=true;
 marker.setAttribute('aria-label','Ungefährer eigener Standort laut GPS');marker.title='GPS-Punkt auf einer schematischen Hotelkarte: ungefähr';
 marker.innerHTML='<span class="ce-gps-halo"></span><span class="ce-gps-dot"></span>';
 world.append(ring,marker);
 toggle.addEventListener('click',()=>{
  enabled=!enabled;
  blocked=false;
  lastCenter=false;
  try{localStorage.setItem(KEY,enabled?'1':'0')}catch{}
  refresh();
 });
 marker.addEventListener('click',()=>{
  if(latest)statusText('Aktuelle GPS-Genauigkeit: ±'+Math.round(latest.accuracy)+' m. Hotelplan ist nicht maßstabsgetreu.',false);
 });
 new MutationObserver(refresh).observe(map(),{attributes:true,attributeFilter:['hidden']});
 document.addEventListener('visibilitychange',refresh);
 addEventListener('pagehide',suspend);
 addEventListener('pageshow',refresh);
 updateButton();refresh();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
// Test/debug interface without exposing private GPS coordinates or storing fixes.
window.CleoGPS={enabled:()=>enabled,active:()=>watchId!==null,isMapOpen:isOpen,project:toSchematic,refresh,stop:suspend,version:'2026-10-14'};
})();