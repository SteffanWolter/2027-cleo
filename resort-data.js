/* Cleo Explorer. Coordinates align to the numbered hotel plan, not GPS. */
window.CleoResortData=(()=>{
const base='https://www.cleopatraluxuryhotels.com/hotel/cleopatra-luxury-resort-makadi-bay/';
const sources={
plan:{label:'Hotelplan · Broschüre 2024, Seite 1',url:'./assets/hotel-plan-source.pdf'},
pool:{label:'Hotel · Pool Restaurant & Bar',url:base+'dining/pool-restaurant-bar/'},
soko:{label:'Hotel · Soko',url:base+'dining/soko-main-restaurant/'},
slr:{label:'Schauinsland · Verpflegung & Zeiten',url:'https://www.schauinsland-reisen.de/hotel/93124-cleopatra-luxury-resort-makadi-bay'},
water:{label:'Hotel · Waterfront',url:base+'dining/waterfront-restaurant/'},
board:{label:'Eure Hotel-Aushänge · Oktober 2026',url:null}
};
const rows=[
[1,'Lobby & Rezeption','Lobby','service',184,165,'door','Ankommen, Fragen klären und Reservierungen bei Guest Relations. Hier findet ihr auch die Lobbybar und den Cleo-Travel-Schalter.'],
[2,'Vista Mare','Vista Mare','food',230,119,'fork','Italienisches Restaurant und Pub. Die Mini Disco ist laut eurem aktuellen Wochenplan um 20:00 Uhr hier angesetzt – nicht im Amphitheater.'],
[3,'Soko · Hauptrestaurant','Soko','food',292,104,'fork','Internationales und lokales Buffet zum Frühstück, Mittag- und Abendessen. Sitzplätze drinnen und draußen; abends wechselnde Mottos.'],
[4,'Amphitheater & Disco','Amphitheater','show',266,224,'ticket','Bühne für die im Wochenplan hier angekündigten Shows. Die Disco liegt laut Plan im selben Gebäudebereich.'],
[5,'Cleo Spa','Spa','service',277,332,'leaf','Wellnessbereich. Behandlungen und Zusatzleistungen beim Spa erfragen; nicht pauschal als All Inclusive zugesagt.'],
[6,'Fitness Center','Gym','sport',209,301,'activity','Fitnessbereich und Anlaufstelle für Tenniszubehör sowie die Padel-Reservierung. Der Padelplatz selbst ist im älteren Lageplan nicht eingezeichnet.'],
[7,'Conference Center','Konferenz','service',154,266,'building','Konferenzbereich des Hotels. Kein regulärer Treffpunkt des fotografierten Animationsprogramms.'],
[8,'Bogenschießbereich','Bogenschießen','sport',159,562,'target','Im Hotelplan als Archery Center markiert. Der neuere Aushang beschreibt das Training bei den Tennisplätzen; den genauen aktuellen Treffpunkt beim Trainer bestätigen. Ab 16 Jahren.'],
[9,'Tennisplätze','Tennis','sport',71,294,'ball','Tennisanlage gemäß Plan. Schläger, Bälle und Training über das Gym oder die Rezeption anfragen.'],
[10,'Parkplatz','Parkplatz','service',172,88,'car','Parkfläche an der Eingangsseite des Resorts. Eure konkrete Transfer-Abholstelle steht hierdurch nicht fest.'],
[11,'Hippo Kids Club','Kids Club','kids',450,147,'spark','Kinderclub. Das Animationsprogramm und die Mini Disco können an anderen Orten stattfinden; beachtet den jeweiligen Kalendereintrag.'],
[12,'Relaxing Pool','Relax Pool','pool',393,80,'waves','Ruhiger Poolbereich gemäß Hotelplan. Nicht mit dem Activity Pool verwechseln.'],
[13,'Heated Pool','Beheizter Pool','pool',450,44,'waves','Im Lageplan als Heated Pool bezeichnet. Die tatsächliche Beheizung ist saison- und betriebsabhängig.'],
[14,'Family Pool','Family Pool','pool',500,74,'waves','Familienpool. Hier ist laut eurem Tagesprogramm Wasserball um 15:15 Uhr vorgesehen.'],
[15,'Pool Restaurant & Bar','Poolbar','food',547,99,'fork','Eure Anlaufstelle für Mittagssnacks und Nachmittagsgebäck zwischen Family Pool und Activity Pool. Auch Darts, viele Shows und die Wochenhighlights sind hier angesetzt.'],
[16,'Activity Pool','Activity Pool','pool',560,147,'waves','Aktivpool: Wassergymnastik startet laut Aushang um 12:00 Uhr. Die Halfway Bar liegt laut Hotel in der Nähe; ihr genauer Platz ist in diesem Plan nicht nummeriert.'],
[17,'Strandbereich','Strand','beach',731,172,'sun','Bereich für Boccia, Volleyball, Yoga und die Strandhighlights. Die einzelnen Sportstationen sind im PDF nicht markiert – der Pin zeigt den Strandbereich, keinen exakten Kursplatz.'],
[18,'Beach Resort · Adults Only','Adults Only','stay',745,515,'bed','Euer Adults-Only-Upgrade am Meer. Die Sky Lounge liegt laut neuem Aushang im 3. Stock mit Panoramablick über Makadi Bay. Der Hotelplan markiert den Beach-Resort-Bereich, nicht den genauen Zugang zur Lounge.'],
[19,'Waterfront Restaurant','Waterfront','food',859,402,'fork','Restaurant direkt am Meer im Adults-Only-Bereich. Frühstück, Mittag- und Abendessen; eigenständige aktuelle Uhrzeiten liegen in euren Aushängen nicht vor.'],
[20,'Extra Divers · Tauchcenter','Tauchcenter','beach',968,540,'compass','Tauchbasis am südlichen Strandende. Kurse und Ausfahrten sind eigene Angebote; bei der Basis reservieren.'],
[21,'Wassersport-Center','Wassersport','beach',634,92,'sail','Wassersportbereich laut Hotelplan. Angebote, Bedingungen und Preise vor Ort erfragen.'],
[22,'Steg & Marina','Steg','beach',982,355,'anchor','Hoteleigener Steg über das Riff. Wetterbedingte Sperrungen und Hinweise der Mitarbeiter gehen immer vor.']
];
const places=rows.map(([id,title,short,category,x,y,icon,description])=>({id:String(id),title,short,category,x,y,icon,description}));
const categories={all:['Alles','map'],food:['Essen','fork'],pool:['Pools','waves'],sport:['Sport','activity'],beach:['Strand','sun'],show:['Shows','ticket'],service:['Service','door'],stay:['Adults Only','bed'],kids:['Kinder','spark']};
const meals={
'Mittagssnacks':{place:'15',lead:'Etwas Herzhaftes, ohne den Pooltag zu unterbrechen.',body:'Das Pool Restaurant & Bar bietet tagsüber kleine herzhafte Mahlzeiten und Snacks. Das ist ein eigenes Angebot an der Poolbar – nicht das große Mittagsbuffet im Soko. Getränke bekommt ihr ebenfalls an der Bar.',items:['Herzhafte Snacks und kleine Mahlzeiten','Getränke an der Poolbar; Umfang nach eurem All-Inclusive-Paket','Wer ein vollständiges Buffet möchte: Soko von 12:30 bis 14:30 Uhr'],note:'Eine konkrete Tageskarte ist nicht veröffentlicht. Burger, Pizza oder Pommes sind deshalb hier nicht als garantiertes Angebot aufgelistet.',sources:['pool','slr'],badge:'12:30–16:00 · laut Veranstalter'},
'Eis & Gebäck':{place:'15',lead:'Die süße Pause am Nachmittag.',body:'Laut eurem Veranstalter gibt es an der Poolbar nachmittags Eiscreme und Gebäck. Sorten und die konkrete Gebäckauswahl können wechseln. Die separat verkauften orientalischen Mitnahme-Boxen sind ein anderes Angebot.',items:['Eiscreme','Gebäck','Vor Ort nach Sorten und Allergenen fragen'],note:'Schauinsland nennt 16:00–17:00 Uhr. Die ältere Broschüre hat längere Eiszeiten; hier bleibt das aktuelle Veranstalter-Zeitfenster maßgeblich.',sources:['slr'],badge:'16:00–17:00 · laut Veranstalter'},
'Frühstücksbuffet':{place:'3',lead:'In Ruhe in den Urlaubstag starten.',body:'Frühstück in Buffetform im Soko-Hauptrestaurant, mit Plätzen innen und außen. Ihr wählt eure Zusammenstellung selbst. Eine tagesgenaue Liste der Speisen ist nicht veröffentlicht.',items:['Frühstücksbuffet im Hauptrestaurant','Innen- und Außenplätze','Für einen späteren Start: Poolbar-Frühstück ab 10:30 Uhr'],sources:['soko','slr'],badge:'07:00–10:00'},
'Mittagsbuffet':{place:'3',lead:'Das vollständige Mittagsbuffet im Hauptrestaurant.',body:'Soko bietet internationale und lokale Küche in Buffetform. Die Auswahl wechselt; die Restaurantbeschreibung bestätigt keine einzelnen täglichen Gerichte. Das leichtere Snackangebot läuft zeitgleich an der Poolbar.',items:['Internationales und lokales Buffet','Selbst auswählen statt festes Menü','Innen- oder Außentisch'],sources:['soko','slr'],badge:'12:30–14:30'},
'Spätaufsteher-Frühstück':{place:'15',lead:'Ausschlafen und trotzdem frühstücken.',body:'Spätes Frühstücksangebot an der Poolbar. Es findet nach dem regulären Soko-Frühstück statt; den genauen Umfang des kleineren Angebots nennt der Veranstalter nicht.',items:['Frühstück an der Poolbar','Eigenes Zeitfenster nach dem Soko-Buffet'],sources:['slr'],badge:'10:30–11:30'},
'Frühaufsteher-Frühstück':{place:'1',lead:'Eine frühe Kleinigkeit vor dem Ausflug.',body:'Frühstückssnack in der Lobbybar für frühe Starts. Es ist kein vollständiges Soko-Buffet. Bei sehr früher Abholung vorher beim Hotel nach dem verfügbaren Angebot fragen.',items:['Kleines Frühstücksangebot in der Lobbybar','Praktisch vor einer frühen Abfahrt'],sources:['slr'],badge:'04:00–07:00'},
'Spätes Abendessen':{place:null,lead:'Spät zurück? Vorher beim Hotel anmelden.',body:'Ein spätes Abendessen ist laut Veranstalter auf Anfrage möglich. Bitte vor eurem Ausflug oder eurer späten Rückkehr mit dem Hotel abstimmen. Der Veranstalter nennt dafür keinen verbindlichen Restaurantstandort.',items:['Nur auf vorherige Anfrage','Treffpunkt und Speisen mit dem Hotel vereinbaren'],note:'Die Rezeption ist die Anlaufstelle zur Absprache, nicht automatisch der Ort des Abendessens.',sources:['slr'],badge:'22:30–01:00 · auf Anfrage'},
dinner:{place:'3',lead:'Ein anderer Themenabend – am gleichen Lieblingsplatz.',body:'Abendbuffet mit Live-Cooking im Soko. Das Monatsplakat legt das Motto fest, nicht die einzelnen Gerichte. Für À-la-carte-Restaurants benötigt ihr eine separate Reservierung.',items:['Themenbuffet','Live-Cooking laut Veranstalter','Internationale und lokale Küche'],sources:['soko','slr'],badge:'18:30–21:30'}
};
function resolve(e={}){
const t=String(e.title||'').toLowerCase(),l=String(e.location||'').toLowerCase();
if(t==='spätes abendessen')return {id:null,note:'Restaurant für das späte Essen noch nicht bestätigt.'};
if(/shuttle zurück/.test(t))return {id:null,note:'Start außerhalb des Resorts. Rückfahrt laut Treffpunkt der Buchung.'};
if(/padel/.test(t))return {id:'6',approx:true,note:'Markiert ist das Gym zur Reservierung. Der Padelplatz fehlt im PDF.'};
if(/bogenschie|archery/.test(t))return {id:'8',approx:true,note:'Bereich aus dem Hotelplan. Aktuellen Treffpunkt bei den Tennisplätzen bestätigen.'};
if(/bbq/.test(t))return {id:'17',approx:true,note:'Strandbereich; das genaue Dinner-Setup nennt der Plan nicht.'};
if(/beach resort poolbar|beach resort pool bar|adults.only.poolbar|adults only pool bar/.test(t+' '+l))return {id:'18',approx:true,note:'Adults-Only-Poolbar im Beach Resort. Der Lageplan markiert den Bereich, nicht die einzelne Bar.'};
if(/waterfront/.test(t+' '+l))return {id:'19'};
if(/halfway|half way/.test(t+' '+l))return {id:'16',approx:true,note:'Umgebung des Activity Pools; Bar nicht exakt im PDF markiert.'};
if(/soko/.test(l)||/abendbuffet|frühstücksbuffet|mittagsbuffet/.test(t))return {id:'3'};
if(/poolbar|pool bar|poolrestaurant|pool restaurant/.test(l)||meals[e.title]?.place==='15')return {id:'15'};
if(/vista mare/.test(l))return {id:'2'};
if(/family pool|familienpool/.test(l)||/wasserball/.test(t))return {id:'14'};
if(/activity pool|aktivpool/.test(l)||/wassergymnastik/.test(t))return {id:'16'};
if(/amphitheater|amphitheatre|disco/.test(l))return {id:'4'};
if(/tennis/.test(t+' '+l))return {id:'9'};
if(/lobby|rezeption|cleo.travel|shuttle/.test(t+' '+l))return {id:'1'};
if(/strand|beach/.test(l))return {id:'17',approx:true,note:'Der Strandbereich ist bekannt, die einzelne Aktivitätsstation nicht eingezeichnet.'};
return {id:null,note:'Dieser konkrete Ort ist im Hotelplan nicht verlässlich verortet.'};
}
return {sources,places,categories,meals,resolve,width:1000,height:732,version:'explorer-1'};
})();
