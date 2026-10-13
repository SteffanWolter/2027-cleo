/* Restaurant plan: photographed October Soko board + hotel statements of 28 May and 6 September 2026. No claimed live feed. */
(()=>{
'use strict';
const A=window.CleoDays;if(!A?.data)return;
const urls={
 hotel:'https://www.cleopatraluxuryhotels.com/hotel/cleopatra-luxury-resort-makadi-bay-adults-only/dining/waterfront-restaurant/',
 weekly:'https://www.holidaycheck.de/had/antworten-cleopatra-luxury-beach-resort-makadi-bay-adults-only/9c59f168-1c6c-44b8-a716-89bc5514f9f3',
 themes:'https://www.holidaycheck.de/ha/fragen-cleopatra-luxury-beach-resort-makadi-bay-adults-only/2a32543d-6ecc-4ceb-a52e-b200e623580d',
 soko:'https://www.cleopatraluxuryhotels.com/hotel/cleopatra-luxury-resort-makadi-bay/dining/soko-main-restaurant/',
 vista:'https://www.cleopatraluxuryhotels.com/hotel/cleopatra-luxury-resort-makadi-bay/dining/vista-mare-restaurant/',
 pool:'https://www.cleopatraluxuryhotels.com/hotel/cleopatra-luxury-resort-makadi-bay/dining/pool-restaurant-bar/'
};
const esc=t=>String(t??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const dateLabel=d=>new Intl.DateTimeFormat('de-DE',{weekday:'long',day:'numeric',month:'long',timeZone:'UTC'}).format(new Date(d+'T12:00:00Z'));
const selected=()=>A.getSelected();
function daily(date){
 const day=new Date(date+'T12:00:00Z').getUTCDay();
 const wf=day===2?{name:'Arabian Night · 1001 Nacht',description:'Orientalisches Themenbuffet. Dienstags gibt es laut Hotel anstelle der ergänzenden À-la-carte-Auswahl das Arabian Night Buffet.',tag:'Dienstag · vom Hotel bestätigt'}:
 day===5?{name:'Fish & BBQ Night',description:'Freitags Fisch- und Grillbuffet im Waterfront. Nicht mit dem kostenpflichtigen Strand-BBQ des Familienresorts verwechseln.',tag:'Freitag · vom Hotel bestätigt'}:
 day===0?{name:'Gala-Dinner',description:'Sonntags festliches Themenbuffet mit besonderem Unterhaltungsprogramm. Ein Black-&-White-Dresscode speziell für diesen Waterfront-Abend ist nicht bestätigt.',tag:'Sonntag · vom Hotel bestätigt'}:
 {name:'Wechselndes Themenbuffet',description:'Das Hotel bestätigt ein täglich wechselndes Abendbuffet und zusätzlich À-la-carte-Menüs an diesen Abenden. Das konkrete heutige Motto ist nicht veröffentlicht.',tag:'Konkretes Motto nicht veröffentlicht'};
 return [
 {id:'waterfront',name:'Waterfront',title:wf.name,description:wf.description,tag:wf.tag,location:'Waterfront · Adults Only',map:'19',time:null,food:'Offenes Buffet; an anderen Tagen auch À-la-carte-Menüs.',included:'Laut eurer Bestätigung im bezahlten Adults-Only-Upgrade enthalten.',sources:[urls.hotel,urls.weekly,urls.themes]},
 {id:'soko',name:'Soko',title:(A.data.dinner[date]||'Themenbuffet')+' · Abendbuffet',description:'Internationales Abendbuffet und Live-Cooking. Das genaue heutige Motto stammt aus dem Oktober-Aushang, nicht aus einem Live-Feed.',tag:'Monatsplan Oktober 2026',location:'Soko-Hauptrestaurant',map:'3',time:'18:30–21:30',food:'Buffet mit wechselnden Themen; konkrete Gerichte nicht veröffentlicht.',included:'All Inclusive; reguläres Buffet ohne Reservierung.',sources:[urls.soko]},
 {id:'vista',name:'Vista Mare',title:'Italienisch · À la carte',description:'Italienisches Abendessen. Ein Besuch pro Zimmer ab sieben Nächten laut Hotelkonzept inklusive, mit Reservierung.',tag:'Reservierung erforderlich',location:'Vista Mare',map:'2',time:'18:30–21:30',food:'Italienische Speisen; tagesaktuelle Karte nicht veröffentlicht.',included:'Ein Restaurantbesuch nach vorheriger Reservierung inklusive.',sources:[urls.vista]},
 {id:'pool',name:'Pool Restaurant',title:'Fisch & Meeresfrüchte',description:'Fisch-À-la-carte-Restaurant. Verschiedene Anbieter nennen unterschiedliche Öffnungstage; deshalb die Verfügbarkeit für den gewählten Abend bei Guest Relations prüfen.',tag:'Öffnungstag prüfen',location:'Pool Restaurant',map:'15',time:'18:30–21:30, falls geöffnet',food:'Fisch- und Meeresfrüchte-Gerichte nach aktueller Karte.',included:'Mögliches All-Inclusive-Kontingent bei Guest Relations bestätigen.',sources:[urls.pool]}
 ];
}
let dialog=null,queued=false;
function box(){
 if(dialog)return;
 dialog=document.createElement('dialog');dialog.id='cleoRestaurantSheet';dialog.setAttribute('aria-label','Restaurant und heutiger Themenabend');
 dialog.innerHTML='<div id="cleoRestaurantContent"></div>';document.body.append(dialog);
 dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
}
function cards(date){
 return '<section class="cleorest" data-date="'+date+'"><div class="cleorest-head"><span>ESSEN & THEMENABENDE</span><h2>Eure Restaurants heute</h2><p>'+esc(dateLabel(date))+' · bestätigte Themen und offene Angaben</p></div><div class="cleorest-grid">'+daily(date).map(x=>
 '<button class="cleorest-card '+x.id+'" type="button" data-restaurant="'+x.id+'" data-restaurant-date="'+date+'"><span class="cleorest-top">'+esc(x.name)+' <small>'+esc(x.tag)+'</small></span><strong>'+esc(x.title)+'</strong><span class="cleorest-time">'+(x.time?esc(x.time)+' Uhr':'Abend · Uhrzeit offen')+' <b>↗</b></span></button>').join('')+'</div><p class="cleorest-cite">Waterfront: regelmäßiger Hotelplan, kein Live-Menü. Soko: euer fotografierter Oktoberplan. <a target="_blank" rel="noopener" href="'+urls.weekly+'">Hotelbestätigung ↗</a></p></section>';
}
function weekMatrix(){
 const dates=Array.from({length:9},(_,i)=>"2026-10-"+String(i+12).padStart(2,"0"));
 let out='<section class="cleorest-week" id="cleorest-week"><div class="cleorest-head"><span>12.–20. OKTOBER</span><h2>Alle Restaurants · jeden Abend</h2><p>Jeden Tag das Thema ansehen. Die konkreten Öffnungstage des Pool Restaurants bleiben vor Ort zu bestätigen.</p></div><div class="cleorest-week-scroll"><table><thead><tr><th>Datum</th><th>Waterfront</th><th>Soko</th><th>Vista Mare</th><th>Pool Restaurant</th></tr></thead><tbody>';
 for(const d of dates) {
  out+='<tr'+(d===selected()?' class="active"':'')+'><th>'+esc(dateLabel(d))+'</th>';
  for(const item of daily(d))out+='<td><button data-restaurant="'+item.id+'" data-restaurant-date="'+d+'"><b>'+esc(item.title)+'</b><small>'+esc(item.id==="waterfront"?"Abend · Uhrzeit vor Ort":item.tag)+'</small></button></td>';
  out+='</tr>'
 }
 return out+'</tbody></table></div><p class="cleorest-cite">Hotel-Wochenplan 2026 für Waterfront, Oktoberplan 2026 für Soko. Keine Live-Speisekarte.</p></section>'
}
function untimed(date){
 const x=daily(date)[0];
 return '<article id="cleorest-evening" class="event food cleorest-evening" data-date="'+date+'"><div class="event-time">ABEND<small>Uhrzeit offen</small></div><div class="event-line"></div><div class="event-content"><button type="button" class="event-card-trigger" data-restaurant="waterfront" data-restaurant-date="'+date+'"><div class="event-title">'+esc(x.title)+' <span class="tag live">Waterfront · Adults Only</span></div><div class="event-info">Waterfront Restaurant · am Meer</div><div class="event-note">Laut eurer Bestätigung inklusive · Uhrzeit am Restaurant erfragen.</div><span class="poster-tap-hint">Restaurant & Buffetdetails ansehen ↗</span></button><button type="button" class="ce-map-link" data-restaurant-map="19">⌖ Auf Karte</button></div><span class="cleorest-mark" title="Uhrzeit nicht veröffentlicht">?</span></article>';
}
function install(){
 const main=document.querySelector('#main');if(!main)return;
 const date=selected(),strip=main.querySelector('.date-strip');
 if(strip){
  const holder=main.querySelector('#cleorest-day');
  if(!holder||holder.dataset.date!==date){holder?.remove();strip.insertAdjacentHTML('afterend','<div id="cleorest-day" data-date="'+date+'">'+cards(date)+'</div>')}
 }
 const agenda=main.querySelector('#agendaEvents');
 if(agenda){
  const filter=main.querySelector('.filter.active')?.dataset.filter||'all',enabled=filter==='all'||filter==='food';
  const old=agenda.querySelector('#cleorest-evening');
  if(!enabled)old?.remove();
  else if(!old||old.dataset.date!==date){
   old?.remove();
   const heading=[...agenda.querySelectorAll('.agenda-label')].find(n=>n.textContent.trim()==='ABEND');
   if(heading)heading.insertAdjacentHTML('afterend',untimed(date));
   else agenda.insertAdjacentHTML('beforeend',untimed(date));
  }
 }
 const restaurants=main.querySelector('.restaurant-grid');
 if(restaurants){
  const holder=main.querySelector('#cleorest-food');
  if(!holder||holder.dataset.date!==date){holder?.remove();restaurants.insertAdjacentHTML('beforebegin','<div id="cleorest-food" data-date="'+date+'">'+cards(date)+weekMatrix()+'</div>')}
 }
 const journey=main.querySelectorAll('.journey-card');
 journey.forEach((n,i)=>{
  const d='2026-10-'+String(i+12).padStart(2,'0');
  if(n.querySelector('.cleorest-trip'))return;
  const x=daily(d)[0],b=document.createElement('button');b.type='button';b.className='cleorest-trip';b.dataset.restaurant='waterfront';b.dataset.restaurantDate=d;
  b.innerHTML='<small>WATERFRONT · ADULTS ONLY</small><strong>'+esc(x.title)+'</strong><span>Abend · Uhrzeit offen · Inklusive ↗</span>';
  (n.querySelector('.journey-summary')||n).prepend(b);
 });
}
function open(id,date){
 const x=daily(date).find(x=>x.id===id);if(!x)return;
 box();
 document.querySelector('#cleoRestaurantContent').innerHTML='<header class="cleorest-sheethead '+x.id+'"><div class="cleorest-sheetbar"><span>CLEO DAYS · GASTRONOMIE</span><button type="button" data-restaurant-close aria-label="Schließen">✕</button></div><p class="cleorest-date">'+esc(dateLabel(date))+'</p><h2>'+esc(x.title)+'</h2><p>'+esc(x.name)+' · '+esc(x.location)+'</p></header>'+
 '<div class="cleorest-sheetbody"><div class="cleorest-facts"><div><small>WANN</small><strong>'+esc(x.time?x.time+' Uhr':'Abend')+'</strong><span>'+(!x.time?'Startzeit vor Ort erfragen':'Laut veröffentlichter Hotelbeschreibung')+'</span></div><div><small>WO</small><strong>'+esc(x.name)+'</strong><span>Hotelplan · Bereich '+x.map+'</span></div></div>'+
 '<button type="button" class="cleorest-map" data-restaurant-map="'+x.map+'">⌖ Auf der Hotelkarte zeigen ↗</button>'+
 '<h3>Was erwartet euch?</h3><p>'+esc(x.description)+'</p><div class="cleorest-notice"><b>Was gibt es?</b><p>'+esc(x.food)+'</p></div>'+
 '<div class="cleorest-notice"><b>Inklusivstatus</b><p>'+esc(x.included)+'</p></div>'+
 '<details class="cleorest-sources"><summary>Quellen und Aktualität</summary><p>Regelmäßiger Wochenplan bzw. fotografierter Monatsthemenplan. Ein öffentlich zugänglicher Echtzeit-Feed mit täglich aktualisierten Speisen wurde nicht gefunden.</p>'+x.sources.map(u=>'<a href="'+esc(u)+'" target="_blank" rel="noopener">Quelle öffnen ↗</a>').join('')+'</details></div>';
 if(!dialog.open)dialog.showModal();
 dialog.scrollTop=0;
}
function schedule(){if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;install()})}
document.addEventListener('click',e=>{
 const t=e.target.closest('button,a');if(!t)return;
 if(t.dataset.restaurant){e.preventDefault();e.stopImmediatePropagation();open(t.dataset.restaurant,t.dataset.restaurantDate||selected());return}
 if(t.hasAttribute('data-restaurant-close')){e.preventDefault();e.stopImmediatePropagation();dialog?.close();return}
 if(t.dataset.restaurantMap){e.preventDefault();e.stopImmediatePropagation();dialog?.close();if(window.CleoResort)window.CleoResort.open(t.dataset.restaurantMap);return}
},true);
install();
new MutationObserver(schedule).observe(document.querySelector('#main'),{childList:true,subtree:false});
document.addEventListener('click',e=>{if(e.target.closest('[data-date],[data-filter],[data-nav],[data-open-day]'))setTimeout(schedule,0)});
document.addEventListener('change',e=>{if(e.target.id==='showPast')setTimeout(schedule,0)});
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&document.querySelector('#cleorest-day')?.dataset.date!==selected())schedule()});
window.CleoRestaurantProgram={daily,open,schedule,sources:urls};
})();