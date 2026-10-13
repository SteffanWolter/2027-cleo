/* Cleo Days · restaurant programme: publicly sourced schedules, no made-up hours */
(function(){
"use strict";
var app=window.CleoDays;
if(!app)return;
var selectors={};
var source={
water:"https://www.holidaycheck.de/had/antworten-cleopatra-luxury-beach-resort-makadi-bay-adults-only/9c59f168-1c6c-44b8-a716-89bc5514f9f3",
themes:"https://www.holidaycheck.de/ha/fragen-cleopatra-luxury-beach-resort-makadi-bay-adults-only/2a32543d-6ecc-4ceb-a52e-b200e623580d",
operator:"https://www.schauinsland-reisen.de/hotel/227727-cleopatra-luxury-beach-resort-makadi-bay-adults-only",
vista:"https://www.cleopatraluxuryhotels.com/hotel/cleopatra-luxury-resort-makadi-bay/dining/vista-mare-restaurant/",
pool:"https://www.cleopatraluxuryhotels.com/hotel/cleopatra-luxury-resort-makadi-bay/dining/pool-restaurant-bar/",
soko:"https://www.cleopatraluxuryhotels.com/hotel/cleopatra-luxury-resort-makadi-bay/dining/soko-main-restaurant/"
};
function safe(x){return String(x==null?"":x).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function dayName(d){return new Intl.DateTimeFormat("de-DE",{weekday:"short",day:"numeric",month:"short",timeZone:"UTC"}).format(new Date(d+"T12:00:00Z"))}
function schedule(date){
  var dow=new Date(date+"T12:00:00Z").getUTCDay();
  var topic=dow===2?"Arabian Night · orientalisches Buffet":dow===5?"Fish & BBQ Night":dow===0?"Gala-Dinner":"Wechselndes Themenbuffet";
  var status=(dow===2||dow===5||dow===0)?"Vom Hotel bestätigt":"Genaues Motto offen";
  var soko=app.data.dinner[date]||"Motto erfragen";
  return [
    {key:"waterfront",name:"Waterfront",subtitle:"Adults Only · direkt am Meer",title:topic,time:"Abends · Uhrzeit erfragen",status:status,focus:dow===2||dow===5||dow===0,place:"19",url:source.water,
      intro:"Das Waterfront gehört zu eurem bezahlten Adults-Only-Upgrade. Das Hotel bestätigt täglich ein offenes Buffet mit wechselnden Themen. Zusätzlich À la carte außer Dienstag, Freitag und Sonntag.",
      info:dow===2?"Arabian Night ist das reguläre orientalische Themenbuffet am Dienstag, nicht das gesondert kostenpflichtige Strand-BBQ. Laut Hotel bleibt das Buffet an diesem Abend inklusive.":dow===5?"Freitag ist der Fisch- und BBQ-Themenabend direkt im Waterfront. Das ist nicht das extra Strand-BBQ für 35 € pro Person.":dow===0?"Sonntags Gala-Buffet mit besonderer Abendunterhaltung während des Essens.":"Das tägliche Buffet ist bestätigt. Themen wie italienisch oder asiatisch werden angeboten, aber der konkrete Wochentag ist nicht veröffentlicht.",
      note:"Die Start- und Endzeit des Waterfront-Abendessens ist nicht sicher veröffentlicht."},
    {key:"soko",name:"Soko",subtitle:"Hauptrestaurant",title:soko+" · Abendbuffet",time:"18:30–21:30 Uhr",status:"Hotel-Oktoberplan",focus:soko==="Gala",place:"3",url:source.soko,
      intro:"Das Soko ist das reguläre All-Inclusive-Hauptrestaurant mit Buffet und Live-Cooking.",
      info:"Das Oktober-Poster bestätigt für diesen Tag "+soko+". Der Themenname garantiert keine bestimmten Einzelgerichte.",
      note:"Frühstück 07:00–10:00 Uhr; Mittagessen 12:30–14:30 Uhr. Keine separate Buffetreservierung erforderlich."},
    {key:"vista",name:"Vista Mare",subtitle:"Italienisch · À la carte",title:"Italienisches Abendessen",time:"18:30–21:30 Uhr",status:"Reservierung nötig",focus:false,place:"2",url:source.vista,
      intro:"Servierte italienische Küche in separatem À-la-carte-Restaurant. Der kleine Pub-Bereich ist davon getrennt.",
      info:"Ein Besuch pro Zimmer ist laut veröffentlichtem Konzept bei mindestens sieben Nächten inklusive; für eure acht Nächte einen Besuch vorab bei Guest Relations reservieren.",
      note:"Kein veröffentlichter wöchentlicher Themenkalender für Vista Mare."},
    {key:"pool",name:"Pool Restaurant",subtitle:"Fisch & Meeresfrüchte",title:"Fisch-À-la-carte",time:"Abendessen · ca. 18:30–21:30 Uhr",status:"Öffnungstage prüfen",focus:false,place:"15",url:source.pool,
      intro:"Abends ein Fisch-/Meeresfrüchte-Angebot mit Reservierung. Tagsüber befindet sich hier auch die Poolbar mit Snacks.",
      info:"Das Resort bestätigt ein Fischrestaurant. Für einen zusätzlichen Adults-Only-Besuch bei Guest Relations reservieren. Verschiedene Reisebeschreibungen nennen unterschiedliche Öffnungstage.",
      note:"Nicht mit der Freitag-Fish-&-BBQ-Night im Waterfront verwechseln."}
  ]
}
function card(r,date){return '<article class="cd-program-card'+(r.focus?" focus":"")+'"><div class="cd-card-top"><span>'+safe(r.subtitle)+'</span><small>'+safe(r.status)+'</small></div><strong class="cd-venue">'+safe(r.name)+'</strong><h3>'+safe(r.title)+'</h3><p class="cd-card-time">'+safe(r.time)+'</p><div class="cd-card-buttons"><button data-cd-view="'+safe(r.key)+'" data-cd-date="'+date+'">Details ansehen ↗</button><button data-cd-place="'+safe(r.place)+'" title="Auf Hotelkarte" aria-label="'+safe(r.name)+' auf Karte anzeigen">⌖</button></div></article>'}
function banner(date){
 var r=schedule(date)[0];
 return '<section id="cdWaterfrontHighlight" class="cd-highlight"><div class="cd-highlight-content"><small>WATERFRONT · ADULTS ONLY · '+safe(dayName(date))+'</small><strong>'+safe(r.title)+'</strong><p>'+safe(r.intro)+'</p><span>'+safe(r.time)+' · '+safe(r.status)+'</span></div><div class="cd-highlight-actions"><button data-cd-view="waterfront" data-cd-date="'+date+'">Restaurant-Infos ↗</button><button data-cd-place="19">⌖ Auf Karte</button></div></section>'
}
function header(date){
 var rows=schedule(date);
 var dates=Array.from({length:9},(_,i)=>"2026-10-"+String(i+12).padStart(2,"0"));
 var h='<section id="cdFullRestaurants" class="cd-section"><div class="cd-section-title"><div><small>EURE RESTAURANTS · '+safe(dayName(date))+'</small><h2>Was gibt es heute Abend?</h2></div></div><div class="cd-program-grid">'+rows.map(r=>card(r,date)).join("")+'</div>';
 h+='<div class="cd-week-heading"><h3>Alle Themenabende · 12.–20. Oktober</h3><p>Tippt auf einen Eintrag, um die Details und den Ort zu sehen.</p></div>';
 h+='<div class="cd-scroll-table"><table><thead><tr><th>Tag</th><th>Waterfront</th><th>Soko</th><th>Vista Mare</th><th>Pool Restaurant</th></tr></thead><tbody>';
 for(const d of dates){const row=schedule(d);h+='<tr'+(d===date?' class="selected"':'')+'><th>'+safe(dayName(d))+'</th>'+row.map(r=>'<td><button data-cd-view="'+r.key+'" data-cd-date="'+d+'"><strong>'+safe(r.title)+'</strong><small>'+safe(r.key==="waterfront"?r.time:r.status)+'</small></button></td>').join("")+'</tr>'}
 h+='</tbody></table></div><p class="cd-disclaimer">Waterfront: Hotelmanagement (Mai/September 2026). Soko: fotografierter Oktoberplan. Die anderen Restaurants haben keinen verifizierten täglichen Motto-Kalender.</p></section>';
 return h
}
function makeDialog(){
 if(document.getElementById("cdDialog"))return;
 const d=document.createElement("dialog");d.id="cdDialog";d.setAttribute("aria-label","Details zum Restaurant");
 d.innerHTML='<div id="cdDialogBody"></div>';document.body.append(d);
 d.addEventListener("click",e=>{if(e.target===d)d.close()});
}
function openDetail(key,date){
 var r=schedule(date).find(x=>x.key===key);if(!r)return;makeDialog();
 var d=document.getElementById("cdDialog"),venue=r.name;
 document.getElementById("cdDialogBody").innerHTML='<div class="cd-dialog-hero"><div class="cd-dialog-bar"><span>CLEO DAYS · RESTAURANTS</span><button data-cd-close aria-label="Schließen">✕</button></div><small>'+safe(dayName(date))+' · '+safe(r.subtitle)+'</small><h2>'+safe(r.title)+'</h2><p>'+safe(r.intro)+'</p><b>'+safe(r.status)+'</b></div><div class="cd-dialog-inner"><div class="cd-facts"><div><span>Uhrzeit</span><strong>'+safe(r.time)+'</strong></div><div><span>Restaurant</span><strong>'+safe(venue)+'</strong></div></div><button class="cd-locate" data-cd-place="'+safe(r.place)+'">⌖&nbsp; Auf der Hotelkarte zeigen <span>↗</span></button><section><h3>Das erwartet euch</h3><p>'+safe(r.info)+'</p></section><div class="cd-info">'+safe(r.note)+'</div><p class="cd-source"><a href="'+safe(r.url)+'" target="_blank" rel="noopener">Offizielle Restaurantinformationen ↗</a> · <a href="'+safe(source.themes)+'" target="_blank" rel="noopener">Auskunft des Hotelmanagements ↗</a> · <a href="'+safe(source.operator)+'" target="_blank" rel="noopener">Reiseveranstalter ↗</a></p></div>';
 d.showModal();
}
function calendarWaterfront(date){
 const x=schedule(date)[0];
 return '<article id="cdCalendarWaterfront" class="event food cd-calendar-waterfront" data-cd-date="'+date+'">'+
 '<div class="event-time" style="font-size:11px">ABEND<small>Uhrzeit offen</small></div><div class="event-line"></div><div class="event-content">'+
 '<button type="button" class="event-card-trigger" data-cd-view="waterfront" data-cd-date="'+date+'" aria-label="Waterfront Themenbuffet und Details ansehen">'+
 '<div class="event-title">'+safe(x.title)+' <span class="tag live">Waterfront · Adults Only</span></div>'+
 '<div class="event-info">Waterfront Restaurant · Meerblick</div>'+
 '<div class="event-note">Bei eurem Upgrade laut eurer Bestätigung inklusive; genaue Uhrzeit vor Ort erfragen.</div>'+
 '<span class="poster-tap-hint">Buffetdetails ansehen ↗</span></button>'+
 '<button type="button" class="ce-map-link" data-cd-place="19">⌖ Auf Karte</button></div><span aria-label="Uhrzeit ungeklärt" style="color:#6c816e;font-weight:700">?</span></article>'
}
function calendarRefresh(date){
 const main=document.getElementById("main"),agenda=main?.querySelector('#agendaEvents');
 if(!agenda)return;
 const active=main.querySelector('.filter.active')?.dataset.filter||'all',allowed=['all','food'].includes(active);
 const old=agenda.querySelector('#cdCalendarWaterfront');
 if(!allowed){old?.remove();return}
 if(old&&old.dataset.cdDate===date)return;
 old?.remove();
 const evening=[...agenda.querySelectorAll('.agenda-label')].find(x=>x.textContent.trim()==='ABEND');
 if(evening)evening.insertAdjacentHTML('afterend',calendarWaterfront(date));
 else agenda.insertAdjacentHTML('beforeend',calendarWaterfront(date));
}
function refresh(){
 const main=document.getElementById("main");if(!main)return;
 const date=app.getSelected(),strip=main.querySelector(".date-strip"),restaurant=main.querySelector(".restaurant-grid");
 if(strip&&!main.querySelector("#cdWaterfrontHighlight")){
  strip.insertAdjacentHTML("afterend",banner(date));
 }
 if(restaurant&&!main.querySelector("#cdFullRestaurants")){
  restaurant.insertAdjacentHTML("beforebegin",header(date));
 }
 calendarRefresh(date);
}
let scheduled=false;
function queue(){if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;refresh()})}
document.addEventListener("click",function(ev){
 const target=ev.target.closest("[data-cd-view],[data-cd-place],[data-cd-close]");
 if(!target)return;
 ev.preventDefault();ev.stopImmediatePropagation();
 if(target.hasAttribute("data-cd-view"))openDetail(target.dataset.cdView,target.dataset.cdDate||app.getSelected());
 else if(target.hasAttribute("data-cd-close"))document.getElementById("cdDialog")?.close();
 else {document.getElementById("cdDialog")?.close();const place=target.dataset.cdPlace;if(window.CleoResort?.open)window.CleoResort.open(place);else location.hash="map?place="+place+"&date="+app.getSelected()}
},true);
document.addEventListener('click',e=>{if(e.target.closest('[data-filter],[data-date],[data-nav],[data-open-day]'))setTimeout(queue,0)});
document.addEventListener('change',e=>{if(e.target.id==='showPast')setTimeout(queue,0)});
function boot(){const main=document.getElementById("main");if(!main)return;refresh();new MutationObserver(queue).observe(main,{childList:true})}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
window.CleoDining={schedule,open:openDetail,version:"2026-10-13"};
})();