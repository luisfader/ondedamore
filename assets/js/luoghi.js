// I luoghi di «Onde d'amore», nell'ordine in cui compaiono nel romanzo.
// x, y: posizione sulla mappa (spazio 600 × 960, nord in alto).
// label: nome breve sulla mappa; side: dove va il nome rispetto al punto (r, l, t, b).
// ch: capitoli (numeri; "E" = Epilogo). tracks: id dei brani di treki.js che risuonano qui.
window.LUOGHI = [
  {
    id: "caffe", area: "Sinea", name: "Il caffè del centro", label: "Il caffè", side: "r",
    x: 250, y: 880, ch: [1, 2, 3, "E"],
    tracks: ["01-ciao-amore", "02-cade-la-pioggia"],
    text: "Un piccolo caffè all'angolo, quasi invisibile tra le vetrine del centro. Qui Luis regala a Natalia il disegno di una volpe, le loro mani si toccano e il tempo si ferma; da qui vedono la pioggia nera travolgere la città. Due anni dopo, Natalia ci torna."
  },
  {
    id: "torre", area: "Sinea", name: "Torre Esperanza · Torre dell'Amore", label: "Torre dell'Amore", side: "r",
    x: 170, y: 828, ch: [3, 4, 5, 6, 7, 10, "E"],
    tracks: ["03-il-tocco-della-verita"],
    text: "Dalla Grande Torre parte il segnale della pioggia della discordia, e in cima c'è David. Luis e Natalia ci salgono sotto la pioggia, guidati dalla volpe. Alla fine, sopra la città, si alza una torre nuova: la Torre dell'Amore, che brilla turchese e rosa sopra i tetti."
  },
  {
    id: "appartamento", area: "Sinea", name: "L'appartamento di Natalia", label: "L'appartamento", side: "r",
    x: 205, y: 930, ch: [8, 9],
    tracks: [],
    text: "Un piccolo appartamento in affitto al terzo piano, preso quando Natalia è venuta a lavorare a Sinea: quaderni pieni di canzoni, una pianta sul davanzale, una lampada dalla luce gialla. Dopo la torre, il primo silenzio, e la luce che nasce dai loro baci."
  },
  {
    id: "volpe", area: "Sinea", name: "I muri della Volpe Pittrice", label: "Volpe Pittrice", side: "t",
    x: 62, y: 830, ch: [10, 11, 22],
    tracks: [],
    text: "Gli artisti che hanno aiutato a salvare Sinea diventano un club, «La Volpe Pittrice». Si riuniscono il giovedì e riempiono i muri di volpi: Massimo ha già dipinto tre murales, e Giulia giura che di notte le volpi muovono la coda."
  },
  {
    id: "treno", area: "Il viaggio", name: "Il treno regionale", label: "Il treno", side: "b",
    x: 397, y: 815, ch: [11],
    tracks: [],
    text: "Un venerdì sera partono per Verdegrado. In mezzo alla campagna il tempo si ferma di nuovo, ma questa volta è freddo: nella nebbia bianca sui campi appaiono cavalieri trasparenti, e tutti guardano il treno."
  },
  {
    id: "nuvoletta", area: "Il viaggio", name: "Stazione Nuvoletta", label: "Nuvoletta", side: "r",
    x: 455, y: 798, ch: [11, 12, "E"],
    tracks: [],
    text: "La stazione dove si scende per Verdegrado. Natalia corre su per le scale del ponte pedonale sopra i binari gridando «arraffami se puoi», e Luis la prende tra le braccia."
  },
  {
    id: "strada", area: "Il viaggio", name: "La strada tra i boschi", label: "La strada nel bosco", side: "l",
    x: 522, y: 695, ch: [12],
    tracks: ["04-verdegrado"],
    text: "Dalla stazione ci vogliono ancora quaranta minuti di autobus tra alberi fitti, case chiare e sentieri che si perdono nel bosco. Natalia torna nella sua città, e porta Luis con sé."
  },
  {
    id: "casa", area: "Verdegrado", name: "La casa della nonna", label: "Casa della nonna", side: "b",
    x: 330, y: 598, ch: [12, 13, 15, 16, 17, 19],
    tracks: ["05-il-destino", "06-onde-d-amore-tema", "08-la-vita-e-bella-con-te", "09-la-fortezza-nella-penombra", "10-penombra-misteriosa", "12-balla-con-me-sotto-la-luna"],
    text: "La casa dell'infanzia di Natalia: giardino, vialetto di pietra, rose vicino al cancello e, nel soggiorno, il pianoforte a coda della nonna, che per cinquant'anni ha cantato alla finestra sul vecchio bastione. Qui nascono le melodie della notte; dal tetto si vede la città riempirsi di ombre."
  },
  {
    id: "parco", area: "Verdegrado", name: "Il vecchio parco e il bastione", label: "Il bastione", side: "l",
    x: 262, y: 584, ch: [14, 15],
    tracks: ["07-il-segreto-verde"],
    text: "Colline, vecchi terrapieni e strani dislivelli: per molti è solo un parco, ma un tempo qui c'era una fortezza. Natalia mostra a Luis dove comincia il vecchio bastione, e in fondo al viale un uomo li sta guardando."
  },
  {
    id: "stazione", area: "Verdegrado", name: "La stazione degli autobus", label: "Stazione bus", side: "r",
    x: 405, y: 560, ch: [16, 17],
    tracks: [],
    text: "Di notte, davanti alla stazione, compaiono soldati in uniformi antiche e un ufficiale che dà ordini in francese. La stazione diventa il loro centro di operazioni: qualcuno ha cominciato a occupare Verdegrado."
  },
  {
    id: "porta", area: "Verdegrado", name: "Le mura e la porta nord", label: "Porta nord", side: "r",
    x: 320, y: 368, ch: [18, 19, 20, 25],
    tracks: ["11-inno-di-verdegrado"],
    text: "La musica risveglia la fortezza: torri, merli e mura di pietra e legno antico circondano la città di luce turchese e rosa. Nel muro esterno c'è il pianoforte di Luis. Dalla nebbia, davanti alla porta nord, arrivano i cavalieri e l'ariete, e quando la nebbia si dirada Luis non c'è più."
  },
  {
    id: "piazza", area: "Verdegrado", name: "La piazza centrale e la torre", label: "Torre centrale", side: "r",
    x: 330, y: 505, ch: [20, 22, 25, 26, 27],
    tracks: ["16-due-parole-potenti", "17-il-quaderno", "18-la-pioggia", "19-pioggia-segreta"],
    text: "Il cuore della fortezza. Sulla piazza Natalia chiede aiuto alla città; nella grande sala della torre Luis suona prigioniero di una volontà estranea, finché lei non arriva con una tastiera giocattolo e due parole. Quando la fortezza scompare restano un vecchio palazzo comunale e una piazza bagnata di pioggia."
  },
  {
    id: "nera", area: "Il nord", name: "La fortezza nera", label: "Fortezza nera", side: "r",
    x: 150, y: 148, ch: [21, 23],
    tracks: [],
    text: "Oltre le colline basse, su un vecchio campo, si alza un'altra fortezza, fatta di pietra nera, nebbia e ferro. Nel suo bunker tengono Luis e lo costringono a suonare. Quando arriva l'autobus che canta, le file nemiche si sbriciolano, la fortezza svanisce e sopra di lei si accende una scintilla rosa."
  },
  {
    id: "deposito", area: "Verdegrado", name: "Il deposito degli autobus", label: "Deposito", side: "t",
    x: 432, y: 452, ch: [22, 24],
    tracks: ["13-controcorrente"],
    text: "Qui c'è il vecchio autobus di linea di Viktor, il papà di Natalia. Invece di scappare, lo trasformano in una cassa di risonanza che canta. Dalla strada di Nuvoletta arriva anche il furgone coperto di volpi degli artisti di Sinea, con David alla guida."
  },
  {
    id: "bosco", area: "Il nord", name: "Il bosco del nord", label: "Bosco del nord", side: "r",
    x: 360, y: 268, ch: [20, 22, 23, 25],
    tracks: ["14-mi-senti"],
    text: "Dal bosco escono la nebbia e i cavalieri; dentro il bosco corre la vecchia strada per il nord. L'autobus ci entra con la sera, oltre le colline trema una luce rosa, e Natalia parla a Luis attraverso la distanza: «Mi senti? Sono qui. Sto arrivando.»"
  },
  {
    id: "quartiere", area: "Verdegrado", name: "Il vecchio quartiere", label: "Quartiere vecchio", side: "t",
    x: 258, y: 428, ch: [25, 26],
    tracks: ["15-ti-ricordi"],
    text: "Quando la città comincia a obbedire a un ritmo freddo, il vecchio quartiere risponde a modo suo: la gente bussa alle porte, chiama i nomi, racconta storie, canta ninne nanne e fischietta stonato. Verdegrado torna a suonare storta, cioè viva."
  },
  {
    id: "canale", area: "Verdegrado", name: "Il canale ovest", label: "Canale ovest", side: "l",
    x: 212, y: 500, ch: [25, 26],
    tracks: [],
    text: "All'alba, nella vecchia casa del guardiano delle chiuse, una ventina di persone prepara il piano. Sotto il ponte, dietro l'edera e una grata arrugginita, una vecchia porta scende ai canali sotterranei: così Natalia, la volpe e Julien arrivano sotto la torre."
  },
  {
    id: "ponte", area: "Sinea", name: "Il ponte sul fiume", label: "Il ponte", side: "l",
    x: 100, y: 902, ch: ["E"],
    tracks: ["20-la-profondita-dell-amore"],
    text: "Due anni dopo, Natalia torna a Sinea e si ferma sul ponte. Non è il ponte di Nuvoletta, ma ogni ponte, ormai, le ricorda quella sera. Sotto, sull'acqua scura, passa per un istante un'onda turchese e rosa."
  }
];
