"use strict";

const POSITIONS = [
  "Kaleci", "Sağ Bek", "Sol Bek", "Stoper", "Sağ Kanat Bek", "Sol Kanat Bek",
  "Ön Libero", "Merkez Orta Saha", "Ofansif Orta Saha", "Sağ Kanat", "Sol Kanat", "Santrafor", "İkinci Forvet"
];
const CITIES = ["İstanbul", "Ankara", "İzmir", "Bursa", "Adana", "Trabzon", "Antalya", "Gaziantep", "Eskişehir", "Samsun", "Aydın", "Nazilli"];
const REGION_LOCATIONS = {
  turkey: [
    { city: "İstanbul", country: "Türkiye", neighborhoods: ["Bağcılar", "Esenyurt", "Gültepe", "Kadıköy · Moda", "Fatih · Çarşamba", "Güngören", "Üsküdar"], surface: "Yoğun şehir dokusu ve scout rekabeti", surfaceType: "asphalt" },
    { city: "Ankara", country: "Türkiye", neighborhoods: ["Keçiören", "Mamak", "Çankaya", "Yenimahalle"], surface: "Sert iklim ve tozlu mahalle sahaları", surfaceType: "dust" },
    { city: "İzmir", country: "Türkiye", neighborhoods: ["Tınaztepe", "Tepecik", "Bornova", "Buca", "Karşıyaka"], surface: "Ege futbol kültürü ve sahil mahalleleri", surfaceType: "asphalt" },
    { city: "Bursa", country: "Türkiye", neighborhoods: ["Osmangazi", "Nilüfer", "Yıldırım", "İnegöl"], surface: "Sanayi mahalleleri ve ateşli semt kültürü", surfaceType: "asphalt" },
    { city: "Adana", country: "Türkiye", neighborhoods: ["Seyhan", "Çukurova", "Yüreğir", "Kiremithane"], surface: "Çukurova sıcağı ve beton saha kültürü", surfaceType: "dust" },
    { city: "Trabzon", country: "Türkiye", neighborhoods: ["Ortahisar", "Akçaabat", "Yomra", "Of"], surface: "Karadeniz yokuşları ve yağışlı saha", surfaceType: "mud" },
    { city: "Antalya", country: "Türkiye", neighborhoods: ["Muratpaşa", "Konyaaltı", "Kepez", "Manavgat"], surface: "Sıcak hava ve açık semt sahaları", surfaceType: "school" },
    { city: "Gaziantep", country: "Türkiye", neighborhoods: ["Şahinbey", "Şehitkamil", "Oğuzeli"], surface: "Anadolu futbol ekolü ve sert zemin", surfaceType: "dust" },
    { city: "Eskişehir", country: "Türkiye", neighborhoods: ["Odunpazarı", "Tepebaşı", "Çarşı"], surface: "Soğuk hava ve mahalle sahaları", surfaceType: "school" },
    { city: "Samsun", country: "Türkiye", neighborhoods: ["İlkadım", "Atakum", "Canik"], surface: "Rüzgârlı kıyı sahaları ve köklü futbol kültürü", surfaceType: "mud" },
    { city: "Aydın", country: "Türkiye", neighborhoods: ["Efeler", "Çeştepe", "Söke", "Germencik"], surface: "Zeytinlikler arasında kasaba sahaları", surfaceType: "dust" },
    { city: "Nazilli", country: "Türkiye", neighborhoods: ["Merkez", "İsabeyli", "Sümer"], surface: "Samimi Ege kasabası ve açık saha", surfaceType: "dust" }
  ],
  asia: [
    { city: "Tokyo", country: "Japonya", neighborhoods: ["Shibuya", "Suginami", "Setagaya"], surface: "Gökdelenler arasında sıkışık beton saha", surfaceType: "asphalt" },
    { city: "Seul", country: "Güney Kore", neighborhoods: ["Mapo-gu", "Gangseo-gu", "Songpa"], surface: "Metro yanı beton saha", surfaceType: "school" },
    { city: "Almatı", country: "Kazakistan", neighborhoods: ["Alatau", "Auezov", "Medeu"], surface: "Sert beton saha ve değişken hava", surfaceType: "mud" },
    { city: "Mumbai", country: "Hindistan", neighborhoods: ["Dharavi", "Bandra", "Andheri"], surface: "Kalabalık mahalle arası sert zemin", surfaceType: "dust" }
  ],
  europe: [
    { city: "Paris", country: "Fransa", neighborhoods: ["Saint-Denis", "Belleville", "Aubervilliers"], surface: "Demir kafesli cage saha", surfaceType: "asphalt" },
    { city: "Londra", country: "Birleşik Krallık", neighborhoods: ["Hackney", "Southwark", "Brixton"], surface: "Beton toplu konut arası saha", surfaceType: "mud" },
    { city: "Amsterdam", country: "Hollanda", neighborhoods: ["Noord", "Zuidoost", "Oost"], surface: "Kanal kenarı küçük halı saha", surfaceType: "school" },
    { city: "Berlin", country: "Almanya", neighborhoods: ["Kreuzberg", "Neukölln", "Wedding"], surface: "Kafes saha ve soğuk sentetik zemin", surfaceType: "mud" }
  ]
};
const STREET_SURFACES = {
  asphalt: {
    label: "Asfalt & Beton Kafesler", matchSurface: "Sert asfalt / beton zemin",
    description: "Dar sokaklar, okul asfaltı ve demir kafesli sahalar.",
    effects: "Çeviklik +2 · Teknik +2 · Sakatlık riski %20 artar",
    skill: 2, speed: 2, energy: 0, fatigue: 0, matchBonus: 0, injuryMultiplier: 1.2
  },
  dust: {
    label: "Tozlu Toprak Tarlalar", matchSurface: "Tozlu, sekmesi düzensiz toprak",
    description: "Taş kale direkleri ve topun yön değiştirdiği toprak saha.",
    effects: "Dayanıklılık +5 · Mücadele avantajı",
    skill: 0, speed: 0, energy: 5, fatigue: -2, matchBonus: 0.01, injuryMultiplier: 1
  },
  mud: {
    label: "Çamurlu Banliyö Sahaları", matchSurface: "Islak, çamurlu zemin",
    description: "Yağmur, balçık ve kayarak mücadele gerektiren antrenmanlar.",
    effects: "Dayanıklılık +3 · Mücadele avantajı · Sakatlık riski %10 artar",
    skill: 0, speed: 0, energy: 3, fatigue: -1, matchBonus: 0.015, injuryMultiplier: 1.1
  },
  school: {
    label: "Okul Bahçesi / Beton Arası", matchSurface: "Dengeli okul bahçesi zemini",
    description: "Fileleri yırtık kalelerle klasik, dengeli mahalle futbolu.",
    effects: "Dengeli başlangıç · Ek özellik etkisi yok",
    skill: 0, speed: 0, energy: 0, fatigue: 0, matchBonus: 0, injuryMultiplier: 1
  }
};
const REGION_PROFILES = {
  turkey: { name: "Türkiye", culture: "Mahalle esnafı, semt büyükleri ve amatör kulüp seçmeleri", streetGroups: ["semt takımı", "mahalle ekibi"], rules: ["İlk golü atan kazanır", "İki taş kale; auta giden topu saha kenarı belirler"] },
  asia: { name: "Asya", culture: "Okul çıkışı buluşmaları, metro altı sahaları ve yerel akademi scoutları", streetGroups: ["okul takımı", "mahalle ekibi"], rules: ["İlk golü atan kazanır", "Üç pas yapmadan şut yok"] },
  europe: { name: "Avrupa", culture: "Banliyö kafes sahaları, yerel futbol grupları ve kulüp akademisi scoutları", streetGroups: ["kafes saha ekibi", "yerel sokak takımı"], rules: ["Kafes saha: top dışarı çıkmaz", "İlk golü atan kazanır"] }
};
const PROFESSIONAL_CLUBS = {
  İstanbul: ["Galatasaray", "Fenerbahçe", "Beşiktaş", "Başakşehir", "Kasımpaşa"],
  Ankara: ["Gençlerbirliği", "Ankaragücü", "Keçiörengücü"],
  İzmir: ["Göztepe", "Altay", "Karşıyaka"],
  Bursa: ["Bursaspor"],
  Adana: ["Adanaspor", "Adana Demirspor"],
  Trabzon: ["Trabzonspor"],
  Antalya: ["Antalyaspor"],
  Gaziantep: ["Gaziantep FK"],
  Eskişehir: ["Eskişehirspor"],
  Samsun: ["Samsunspor"],
  Aydın: ["Nazillispor", "Aydınspor 1923"],
  Nazilli: ["Nazillispor"],
  Tokyo: ["FC Tokyo", "Tokyo Verdy", "Kawasaki Frontale"],
  Seul: ["FC Seoul", "Suwon FC", "Incheon United"],
  Almatı: ["Kairat Almaty"],
  Mumbai: ["Mumbai City FC"],
  Paris: ["Paris FC", "Paris Saint-Germain"],
  Londra: ["Arsenal", "Chelsea", "Tottenham Hotspur", "Fulham"],
  Amsterdam: ["Ajax", "FC Utrecht"],
  Berlin: ["Hertha BSC", "Union Berlin"]
};
const CLUB_LEAGUE_DATA = {
  "Türkiye": {
    region: "turkey", divisions: [
      { tier: 4, name: "Trendyol Süper Lig", cities: {
        "İstanbul": ["Galatasaray", "Fenerbahçe", "Beşiktaş", "Başakşehir FK", "Kasımpaşa", "Eyüpspor", "Fatih Karagümrük"],
        Trabzon: ["Trabzonspor"], Samsun: ["Samsunspor"], Antalya: ["Antalyaspor", "Alanyaspor"],
        Konya: ["Konyaspor"], Kayseri: ["Kayserispor"], Gaziantep: ["Gaziantep FK"],
        Rize: ["Çaykur Rizespor"], Adana: ["Adana Demirspor"], Bodrum: ["Bodrum FK"]
      }, managers: ["Okan Buruk", "José Mourinho", "Giovanni van Bronckhorst / Ole Gunnar Solskjaer hattı", "Çağdaş Atan", "Hakan Keleş", "Arda Turan", "Şenol Can", "Şenol Güneş", "Thomas Reis", "Alex de Souza", "Fatih Tekke", "Ali Çamdalı", "Sinan Kaloğlu", "Selçuk İnan", "İlhan Palut", "Serkan Damla", "İsmet Taşdemir"]},
      { tier: 3, name: "Trendyol 1. Lig", cities: {
        Bursa: ["Bursaspor"], Kocaeli: ["Kocaelispor"], Sakarya: ["Sakaryaspor"], Erzurum: ["Erzurumspor FK"],
        Bandırma: ["Bandırmaspor"], Bolu: ["Boluspor"], Manisa: ["Manisa FK"], Çorum: ["Çorum FK"],
        Şanlıurfa: ["Şanlıurfaspor"], Ankara: ["Ankara Keçiörengücü", "Gençlerbirliği", "Ankaraspor"],
        İstanbul: ["Esenler Erokspor", "Ümraniyespor", "Sarıyer"], Iğdır: ["Iğdır FK"], Muğla: ["Muğlaspor"],
        Batman: ["Batman Petrolspor"], Mardin: ["Mardin 1969 Spor"], Van: ["Vanspor FK"]
      }, managers: ["Pablo Batalla", "Ertuğrul Sağlam", "Mesut Bakkal", "Hakan Kutlu", "Mustafa Gürsel", "Ufuk Uysal", "Çağdaş Çavuş", "Serkan Özbalta", "Erkan Sözeri", "Cenk Özcan", "Recep Uçar", "Cihan Erdil", "Mehmet Altıparmak", "Tuncay Şanlı", "İbrahim Üzülmez", "Ozan Yılmaz", "Besim Durmuş", "Şenol Fidan", "Cevdet Uzunköprü", "Ümit Bozkurt"]}
    ]
  },
  "İngiltere": {
    region: "europe", divisions: [
      { tier: 4, name: "Premier League", cities: {
        London: ["Arsenal", "Chelsea", "Tottenham Hotspur", "West Ham United", "Crystal Palace", "Fulham", "Brentford"],
        Manchester: ["Manchester City", "Manchester United"], Liverpool: ["Liverpool", "Everton"],
        Birmingham: ["Aston Villa"], "Newcastle upon Tyne": ["Newcastle United"], Brighton: ["Brighton & Hove Albion"],
        Nottingham: ["Nottingham Forest"], Bournemouth: ["Bournemouth"], Wolverhampton: ["Wolverhampton Wanderers"]
      }, managers: ["Mikel Arteta", "Enzo Maresca", "Ange Postecoglou", "Julen Lopetegui", "Oliver Glasner", "Marco Silva", "Thomas Frank", "Pep Guardiola", "Rúben Amorim", "Arne Slot", "Sean Dyche", "Unai Emery", "Eddie Howe", "Fabian Hürzeler", "Nuno Espírito Santo", "Andoni Iraola", "Gary O'Neil"]},
      { tier: 3, name: "EFL Championship", cities: {
        Leeds: ["Leeds United"], Sheffield: ["Sheffield United", "Sheffield Wednesday"], Burnley: ["Burnley"],
        "West Bromwich": ["West Bromwich Albion"], Watford: ["Watford"], Norwich: ["Norwich City"],
        Middlesbrough: ["Middlesbrough"], Sunderland: ["Sunderland"], Coventry: ["Coventry City"],
        Hull: ["Hull City"], "Stoke-on-Trent": ["Stoke City"], Swansea: ["Swansea City"], Cardiff: ["Cardiff City"],
        London: ["Millwall", "QPR (Queens Park Rangers)"], Bristol: ["Bristol City"], Preston: ["Preston North End"],
        Blackburn: ["Blackburn Rovers"], Plymouth: ["Plymouth Argyle"], Portsmouth: ["Portsmouth"],
        Oxford: ["Oxford United"], Derby: ["Derby County"], Luton: ["Luton Town"]
      }, managers: ["Daniel Farke", "Chris Wilder", "Danny Röhl", "Scott Parker", "Carlos Corberán", "Tom Cleverley", "Johannes Hoff Thorup", "Michael Carrick", "Regis Le Bris", "Mark Robins", "Tim Walter", "Narcís Pelach", "Luke Williams", "Omer Riza", "Neil Harris", "Martí Cifuentes", "Liam Manning", "Paul Heckingbottom", "John Eustace", "Wayne Rooney", "John Mousinho", "Des Buckingham", "Paul Warne", "Matt Taylor"]}
    ]
  },
  "İspanya": {
    region: "europe", divisions: [
      { tier: 4, name: "La Liga", cities: {
        Madrid: ["Real Madrid", "Atletico Madrid", "Rayo Vallecano"], Barselona: ["Barcelona"],
        Bilbao: ["Athletic Bilbao"], "San Sebastián": ["Real Sociedad"], Villarreal: ["Villarreal"],
        Sevilla: ["Real Betis", "Sevilla"], Valencia: ["Valencia"], Girona: ["Girona"], Vigo: ["Celta Vigo"],
        Pamplona: ["Osasuna"], Palma: ["Mallorca"], Getafe: ["Getafe"], Valladolid: ["Real Valladolid"],
        "Las Palmas": ["Las Palmas"], "Vitoria-Gasteiz": ["Alaves"]
      }, managers: ["Carlo Ancelotti", "Diego Simeone", "Íñigo Pérez", "Hansi Flick", "Ernesto Valverde", "Imanol Alguacil", "Marcelino García Toral", "Manuel Pellegrini", "García Pimienta", "Rubén Baraja", "Míchel", "Claudio Giráldez", "Vicente Moreno", "Jagoba Arrasate", "José Bordalás", "Paulo Pezzolano", "Diego Martínez", "Luis García Plaza"]},
      { tier: 3, name: "Segunda División", cities: {
        Granada: ["Granada"], Almería: ["Almeria"], Cádiz: ["Cadiz"], Zaragoza: ["Real Zaragoza"],
        Elche: ["Elche"], Valencia: ["Levante"], Eibar: ["Eibar"], Oviedo: ["Real Oviedo"],
        Gijón: ["Sporting Gijon"], "Santa Cruz de Tenerife": ["Tenerife"], Santander: ["Racing Santander"],
        Albacete: ["Albacete"], Burgos: ["Burgos"], Huesca: ["Huesca"], "Miranda de Ebro": ["Mirandes"],
        Cartagena: ["Cartagena"], Elda: ["Eldense"], "Castellón de la Plana": ["Castellon"],
        "La Coruña": ["Deportivo La Coruna"], Málaga: ["Malaga"], Córdoba: ["Cordoba"], Ferrol: ["Racing de Ferrol"]
      }, managers: ["Fran Escribá", "Rubi", "Paco López", "Víctor Fernández", "Eder Sarabia", "Julián Calero", "Joseba Etxeberria", "Javi Calleja", "Rubén Albés", "Pepe Mel", "José Alberto López", "Alberto González", "Jon Pérez Bolo", "Antonio Hidalgo", "Alessio Lisci", "Jandro Castro", "Dani Ponz", "Dick Schreuder", "Idiakez", "Sergio Pellicer", "Iván Ania", "Cristóbal Parralo"]}
    ]
  },
  "İtalya": {
    region: "europe", divisions: [
      { tier: 4, name: "Serie A", cities: {
        Milano: ["Inter", "AC Milan"], Torino: ["Juventus", "Torino"], Napoli: ["Napoli"], Bergamo: ["Atalanta"],
        Roma: ["AS Roma", "Lazio"], Firenze: ["Fiorentina"], Bologna: ["Bologna"], Monza: ["Monza"],
        Genova: ["Genoa"], Udine: ["Udinese"], Cagliari: ["Cagliari"], Lecce: ["Lecce"], Verona: ["Hellas Verona"],
        Empoli: ["Empoli"], Parma: ["Parma"], Como: ["Como"], Venezia: ["Venezia"]
      }, managers: ["Simone Inzaghi", "Paulo Fonseca", "Thiago Motta", "Paolo Vanoli", "Antonio Conte", "Gian Piero Gasperini", "Claudio Ranieri", "Marco Baroni", "Raffaele Palladino", "Vincenzo Italiano", "Alessandro Nesta", "Alberto Gilardino", "Kosta Runjaić", "Davide Nicola", "Marco Giampaolo", "Paolo Zanetti", "Roberto D'Aversa", "Fabio Pecchia", "Cesc Fàbregas", "Eusebio Di Francesco"]},
      { tier: 3, name: "Serie B", cities: {
        Genova: ["Sampdoria"], Sassuolo: ["Sassuolo"], Palermo: ["Palermo"], Salerno: ["Salernitana"],
        Frosinone: ["Frosinone"], Pisa: ["Pisa"], Cremona: ["Cremonese"], "La Spezia": ["Spezia"],
        Brescia: ["Brescia"], Modena: ["Modena"], Catanzaro: ["Catanzaro"], Bari: ["Bari"],
        Cittadella: ["Cittadella"], "Reggio Emilia": ["Reggiana"], Cosenza: ["Cosenza"],
        Bolzano: ["Sudtirol"], Mantova: ["Mantova"], "Castellammare di Stabia": ["Juve Stabia"],
        Carrara: ["Carrarese"], Cesena: ["Cesena"]
      }, managers: ["Andrea Sottil", "Fabio Grosso", "Alessio Dionisi", "Stefano Colantuono", "Leandro Greco", "Filippo Inzaghi", "Eugenio Corini", "Luca D'Angelo", "Rolando Maran", "Pierpaolo Bisoli", "Fabio Caserta", "Moreno Longo", "Alessandro Dal Canto", "William Viali", "Massimiliano Alvini", "Federico Valente", "Davide Possanzini", "Guido Pagliuca", "Antonio Calabro", "Michele Mignani"]}
    ]
  },
  "Almanya": {
    region: "europe", divisions: [
      { tier: 4, name: "1. Bundesliga", cities: {
        München: ["Bayern Munich"], Leverkusen: ["Bayer Leverkusen"], Dortmund: ["Borussia Dortmund"],
        Leipzig: ["RB Leipzig"], Frankfurt: ["Eintracht Frankfurt"], Stuttgart: ["Stuttgart"],
        Freiburg: ["Freiburg"], Sinsheim: ["TSG Hoffenheim"], Heidenheim: ["Heidenheim"],
        Bremen: ["Werder Bremen"], Mainz: ["Mainz 05"], Augsburg: ["Augsburg"], Wolfsburg: ["Wolfsburg"],
        Berlin: ["Union Berlin"], Mönchengladbach: ["Borussia Mönchengladbach"], Bochum: ["Bochum"],
        Hamburg: ["St. Pauli"], Kiel: ["Holstein Kiel"]
      }, managers: ["Vincent Kompany", "Xabi Alonso", "Nuri Şahin", "Marco Rose", "Dino Toppmöller", "Sebastian Hoeness", "Julian Schuster", "Christian Ilzer", "Frank Schmidt", "Ole Werner", "Bo Henriksen", "Jess Thorup", "Ralph Hasenhüttl", "Bo Svensson / Urs Fischer ekolü", "Gerardo Seoane", "Dieter Hecking", "Alexander Blessin", "Marcel Rapp"]},
      { tier: 3, name: "2. Bundesliga", cities: {
        Gelsenkirchen: ["Schalke 04"], Berlin: ["Hertha Berlin"], Hamburg: ["Hamburg"],
        Köln: ["Köln"], Hannover: ["Hannover 96"], Kaiserslautern: ["Kaiserslautern"],
        Nürnberg: ["Nürnberg"], Düsseldorf: ["Fortuna Düsseldorf"], Karlsruhe: ["Karlsruher SC"],
        Paderborn: ["Paderborn"], Magdeburg: ["Magdeburg"], Fürth: ["Greuther Fürth"],
        Darmstadt: ["SV Darmstadt 98"], Braunschweig: ["Eintracht Braunschweig"], Münster: ["Preußen Münster"],
        Ulm: ["SSV Ulm"], "Spiesen-Elversberg": ["Elversberg"], Regensburg: ["Regensburg"]
      }, managers: ["Kees van Wonderen", "Cristian Fiél", "Merlin Polzin", "Gerhard Struber", "Stefan Leitl", "Markus Anfang", "Miroslav Klose", "Daniel Thioune", "Christian Eichner", "Lukas Kwasniok", "Christian Titz", "Leonhard Haas", "Florian Kohfeldt", "Daniel Scherning", "Sascha Hildmann", "Thomas Wörle", "Horst Steffen", "Andreas Patz"]}
    ]
  },
  "Fransa": {
    region: "europe", divisions: [
      { tier: 4, name: "Ligue 1", cities: {
        Paris: ["Paris Saint-Germain (PSG)"], Monaco: ["AS Monaco"], Marseille: ["Marseille"], Lille: ["Lille"],
        Lyon: ["Lyon"], Nice: ["Nice"], Lens: ["Lens"], Brest: ["Brest"], Rennes: ["Rennes"],
        Strasbourg: ["Strasbourg"], Toulouse: ["Toulouse"], Reims: ["Reims"], Montpellier: ["Montpellier"],
        Nantes: ["Nantes"], "Le Havre": ["Le Havre"], Auxerre: ["Auxerre"], Angers: ["Angers"],
        "Saint-Étienne": ["Saint-Étienne"]
      }, managers: ["Luis Enrique", "Adi Hütter", "Roberto De Zerbi", "Bruno Génésio", "Pierre Sage", "Franck Haise", "Will Still", "Eric Roy", "Jorge Sampaoli", "Liam Rosenior", "Carles Martínez Novell", "Luka Elsner", "Jean-Louis Gasset", "Antoine Kombouaré", "Didier Digard", "Christophe Pélissier", "Alexandre Dujeux", "Olivier Dall'Oglio"]},
      { tier: 3, name: "Ligue 2", cities: {
        Bordeaux: ["Bordeaux"], Paris: ["Paris FC"], Metz: ["Metz"], Lorient: ["Lorient"], Guingamp: ["Guingamp"],
        Bastia: ["Bastia"], Caen: ["Caen"], Troyes: ["Troyes"], Ajaccio: ["Ajaccio"], Grenoble: ["Grenoble"],
        Pau: ["Pau FC"], Amiens: ["Amiens"], Laval: ["Laval"], Rodez: ["Rodez"], Dunkerque: ["Dunkerque"],
        Annecy: ["Annecy"], Martigues: ["Martigues"],         "Saint-Ouen": ["Red Star FC"]
      }, managers: ["Alt lig amatör yapılanma / Hukuki süreç", "Stéphane Gilli", "Stéphane Le Mignan", "Olivier Pantaloni", "Sylvain Ripoll", "Benoît Tavenot", "Nicolas Seube", "Stéphane Dumont", "Mathieu Chabert", "Oswald Tanchot", "Nicolas Usaï", "Omar Daf", "Olivier Frapolli", "Didier Santini", "Luís Castro", "Laurent Guyot", "Thierry Laurey", "Habib Beye"]}
    ]
  }
};
const REGIONAL_ACADEMY_TEAMS_BY_COUNTRY = {
  "Türkiye": [
    ["Aydın Yıldızspor", "Aydın"], ["İncirliova Belediyespor", "İncirliova"], ["Sökespor", "Söke"],
    ["Kuşadasıspor", "Kuşadası"], ["Nazillispor U17", "Nazilli"], ["Altınordu U17", "İzmir"],
    ["Bucaspor 1928 U17", "İzmir"], ["Menemen FK U17", "Menemen"], ["Manisa FK U17", "Manisa"],
    ["İzmir Çoruhlu FK", "İzmir"], ["Maltepespor", "İstanbul"], ["Vefa Spor", "İstanbul"],
    ["Bağcılar SK", "İstanbul"], ["Alibeyköyspor", "İstanbul"], ["Beyoğlu Yeni Çarşı U17", "İstanbul"],
    ["Silivrispor U17", "Silivri"], ["Sarıyer U17", "İstanbul"], ["İznikspor", "İznik"],
    ["Kestel Çilekspor", "Kestel"], ["Gölcükspor", "Gölcük"], ["Darıca Gençlerbirliği", "Darıca"],
    ["Keçiören Belediyesi Bağlumspor", "Ankara"], ["Çankırı FK", "Çankırı"], ["Eskişehir Demirspor", "Eskişehir"],
    ["Fatsa Belediyespor U17", "Fatsa"], ["Çarşambaspor", "Çarşamba"], ["Manavgat Belediyespor", "Manavgat"],
    ["Korkuteli Belediyespor", "Korkuteli"], ["Onikişubat SK", "Kahramanmaraş"]
  ],
  "İngiltere": [
    ["Millwall U17", "London"], ["QPR U17", "London"], ["Luton Town U17", "Luton"],
    ["Plymouth Argyle U17", "Plymouth"], ["Dulwich Hamlet", "London"], ["Salford City U17", "Salford"]
  ],
  "İspanya": [
    ["Rayo Vallecano U17", "Madrid"], ["Getafe U17", "Getafe"], ["Leganés U17", "Leganés"],
    ["Málaga U17", "Málaga"], ["Deportivo La Coruña U17", "La Coruña"]
  ],
  "İtalya": [
    ["Palermo U17", "Palermo"], ["Bari U17", "Bari"], ["Brescia U17", "Brescia"],
    ["Juve Stabia U17", "Castellammare di Stabia"], ["Cesena U17", "Cesena"]
  ],
  "Almanya": [
    ["St. Pauli U17", "Hamburg"], ["Bochum U17", "Bochum"], ["Kaiserslautern U17", "Kaiserslautern"],
    ["Nürnberg U17", "Nürnberg"], ["Preußen Münster U17", "Münster"]
  ],
  "Fransa": [
    ["Paris FC U17", "Paris"], ["Red Star FC U17", "Saint-Ouen"], ["Caen U17", "Caen"],
    ["Auxerre U17", "Auxerre"], ["Le Havre U17", "Le Havre"]
  ]
};
const ELITE_YOUTH_TEAMS_BY_COUNTRY = {
  "Türkiye": {
    U19: [
      ["Galatasaray U19", "İstanbul"], ["Fenerbahçe U19", "İstanbul"], ["Beşiktaş U19", "İstanbul"],
      ["Başakşehir U19", "İstanbul"], ["Kasımpaşa U19", "İstanbul"], ["Eyüpspor U19", "İstanbul"],
      ["İstanbulspor U19", "İstanbul"], ["Fatih Karagümrük U19", "İstanbul"], ["Trabzonspor U19", "Trabzon"],
      ["Bursaspor U19", "Bursa"], ["Samsunspor U19", "Samsun"], ["Konyaspor U19", "Konya"],
      ["Antalyaspor U19", "Antalya"], ["Alanyaspor U19", "Alanya"], ["Göztepe U19", "İzmir"],
      ["Gençlerbirliği U19", "Ankara"], ["Sivasspor U19", "Sivas"], ["Adana Demirspor U19", "Adana"]
    ]
  },
  "İngiltere": {
    U21: [
      ["Manchester City U21", "Manchester"], ["Arsenal U21", "London"], ["Chelsea U21", "London"],
      ["Liverpool U21", "Liverpool"], ["Manchester United U21", "Manchester"], ["Tottenham Hotspur U21", "London"],
      ["Brighton U21", "Brighton"], ["West Ham United U21", "London"]
    ]
  },
  "İspanya": {
    U21: [
      ["Real Madrid Castilla U21", "Madrid"], ["Barcelona Atlètic U21", "Barcelona"],
      ["Real Sociedad B U21", "San Sebastián"], ["Villarreal B U21", "Villarreal"],
      ["Athletic Bilbao B (Bilbao Athletic) U21", "Bilbao"], ["Valencia Mestalla U21", "Valencia"]
    ]
  },
  "İtalya": {
    U19: [
      ["Inter Primavera U19", "Milano"], ["AC Milan Primavera U19", "Milano"],
      ["AS Roma Primavera U19", "Roma"], ["Fiorentina Primavera U19", "Firenze"],
      ["Torino Primavera U19", "Torino"]
    ],
    U21: [
      ["Milan Futuro U21", "Milano"], ["Juventus Next Gen U21", "Torino"], ["Atalanta U23", "Bergamo"]
    ]
  },
  "Almanya": {
    U19: [
      ["Borussia Dortmund U19", "Dortmund"], ["Bayern Munich U19", "München"],
      ["Bayer Leverkusen U19", "Leverkusen"], ["St. Pauli U19", "Hamburg"], ["Bochum U19", "Bochum"],
      ["Kaiserslautern U19", "Kaiserslautern"], ["Nürnberg U19", "Nürnberg"], ["Preußen Münster U19", "Münster"]
    ],
    U21: [
      ["Borussia Dortmund II U21", "Dortmund"], ["Bayern Munich II U21", "München"],
      ["VfB Stuttgart II U21", "Stuttgart"], ["Schalke 04 II U21", "Gelsenkirchen"],
      ["Hertha Berlin II U21", "Berlin"]
    ]
  },
  "Fransa": {
    U19: [
      ["PSG U19", "Paris"], ["Olympique Lyonnais U19", "Lyon"], ["AS Monaco U19", "Monaco"],
      ["Stade Rennais B U19", "Rennes"], ["Lille OSC B U19", "Lille"],
      ["Olympique de Marseille B U19", "Marseille"]
    ],
    U21: [["Olympique Lyonnais B U21", "Lyon"]]
  }
};
function academyTeamBaseName(teamName) {
  return String(teamName).replace(/\s+U(?:16|17|19|20|21|23)$/, "").trim();
}
const ACADEMY_TEAM_DETAILS_BY_NAME = Object.create(null);
Object.entries(REGIONAL_ACADEMY_TEAMS_BY_COUNTRY).forEach(([country, teams]) => {
  teams.forEach(([name, city]) => {
    ACADEMY_TEAM_DETAILS_BY_NAME[academyTeamBaseName(name)] = { country, city };
  });
});
Object.entries(ELITE_YOUTH_TEAMS_BY_COUNTRY).forEach(([country, divisions]) => {
  Object.values(divisions).flat().forEach(([name, city]) => {
    ACADEMY_TEAM_DETAILS_BY_NAME[academyTeamBaseName(name)] = { country, city };
  });
});
function academyTeamsForCountry(country, stage, division) {
  if (stage === "regional") {
    return (REGIONAL_ACADEMY_TEAMS_BY_COUNTRY[country] || []).map(([name]) =>
      `${academyTeamBaseName(name)} ${division}`
    );
  }
  const teams = ELITE_YOUTH_TEAMS_BY_COUNTRY[country];
  return teams && teams[division] ? teams[division].map(([name]) => name) : [];
}
function academyDivisionsForCountry(country) {
  const divisions = ELITE_YOUTH_TEAMS_BY_COUNTRY[country];
  return divisions ? Object.keys(divisions) : [];
}
function clubsInDivision(division) {
  let index = 0;
  return Object.entries(division.cities).flatMap(([city, clubs]) =>
    clubs.map(name => ({ name, city, manager: division.managers[index++] || "Belirtilmedi" }))
  );
}
const CLUB_DETAILS_BY_NAME = Object.create(null);
Object.entries(CLUB_LEAGUE_DATA).forEach(([country, data]) => {
  data.divisions.forEach(division => clubsInDivision(division).forEach(club => {
    CLUB_DETAILS_BY_NAME[club.name] = { ...club, country, region: data.region, tier: division.tier, league: division.name };
  }));
});
function teamManager(teamName) {
  const details = CLUB_DETAILS_BY_NAME[teamBaseName(teamName)];
  return details ? details.manager : "Belirtilmedi";
}
function clubsInCountry(country) {
  const data = CLUB_LEAGUE_DATA[country];
  return data ? data.divisions.flatMap(clubsInDivision) : [];
}
const LOCAL_AMATEUR_TEAMS = [
  "Aydın Amatör Spor", "Semt Gençlik Gücü", "Çarşıspor", "İstanbul Mahalle FK", "Ankara Mahalle FK",
  "İzmir Amatör Spor", "Bursa Amatör Spor", "Adana Mahalle FK", "Trabzon Semt Spor", "Antalya Mahalle FK",
  "Gaziantep Gençlik", "Eskişehir Amatör Spor", "Samsun Semt Spor", "Kartal Gençlik", "Kadıköy Yıldızları",
  "Güngören Gençlik", "Bağcılar Atletik", "Mamak Gençlik", "Bornova Gençlik", "Nilüfer Gençlik"
];
const REGIONAL_ACADEMY_CLUBS = [
  "Nazillispor", "İnegölspor", "Aydınspor 1923", "Eskişehirspor", "Ankara Demirspor",
  "Karşıyaka", "Altay", "Bursaspor", "Adanaspor", "Adana Demirspor",
  "Trabzonspor", "Antalyaspor", "Gaziantep FK", "Samsunspor", "Keçiörengücü",
  "Kasımpaşa", "Başakşehir", "Gençlerbirliği", "Ankaragücü", "Göztepe"
];
const REGIONAL_CLUB_BY_CITY = {
  İstanbul: "İstanbulspor", Ankara: "Ankara Demirspor", İzmir: "Karşıyaka", Bursa: "İnegölspor",
  Adana: "Adanaspor", Trabzon: "Trabzonspor", Antalya: "Antalyaspor", Gaziantep: "Gaziantep FK",
  Eskişehir: "Eskişehirspor", Samsun: "Samsunspor", Aydın: "Nazillispor", Nazilli: "Nazillispor",
  Tokyo: "Tokyo United", Seul: "Seoul E-Land", Almatı: "Kairat Academy", Mumbai: "Mumbai City",
  Paris: "Red Star FC", Londra: "Leyton Orient", Amsterdam: "FC Volendam", Berlin: "Viktoria Berlin"
};
const ASIAN_AMATEUR_TEAMS = ["Tokyo Street FC", "Shibuya Gençlik", "Seul Metro Spor", "Mapo Mahalle FK", "Almatı Gençlik", "Mumbai Sokak Spor", "Suginami United", "Songpa Atletik", "Setagaya United", "Gangseo Gençlik", "Auezov Atletik", "Bandra FC", "Tokyo Metro Spor", "Seoul Tigers", "Medeu United", "Andheri Gençlik", "Yokohama Street FC", "Incheon Mahalle", "Astana Gençlik", "Dharavi United"];
const EUROPEAN_AMATEUR_TEAMS = ["Paris Cage FC", "Saint-Denis Gençlik", "Hackney United", "Brixton Athletic", "Amsterdam Canal FC", "Noord Sokak Spor", "Berlin Cage Club", "Kreuzberg Gençlik", "Belleville United", "Aubervilliers FC", "Southwark Athletic", "Zuidoost Gençlik", "Oost United", "Neukölln FC", "Wedding Atletik", "Paris Banlieue Spor", "London Cage FC", "Canal Side United", "Berlin Street FC", "Hackney Gençlik"];
const ASIAN_REGIONAL_CLUBS = ["Tokyo United", "Seoul E-Land", "Kairat Academy", "Mumbai City", "FC Tokyo", "FC Seoul", "Kairat Almaty", "Suwon FC", "Tokyo Verdy", "Incheon United", "Almaty Gençlik", "Mumbai United", "Yokohama FC", "Urawa Red Diamonds", "Jeonbuk Motors", "Pune City", "Nagoya Grampus", "Gangwon FC", "Astana FC", "Hyderabad FC"];
const EUROPEAN_REGIONAL_CLUBS = ["Red Star FC", "Leyton Orient", "FC Volendam", "Viktoria Berlin", "Paris FC", "Arsenal", "Ajax", "Hertha BSC", "Chelsea", "Tottenham Hotspur", "PSG", "Fulham", "Union Berlin", "Monaco", "Lyon", "Stuttgart", "Brighton", "PSV", "Anderlecht", "Sporting CP"];
const CAREER_STAGES = [
  { id: "amateur", title: "Sokak & amatör küme", ages: "15–16", league: "Amatör Yerel Küme" },
  { id: "regional", title: "Bölgesel akademi & U16/U17", ages: "16–17", league: "U16/U17 Bölgesel Akademi Ligi" },
  { id: "u19", title: "Elit U19 & A takım eşiği", ages: "17–18", league: "U19 Gelişim Ligi / Profesyonel A takım" },
  { id: "international", title: "Uluslararası sahne & Avrupa", ages: "19+", league: "Avrupa U21 Ligi" }
];
const YOUTH_TEAMS = [
  "Galatasaray", "Fenerbahçe", "Beşiktaş", "Başakşehir", "Kasımpaşa", "Gençlerbirliği",
  "Ankaragücü", "Keçiörengücü", "Göztepe", "Altay", "Karşıyaka", "Bursaspor",
  "Adanaspor", "Adana Demirspor", "Trabzonspor", "Antalyaspor", "Gaziantep FK",
  "Eskişehirspor", "Samsunspor", "Kayserispor", "Nazillispor", "Aydınspor 1923"
].map(club => `${club} U19`);
const ASIAN_YOUTH_TEAMS = ["FC Tokyo", "Tokyo Verdy", "Kawasaki Frontale", "FC Seoul", "Suwon FC", "Incheon United", "Kairat Almaty", "Astana FC", "Mumbai City FC", "Hyderabad FC", "Urawa Red Diamonds", "Yokohama FC", "Jeonbuk Motors", "Pune City", "Nagoya Grampus", "Gangwon FC", "Seoul E-Land", "Tokyo United", "Almaty Gençlik", "Mumbai United"].map(club => `${club} U19`);
const EUROPEAN_YOUTH_TEAMS = [
  "Ajax U21", "Sporting CP U21", "Sevilla Atlético", "Atalanta U23", "PSV U21",
  "Benfica B", "Porto B", "Real Sociedad B", "Villarreal B", "Girona B", "Lyon U21",
  "Monaco U21", "Club Brugge U21", "Anderlecht U21", "Basel U21", "Salzburg U21",
  "Dortmund U21", "Stuttgart U21", "Arsenal U21", "Brighton U21"
];
const EUROPEAN_CLUBS = ["Ajax", "Sporting CP", "Sevilla", "Atalanta"];
const SAVE_KEY = "sokagin-yukselen-yildizi-save";
const SAVE_SLOTS_KEY = "sokagin-yukselen-yildizi-slots";
const ACTIVE_SLOT_KEY = "sokagin-yukselen-yildizi-active-slot";
const SAVE_SLOT_COUNT = 10;
const CLUB_HOME_BY_NAME = {
  "Galatasaray": ["Türkiye", "İstanbul", "Sarıyer"], "Fenerbahçe": ["Türkiye", "İstanbul", "Kadıköy"],
  "Beşiktaş": ["Türkiye", "İstanbul", "Beşiktaş"], "Başakşehir": ["Türkiye", "İstanbul", "Başakşehir"],
  "Kasımpaşa": ["Türkiye", "İstanbul", "Beyoğlu"], "İstanbulspor": ["Türkiye", "İstanbul", "Zeytinburnu"],
  "Gençlerbirliği": ["Türkiye", "Ankara", "Çankaya"], "Ankaragücü": ["Türkiye", "Ankara", "Yenimahalle"],
  "Keçiörengücü": ["Türkiye", "Ankara", "Keçiören"], "Ankara Demirspor": ["Türkiye", "Ankara", "Çankaya"],
  "Göztepe": ["Türkiye", "İzmir", "Konak"], "Altay": ["Türkiye", "İzmir", "Konak"],
  "Karşıyaka": ["Türkiye", "İzmir", "Karşıyaka"], "Bursaspor": ["Türkiye", "Bursa", "Osmangazi"],
  "İnegölspor": ["Türkiye", "Bursa", "İnegöl"], "Adanaspor": ["Türkiye", "Adana", "Seyhan"],
  "Adana Demirspor": ["Türkiye", "Adana", "Seyhan"], "Trabzonspor": ["Türkiye", "Trabzon", "Ortahisar"],
  "Antalyaspor": ["Türkiye", "Antalya", "Muratpaşa"], "Gaziantep FK": ["Türkiye", "Gaziantep", "Şahinbey"],
  "Eskişehirspor": ["Türkiye", "Eskişehir", "Odunpazarı"], "Samsunspor": ["Türkiye", "Samsun", "İlkadım"],
  "Kayserispor": ["Türkiye", "Kayseri", "Kocasinan"], "Nazillispor": ["Türkiye", "Aydın", "Nazilli"],
  "Aydınspor 1923": ["Türkiye", "Aydın", "Efeler"], "Aydın Amatör Spor": ["Türkiye", "Aydın", "Efeler"],
  "Konak Spor": ["Türkiye", "İzmir", "Konak"], "Semt Gençlik Gücü": ["Türkiye", "İstanbul", "Beyoğlu"],
  "Çarşıspor": ["Türkiye", "İstanbul", "Beşiktaş"],
  "FC Tokyo": ["Japonya", "Tokyo", "Chōfu"], "Tokyo Verdy": ["Japonya", "Tokyo", "Inagi"],
  "Kawasaki Frontale": ["Japonya", "Kawasaki", "Nakahara"], "Tokyo United": ["Japonya", "Tokyo", "Bunkyō"],
  "Yokohama FC": ["Japonya", "Yokohama", "Hodogaya"], "Urawa Red Diamonds": ["Japonya", "Saitama", "Urawa"],
  "Nagoya Grampus": ["Japonya", "Nagoya", "Minato"], "FC Seoul": ["Güney Kore", "Seul", "Mapo-gu"],
  "Tokyo Street FC": ["Japonya", "Tokyo", "Shibuya"], "Shibuya Gençlik": ["Japonya", "Tokyo", "Shibuya"],
  "Suginami United": ["Japonya", "Tokyo", "Suginami"], "Setagaya United": ["Japonya", "Tokyo", "Setagaya"],
  "Tokyo Metro Spor": ["Japonya", "Tokyo", "Chiyoda"], "Yokohama Street FC": ["Japonya", "Yokohama", "Naka"],
  "Suwon FC": ["Güney Kore", "Suwon", "Paldal-gu"], "Incheon United": ["Güney Kore", "Incheon", "Jung-gu"],
  "Seoul E-Land": ["Güney Kore", "Seul", "Songpa-gu"], "Jeonbuk Motors": ["Güney Kore", "Jeonju", "Deokjin-gu"],
  "Gangwon FC": ["Güney Kore", "Chuncheon", "Songam-dong"], "Seul Metro Spor": ["Güney Kore", "Seul", "Mapo-gu"],
  "Mapo Mahalle FK": ["Güney Kore", "Seul", "Mapo-gu"], "Songpa Atletik": ["Güney Kore", "Seul", "Songpa-gu"],
  "Gangseo Gençlik": ["Güney Kore", "Seul", "Gangseo-gu"], "Seoul Tigers": ["Güney Kore", "Seul", "Yongsan-gu"],
  "Incheon Mahalle": ["Güney Kore", "Incheon", "Jung-gu"], "Kairat Academy": ["Kazakistan", "Almatı", "Bostandyk"],
  "Kairat Almaty": ["Kazakistan", "Almatı", "Bostandyk"], "Astana FC": ["Kazakistan", "Astana", "Saryarka"],
  "Almatı Gençlik": ["Kazakistan", "Almatı", "Bostandyk"], "Almaty Gençlik": ["Kazakistan", "Almatı", "Bostandyk"],
  "Auezov Atletik": ["Kazakistan", "Almatı", "Auezov"], "Medeu United": ["Kazakistan", "Almatı", "Medeu"],
  "Astana Gençlik": ["Kazakistan", "Astana", "Saryarka"], "Mumbai City FC": ["Hindistan", "Mumbai", "Andheri"],
  "Mumbai City": ["Hindistan", "Mumbai", "Andheri"], "Mumbai Sokak Spor": ["Hindistan", "Mumbai", "Dharavi"],
  "Mumbai United": ["Hindistan", "Mumbai", "Bandra"], "Pune City": ["Hindistan", "Pune", "Shivajinagar"],
  "Hyderabad FC": ["Hindistan", "Haydarabad", "Gachibowli"], "Bandra FC": ["Hindistan", "Mumbai", "Bandra"],
  "Andheri Gençlik": ["Hindistan", "Mumbai", "Andheri"], "Dharavi United": ["Hindistan", "Mumbai", "Dharavi"],
  "Paris FC": ["Fransa", "Paris", "13e arrondissement"], "Paris Saint-Germain": ["Fransa", "Paris", "16e arrondissement"],
  "PSG": ["Fransa", "Paris", "16e arrondissement"], "Red Star FC": ["Fransa", "Saint-Ouen", "Garibaldi"],
  "Saint-Denis Gençlik": ["Fransa", "Saint-Denis", "Saint-Denis"],
  "Aubervilliers FC": ["Fransa", "Aubervilliers", "Aubervilliers"],
  "Monaco": ["Monako", "Monako", "Fontvieille"], "Lyon": ["Fransa", "Lyon", "Décines-Charpieu"],
  "Arsenal": ["Birleşik Krallık", "Londra", "Islington"], "Chelsea": ["Birleşik Krallık", "Londra", "Fulham"],
  "Tottenham Hotspur": ["Birleşik Krallık", "Londra", "Tottenham"], "Fulham": ["Birleşik Krallık", "Londra", "Fulham"],
  "Leyton Orient": ["Birleşik Krallık", "Londra", "Leyton"], "Brighton": ["Birleşik Krallık", "Brighton", "Falmer"],
  "Hackney United": ["Birleşik Krallık", "Londra", "Hackney"], "Brixton Athletic": ["Birleşik Krallık", "Londra", "Brixton"],
  "Southwark Athletic": ["Birleşik Krallık", "Londra", "Southwark"], "London Cage FC": ["Birleşik Krallık", "Londra", "Hackney"],
  "Hackney Gençlik": ["Birleşik Krallık", "Londra", "Hackney"],
  "Ajax": ["Hollanda", "Amsterdam", "Zuidoost"], "FC Utrecht": ["Hollanda", "Utrecht", "Utrecht-Zuid"],
  "FC Volendam": ["Hollanda", "Volendam", "Volendam"], "PSV": ["Hollanda", "Eindhoven", "Strijp"],
  "Noord Sokak Spor": ["Hollanda", "Amsterdam", "Noord"], "Zuidoost Gençlik": ["Hollanda", "Amsterdam", "Zuidoost"],
  "Oost United": ["Hollanda", "Amsterdam", "Oost"], "Amsterdam Canal FC": ["Hollanda", "Amsterdam", "Centrum"],
  "Canal Side United": ["Hollanda", "Amsterdam", "Centrum"],
  "Hertha BSC": ["Almanya", "Berlin", "Charlottenburg-Wilmersdorf"], "Union Berlin": ["Almanya", "Berlin", "Köpenick"],
  "Viktoria Berlin": ["Almanya", "Berlin", "Lichterfelde"], "Stuttgart": ["Almanya", "Stuttgart", "Bad Cannstatt"],
  "Dortmund": ["Almanya", "Dortmund", "Innenstadt-West"], "Berlin Cage Club": ["Almanya", "Berlin", "Kreuzberg"],
  "Berlin Street FC": ["Almanya", "Berlin", "Kreuzberg"], "Neukölln FC": ["Almanya", "Berlin", "Neukölln"],
  "Wedding Atletik": ["Almanya", "Berlin", "Wedding"], "Kreuzberg Gençlik": ["Almanya", "Berlin", "Kreuzberg"],
  "Sevilla Atlético": ["İspanya", "Sevilla", "Nervión"],
  "Sevilla": ["İspanya", "Sevilla", "Nervión"], "Real Sociedad": ["İspanya", "San Sebastián", "Anoeta"],
  "Villarreal": ["İspanya", "Villarreal", "Villarreal"], "Girona": ["İspanya", "Girona", "Montilivi"],
  "Atalanta": ["İtalya", "Bergamo", "Borgo Santa Caterina"], "Sporting CP": ["Portekiz", "Lizbon", "Alvalade"],
  "Benfica": ["Portekiz", "Lizbon", "São Domingos de Benfica"], "Porto": ["Portekiz", "Porto", "Campanhã"],
  "Anderlecht": ["Belçika", "Brüksel", "Anderlecht"], "Club Brugge": ["Belçika", "Brugge", "Sint-Andries"],
  "Basel": ["İsviçre", "Basel", "Sankt Jakob"], "Salzburg": ["Avusturya", "Salzburg", "Wals-Siezenheim"]
};
const TEAM_NAME_LABELS = {
  "FC Tokyo": "FC東京", "Tokyo Verdy": "東京ヴェルディ", "Kawasaki Frontale": "川崎フロンターレ",
  "Tokyo United": "東京ユナイテッド", "Yokohama FC": "横浜FC", "Urawa Red Diamonds": "浦和レッズ",
  "Nagoya Grampus": "名古屋グランパス", "Tokyo Street FC": "東京ストリートFC",
  "Shibuya Gençlik": "渋谷ユース", "Suginami United": "杉並ユナイテッド", "Setagaya United": "世田谷ユナイテッド",
  "Tokyo Metro Spor": "東京メトロSC", "Yokohama Street FC": "横浜ストリートFC",
  "FC Seoul": "FC서울", "Suwon FC": "수원FC", "Incheon United": "인천 유나이티드",
  "Seoul E-Land": "서울 이랜드", "Jeonbuk Motors": "전북 현대", "Gangwon FC": "강원FC",
  "Seul Metro Spor": "서울 메트로 SC", "Mapo Mahalle FK": "마포 동네 FC", "Songpa Atletik": "송파 애슬레틱",
  "Gangseo Gençlik": "강서 유스", "Seoul Tigers": "서울 타이거즈", "Incheon Mahalle": "인천 동네 FC",
  "Kairat Academy": "Қайрат академиясы", "Kairat Almaty": "Қайрат Алматы", "Astana FC": "Астана ФК",
  "Almatı Gençlik": "Алматы Жастар", "Almaty Gençlik": "Алматы Жастар", "Auezov Atletik": "Әуезов Атлетик",
  "Medeu United": "Медеу Юнайтед", "Astana Gençlik": "Астана Жастар",
  "Mumbai City FC": "मुंबई सिटी एफसी", "Mumbai City": "मुंबई सिटी", "Mumbai United": "मुंबई यूनाइटेड",
  "Pune City": "पुणे सिटी", "Hyderabad FC": "हैदराबाद एफसी", "Mumbai Sokak Spor": "मुंबई स्ट्रीट क्लब",
  "Bandra FC": "बांद्रा एफसी", "Andheri Gençlik": "अंधेरी युवा", "Dharavi United": "धारावी यूनाइटेड",
  "Paris Cage FC": "Paris Cage FC", "Saint-Denis Gençlik": "Saint-Denis Jeunes", "Belleville United": "Belleville Union",
  "Aubervilliers FC": "Aubervilliers FC", "Paris Banlieue Spor": "Paris Banlieue FC",
  "Hackney United": "Hackney United", "Brixton Athletic": "Brixton Athletic", "Southwark Athletic": "Southwark Athletic",
  "London Cage FC": "London Cage FC", "Hackney Gençlik": "Hackney Youth",
  "Amsterdam Canal FC": "Amsterdamse Kanaal FC", "Noord Sokak Spor": "Noord Straat FC",
  "Zuidoost Gençlik": "Zuidoost Jeugd", "Oost United": "Oost United", "Canal Side United": "Kanaalzijde United",
  "Berlin Cage Club": "Berliner Käfig-Club", "Kreuzberg Gençlik": "Kreuzberg Jugend",
  "Neukölln FC": "Neukölln FC", "Wedding Atletik": "Wedding Athletik", "Berlin Street FC": "Berliner Straßen-FC"
};
const TEAM_LOCATION_HINTS = [
  { words: ["Kadıköy", "Fenerbahçe"], home: ["Türkiye", "İstanbul", "Kadıköy"] },
  { words: ["Üsküdar"], home: ["Türkiye", "İstanbul", "Üsküdar"] },
  { words: ["Bağcılar"], home: ["Türkiye", "İstanbul", "Bağcılar"] },
  { words: ["Küçükçekmece"], home: ["Türkiye", "İstanbul", "Küçükçekmece"] },
  { words: ["Kartal"], home: ["Türkiye", "İstanbul", "Kartal"] },
  { words: ["Esenyurt"], home: ["Türkiye", "İstanbul", "Esenyurt"] },
  { words: ["Güngören"], home: ["Türkiye", "İstanbul", "Güngören"] },
  { words: ["Gaziosmanpaşa"], home: ["Türkiye", "İstanbul", "Gaziosmanpaşa"] },
  { words: ["İstanbul", "Boğaz", "Marmara", "Anadolu"], home: ["Türkiye", "İstanbul", "Merkez"] },
  { words: ["Keçiören"], home: ["Türkiye", "Ankara", "Keçiören"] },
  { words: ["Mamak"], home: ["Türkiye", "Ankara", "Mamak"] },
  { words: ["Çankaya"], home: ["Türkiye", "Ankara", "Çankaya"] },
  { words: ["Ankara"], home: ["Türkiye", "Ankara", "Merkez"] },
  { words: ["Bornova"], home: ["Türkiye", "İzmir", "Bornova"] },
  { words: ["Buca"], home: ["Türkiye", "İzmir", "Buca"] },
  { words: ["Karşıyaka"], home: ["Türkiye", "İzmir", "Karşıyaka"] },
  { words: ["İzmir"], home: ["Türkiye", "İzmir", "Konak"] },
  { words: ["Bursa", "Nilüfer", "Osmangazi", "Yıldırım"], home: ["Türkiye", "Bursa", "Osmangazi"] },
  { words: ["Adana", "Seyhan", "Çukurova", "Yüreğir"], home: ["Türkiye", "Adana", "Seyhan"] },
  { words: ["Trabzon", "Ortahisar", "Akçaabat"], home: ["Türkiye", "Trabzon", "Ortahisar"] },
  { words: ["Antalya", "Muratpaşa", "Konyaaltı"], home: ["Türkiye", "Antalya", "Muratpaşa"] },
  { words: ["Gaziantep", "Şahinbey", "Şehitkamil"], home: ["Türkiye", "Gaziantep", "Şahinbey"] },
  { words: ["Eskişehir", "Odunpazarı"], home: ["Türkiye", "Eskişehir", "Odunpazarı"] },
  { words: ["Samsun", "İlkadım", "Atakum"], home: ["Türkiye", "Samsun", "İlkadım"] },
  { words: ["Aydın", "Nazilli"], home: ["Türkiye", "Aydın", "Nazilli"] },
  { words: ["Tokyo", "Shibuya", "Suginami", "Setagaya"], home: ["Japonya", "Tokyo", "Shibuya"] },
  { words: ["Yokohama"], home: ["Japonya", "Yokohama", "Naka"] },
  { words: ["Nagoya"], home: ["Japonya", "Nagoya", "Minato"] },
  { words: ["Urawa", "Saitama"], home: ["Japonya", "Saitama", "Urawa"] },
  { words: ["Seul", "Seoul", "Mapo", "Songpa"], home: ["Güney Kore", "Seul", "Mapo-gu"] },
  { words: ["Gangseo"], home: ["Güney Kore", "Seul", "Gangseo-gu"] },
  { words: ["Suwon"], home: ["Güney Kore", "Suwon", "Paldal-gu"] },
  { words: ["Incheon"], home: ["Güney Kore", "Incheon", "Jung-gu"] },
  { words: ["Jeonbuk", "Jeonju"], home: ["Güney Kore", "Jeonju", "Deokjin-gu"] },
  { words: ["Gangwon"], home: ["Güney Kore", "Chuncheon", "Songam-dong"] },
  { words: ["Almatı", "Almaty", "Auezov", "Medeu"], home: ["Kazakistan", "Almatı", "Bostandyk"] },
  { words: ["Astana"], home: ["Kazakistan", "Astana", "Saryarka"] },
  { words: ["Mumbai", "Bandra", "Andheri", "Dharavi"], home: ["Hindistan", "Mumbai", "Andheri"] },
  { words: ["Pune"], home: ["Hindistan", "Pune", "Shivajinagar"] },
  { words: ["Hyderabad"], home: ["Hindistan", "Haydarabad", "Gachibowli"] },
  { words: ["Paris", "Saint-Denis", "Belleville", "Aubervilliers"], home: ["Fransa", "Paris", "Saint-Denis"] },
  { words: ["Monaco"], home: ["Monako", "Monako", "Fontvieille"] },
  { words: ["Lyon"], home: ["Fransa", "Lyon", "Décines-Charpieu"] },
  { words: ["Hackney", "Brixton", "Southwark", "London", "Londra", "Leyton"], home: ["Birleşik Krallık", "Londra", "Hackney"] },
  { words: ["Brighton"], home: ["Birleşik Krallık", "Brighton", "Falmer"] },
  { words: ["Amsterdam", "Noord", "Zuidoost", "Oost", "Canal"], home: ["Hollanda", "Amsterdam", "Zuidoost"] },
  { words: ["Utrecht"], home: ["Hollanda", "Utrecht", "Utrecht-Zuid"] },
  { words: ["Volendam"], home: ["Hollanda", "Volendam", "Volendam"] },
  { words: ["PSV", "Eindhoven"], home: ["Hollanda", "Eindhoven", "Strijp"] },
  { words: ["Berlin", "Kreuzberg", "Neukölln", "Wedding"], home: ["Almanya", "Berlin", "Kreuzberg"] },
  { words: ["Stuttgart"], home: ["Almanya", "Stuttgart", "Bad Cannstatt"] },
  { words: ["Dortmund"], home: ["Almanya", "Dortmund", "Innenstadt-West"] },
  { words: ["Sevilla"], home: ["İspanya", "Sevilla", "Nervión"] },
  { words: ["Real Sociedad"], home: ["İspanya", "San Sebastián", "Anoeta"] },
  { words: ["Villarreal"], home: ["İspanya", "Villarreal", "Villarreal"] },
  { words: ["Girona"], home: ["İspanya", "Girona", "Montilivi"] },
  { words: ["Atalanta"], home: ["İtalya", "Bergamo", "Borgo Santa Caterina"] },
  { words: ["Sporting", "Benfica"], home: ["Portekiz", "Lizbon", "Alvalade"] },
  { words: ["Porto"], home: ["Portekiz", "Porto", "Campanhã"] },
  { words: ["Anderlecht", "Brussels", "Brüksel"], home: ["Belçika", "Brüksel", "Anderlecht"] },
  { words: ["Club Brugge", "Brugge"], home: ["Belçika", "Brugge", "Sint-Andries"] },
  { words: ["Basel"], home: ["İsviçre", "Basel", "Sankt Jakob"] },
  { words: ["Salzburg"], home: ["Avusturya", "Salzburg", "Wals-Siezenheim"] }
];
const PLAYER_PERKS = [
  { id: "free-kick", name: "Frikik Üstadı", unlockAt: 5, desc: "Gol vuruşu kararlarında başarı şansı +%20." },
  { id: "speed", name: "Hız Canavarı", unlockAt: 10, desc: "Savunma arkası koşularda başarı şansı +%15." },
  { id: "pressure", name: "Baskıya Dayanıklı", unlockAt: 15, desc: "Derbilerde karar ve reyting baskısı azalır." },
  { id: "street-magic", name: "Sokak Sihirbazı", unlockAt: 8, desc: "Bire birlerde çalım ve tribün etkisi artar." },
  { id: "poacher", name: "Ceza Sahası Canavarı", unlockAt: 12, desc: "Gol fırsatlarında sezgi ve bitiricilik bonusu." }
];
const MATCH_SCENARIOS = {
  "Hücum": [
    { id: "forward-offside", title: "Ofsayt çizgisi", description: "Savunmanın arkasına sarktın. Bayrak kalkmadı ama stoper ensende; bir anlık karar.", choices: [{ title: "Deparı bas, kaleciyle karşı karşıya kal", description: "Yüksek gol ihtimali · ofsayt riski", effect: "finish" }, { title: "Topu yavaşlatıp arkadaşını bekle", description: "Takım oyununu seç · hücum yavaşlayabilir", effect: "pass" }] },
    { id: "forward-penalty", title: "90. dakikada penaltı", description: "Skor eşit, top beyaz noktada. Tribün sustu, kaleci gözünü senden ayırmıyor.", choices: [{ title: "Köşeye sert vur", description: "Net vuruş · kaleci çıkarabilir", effect: "power" }, { title: "Panenka dene", description: "Efsane olabilirsin · risk yüksek", effect: "panenka" }] },
    { id: "forward-marking", title: "Sert stoper markajı", description: "Stoper bütün maç formandan çekiyor, bir yandan da laf atıyor. Sinirine hakim ol.", choices: [{ title: "Oyuna odaklanıp bileğinle sıyrıl", description: "Temiz çözüm · efor ister", effect: "finish" }, { title: "Hakeme şikayet edip teması al", description: "Faul kazanma şansı · ritim kaybı", effect: "hold" }] },
    { id: "forward-volley", title: "Kalecinin boşalttığı kale", description: "Kanattan orta geldi, kaleci çizgide değil. Top önünde sekiyor.", choices: [{ title: "Gelişine vole vur", description: "Gol olursa tribün ayağa kalkar · isabet zor", effect: "power" }, { title: "Göğsünle indirip garanti oyna", description: "Kontrollü bitiriş · savunma yetişebilir", effect: "finish" }] },
    { id: "forward-selfish", title: "Kaleciyle karşı karşıya", description: "{opponent} savunmasının arkasına sarktın. Dakika {minute}, skor {scoreFor}-{scoreAgainst}; kaleciyle karşı karşıyasın ve yanında boş koşan arkadaşın var.", condition: match => match.minute >= 60 && match.minute <= 85, choices: [{ title: "Arkadaşına pası çıkar", description: "Asist fırsatı · şöhret paylaşılır", effect: "pass" }, { title: "Şutunu çek, sorumluluğu al", description: "Kahraman olabilirsin · kaçırırsan baskı artar", effect: "finish" }] },
    { id: "forward-longshot", title: "Kaleci önde yakalandı", description: "Kaleci ceza sahasından uzaklaştı, top ayağında. Uzaklardan denemek için fırsat.", choices: [{ title: "Orta sahadan füze çıkar", description: "Sürpriz gol · yüksek risk", effect: "power" }, { title: "Topu sürüp takımın gelmesini bekle", description: "Daha güvenli atak · savunma yerleşebilir", effect: "pass" }] },
    { id: "forward-mud", title: "Çamurlu zeminde vuruş", description: "Top ayağına geldi ama zemin kaygan. Vururken ayağın kayabilir.", choices: [{ title: "Bekletmeden sert vur", description: "Savunma hazırlıksız · şut kontrolü zor", effect: "power" }, { title: "Topu kontrol edip plase dene", description: "Daha isabetli · stoper yetişebilir", effect: "finish" }] },
    { id: "forward-taunt", title: "Stoperin lafı", description: "Rakip stoper 'daha çocuksun' diye söylenip duruyor. Cevabını sahada ver.", choices: [{ title: "Gül geç, çalımla sıyrıl", description: "Sokak Sihirbazı yeteneğin varsa bire bir bonusu alırsın", effect: "dribble" }, { title: "Tartışmaya girip gözünü korkut", description: "Tribün coşar · hakem kart çıkarabilir", effect: "hold" }] },
    { id: "forward-rebound", title: "Karambolde seken top", description: "Kaleci topu sektirdi, açı dar ve savunmacı çizgiye koşuyor. Bir dokunuşun var.", choices: [{ title: "Gelişine köşeye vur", description: "Hızlı karar · top direğe gidebilir", effect: "power" }, { title: "Kontrol edip ayağını düzelt", description: "Daha temiz vuruş · rakip araya girebilir", effect: "finish" }] },
    { id: "forward-counter", title: "Ellilik kontra", description: "Rakip kornerden döndü, önünde koca bir saha var ve arkandan biri yetişiyor.", choices: [{ title: "Son sürat kaleye koş", description: "Bire bir fırsatı · nefesini tüketir", effect: "finish" }, { title: "Yavaşlayıp kanada çıkar", description: "Takımı hücuma kat · savunma toparlanabilir", effect: "pass" }] },
    { id: "forward-header", title: "İki stoper arasında hava topu", description: "Orta altı pasa indi. İki uzun stoper omuz omuza bastırıyor.", choices: [{ title: "Aralarından sıyrılıp kafayı vur", description: "Gol şansı · faul riski", effect: "finish" }, { title: "Sırtı dönük topu arkadaşına indir", description: "Takım hücumu sürer · stoper kapabilir", effect: "pass" }] },
    { id: "forward-free-kick", title: "Frikik mesafesi uygun", description: "Ceza sahası önü, baraj kuruluyor. Topun başına geçmek için iyi bir an.", choices: [{ title: "Direkt kaleye vur", description: "Frikik Üstadı bonusu aktif olabilir", effect: "power" }, { title: "Barajın üstünden aşırt", description: "Teknik vuruş · kaleci hazır bekliyor", effect: "finish" }] }
  ],
  "Defans": [
    { id: "defender-counter", title: "Son adam sensin", description: "Rakibin en hızlı forveti kontraya kalktı. Arkanda kimse yok; hamleni iyi seç.", choices: [{ title: "Zamanında kayarak müdahale et", description: "Topu alabilirsin · faul/kart riski", effect: "tackle" }, { title: "Geri koşup şut açısını kapat", description: "Daha kontrollü · forvet ceza sahasına girer", effect: "block" }] },
    { id: "defender-corner", title: "Son dakika korneri", description: "Skor üstünlüğü sende, ceza sahası kalabalık. Top havada sana doğru geliyor.", choices: [{ title: "Kafayla taca uzaklaştır", description: "Tehlikeyi kes · korner yenileyebilirler", effect: "block" }, { title: "Göğsünle kaleciye indir", description: "Oyunu kur · hata yaparsan tehlike büyür", effect: "save" }] },
    { id: "defender-offside", title: "Ofsayt çizgisi kumarı", description: "Rakip forvet hızla üstüne geliyor, orta saha geriye yetişemedi.", choices: [{ title: "Arkadaşlara çık diye bağırıp öne bas", description: "Ofsayta düşürebilirsin · biri geride kalabilir", effect: "block" }, { title: "Geri kaçıp forveti kovala", description: "Güvenli savunma · fiziksel efor ister", effect: "tackle" }] },
    { id: "defender-goalline", title: "Çizgiden çıkarma", description: "Kaleci geçildi, top kaleye doğru süzülüyor. Yetişmek için son bir depar.", choices: [{ title: "Kendini siper edip topu çıkar", description: "Takımı kurtarabilirsin · çarpışma riski", effect: "block" }, { title: "Kayarak ayağınla uzaklaştır", description: "Hızlı müdahale · top ters seke bilir", effect: "tackle" }] },
    { id: "defender-turnover", title: "Ceza sahası önünde top kaybı", description: "Ayağındaki topu kaptırdın; rakip bomboş kaleye yönelecek gibi.", choices: [{ title: "Faul yapıp atağı hemen kes", description: "Golü önleyebilirsin · kart riski", effect: "tackle" }, { title: "Şut açısını kapatıp kaleciyi koru", description: "Disiplinli müdahale · rakip yine vurabilir", effect: "block" }] },
    { id: "defender-aerial", title: "Hava topu düellosu", description: "Rakip forvet senden uzun, her ortada kafayı vuruyor. Bu kez pozisyonunu al.", choices: [{ title: "Önüne geçip topa yüksel", description: "Topu temiz uzaklaştır · faul çalınabilir", effect: "block" }, { title: "Arkasında kalıp ikinci topu bekle", description: "Daha az risk · rakip ilk dokunuşu alabilir", effect: "hold" }] },
    { id: "defender-yellow", title: "Erken sarı kart", description: "İlk yarıda sarı gördün. Rakip kanat üstüne geliyor; sert girersen ikinci kart olabilir.", choices: [{ title: "Ayakta kalıp pozisyonu kapat", description: "Kart riskini azalt · orta açabilir", effect: "block" }, { title: "Kayarak topa müdahale et", description: "Atağı bitirebilirsin · disiplin riski yüksek", effect: "tackle" }] },
    { id: "defender-backpass", title: "Kaleciye ters geri pas", description: "Geri pasın fazla sert kaçtı, kaleci önde. Top yavaşça kaleye doğru gidiyor.", choices: [{ title: "Depar atıp çizgiden çıkar", description: "Yetişirsen büyük kurtarış · kendi kalene gidebilir", effect: "block" }, { title: "Kaleciyi uyarıp açıyı kapat", description: "Takımı toparla · top çizgiye yaklaşabilir", effect: "save" }] },
    { id: "defender-winger", title: "Kanattaki çalım", description: "Rakip kanat iki kez üstünden geçti, tribün ses verdi. Sinirle değil akılla savun.", choices: [{ title: "Mesafeyi koruyup hamle anını bekle", description: "Dengeli savunma · orta gelebilir", effect: "block" }, { title: "Topa sertçe kay", description: "Atağı kesebilirsin · faul ihtimali", effect: "tackle" }] },
    { id: "defender-fatigue", title: "Uzatmalarda kramp", description: "Bacakların ağırlaştı, rakip son bir kez ceza sahasına yükleniyor.", choices: [{ title: "Merkezi kapatıp arkadaşını yönlendir", description: "Takım savunması · boşluk bırakma riski", effect: "block" }, { title: "Son bir deparla topa bas", description: "Tehlikeyi kes · yorgunluk artar", effect: "tackle" }] },
    { id: "defender-cover", title: "Kademeye gir", description: "Sağ bek ileri çıktı, onun koridoruna rakip kanat sarktı. Merkez de boş kalabilir.", choices: [{ title: "Sağa açılıp arkadaşını kapat", description: "Kanadı savun · merkezde boşluk doğabilir", effect: "block" }, { title: "Merkezi bırakma, kaleciyi yönlendir", description: "Ceza sahasını koru · orta açılabilir", effect: "save" }] },
    { id: "defender-last-block", title: "Son şut, kaleci yerde", description: "Uzatmalarda seken top rakibin önüne düştü, kaleci yerde. Araya girmek için bir anın var.", choices: [{ title: "Kendini şutun önüne at", description: "Kahraman olabilirsin · çarpışma riski", effect: "block" }, { title: "Ayakta kalıp açıyı daralt", description: "Daha güvenli · şut yine kaleye gidebilir", effect: "tackle" }] }
  ],
  "Orta saha": [
    { id: "midfield-press", title: "İki kişilik pres", description: "Topu aldın ama iki rakip orta saha sırtına yapıştı. Bir saniyede karar ver.", choices: [{ title: "Tek pasla boştaki beke çıkar", description: "Topu koru · hücum yavaşlayabilir", effect: "pass" }, { title: "Çalımla baskıdan sıyrıl", description: "Takımı öne taşı · kaptırma riski", effect: "finish" }] },
    { id: "midfield-free-kick", title: "Tehlikeli frikik", description: "Kaleyi gören bir noktada frikik kazandınız. Takım arkadaşların topu sana bırakıyor.", choices: [{ title: "Barajın üstünden doksana as", description: "Ustalık vuruşu · auta gidebilir", effect: "power" }, { title: "Plaseyle köşeyi dene", description: "Kontrollü vuruş · baraja takılabilir", effect: "finish" }] },
    { id: "midfield-lead", title: "Skoru koru mu, ikinciyi ara mı?", description: "Deplasmanda 1-0 öndesiniz, maçın son dakikaları. Top ayağında, herkes senden işaret bekliyor.", choices: [{ title: "Topu tutup oyunu soğut", description: "Takım nefes alır · taraftar sıkılabilir", effect: "hold" }, { title: "Hızlı hücumla ikinci golü ara", description: "Maçı koparabilirsin · top kaybı tehlikeli", effect: "pass" }] },
    { id: "midfield-marking", title: "Sert markaj", description: "Rakibin orta sahası bütün maç ensende. Her temasta sinirini bozuyor.", choices: [{ title: "Vücudunu koyup faul al", description: "Atak kazan · topu kaybetme ihtimali", effect: "hold" }, { title: "Tek pasla markajdan çık", description: "Takım arkadaşını bul · pas araya girebilir", effect: "pass" }] },
    { id: "midfield-throughball", title: "Savunma arkasına kilit pas", description: "Kanattaki arkadaşın koşuya başladı, savunmada yarım saniyelik bir boşluk var.", choices: [{ title: "Araya cesur pası bırak", description: "Asist fırsatı · pas tutmazsa kontra", effect: "pass" }, { title: "Oyunu yana çevir", description: "Topu koru · rakip yerleşebilir", effect: "hold" }] },
    { id: "midfield-longshot", title: "Uzaklardan füze", description: "Rakip savunma geriye çekildi, kaleci de biraz önde. Kaleyi cepheden görüyorsun.", choices: [{ title: "30 metreden sert vur", description: "Muazzam gol olabilir · isabet zor", effect: "power" }, { title: "Çalımla ceza sahasına gir", description: "Daha iyi açı bul · topu kaptırabilirsin", effect: "finish" }] },
    { id: "midfield-burden", title: "Takımın yükü sende", description: "Herkes topu sana veriyor. Yoruldun ama hücumun düğmesi hâlâ sende.", choices: [{ title: "Dişini sıkıp kilit pası ara", description: "Sorumluluk al · hata riski artar", effect: "pass" }, { title: "Topu güvenli biçimde geriye ver", description: "Nefeslen · hücum temposu düşer", effect: "hold" }] },
    { id: "midfield-referee", title: "Hakem düdüğü çalmadı", description: "Orta sahada net faulü görmedi, üstüne sana sarı gösterdi. İtiraz etmek üzeresin.", choices: [{ title: "Sakin kalıp oyuna dön", description: "Disiplinini koru · hoca memnun", effect: "hold" }, { title: "İtiraz edip takımı ateşle", description: "Tepki gösterebilirsin · kart riski", effect: "pass" }] },
    { id: "midfield-teammate", title: "Boştaki arkadaşın", description: "Takım arkadaşın bomboş koşuyor ama kaleyi de görebiliyorsun. Karar senin.", choices: [{ title: "Pas ver, takım golünü bulsun", description: "Asist ihtimali · takım uyumu artar", effect: "pass" }, { title: "Şut çekip sorumluluğu al", description: "Gol atarsan kahramansın · kaçarsa baskı", effect: "power" }] },
    { id: "midfield-tempo", title: "Maçın ritmi yükseldi", description: "Oyun bir o kaleye bir bu kaleye gidiyor. Nefesin daraldı, kafan dağılmaya başladı.", choices: [{ title: "Topu tutup tempoyu düşür", description: "Takıma zaman kazandır", effect: "hold" }, { title: "Hızlı hücuma pası at", description: "Rakibi hazırlıksız yakala · efor ister", effect: "pass" }] },
    { id: "midfield-lowblock", title: "Rakip otobüsü çekti", description: "Ceza sahası önü kapalı, hocan kenardan uzaktan dene diye bağırıyor.", choices: [{ title: "Kaleyi uzaktan yokla", description: "Savunmayı şaşırt · şut dışarı gidebilir", effect: "power" }, { title: "Dar alanda duvar pası yap", description: "İçeri sızma fırsatı · pas araya girebilir", effect: "pass" }] },
    { id: "midfield-counter", title: "Topu kaptın, alan var", description: "Rakibin hücumu kesildi. Önünde boş alan, kanatlarda iki arkadaşın koşuyor.", choices: [{ title: "Hücumcunun önüne ara pas bırak", description: "Kontra fırsatı · top kaybı riski", effect: "pass" }, { title: "Topu saklayıp takımı çıkar", description: "Daha kontrollü oyun", effect: "hold" }] }
  ],
  "Kaleci": [
    { id: "keeper-one-on-one", title: "Forvetle göz göze", description: "Rakip ceza sahasına girdi, kalbi kulağında atıyor. Açıyı kapatman gerek.", choices: [{ title: "Üzerine çıkıp açıyı daralt", description: "Forveti acele ettir · çalım yiyebilirsin", effect: "sweep" }, { title: "Çizgide kalıp refleksine güven", description: "Şutu bekle · köşeye bırakabilir", effect: "save" }] },
    { id: "keeper-longshot", title: "Uzaktan sert şut", description: "Top falso alarak üzerine geliyor. Eldivenlerin terli, nasıl kontrol edeceksin?", choices: [{ title: "Tokatlayıp kornere çel", description: "Güvenli uzaklaştırma · korner", effect: "save" }, { title: "Göğsüne alıp oyunu başlat", description: "Hızlı kontrol · top elinden kaçabilir", effect: "hold" }] },
    { id: "keeper-penalty", title: "Penaltı noktasında golcü", description: "Rakibin en golcü oyuncusu beyaz noktada. Son ana kadar bekleyecek misin?", choices: [{ title: "Köşeyi seçip erkenden atla", description: "Tahminin tutarsa kurtarış · ters köşe riski", effect: "sweep" }, { title: "Vuruş anını bekle", description: "Refleks kurtarışı · geç kalabilirsin", effect: "save" }] },
    { id: "keeper-corner", title: "Kornerde ceza sahası kalabalık", description: "Beş kişi yükseliyor, top altı pasın üzerine falsoyla iniyor.", choices: [{ title: "Çift yumrukla en uzağa gönder", description: "Tehlikeyi uzaklaştır · yumruk boşa gidebilir", effect: "sweep" }, { title: "Yükselip topu göğsüne al", description: "Atağı bitir · rakip faul yapabilir", effect: "save" }] },
    { id: "keeper-counter", title: "Hızlı kontra fırsatı", description: "Topu havada kaptın. Kanattaki arkadaşın bomboş koşuyor, savunma yerleşmedi.", choices: [{ title: "Elinle hızlı degaj yap", description: "Kontra başlat · pası kaçırabilirsin", effect: "pass" }, { title: "Stoperlere verip oyunu soğut", description: "Topu koru · hızlı fırsat kaçar", effect: "hold" }] },
    { id: "keeper-outside", title: "Ceza sahası dışında karar", description: "Forvet arkaya sarktı, sen de öndesin. Ayağınla çıkarsan yetişebilirsin.", choices: [{ title: "Öne çıkıp ayağınla müdahale et", description: "Atağı erken kes · zamanlama hatası riskli", effect: "sweep" }, { title: "Geri çekilip kaleyi koru", description: "Daha güvenli · forvet şut açısı bulabilir", effect: "save" }] },
    { id: "keeper-concentration", title: "Uzun süre top gelmedi", description: "Maç boyunca işin düşmedi, şimdi 89. dakikada rakip akın etti. Konsantrasyonunu topla.", choices: [{ title: "Savunmayı yönlendirip pozisyon al", description: "Takımı toparla · şuta hazırlıklı ol", effect: "save" }, { title: "Öne çıkıp topu kap", description: "Atak başlamadan bitir · arkana aşırabilir", effect: "sweep" }] },
    { id: "keeper-tribune", title: "Deplasman tribünü", description: "Kale arkasından bağırışlar geliyor, biri yabancı madde attı. Gözünü oyundan ayırma.", choices: [{ title: "Duymazdan gelip oyuna odaklan", description: "Soğukkanlı kurtarış", effect: "save" }, { title: "Tribüne dönüp karşılık ver", description: "Takım coşabilir · konsantrasyon dağılır", effect: "hold" }] },
    { id: "keeper-rebound", title: "Direkten dönen top", description: "Şut direğe çarpıp sırtına değdi, top hâlâ kale çizgisinde sekiyor.", choices: [{ title: "Yere uzanıp topu çizgiden al", description: "Kurtarış şansı · topu içeri itebilirsin", effect: "save" }, { title: "Ayakla kornere uzaklaştır", description: "Hızlı müdahale · seken top tehlikeli", effect: "sweep" }] },
    { id: "keeper-backpass", title: "Zor geri pas", description: "Stoper sert ve havadan geri pas attı. Top üstüne geliyor, elini kullanamazsın.", choices: [{ title: "Göğüsle kontrol edip taça vur", description: "Kurala uygun · komik seke bilir", effect: "hold" }, { title: "Kafayla uzaklaştır", description: "Tehlikeyi kes · rakibe gidebilir", effect: "sweep" }] },
    { id: "keeper-cross", title: "Yan top kabusu", description: "Kanattan falsoyla orta geldi, forvetler altı pas içinde birbirine girmiş.", choices: [{ title: "Çıkıp yumrukla topu uzaklaştır", description: "Tehlikeyi bitir · boşa çıkma riski", effect: "sweep" }, { title: "Çizgide kalıp savunmayı bekle", description: "Pozisyonunu koru · rakip kafa vurabilir", effect: "save" }] },
    { id: "keeper-last-save", title: "90+4'te son şut", description: "1-0 öndesiniz. Rakip röveşata çıkardı, top doksana doğru süzülüyor.", choices: [{ title: "Parmak ucunla kornere çel", description: "Maçı kurtarabilirsin · tam uzanman gerek", effect: "save" }, { title: "Açıyı kapatıp çizgide kal", description: "Pozisyon al · top köşeye gidebilir", effect: "sweep" }] }
  ]
};
const EXTRA_MATCH_SCENARIOS = {
  "Hücum": [
    { id: "forward-corner-rebound", title: "Kornerden seken top", description: "Savunma ortayı uzaklaştıramadı; top altı pasın önünde sekiyor.", choices: [{ title: "Gelişine sert vur", description: "Hızlı şut · kalabalık savunma araya girebilir", effect: "power" }, { title: "Boştaki arkadaşına çıkar", description: "Daha net fırsat · pas açısı dar", effect: "pass" }] },
    { id: "forward-keeper-spill", title: "Kaleciden dönen top", description: "Kaleci ilk şutu sektirdi, top önünde kaldı. Savunma çizgiye yetişmeye çalışıyor.", choices: [{ title: "Seken topa dokun", description: "Çabuk bitir · kaleci tekrar uzanabilir", effect: "finish" }, { title: "Topu saklayıp köşeyi değiştir", description: "Savunmayı yatır · müdahale gelebilir", effect: "dribble" }] },
    { id: "forward-cutback", title: "Penaltı noktasına yerden pas", description: "Kanat çizgiye indi ve geriye çıkardı. Vuruş için bir anın var.", choices: [{ title: "Tek dokunuşla kaleye vur", description: "Net bitiriş · kaleci açıyı kapatıyor", effect: "finish" }, { title: "Yanındaki arkadaşını gör", description: "Asist fırsatı · savunma pas yolunda", effect: "pass" }] }
  ],
  "Defans": [
    { id: "defender-corner-rebound", title: "Kornerden dönen ikinci top", description: "İlk kafa vuruşu ceza sahası dışına sekti. Rakip gelişine şut hazırlığında.", choices: [{ title: "Şutun önüne gir", description: "Tehlikeyi kes · top tekrar seke bilir", effect: "block" }, { title: "Şut çekene baskı yap", description: "Vuruşu boz · geç kalırsan faul riski", effect: "tackle" }] },
    { id: "defender-two-on-one", title: "İki hücumcuya karşı kaldın", description: "Kontrada iki rakip ceza sahasına ilerliyor, kaleci senden yönlendirme bekliyor.", choices: [{ title: "Pas yolunu kapat", description: "Gol pasını önle · şut açılabilir", effect: "block" }, { title: "Top süren oyuncuya çık", description: "Atağı erken kes · çalım yiyebilirsin", effect: "tackle" }] },
    { id: "defender-cutback", title: "Geriye çıkarılan orta", description: "Rakip kanat çizgiye indi, yerden pası penaltı noktasına gönderdi.", choices: [{ title: "Şut yoluna kapan", description: "Kaleyi koru · seken top tehlikeli", effect: "block" }, { title: "Pası kesmek için öne çık", description: "Araya girebilirsin · zamanlama önemli", effect: "tackle" }] }
  ],
  "Orta saha": [
    { id: "midfield-second-ball", title: "Ceza sahası dışında seken top", description: "Korner savunmadan döndü, top önünde boş kaldı ve herkes senden karar bekliyor.", choices: [{ title: "Gelişine kaleyi dene", description: "Sürpriz şut · isabet zor", effect: "power" }, { title: "Topu kanada aktar", description: "Hücum sürer · savunma yerleşebilir", effect: "pass" }] },
    { id: "midfield-counterpress", title: "Topu kaybettin, baskı başladı", description: "Pasın rakibe gitti ve rakip hızlı hücuma kalkıyor. Takım arkadaşların geride yakalandı.", choices: [{ title: "Hemen karşı pres yap", description: "Topu geri al · faul riski", effect: "tackle" }, { title: "Geri koşup pas kanalını kapat", description: "Kontrayı yavaşlat · alan bırakabilirsin", effect: "block" }] },
    { id: "midfield-switch", title: "Uzak kanat boş kaldı", description: "Rakip savunma bir tarafa yığıldı; ters kanattaki arkadaşın boş alana koşuyor.", choices: [{ title: "Uzun çapraz pası gönder", description: "Savunmayı eksik yakala · pasın boyu riskli", effect: "pass" }, { title: "Topu ayağında tutup yaklaş", description: "Kontrollü hücum · baskı artabilir", effect: "hold" }] }
  ],
  "Kaleci": [
    { id: "keeper-corner-rebound", title: "Kornerden seken top", description: "İlk kafa vuruşu kalabalıktan sekti ve çizgiye doğru yöneldi.", choices: [{ title: "Yere kapanıp topu kontrol et", description: "Oyunu durdur · rakip ayağını uzatabilir", effect: "save" }, { title: "Ayakla tehlikeden uzaklaştır", description: "Hızlı müdahale · top rakipte kalabilir", effect: "sweep" }] },
    { id: "keeper-low-cross", title: "Yerden kesilen orta", description: "Kanattan sert yerden pas altı pasa doğru gidiyor; forvet dokunmaya hazırlanıyor.", choices: [{ title: "Öne çıkıp topu kap", description: "Atak biter · forvetle çarpışma riski", effect: "sweep" }, { title: "Çizgide kalıp şuta kapan", description: "Refleksine güven · yakın mesafe şutu", effect: "save" }] },
    { id: "keeper-deflection", title: "Savunmadan yön değiştiren şut", description: "Şut stoperin ayağına çarpıp yön değiştirdi. Dengen bozuldu, top köşeye gidiyor.", choices: [{ title: "Ters ayağınla uzan", description: "Kurtarış şansı · topu sektirebilirsin", effect: "save" }, { title: "Açıyı kapatıp topu yumrukla", description: "Tehlikeyi uzaklaştır · rakip tekrar vurabilir", effect: "sweep" }] }
  ]
};
Object.keys(EXTRA_MATCH_SCENARIOS).forEach(role => MATCH_SCENARIOS[role].push(...EXTRA_MATCH_SCENARIOS[role]));
const LOW_ENERGY_SCENARIOS = [
  { id: "low-energy-mistouch", title: "Yorgunlukta kötü kontrol", description: "Enerjin düştü ve top ayağından açıldı. Rakip baskıya geliyor.", choices: [{ title: "Güvenli pasla riski azalt", description: "Topu koru · hücum yavaşlayabilir", effect: "hold" }, { title: "Son bir deparla topa yetiş", description: "Atağı sürdürebilirsin · hata riski yüksek", effect: "tackle" }] },
  { id: "low-energy-cramp", title: "Bacaklarda kramp", description: "Yorgunluk bacaklarını kilitliyor; rakip boşluğu fark etti.", choices: [{ title: "Pozisyonunu koru", description: "Daha az efor · rakip pas bulabilir", effect: "block" }, { title: "Topa hamle yap", description: "Tehlikeyi kes · geç kalabilirsin", effect: "tackle" }] },
  { id: "low-energy-lost-ball", title: "Yorgunlukta top kaybı", description: "İlk kontrolün ağır kaldı ve rakip araya girdi.", choices: [{ title: "Geri basıp şut yolunu kapat", description: "Takım savunmasına yardım et", effect: "block" }, { title: "Topu hemen geri kazanmaya çalış", description: "Pres fırsatı · faul ihtimali", effect: "tackle" }] },
  { id: "low-energy-last-pass", title: "Son enerjinle karar anı", description: "Top sende ama nefesin tükendi; yanındaki arkadaşın boş alana koşuyor.", choices: [{ title: "Tek pasla arkadaşını bul", description: "Yükü paylaş · pas araya girebilir", effect: "pass" }, { title: "Topu tutup oyunu yavaşlat", description: "Takıma nefes aldır · baskı sürebilir", effect: "hold" }] }
];
const MAX_RECENT_HIGHLIGHTS = Object.values(MATCH_SCENARIOS).reduce((total, scenarios) => total + scenarios.length, LOW_ENERGY_SCENARIOS.length) - 1;
const ISTANBUL_TEAMS = ["Güngören Gençlik", "Gaziosmanpaşa Spor", "Kadıköy Yıldızları", "Üsküdar Mahalle FK", "Bağcılar Atletik", "Küçükçekmece SK", "Kartal Gençlik", "Esenyurt Birlik"];
const CITY_TEAMS = {
  Ankara: ["Keçiören Yıldız", "Ankara Mahalle FK", "Mamak Gençlik", "Çankaya Spor"],
  İzmir: ["Karşıyaka Mahalle", "Bornova Gençlik", "Buca Yıldızları", "Konak Spor"],
  Bursa: ["Osmangazi FK", "Nilüfer Gençlik", "Yıldırım Atletik"],
  Adana: ["Seyhan Yıldız", "Çukurova Gençlik", "Adana Mahalle FK"],
  Trabzon: ["Ortahisar Gençlik", "Trabzon Mahalle", "Akçaabat Yıldız"],
  Antalya: ["Muratpaşa Gençlik", "Konyaaltı Spor", "Antalya Mahalle FK"],
  Aydın: ["Efeler Gençlik", "Aydın Mahalle FK", "Söke Yıldızları"],
  Nazilli: ["Nazilli Gençlik", "Sümer Spor", "Nazilli Mahalle FK"]
};
const POSITION_ROLES = {
  "Kaleci": "Kaleci", "Sağ Bek": "Defans", "Sol Bek": "Defans", "Stoper": "Defans",
  "Sağ Kanat Bek": "Defans", "Sol Kanat Bek": "Defans", "Ön Libero": "Orta saha",
  "Merkez Orta Saha": "Orta saha", "Ofansif Orta Saha": "Orta saha",
  "Sağ Kanat": "Hücum", "Sol Kanat": "Hücum", "Santrafor": "Hücum", "İkinci Forvet": "Hücum"
};
const COOLDOWN_ACTIVITIES = new Set(["cafe", "work", "social", "study", "friends"]);
const INJURY_SAFE_ACTIVITIES = new Set(["balanced", "recovery", "cafe", "work", "social", "study", "skills", "friends"]);
const PLAN_LIBRARY = [
  { id: "balanced", name: "Dengeli hafta", icon: "◷", desc: "Antrenman, dinlenme ve sosyal hayat arasında sağlam bir denge.", effects: ["Yetenek +1", "Form +1", "Yorgunluk +4"], skill: 1, morale: 2, fatigue: 4, money: 0, stress: -1 },
  { id: "training", name: "Çılgın antrenman", icon: "↗", desc: "Ekstra idmanla gelişimini hızlandır; stamina ve direncini tüketip yük biriktir.", effects: ["Yetenek +3", "Yorgunluk +15", "Stamina −10 · Direnç −4"], skill: 3, morale: -1, fatigue: 15, money: 0, stress: 3, injury: 0.012 },
  { id: "recovery", name: "Aktif dinlenme", icon: "⌁", desc: "Antrenman yükünü sıfırla; stamina ve fiziksel direncini toparla.", effects: ["Yorgunluk −12", "Stamina +12", "Direnç +3"], skill: 0, morale: 1, fatigue: -12, money: 0, stress: -3 },
  { id: "cafe", name: "Semt kahvesi", icon: "☕", desc: "Mahalleyle bağ kur, kafanı dağıt. İleride yeni kapılar açılabilir.", effects: ["Moral +5", "Stres −8", "Kelebek etkisi"], skill: 0, morale: 5, fatigue: 1, money: -20, stress: -8, event: "cafe" },
  { id: "work", name: "Esnafta çıraklık", icon: "⌂", desc: "Mahalle esnafına yardım et; harçlık ve güzel bir tanışıklık kazan.", effects: ["Para +₺350", "Uyum +2", "Yorgunluk +5"], skill: 0, morale: 1, fatigue: 5, money: 350, stress: -1, event: "work" },
  { id: "social", name: "Gece kaçamağı & paylaşım", icon: "◎", desc: "Sosyal medya etkileşimi artar; antrenman ve form düşüşünü göze al.", effects: ["Şöhret +6", "Moral +3", "Form düşer"], skill: 0, morale: 3, fatigue: 8, money: -80, stress: 3, fame: 6, risk: "night" },
  { id: "street", name: "İddialı sokak maçı", icon: "⚽", desc: "Mahalle maçında hünerlerini göster; kazanç ve sakatlık riski var.", effects: ["Kazanç şansı", "Yorgunluk +8", "Daha riskli"], skill: 1, morale: 2, fatigue: 8, money: 0, stress: 1, risk: "street" },
  { id: "study", name: "Okul & aile zamanı", icon: "⌂", desc: "Derslerini ve aile bağlarını ihmal etme; stresini hafiflet.", effects: ["Aile/Okul +4", "Stres −6", "Moral +2"], skill: 0, morale: 2, fatigue: -2, money: 0, stress: -6, family: 4 },
  { id: "skills", name: "Teknik bireysel çalışma", icon: "✳", desc: "Mevkine özel teknik idman; yoğun antrenmandan hafif ama fiziksel yükü var.", effects: ["Yetenek +2", "Stamina −5 · Direnç −2"], skill: 2, morale: 0, fatigue: 7, money: 0, stress: 1, injury: 0.004 },
  { id: "friends", name: "Takım arkadaşlarıyla buluş", icon: "♧", desc: "Takım içi uyumunu artır, birlikte daha iyi oyna.", effects: ["Takım uyumu +5", "Moral +2", "Stres −3"], skill: 0, morale: 2, fatigue: 0, money: -30, stress: -3, chem: 5 }
];
const STORY_EVENTS = [
  { id: "weak-foot", title: "Zayıf ayağın için özel çalışma", description: "Antrenör sol ayağını neredeyse hiç kullanmadığını fark etti. Bireysel çalışma için zaman ayırabilirsin.", choices: [{ title: "Özel seanslara yazıl", description: "Yetenek ve yorgunluk dengesi", changes: { skill: 2, fatigue: 4 }, traits: { weakFoot: 1 } }, { title: "Güçlü ayağına odaklan", description: "Kısa vadede daha az yük", changes: { skill: 1, morale: 1 } }] },
  { id: "position-evolution", title: "Mevkiini yeniden keşfet", description: "Hızın biraz gerilese de oyun görüşün arttı. Hoca başka bir rolde daha etkili olabileceğini düşünüyor.", choices: [{ title: "Oyun kurucu rolünü dene", description: "Mevkin Ofansif Orta Saha olur", changes: { skill: 1, coachTrust: 3 }, set: { position: "Ofansif Orta Saha" } }, { title: "Merkezde iki yönlü oyna", description: "Mevkin Merkez Orta Saha olur", changes: { chem: 3, coachTrust: 2 }, set: { position: "Merkez Orta Saha" } }] },
  { id: "referee-psychology", title: "Hakemin göz hapsindesin", description: "Geçen maçtaki itirazların hakemin aklında. Bu kez küçük temaslarda bile düdük sana karşı çalınabilir.", requirements: ["pro"], choices: [{ title: "Sakin ve saygılı kal", description: "Hakem sicilini düzelt", changes: { mental: 2, coachTrust: 2 }, traits: { refereeRespect: 2 } }, { title: "Teması abartıp penaltı ara", description: "Dalış becerisi artar, itibar riski var", changes: { fame: 1, fanLove: -2 }, traits: { divingSkill: 1, refereeRespect: -2 } }] },
  { id: "tactical-fit", title: "Hocanın baskı sistemi", description: "Hoca önde Gegenpressing istiyor ama yoğun tempo kondisyonunu zorluyor. Sisteme uyum sağlamak ya da rolünü konuşmak gerek.", requirements: ["academy"], choices: [{ title: "Kondisyonunu artırıp sisteme uy", description: "Yorgunluk karşılığında taktik uyum", changes: { coachTrust: 4, fatigue: 7 }, traits: { tacticalFit: 2, coachTactic: "Gegenpressing" } }, { title: "Daha dengeli rol iste", description: "Moral ve uyum kazan, hocanın güveni hafif düşebilir", changes: { morale: 2, coachTrust: -2 }, traits: { tacticalFit: -1, coachTactic: "Dengeli" } }] },
  { id: "set-piece-style", title: "Duran topun imzası", description: "Frikik antrenmanında kendine özgü bir vuruş geliştirme fırsatın var.", choices: [{ title: "Knuckleball çalış", description: "Riskli ama güçlü vuruş", changes: { skill: 1, fatigue: 2 }, traits: { setPieceSkill: 2, freeKickStyle: "Knuckleball" } }, { title: "Falsolu plase çalış", description: "Teknik ve kontrollü vuruş", changes: { skill: 2 }, traits: { setPieceSkill: 1, freeKickStyle: "Falsolu plase" } }] },
  { id: "first-contract", title: "İlk profesyonel sözleşme", description: "İlk sözleşme masasında temsilcin yanında değil. Teklifteki düşük ücret ve maddeleri dikkatle değerlendir.", requirements: ["pro"], choices: [{ title: "Hemen imzala", description: "Kısa vadede güvence, pazarlık gücü azalır", changes: { morale: 2, money: 150 }, traits: { contractAwareness: -1 } }, { title: "Maddeleri sorup pazarlık et", description: "Beklenti yükselt, yönetimle gerilim riski", changes: { coachTrust: -1, presidentOpinion: -2 }, traits: { contractAwareness: 1 }, set: { releaseClause: 5000000 } }] },
  { id: "captain-mediator", title: "Soyunma odasında arabulucu", description: "İki takım arkadaşın tartışıyor. Genç kaptan yardımcısı olarak ortamı yatıştırman bekleniyor.", requirements: ["captain"], choices: [{ title: "İkisini de dinleyip barıştır", description: "Uyum ve liderlik kazan", changes: { chem: 5, mental: 2 }, traits: { leadership: 1 } }, { title: "Herkesi görevine çağır", description: "Disiplinli duruş, biraz soğukluk", changes: { coachTrust: 3, chem: -1 }, traits: { leadership: 1 } }] },
  { id: "poor-facilities", title: "Tesisler yetersiz", description: "Ağırlık salonu ve toparlanma imkânı kısıtlı. Kendi imkânlarınla çalışmak mı, kulüpten iyileştirme istemek mi?", requirements: ["pro"], choices: [{ title: "Mahalle salonunda çalış", description: "Küçük masrafla gelişime devam et", changes: { money: -80, skill: 1, fatigue: 2 }, traits: { facilityLevel: 1 } }, { title: "Yönetimden tesis talep et", description: "Yönetim kabul ederse imkânlar artar", changes: { presidentOpinion: -1 }, traits: { facilityLevel: 1 } }] },
  { id: "nepotism", title: "Forma için adalet sınavı", description: "Yönetimden bir yakının kadroda önüne geçirildi. Cevabını sahada mı vereceksin, hocayla mı konuşacaksın?", requirements: ["academy"], choices: [{ title: "Antrenmanda iki kat çalış", description: "Yorgunluk artar, hoca güveni yükselir", changes: { skill: 2, fatigue: 5, coachTrust: 3 }, traits: { resilience: 1 } }, { title: "Hocayla sakin biçimde konuş", description: "Moral ve mental dayanıklılık", changes: { mental: 2, coachTrust: 1 }, traits: { resilience: 1 } }] },
  { id: "nightlife-photo", title: "Gece hayatı fotoğrafı manşette", description: "Gece çekilen bir fotoğraf sabah spor sayfalarına düştü. Hoca antrenmanda açıklama bekliyor.", requirements: ["pro"], choices: [{ title: "Sorumluluğu al ve özür dile", description: "Disiplin ve güveni toparla", changes: { coachTrust: 3, stress: -2, morale: -1 } }, { title: "Özel hayatını savun", description: "Kendini ifade et, tartışma büyüyebilir", changes: { fame: 2, coachTrust: -3, stress: 3 } }] },
  { id: "national-choice", title: "Milli takım tercihi", description: "Köklerinle bağın olan başka bir ülkenin altyapısından da davet ihtimali doğdu. Milli forma konusunda karar vermelisin.", requirements: ["young"], choices: [{ title: "Doğduğun ülkeyi seç", description: "Mevcut milli takım uygunluğunu koru", changes: { morale: 2, family: 2 }, traits: { nationalChoice: "Doğduğu ülke" } }, { title: "Aile köklerinin ülkesini seç", description: "Alternatif milli takım uygunluğunu seç", changes: { stress: 2, family: -1 }, traits: { nationalChoice: "Aile kökleri" } }] },
  { id: "boot-sponsor", title: "İlk kişisel krampon anlaşması", description: "Yerel spor mağazası sana özel krampon teklif ediyor. Küçük sponsorlukla mı başlayacaksın, özel üretim mi isteyeceksin?", requirements: ["pro"], choices: [{ title: "Yerel anlaşmayı kabul et", description: "Bir miktar gelir ve görünürlük", changes: { money: 250, fame: 2 }, traits: { bootSponsor: "Yerel mağaza" } }, { title: "Kendi tasarımını talep et", description: "Şöhret artar, anlaşma garanti değil", changes: { fame: 3, stress: 1 }, traits: { bootSponsor: "Özel tasarım" } }] },
  { id: "cancel-culture", title: "Eski paylaşım yeniden gündemde", description: "Yıllar önce yazdığın fevri bir paylaşım dolaşıma girdi. Taraftarlar açıklama bekliyor.", requirements: ["pro"], choices: [{ title: "Açıkça özür dile", description: "İtibarı ve taraftar sevgisini onar", changes: { fanLove: 3, mental: 2, fame: -1 } }, { title: "Bağlamı açıklayıp devam et", description: "Sakin duruş, gündem uzayabilir", changes: { stress: 2, mediaFollowers: 30, coachTrust: 1 } }] },
  { id: "distant-relatives", title: "İlk büyük maaş ve uzak akrabalar", description: "Maaşın yükselince uzun zamandır görüşmediğin akrabalar borç istemeye başladı. Aile bağlarını incitmeden sınır koy.", requirements: ["pro"], choices: [{ title: "Ailene destek ol, sınırını belirt", description: "Aile bağı güçlenir, para azalır", changes: { money: -300, family: 4, stress: -1 } }, { title: "Bütçeni koru ve nazikçe reddet", description: "Finansal güvence, ilişkilerde gerginlik", changes: { money: 150, family: -3, stress: 2 } }] },
  { id: "injury-fear", title: "Sakatlık sonrası psikolojik blokaj", description: "Ağır bir sakatlıktan sonra ikili mücadeleye girerken yeniden sakatlanma korkusu yaşıyorsun.", requirements: ["injury-history"], choices: [{ title: "Psikolog ve kontrollü rehabilitasyon", description: "Mental toparlanma, gelişim zaman alır", changes: { mental: 5, stress: -3 }, traits: { injuryConfidence: 2 } }, { title: "Korkunu bastırıp hemen yüklen", description: "Yüksek efor ve sakatlık riski", changes: { morale: 2, fatigue: 6 }, traits: { injuryConfidence: -1 }, set: { injuryRisk: true } }] },
  { id: "cold-match", title: "Buz gibi deplasman", description: "Kar ve buz altındaki deplasmanda kasların sertleşti. Maç sonrası sıcak duş ve toparlanma imkânı da kısıtlı.", requirements: ["pro"], choices: [{ title: "Isınmayı uzat ve katmanlı hazırlan", description: "Yorgunluk pahasına sakatlık riskini azalt", changes: { fatigue: 3, energy: 2 }, traits: { coldReadiness: 1 } }, { title: "Ritüelini bozma, maça çık", description: "Mental direnç kazan, fiziksel yük artar", changes: { mental: 2, fatigue: 5 } }] },
  { id: "diet-discipline", title: "Diyetisyenle yeni düzen", description: "Mahalle lezzetlerinden profesyonel beslenme programına geçiyorsun. Disiplin tartıda da takip edilecek.", requirements: ["pro"], choices: [{ title: "Programı uygula", description: "Kondisyon ve mental güç", changes: { speed: 1, energy: 3, morale: -1 }, traits: { nutrition: 2 } }, { title: "Haftada bir kaçamak iste", description: "Moral korunur, disiplin düşebilir", changes: { morale: 2, coachTrust: -1 }, traits: { nutrition: -1 } }] },
  { id: "bonus-debt", title: "Primler borçlara gitti", description: "Maç primlerini esnaf borçlarına ve ani harcamalara verdin; ay sonuna harçlıksız girdin.", choices: [{ title: "Bütçe yapıp borçlarını kapat", description: "Stres azalır, birikimden harca", changes: { money: -200, stress: -3 }, traits: { financialLiteracy: 1 } }, { title: "Bir sonraki prime kadar idare et", description: "Kısa vadede para sende kalır", changes: { money: 100, stress: 3 }, traits: { financialLiteracy: -1 } }] },
  { id: "retirement-plan", title: "Futbol sonrası için ilk adım", description: "Kariyerinin son döneminde futbol okulunu, antrenörlük kursunu veya yorumculuğu düşünüyorsun.", requirements: ["senior"], choices: [{ title: "Teknik direktörlük kursuna başla", description: "Futbol sonrası kariyerine hazırlan", changes: { money: -150, mental: 2 }, traits: { retirementPlan: "Teknik direktörlük" } }, { title: "Mahalle futbol okulunu kur", description: "Köklerine yatırım, masrafı var", changes: { money: -250, family: 3, fame: 2 }, traits: { retirementPlan: "Futbol okulu" } }] },
  { id: "referee-name", title: "Hakem seni tanıyor", description: "Aynı hakem birkaç haftadır maçlarınızı yönetiyor. Önceki itirazların siciline yansımış olabilir.", requirements: ["pro"], choices: [{ title: "Maç başında saygılı selam ver", description: "Hakem ilişkisini iyileştir", changes: { mental: 1 }, traits: { refereeRespect: 2 } }, { title: "Kurnazca teması büyüt", description: "Dalış becerisi veya kart riski", changes: { fanLove: -1, stress: 2 }, traits: { divingSkill: 1, refereeRespect: -2 } }] },
  { id: "captain-armband", title: "Pazubendin ağır geliyor", description: "Kıdemli oyuncular ayrıldı; genç yaşında kaptan oldun. Takım gerideyken tribünü sakinleştirmen bekleniyor.", requirements: ["captain"], choices: [{ title: "Taraftara sakin ol işareti yap", description: "Liderlik ve mental dayanıklılık", changes: { mental: 3, fanLove: 2 }, traits: { leadership: 1 } }, { title: "Takımı öne çağırıp baskı kur", description: "Oyuncuları ateşle, stres artar", changes: { chem: 3, stress: 2 }, traits: { leadership: 1 } }] },
  { id: "stoper-mind-game", title: "Stoperin psikolojik savaşı", description: "Sert rakip stoper arkadan itiyor ve laf atıyor. Sinirlenip oyundan düşebilir ya da sahada cevap verebilirsin.", requirements: ["pro"], choices: [{ title: "Çalımla sahada cevap ver", description: "Yetenek ve moral kazan", changes: { skill: 1, morale: 2 }, traits: { resilience: 1 } }, { title: "Tartışmaya gir", description: "Hoca güveni ve kart sicili riski", changes: { coachTrust: -2, stress: 3, yellowCards: 1 } }] },
  { id: "super-sub", title: "Süper yedek rolü", description: "Hoca seni yine son 15 dakika için hazırlıyor. İsyan etmek ya da sınırlı sürede formayı kazanmak arasında seçim yap.", requirements: ["pro"], choices: [{ title: "Rolünü kabul edip hazır ol", description: "Hoca güveni ve ilk 11 şansı", changes: { coachTrust: 3, mental: 1 }, traits: { starterStatus: "Super yedek" } }, { title: "İlk 11 talebini açıkça ilet", description: "Özgüven, fakat güven kaybı olabilir", changes: { morale: 2, coachTrust: -3 }, traits: { starterStatus: "İlk 11 talebi" } }] },
  { id: "own-goal", title: "Kendi kalene golün yükü", description: "Deplasmanda talihsiz bir geri pas kendi kalene gitti. Mahallede konuşulacak ama sonraki maçta toparlanma şansın var.", choices: [{ title: "Hatanın sorumluluğunu al", description: "Mental dayanıklılık ve hoca güveni", changes: { mental: 3, coachTrust: 2 }, traits: { ownGoalRecovery: 1 } }, { title: "Eleştirilerden uzaklaş", description: "Stres düşer, takım uyumu etkilenir", changes: { stress: -2, chem: -2 }, traits: { ownGoalRecovery: -1 } }] },
  { id: "president-dressing-room", title: "Başkan soyunma odasında", description: "Dört maçlık galibiyetsiz serinin ardından başkan devre arasında soyunma odasına girdi. Takımın tepkisi sana bakıyor.", requirements: ["pro"], choices: [{ title: "Takımı sakinleştirip oyuna dön", description: "Uyum ve mental güç", changes: { chem: 3, mental: 2, presidentOpinion: 1 } }, { title: "Başkana oyuncuları rahat bırakmasını söyle", description: "Takım desteği, yönetimle gerilim", changes: { chem: 2, presidentOpinion: -4, stress: 2 } }] },
  { id: "water-cut", title: "Tesiste sıcak su kesildi", description: "Alt lig tesislerinde su ve toparlanma imkânı kısıtlı; antrenman sonrası rahatlamak zor.", requirements: ["pro"], choices: [{ title: "Kulüp yönetimine çözüm öner", description: "Tesis iyileştirme talebi", changes: { presidentOpinion: 2, morale: 1 }, traits: { facilityLevel: 1 } }, { title: "Kendi toparlanma rutinini kur", description: "Küçük masraf, fiziksel toparlanma", changes: { money: -50, fatigue: -2 }, traits: { facilityLevel: 1 } }] },
  { id: "supporters-leader", title: "Tribün lideriyle yüz yüze", description: "Kötü sonuçlar sonrası taraftar grubu tesislere geldi. Semtin tribün lideri takımdan açıklama bekliyor.", requirements: ["pro"], choices: [{ title: "Kahvede taraftarla konuş", description: "Taraftar sevgisi artar, stres de yükselebilir", changes: { fanLove: 4, stress: 2 }, traits: { communityTies: 1 } }, { title: "Takım adına sakin açıklama yap", description: "Profesyonellik ve güven", changes: { fanLove: 2, mental: 1 }, traits: { communityTies: 1 } }] },
  { id: "foreign-quota", title: "Yabancı kontenjanı", description: "Yabancı oyuncu statün yüzünden kadro kuralı ilk 11 şansını etkileyebilir. Statünü netleştirmek için kulüple görüş.", requirements: ["pro"], choices: [{ title: "Yerli statüsü için evrakları tamamla", description: "Bekleme ve bürokrasi yükü", changes: { stress: 1, coachTrust: 2 }, traits: { foreignStatus: "Yerli statüsü" } }, { title: "Rekabeti kabul edip formayı kazan", description: "Yetenek ve mental güç", changes: { skill: 1, mental: 2 }, traits: { foreignStatus: "Yabancı oyuncu" } }] },
  { id: "shirt-number", title: "Forma numarası el değiştirebilir", description: "Yeni yıldız yıllardır taşıdığın numarayı istedi. İnat mı edeceksin, yeni numarayla yeni sayfa mı açacaksın?", requirements: ["pro"], choices: [{ title: "99 numarayı seç", description: "Yeni imza numaran", changes: { morale: 2, fame: 1 }, traits: { shirtNumber: 99 } }, { title: "Kulüple numaranı korumak için konuş", description: "Liderlik ve yönetimle pazarlık", changes: { presidentOpinion: -1, mental: 1 }, traits: { shirtNumber: 10 } }] },
  { id: "local-tv", title: "Yerel kanalda canlı röportaj", description: "İlçe televizyonu seni canlı yayına bağladı. Amatör sunucunun sorusu hazırlıksız yakaladı.", choices: [{ title: "Mahalleni ve takımını anlat", description: "Yerel şöhret ve aile bağı", changes: { fame: 2, family: 2 } }, { title: "Kısa, profesyonel yanıt ver", description: "Stres kontrolü ve hoca güveni", changes: { stress: -1, coachTrust: 1 } }] },
  { id: "street-fashion", title: "Mahallenin stil ikonu", description: "Yeni kıyafetlerinle sokakta gençler seni örnek almaya başladı; imza ve fotoğraf isteyenler var.", requirements: ["pro"], choices: [{ title: "Gençlerle ilgilen, imza dağıt", description: "Mahalle bağı ve taraftar sevgisi", changes: { family: 2, fanLove: 3 }, traits: { styleFollowing: 1 } }, { title: "Özel alanını koru", description: "Stres azalır, popülerlik yavaşlar", changes: { stress: -2, fame: -1 } }] },
  { id: "false-rumor", title: "Asılsız transfer dedikodusu", description: "Sosyal medyada büyük kulüplerin seni izlediği yazıyor ama resmi teklif yok. Haber odağını dağıtabilir.", choices: [{ title: "Habere değil sahaya odaklan", description: "Mental dayanıklılık ve performans", changes: { mental: 2, coachTrust: 2 } }, { title: "Dedikoduyu paylaşarak heyecanı büyüt", description: "Takipçi ve şöhret, stres de artar", changes: { fame: 2, mediaFollowers: 60, stress: 3 } }] },
  { id: "family-home", title: "Eve dönünce hâlâ evlat", description: "Büyük kulüpte oynasan da annen kramponları koridora bırakmamanı söylüyor. Bu küçük gerçeklik sana iyi gelebilir.", choices: [{ title: "Gülüp ev işlerine yardım et", description: "Aile ve mental destek", changes: { family: 4, stress: -2, morale: 2 } }, { title: "Kamptan yorgun olduğunu söyle", description: "Dinlen, aile bağı biraz zayıflar", changes: { fatigue: -2, family: -1 } }] },
  { id: "old-friends", title: "Eski mahalle arkadaşlarınla mesafe", description: "Kamplar ve deplasmanlar yüzünden eski arkadaşlarınla daha az görüşüyorsun. Bağı korumak için zaman ayırabilirsin.", choices: [{ title: "Mahalleye uğrayıp buluş", description: "Sosyal bağ ve moral artar", changes: { family: 2, morale: 3, money: -40 }, traits: { friendBond: 5 } }, { title: "Kariyerine öncelik ver", description: "Hedefe odaklan, özlem ve stres artar", changes: { skill: 1, stress: 2 }, traits: { friendBond: -4 } }] },
  { id: "training-injury", title: "Takım arkadaşının sert müdahalesi", description: "Antrenman rekabetinde takım arkadaşın kontrolsüz kaydı. Sakatlık ihtimali var, takım içi konuşma gerekli.", requirements: ["academy"], choices: [{ title: "Doktor kontrolüne git ve sakin konuş", description: "Kendini koru, takım uyumu sürsün", changes: { chem: 2, stress: -1 } }, { title: "Ağrıyı saklayıp devam et", description: "Kısa vadede antrenman sürer, risk büyür", changes: { morale: 1, fatigue: 5 }, set: { injuryRisk: true } }] },
  { id: "match-insomnia", title: "Derbi öncesi uykusuzluk", description: "Final gecesi heyecandan uyuyamadın; kafanda kaçan goller ve yapacağın hatalar dönüp duruyor.", requirements: ["pro"], choices: [{ title: "Nefes egzersizi ve erken dinlenme", description: "Stres azalır, mental güç korunur", changes: { stress: -3, mental: 2, energy: 2 } }, { title: "Uykusuzluğu kahveyle bastır", description: "Enerji kısa süre artar, stres yükselir", changes: { energy: 3, stress: 3, fatigue: 2 } }] },
  { id: "wonderkid-pressure", title: "Wonderkid etiketi", description: "Basın seni geleceğin yıldızı ilan etti. Beklentiler büyüdükçe sahaya çıkarken ayakların ağırlaşıyor.", requirements: ["young", "pro"], choices: [{ title: "Kendi hedefini belirle, etiketi boş ver", description: "Mental ve stres kontrolü", changes: { mental: 3, stress: -2 } }, { title: "Beklentiyi motivasyona çevir", description: "Yetenek ve şöhret, baskı da artar", changes: { skill: 2, fame: 2, stress: 3 } }] },
  { id: "late-night-food", title: "Gece yarısı gizli kaçamak", description: "Diyetisyene görünmeden mahalle büfesinden ağır bir şeyler yedin. Sabah antrenmanında miden rahatsız olabilir.", requirements: ["pro"], choices: [{ title: "Diyetisyene dürüstçe anlat", description: "Disiplin ve toparlanma", changes: { coachTrust: 2, stress: -1 }, traits: { nutrition: 1 } }, { title: "Sakla ve antrenmana çık", description: "Moral korunur, enerji ve disiplin düşebilir", changes: { morale: 1, energy: -3, coachTrust: -2 }, traits: { nutrition: -1 } }] },
  { id: "roots-return", title: "Başladığın mahalleye dönüş", description: "Kariyerinin son çemberinde çocukluğunun kulübü seni bedelsiz geri çağırıyor. Futbolu başladığın topraklarda bitirme fırsatı.", requirements: ["senior"], choices: [{ title: "Mahalle kulübüne dön", description: "Kariyerini köklerinde tamamla", changes: { morale: 5, family: 5, fame: 2 }, traits: { returnToRoots: true }, set: { returnToRoots: true } }, { title: "Profesyonel sahnede kal", description: "Bir sezon daha yarış, baskı sürer", changes: { coachTrust: 2, stress: 1 } }] }
];
const PAGES = {
  dashboard: "GENEL BAKIŞ", week: "HAFTALIK PLAN", match: "MAÇ MERKEZİ",
  league: "LİG & SCOUT", shop: "MARKET", wardrobe: "GARDIROP", life: "YAŞAM & GARAJ", media: "TRİBÜN SESİ",
  retired: "KARİYER ARŞİVİ"
};
const PAGE_TITLES = {
  dashboard: ["Kariyerine hoş geldin", "Her haftanın bir hikâyesi, her maçın bir fırsatı var."],
  week: ["Bu hafta nasıl geçecek?", "Planını seç; kararların ileriki haftalarda yeniden karşına çıkabilir."],
  match: ["Maç günü", "Performansın, hazırlığın ve kritik anlardaki tercihlerin sonucu belirler."],
  shop: ["Mahalle marketi", "İhtiyacını seç, kalitesine göre alışveriş yap. Maç alanından ayrı."],
  wardrobe: ["Sahaya kendi tarzınla çık", "Günlük stilin ve maç ekipmanın ayrı ayrı yönetilir."],
  life: ["Sahayı aşan bir hayat", "Kariyer seviyene göre evini, arabanı ve geleceğini kur."],
  media: ["Tribünün gözü üzerinde", "Yerel haberler profesyonel lige çıktığında başlar."],
  league: ["Lig yarışı ve scout raporları", "Fikstürünü, puan durumunu, hoca güvenini ve transfer fırsatlarını takip et."],
  retired: ["Kariyer arşivin", "Sahadaki yolculuğunu ve futbol sonrası seçtiğin yeni rolü incele."]
};
const ITEM_LABELS = ["Sokak", "Akademi", "Hız", "Kontrol", "Vuruş", "Çeviklik", "Tempo", "Kilit", "Yıldız", "Pro", "Klasik", "Grafit", "Neon", "Fırtına", "Ritim", "Sprint", "Usta", "Arena", "Vizyon", "Miras", "Turbo", "Kaptan", "Efsane", "Gece", "Yol"];
const COLOR_LABELS = ["Siyah", "Beyaz", "Lime", "Kırmızı", "Mavi", "Turuncu", "Mor", "Gümüş", "Yeşil", "Kömür"];
const ACCESSORY_LABELS = ["Kaptan bandı", "Taraftar atkısı", "Sokak şapkası", "Bileklik", "Spor çantası", "Kolye", "Bere", "Güneş gözlüğü", "Saat", "Çorap seti", "Şal", "Rozet"];
const SHOE_BRANDS = ["Nike", "adidas", "PUMA", "Mahalle Atölyesi", "Saha 34"];
const ACCESSORY_TYPES = ["Aksesuar", "Sokak stili", "Maç günü", "Takım ekipmanı"];
const RANDOM_NAMES = ["Sakin Başlangıç", "Ters Köşe", "Son Dakika", "Kaptan Serisi", "Yükselen Yıldız", "Mahalle İşi", "Yol Arkadaşı", "İlk Adım", "Usta Dokunuş", "Saha Işığı"];
const FEATURED_PRODUCTS = [
  { id: "boot-canvas", kind: "boot", brand: "Mahalle Atölyesi", name: "Mahalle işi bez krampon", tier: 0, cost: 250, bonus: 0, mudSlipRisk: 1.35, description: "Ucuz ve hafif; çamurlu zeminde tutuşu zayıf.", effectText: "Bonus yok · Çamurlu zeminde sakatlık riski artar" },
  { id: "boot-plastic", kind: "boot", brand: "Semt Pazarı", name: "Plastik dişli çakma krampon", tier: 0, cost: 700, bonus: 1, matchFatigue: 2, description: "Düşük bütçeli plastik dişler tutuş sağlar ama ayağı yorar.", effectText: "Maç sonu yorgunluk +2" },
  { id: "boot-leather", kind: "boot", brand: "Klasik Seri", name: "Siyah deri klasik krampon", tier: 2, cost: 6500, bonus: 3, passBonus: 0.07, description: "Dayanıklı deri ve dengeli taban; pas kararlarında güven verir.", effectText: "Maç bonusu +3 · Pas başarısı +7%" },
  { id: "boot-speed", kind: "boot", brand: "Sprint Serisi", name: "Neon profesyonel hız kramponu", tier: 3, cost: 42000, bonus: 5, speedBonus: 0.15, purchaseEffects: { fame: 3, mediaFollowers: 75 }, description: "Hafif yapı, sprint ve hücum aksiyonlarında avantaj sağlar.", effectText: "Hız aksiyonları +%15 · Şöhret +3" },
  { id: "boot-nike-mercurial", kind: "boot", brand: "Nike", name: "Mercurial Vapor hız kramponu", tier: 2, cost: 18500, bonus: 4, speedBonus: 0.08, description: "Hafif tabanı ilk hızlanmalarda ve hücum koşularında destek sağlar.", effectText: "Hız aksiyonları +%8 · Maç bonusu +4" },
  { id: "boot-adidas-f50", kind: "boot", brand: "adidas", name: "F50 çeviklik kramponu", tier: 3, cost: 36000, bonus: 5, speedBonus: 0.1, description: "Çeviklik ve patlayıcı hız için tasarlanmış profesyonel seri.", effectText: "Hız aksiyonları +%10 · Maç bonusu +5" },
  { id: "boot-nike-phantom", kind: "boot", brand: "Nike", name: "Phantom GX kontrol kramponu", tier: 3, cost: 39000, bonus: 5, passBonus: 0.1, description: "Dokulu yüzeyi top kontrolü ve pas kararlarında avantaj sağlar.", effectText: "Pas başarısı +%10 · Maç bonusu +5" },
  { id: "boot-adidas-predator", kind: "boot", brand: "adidas", name: "Predator vuruş kramponu", tier: 3, cost: 41000, bonus: 5, setPieceBonus: 0.12, description: "Sert şutlar ve duran toplar için dengeli vuruş yüzeyi.", effectText: "Duran top başarısı +%12 · Maç bonusu +5" },
  { id: "boot-gold", kind: "boot", brand: "Yıldız Koleksiyonu", name: "Özel tasarım altın yıldız kramponu", tier: 4, cost: 250000, bonus: 2, purchaseEffects: { fame: 8, mediaFollowers: 250 }, description: "Sahada fark edilen özel tasarım; performanstan çok imaj yatırımı.", effectText: "Şöhret +8 · Takipçi +250" },
  { id: "outfit-hoodie", kind: "outfit", brand: "Mahalle Stili", name: "Gri eşofman ve bol kapüşonlu", tier: 0, cost: 500, bonus: 0, purchaseEffects: { morale: 2 }, description: "Günlük kullanım için rahat ve sade mahalle kombini.", effectText: "Satın alırken moral +2" },
  { id: "outfit-street", kind: "outfit", brand: "Semt Koleksiyonu", name: "Şişme mont ve zincir kombini", tier: 1, cost: 3800, bonus: 0, purchaseEffects: { communityTies: 2, fanLove: 2 }, description: "Mahalle buluşmalarında daha görünür bir sokak tarzı.", effectText: "Mahalle bağı +2 · Taraftar sevgisi +2" },
  { id: "outfit-oversize", kind: "outfit", brand: "Sokak Modası", name: "Oversize tasarım ve sneaker kombini", tier: 2, cost: 18000, bonus: 0, purchaseEffects: { fame: 3, mediaFollowers: 100, styleFollowing: 1 }, description: "Sosyal medya ve günlük görünüm için iddialı tasarım.", effectText: "Şöhret +3 · Takipçi +100" },
  { id: "outfit-tracksuit", kind: "outfit", brand: "Saha Koleksiyonu", name: "Futbolcu eşofman takımı", tier: 1, cost: 4800, bonus: 0, purchaseEffects: { morale: 2, fanLove: 1 }, description: "Antrenman yolculukları ve günlük kullanım için sportif takım.", effectText: "Moral +2 · Taraftar sevgisi +1" },
  { id: "outfit-clean", kind: "outfit", brand: "Şehir Stili", name: "Minimalist clean-fit kombin", tier: 2, cost: 12500, bonus: 0, purchaseEffects: { fame: 2, mediaFollowers: 60, styleFollowing: 1 }, description: "Düz renkler ve sade kesimlerle kamera önünde özenli görünüm.", effectText: "Şöhret +2 · Takipçi +60" },
  { id: "outfit-luxury", kind: "outfit", brand: "Lüks Koleksiyon", name: "Lüks marka sokak giyim kombini", tier: 4, cost: 95000, bonus: 0, purchaseEffects: { fame: 5, mediaFollowers: 220, styleFollowing: 2 }, description: "Yüksek bütçeli moda yatırımı; performans değil imaj sağlar.", effectText: "Şöhret +5 · Takipçi +220" },
  { id: "outfit-suit", kind: "outfit", brand: "Klasik Terzi", name: "İtalyan kesim takım elbise", tier: 3, cost: 28000, bonus: 0, purchaseEffects: { coachTrust: 2, presidentOpinion: 2 }, description: "İmza günleri ve resmi davetler için profesyonel görünüm.", effectText: "Hoca güveni +2 · Yönetim görüşü +2" },
  { id: "grooming-barber", kind: "grooming", brand: "Mahalle Berberi", name: "Klasik berber tıraşı", tier: 0, cost: 250, bonus: 0, purchaseEffects: { morale: 1 }, description: "Klasik ve temiz görünüm; bakım rutinine küçük bir başlangıç.", effectText: "Satın alırken moral +1" },
  { id: "grooming-fade", kind: "grooming", brand: "Berber Stüdyosu", name: "Fade saç ve sakal tasarımı", tier: 1, cost: 1600, bonus: 0, purchaseEffects: { fame: 1, styleFollowing: 1 }, description: "Maç öncesi özgüven ve kamera karşısında özenli görünüm.", effectText: "Şöhret +1 · Tarz etkisi +1" },
  { id: "grooming-perfume", kind: "grooming", brand: "Kişisel Bakım", name: "Odunsu-baharatlı özel esans", tier: 2, cost: 5500, bonus: 0, purchaseEffects: { fame: 2, fanLove: 2 }, description: "Sosyal buluşmalar için özenli, kalıcı bir imza.", effectText: "Şöhret +2 · Taraftar sevgisi +2" },
  { id: "grooming-luxury-perfume", kind: "grooming", brand: "Premium Bakım", name: "Lüks sporcu parfümü", tier: 3, cost: 12500, bonus: 0, purchaseEffects: { fame: 3, fanLove: 2, styleFollowing: 1 }, description: "Özel davetlerde ve kamera önünde güçlü bir kişisel imaj.", effectText: "Şöhret +3 · Taraftar sevgisi +2" },
  { id: "grooming-massage", kind: "consumable", brand: "Sporcu Sağlığı", name: "Sporcu masajı ve fizyoterapi", tier: 1, cost: 900, bonus: 0, consumeEffects: { fatigue: -9, energy: 7 }, description: "Antrenman sonrası toparlanma için tek seanslık bakım.", effectText: "Yorgunluk −9 · Enerji +7" },
  { id: "food-kiosk", kind: "consumable", brand: "Mahalle Büfesi", name: "Islak hamburger ve kola", tier: 0, cost: 100, bonus: 0, consumeEffects: { energy: -3, fatigue: 3, morale: 2 }, description: "Ucuz ve keyifli; ağır öğün maç enerjisini düşürür.", effectText: "Enerji −3 · Yorgunluk +3 · Moral +2" },
  { id: "food-home", kind: "consumable", brand: "Esnaf Lokantası", name: "Ev yemeği: kuru-pilav", tier: 0, cost: 220, bonus: 0, consumeEffects: { energy: 6, fatigue: -2, morale: 1 }, description: "Doyurucu, dengeli bir öğün; maç öncesi toparlanmaya yardımcı.", effectText: "Enerji +6 · Yorgunluk −2" },
  { id: "food-simit", kind: "consumable", brand: "Mahalle Fırını", name: "Sokak simidi ve çay", tier: 0, cost: 70, bonus: 0, consumeEffects: { energy: 3, morale: 1 }, description: "Antrenman öncesi hızlı ve ekonomik atıştırmalık.", effectText: "Enerji +3 · Moral +1" },
  { id: "food-protein", kind: "consumable", brand: "Sporcu Beslenmesi", name: "Tiramisu aromalı protein içeceği", tier: 1, cost: 450, bonus: 0, consumeEffects: { energy: 8, fatigue: -1, skill: 1 }, description: "Antrenman sonrası toparlanma için tek kullanımlık destek.", effectText: "Enerji +8 · Yorgunluk −1 · Yetenek +1" },
  { id: "food-creatine", kind: "consumable", brand: "Sporcu Beslenmesi", name: "Kreatin ve BCAA destek paketi", tier: 2, cost: 850, bonus: 0, consumeEffects: { energy: 10, fatigue: -2, speed: 1 }, description: "Oyun içi, tek kullanımlık sporcu takviyesi; kalıcı stat artışı sınırlıdır.", effectText: "Enerji +10 · Yorgunluk −2 · Hız +1" }
];
function clamp(value, min = 0, max = 100) { return Math.max(min, Math.min(max, value)); }
function randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function moneyText(value) { return "₺" + new Intl.NumberFormat("tr-TR").format(Math.max(0, Math.round(value))); }
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
}
function makeCatalog() {
  const items = [...FEATURED_PRODUCTS];
  for (let i = 0; i < 250; i++) {
    const tier = Math.floor(i / 50);
    const quality = 1 + tier * 2 + (i % 5);
    const cost = [450, 1800, 6200, 18000, 38000][tier] + (i % 10) * [75, 180, 400, 900, 2400][tier];
    items.push({
      id: `boot-${i + 1}`, kind: "boot", brand: SHOE_BRANDS[(i + tier) % SHOE_BRANDS.length],
      name: `${ITEM_LABELS[i % ITEM_LABELS.length]} ${COLOR_LABELS[Math.floor(i / 25) % COLOR_LABELS.length]} ${String(i + 1).padStart(3, "0")}`,
      tier, quality, cost, bonus: Math.max(1, Math.round(quality / 2)), color: COLOR_LABELS[Math.floor(i / 25) % COLOR_LABELS.length]
    });
  }
  for (let i = 0; i < 250; i++) {
    const tier = Math.floor(i / 50);
    const quality = 1 + tier * 2 + (i % 5);
    const cost = [150, 500, 1400, 4200, 10000][tier] + (i % 10) * [30, 65, 150, 300, 650][tier];
    items.push({
      id: `accessory-${i + 1}`, kind: "accessory", brand: "Saha Koleksiyonu",
      name: `${ACCESSORY_LABELS[i % ACCESSORY_LABELS.length]} · ${COLOR_LABELS[Math.floor(i / 12) % COLOR_LABELS.length]} ${String(i + 1).padStart(3, "0")}`,
      tier, quality, cost, bonus: Math.max(1, Math.round(quality / 3)), color: COLOR_LABELS[Math.floor(i / 12) % COLOR_LABELS.length]
    });
  }
  return items;
}
const CATALOG = makeCatalog();
const HOME_ASSETS = [
  { id: "room", name: "Mahalle odası", icon: "⌂", cost: 0, tier: 0, desc: "Aile evi. İlk kariyer günlerinde masraf yok.", bonus: "Aile bağı korunur", weeklyCost: 0, weeklyMood: 0, weeklyStress: 0 },
  { id: "flat", name: "Paylaşımlı daire", icon: "▦", cost: 18000, tier: 0, desc: "Takım arkadaşınla küçük bir eve çık.", bonus: "Moral +3 · haftalık kira ₺350", weeklyCost: 350, weeklyMood: 1, weeklyStress: -1 },
  { id: "own-flat", name: "Kendi semt dairen", icon: "⌂", cost: 65000, tier: 1, desc: "Aileden ayrı, kendine ait bir düzen kur.", bonus: "Özgür alan · haftalık gider ₺180", weeklyCost: 180, weeklyMood: 1, weeklyStress: -2 },
  { id: "city-flat", name: "Şehir dairesi", icon: "⌂", cost: 78000, tier: 2, desc: "Profesyonel kariyerine uygun konfor.", bonus: "Moral +6 · haftalık kira ₺1.200", weeklyCost: 1200, weeklyMood: 2, weeklyStress: -2 },
  { id: "villa", name: "Modern villa", icon: "⌂", cost: 360000, tier: 4, desc: "Üst liglerde kendi düzenini kur.", bonus: "Moral +10 · haftalık gider ₺4.000", weeklyCost: 4000, weeklyMood: 3, weeklyStress: -3 },
  { id: "residence", name: "Şehir manzaralı lüks rezidans", icon: "⌂", cost: 480000, tier: 4, desc: "Üst düzey kariyer için merkezi ve konforlu bir yaşam alanı.", bonus: "Prestij · haftalık gider ₺2.500", weeklyCost: 2500, weeklyMood: 3, weeklyStress: -3 }
];
const VEHICLES = [
  { id: "worn-bike", name: "Yıpranmış bisiklet", icon: "🚲", cost: 0, tier: 0, desc: "Bedava ulaşım; yokuşta bacaklarını maçtan önce yorabilir.", bonus: "Maç öncesi enerji −6 · yorgunluk +3", type: "bike", weeklyCost: 0, matchEnergyDrain: 6, matchFatigue: 3 },
  { id: "modified-bike", name: "Korna ve koltuklu modifiye bisiklet", icon: "🚲", cost: 1500, tier: 0, desc: "Mahalle turu ve kısa mesafeler için eğlenceli bir yükseltme.", bonus: "Maç öncesi enerji −2 · yorgunluk +1", type: "bike", weeklyCost: 0, matchEnergyDrain: 2, matchFatigue: 1 },
  { id: "motor-commuter", name: "Kuba Çita tarzı 50cc commuter", icon: "🏍️", cost: 12000, tier: 1, desc: "Ulaşımı hızlandırır; kurye vardiyasıyla ek gelir sağlar.", bonus: "Kurye geliri ₺350 · bakım ₺180/hafta · düşük kaza riski", type: "motorcycle", weeklyCost: 180, deliveryReward: 350, crashRisk: 0.025, repairCost: 550 },
  { id: "motor-raider", name: "TVS Raider 125cc commuter", icon: "🏍️", cost: 24500, tier: 1, desc: "Ekonomik yakıt tüketimiyle idmana ve işe ulaşım.", bonus: "Kurye geliri ₺420 · bakım ₺220/hafta", type: "motorcycle", weeklyCost: 220, deliveryReward: 420, crashRisk: 0.03, repairCost: 650 },
  { id: "motor-naked", name: "QJ Motor SRK 125 R / Bajaj NS125", icon: "🏍️", cost: 42000, tier: 2, desc: "Sportif görünüşlü genç motoru; vlog ve kurye işi için uygun.", bonus: "Kurye geliri ₺500 · vlog takipçisi +50 · bakım ₺350/hafta", type: "motorcycle", weeklyCost: 350, deliveryReward: 500, crashRisk: 0.04, repairCost: 900, vlogFollowers: 50 },
  { id: "motor-premium", name: "Yamaha MT-125 / Honda CB125R", icon: "🏍️", cost: 86000, tier: 3, desc: "Üst segment başlangıç motoru; karizma ve sosyal medya görünürlüğü.", bonus: "Kurye geliri ₺600 · vlog takipçisi +80 · bakım ₺550/hafta", type: "motorcycle", weeklyCost: 550, deliveryReward: 600, crashRisk: 0.045, repairCost: 1300, vlogFollowers: 80, purchaseEffects: { fame: 2, mediaFollowers: 80 } },
  { id: "tofas", name: "İkinci el Tofaş Şahin", icon: "🚘", cost: 18500, tier: 0, desc: "Yağmurdan korur; arıza ve bakım masrafları çıkabilir.", bonus: "Moral +2 · bakım ₺400/hafta", type: "car", weeklyCost: 400 },
  { id: "sport-car", name: "Spor otomobil", icon: "🏎️", cost: 280000, tier: 4, desc: "İlk büyük sözleşmenin ardından kulübe konforlu ve dikkat çekici giriş.", bonus: "Şöhret +5 · bakım ₺1.800/hafta", type: "car", weeklyCost: 1800, purchaseEffects: { fame: 5, mediaFollowers: 200 } },
  { id: "bike", name: "Şehir bisikleti", icon: "🚲", cost: 2500, tier: 0, desc: "Mahallede pratik ve ekonomik.", bonus: "Ulaşım gideri yok", type: "bike", weeklyCost: 0 },
  { id: "used-car", name: "Temiz kullanılmış hatchback", icon: "🚗", cost: 42000, tier: 0, desc: "İlk profesyonel maaşla alınabilecek konforlu bir ulaşım seçeneği.", bonus: "Moral +2 · bakım ₺250/hafta", type: "car", weeklyCost: 250 },
  { id: "sedan", name: "Sportif sedan", icon: "🚙", cost: 185000, tier: 2, desc: "Üst liglerin yol arkadaşı.", bonus: "Şöhret +3 · bakım ₺900/hafta", type: "car", weeklyCost: 900 },
  { id: "electric", name: "Elektrikli GT", icon: "🏎", cost: 520000, tier: 4, desc: "Yıldız oyunculara yakışan performans.", bonus: "Şöhret +6 · bakım ₺2.000/hafta", type: "car", weeklyCost: 2000 }
];
const SPONSOR_BRANDS = [
  { brand: "Nike", productId: "boot-nike-mercurial", weeklyIncome: 420, upfront: 1400, weeks: 8, minFame: 4, minMatches: 5 },
  { brand: "adidas", productId: "boot-adidas-f50", weeklyIncome: 500, upfront: 1700, weeks: 8, minFame: 10, minMatches: 6 },
  { brand: "PUMA", productId: "boot-leather", weeklyIncome: 350, upfront: 1000, weeks: 8, minFame: 0, minMatches: 5 },
  { brand: "Proteinocean", productId: "food-protein", weeklyIncome: 280, upfront: 800, weeks: 6, minFame: 0, minMatches: 4 }
];
const ENTERTAINMENT_ASSETS = [
  { id: "crt-console", name: "Tüp televizyon ve eski konsol", icon: "📺", cost: 2500, tier: 0, desc: "Mahalle odasında maçlardan sonra kafa dağıt.", bonus: "Moral +3 · haftalık moral +1", weeklyCost: 40, weeklyMood: 1, weeklyStress: -1 },
  { id: "gaming-setup", name: "Oyun bilgisayarı ve konsol seti", icon: "🎮", cost: 18000, tier: 1, desc: "Oyun geceleriyle maç stresini azalt; elektrik giderini unutma.", bonus: "Moral +6 · haftalık moral +2 · elektrik ₺100", weeklyCost: 100, weeklyMood: 2, weeklyStress: -2 },
  { id: "ps5-tv", name: "Yeni nesil konsol ve geniş ekran TV", icon: "🎮", cost: 36000, tier: 2, desc: "Arkadaşlarınla turnuva düzenleyip maç stresini at.", bonus: "Haftalık moral +3 · stres −3 · elektrik ₺160", weeklyCost: 160, weeklyMood: 3, weeklyStress: -3 }
];
function vehicleDetails(id) { return VEHICLES.find(vehicle => vehicle.id === id) || null; }

function freshState() {
  return {
    player: null, page: "dashboard", week: 1, money: 1200, stats: { skill: 35, fatigue: 12, morale: 65, stress: 16, fame: 0, family: 70, chem: 50, energy: 88, mental: 70, speed: 50, streetRating: 15, resilience: 75, form: 72 },
    pro: false, proTier: 0, proMatches: 0, club: "", rival: "", position: "", city: "", originRegion: "turkey", neighborhood: "", streetSurface: "school", streetRule: "", start: "street", careerStage: "amateur", personality: "Mütevazı", streetMatchRisk: false,
    professionalAcademy: false, academyDivision: "U19", firstTeam: false, coachTrust: 48, fanLove: 50, presidentOpinion: 50, mentality: "balanced",
    leagueKind: null, leagueCountry: "Türkiye", season: 1, fixtures: [], standings: [], transferOffer: null,
    pendingPressConference: null, unlockedPerks: [], activePerk: null,
    contract: { salary: 0, goalBonus: 0, releaseClause: 0, negotiations: 0, lastNegotiationWeek: 0, starterGuaranteed: false },
    overall: 0, matches: 0, goals: 0, assists: 0, ratingTotal: 0, stageMatches: 0, stageRatingTotal: 0, lastRating: null, lastResult: "Kariyerin başladı",
    inventory: [], equipped: { boot: null, accessory: null, outfit: null, grooming: null }, appearance: { street: "Mahalle stili", match: "Kulüp forması", grooming: "Klasik mahalle berberi" },
    home: null, car: null, entertainment: null, carCondition: 100, carMirrorBroken: false, deliveryShiftWeek: 0, motorVlogWeek: 0, dietitianWeeks: 0,
    debt: 0, debtWeeks: 0, injury: null, selectedPlan: null, lastPlan: null, planSkipped: false, trainingStreak: 0, socialStreak: 0, planHistory: [],
    pendingEvents: [], recentNews: [], recentComments: [], match: null, matchPlayed: false, eventCooldown: 0, weekPlans: [], mediaFollowers: 0,
    agent: null, agentOffer: false, agentDeclined: false, marketValue: 0, sponsorIncome: 0, sponsorOffer: null, activeSponsor: null, sponsorCooldownUntil: 0,
    nationalInvite: null, nationalCaps: 0, nationalTournaments: 0,
    captain: false, captainTalkWeek: 0, yellowCards: 0, suspensionMatches: 0, loanOffer: false, loan: null,
    chronicInjury: null, returnFear: false, familyVisitCooldown: 0, communitySupport: 0, recentHighlightIds: [],
    storyEvent: null, storyHistory: [],
    storyTraits: { weakFoot: 0, refereeRespect: 0, divingSkill: 0, tacticalFit: 0, coachTactic: "Dengeli", setPieceSkill: 0, freeKickStyle: "", facilityLevel: 1, leadership: 0, contractAwareness: 0, injuryConfidence: 0, injuryRisk: false, nutrition: 0, financialLiteracy: 0, friendBond: 60, retirementPlan: "", nationalChoice: "", bootSponsor: "", starterStatus: "Normal", foreignStatus: "Yerli statüsü", shirtNumber: 0, styleFollowing: 0, ownGoalRecovery: 0, communityTies: 0, coldReadiness: 0, returnToRoots: false },
    careerRetired: false, retirementRole: null, retirementReview: null, coachCareer: null
  };
}
let state = freshState();
let activeToast;
let shopFilter = "all";
let shopTierFilter = "all";
let shopSearch = "";
let activeSlot = 0;

function readSaveSlots() {
  const rawSlots = localStorage.getItem(SAVE_SLOTS_KEY);
  if (rawSlots) {
    const parsedSlots = JSON.parse(rawSlots);
    if (!Array.isArray(parsedSlots)) throw new Error("Kayıt yuvaları beklenen biçimde değil.");
    return Array.from({ length: SAVE_SLOT_COUNT }, (_, index) => parsedSlots[index] || null);
  }
  const slots = Array(SAVE_SLOT_COUNT).fill(null);
  const legacySave = localStorage.getItem(SAVE_KEY);
  if (legacySave) slots[0] = JSON.parse(legacySave);
  return slots;
}
function restoreState(parsed) {
  if (!parsed || !parsed.player || !parsed.stats || typeof parsed.week !== "number") return false;
  const defaults = freshState();
  const savedStoryId = parsed.storyEvent && parsed.storyEvent.id;
  state = {
    ...defaults, ...parsed, stats: { ...defaults.stats, ...parsed.stats },
    equipped: { ...defaults.equipped, ...(parsed.equipped || {}) },
    appearance: { ...defaults.appearance, ...(parsed.appearance || {}) },
    leagueCountry: CLUB_LEAGUE_DATA[parsed.leagueCountry] ? parsed.leagueCountry :
      CLUB_LEAGUE_DATA[parsed.player.country] ? parsed.player.country : null,
    contract: { ...defaults.contract, ...(parsed.contract || {}) },
    storyTraits: { ...defaults.storyTraits, ...(parsed.storyTraits || {}) },
    storyEvent: STORY_EVENTS.find(event => event.id === savedStoryId) || null,
    storyHistory: Array.isArray(parsed.storyHistory) ? parsed.storyHistory.filter(id => STORY_EVENTS.some(event => event.id === id)) : [],
    careerStage: parsed.careerStage || (parsed.leagueKind === "europe" ? "international" : parsed.pro || parsed.professionalAcademy ? "u19" : parsed.start === "academy" ? "regional" : "amateur"),
    stageMatches: Number.isInteger(parsed.stageMatches) ? parsed.stageMatches : parsed.matches || 0,
    stageRatingTotal: Number.isFinite(parsed.stageRatingTotal) ? parsed.stageRatingTotal : parsed.ratingTotal || 0,
    weekPlans: Array.isArray(parsed.weekPlans) ? parsed.weekPlans.slice(0, 4) : [],
    recentHighlightIds: Array.isArray(parsed.recentHighlightIds) ? parsed.recentHighlightIds.slice(-MAX_RECENT_HIGHLIGHTS) : []
  };
  if (state.match && state.match.phase === "live" && !Array.isArray(state.match.moments)) {
    state.match.moments = state.match.highlight ? [state.match.highlight.minute] : [];
    state.match.momentIndex = 0;
    state.match.lastEventMinute = 0;
    state.match.startingEnergy = state.stats.energy;
  }
  if (state.match && state.match.phase === "live") {
    state.match.usedHighlightIds = Array.isArray(state.match.usedHighlightIds) ? state.match.usedHighlightIds : [];
    if (state.match.highlight && state.match.highlight.id && !state.match.usedHighlightIds.includes(state.match.highlight.id)) {
      state.match.usedHighlightIds.push(state.match.highlight.id);
    }
  }
  return true;
}
function save() {
  try {
    if (!state.player) return false;
    const slots = readSaveSlots();
    slots[activeSlot] = state;
    localStorage.setItem(SAVE_SLOTS_KEY, JSON.stringify(slots));
    localStorage.setItem(ACTIVE_SLOT_KEY, String(activeSlot));
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
    return true;
  } catch (error) {
    console.error("Kariyer kaydedilemedi:", error);
    toast("Kayıt yapılamadı. Tarayıcı depolama alanını kontrol et.");
    return false;
  }
}
function load() {
  try {
    const savedSlot = Number(localStorage.getItem(ACTIVE_SLOT_KEY));
    activeSlot = Number.isInteger(savedSlot) && savedSlot >= 0 && savedSlot < SAVE_SLOT_COUNT ? savedSlot : 0;
    const slots = readSaveSlots();
    if (slots[activeSlot]) restoreState(slots[activeSlot]);
  } catch (error) {
    console.error("Kariyer kaydı okunamadı:", error);
    toast("Kayıt okunamadı; yeni kariyer oluşturabilirsin.");
  }
}
function updateActiveSlotLabel() {
  const label = `${activeSlot + 1} / ${SAVE_SLOT_COUNT}`;
  const startLabel = document.getElementById("active-slot-label");
  if (startLabel) startLabel.textContent = label;
  const status = document.querySelector(".save-status");
  if (status) status.innerHTML = `<span class="status-dot"></span>Kayıt otomatik · ${label}`;
}
function renderCareerSlots() {
  const slots = readSaveSlots();
  document.getElementById("career-slots-list").innerHTML = slots.map((saved, index) => {
    const player = saved && saved.player;
    const active = index === activeSlot;
    const description = player
      ? `${escapeHtml(player.name)} · ${escapeHtml(teamLabel(saved.club || "Kulüpsüz"))} · ${saved.week || 1}. hafta`
      : "Henüz kariyer oluşturulmadı";
    return `<article class="career-slot ${active ? "active" : ""}"><div class="career-slot-info"><strong>Kariyer ${index + 1}${active ? " · Aktif" : ""}</strong><small>${description}</small></div><button class="button ${player ? "button-secondary" : "button-primary"}" data-slot-open="${index}">${player ? active ? "Açık" : "Yükle" : "Yeni kariyer"}</button></article>`;
  }).join("");
}
function openCareerManager() {
  if (state.player && !save()) return;
  try {
    renderCareerSlots();
    const startDialog = document.getElementById("start-dialog");
    if (startDialog.open) startDialog.close();
    document.getElementById("career-dialog").showModal();
  } catch (error) {
    console.error("Kariyer yuvaları görüntülenemedi:", error);
    toast("Kariyer yuvaları açılamadı. Kayıt verilerini kontrol et.");
  }
}
function switchCareerSlot(index) {
  if (!Number.isInteger(index) || index < 0 || index >= SAVE_SLOT_COUNT) return;
  if (state.player && !save()) return;
  const previousSlot = activeSlot;
  try {
    const slots = readSaveSlots();
    activeSlot = index;
    localStorage.setItem(SAVE_SLOTS_KEY, JSON.stringify(slots));
    localStorage.setItem(ACTIVE_SLOT_KEY, String(activeSlot));
    const manager = document.getElementById("career-dialog");
    if (manager.open) manager.close();
    if (slots[index]) {
      if (!restoreState(slots[index])) {
        activeSlot = previousSlot;
        localStorage.setItem(ACTIVE_SLOT_KEY, String(activeSlot));
        toast("Bu yuvadaki kariyer kaydı okunamadı.");
        return;
      }
      render();
      toast(`Kariyer ${index + 1} yüklendi.`);
      return;
    }
    state = freshState();
    render();
    document.getElementById("start-dialog").showModal();
    updateActiveSlotLabel();
  } catch (error) {
    console.error("Kariyer yuvası açılamadı:", error);
    toast("Kariyer açılamadı. Kayıt verilerini kontrol et.");
  }
}
function toast(message) {
  const element = document.getElementById("toast");
  if (!element) return;
  element.textContent = message;
  element.classList.add("show");
  clearTimeout(activeToast);
  activeToast = setTimeout(() => element.classList.remove("show"), 3100);
}
function teamBaseName(teamName) {
  return String(teamName).replace(/\s+U(?:16|17|19|21|23)$/, "").trim();
}
function teamLabel(teamName) {
  const suffix = String(teamName).match(/(\s+U(?:16|17|19|21|23))$/);
  const base = teamBaseName(teamName);
  return `${TEAM_NAME_LABELS[base] || base}${suffix ? suffix[1] : ""}`;
}
function teamLocation(teamName) {
  const base = teamBaseName(teamName);
  const clubDetails = CLUB_DETAILS_BY_NAME[base];
  if (clubDetails) return { country: clubDetails.country, city: clubDetails.city, district: clubDetails.city };
  const academyDetails = ACADEMY_TEAM_DETAILS_BY_NAME[academyTeamBaseName(teamName)];
  if (academyDetails) return { country: academyDetails.country, city: academyDetails.city, district: academyDetails.city };
  if (CLUB_HOME_BY_NAME[base]) {
    const [country, city, district] = CLUB_HOME_BY_NAME[base];
    return { country, city, district };
  }
  const normalized = base.toLocaleLowerCase("tr");
  const hint = TEAM_LOCATION_HINTS.find(item => item.words.some(word => normalized.includes(word.toLocaleLowerCase("tr"))));
  if (hint) {
    const [country, city, district] = hint.home;
    return { country, city, district };
  }
  const locations = REGION_LOCATIONS[state.originRegion] || REGION_LOCATIONS.turkey;
  const home = locations.find(location => location.city === state.city) || locations[0];
  return { country: home.country, city: home.city, district: state.neighborhood || "Merkez" };
}
function teamLocationLabel(teamName) {
  const location = teamLocation(teamName);
  return `${location.country} · ${location.city} / ${location.district}`;
}
function professionalTeamPool(country = state.leagueCountry, tier = state.proTier) {
  const countryData = CLUB_LEAGUE_DATA[country];
  if (countryData) {
    const division = countryData.divisions.find(item => item.tier === tier);
    return (division ? clubsInDivision(division) : clubsInCountry(country)).map(club => club.name);
  }
  const cities = (REGION_LOCATIONS[state.originRegion] || REGION_LOCATIONS.turkey).map(location => location.city);
  const localClubs = Object.entries(PROFESSIONAL_CLUBS)
    .filter(([city]) => cities.includes(city))
    .flatMap(([, clubs]) => clubs);
  const regionalClubs = state.originRegion === "asia" ? ASIAN_REGIONAL_CLUBS :
    state.originRegion === "europe" ? EUROPEAN_REGIONAL_CLUBS : REGIONAL_ACADEMY_CLUBS;
  return [...new Set([...localClubs, ...regionalClubs])];
}
function getTeams() {
  if (["amateur", "regional", "youth", "europe", "professional"].includes(state.leagueKind)) return state.standings.map(team => team.name);
  if (state.pro) {
    if (state.city === "İstanbul") return ["Boğaz Atletik", "Marmara Kent FK", "Anadolu Yıldız", "İstanbul Şafak", "Kuzey Tribün SK"];
    return [`${state.city} Spor`, `${state.city} Atletik`, `${state.city} Birlik`, `${state.city} Yıldız`, `${state.city} Kent FK`];
  }
  return state.city === "İstanbul" ? ISTANBUL_TEAMS : (CITY_TEAMS[state.city] || [`${state.city} Mahalle FK`, `${state.city} Gençlik`, `${state.city} Yıldızları`, `${state.city} Birlik`]);
}
function getOriginLocation() {
  const locations = REGION_LOCATIONS[state.originRegion] || REGION_LOCATIONS.turkey;
  return locations.find(location => location.city === state.city) || locations[0];
}
function getOriginProfile() { return REGION_PROFILES[state.originRegion] || REGION_PROFILES.turkey; }
function getOriginSurface() {
  const surface = STREET_SURFACES[state.streetSurface] || STREET_SURFACES.school;
  return `${surface.matchSurface} · ${getOriginLocation().surface}`;
}
function currentLeague() {
  if (state.leagueKind === "amateur") return "Amatör Yerel Küme";
  if (state.leagueKind === "regional") return `${state.academyDivision} Bölgesel Akademi Ligi`;
  if (state.leagueKind === "youth") return `${state.academyDivision} Gelişim Ligi`;
  if (state.leagueKind === "europe") return "Avrupa U21 Ligi";
  if ((state.leagueKind === "professional" || state.pro) && state.pro) {
    const countryDivision = CLUB_LEAGUE_DATA[state.leagueCountry]?.divisions.find(item => item.tier === state.proTier);
    return countryDivision ? countryDivision.name : ["Bölgesel Lig", "3. Lig", "2. Lig", "1. Lig", "Süper Lig"][Math.min(state.proTier, 4)];
  }
  return "Mahalle Ligi";
}
function currentClub() { return state.club || `${state.city} Mahalle FK`; }
function totalLeagueRounds() { return state.fixtures.length || 38; }
function currentRound() { return ((state.week - 1) % totalLeagueRounds()) + 1; }
function setupLeague(clubName, kind, division = "U19") {
  const regionalClubs = state.originRegion === "asia" ? ASIAN_REGIONAL_CLUBS :
    state.originRegion === "europe" ? EUROPEAN_REGIONAL_CLUBS : REGIONAL_ACADEMY_CLUBS;
  const youthTeams = state.originRegion === "asia" ? ASIAN_YOUTH_TEAMS :
    state.originRegion === "europe" ? EUROPEAN_YOUTH_TEAMS : YOUTH_TEAMS;
  const amateurTeams = state.originRegion === "asia" ? ASIAN_AMATEUR_TEAMS :
    state.originRegion === "europe" ? EUROPEAN_AMATEUR_TEAMS : LOCAL_AMATEUR_TEAMS;
  const countryClubs = clubsInCountry(state.leagueCountry).map(club => club.name);
  const countryYouthTeams = countryClubs.map(club => `${club} ${division}`);
  const countryAcademyTeams = academyTeamsForCountry(state.leagueCountry, kind, division);
  const teamPool = kind === "europe" ? EUROPEAN_YOUTH_TEAMS :
    kind === "amateur" ? amateurTeams :
    kind === "regional" && countryAcademyTeams.length ? countryAcademyTeams :
    kind === "regional" ? regionalClubs.map(club => `${club} ${division}`) :
    kind === "professional" ? professionalTeamPool() :
    kind === "youth" && countryAcademyTeams.length ? countryAcademyTeams :
    kind === "youth" && countryYouthTeams.length ? countryYouthTeams :
    youthTeams.map(team => team.replace(/U(?:19|21)$/, division));
  const configuredTeams = [clubName, ...new Set(teamPool.filter(team => team !== clubName))];
  const teams = kind === "professional" ? configuredTeams : configuredTeams.slice(0, 20);
  state.leagueKind = kind;
  state.fixtures = [];
  state.standings = teams.map(name => ({ name, ...teamLocation(name), played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, points: 0 }));
  const rotation = [...teams];
  if (rotation.length % 2) rotation.push(null);
  for (let round = 0; round < rotation.length - 1; round++) {
    const matches = [];
    for (let index = 0; index < rotation.length / 2; index++) {
      const home = rotation[index];
      const away = rotation[rotation.length - 1 - index];
      if (home && away) matches.push({ home, away, homeScore: null, awayScore: null });
    }
    state.fixtures.push(matches);
    const fixed = rotation[0];
    const rest = rotation.slice(1);
    rest.unshift(rest.pop());
    rotation.splice(0, rotation.length, fixed, ...rest);
  }
  const secondHalf = state.fixtures.map(round => round.map(match => ({
    home: match.away, away: match.home, homeScore: null, awayScore: null
  })));
  state.fixtures.push(...secondHalf);
  state.rival = teams.find(team => team !== clubName) || "";
}
function fixtureForCurrentRound() {
  const round = state.fixtures[currentRound() - 1] || [];
  return round.find(fixture => fixture.home === currentClub() || fixture.away === currentClub());
}
function calculateStandings() {
  const table = new Map(state.standings.map(team => [team.name, { ...team, played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, points: 0 }]));
  for (const round of state.fixtures) {
    for (const fixture of round) {
      if (fixture.homeScore === null || fixture.awayScore === null) continue;
      const home = table.get(fixture.home);
      const away = table.get(fixture.away);
      if (!home || !away) continue;
      home.played++;
      away.played++;
      home.goalsFor += fixture.homeScore;
      home.goalsAgainst += fixture.awayScore;
      away.goalsFor += fixture.awayScore;
      away.goalsAgainst += fixture.homeScore;
      if (fixture.homeScore > fixture.awayScore) { home.wins++; home.points += 3; away.losses++; }
      else if (fixture.homeScore < fixture.awayScore) { away.wins++; away.points += 3; home.losses++; }
      else { home.draws++; away.draws++; home.points++; away.points++; }
    }
  }
  state.standings = [...table.values()].sort((a, b) =>
    b.points - a.points || (b.goalsFor - b.goalsAgainst) - (a.goalsFor - a.goalsAgainst) ||
    b.goalsFor - a.goalsFor || a.name.localeCompare(b.name, "tr")
  );
}
function seededMatchScore(round, index, side) {
  const value = Math.sin(round * 127.1 + index * 311.7 + side * 74.7) * 43758.5453;
  return Math.floor((value - Math.floor(value)) * 4);
}
function recordLeagueRound(match) {
  if (!state.leagueKind) return;
  const roundIndex = currentRound() - 1;
  const fixtures = state.fixtures[roundIndex] || [];
  fixtures.forEach((fixture, index) => {
    if (fixture.homeScore !== null) return;
    if (fixture.home === currentClub()) {
      fixture.homeScore = match.scoreFor;
      fixture.awayScore = match.scoreAgainst;
    } else if (fixture.away === currentClub()) {
      fixture.homeScore = match.scoreAgainst;
      fixture.awayScore = match.scoreFor;
    } else {
      fixture.homeScore = seededMatchScore(roundIndex + 1, index, 0);
      fixture.awayScore = seededMatchScore(roundIndex + 1, index, 1);
    }
  });
  calculateStandings();
}
function nextOpponent() {
  const fixture = state.leagueKind && fixtureForCurrentRound();
  if (fixture) return fixture.home === currentClub() ? fixture.away : fixture.home;
    if (fixture) return fixture.home === currentClub() ? fixture.away : fixture.home;
  if (state.leagueKind && state.fixtures.length) return "Maçsız hafta";
  const teams = getTeams().filter(team => team !== currentClub());
  if (!teams.length) return `${state.city} Yıldızları`;
  if (state.week % 4 === 0 && state.rival && teams.includes(state.rival)) return state.rival;
  return teams[(state.week * 3 + state.matches) % teams.length];
}
function isDerby(opponent) { return state.rival === opponent || (!state.pro && /Güngören|Gaziosmanpaşa/.test(opponent)); }
function calendarLabel() { return `Sezon ${state.season || 1} · ${state.leagueKind ? currentRound() : state.week}. hafta`; }
function statBar(name, key, icon, tone, caption) {
  const value = Math.round(state.stats[key]);
  return `<div class="stat-card"><div class="stat-top"><span>${name}</span><b class="stat-icon">${icon}</b></div><div class="stat-value">${value}<small style="font-size:10px;color:#7f897b"> / 100</small></div><div class="stat-track ${tone}"><i style="width:${value}%"></i></div><div class="stat-caption">${caption}</div></div>`;
}
function updateHeader() {
  document.getElementById("header-money").textContent = new Intl.NumberFormat("tr-TR").format(Math.max(0, Math.round(state.money)));
  document.getElementById("header-week").textContent = `${state.week}. HAFTA`;
  document.getElementById("page-title").textContent = PAGES[state.page] || PAGES.dashboard;
  document.querySelectorAll(".nav-item").forEach(button => button.classList.toggle("active", button.dataset.page === state.page));
}
function heading(page) {
  const [title, description] = PAGE_TITLES[page];
  return `<div class="page-heading"><div><div class="eyebrow">${escapeHtml(currentLeague())} · ${calendarLabel()}</div><h1>${title}</h1><p>${description}</p></div></div>`;
}
function renderCareerPath() {
  const stageIndex = Math.max(0, CAREER_STAGES.findIndex(stage => stage.id === state.careerStage));
  const stage = CAREER_STAGES[stageIndex];
  const average = state.stageMatches ? state.stageRatingTotal / state.stageMatches : 0;
  const requirements = {
    amateur: "16 yaş · en az 6 maç · yetenek 50, şöhret 25 veya sokak reytingi 35",
    regional: "17 yaş · 12 maç · reyting 7,8 · hoca güveni 80",
    u19: "A takım için: 18 yaş · yetenek 65 · hoca güveni 90 · reyting 7,3; Avrupa için: 19 yaş ve scout teklifi"
  };
  const stageCards = CAREER_STAGES.map((item, index) => {
    const status = index < stageIndex ? "completed" : index === stageIndex ? "current" : "";
    return `<div class="career-stage ${status}"><small>${item.ages} YAŞ</small><strong>${escapeHtml(item.title)}</strong><span>${index < stageIndex ? "Tamamlandı" : index === stageIndex ? "Şu anki basamak" : "Sıradaki hedef"}</span></div>`;
  }).join("");
  const nextRequirement = requirements[stage.id];
  return `<div class="panel career-path"><div class="panel-heading"><h2>Sıfırdan zirveye</h2><span>${stageIndex + 1} / ${CAREER_STAGES.length} EVRE</span></div><div class="career-stage-track">${stageCards}</div><p class="subtle">${escapeHtml(stage.league)} evresindesin.${nextRequirement ? ` Geçiş şartları: ${nextRequirement}. Mevcut yaş ${state.player.age}, yetenek ${Math.round(state.stats.skill)}, şöhret ${Math.round(state.stats.fame)}, sokak reytingi ${Math.round(state.stats.streetRating)}, bu evrede ${state.stageMatches} maç, reyting ortalaması ${average.toFixed(1)}${["regional", "u19", "international"].includes(stage.id) ? `, hoca güveni ${Math.round(state.coachTrust)}` : ""}.` : " Avrupa kariyerinde kıtasal kupalar ve uluslararası başarı seni bekliyor."}</p></div>`;
}
function eventText(event) {
  if (event.type === "work") return `${event.name} ile yolların kesişti. Meğer ${event.detail}!`;
  if (event.type === "cafe") return `Mahalle buluşmasındaki sohbet unutulmadı: ${event.detail}. Bu tanışıklık ileride işine yarayabilir.`;
  if (event.type === "night") return `Gece paylaşımın birilerinin gözüne çarptı: ${event.detail}.`;
  if (event.type === "debt") return `Ödeme gecikmesi kapıya dayandı. ${event.detail}`;
  if (event.type === "street") return `Mahalle maçından akılda kalan bir an: ${event.detail}.`;
  return event.detail || "Geçmişteki kararlarından biri bugün tekrar karşına çıktı.";
}
function activityOptions() {
  const eligible = PLAN_LIBRARY.filter(plan => !state.injury || INJURY_SAFE_ACTIVITIES.has(plan.id));
  const current = [...new Set(state.weekPlans)].map(id => eligible.find(plan => plan.id === id)).filter(Boolean);
  const groups = [["training", "skills"], ["recovery", "balanced"], ["social", "cafe", "friends"]];
  const selected = [];
  for (const group of groups) {
    const options = eligible.filter(plan => group.includes(plan.id));
    const existing = current.find(plan => options.some(option => option.id === plan.id));
    const fresh = options.filter(plan => !current.some(item => item.id === plan.id));
    const choice = existing || (fresh.length ? fresh[randomInt(0, fresh.length - 1)] : options[0]);
    if (choice && !selected.some(plan => plan.id === choice.id)) selected.push(choice);
  }
  selected.push(...current.filter(plan => !selected.some(item => item.id === plan.id)));
  if (selected.length < 4) {
    const remaining = eligible.filter(plan => !selected.some(item => item.id === plan.id));
    remaining.sort(() => Math.random() - 0.5);
    selected.push(...remaining.slice(0, 4 - selected.length));
  }
  state.weekPlans = selected.slice(0, 4).map(plan => plan.id);
  return selected.slice(0, 4);
}
function localizedPlan(plan) {
  if (plan.id === "cafe" && state.originRegion === "asia") return { ...plan, name: "Okul çıkışı saha buluşması", desc: "Metro altındaki mahalle sahasında arkadaşlarınla buluş, kafanı dağıt." };
  if (plan.id === "cafe" && state.originRegion === "europe") return { ...plan, name: "Kafes sahası buluşması", desc: "Banliyödeki cage sahasında yerel ekiple buluş, kafanı dağıt." };
  if (plan.id === "work" && state.originRegion === "asia") return { ...plan, name: "Saha işlerine yardım", desc: "Yerel saha sorumlusuna destek ol; harçlık ve yeni bir bağlantı kazan." };
  if (plan.id === "work" && state.originRegion === "europe") return { ...plan, name: "Mahalle kulübüne destek", desc: "Yerel kulübe ve saha ekibine yardım et; harçlık ve yeni bağlantı kazan." };
  return plan;
}
function getTrainingInjuryChance(planId, projected) {
  const plan = PLAN_LIBRARY.find(item => item.id === planId);
  if (!plan || !plan.injury) return 0;
  const streak = state.trainingStreak + (projected === false ? 0 : 1);
  const fatigue = clamp(state.stats.fatigue + (projected === false ? 0 : plan.fatigue));
  const resilience = clamp(state.stats.resilience + (projected === false ? 0 : planId === "training" ? -4 : -2));
  const loadMultiplier = Math.pow(1.5, Math.max(0, streak - 1));
  const fatigueMultiplier = 1 + Math.max(0, fatigue - 55) / 60;
  const resilienceMultiplier = 1 + Math.max(0, 70 - resilience) / 90;
  return Math.min(0.95, plan.injury * loadMultiplier * fatigueMultiplier * resilienceMultiplier);
}
function overtrainingMultiplier() {
  return Math.pow(1.5, Math.max(0, state.trainingStreak - 1));
}
function renderOriginPanel() {
  const profile = getOriginProfile();
  const location = getOriginLocation();
  const surface = STREET_SURFACES[state.streetSurface] || STREET_SURFACES.school;
  const group = profile.streetGroups[0];
  return `<div class="panel origin-panel"><div class="panel-heading"><h2>${escapeHtml(profile.name)} · ${escapeHtml(state.city)} / ${escapeHtml(state.neighborhood || state.city)}</h2><span>${escapeHtml(surface.label)}</span></div><p class="subtle">${escapeHtml(surface.description)} ${escapeHtml(location.surface)}. ${escapeHtml(profile.culture)}. <strong>Saha etkisi:</strong> ${escapeHtml(surface.effects)}.</p><div class="origin-details"><span><small>Yerel ekip</small><strong>${escapeHtml(group)}</strong></span><span><small>Yazılı olmayan kural</small><strong>${escapeHtml(state.streetRule || profile.rules[0])}</strong></span><span><small>Sokak reytingi</small><strong>${Math.round(state.stats.streetRating)}%</strong></span></div></div>`;
}
function prepareWeek() {
  const previous = new Set(state.weekPlans);
  const eligible = PLAN_LIBRARY.filter(plan => !state.injury || INJURY_SAFE_ACTIVITIES.has(plan.id));
  const fresh = eligible.filter(plan => !previous.has(plan.id));
  const preferred = fresh.filter(plan => state.eventCooldown <= 0 || !COOLDOWN_ACTIVITIES.has(plan.id));
  const shuffled = plans => [...plans].sort(() => Math.random() - 0.5);
  const ids = [];
  for (const group of [["training", "skills"], ["recovery", "balanced"], ["social", "cafe", "friends"]]) {
    const preferredGroup = preferred.filter(plan => group.includes(plan.id));
    const freshGroup = fresh.filter(plan => group.includes(plan.id));
    const options = preferredGroup.length ? preferredGroup : freshGroup;
    if (options.length) ids.push(options[randomInt(0, options.length - 1)].id);
  }
  const shuffledFresh = [...shuffled(preferred), ...shuffled(fresh.filter(plan => !preferred.includes(plan)))];
  for (const plan of shuffledFresh) {
    if (ids.length >= 4) break;
    if (!ids.includes(plan.id)) ids.push(plan.id);
  }
  if (ids.length < 4) {
    const fallback = shuffled(eligible.filter(plan => !ids.includes(plan.id)));
    ids.push(...fallback.slice(0, 4 - ids.length).map(plan => plan.id));
  }
  state.weekPlans = ids;
}
function renderCareerEvents() {
  const cards = [];
  if (state.sponsorOffer) {
    const offer = state.sponsorOffer;
    const product = getItem(offer.productId);
    cards.push(`<div class="panel event-panel sponsor-panel"><div class="panel-heading"><h2>${escapeHtml(offer.brand)} iş birliği teklifi</h2><span>KURGU OYUN İÇİ TEKLİF</span></div><p class="subtle">${escapeHtml(offer.brand)}, ${escapeHtml(product ? product.name : "sporcu ürünü")} karşılığında ${offer.weeks} hafta boyunca haftalık ${moneyText(offer.weeklyIncome)} ve imza anında ${moneyText(offer.upfront)} teklif ediyor.</p><div class="action-row"><button class="button button-primary" data-sponsor="accept">İş birliğini kabul et</button><button class="button button-secondary" data-sponsor="decline">Teklifi reddet</button></div></div>`);
  } else if (state.activeSponsor) {
    cards.push(`<div class="panel event-panel sponsor-panel"><div class="panel-heading"><h2>${escapeHtml(state.activeSponsor.brand)} iş birliği</h2><span>${state.activeSponsor.weeksLeft} HAFTA KALDI</span></div><p class="subtle">Haftalık gelir: ${moneyText(state.activeSponsor.weeklyIncome)}. Anlaşma süresi dolunca yeni teklifler yeniden değerlendirilebilir.</p></div>`);
  }
  if (state.agentOffer) cards.push(`<div class="panel event-panel"><div class="panel-heading"><h2>Menajerlik teklifi</h2><span>KARİYER FIRSATI</span></div><p class="subtle">17 yaş eşiğinde bir temsilci; sponsor ve sözleşme görüşmelerini üstlenmek istiyor.</p><div class="action-row"><button class="button button-primary" data-agent="accept">Teklifi kabul et</button><button class="button button-secondary" data-agent="decline">Reddet</button></div></div>`);
  else if (state.agent) cards.push(`<div class="panel event-panel"><div class="panel-heading"><h2>Menajerin · ${escapeHtml(state.agent.name)}</h2><span>İTİBAR ${state.agent.reputation} · HIRS ${state.agent.ambition}</span></div><p class="subtle">${state.sponsorIncome ? `Sponsor anlaşması haftalık ${moneyText(state.sponsorIncome)} getiriyor.` : "Formun yükseldikçe sponsor görüşmeleri açılabilir."} Sözleşme görüşmelerindeki pazarlık desteği Lig & Scout ekranında.</p></div>`);
  if (state.nationalInvite) cards.push(`<div class="panel event-panel"><div class="panel-heading"><h2>Milli takım daveti</h2><span>${escapeHtml(state.nationalInvite.team)}</span></div><p class="subtle">${escapeHtml(state.nationalInvite.country)} formasıyla üç maçlık turnuva fırsatı seni bekliyor.</p><div class="action-row"><button class="button button-primary" data-national="accept">Turnuvaya katıl</button><button class="button button-secondary" data-national="decline">Davetini reddet</button></div></div>`);
  if (state.loanOffer) cards.push(`<div class="panel event-panel"><div class="panel-heading"><h2>Kiralık teklif</h2><span>DAHA FAZLA SÜRE</span></div><p class="subtle">Kulübün, 12 haftalık gelişim için seni 2. Lig düzeyindeki bir takıma göndermeyi öneriyor.</p><div class="action-row"><button class="button button-primary" data-loan="accept">Kiralık git</button><button class="button button-secondary" data-loan="decline">Kulübümde kal</button></div></div>`);
  if (!state.careerRetired && state.player.age >= 38) {
    cards.push(`<div class="panel event-panel retirement-panel"><div class="panel-heading"><h2>${state.player.age >= 41 ? "Futbolculuk kariyerinin sonu" : "Futbol sonrası kararın"}</h2><span>${state.player.age} YAŞ</span></div><p class="subtle">${state.player.age >= 41 ? "En fazla üç sezonluk uzatma hakkın doldu. Kariyerini arşivleyip futbol sonrası rolünü seç." : "İstersen en fazla üç sezon daha futbol oynayabilir veya şimdi emekli olup kariyer arşivini saklayabilirsin."}</p><div class="action-row"><button class="button button-primary" data-retire="coach">Teknik direktör ol</button><button class="button button-secondary" data-retire="commentator">Yorumcu ol</button>${state.player.age < 41 ? `<button class="button button-quiet" data-retire="continue">Futbolcu olarak devam et</button>` : ""}</div></div>`);
  }
  return cards.join("");
}
function renderStoryEvent() {
  if (!state.storyEvent) return "";
  const event = STORY_EVENTS.find(item => item.id === state.storyEvent.id);
  if (!event) return "";
  return `<div class="panel story-event-panel"><div class="panel-heading"><h2>${escapeHtml(event.title)}</h2><span>KARİYER HİKÂYESİ</span></div><p class="subtle">${escapeHtml(event.description)}</p><div class="choice-grid">${event.choices.map((choice, index) => `<button class="choice-button" data-story-choice="${index}"><strong>${escapeHtml(choice.title)}</strong><small>${escapeHtml(choice.description)}</small></button>`).join("")}</div></div>`;
}
function renderStoryProfile() {
  const traits = state.storyTraits;
  const details = [
    ["Zayıf ayak", `${traits.weakFoot}/5`],
    ["Hakem sicili", traits.refereeRespect > 0 ? `+${traits.refereeRespect}` : String(traits.refereeRespect)],
    ["Duran top", traits.freeKickStyle || "Henüz uzmanlaşmadı"],
    ["Hoca sistemi", `${traits.coachTactic} · uyum ${traits.tacticalFit}`],
    ["Tesis seviyesi", `${traits.facilityLevel}/5`],
    ["Milli tercih", traits.nationalChoice || state.player.country],
    ["Forma numarası", traits.shirtNumber || "Kulüp belirler"],
    ["Rotasyon rolü", traits.starterStatus],
    ["Oyuncu statüsü", traits.foreignStatus],
    ["Krampon sponsoru", traits.bootSponsor || "Henüz yok"],
    ["Mahalle bağı", `${traits.communityTies} · arkadaşlık ${traits.friendBond}%`],
    ["Beslenme disiplini", traits.nutrition],
    ["Kariyer sonrası", traits.retirementPlan || (traits.returnToRoots ? "Mahalleye dönüş" : "Henüz planlanmadı")]
  ];
  return `<div class="panel story-profile"><div class="panel-heading"><h2>Kariyer özellikleri</h2><span>SEÇİMLERİNİN ETKİSİ</span></div><div class="story-profile-grid">${details.map(([label, value]) => `<div><small>${escapeHtml(label)}</small><strong>${escapeHtml(value)}</strong></div>`).join("")}</div></div>`;
}
function renderDashboard() {
  const opponent = nextOpponent();
  const events = state.pendingEvents.slice(0, 2);
  const injuryAlert = state.injury ? `<div class="injury-alert"><strong>Revir bilgisi:</strong> ${escapeHtml(state.injury.name)} · ${state.injury.weeks} hafta dinlenme. Bu dönemde toparlanma planları kullanabilirsin; kariyerin devam ediyor.</div>` : "";
  const eventHtml = events.length ? events.map(event => `<div class="feed-item"><span class="feed-icon">✦</span><div>${escapeHtml(eventText(event))}<small>${event.weeks} hafta önce başlayan bir olay zinciri</small></div></div>`).join("") : `<div class="feed-item"><span class="feed-icon">✳</span><div>Bu hafta hikâyenin yeni sayfasını sen yaz.<small>Bir plan seç, maça hazırlan.</small></div></div>`;
  const phoneItem = state.transferOffer
    ? { icon: "✈", title: "Scout teklifi", text: `${teamLabel(state.transferOffer.team)} kadrosuna davet. Teklifini Lig & Scout ekranında yönet.` }
    : state.pendingEvents.length
      ? { icon: "✦", title: "Bekleyen kariyer olayı", text: eventText(state.pendingEvents[0]) }
      : state.recentNews.length
        ? { icon: "◎", title: state.recentNews[0].title, text: state.recentNews[0].text }
        : { icon: "◎", title: "Tribün akışı", text: "Maç performansın ve kariyer haberlerin burada görünür." };
  const phonePage = state.transferOffer ? "league" : "media";
  const debut = state.matches === 0 ? `<p>${escapeHtml(state.player.name)}, ${escapeHtml(state.neighborhood || state.city)} sokaklarından başlayan futbol hikâyene hoş geldin.</p>` : `<p>${escapeHtml(state.player.name)}, bu hafta sahada yeni bir hikâye yazmaya hazır mısın?</p>`;
  return `<section class="page">
    ${injuryAlert}
    ${renderStoryEvent()}
    <div class="hero"><div class="hero-content"><div class="eyebrow">${escapeHtml(currentLeague())} · ${calendarLabel()}</div><h1>Her yıldızın bir <span>başlangıcı</span> var.</h1>${debut}
      <div class="hero-bottom"><button class="button button-primary" data-page="week">Haftanı planla <span>→</span></button><span class="hero-team">${escapeHtml(state.player.name)} · <strong>${escapeHtml(state.position)}</strong> · ${state.player.age} yaş · ${escapeHtml(state.neighborhood || state.city)}</span></div></div></div>
    ${renderCareerPath()}
    ${renderOriginPanel()}
    ${renderStoryProfile()}
    ${renderCareerEvents()}
    <div class="section-title"><h2>Oyuncu durumu</h2><span class="subtle">Haftalık gelişimini takip et</span></div>
    <div class="stats-grid">
      ${statBar("Yetenek", "skill", "✦", "", "Antrenman ve performans")}
      ${statBar("Yorgunluk", "fatigue", "◷", "orange", state.injury ? "Sakatlıkta toparlanma" : "Dinlenerek düşür")}
      ${statBar("Moral", "morale", "♡", "", "Saha ve hayat dengesi")}
      ${statBar("Stres", "stress", "⌁", "red", "Kendine zaman ayır")}
      ${statBar(state.careerStage === "amateur" ? "Mahalle saygınlığı" : "Şöhret", "fame", "◎", "", state.pro ? "Profesyonel görünürlük" : "Performansınla yükselir")}
      ${statBar("Sokak reytingi", "streetRating", "⚽", "", "Yerel maç performansı ve çevre desteği")}
      ${statBar("Aile / Okul", "family", "⌂", "", "Bağlarını güçlü tut")}
      ${statBar("Enerji / Stamina", "energy", "ϟ", "energy", "Antrenman ve maç yüküyle azalır")}
      ${statBar("Fiziksel direnç", "resilience", "⌁", "", "Toparlanmayla güçlenir")}
      ${statBar("Maç formu", "form", "⚽", "", "Saha ritmini koru")}
      ${statBar("Takım uyumu", "chem", "♧", "", "Takım arkadaşlarınla bağ")}
      ${statBar("Mental dayanıklılık", "mental", "✧", "", "Psikolog ve toparlanmayla güçlenir")}
      ${statBar("Hız", "speed", "➤", "", state.chronicInjury ? `Kronik sakatlık: hız -${state.chronicInjury.speedPenalty}` : "Fiziksel gelişim")}
    </div>
    <div class="dashboard-grid">
      <div class="panel"><div class="panel-heading"><h2>Sıradaki maç</h2><span>${state.injury ? "Sakatlık süreci" : "Hafta sonu"}</span></div>
        <div class="next-match"><div class="club"><span class="club-badge">${escapeHtml(teamLabel(currentClub()).slice(0, 2).toUpperCase())}</span>${escapeHtml(teamLabel(currentClub()))}</div><div class="match-time"><span>${isDerby(opponent) ? "DERBİ" : "MAÇ"} · ${state.week}. HAFTA</span><strong>VS</strong></div><div class="club" style="flex-direction:row-reverse;text-align:right">${escapeHtml(teamLabel(opponent))}<span class="club-badge opponent">${escapeHtml(teamLabel(opponent).slice(0, 2).toUpperCase())}</span></div></div>
        <div class="last-result"><span>Son karşılaşma</span><strong>${escapeHtml(state.lastResult)}</strong><button class="text-link" data-page="match">Maça git →</button></div></div>
      <div class="panel"><div class="panel-heading"><h2>Hikâyenden izler</h2><span>KELEBEK ETKİSİ</span></div><div class="feed-list">${eventHtml}</div></div>
      <div class="panel phone-card"><div class="panel-heading"><h2>Telefon & sosyal akış</h2><span>${state.transferOffer ? "TEKLİF" : "GÜNDEM"}</span></div><div class="feed-item"><span class="feed-icon">${phoneItem.icon}</span><div><strong>${escapeHtml(phoneItem.title)}</strong><small>${escapeHtml(phoneItem.text)}</small></div></div><button class="button button-secondary" data-page="${phonePage}">${state.transferOffer ? "Teklifi yönet →" : "Tribün Sesi'ni aç →"}</button></div>
    </div>
    ${["regional", "u19", "international"].includes(state.careerStage) || state.firstTeam ? `<div class="panel trust-panel"><div class="panel-heading"><h2>Hoca güveni</h2><strong>${Math.round(state.coachTrust)}%</strong></div><div class="stat-track"><i style="width:${state.coachTrust}%"></i></div><p class="subtle">${state.firstTeam ? "A takım kadrosuna çağrıldın. Formunu koru!" : "Antrenman disiplini ve maç reytingleri üst basamağa çıkışını belirler."}</p></div>` : ""}
    <div class="career-row"><div class="career-chip"><small>Takım / lig</small><strong>${escapeHtml(teamLabel(currentClub()))} · ${escapeHtml(currentLeague())}${state.firstTeam ? " · A takım kadrosu" : ""}</strong></div><div class="career-chip"><small>Maç / gol / asist</small><strong>${state.matches} maç · ${state.goals} gol · ${state.assists} asist</strong></div><div class="career-chip"><small>Ortalama reyting · kişilik</small><strong>${state.matches ? (state.ratingTotal / state.matches).toFixed(1) : "—"} · ${escapeHtml(state.personality)}</strong></div></div>
  </section>`;
}
function renderLeague() {
  const round = currentRound();
  const roundFixtures = state.fixtures[round - 1] || [];
  const table = state.standings.map((team, index) => {
    const location = team.city ? team : teamLocation(team.name);
    return `<tr class="${team.name === currentClub() ? "my-team" : ""}"><td>${index + 1}</td><th>${escapeHtml(teamLabel(team.name))}</th><td>${escapeHtml(location.country)} · ${escapeHtml(location.city)} / ${escapeHtml(location.district)}</td><td>${escapeHtml(teamManager(team.name))}</td><td>${team.played}</td><td>${team.wins}</td><td>${team.draws}</td><td>${team.losses}</td><td>${team.goalsFor - team.goalsAgainst}</td><td><strong>${team.points}</strong></td></tr>`;
  }).join("");
  const offer = state.transferOffer ? `<div class="panel scout-offer"><div><div class="eyebrow">SCOUT TEKLİFİ · ${escapeHtml(teamLabel(state.transferOffer.club))}</div><h2>${escapeHtml(teamLabel(state.transferOffer.team))} kadrosuna davet</h2><p class="subtle">${escapeHtml(state.transferOffer.note.replace(state.transferOffer.club, teamLabel(state.transferOffer.club)))}</p></div><div class="action-row"><button class="button button-primary" data-transfer="accept">Teklifi kabul et</button><button class="button button-secondary" data-transfer="decline">Şimdilik reddet</button></div></div>` : `<div class="panel scout-panel"><div class="panel-heading"><h2>Avrupa scout ağı</h2><span>${state.professionalAcademy || state.pro ? "AKTİF TAKİP" : "KİLİTLİ"}</span></div><p class="subtle">${state.professionalAcademy || state.pro ? `Şöhret ${Math.round(state.stats.fame)} · Ortalama reyting ${state.matches ? (state.ratingTotal / state.matches).toFixed(1) : "—"}. 19 yaşından itibaren yüksek form ve görünürlük Avrupa kulüplerinin dikkatini çeker.` : "Elit U19 veya profesyonel A takım seviyesine ulaştığında Avrupa scoutları takip etmeye başlar."}</p></div>`;
  const careerManagement = renderCareerManagement();
  if (!state.fixtures.length || !state.standings.length) return `<section class="page">${heading("league")}${renderCareerPath()}<div class="panel scout-panel"><h2>Kariyer basamağın</h2><p class="subtle">Performansın ve yaşın ilerledikçe yerel ligden profesyonel A takıma yükselirsin.</p></div>${careerManagement}${offer}</section>`;
  return `<section class="page">${heading("league")}
    ${renderCareerPath()}
    ${renderOriginPanel()}
    ${["regional", "u19", "international"].includes(state.careerStage) || state.firstTeam ? `<div class="panel trust-panel"><div class="panel-heading"><h2>Hoca güveni</h2><strong>${Math.round(state.coachTrust)}%</strong></div><div class="stat-track"><i style="width:${state.coachTrust}%"></i></div><p class="subtle">${state.firstTeam ? "A takım kadrosundasın." : "Üst düzey performans ve disiplin, sonraki basamağın anahtarı."}</p></div>` : ""}
    ${careerManagement}
    <div class="two-column league-layout"><div class="panel table-panel"><div class="panel-heading"><h2>${escapeHtml(currentLeague())} · Puan durumu</h2><span>${state.season}. SEZON</span></div><div class="table-scroll"><table class="standings-table"><thead><tr><th>#</th><th>Takım</th><th>Ülke / il / ilçe</th><th>Teknik direktör</th><th>O</th><th>G</th><th>B</th><th>M</th><th>AV</th><th>P</th></tr></thead><tbody>${table}</tbody></table></div></div>
    <aside><div class="panel"><div class="panel-heading"><h2>${round}. hafta fikstürü</h2><span>${state.standings.length} TAKIM · ${state.fixtures.length} HAFTA</span></div><div class="fixture-list">${roundFixtures.map(fixture => `<div class="fixture-row ${fixture.home === currentClub() || fixture.away === currentClub() ? "my-fixture" : ""}"><span class="fixture-team"><strong>${escapeHtml(teamLabel(fixture.home))}</strong><small>${escapeHtml(teamLocationLabel(fixture.home))}</small></span><strong>${fixture.homeScore === null ? "– : –" : `${fixture.homeScore} : ${fixture.awayScore}`}</strong><span class="fixture-team"><strong>${escapeHtml(teamLabel(fixture.away))}</strong><small>${escapeHtml(teamLocationLabel(fixture.away))}</small></span></div>`).join("")}</div></div>${offer}</aside></div>
  </section>`;
}
function renderCareerManagement() {
  const canShowPerks = state.professionalAcademy || state.pro;
  if (!canShowPerks && !state.agentOffer && !state.agent && state.careerStage !== "regional") return "";
  const perks = canShowPerks ? PLAYER_PERKS.map(perk => {
    const unlocked = state.unlockedPerks.includes(perk.id);
    const active = state.activePerk === perk.id;
    return `<article class="perk-card ${active ? "active" : ""}"><strong>${escapeHtml(perk.name)}</strong><p>${escapeHtml(perk.desc)}</p><button class="button ${active ? "button-secondary" : "button-quiet"}" data-perk="${perk.id}" ${unlocked ? "" : "disabled"}>${active ? "Aktif yetenek" : unlocked ? "Kuşan" : `${perk.unlockAt} maçta açılır`}</button></article>`;
  }).join("") : "";
  const perksPanel = canShowPerks ? `<div class="panel"><div class="panel-heading"><h2>Oyuncu uzmanlıkları</h2><span>${state.unlockedPerks.length} / ${PLAYER_PERKS.length} AÇIK</span></div><div class="perk-grid">${perks}</div></div>` : "";
  const agentPanel = state.agentOffer ? `<div class="panel agent-panel"><div class="panel-heading"><h2>Menajerlik teklifi</h2><span>17+ YAŞ</span></div><p class="subtle">Bir temsilci; sponsor, sözleşme ve kulüp görüşmelerini üstlenmek istiyor. Kabul edersen itibarı ve hırsı tekliflerine etki eder.</p><div class="action-row"><button class="button button-primary" data-agent="accept">Temsilciyle anlaş</button><button class="button button-secondary" data-agent="decline">Kendim ilerleyeceğim</button></div></div>` :
    state.agent ? `<div class="panel agent-panel"><div class="panel-heading"><h2>Menajerin · ${escapeHtml(state.agent.name)}</h2><span>İTİBAR ${state.agent.reputation} · HIRS ${state.agent.ambition}</span></div><p class="subtle">${state.sponsorIncome ? `Sponsor anlaşması haftalık ${moneyText(state.sponsorIncome)} getiriyor.` : "Formun ve şöhretin arttıkça sponsor görüşmeleri açılabilir."} Menajerin kulüp görüşmelerinde pazarlık gücünü artırır.</p></div>` : "";
  const canNegotiate = state.matches >= 5 && state.week - state.contract.lastNegotiationWeek >= 5;
  const contract = canShowPerks ? `<div class="panel contract-panel"><div class="panel-heading"><h2>Menajer & sözleşme</h2><span>BAŞKANLA GÖRÜŞME</span></div><div class="contract-summary"><span>Haftalık maaş <strong>${moneyText(state.contract.salary)}</strong></span><span>Gol primi <strong>${moneyText(state.contract.goalBonus)} / gol</strong></span><span>Serbest kalma <strong>${state.contract.releaseClause ? moneyText(state.contract.releaseClause) : "Belirlenmedi"}</strong></span><span>A takım garantisi <strong>${state.contract.starterGuaranteed ? "Sözleşmede" : "Yok"}</strong></span></div><p class="subtle">Piyasa değeri: <strong>${moneyText(state.marketValue)}</strong> · Başkanın bakışı: <strong>${Math.round(state.presidentOpinion)}%</strong>. ${canNegotiate ? "Formuna göre bir talep seç. Yeni görüşme için 5 hafta bekle." : `Görüşme için en az 5 maç ve görüşmeler arasında 5 hafta gerekir. (${state.matches} maç)`}</p><div class="action-row"><button class="button button-secondary" data-contract="salary" ${canNegotiate ? "" : "disabled"}>Maaş zammı iste</button><button class="button button-secondary" data-contract="bonus" ${canNegotiate ? "" : "disabled"}>Gol primi iste</button><button class="button button-quiet" data-contract="clause" ${canNegotiate ? "" : "disabled"}>₺12 mn serbest kalma</button><button class="button button-quiet" data-contract="starter" ${canNegotiate ? "" : "disabled"}>İlk 11 garantisi</button></div></div>` : "";
  const captainPanel = state.captain ? `<div class="panel agent-panel"><div class="panel-heading"><h2>Takım kaptanı</h2><span>SOYUNMA ODASI LİDERİ</span></div><p class="subtle">Kritik maç öncesi takım konuşmasıyla moral ve uyumu artırabilirsin.</p></div>` : "";
  return `<div class="career-management">${perksPanel}${agentPanel}${contract}${captainPanel}</div>`;
}
function renderWeek() {
  if (!state.weekPlans.length) prepareWeek();
  const plans = activityOptions();
  const events = state.pendingEvents.filter(event => event.weeks <= 0);
  const trainingRisk = state.injury ? "Sakatlık nedeniyle kapalı" : `%${(getTrainingInjuryChance("training") * 100).toFixed(1)}`;
  const trainingStreak = state.trainingStreak;
  return `<section class="page">${heading("week")}${renderStoryEvent()}
    ${state.injury ? `<div class="injury-alert"><strong>Revir · ${escapeHtml(state.injury.name)}:</strong> ${state.injury.weeks} hafta kaldı. Kulüp doktoruyla dinlenerek iyileşebilir veya özel fizyoterapistle süreci hızlandırabilirsin.<div class="action-row"><button class="button button-secondary" id="private-physio" ${state.money < 600 ? "disabled" : ""}>Özel fizyoterapist · ₺600</button><button class="button button-quiet" id="early-return">Erken dön · küçük kronikleşme riski</button><span>Mevcut bakiye: ${moneyText(state.money)}</span></div></div>` : ""}
    <div class="panel weekly-balance"><div class="panel-heading"><h2>Bu haftaki odağın: yük, toparlanma veya sosyal hayat</h2><span>FİZİKSEL DURUM</span></div><div class="planning-stats"><span>Stamina <strong>%${Math.round(state.stats.energy)}</strong></span><span>Fiziksel direnç <strong>%${Math.round(state.stats.resilience)}</strong></span><span>Üst üste antrenman <strong>${trainingStreak} hafta</strong></span><span>Antrenmanı seçersen sakatlık ihtimali <strong>${trainingRisk}</strong></span></div><p class="subtle">Yoğun antrenman yeteneği artırır ama stamina/direnci düşürür; seri uzadıkça sakatlık riski katlanır. Dinlenme yükü sıfırlar. Sosyal hayat antrenman yükü kaynaklı riski taşımaz, fakat art arda gece hayatı maç formunu düşürür.</p></div>
    <div class="two-column">    <div><div class="activity-grid">${plans.map(plan => { const activity = localizedPlan(plan); const injuryTag = plan.injury ? `<span class="effect-tag bad">Sakatlık ihtimali ≈ %${(getTrainingInjuryChance(plan.id) * 100).toFixed(1)}</span>` : "";     const socialTag = ["social", "cafe", "friends"].includes(plan.id) ? `<span class="effect-tag ${state.socialStreak ? "bad" : ""}">${state.socialStreak ? `Maç formu −${Math.min(8, state.socialStreak * 2)} · seri ${state.socialStreak + 1}` : "Sosyal odak · fiziksel yük düşük"} · antrenman yük riski yok</span>` : ""; return `<button class="activity-card ${state.selectedPlan === plan.id ? "selected" : ""}" data-plan="${plan.id}" ${state.matchPlayed || state.planSkipped ? "disabled" : ""}><span class="activity-icon">${activity.icon}</span><h3>${escapeHtml(activity.name)}</h3><p>${escapeHtml(activity.desc)}</p><div class="effect-tags">${activity.effects.map(effect => `<span class="effect-tag ${/risk|sakatlık|−| düşer|yorgunluk \+/i.test(effect) ? "bad" : (/[+₺]/.test(effect) ? "good" : "")}">${escapeHtml(effect)}</span>`).join("")}${injuryTag}${socialTag}</div></button>`; }).join("")}</div>
      <div class="action-row week-action-row">${state.matchPlayed ? `<span class="subtle">Bu haftanın maçı tamamlandı. Yeni haftaya maç merkezinden geçebilirsin.</span>` : `<button class="button button-primary" id="continue-week">${state.selectedPlan && !state.planSkipped ? "Planı uygula ve maça geç" : "Dinlenerek maça geç"} <span>→</span></button>`}<button class="button button-quiet" data-page="match">Maç merkezini aç</button></div></div>
      <aside class="week-aside"><div class="panel"><div class="panel-heading"><h2>Haftanın akışı</h2><span>PROGRAM</span></div><div class="calendar-week">${String(state.leagueKind ? currentRound() : state.week).padStart(2, "0")} <small>/ ${state.leagueKind ? totalLeagueRounds() : 38}</small></div>
        <div class="schedule-list"><strong>Hafta içi</strong><span>Planın ve antrenman</span></div><div class="schedule-list"><strong>Hafta sonu</strong><span>${escapeHtml(teamLabel(currentClub()))} - ${escapeHtml(teamLabel(nextOpponent()))}</span></div><div class="schedule-list"><strong>Toparlanma</strong><span>Maç sonrası otomatik</span></div>
      </div><div class="panel"><div class="panel-heading"><h2>Sıradaki olaylar</h2><span>HİKÂYE ZİNCİRİ</span></div>${events.length ? events.map(event => `<div class="event-card"><span class="feed-icon">✦</span><div><strong>${escapeHtml(event.title)}</strong><p>${escapeHtml(eventText(event))}</p></div></div>`).join("") : `<p class="subtle">Kahve, esnaf ve sosyal hayat seçimlerin ileride yeni olaylar doğurabilir. Aile/mahalle etkinlikleri arasında 3–5 hafta ara verilir.</p>`}</div></aside></div>
  </section>`;
}
function renderMatch() {
  const opponent = nextOpponent();
  const match = state.match;
  const opponentName = match ? match.opponent : opponent;
  const both = `<div class="scoreline"><div class="score-club"><span class="club-badge">${escapeHtml(teamLabel(currentClub()).slice(0, 2).toUpperCase())}</span><strong>${escapeHtml(teamLabel(currentClub()))}</strong><small>${escapeHtml(currentLeague())}</small></div><div class="score-center"><strong>${match ? `${match.scoreFor} : ${match.scoreAgainst}` : "VS"}</strong><small>${match && match.phase === "live" ? `${match.minute}′` : match ? "MAÇ SONU" : "HAFTA SONU"}</small></div><div class="score-club"><span class="club-badge opponent">${escapeHtml(teamLabel(opponentName).slice(0, 2).toUpperCase())}</span><strong>${escapeHtml(teamLabel(opponentName))}</strong><small>${isDerby(opponent) ? "DERBİ" : escapeHtml(currentLeague())}</small></div></div>`;
  const tactics = [["attack", "🔥 Aşırı hücum", "Son dakikalarda gol ara · gol şansı ↑ · yorgunluk ↑"], ["balanced", "⚖ Dengeli", "Hücum ve savunma arasında orta yol"], ["controlled", "🎯 Kontrollü oyun", "Topa sahip ol · tempoyu düşür · rakibi hataya zorla"], ["defend", "🧱 Defansif kapan", "Skoru koru · savunma güveni ↑"]];
  const isLive = Boolean(match && match.phase === "live");
  const mentalityPanel = `<div class="panel mentality-panel ${isLive ? "live-mentality-panel" : ""}"><div class="panel-heading"><h2>Canlı taktik paneli</h2><span>${isLive ? "MAÇ İÇİ EMİR" : "MAÇ ÖNCESİ PLAN"}</span></div><div class="mentality-options">${tactics.map(([id, name, desc]) => `<button class="mentality-option ${state.mentality === id ? "selected" : ""}" data-mentality="${id}" aria-pressed="${state.mentality === id}"><strong>${name}</strong><small>${desc}</small></button>`).join("")}</div></div>`;
  const mobileTactics = isLive ? `<div class="mobile-tactic-bar" role="toolbar" aria-label="Maç içi taktik seçimi">${tactics.map(([id, name]) => `<button class="mobile-tactic ${state.mentality === id ? "selected" : ""}" data-mentality="${id}" aria-label="${escapeHtml(name)}" aria-pressed="${state.mentality === id}"><span>${name.split(" ")[0]}</span><small>${escapeHtml(name.replace(/^[^\s]+\s/, ""))}</small></button>`).join("")}</div>` : "";
  const pressPanel = state.pendingPressConference ? `<div class="panel press-panel"><div class="eyebrow">MAÇ SONU BASIN TOPLANTISI</div><h3>${escapeHtml(state.pendingPressConference.prompt)}</h3><div class="choice-grid">${state.pendingPressConference.choices.map((choice, index) => `<button class="choice-button" data-press="${index}"><strong>${escapeHtml(choice.title)}</strong><small>${escapeHtml(choice.description)}</small></button>`).join("")}</div></div>` : "";
  let content = "";
  if (match && match.phase === "live" && match.highlight) {
    const highlight = match.highlight;
    content = `<div class="panel match-event"><div class="eyebrow">${highlight.minute}. DAKİKA · KRİTİK AN ${match.moments ? `· ${match.momentIndex + 1} / ${match.moments.length}` : ""}</div><div class="match-context">SKOR ${match.scoreFor}-${match.scoreAgainst} · RAKİP ${escapeHtml(teamLabel(match.opponent))}</div><h3>${escapeHtml(highlight.title)}</h3><p>${escapeHtml(highlight.description)}</p><div class="choice-grid">${highlight.choices.map((choice, index) => `<button class="choice-button" data-match-choice="${index}"><strong>${escapeHtml(choice.title)}</strong><small>${escapeHtml(choice.description)}</small></button>`).join("")}</div></div>${mentalityPanel}`;
  } else if (match && match.phase === "final") {
    content = `${pressPanel}<div class="panel match-score-summary"><div class="eyebrow">HAFTA ${state.week} · MAÇ RAPORU</div><div class="rating-big">${match.rating.toFixed(1)}</div><p class="subtle">Maç reytingin · ${match.goals} gol · ${match.assists} asist</p><p><strong>${escapeHtml(match.outcome)}</strong></p><p class="rating-note">Gol reytinge +0,6 · Asist +0,3 · Performans, mevki, yorgunluk ve sonucu da hesaba katıldı.</p></div>
      <div class="panel" style="margin-top:12px"><div class="panel-heading"><h2>Maç raporu</h2><span>${match.minute}′</span></div><div class="match-log">${match.log.map(item => `<div class="log-item"><span>${escapeHtml(item.text)}</span><strong>${item.value}</strong></div>`).join("")}</div>
      <div class="action-row match-advance-actions">${state.pendingPressConference ? `<span class="subtle">Haftayı ilerletmeden önce muhabirlerin sorusunu yanıtla.</span>` : `<button class="button button-primary" id="advance-week">Yeni haftaya geç →</button>`}<button class="button button-secondary" data-page="dashboard">Özete dön</button></div></div>`;
  } else if (state.matchPlayed) {
    content = `<div class="panel"><div class="panel-heading"><h2>Bu haftanın maçı tamamlandı</h2><span>HAFTA ${state.week}</span></div><p class="subtle">Yeni haftanın planını seçerek kariyerine devam et.</p><button class="button button-primary" data-page="week">Haftalık plana git →</button></div>`;
  } else if (state.injury) {
    content = `<div class="panel injury-alert"><strong>Maç kadrosu:</strong> Sakatlık sürecinde dinleniyorsun. Bu hafta maç kadrosunda olmayacaksın.</div><button class="button button-primary" id="skip-match">Haftayı dinlenerek geçir →</button>`;
  } else {
    const bootStatus = state.equipped.boot
      ? `<span class="readiness-item"><strong>👟 Krampon bonusu aktif</strong><small>${escapeHtml(getItem(state.equipped.boot).name)} · bonus +${getItem(state.equipped.boot).bonus}</small></span>`
      : `<span class="readiness-item warning"><strong>⚠️ Krampon bonusu yok</strong><small>Ekipman bonusu olmadan sahaya çıkıyorsun.</small></span>`;
    content = `${mentalityPanel}<div class="panel readiness-panel"><div class="panel-heading"><h2>Maç günü hazırlık odası</h2><span>HAFTA ${state.week}</span></div><div class="readiness-grid"><span class="readiness-item"><strong>Maç öncesi yorgunluk</strong><small>%${Math.round(state.stats.fatigue)} · haftalık yük</small></span><span class="readiness-item"><strong>Anlık enerji (stamina)</strong><small>%${Math.round(state.stats.energy)} · hazır güç havuzu</small></span>${bootStatus}<span class="readiness-item ready"><strong>✅ Isınma tamamlandı</strong><small>Maça çıkmaya hazırsın.</small></span></div><p class="subtle">Mentaliteni belirle; istersen son kez haftalık planına dön, hazır olduğunda tek tuşla maça başla.</p><div class="action-row pre-match-actions"><button class="button button-secondary" data-page="week">📅 Önce haftanı planla</button>${state.captain ? `<button class="button button-secondary" id="team-talk" ${state.captainTalkWeek === state.week ? "disabled" : ""}>Kaptan konuşması</button>` : ""}<button class="button button-primary kickoff-button" id="kickoff">⚽ MAÇA BAŞLA</button></div></div>`;
  }
  const weatherLabel = match && match.weather ? match.weather : "Hava maç başında belli olur";
  const surfaceLabel = match && match.surface ? match.surface : getOriginSurface();
  const mobilePitch = `<div class="mobile-pitch" role="img" aria-label="Dikey mini saha, hücum yönü yukarı"><span class="pitch-goal"></span><span class="pitch-box pitch-box-top"></span><span class="pitch-center-circle"></span><span class="pitch-line"></span><span class="pitch-box pitch-box-bottom"></span><span class="pitch-player pitch-player-one"></span><span class="pitch-player pitch-player-two"></span><span class="pitch-player pitch-player-three"></span><span class="pitch-opponent pitch-opponent-one"></span><span class="pitch-opponent pitch-opponent-two"></span><span class="pitch-ball"></span><small>HÜCUM ↑</small></div>`;
  return `<section class="${isLive ? "page match-page-live" : "page"}">${heading("match")}${renderStoryEvent()}<div class="match-hero ${isLive ? "live-match-hero" : ""}">${both}${mobilePitch}<div class="match-meta"><span>${calendarLabel()}</span><span>${isDerby(opponent) ? "⚡ DERBİ" : "🏟 Maç günü"}</span><span>${escapeHtml(currentLeague())}</span><span>${escapeHtml(teamLocationLabel(currentClub()))}</span><span>${escapeHtml(surfaceLabel)}</span><span>${escapeHtml(weatherLabel)}</span>${state.storyTraits.shirtNumber ? `<span>FORMA ${state.storyTraits.shirtNumber}</span>` : ""}${state.storyTraits.freeKickStyle ? `<span>FRİKİK · ${escapeHtml(state.storyTraits.freeKickStyle)}</span>` : ""}</div></div><div class="match-content ${isLive ? "match-content-live" : ""}">${content}</div></section>${mobileTactics}`;
}
function productTierName(tier) { return ["Başlangıç", "Amatör", "Kaliteli", "Pro", "Elit"][tier] || "Elit"; }
function productKindLabel(kind) {
  return { boot: "Krampon", accessory: "Aksesuar", outfit: "Sokak stili", grooming: "Bakım", consumable: "Beslenme" }[kind] || "Ürün";
}
function productKindIcon(kind) {
  return { boot: "👟", accessory: "✦", outfit: "🧥", grooming: "✂", consumable: "🥗" }[kind] || "✦";
}
function renderShop() {
  let items = CATALOG.filter(item => shopFilter === "all" || item.kind === shopFilter);
  if (shopTierFilter !== "all") items = items.filter(item => item.tier === Number(shopTierFilter));
  if (shopSearch) items = items.filter(item => `${item.name} ${item.brand} ${item.kind}`.toLocaleLowerCase("tr").includes(shopSearch.toLocaleLowerCase("tr")));
  const visible = items.slice(0, 48);
  return `<section class="page">${heading("shop")}
    <div class="filter-row"><select class="filter-select" id="shop-filter"><option value="all" ${shopFilter === "all" ? "selected" : ""}>Tüm ürünler</option><option value="boot" ${shopFilter === "boot" ? "selected" : ""}>Kramponlar</option><option value="accessory" ${shopFilter === "accessory" ? "selected" : ""}>Aksesuarlar</option><option value="outfit" ${shopFilter === "outfit" ? "selected" : ""}>Sokak stili</option><option value="grooming" ${shopFilter === "grooming" ? "selected" : ""}>Kişisel bakım</option><option value="consumable" ${shopFilter === "consumable" ? "selected" : ""}>Beslenme & takviye</option></select>
    <select class="filter-select" id="shop-tier"><option value="all" ${shopTierFilter === "all" ? "selected" : ""}>Tüm kalite seviyeleri</option>${["Başlangıç", "Amatör", "Kaliteli", "Pro", "Elit"].map((name, tier) => `<option value="${tier}" ${String(tier) === shopTierFilter ? "selected" : ""}>${name}</option>`).join("")}</select>
    <input class="search-input" id="shop-search" value="${escapeHtml(shopSearch)}" placeholder="Ürün ara..." aria-label="Ürün ara"><span class="catalog-count">${items.length} ürün · gösterilen ${visible.length}</span></div>
    <div class="product-grid">${visible.map(item => {
      const owned = state.inventory.includes(item.id);
      const action = item.kind === "consumable" && owned
        ? `<button class="button button-primary" data-use="${item.id}">Kullan</button>`
        : `<button class="button ${owned ? "button-secondary" : "button-primary"}" data-buy="${item.id}" ${owned ? "disabled" : ""}>${owned ? "Alındı" : "Satın al"}</button>`;
      return `<article class="product-card"><div class="product-art"><span>${productKindIcon(item.kind)}</span></div><div class="product-info"><small>${escapeHtml(item.brand)} · ${productTierName(item.tier)} · ${productKindLabel(item.kind)}</small><h3>${escapeHtml(item.name)}</h3><p class="product-desc">${escapeHtml(item.description || "Tarzını ve ekipman koleksiyonunu tamamla.")}</p><small class="product-effect">${escapeHtml(item.effectText || `Ekipman bonusu +${item.bonus}`)}</small><div class="product-footer"><span class="product-price">${moneyText(item.cost)}</span>${action}</div></div></article>`;
    }).join("")}</div>
    <p class="rating-note" style="margin-top:14px">Toplam ${CATALOG.length} ürün: krampon, aksesuar, sokak stili, kişisel bakım ve tek kullanımlık beslenme ürünleri. Pro/elit ekipmanlar kariyer seviyesine göre açılır.</p></section>`;
}
function getItem(id) { return CATALOG.find(item => item.id === id); }
function applyProductEffects(effects) {
  for (const [key, value] of Object.entries(effects || {})) {
    if (Object.prototype.hasOwnProperty.call(state.stats, key)) state.stats[key] = clamp(state.stats[key] + value);
    else if (key === "mediaFollowers") state.mediaFollowers += value;
    else if (key === "fanLove" || key === "coachTrust" || key === "presidentOpinion") state[key] = clamp(state[key] + value);
    else if (key === "communityTies" || key === "styleFollowing") state.storyTraits[key] = clamp(state.storyTraits[key] + value);
  }
}
function renderWardrobe() {
  const boot = state.equipped.boot ? getItem(state.equipped.boot) : null;
  const accessory = state.equipped.accessory ? getItem(state.equipped.accessory) : null;
  const outfit = state.equipped.outfit ? getItem(state.equipped.outfit) : null;
  const grooming = state.equipped.grooming ? getItem(state.equipped.grooming) : null;
  const ownedBoots = state.inventory.map(getItem).filter(item => item && item.kind === "boot");
  const ownedAccessories = state.inventory.map(getItem).filter(item => item && item.kind === "accessory");
  const ownedOutfits = state.inventory.map(getItem).filter(item => item && item.kind === "outfit");
  const ownedGrooming = state.inventory.map(getItem).filter(item => item && item.kind === "grooming");
  const selectItem = (item, type) => `<div class="equipped-card"><div class="equip-art">${productKindIcon(type)}</div><div style="flex:1"><strong>${escapeHtml(item ? item.name : `Henüz ${productKindLabel(type).toLocaleLowerCase("tr")} seçilmedi`)}</strong><small>${item ? `${escapeHtml(item.brand)} · ${productTierName(item.tier)}` : "Market'ten satın alabilirsin"}</small>${item ? `<small class="bonus-line">${escapeHtml(item.effectText || `Ekipman bonusu +${item.bonus}`)}</small>` : ""}</div></div>`;
  const ownedList = (items, type) => items.length
    ? items.map(item => `<div class="schedule-list"><strong>${escapeHtml(item.name)}</strong><button class="button ${state.equipped[type] === item.id ? "button-secondary" : "button-quiet"}" data-equip="${item.id}">${state.equipped[type] === item.id ? "Kuşanıldı" : "Kuşan"}</button></div>`).join("")
    : `<div class="empty-state">Henüz ürünün yok. <button class="text-link" data-page="shop">Markete git →</button></div>`;
  return `<section class="page">${heading("wardrobe")}<div class="wardrobe-grid">
    <div class="panel"><div class="panel-heading"><h2>Maç günü</h2><span>OTOMATİK KUŞANILIR</span></div><div class="equipped-card"><div class="equip-art">⚽</div><div><strong>${escapeHtml(state.appearance.match)}</strong><small>${escapeHtml(teamLabel(currentClub()))} · maç forması ve tozluk</small></div></div>${selectItem(boot, "boot")}
    <div class="section-title"><h2>Sahip olduğun kramponlar</h2></div>${ownedList(ownedBoots, "boot")}</div>
    <div class="panel"><div class="panel-heading"><h2>Sokak stili</h2><span>GÜNLÜK HAYAT</span></div><div class="equipped-card"><div class="equip-art">♧</div><div><strong>${escapeHtml(state.appearance.street)}</strong><small>Mahalle, okul ve esnaf ziyaretlerinde</small></div></div>${selectItem(accessory, "accessory")}
    <div class="section-title"><h2>Kombin ve sokak stili</h2></div>${selectItem(outfit, "outfit")}${ownedList(ownedOutfits, "outfit")}
    <div class="section-title"><h2>Kişisel bakım</h2></div><div class="equipped-card"><div class="equip-art">✂</div><div><strong>${escapeHtml(state.appearance.grooming)}</strong><small>Berber ve bakım ürünleri</small></div></div>${selectItem(grooming, "grooming")}${ownedList(ownedGrooming, "grooming")}
    <div class="section-title"><h2>Aksesuarlar</h2></div>${ownedList(ownedAccessories, "accessory")}</div></div></section>`;
}
function renderLife() {
  const assetCard = (asset, type) => {
    const owned = state[type] === asset.id;
    const locked = state.proTier < asset.tier;
    const previousVehicle = type === "car" && state.car && !owned ? vehicleDetails(state.car) : null;
    const tradeIn = previousVehicle ? Math.floor(previousVehicle.cost * 0.25) : 0;
    const canAfford = state.money + tradeIn >= asset.cost;
    const requiredLeague = ["Mahalle Ligi", "3. Lig", "2. Lig", "1. Lig", "Süper Lig"][asset.tier] || "Üst lig";
    const actionLabel = type === "car" ? tradeIn ? `Yükselt · takas ${moneyText(tradeIn)}` : "Garaja al" : asset.cost ? "Satın al" : "Taşın";
    const button = owned ? `<button class="button button-secondary" disabled>Sahip</button>` : locked ? `<button class="button button-quiet" disabled>${requiredLeague} gerekli</button>` : `<button class="button button-primary" data-asset="${type}:${asset.id}" ${canAfford ? "" : "disabled"}>${actionLabel}</button>`;
    const displayedCost = asset.cost ? `${moneyText(Math.max(0, asset.cost - tradeIn))}${tradeIn ? " · takas sonrası" : ""}` : "Ücretsiz";
    return `<article class="asset-card"><div class="asset-icon">${asset.icon}</div><h3>${escapeHtml(asset.name)}</h3><p>${escapeHtml(asset.desc)}</p><div class="asset-meta"><span>${escapeHtml(asset.bonus)}</span><strong>${displayedCost}</strong></div>${button}</article>`;
  };
  const motorcycle = vehicleDetails(state.car);
  const motorActions = motorcycle && motorcycle.type === "motorcycle"
    ? `<div class="panel-heading"><h2>Motorla ek gelir</h2><span>${state.carMirrorBroken ? "AYNA HASARLI" : `DURUM %${state.carCondition}`}</span></div><p class="subtle">${state.carMirrorBroken ? "Ayna kırık; kurye vardiyasına çıkmadan önce tamir ettir." : "Kurye vardiyası para kazandırır ama enerji tüketir ve küçük bir kaza riski taşır."}</p><div class="action-row"><button class="button button-primary" id="delivery-shift" ${state.deliveryShiftWeek === state.week || state.carMirrorBroken ? "disabled" : ""}>${state.deliveryShiftWeek === state.week ? "Bu haftaki vardiya tamamlandı" : `Kurye vardiyası · +${moneyText(motorcycle.deliveryReward)}`}</button><button class="button button-secondary" id="motor-vlog" ${state.motorVlogWeek === state.week ? "disabled" : ""}>${state.motorVlogWeek === state.week ? "Bu haftaki vlog paylaşıldı" : "Motor vlogu paylaş"}</button>${state.carMirrorBroken ? `<button class="button button-quiet" id="repair-vehicle" ${state.money < motorcycle.repairCost ? "disabled" : ""}>Aynayı tamir et · ${moneyText(motorcycle.repairCost)}</button>` : ""}</div>`
    : `<div class="panel-heading"><h2>Motorla ek gelir</h2><span>GARAJDA MOTOR GEREKİR</span></div><p class="subtle">Şehir motoru aldığında kurye vardiyası ve haftalık motor vlogu açılır.</p>`;
  const dietitianStatus = state.dietitianWeeks > 0
    ? `Programın ${state.dietitianWeeks} hafta daha sürüyor. Haftalık toparlanma bonusu aktif.`
    : "Dört haftalık program enerji ve toparlanmayı destekler; tek seferlik ücret ₺2.500.";
  return `<section class="page">${heading("life")}<div class="panel match-banner"><span>Bakiye: <strong>${moneyText(state.money)}</strong> · Aktif borç: <strong>${moneyText(state.debt)}</strong></span><span>${escapeHtml(currentLeague())}</span></div>
    <div class="section-title"><h2>Evini seç</h2><span class="subtle">Kira, gider ve konfor haftalık bütçeni etkiler</span></div><div class="life-grid">${HOME_ASSETS.map(asset => assetCard(asset, "home")).join("")}</div>
    <div class="section-title"><h2>Evde dinlen</h2><span class="subtle">Eğlence ürünleri moral sağlar, haftalık elektrik gideri olabilir</span></div><div class="life-grid">${ENTERTAINMENT_ASSETS.map(asset => assetCard(asset, "entertainment")).join("")}</div>
    <div class="section-title"><h2>Ulaşım ve motor garajı</h2><span class="subtle">Araçların bakım giderleri ve takas değeri farklıdır</span></div><div class="life-grid">${VEHICLES.map(asset => assetCard(asset, "car")).join("")}</div>
    <div class="panel lifestyle-panel">${motorActions}</div>
    <div class="section-title"><h2>Mahalle finansı</h2></div><div class="two-column"><div class="panel"><div class="panel-heading"><h2>${state.debt ? "Borç durumun" : "Acil durum kredisi"}</h2><span>OYUN İÇİ MEKANİK</span></div>${state.debt ? `<p class="subtle">Kalan borç ${moneyText(state.debt)} · gecikme ${state.debtWeeks} hafta. Ödeme yapmazsan hikâyede kriz olayı tetiklenebilir.</p><div class="action-row"><button class="button button-primary" id="repay-debt">₺${Math.min(state.debt, 5000).toLocaleString("tr-TR")} öde</button><button class="button button-secondary" id="pay-all-debt" ${state.money >= state.debt ? "" : "disabled"}>Tamamını öde</button></div>` : `<p class="subtle">Bakiyen sıfıra düşerse oyun içi mahalle finansçısından bir defalık borç alabilirsin. Yüksek geri ödeme ve gecikme riski taşır.</p><button class="button button-secondary" id="take-loan" ${state.money > 250 ? "disabled" : ""}>₺2.000 borç al · ₺2.600 geri öde</button>`}</div>
    <div class="panel"><div class="panel-heading"><h2>Kişisel diyetisyen</h2><span>${state.dietitianWeeks ? `${state.dietitianWeeks} HAFTA AKTİF` : "4 HAFTALIK PROGRAM"}</span></div><p class="subtle">${escapeHtml(dietitianStatus)}</p><div class="asset-meta"><span>Başlangıçta enerji +10 · yorgunluk −8</span><strong>₺2.500</strong></div><button class="button button-primary" id="buy-dietitian" ${state.dietitianWeeks || state.money < 2500 ? "disabled" : ""}>${state.dietitianWeeks ? "Program devam ediyor" : "Programa başla"}</button></div></div>
    <div class="section-title"><h2>Ruh sağlığı, aile ve kökler</h2><span class="subtle">Toparlanma ve sosyal denge</span></div><div class="two-column"><div class="panel"><div class="panel-heading"><h2>Spor psikoloğu</h2><span>₺500 · SEANS</span></div><p class="subtle">Mental dayanıklılığı +18, stresi -12 artırır. Sakatlık sonrası temas korkusunu da hafifletir.</p><button class="button button-primary" id="psych-session" ${state.money < 500 ? "disabled" : ""}>Özel seans al</button></div><div class="panel"><div class="panel-heading"><h2>Aile evi & mahalle</h2><span>BAĞ ${Math.round(state.stats.family)}%</span></div><p class="subtle">Aile ziyareti moralini ve dayanıklılığını toplar. Mahalleye destek, eski çevrenle bağını korur.</p><div class="action-row"><button class="button button-secondary" id="visit-family" ${state.familyVisitCooldown > 0 ? "disabled" : ""}>${state.familyVisitCooldown > 0 ? `Ziyaret için ${state.familyVisitCooldown} hafta bekle` : "Aileyi ziyaret et"}</button><button class="button button-quiet" id="support-community" ${state.money < 300 ? "disabled" : ""}>Mahalleye destek · ₺300</button></div></div></div></section>`;
}
function renderMedia() {
  if (!state.pro && !state.professionalAcademy) return `<section class="page">${heading("media")}<div class="locked-media"><div class="lock-icon">🔒</div><strong>Profesyonel lige yükselince açılır</strong><p>Mahalle liglerinde özel gazete manşeti ve magazin akışı yok. Önce performansınla profesyonel sözleşmeyi kazan.<br>Şu anki gelişimin: Yetenek ${Math.round(state.stats.skill)} · Şöhret ${Math.round(state.stats.fame)}</p></div></section>`;
  const news = state.recentNews.length ? state.recentNews : [{ title: "Yeni yüz, yeni hikâye", text: `${state.player.name}, ${teamLabel(currentClub())} formasıyla dikkatleri üzerine çekiyor.` }];
  const comments = state.recentComments.length ? state.recentComments : ["Bu çocuğun ayağına top yakışıyor!", "Saha içindeki emeği görünüyor. Devam!"];
  return `<section class="page">${heading("media")}<div class="media-hero"><div><div class="media-handle">@tribun_sesi</div><p>Yerel sporun nabzı · ${escapeHtml(teamLabel(currentClub()))}</p></div><div class="media-stats"><div><strong>${state.mediaFollowers.toLocaleString("tr-TR")}</strong><small>TAKİPÇİ</small></div><div><strong>${Math.round(state.stats.fame)}</strong><small>ŞÖHRET</small></div><div><strong>${Math.round(state.fanLove)}%</strong><small>TARAFTAR SEVGİSİ</small></div></div></div>
    <div class="two-column" style="margin-top:13px"><div><div class="panel-heading"><h2>Gazete & magazin</h2><span>BU HAFTA</span></div><div class="news-list">${news.map(item => `<article class="news-card"><div class="news-source">@TRIBUN_SESI · HAFTA ${state.week}</div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.text)}</p></article>`).join("")}</div></div>
    <div><div class="panel-heading"><h2>Taraftar yorumları</h2><span>SOSYAL AKIŞ</span></div><div class="feed-list">${comments.map((comment, index) => `<div class="comment-card"><strong>${index % 2 ? "@sahadanbiri" : "@tribun_genci"}</strong><p>${escapeHtml(comment)}</p></div>`).join("")}
    <button class="button button-secondary" id="make-post" style="margin-top:12px">Paylaşım yap · ₺50</button></div></div></section>`;
}
function renderRetired() {
  const record = state.retirementReview || {};
  const role = state.retirementRole === "coach" ? "Teknik direktörlük" : "Futbol yorumculuğu";
  const coaching = state.retirementRole === "coach" && state.coachCareer ? `<div class="panel"><div class="panel-heading"><h2>Teknik direktörlük kariyeri</h2><span>${state.coachCareer.seasons} / 3 SEZON</span></div><p class="subtle">${escapeHtml(state.coachCareer.club)} · ${state.coachCareer.wins} toplam galibiyet · ${state.coachCareer.trophies} kupa. ${state.coachCareer.lastSeason ? `Son sezon: ${state.coachCareer.lastSeason.wins} galibiyet${state.coachCareer.lastSeason.champion ? " · ŞAMPİYON" : ""}.` : "İlk teknik direktörlük sezonun seni bekliyor."}</p>${state.coachCareer.seasons < 3 ? `<button class="button button-primary" id="coach-season">Teknik direktörlük sezonuna başla</button>` : `<span class="subtle">Üç sezonluk teknik direktörlük kariyerin tamamlandı.</span>`}</div>` : "";
  return `<section class="page">${heading("retired")}<div class="hero"><div class="hero-content"><div class="eyebrow">SAHADAN SONRA · ${escapeHtml(role.toLocaleUpperCase("tr"))}</div><h1>Bir dönemin <span>hikâyesi.</span></h1><p>${escapeHtml(state.player.name)}, ${record.age || state.player.age} yaşında futbolculuk kariyerini tamamladı. ${record.returnToRoots ? "Son durağında çocukluğunun mahalle kulübüne dönerek futbolu başladığın yerde noktaladın." : "Emeklilik kararından sonra kariyer özeti saklandı; sezonluk kaydın da korunuyor."}</p><div class="hero-bottom"><span class="hero-team">${escapeHtml(teamLabel(record.club || currentClub()))} · ${escapeHtml(record.league || currentLeague())}</span><button class="button button-secondary" id="save-game">Kariyer arşivini kaydet</button></div></div></div>
    <div class="career-row"><div class="career-chip"><small>Maç / gol / asist</small><strong>${record.matches || 0} maç · ${record.goals || 0} gol · ${record.assists || 0} asist</strong></div><div class="career-chip"><small>Ortalama reyting</small><strong>${Number(record.average || 0).toFixed(1)}</strong></div><div class="career-chip"><small>Milli maç / piyasa değeri</small><strong>${record.nationalCaps || 0} · ${moneyText(record.marketValue || 0)}</strong></div></div>
    <div class="panel"><div class="panel-heading"><h2>Futbol sonrası</h2><span>${escapeHtml(role.toLocaleUpperCase("tr"))}</span></div><p class="subtle">${state.retirementRole === "coach" ? "Teknik direktör olarak futbol bilgisini ve liderlik deneyimini yeni nesle aktarmayı seçtin." : "Futbol yorumcusu olarak sahadaki tecrübelerini taraftarlarla paylaşmayı seçtin."} Bu arşiv kariyer silinene kadar incelenebilir.</p></div>${coaching}</section>`;
}
function render() {
  updateHeader();
  updateActiveSlotLabel();
  if (!state.player) {
    document.getElementById("app").innerHTML = "";
    return;
  }
  if (state.careerRetired) state.page = "retired";
  const view = {
    dashboard: renderDashboard, week: renderWeek, match: renderMatch,
    league: renderLeague, shop: renderShop, wardrobe: renderWardrobe, life: renderLife, media: renderMedia, retired: renderRetired
  };
  document.getElementById("app").innerHTML = (view[state.page] || renderDashboard)();
  save();
}
function activatePage(page) {
  if (!PAGES[page]) return;
  if (state.careerRetired && page !== "retired") return;
  if (state.player && state.player.age >= 41 && ["week", "match"].includes(page)) {
    state.page = "dashboard";
    toast("Futbolculuk kariyerin sona erdi; emeklilik rolünü seç.");
    render();
    return;
  }
  state.page = page;
  render();
}
function initStartDialog() {
  const city = document.getElementById("city-select");
  const region = document.getElementById("region-select");
  const neighborhood = document.getElementById("neighborhood-select");
  const streetSurface = document.getElementById("street-surface-select");
  const streetSurfacePreview = document.getElementById("street-surface-preview");
  const country = document.querySelector('#start-form [name="country"]');
  const position = document.getElementById("position-select");
  const club = document.getElementById("club-select");
  const clubCountry = document.getElementById("club-country-select");
  const clubCountryField = document.getElementById("club-country-field");
  const clubField = document.getElementById("club-field");
  const divisionField = document.getElementById("division-field");
  const division = document.getElementById("division-select");
  const ageInput = document.querySelector('#start-form [name="age"]');
  position.innerHTML = POSITIONS.map(value => `<option>${value}</option>`).join("");
  const updateStreetSurfacePreview = () => {
    const surface = STREET_SURFACES[streetSurface.value];
    if (!surface) return;
    streetSurfacePreview.innerHTML = `<strong>${escapeHtml(city.value)} / ${escapeHtml(neighborhood.value)} · ${escapeHtml(surface.label)}</strong><span>${escapeHtml(surface.description)}</span><small>${escapeHtml(surface.effects)}</small>`;
  };
  const selectSuggestedSurface = () => {
    const location = (REGION_LOCATIONS[region.value] || REGION_LOCATIONS.turkey).find(item => item.city === city.value);
    streetSurface.value = location && STREET_SURFACES[location.surfaceType] ? location.surfaceType : "school";
    updateStreetSurfacePreview();
  };
  const updateNeighborhoods = () => {
    const location = (REGION_LOCATIONS[region.value] || REGION_LOCATIONS.turkey).find(item => item.city === city.value);
    if (!location) return;
    neighborhood.innerHTML = location.neighborhoods.map(value => `<option>${escapeHtml(value)}</option>`).join("");
    country.value = location.country;
    updateStreetSurfacePreview();
  };
  const updateClubs = () => {
    const start = document.querySelector('input[name="start"]:checked').value;
    if (start === "academy") {
      const academyDivision = Number(ageInput.value) >= 17 ? "U17" : "U16";
      const teams = academyTeamsForCountry(clubCountry.value, "regional", academyDivision);
      club.innerHTML = teams.map(team =>
        `<option value="${escapeHtml(team)}">${escapeHtml(teamLabel(team))} · ${escapeHtml(teamLocation(team).city)}</option>`
      ).join("");
      return;
    }
    if (start === "pro-academy") {
      const availableDivisions = academyDivisionsForCountry(clubCountry.value);
      const selectedDivision = division.value;
      division.innerHTML = availableDivisions.map(value => `<option>${escapeHtml(value)}</option>`).join("");
      if (availableDivisions.includes(selectedDivision)) division.value = selectedDivision;
      const teams = academyTeamsForCountry(clubCountry.value, "youth", division.value);
      club.innerHTML = teams.map(team =>
        `<option value="${escapeHtml(team)}">${escapeHtml(teamLabel(team))} · ${escapeHtml(teamLocation(team).city)}</option>`
      ).join("");
      return;
    }
    if (start !== "professional") {
      club.innerHTML = "";
      return;
    }
    const data = CLUB_LEAGUE_DATA[clubCountry.value];
    club.innerHTML = data ? data.divisions.map(division =>
      `<optgroup label="${escapeHtml(division.name)}">${clubsInDivision(division).map(item =>
        `<option value="${escapeHtml(item.name)}">${escapeHtml(teamLabel(item.name))} · ${escapeHtml(item.manager)}</option>`).join("")}</optgroup>`
    ).join("") : "";
  };
  const updateLocations = () => {
    const locations = REGION_LOCATIONS[region.value] || REGION_LOCATIONS.turkey;
    city.innerHTML = locations.map(location => `<option value="${escapeHtml(location.city)}">${escapeHtml(location.city)}</option>`).join("");
    updateNeighborhoods();
    selectSuggestedSurface();
    updateClubs();
  };
  const updateStartFields = () => {
    const start = document.querySelector('input[name="start"]:checked').value;
    clubField.hidden = !["academy", "pro-academy", "professional"].includes(start);
    clubCountryField.hidden = clubField.hidden;
    divisionField.hidden = start !== "pro-academy";
    updateClubs();
  };
  updateLocations();
  region.addEventListener("change", updateLocations);
  city.addEventListener("change", () => { updateNeighborhoods(); selectSuggestedSurface(); updateClubs(); });
  neighborhood.addEventListener("change", updateStreetSurfacePreview);
  streetSurface.addEventListener("change", updateStreetSurfacePreview);
  clubCountry.addEventListener("change", updateClubs);
  division.addEventListener("change", updateClubs);
  ageInput.addEventListener("input", updateClubs);
  document.querySelectorAll('input[name="start"]').forEach(input => input.addEventListener("change", updateStartFields));
  updateStartFields();
  const dialog = document.getElementById("start-dialog");
  if (!state.player && !dialog.open) dialog.showModal();
  document.getElementById("start-form").addEventListener("submit", event => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const age = Number(form.get("age"));
    const start = String(form.get("start"));
    const division = String(form.get("division") || "U19");
    const selectedClub = String(form.get("club") || "");
    const selectedClubCountry = String(form.get("clubCountry") || "Türkiye");
    const selectedRegion = String(form.get("region") || "turkey");
    const selectedCity = String(form.get("city") || "");
    const selectedNeighborhood = String(form.get("neighborhood") || "");
    const selectedStreetSurface = String(form.get("streetSurface") || "");
    const academyDivision = start === "academy" ? (age >= 17 ? "U17" : "U16") : division;
    const selectedClubDetails = start === "professional" ? CLUB_DETAILS_BY_NAME[selectedClub] :
      ACADEMY_TEAM_DETAILS_BY_NAME[academyTeamBaseName(selectedClub)];
    const clubBasedStart = ["academy", "pro-academy", "professional"].includes(start);
    const ageRange = start === "street" ? [15, 16] : start === "academy" ? [16, 17] :
      start === "professional" ? [18, 23] : division === "U21" ? [19, 21] : [17, 19];
    if (!name || !Number.isInteger(age) || age < ageRange[0] || age > ageRange[1]) {
      toast(`Seçtiğin başlangıç için yaş aralığı ${ageRange[0]}–${ageRange[1]} olmalı.`);
      return;
    }
    const selectedLocation = (REGION_LOCATIONS[selectedRegion] || []).find(location => location.city === selectedCity);
    if (!selectedLocation || !selectedLocation.neighborhoods.includes(selectedNeighborhood) ||
        !STREET_SURFACES[selectedStreetSurface]) {
      toast("Geçerli bir şehir, mahalle ve saha tipi seç.");
      return;
    }
    const selectedClubPool = start === "professional" ? clubsInCountry(selectedClubCountry).map(item => item.name) :
      academyTeamsForCountry(selectedClubCountry, start === "academy" ? "regional" : "youth", academyDivision);
    if (clubBasedStart && (!selectedClubDetails || selectedClubDetails.country !== selectedClubCountry ||
        !selectedClubPool.includes(selectedClub))) {
      toast("Seçtiğin ülkeden geçerli bir başlangıç kulübü seç.");
      return;
    }
    state.player = { name, age, country: String(form.get("country")).trim() || "Türkiye" };
    state.city = selectedCity;
    state.originRegion = selectedRegion;
    state.neighborhood = selectedNeighborhood;
    state.streetSurface = selectedStreetSurface;
    const originRules = getOriginProfile().rules;
    state.streetRule = originRules[randomInt(0, originRules.length - 1)];
    state.position = String(form.get("position"));
    state.start = start;
    state.careerStage = start === "street" ? "amateur" : start === "academy" ? "regional" : "u19";
    state.professionalAcademy = state.start === "pro-academy";
    state.academyDivision = academyDivision;
    state.pro = start === "professional";
    state.leagueCountry = clubBasedStart ? selectedClubCountry :
      CLUB_LEAGUE_DATA[state.player.country] ? state.player.country : null;
    state.proTier = state.pro ? selectedClubDetails.tier : 0;
    state.proMatches = 0;
    state.firstTeam = state.pro;
    state.coachTrust = state.professionalAcademy ? 48 : state.pro ? 65 : 48;
    state.fanLove = 50;
    state.presidentOpinion = 50;
    state.mentality = "balanced";
    state.unlockedPerks = [];
    state.activePerk = null;
    state.pendingPressConference = null;
    state.contract = { salary: state.professionalAcademy ? 300 : state.pro ? 1200 : 0, goalBonus: 0, releaseClause: 0, negotiations: 0, lastNegotiationWeek: 0, starterGuaranteed: false };
    const surfaceProfile = STREET_SURFACES[state.streetSurface];
    state.stats.skill = clamp((state.pro ? 66 : state.professionalAcademy ? 48 : state.start === "street" ? 35 : 42) + surfaceProfile.skill);
    state.stats.chem = state.start === "street" ? 50 : 58;
    state.stats.fame = state.pro ? 15 : 0;
    state.stats.mental = 70;
    state.stats.speed = clamp(50 + surfaceProfile.speed);
    state.stats.energy = clamp(88 + surfaceProfile.energy);
    state.stats.fatigue = clamp(12 + surfaceProfile.fatigue);
    state.stats.streetRating = state.start === "street" ? 20 : 15;
    state.marketValue = Math.round(100000 + state.stats.skill * 18000 + state.stats.fame * 14000);
    state.club = state.start === "street" ? `${state.city} Amatör Spor` :
      selectedClub;
    state.money = state.start === "street" ? 1200 : state.pro ? 2500 : 900;
    state.season = 1;
    state.transferOffer = null;
    const leagueKind = state.start === "street" ? "amateur" : state.start === "academy" ? "regional" :
      state.professionalAcademy ? "youth" : "professional";
    setupLeague(state.club, leagueKind, state.academyDivision);
      state.leagueKind = kind;
  state.leagueOffset = (state.matchPlayed ? state.week + 1 : state.week) - 1;
    const teams = getTeams().filter(team => team !== currentClub());
    state.rival = teams[0] || `${state.city} Gençlik`;
    prepareWeek();
    maybeAgentOffer();
    dialog.close();
    render();
    toast(`${teamLabel(state.club)} ile ${currentLeague()} kariyerin başladı!`);
  });
}
function queueEvent(type) {
  if (state.eventCooldown > 0) return;
  if (type === "work") {
    const first = randomInt(1, 3) === 1;
    const name = state.originRegion === "turkey" ? "mahalle esnafı" : state.originRegion === "asia" ? "saha sorumlusu" : "yerel kulüp gönüllüsü";
    state.pendingEvents.push({ type, title: first ? "Yeni bir tanışıklık" : "Mahalleden haber var", weeks: randomInt(2, 4), name: first ? "bölgedeki bir futbol gönüllüsü" : name, detail: first ? "kulüp yönetimine yakın biri" : "yerel takıma destek veren isimlerden biri" });
    state.eventCooldown = randomInt(3, 5);
  } else if (type === "cafe") {
    const title = state.originRegion === "europe" ? "Kafes sahası sohbeti" : state.originRegion === "asia" ? "Okul çıkışı saha sohbeti" : "Semt kahvesindeki sohbet";
    state.pendingEvents.push({ type, title, weeks: randomInt(2, 5), detail: randomInt(1, 2) === 1 ? "eski bir altyapı antrenörü seni izleyeceğini söyledi" : "mahalle turnuvası için yeni bir takım kuruldu" });
    state.eventCooldown = randomInt(3, 5);
  } else if (type === "night") {
    state.pendingEvents.push({ type, title: "Gece paylaşımı konuşuluyor", weeks: randomInt(1, 2), detail: "bir spor hesabı fotoğrafını fark etti" });
    state.eventCooldown = randomInt(3, 5);
  } else if (type === "street") {
    state.pendingEvents.push({ type, title: "Sokak maçında iyi oyun", weeks: randomInt(1, 3), detail: "mahalle turnuvasının düzenleyicisi seni takımına çağırdı" });
  }
}
function storyRequirementMet(requirement) {
  if (requirement === "pro") return state.pro || state.professionalAcademy;
  if (requirement === "academy") return ["regional", "u19", "international"].includes(state.careerStage);
  if (requirement === "captain") return state.captain;
  if (requirement === "young") return state.player.age <= 19;
  if (requirement === "senior") return state.player.age >= 38;
  if (requirement === "injury-history") return Boolean(state.chronicInjury || state.returnFear);
  return false;
}
function queueStoryEvent() {
  if (state.storyEvent || state.careerRetired || Math.random() >= 0.22) return;
  const eligible = STORY_EVENTS.filter(event =>
    !state.storyHistory.includes(event.id) &&
    (!event.requirements || event.requirements.every(storyRequirementMet))
  );
  if (eligible.length) state.storyEvent = eligible[randomInt(0, eligible.length - 1)];
}
function resolveStoryChoice(index) {
  if (!state.storyEvent) return;
  const event = STORY_EVENTS.find(item => item.id === state.storyEvent.id);
  const choice = event && event.choices[index];
  if (!event || !choice) return;
  const statKeys = ["skill", "fatigue", "morale", "stress", "fame", "family", "chem", "energy", "mental", "speed", "streetRating", "resilience", "form"];
  const careerKeys = ["coachTrust", "presidentOpinion", "fanLove", "mediaFollowers", "yellowCards"];
  Object.entries(choice.changes || {}).forEach(([key, amount]) => {
    if (statKeys.includes(key)) state.stats[key] = clamp(state.stats[key] + amount);
    else if (key === "money") state.money = Math.max(0, state.money + amount);
    else if (careerKeys.includes(key)) state[key] = key === "mediaFollowers" || key === "yellowCards"
      ? Math.max(0, state[key] + amount)
      : clamp(state[key] + amount);
  });
  const traitLimits = {
    weakFoot: [0, 5], refereeRespect: [-5, 5], divingSkill: [0, 5], tacticalFit: [-5, 5],
    setPieceSkill: [0, 5], facilityLevel: [1, 5], leadership: [0, 5], contractAwareness: [-3, 5],
    injuryConfidence: [-5, 5], nutrition: [-5, 5], financialLiteracy: [-5, 5], friendBond: [0, 100],
    styleFollowing: [0, 5], ownGoalRecovery: [-5, 5], communityTies: [0, 5], coldReadiness: [0, 5]
  };
  Object.entries(choice.traits || {}).forEach(([key, value]) => {
    if (typeof value === "number") {
      const bounds = traitLimits[key] || [0, 100];
      state.storyTraits[key] = clamp((Number(state.storyTraits[key]) || 0) + value, bounds[0], bounds[1]);
    } else state.storyTraits[key] = value;
  });
  if (choice.set) {
    if (POSITIONS.includes(choice.set.position)) state.position = choice.set.position;
    if (Number.isFinite(choice.set.releaseClause)) state.contract.releaseClause = Math.max(state.contract.releaseClause, choice.set.releaseClause);
    if (typeof choice.set.returnToRoots === "boolean") state.storyTraits.returnToRoots = choice.set.returnToRoots;
    if (typeof choice.set.injuryRisk === "boolean") state.storyTraits.injuryRisk = choice.set.injuryRisk;
  }
  const returnPage = ["dashboard", "week", "match"].includes(state.page) ? state.page : "week";
  state.storyHistory.push(event.id);
  state.storyEvent = null;
  state.page = returnPage;
  render();
  toast(`${event.title}: ${choice.title}`);
}
function applyPlan(id) {
  if (state.matchPlayed) { toast("Bu haftanın maçı tamamlandı; yeni haftaya geç."); return; }
  if (state.planSkipped) { toast("Bu hafta dinlenmeyi seçtin; yeni haftaya geçebilirsin."); return; }
  const plan = PLAN_LIBRARY.find(item => item.id === id);
  if (!plan) return;
  state.selectedPlan = id;
  const previousFatigue = state.stats.fatigue;
  state.trainingStreak = ["training", "skills"].includes(id) ? state.trainingStreak + 1 : 0;
  const socialFocus = ["social", "cafe", "friends"].includes(id);
  state.socialStreak = socialFocus ? state.socialStreak + 1 : 0;
  state.stats.skill = clamp(state.stats.skill + plan.skill + (["academy", "pro-academy"].includes(state.start) && id === "training" ? 1 : 0));
  state.stats.fatigue = clamp(state.stats.fatigue + plan.fatigue);
  state.stats.morale = clamp(state.stats.morale + plan.morale);
  state.stats.stress = clamp(state.stats.stress + plan.stress);
  state.stats.fame = clamp(state.stats.fame + (plan.fame || 0));
  state.stats.family = clamp(state.stats.family + (plan.family || 0));
  state.stats.chem = clamp(state.stats.chem + (plan.chem || 0));
  if (id === "training") {
    state.stats.energy = clamp(state.stats.energy - 10);
    state.stats.resilience = clamp(state.stats.resilience - 4);
    state.stats.form = clamp(state.stats.form + 1);
  } else if (id === "skills") {
    state.stats.energy = clamp(state.stats.energy - 5);
    state.stats.resilience = clamp(state.stats.resilience - 2);
    state.stats.form = clamp(state.stats.form + 1);
  } else if (id === "recovery" || id === "rest") {
    state.stats.energy = clamp(state.stats.energy + 12);
    state.stats.resilience = clamp(state.stats.resilience + 3);
    state.stats.form = clamp(state.stats.form + 2);
  } else if (id === "balanced") {
    state.stats.energy = clamp(state.stats.energy - 2);
    state.stats.resilience = clamp(state.stats.resilience + 1);
    state.stats.form = clamp(state.stats.form + 1);
  } else if (socialFocus) {
    if (id === "social") state.stats.energy = clamp(state.stats.energy - 3);
    state.stats.form = clamp(state.stats.form - Math.min(8, Math.max(0, state.socialStreak - 1) * 2));
  } else {
    state.stats.resilience = clamp(state.stats.resilience + 1);
  }
  if (state.professionalAcademy) {
    const trustChange = id === "training" ? 4 : id === "skills" ? 2 : id === "study" ? 2 :
      id === "social" ? -7 : id === "street" ? -3 : id === "balanced" ? 1 : id === "recovery" ? 1 : 0;
    state.coachTrust = clamp(state.coachTrust + trustChange);
  }
  state.money = Math.max(0, state.money + plan.money);
  if (id === "training" || id === "study") state.personality = "Disiplinli";
  if (id === "social") state.personality = "Kibirli";
  if (id === "street") state.personality = "Agresif";
  if (id === "cafe" || id === "friends") state.personality = "Mütevazı";
  if (id === "street") state.streetMatchRisk = true;
  if (id === "street") {
    const won = Math.random() < 0.5;
    state.stats.streetRating = clamp(state.stats.streetRating + (won ? 3 : -1));
    if (won) { const prize = randomInt(120, 420); state.money += prize; toast(`Sokak maçı kazandı! Kural: ${state.streetRule || getOriginProfile().rules[0]}. Harçlık: ${moneyText(prize)}.`); }
    else toast("Sokak maçı zorlu geçti. Bu kez ödül çıkmadı.");
  } else if (id === "social") {
    if (Math.random() < 0.08) { state.stats.stress = clamp(state.stats.stress + 5); state.stats.morale = clamp(state.stats.morale - 2); toast("Gece paylaşımın konuşuldu; hocanın gözüne takıldın."); }
  }
  if (plan.event) queueEvent(plan.event);
  else if (COOLDOWN_ACTIVITIES.has(id)) state.eventCooldown = randomInt(3, 5);
  const injuryChance = getTrainingInjuryChance(id, false);
  if (injuryChance && !state.injury && Math.random() < injuryChance) applyInjury();
  if (id === "balanced" && state.stats.fatigue > 70 && previousFatigue < 70) state.stats.fatigue = clamp(state.stats.fatigue + 3);
  state.lastPlan = id;
  state.selectedPlan = null;
  state.planHistory.unshift({ week: state.week, name: plan.name });
  state.planHistory = state.planHistory.slice(0, 6);
  state.matchPlayed = false;
  state.match = null;
  state.page = "match";
  render();
}
function skipPlan() {
  if (state.matchPlayed) { toast("Bu haftanın maçı tamamlandı; yeni haftaya geç."); return; }
  if (state.planSkipped) { state.page = "match"; render(); return; }
  state.selectedPlan = null;
  state.planSkipped = true;
  state.lastPlan = "rest";
  state.stats.fatigue = clamp(state.stats.fatigue - 8);
  state.stats.energy = clamp(state.stats.energy + 12);
  state.stats.resilience = clamp(state.stats.resilience + 3);
  state.stats.form = clamp(state.stats.form + 2);
  state.trainingStreak = 0;
  state.socialStreak = 0;
  state.page = "match";
  render();
  toast("Bu hafta aktivite yapmadan dinlendin; maç öncesi yorgunluğun azaldı.");
}
function applyInjury() {
  const draw = Math.random();
  if (draw < 0.55) state.injury = { name: "Adale zorlanması", weeks: 1, severity: "light", physioUsed: false };
  else if (draw < 0.88) state.injury = { name: "Ayak bileği burkulması", weeks: 2, severity: "moderate", physioUsed: false };
  else if (draw < 0.95) state.injury = { name: "Adale kopması", weeks: 3, severity: "moderate", physioUsed: false };
  else if (draw < 0.97) state.injury = { name: "Menisküs yırtığı", weeks: 4, severity: "serious", physioUsed: false };
  else if (draw < 0.985) state.injury = { name: "Çapraz bağ zorlanması", weeks: 6, severity: "serious", physioUsed: false };
  else state.injury = { name: "Ayak tarak kemiği kırığı", weeks: 5, severity: "serious", physioUsed: false };
  if (state.injury.severity === "serious") {
    state.stats.mental = clamp(state.stats.mental - 4);
    state.stats.stress = clamp(state.stats.stress + 4);
    state.returnFear = true;
  }
  toast(`Sakatlık: ${state.injury.name}. Kariyerin devam ediyor; iyileşme süreci başladı.`);
}
function treatInjury() {
  if (!state.injury || state.money < 600) { toast("Özel fizyoterapi için sakatlık ve en az ₺600 bakiye gerekir."); return; }
  state.money -= 600;
  state.injury.weeks = Math.floor(state.injury.weeks / 2);
  state.injury.physioUsed = true;
  if (state.injury.weeks <= 0) {
    const healed = state.injury.name;
    state.injury = null;
    toast(`${healed} özel fizyoterapiyle tamamen iyileşti.`);
  } else toast(`Fizyoterapi süreci hızlandırdı. ${state.injury.weeks} hafta dinlenme kaldı.`);
  render();
}
function earlyReturn() {
  if (!state.injury) return;
  const injury = state.injury;
  state.injury = null;
  state.stats.mental = clamp(state.stats.mental - 5);
  state.stats.fatigue = clamp(state.stats.fatigue + 8);
  const chronicChance = (injury.severity === "serious" ? 0.12 : 0.04) * Math.max(0.4, 1 - state.storyTraits.injuryConfidence * 0.1);
  if (Math.random() < chronicChance) {
    state.chronicInjury = { name: injury.name, speedPenalty: 5 };
    state.stats.speed = clamp(state.stats.speed - 5);
    state.returnFear = true;
    addNews("Sakatlık kronikleşti", `${injury.name} erken dönüş nedeniyle hızını kalıcı olarak etkiledi. Rehabilitasyon için psikolojik ve fiziksel destek al.`);
    toast("Erken dönüş sakatlığı kronikleştirdi. Hızın kalıcı olarak düştü.");
  } else toast("Sahaya erken döndün. Yorgunluğun ve mental yükün arttı.");
  render();
}
function maybePromote() {
  const average = state.stageRatingTotal / Math.max(1, state.stageMatches);
  if (state.careerStage === "amateur" && state.player.age >= 16 && state.stageMatches >= 6 &&
    (state.stats.skill >= 50 || state.stats.fame >= 25 || state.stats.streetRating >= 35)) {
    state.careerStage = "regional";
    state.academyDivision = state.player.age >= 17 ? "U17" : "U16";
    const regionalTeams = academyTeamsForCountry(state.leagueCountry, "regional", state.academyDivision);
    const localRegionalTeam = regionalTeams.find(team => teamLocation(team).city === state.city);
    state.club = localRegionalTeam || regionalTeams[0] ||
      `${REGIONAL_CLUB_BY_CITY[state.city] || `${state.city} Spor`} ${state.academyDivision}`;
    state.coachTrust = 55;
    state.stageMatches = 0;
    state.stageRatingTotal = 0;
    setupLeague(state.club, "regional", state.academyDivision);
    addNews("Bölgesel akademiden davet", `${state.player.name}, amatör ligdeki performansıyla ${teamLabel(state.club)} seçmelerine çağrıldı.`);
    toast(`${teamLabel(state.club)} seni seçmelere çağırdı!`);
    return true;
  }
  if (state.careerStage === "regional" && state.player.age >= 17 && state.stats.skill >= 52 &&
    state.stageMatches >= 12 && average >= 7.8 && state.coachTrust >= 80) {
    const division = state.player.age >= 19 && academyDivisionsForCountry(state.leagueCountry).includes("U21") ? "U21" : "U19";
    const regionalCity = teamLocation(state.club).city;
    const academyTeams = academyTeamsForCountry(state.leagueCountry, "youth", division);
    const localAcademyTeam = academyTeams.find(team => teamLocation(team).city === regionalCity);
    state.careerStage = "u19";
    state.professionalAcademy = true;
    state.academyDivision = division;
    state.club = localAcademyTeam || academyTeams[0] || `${(PROFESSIONAL_CLUBS[regionalCity] || [])[0] || `${regionalCity} Spor`} ${division}`;
    state.contract.salary = Math.max(state.contract.salary, 300);
    state.stageMatches = 0;
    state.stageRatingTotal = 0;
    setupLeague(state.club, "youth", state.academyDivision);
    addNews("Elit U19 akademisine yükseliş", `${state.player.name}, ${teamLabel(state.club)} gelişim kadrosuna seçildi.`);
    toast(`${teamLabel(state.club)} seni elit altyapı kadrosuna çağırdı!`);
    return true;
  }
  if (state.careerStage === "u19" && !state.firstTeam && state.player.age >= 18 &&
    state.coachTrust >= 90 && state.stats.skill >= 65 && state.stageMatches >= 10 && average >= 7.3) {
    state.firstTeam = true;
    state.pro = true;
    const academyCity = teamLocation(state.club).city;
    const seniorClub = CLUB_DETAILS_BY_NAME[teamBaseName(state.club)] ||
      clubsInCountry(state.leagueCountry).find(club => club.city === academyCity);
    state.proTier = seniorClub ? seniorClub.tier : 4;
    state.proMatches = 0;
    state.club = seniorClub ? seniorClub.name : state.club.replace(/\s+U(?:16|17|19|21)$/, "");
    state.contract.salary = Math.max(state.contract.salary, 900);
    state.stats.fame = clamp(state.stats.fame + 12);
    state.mediaFollowers = Math.max(state.mediaFollowers, 850 + Math.round(state.stats.fame * 38));
    setupLeague(state.club, "professional");
    addNews("A takım kapısı açıldı", `${state.player.name}, ${currentClub()} A takım kadrosuna yükseldi.`);
    toast("A takım çağrısı aldın! Profesyonel kariyerin başladı.");
    return true;
  }
  return false;
}
function beginMatch() {
  if (state.matchPlayed || state.injury) return;
  if (state.storyEvent) { toast("Maça çıkmadan önce bekleyen kariyer olayını yanıtla."); return; }
  if (state.player.age >= 41) { state.page = "dashboard"; render(); return; }
  if (!state.lastPlan) { toast("Önce haftalık planını seç."); state.page = "week"; render(); return; }
  const opponent = nextOpponent();
  if (state.suspensionMatches > 0) {
    state.suspensionMatches--;
    state.match = { phase: "final", opponent, scoreFor: randomInt(0, 2), scoreAgainst: randomInt(0, 2), minute: 90, goals: 0, assists: 0, rating: 0, outcome: "Disiplin cezası · tribünden izledin", log: [{ text: "Kırmızı kart cezan nedeniyle maçta forma giymedin.", value: "Takım sonucu" }] };
    recordLeagueRound(state.match);
    state.matchPlayed = true;
    render();
    return;
  }  if (state.leagueKind && state.fixtures.length && !fixtureForCurrentRound()) {
    state.match = { phase: "final", opponent, scoreFor: 0, scoreAgainst: 0, minute: 0, goals: 0, assists: 0, rating: 0,
      outcome: "Maçsız hafta", log: [{ text: "Bu hafta fikstürde maçın yok; dinlendin.", value: "Dinlenme" }] };
    recordLeagueRound(state.match);
    state.matchPlayed = true;
    render();
    return;
  }
  const derby = isDerby(opponent);
  const weatherRoll = Math.random();
  const snowChance = state.originRegion === "europe" ? 0.06 : state.originRegion === "asia" ? 0.015 : 0.025;
  const rainChance = state.originRegion === "europe" ? 0.14 : state.originRegion === "asia" ? 0.11 : 0.08;
  const weather = weatherRoll < snowChance ? "Kar ve buz" : weatherRoll < snowChance + rainChance ? "Yağmurlu ve çamurlu" : "Açık";
  state.stats.energy = clamp(state.stats.energy - 4);
  const commute = vehicleDetails(state.car);
  if (commute) {
    state.stats.energy = clamp(state.stats.energy - (commute.matchEnergyDrain || 0));
    state.stats.fatigue = clamp(state.stats.fatigue + (commute.matchFatigue || 0));
  }
  state.match = {
    phase: "live", opponent, scoreFor: 0, scoreAgainst: 0,
    minute: 1, goals: 0, assists: 0, log: [], highlight: null, derby, mentality: state.mentality, weather, surface: getOriginSurface(),
    moments: [], momentIndex: 0, lastEventMinute: 0, startingEnergy: state.stats.energy, usedHighlightIds: []
  };
  const expectedMoments = expectedCriticalMomentCount(state.mentality);
  const staminaAdjustment = state.stats.energy <= 40 ? 0.15 : state.stats.energy >= 75 ? 0.1 : 0;
  const count = Math.min(5, samplePoisson(expectedMoments + staminaAdjustment));
  state.match.moments = createCriticalMomentSchedule(count, state.match.startingEnergy, state.mentality);
  if (!state.match.moments.length) {
    state.match.minute = 90;
    state.match.log.push({ text: "Maç sakin geçti; kritik bir pozisyon yaşanmadı.", value: "Olağan maç akışı" });
    completeMatchTimeline();
    return;
  }
  showNextMatchMoment();
  render();
}
function updateMarketValue(match) {
  const ageFactor = state.player.age <= 21 ? 1 : Math.max(0.45, 1 - (state.player.age - 25) * 0.025);
  const formFactor = match.rating >= 8 ? 1.08 : match.rating < 6 ? 0.96 : 1;
  const base = 100000 + state.stats.skill * 18000 + state.stats.fame * 14000 + state.goals * 9000 + state.assists * 5000;
  state.marketValue = Math.round(Math.max(50000, base * ageFactor * formFactor));
}
function maybeNationalCallup() {
  if (state.nationalInvite || state.player.age < 16 || state.player.age > 19 ||
      !["regional", "u19"].includes(state.careerStage) || state.stageMatches < 6) return;
  const average = state.stageRatingTotal / state.stageMatches;
  if (average < 7.5 || Math.random() >= 0.06) return;
  const team = state.player.age <= 17 ? "U17 Milli Takımı" : "U19 Milli Takımı";
  state.nationalInvite = { team, country: state.storyTraits.nationalChoice === "Aile kökleri" ? "Aile köklerinin ülkesi" : state.player.country };
  addNews("Milli takım scoutları tribünde", `${state.player.name}, ${team} kadrosuna davet aldı.`);
}
function maybeCaptaincy() {
  if (state.captain || state.player.age < 18 || state.stageMatches < 18 || state.coachTrust < 82 || Math.random() >= 0.1) return;
  state.captain = true;
  addNews("Kaptanlık pazubandı", `${state.player.name}, soyunma odası liderliği ve hoca güveniyle takım kaptanı seçildi.`);
}
function maybeLoanOffer() {
  if (!state.pro || !state.firstTeam || state.loan || state.loanOffer || state.proMatches < 4 ||
      state.coachTrust >= 52 || state.lastRating === null || state.lastRating >= 6.2 || Math.random() >= 0.012) return;
  state.loanOffer = true;
  addNews("Kiralık gelişim teklifi", "Kulübün daha fazla süre bulman için seni bir alt lig takımına kiralık göndermeyi değerlendiriyor.");
}
function maybeAgentOffer() {
  if (!state.player || state.agent || state.agentDeclined || state.agentOffer || state.player.age < 17 ||
      !["regional", "u19", "international"].includes(state.careerStage)) return;
  state.agentOffer = true;
}
function maybeSponsorOffer() {
  if (!state.player || state.sponsorOffer || state.activeSponsor || state.week < state.sponsorCooldownUntil ||
      state.matches < 4 || state.player.age < 16) return;
  const eligible = SPONSOR_BRANDS.filter(offer =>
    state.stats.fame >= offer.minFame && state.matches >= offer.minMatches &&
    !state.inventory.includes(offer.productId)
  );
  if (!eligible.length || Math.random() >= (state.agent ? 0.08 : 0.045)) return;
  const offer = eligible[randomInt(0, eligible.length - 1)];
  state.sponsorOffer = { ...offer };
  addNews("Marka iş birliği teklifi", `${offer.brand}, ${state.player.name} için süreli bir oyun içi sponsorluk teklifi gönderdi.`);
  toast(`${offer.brand} sponsorluğu teklifi geldi. Kariyer özetinde inceleyebilirsin.`);
}
function answerSponsorOffer(accept) {
  const offer = state.sponsorOffer;
  if (!offer) return;
  state.sponsorOffer = null;
  if (!accept) {
    state.sponsorCooldownUntil = state.week + 8;
    toast(`${offer.brand} teklifini reddettin; yeni teklif için biraz zaman geçmesi gerekecek.`);
    render();
    return;
  }
  state.money += offer.upfront;
  state.inventory.push(offer.productId);
  state.activeSponsor = { brand: offer.brand, weeklyIncome: offer.weeklyIncome, weeksLeft: offer.weeks };
  state.sponsorCooldownUntil = state.week + offer.weeks;
  addNews("Sponsorluk anlaşması imzalandı", `${offer.brand} ürünü envanterine eklendi; anlaşma ${offer.weeks} hafta boyunca haftalık ${moneyText(offer.weeklyIncome)} kazandıracak.`);
  toast(`${offer.brand} anlaşması kabul edildi; ${moneyText(offer.upfront)} imza ödemesi aldın.`);
  render();
}
function answerAgentOffer(accept) {
  if (!state.agentOffer) return;
  state.agentOffer = false;
  if (!accept) {
    state.agentDeclined = true;
    toast("Menajerlik teklifini reddettin. Temsilcisiz devam ediyorsun.");
    render();
    return;
  }
  const names = ["Ece Yalçın", "Mert Aksoy", "Deniz Arslan", "Selin Demir"];
  const reputation = randomInt(45, 92);
  state.agent = { name: names[randomInt(0, names.length - 1)], reputation, ambition: randomInt(35, 90) };
  state.sponsorIncome = reputation >= 75 ? randomInt(100, 350) : 0;
  addNews("Kişisel menajerinle anlaştın", `${state.agent.name}, itibar ${reputation} ve hırs ${state.agent.ambition} ile sözleşme ve sponsor görüşmelerini üstlendi.`);
  toast(`${state.agent.name} artık menajerin. Sponsor ve sözleşme fırsatları açıldı.`);
  render();
}
function resolveNationalInvite(accept) {
  if (!state.nationalInvite) return;
  const invite = state.nationalInvite;
  state.nationalInvite = null;
  if (!accept) {
    toast(`${invite.team} davetini bu kez reddettin.`);
    render();
    return;
  }
  let wins = 0;
  for (let match = 0; match < 3; match++) {
    if (Math.random() < clamp(0.3 + state.stats.skill / 220 + state.stats.mental / 500, 0.2, 0.82)) wins++;
  }
  state.nationalCaps += 3;
  state.nationalTournaments++;
  state.stats.fame = clamp(state.stats.fame + (wins >= 2 ? 7 : 3));
  state.stats.skill = clamp(state.stats.skill + (wins >= 2 ? 2 : 1));
  state.stats.mental = clamp(state.stats.mental + 4);
  state.stats.morale = clamp(state.stats.morale + 5);
  addNews(wins >= 2 ? "Milli takımla kupa sevinci" : "Milli takımda değerli tecrübe", `${invite.team} formasıyla üç maçta ${wins} galibiyet aldın. Milli maç sayın ${state.nationalCaps} oldu.`);
  toast(`${invite.team} turnuvası tamamlandı: ${wins}/3 galibiyet.`);
  render();
}
function decideLoan(accept) {
  if (!state.loanOffer) return;
  state.loanOffer = false;
  if (!accept) {
    toast("Kiralık teklifini reddettin; mevcut kulübünde kalıyorsun.");
    render();
    return;
  }
  state.loan = { parentClub: currentClub(), parentTier: state.proTier, remainingWeeks: 12 };
  state.proTier = Math.max(1, state.proTier - 2);
  state.club = `${state.city} Anadolu FK`;
  setupLeague(state.club, "professional");
  addNews("Kiralık macera başladı", `${teamLabel(state.club)} formasıyla 12 haftalık gelişim dönemine çıktın.`);
  toast(`${teamLabel(state.club)} takımına 12 haftalığına kiralandın.`);
  render();
}
function captainTeamTalk() {
  if (!state.captain || state.captainTalkWeek === state.week || state.matchPlayed) return;
  state.captainTalkWeek = state.week;
  state.stats.morale = clamp(state.stats.morale + 5);
  state.stats.chem = clamp(state.stats.chem + 3);
  toast("Kaptan konuşması takıma moral ve uyum kazandırdı.");
  render();
}
function samplePoisson(lambda) {
  const threshold = Math.exp(-lambda);
  let product = 1;
  let count = 0;
  do {
    count++;
    product *= Math.random();
  } while (product > threshold);
  return count - 1;
}
function expectedCriticalMomentCount(mentality) {
  return mentality === "attack" ? 2.5 : mentality === "defend" ? 1.7 : mentality === "controlled" ? 1.9 : 2.1;
}
function criticalMinuteWeight(minute, startingEnergy, mentality) {
  let weight = minute <= 14 ? 0.38 :
    minute <= 34 ? 1.25 :
    minute <= 44 ? 1.55 :
    minute <= 54 ? 0.12 :
    minute <= 67 ? 1.65 :
    minute <= 80 ? 2 :
    minute <= 84 ? 1.65 :
    minute <= 90 ? 0.65 : 2.8;
  if (mentality === "attack") {
    if (minute >= 55 && minute <= 90) weight *= 1.12;
    else if (minute < 15) weight *= 0.9;
  } else if (mentality === "defend") {
    if (minute <= 44) weight *= 0.82;
    else if (minute >= 55) weight *= 1.08;
  }
  if (startingEnergy >= 75 && minute >= 55 && minute <= 84) weight *= 1.05;
  else if (startingEnergy <= 40) weight *= minute >= 55 ? 1.35 : 0.55;
  return weight;
}
function createCriticalMomentSchedule(count, startingEnergy, mentality, afterMinute = 0) {
  const occupied = new Set();
  const moments = [];
  for (let index = 0; index < count; index++) {
    let totalWeight = 0;
    const candidates = [];
    for (let minute = Math.max(1, Math.floor(afterMinute) + 1); minute <= 94; minute++) {
      if (occupied.has(minute)) continue;
      const weight = criticalMinuteWeight(minute, startingEnergy, mentality);
      candidates.push({ minute, weight });
      totalWeight += weight;
    }
    if (!candidates.length) break;
    let draw = Math.random() * totalWeight;
    let minute = candidates[candidates.length - 1].minute;
    for (const candidate of candidates) {
      draw -= candidate.weight;
      if (draw <= 0) {
        minute = candidate.minute;
        break;
      }
    }
    occupied.add(minute);
    moments.push(minute);
  }
  return moments.sort((a, b) => a - b);
}
function showNextMatchMoment() {
  const match = state.match;
  if (!match || match.phase !== "live") return;
  if (match.momentIndex >= match.moments.length) {
    completeMatchTimeline();
    return;
  }
  const minute = match.moments[match.momentIndex];
  const elapsedMinutes = Math.max(0, minute - match.lastEventMinute);
  const energyDrain = elapsedMinutes * (0.18 + state.stats.fatigue / 400 + (match.mentality === "attack" ? 0.1 : 0));
  state.stats.energy = clamp(state.stats.energy - energyDrain);
  state.stats.fatigue = clamp(state.stats.fatigue + elapsedMinutes * (match.mentality === "attack" ? 0.045 : 0.025));
  match.minute = minute;
  match.highlight = buildHighlight(minute, state.stats.energy, match.mentality);
}
function completeMatchTimeline() {
  const match = state.match;
  if (!match || match.phase !== "live") return;
  const elapsedMinutes = Math.max(0, 90 - match.lastEventMinute);
  state.stats.energy = clamp(state.stats.energy - elapsedMinutes *
    (0.18 + state.stats.fatigue / 400 + (match.mentality === "attack" ? 0.1 : 0)));
  state.stats.fatigue = clamp(state.stats.fatigue +
    elapsedMinutes * (match.mentality === "attack" ? 0.045 : 0.025));
  match.lastEventMinute = Math.max(match.lastEventMinute, 90);
  match.minute = Math.max(match.minute, 90);
  finishMatch();
}
function buildHighlight(minute, energy, mentality) {
  const role = mentality === "defend" ? "Defans" : state.position === "Kaleci" ? "Kaleci" : POSITION_ROLES[state.position];
  const roleScenarios = MATCH_SCENARIOS[role] || MATCH_SCENARIOS["Hücum"];
  const match = state.match;
  if (energy <= 40) {
    const scenario = drawMatchScenario(LOW_ENERGY_SCENARIOS, roleScenarios);
    return { ...scenario, minute, title: `Yorgunluk · ${scenario.title}`, description: formatMatchScenario(scenario, minute) };
  }
  const scenario = drawMatchScenario(roleScenarios);
  const title = energy >= 75 ? `Enerji yüksek · ${scenario.title}` : scenario.title;
  return { id: scenario.id, minute, title, description: formatMatchScenario(scenario, minute), choices: scenario.choices };
}
function formatMatchScenario(scenario, minute) {
  const match = state.match;
  const values = {
    minute,
    opponent: teamLabel(match.opponent),
    score: `${match.scoreFor}-${match.scoreAgainst}`,
    scoreFor: match.scoreFor,
    scoreAgainst: match.scoreAgainst
  };
  const templatePattern = /\{(minute|opponent|score|scoreFor|scoreAgainst)\}/g;
  const hasTemplate = templatePattern.test(scenario.description);
  templatePattern.lastIndex = 0;
  const description = scenario.description.replace(templatePattern, (_, key) => String(values[key]));
  return hasTemplate ? description : scenario.description;
}
function drawMatchScenario(scenarios, fallbackScenarios = []) {
  const recent = Array.isArray(state.recentHighlightIds) ? state.recentHighlightIds : [];
  const used = state.match && Array.isArray(state.match.usedHighlightIds) ? state.match.usedHighlightIds : [];
  const combined = [...scenarios, ...fallbackScenarios].filter((scenario, index, all) =>
    all.findIndex(candidate => candidate.id === scenario.id) === index);
  const eligible = combined.filter(scenario => !scenario.condition || scenario.condition(state.match));
  const candidates = eligible.length ? eligible : combined.filter(scenario => !scenario.condition);
  const unused = (candidates.length ? candidates : combined).filter(scenario => !used.includes(scenario.id));
  const available = unused.filter(scenario => !recent.includes(scenario.id));
  const pool = available.length ? available : unused.length ? unused : candidates.length ? candidates : combined;
  const scenario = pool[randomInt(0, pool.length - 1)];
  if (state.match) state.match.usedHighlightIds = [...used, scenario.id];
  state.recentHighlightIds = [...recent, scenario.id].slice(-MAX_RECENT_HIGHLIGHTS);
  return scenario;
}
function resolveHighlight(index) {
  const match = state.match;
  if (!match || !match.highlight) return;
  const choice = match.highlight.choices[index];
  if (!choice) return;
  const boot = state.equipped.boot ? getItem(state.equipped.boot) : null;
  const skillBonus = state.stats.skill / 100;
  let successChance = 0.48 + skillBonus * 0.28 + state.stats.morale / 550 - state.stats.fatigue / 300;
  if (["finish", "dribble"].includes(choice.effect)) successChance += (state.stats.speed - 50) / 1000;
  successChance += (state.stats.mental - 50) / 400;
  successChance += (state.stats.streetRating - 50) / 600;
  successChance += (state.stats.energy - 50) / 500;
  successChance += (state.stats.form - 72) / 300;
  successChance += (state.stats.resilience - 75) / 1200;
  if (choice.effect === "panenka" || choice.effect === "power") successChance -= 0.12;
  if (choice.effect === "tackle") successChance -= 0.11;
  if (choice.effect === "save" && state.position === "Kaleci") successChance += 0.15;
  if (["block", "save", "sweep", "tackle", "hold"].includes(choice.effect) && state.mentality === "defend") successChance += 0.1;
  if (["hold", "pass"].includes(choice.effect) && state.mentality === "controlled") successChance += 0.08;
  if (["finish", "power", "pass"].includes(choice.effect) && state.mentality === "attack") successChance += 0.08;
  if (state.mentality === "attack") successChance -= 0.06;
  if (match.derby && state.activePerk !== "pressure") successChance -= 0.08;
  if (state.activePerk === "free-kick" && ["power", "finish"].includes(choice.effect)) successChance += 0.2;
  if (state.activePerk === "speed" && choice.effect === "finish") successChance += 0.15;
  if (state.activePerk === "poacher" && ["finish", "power"].includes(choice.effect)) successChance += 0.12;
  if (state.activePerk === "street-magic" && choice.effect === "dribble") successChance += 0.18;
  if (choice.effect === "tackle" && state.returnFear) successChance -= 0.1;
  if (state.captain) successChance += 0.03;
  if (boot && choice.effect === "pass") successChance += boot.passBonus || 0;
  if (boot && ["dribble", "finish"].includes(choice.effect)) successChance += boot.speedBonus || 0;
  if (boot && match.highlight.id && match.highlight.id.includes("free-kick")) successChance += boot.setPieceBonus || 0;
  if (["finish", "dribble", "pass"].includes(choice.effect)) successChance += state.storyTraits.weakFoot * 0.012;
  if (match.highlight.id && match.highlight.id.includes("free-kick")) successChance += state.storyTraits.setPieceSkill * 0.018;
  if (match.highlight.id && match.highlight.id.includes("penalty")) successChance += state.storyTraits.divingSkill * 0.012;
  successChance += state.storyTraits.refereeRespect * 0.004;
  if (state.storyTraits.tacticalFit > 0) successChance += state.storyTraits.tacticalFit * 0.004;
  if (match.weather && match.weather !== "Açık") successChance -= match.weather === "Kar ve buz" ? 0.04 : 0.025;
  const success = Math.random() < clamp(successChance, 0.12, 0.88);
  const effect = choice.effect;
  if (success) {
    const shotEffect = ["power", "panenka", "finish"].includes(effect);
    const shotOutcome = shotEffect ? Math.random() : 1;
    if (shotOutcome < 0.1) {
      match.log.unshift({ text: `${match.highlight.minute}′ Direkten döndü`, value: "Gol çizgiyi geçmedi" });
    } else if (shotOutcome < 0.22) {
      match.log.unshift({ text: `${match.highlight.minute}′ Kaleci parmak ucuyla çıkardı`, value: "Korner" });
    } else if (["power", "panenka", "finish", "dribble"].includes(effect)) {
      match.scoreFor++;
      match.goals++;
      match.log.unshift({ text: `${match.highlight.minute}′ ${effect === "panenka" ? "Panenka!" : effect === "dribble" ? "Çalımla gol!" : "Gol!"}`, value: "+0,6 reyting" });
    } else if (effect === "pass") {
      match.assists++;
      match.goals++;
      match.scoreFor++;
      match.log.unshift({ text: `${match.highlight.minute}′ Asist ve gol`, value: "+0,3 asist" });
    } else if (effect === "hold") {
      match.log.unshift({ text: `${match.highlight.minute}′ Oyun soğutuldu`, value: "Topa sahip olma" });
    } else {
      match.log.unshift({ text: `${match.highlight.minute}′ Savunma başarılı`, value: "Şut engellendi" });
    }
    state.stats.morale = clamp(state.stats.morale + 2);
  } else {
    if (["power", "panenka", "finish"].includes(effect)) {
      const missOutcomes = ["Şut üstten auta gitti", "Stoper son anda araya girdi", "Kaleci topu kontrol etti", "Top direğin yanından çıktı"];
      match.log.unshift({ text: `${match.highlight.minute}′ ${missOutcomes[randomInt(0, missOutcomes.length - 1)]}`, value: "Bir sonraki pozisyon" });
    }
    else if (effect === "pass") match.log.unshift({ text: `${match.highlight.minute}′ Pas araya girdi`, value: "Hücum sona erdi" });
    else if (effect === "hold") match.log.unshift({ text: `${match.highlight.minute}′ Top kaybı`, value: "Rakip baskısı" });
    else { match.scoreAgainst++; match.log.unshift({ text: `${match.highlight.minute}′ Rakip golü buldu`, value: "Savunma baskısı" }); }
    state.stats.stress = clamp(state.stats.stress + 3);
  }
  if (state.returnFear) state.stats.mental = clamp(state.stats.mental + 1);
  const resolvedMinute = match.highlight.minute;
  match.highlight = null;
  match.lastEventMinute = resolvedMinute;
  match.momentIndex++;
  match.log = match.log.slice(0, 5);
  if (match.momentIndex < match.moments.length) {
    showNextMatchMoment();
    render();
    return;
  }
  completeMatchTimeline();
}
function finishMatch() {
  const match = state.match;
  if (!match) return;
  match.minute = Math.max(match.minute, 90);
  const positionModifier = POSITION_ROLES[state.position] === "Hücum" ? match.goals * 0.06 :
    POSITION_ROLES[state.position] === "Defans" ? (match.scoreAgainst === 0 ? 0.12 : 0) :
    state.position === "Kaleci" ? (match.scoreAgainst === 0 ? 0.2 : 0) : 0;
  const fatigueModifier = Math.min(0.9, state.stats.fatigue / 130);
  const resultModifier = match.scoreFor > match.scoreAgainst ? 0.3 : match.scoreFor === match.scoreAgainst ? 0.12 : -0.2;
  const formModifier = (state.stats.form - 72) / 50;
  const equippedBoot = state.equipped.boot ? getItem(state.equipped.boot) : null;
  const equipmentBonus = equippedBoot ? equippedBoot.bonus * 0.012 : 0;
  const mentalityRating = (match.mentality === "attack" ? 0.08 : match.mentality === "defend" ? 0.04 : match.mentality === "controlled" ? 0.03 : 0) +
    (match.derby && state.activePerk === "pressure" ? 0.15 : 0);
  match.rating = Math.max(4.5, Math.min(10, 6.2 + positionModifier + resultModifier - fatigueModifier + formModifier + equipmentBonus + mentalityRating + Math.random() * 0.55 + match.goals * 0.6 + match.assists * 0.3));
  match.rating = Number(match.rating.toFixed(1));
  match.phase = "final";
  match.highlight = null;
  state.matches++;
  state.stageMatches++;
  if (state.pro) state.proMatches++;
  state.goals += match.goals;
  state.assists += match.assists;
  state.ratingTotal += match.rating;
  state.stageRatingTotal += match.rating;
  state.lastRating = match.rating;
  state.matchPlayed = true;
  const won = match.scoreFor > match.scoreAgainst;
  state.lastResult = `${match.scoreFor}–${match.scoreAgainst} · ${won ? "Galibiyet" : match.scoreFor === match.scoreAgainst ? "Beraberlik" : "Mağlubiyet"}`;
  match.outcome = state.lastResult;
  const derbyBonus = match.derby ? 9 : 0;
  const fatigueGain = match.derby ? randomInt(12, 18) : randomInt(7, 12);
  const tacticalFatigue = match.mentality === "attack" ? 12 : match.mentality === "defend" ? -3 : match.mentality === "controlled" ? -1 : 0;
  state.stats.fatigue = clamp(state.stats.fatigue + fatigueGain + tacticalFatigue + (equippedBoot ? equippedBoot.matchFatigue || 0 : 0));
  state.stats.energy = clamp(state.stats.energy - (match.derby ? 18 : 13));
  state.stats.morale = clamp(state.stats.morale + (won ? 7 : match.scoreFor === match.scoreAgainst ? 2 : -5) + derbyBonus);
  state.stats.stress = clamp(state.stats.stress + (won ? -3 : 4));
  state.stats.skill = clamp(state.stats.skill + (match.rating >= 7.5 ? 1 : 0) + (won ? 0.5 : 0));
  state.stats.mental = clamp(state.stats.mental + (match.rating >= 7.5 ? 1 : match.rating < 5.5 ? -1 : 0));
  state.stats.form = clamp(state.stats.form + (match.rating >= 8 ? 2 : match.rating >= 7 ? 1 : match.rating < 5.5 ? -2 : 0));
  if (state.returnFear) state.returnFear = false;
  state.fanLove = clamp(state.fanLove + (match.rating >= 8 ? 4 : match.rating < 6 ? -5 : 1));
  state.presidentOpinion = clamp(state.presidentOpinion + (match.rating >= 8 ? 3 : match.rating < 6 ? -3 : won ? 1 : 0));
  if (["regional", "u19", "international"].includes(state.careerStage)) {
    const trustChange = (match.rating >= 8 ? 7 : match.rating >= 7 ? 4 : match.rating < 6 ? -6 : -2) + (won ? 2 : match.scoreFor === match.scoreAgainst ? 1 : -2);
    state.coachTrust = clamp(state.coachTrust + trustChange);
  }
  state.money += won ? 160 : match.scoreFor === match.scoreAgainst ? 80 : 30;
  state.money += match.goals * state.contract.goalBonus;
  const stageInjuryRisk = state.careerStage === "regional" ? 0.001 : state.careerStage === "international" ? 0.0008 : 0;
  const regionRisk = state.originRegion === "asia" ? 1.08 : state.originRegion === "europe" ? 1.12 : 1;
  const streetSurfaceRisk = (STREET_SURFACES[state.streetSurface] || STREET_SURFACES.school).injuryMultiplier;
  const bootInjuryModifier = equippedBoot && equippedBoot.injuryReduction ? 1 - equippedBoot.injuryReduction : equippedBoot && match.surface && match.surface.includes("çamur") && equippedBoot.mudSlipRisk ? equippedBoot.mudSlipRisk : 1;
  const resilienceRisk = 1 + Math.max(0, 70 - state.stats.resilience) / 100;
  const injuryChance = Math.min(0.95, ((state.streetMatchRisk ? 0.01 : 0.001) + stageInjuryRisk + Math.max(0, state.stats.fatigue - 70) * 0.0006) * (match.weather && match.weather !== "Açık" ? 2 : 1) * regionRisk * streetSurfaceRisk * bootInjuryModifier * overtrainingMultiplier() * resilienceRisk * (state.storyTraits.injuryRisk ? 1.5 : 1));
  state.streetMatchRisk = false;
  state.storyTraits.injuryRisk = false;
  if (Math.random() < injuryChance && !state.injury) applyInjury();
  const cardChance = Math.max(0.003, 0.018 - state.storyTraits.refereeRespect * 0.002);
  if (Math.random() < cardChance) {
    state.yellowCards++;
    match.log.unshift({ text: `${match.minute}′ Sarı kart`, value: "Disiplin uyarısı" });
  }
  if (Math.random() < 0.0015) {
    state.suspensionMatches = 1;
    state.coachTrust = clamp(state.coachTrust - 4);
    match.log.unshift({ text: `${match.minute}′ Kırmızı kart`, value: "Bir maç ceza" });
    addNews("Disiplin cezası", `${state.player.name} bir sonraki maçta cezası nedeniyle forma giyemeyecek.`);
  }
  updateMarketValue(match);
  maybeNationalCallup();
  maybeCaptaincy();
  maybeLoanOffer();
  if (state.agent && state.agent.ambition >= 80 && Math.random() < 0.006) {
    addNews("Menajerinden transfer hamlesi", `${state.agent.name}, ${state.player.name} için kulüplerle gizli bir nabız yokladı. Yönetim sözleşme görüşmesi bekliyor.`);
    state.presidentOpinion = clamp(state.presidentOpinion - 2);
  }
  if (["amateur", "regional"].includes(state.careerStage)) {
    state.stats.streetRating = clamp(state.stats.streetRating + (match.rating >= 7.5 ? 2 : match.rating >= 6.5 ? 1 : -1) + (won ? 1 : 0));
    state.stats.fame = clamp(state.stats.fame + (won ? 2 : 0.5) + match.goals + match.assists);
  }
  if (state.professionalAcademy) {
    state.stats.fame = clamp(state.stats.fame + (won ? 2 : 0.5) + match.goals + match.assists);
    state.mediaFollowers += randomInt(8, 35) + (match.goals + match.assists) * 25;
  }
  if (state.pro || state.professionalAcademy) {
    state.stats.fame = clamp(state.stats.fame + (won ? 2 : 0.5) + match.goals + match.assists);
    state.mediaFollowers += randomInt(20, 85) + (match.goals + match.assists) * 55;
    generateNews(match, won);
  }
  if ((match.derby || state.leagueKind === "europe") && Math.random() < 0.012) {
    state.pendingPressConference = {
      prompt: "Tartışmalı bir VAR kararı maçın önüne geçti. Muhabirler hakem kararını soruyor:",
      choices: [
        { id: "referee", title: "Hakem emeğimizi çaldı", description: "Taraftar desteği artabilir; yönetim ve hoca eleştirebilir.", fans: 4, coach: -3, president: -4 },
        { id: "opponent", title: "Hakem de insan, hata yapabilir", description: "Diplomatik açıklama · yönetim ve hoca takdiri.", fans: -1, coach: 3, president: 3 }
      ]
    };
  } else if (match.derby || state.leagueKind === "europe") {
    state.pendingPressConference = {
      prompt: `${match.derby ? "Derbi" : "Avrupa maçı"} sonrası muhabirler soruyor: ${match.rating >= 7 ? "Bu performansı nasıl değerlendiriyorsun?" : "Sonuç ve oyun hakkında ne söylemek istersin?"}`,
      choices: [
        { id: "referee", title: "Hakem hatalıydı", description: "Taraftar desteği artabilir; yönetim ve hoca eleştirebilir.", fans: 5, coach: -6, president: -7 },
        { id: "opponent", title: "Rakip bizden iyiydi", description: "Sportmen açıklama · hoca ve başkanın takdirini kazan.", fans: 2, coach: 5, president: 5 },
        { id: "title", title: "Şampiyonluk bizim olacak", description: "İddialı çıkış · taraftarın heyecanı ve beklenti yükselir.", fans: 7, coach: 1, president: 2 }
      ]
    };
  }
  recordLeagueRound(match);
  updatePerkUnlocks();
  addNewsIfPromoted();
  if (state.professionalAcademy || state.pro) checkScoutOffer();
  maybePromoteTier();


  render();
}
function addNews(title, text) {
  state.recentNews.unshift({ title, text });
  state.recentNews = state.recentNews.slice(0, 4);
}
function generateNews(match, won) {
  const titles = won ? ["Mahalle yıldızı göz kamaştırdı", "Tribünler genç yeteneği konuşuyor", "Kritik maçta sahne onun"] : ["Genç yıldızdan ders çıkarılacak maç", "Tribünlerden destek mesajları", "Gözler gelecek haftaya çevrildi"];
  addNews(titles[randomInt(0, titles.length - 1)], `${state.player.name}, ${teamLabel(match.opponent)} karşısındaki ${match.rating.toFixed(1)} reytingli performansıyla gündemde. ${match.goals ? `${match.goals} gol` : "Takım oyunu"} ${match.assists ? `ve ${match.assists} asist` : ""}.`);
  const comments = match.rating >= 8.5 ? ["GÜNDEMDE: Bu performans unutulmaz!", "Avrupa scoutları tribünde, yıldızımızı izliyor!"] :
    match.rating < 6 ? ["Bugün sahada etkisiz kaldı, daha fazlasını bekliyoruz.", "Bu formayla böyle oynanmaz; toparlanmalı."] :
    match.rating > 7 ? ["Büyük maç oyuncusu olacak gibi!", "Genç yaşına rağmen çok soğukkanlı."] :
    ["Bir sonraki maçta daha iyisi gelir.", "Takımın arkasındayız, çalışmaya devam!"];
  state.recentComments = comments.sort(() => Math.random() - 0.5).slice(0, 2);
  if (match.rating >= 8.5) addNews("Trend topic: tribünlerin yeni yıldızı", `${state.player.name}, ${match.rating.toFixed(1)} reytingiyle taraftarların gündemine oturdu.`);
  else if (match.rating < 6) addNews("Taraftarlar daha fazlasını bekliyor", `Sosyal medyada ${state.player.name} için eleştiriler yükseliyor; sonraki maçta yanıt verme fırsatı var.`);
  if (state.stats.fame > 55 && Math.random() < 0.03) {
    state.recentNews.unshift({ title: "Transfer dedikodusu", text: `Sosyal medyada ${state.player.name} için doğrulanmamış transfer iddiaları dolaşıyor. Kulüpten henüz açıklama yok.` });
  }
}
function resolvePressConference(index) {
  const conference = state.pendingPressConference;
  const choice = conference && conference.choices[index];
  if (!choice) return;
  state.fanLove = clamp(state.fanLove + choice.fans);
  state.presidentOpinion = clamp(state.presidentOpinion + choice.president);
  if (["regional", "u19", "international"].includes(state.careerStage)) state.coachTrust = clamp(state.coachTrust + choice.coach);
  state.pendingPressConference = null;
  state.recentComments.unshift(`Basın toplantısındaki açıklama: “${choice.title}.”`);
  state.recentComments = state.recentComments.slice(0, 4);
  addNews("Maç sonu açıklaması gündemde", `${state.player.name}: “${choice.title}.” Taraftar sevgisi, hoca güveni ve başkanın bakışı değişti.`);
  toast("Açıklaman taraftarları, hocayı ve kulüp başkanını etkiledi.");
  maybePromote();
  render();
}
function updatePerkUnlocks() {
  if (!state.professionalAcademy && !state.pro) return;
  const unlocked = PLAYER_PERKS.filter(perk => state.matches >= perk.unlockAt && !state.unlockedPerks.includes(perk.id));
  if (!unlocked.length) return;
  state.unlockedPerks.push(...unlocked.map(perk => perk.id));
  addNews("Yeni oyuncu uzmanlığı açıldı", `${unlocked.map(perk => perk.name).join(", ")} yeteneği artık Lig & Scout ekranından seçilebilir.`);
  toast(`${unlocked.map(perk => perk.name).join(", ")} yeteneğin açıldı!`);
}
function choosePerk(id) {
  if (!state.unlockedPerks.includes(id)) { toast("Bu uzmanlık henüz açılmadı."); return; }
  state.activePerk = id;
  toast(`${PLAYER_PERKS.find(perk => perk.id === id).name} aktif edildi.`);
  render();
}
function makeContractDemand(type) {
  const contract = state.contract;
  if ((!state.professionalAcademy && !state.pro) || state.matches < 5 || state.week - contract.lastNegotiationWeek < 5) {
    toast("Başkanla görüşmek için en az 5 maç ve görüşmeler arasında 5 hafta gerekir.");
    return;
  }
  const average = state.ratingTotal / Math.max(1, state.matches);
  const agentEdge = state.agent ? Math.floor(state.agent.reputation / 12) : 0;
  const accepted = type === "salary" ? average >= 7 && state.presidentOpinion + agentEdge >= 40 :
    type === "bonus" ? average >= 6.7 && state.presidentOpinion + agentEdge >= 35 :
    type === "clause" ? average >= 7 && state.presidentOpinion + agentEdge >= 45 :
    type === "starter" && average >= 7.4 && state.coachTrust >= 80;
  contract.lastNegotiationWeek = state.week;
  contract.negotiations++;
  if (!accepted) {
    state.presidentOpinion = clamp(state.presidentOpinion - 7);
    toast("Başkan talebini reddetti. Formunu yükseltip tekrar görüşebilirsin.");
  } else if (type === "salary") {
    contract.salary += 250;
    state.presidentOpinion = clamp(state.presidentOpinion - 4);
    toast(`Maaş zammı kabul edildi. Yeni haftalık maaşın ${moneyText(contract.salary)}.`);
  } else if (type === "bonus") {
    contract.goalBonus += 75;
    state.presidentOpinion = clamp(state.presidentOpinion - 3);
    toast(`Gol başına ${moneyText(contract.goalBonus)} prim kazandın.`);
  } else if (type === "clause") {
    contract.releaseClause = Math.max(contract.releaseClause, 12000000);
    state.presidentOpinion = clamp(state.presidentOpinion - 2);
    toast("₺12.000.000 serbest kalma maddesi sözleşmene eklendi.");
  } else {
    contract.starterGuaranteed = true;
    state.presidentOpinion = clamp(state.presidentOpinion - 4);
    toast("İlk 11 garantisi sözleşmene eklendi.");
  }
  render();
}
function addNewsIfPromoted() { maybePromote(); }
function maybePromoteTier() {
  if (!state.pro || state.leagueKind || state.proTier >= 4 || state.proMatches < 8) return;
  const average = state.ratingTotal / Math.max(1, state.matches);
  if (average < 6.8) return;
  state.proTier++;
  state.proMatches = 0;
  state.club = `${state.city} ${["Bölgesel", "3. Lig", "2. Lig", "1. Lig", "Süper Lig"][state.proTier]} FK`;
  state.rival = getTeams()[0];
  state.stats.fame = clamp(state.stats.fame + 8);
  addNews("Bir üst ligde yeni sayfa", `${state.player.name}, performansıyla ${currentLeague()} seviyesine yükseldi. Yeni tesisler ve ürünler açıldı.`);
  toast(`Tebrikler! ${currentLeague()} seviyesine yükseldin.`);
}
function checkScoutOffer() {
  if (state.careerStage !== "u19" || state.transferOffer || (!state.professionalAcademy && !state.pro) || state.player.age < 19 || state.stageMatches < 6) return;
  const average = state.stageRatingTotal / state.stageMatches;
  const keyWeek = currentRound();
  const seasonShowcase = keyWeek === Math.ceil(totalLeagueRounds() / 2) || keyWeek === totalLeagueRounds();
  if (state.stats.fame < 22 || average < 7 || (!seasonShowcase && (state.stats.fame < 45 || average < 7.8))) return;
  const index = Math.min(EUROPEAN_CLUBS.length - 1, Math.floor(state.stats.fame / 30));
  const club = EUROPEAN_CLUBS[index];
  const teams = ["Ajax U21", "Sporting CP U21", "Sevilla Atlético", "Atalanta U23"];
  state.transferOffer = {
    club, team: teams[index],
    note: `${club} scout ekibi ${state.player.name} için olumlu rapor verdi. Teklifi kabul edersen Avrupa U21 Ligi'nde yeni bir kariyere başlayacaksın.`
  };
  addNews("Avrupa scoutları tribünde", `${club} gözlemcileri ${state.player.name} için resmi bir gelişim kadrosu daveti gönderdi.`);
  toast(`${club} scoutlarından teklif geldi! Lig & Scout ekranını kontrol et.`);
}
function decideTransfer(accept) {
  if (!state.transferOffer) return;
  if (!accept) {
    const club = state.transferOffer.club;
    state.transferOffer = null;
    toast(`${club} teklifi reddedildi. Mevcut kulübünde devam ediyorsun.`);
    render();
    return;
  }
  const offer = state.transferOffer;
  state.transferOffer = null;
  state.careerStage = "international";
  state.club = offer.team;
  state.academyDivision = "U21";
  state.professionalAcademy = true;
  state.firstTeam = false;
  state.pro = true;
  state.proTier = 4;
  state.contract.salary = Math.max(state.contract.salary, 1500);
  state.coachTrust = 55;
  state.contract.lastNegotiationWeek = 0;
  state.season++;
  state.week = 1;
  state.matchPlayed = false;
  state.matches = 0;
  state.proMatches = 0;
  state.ratingTotal = 0;
  state.stageMatches = 0;
  state.stageRatingTotal = 0;
  setupLeague(state.club, "europe", "U21");
  state.match = null;
  state.matchPlayed = false;
  state.pendingPressConference = null;
  state.selectedPlan = null;
  state.page = "league";
  prepareWeek();
  addNews("Yeni ülke, yeni hedef", `${state.player.name}, ${offer.club} altyapısına transfer oldu.`);
  toast(`${offer.club} teklifini kabul ettin. Avrupa kariyerin başladı!`);
  render();
}
function setMentality(mentality) {
  if (!["attack", "balanced", "controlled", "defend"].includes(mentality)) return;
  state.mentality = mentality;
  if (state.match && state.match.phase === "live") {
    const match = state.match;
    match.mentality = mentality;
    if (Array.isArray(match.moments) && match.highlight) {
      const currentIndex = match.momentIndex;
      const slotsLeft = Math.max(0, 5 - currentIndex - 1);
      const minutesLeft = Math.max(0, 90 - match.minute);
      const expectedRemaining = expectedCriticalMomentCount(mentality) * minutesLeft / 90;
      const futureCount = Math.min(slotsLeft, samplePoisson(expectedRemaining));
      match.moments = [
        ...match.moments.slice(0, currentIndex + 1),
        ...createCriticalMomentSchedule(futureCount, state.stats.energy, mentality, match.minute)
      ];
    }
  }
  render();
}
function advanceWeek() {
  if (state.careerRetired) return;
  if (!state.matchPlayed) { toast("Önce haftanın maçını tamamla."); return; }
  const activeSponsorPay = state.activeSponsor ? state.activeSponsor.weeklyIncome : 0;
  state.money += state.contract.salary + state.sponsorIncome + activeSponsorPay;
  if (state.activeSponsor) {
    state.activeSponsor.weeksLeft--;
    if (state.activeSponsor.weeksLeft <= 0) {
      addNews("Sponsorluk dönemi tamamlandı", `${state.activeSponsor.brand} iş birliğinin süresi sona erdi.`);
      state.activeSponsor = null;
    }
  }
const seasonEnded = state.week - (state.leagueOffset || 0) >= totalLeagueRounds();
  if (seasonEnded) {
    state.season++;
    state.player.age++;
  }
  state.week++;
  state.matchPlayed = false;
  if (seasonEnded) {
    const promoted = maybePromote();
    if (!promoted && state.leagueKind) setupLeague(currentClub(), state.leagueKind, state.academyDivision);
    if (!promoted) addNews("Yeni sezon başladı", `${state.season}. sezonda ${teamLabel(currentClub())} ile şampiyonluk yarışı yeniden başlıyor.`);
  }
  if (state.eventCooldown > 0) state.eventCooldown--;
  state.pendingEvents.forEach(event => { event.weeks--; });
  const readyEvents = state.pendingEvents.filter(event => event.weeks <= 0);
  for (const event of readyEvents) {
    if (event.type === "work") {
      state.stats.fame = clamp(state.stats.fame + 4);
      state.stats.chem = clamp(state.stats.chem + 3);
      state.money += 250;
      if (state.pro) addNews("Beklenmedik destek", `${event.name} çevresinden gelen destekle antrenman ekipmanı için ₺250 kazandın.`);
    } else if (event.type === "cafe") {
      state.stats.morale = clamp(state.stats.morale + 3);
      if (Math.random() < 0.45) state.stats.skill = clamp(state.stats.skill + 1);
    } else if (event.type === "night") {
      state.stats.fame = clamp(state.stats.fame + 3);
      if (state.pro) addNews("Sosyal medyada gündem", `${state.player.name} hakkında gece paylaşımı sonrası çeşitli yorumlar yapıldı.`);
    } else if (event.type === "debt") {
      state.stats.stress = clamp(state.stats.stress + 8);
      if (state.money > 0) state.money = Math.max(0, state.money - 100);
    } else if (event.type === "street") state.stats.chem = clamp(state.stats.chem + 2);
  }
  state.pendingEvents = state.pendingEvents.filter(event => event.weeks > 0);
  if (state.injury) {
    state.injury.weeks--;
    state.stats.fatigue = clamp(state.stats.fatigue - 9 - Math.max(0, state.storyTraits.facilityLevel - 1));
    state.stats.energy = clamp(state.stats.energy + 7);
    if (state.injury.weeks <= 0) {
      const healed = state.injury.name;
      const chronicChance = state.injury.physioUsed ? 0 : state.injury.severity === "serious" ? 0.06 : 0.025;
      if (Math.random() < chronicChance) {
        state.chronicInjury = { name: healed, speedPenalty: 5 };
        state.stats.speed = clamp(state.stats.speed - 5);
        addNews("Sakatlık kronikleşme riski", `${healed} beklenen sürede iyileşmedi ve hızını etkiledi.`);
        toast(`${healed} kronikleşti. Hızın kalıcı olarak düştü.`);
      } else toast(`${healed} tamamen iyileşti. Antrenmana dönebilirsin.`);
      state.injury = null;
    }
  } else {
    state.stats.fatigue = clamp(state.stats.fatigue - randomInt(3, 7) - Math.max(0, state.storyTraits.facilityLevel - 1));
    state.stats.energy = clamp(state.stats.energy + randomInt(7, 12));
    state.stats.mental = clamp(state.stats.mental + 1);
  }
  if (state.familyVisitCooldown > 0) state.familyVisitCooldown--;
  if (state.loan) {
    state.loan.remainingWeeks--;
    if (state.loan.remainingWeeks <= 0) {
      const returnedClub = state.loan.parentClub;
      state.proTier = state.loan.parentTier;
      state.loan = null;
      state.club = returnedClub;
      setupLeague(state.club, "professional");
      addNews("Kiralık dönem tamamlandı", `${state.player.name}, ${teamLabel(state.club)} kadrosuna geri döndü.`);
      toast("Kiralık süren bitti; ana kulübüne döndün.");
    }
  }
  const home = HOME_ASSETS.find(asset => asset.id === state.home);
  const vehicle = vehicleDetails(state.car);
  const entertainment = ENTERTAINMENT_ASSETS.find(asset => asset.id === state.entertainment);
  const weeklyCost = (home ? home.weeklyCost : 0) + (vehicle ? vehicle.weeklyCost : 0) + (entertainment ? entertainment.weeklyCost : 0);
  if (weeklyCost > state.money) {
    state.money = 0;
    state.stats.stress = clamp(state.stats.stress + 3);
    state.stats.morale = clamp(state.stats.morale - 2);
    toast(`Haftalık ${moneyText(weeklyCost)} yaşam giderini karşılayamadın; stresin arttı.`);
  } else state.money -= weeklyCost;
  state.stats.morale = clamp(state.stats.morale + (home ? home.weeklyMood : 0) + (entertainment ? entertainment.weeklyMood : 0));
  state.stats.stress = clamp(state.stats.stress + (home ? home.weeklyStress : 0) + (entertainment ? entertainment.weeklyStress : 0));
  if (vehicle && vehicle.weeklyCost) state.carCondition = Math.max(0, state.carCondition - 2);
  if (state.dietitianWeeks > 0) {
    state.stats.energy = clamp(state.stats.energy + 3);
    state.stats.fatigue = clamp(state.stats.fatigue - 2);
    state.dietitianWeeks--;
    if (state.dietitianWeeks === 0) toast("Diyetisyen programın tamamlandı.");
  }
  if (state.debt) {
    state.debtWeeks++;
    if (state.debtWeeks >= 3 && !state.pendingEvents.some(event => event.type === "debt")) {
      state.pendingEvents.push({ type: "debt", title: "Borç baskısı", weeks: 1, detail: "alacaklı ödeme için süre verdi; borcunu azaltmayı düşün." });
    }
  }
  state.matchPlayed = false;
  state.match = null;
  state.selectedPlan = null;
  state.planSkipped = false;
  state.lastPlan = null;
  prepareWeek();
  maybeAgentOffer();
  maybeSponsorOffer();
  queueStoryEvent();
  state.page = state.player.age >= 38 ? "dashboard" : "week";
  render();
}
function buyProduct(id) {
  const item = getItem(id);
  if (!item || state.inventory.includes(id)) return;
  if (item.tier >= 3 && !state.pro) { toast("Pro ve elit ürünler profesyonel liglerde açılır."); return; }
  if (state.money < item.cost) { toast("Bu ürün için bakiyen yetersiz."); return; }
  state.money -= item.cost;
  state.inventory.push(id);
  applyProductEffects(item.purchaseEffects);
  toast(`${item.name} gardırobuna eklendi.`);
  render();
}
function equipProduct(id) {
  const item = getItem(id);
  if (!item || !state.inventory.includes(id) || item.kind === "consumable") return;
  state.equipped[item.kind] = id;
  toast(`${item.name} kuşanıldı.`);
  render();
}
function useProduct(id) {
  const item = getItem(id);
  if (!item || item.kind !== "consumable" || !state.inventory.includes(id)) return;
  applyProductEffects(item.consumeEffects);
  state.inventory = state.inventory.filter(itemId => itemId !== id);
  toast(`${item.name} kullanıldı; ürün envanterden çıkarıldı.`);
  render();
}
function buyAsset(value) {
  const [type, id] = value.split(":");
  const catalogs = { home: HOME_ASSETS, car: VEHICLES, entertainment: ENTERTAINMENT_ASSETS };
  const asset = catalogs[type] && catalogs[type].find(item => item.id === id);
  if (!asset || state[type] === id) return;
  if (state.proTier < asset.tier) { toast("Bu ev veya araç için üst liglere çıkmalısın."); return; }
  const previousVehicle = type === "car" && state.car ? vehicleDetails(state.car) : null;
  const tradeIn = previousVehicle ? Math.floor(previousVehicle.cost * 0.25) : 0;
  const netCost = Math.max(0, asset.cost - tradeIn);
  if (state.money < netCost) { toast("Bu satın alma için bakiyen yetersiz."); return; }
  state.money -= netCost;
  state[type] = id;
  if (type === "car") {
    state.carCondition = 100;
    state.carMirrorBroken = false;
  }
  applyProductEffects(asset.purchaseEffects);
  state.stats.morale = clamp(state.stats.morale + (type === "home" ? 2 : type === "entertainment" ? 3 : asset.type === "car" ? 1 : 0));
  state.stats.stress = clamp(state.stats.stress - (type === "home" || type === "entertainment" ? 2 : 0));
  render();
  toast(type === "home" ? "Yeni evin hayırlı olsun!" : type === "entertainment" ? "Eğlence setin hazır; dinlenme bonusu açıldı." : tradeIn ? `Araç takası tamamlandı; ${moneyText(tradeIn)} takas değeri düşüldü.` : "Garajına yeni araç eklendi!");
}
function buyDietitian() {
  if (state.dietitianWeeks || state.money < 2500) { toast("Diyetisyen programı için ₺2.500 gerekiyor ve mevcut programın bitmiş olmalı."); return; }
  state.money -= 2500;
  state.dietitianWeeks = 4;
  state.stats.energy = clamp(state.stats.energy + 10);
  state.stats.fatigue = clamp(state.stats.fatigue - 8);
  toast("Dört haftalık diyetisyen programın başladı.");
  render();
}
function deliveryShift() {
  const vehicle = vehicleDetails(state.car);
  if (!vehicle || vehicle.type !== "motorcycle" || state.carMirrorBroken || state.deliveryShiftWeek === state.week) return;
  state.deliveryShiftWeek = state.week;
  state.money += vehicle.deliveryReward;
  state.stats.energy = clamp(state.stats.energy - 8);
  state.stats.fatigue = clamp(state.stats.fatigue + 5);
  if (Math.random() < vehicle.crashRisk) {
    state.carMirrorBroken = true;
    state.carCondition = Math.max(0, state.carCondition - 25);
    addNews("Motorla küçük kaza", "Kurye vardiyasında aynan kırıldı; tamir edilene kadar yeni vardiya yapamazsın.");
    toast(`Vardiyan ₺${vehicle.deliveryReward} kazandırdı ama motor aynası kırıldı.`);
  } else toast(`Kurye vardiyası ₺${vehicle.deliveryReward} kazandırdı; enerji ve yorgunluğun etkilendi.`);
  render();
}
function shareMotorVlog() {
  const vehicle = vehicleDetails(state.car);
  if (!vehicle || vehicle.type !== "motorcycle" || state.motorVlogWeek === state.week) return;
  state.motorVlogWeek = state.week;
  const followers = vehicle.vlogFollowers || 25;
  state.mediaFollowers += followers;
  state.stats.fame = clamp(state.stats.fame + 1);
  state.recentComments.unshift("Motor vlogun mahallede ilgi gördü.");
  state.recentComments = state.recentComments.slice(0, 4);
  toast(`Motor vlogun ${followers} yeni takipçi getirdi.`);
  render();
}
function repairVehicle() {
  const vehicle = vehicleDetails(state.car);
  if (!vehicle || !state.carMirrorBroken) return;
  if (state.money < vehicle.repairCost) { toast(`Tamir için ${moneyText(vehicle.repairCost)} gerekiyor.`); return; }
  state.money -= vehicle.repairCost;
  state.carMirrorBroken = false;
  state.carCondition = Math.min(100, state.carCondition + 25);
  toast("Motor aynası tamir edildi; kurye vardiyalarına dönebilirsin.");
  render();
}
function takeLoan() {
  if (state.money > 250 || state.debt > 0) { toast("Bu oyun içi kredi şu an kullanılamıyor."); return; }
  state.money += 2000;
  state.debt = 2600;
  state.debtWeeks = 0;
  toast("₺2.000 oyun içi borç aldın. Geri ödeme ₺2.600.");
}
function repayDebt(amount) {
  if (!state.debt || amount <= 0 || state.money < amount) { toast("Ödeme için yeterli bakiye yok."); return; }
  state.money -= amount;
  state.debt = Math.max(0, state.debt - amount);
  if (!state.debt) { state.debtWeeks = 0; state.pendingEvents = state.pendingEvents.filter(event => event.type !== "debt"); }
  toast("Borç ödemesi yapıldı.");
  render();
}
function buyDrink() {
  if (state.money < 180 || state.stats.energy >= 95) return;
  state.money -= 180;
  state.stats.energy = clamp(state.stats.energy + 15);
  toast("Enerji +15. Yorgunluk seviyen değişmedi.");
  render();
}
function psychologistSession() {
  if (state.money < 500) { toast("Spor psikoloğu seansı için ₺500 gerekiyor."); return; }
  state.money -= 500;
  state.stats.mental = clamp(state.stats.mental + 18);
  state.stats.stress = clamp(state.stats.stress - 12);
  state.stats.morale = clamp(state.stats.morale + 2);
  state.returnFear = false;
  toast("Spor psikoloğu seansı tamamlandı. Mental dayanıklılığın yükseldi.");
  render();
}
function visitFamily() {
  if (state.familyVisitCooldown > 0) return;
  state.familyVisitCooldown = 4;
  state.stats.family = clamp(state.stats.family + 8);
  state.stats.morale = clamp(state.stats.morale + 8);
  state.stats.stress = clamp(state.stats.stress - 8);
  state.stats.mental = clamp(state.stats.mental + 2);
  toast("Ailenle vakit geçirdin; moralin ve mental dayanıklılığın toparlandı.");
  render();
}
function supportCommunity() {
  if (state.money < 300) return;
  state.money -= 300;
  state.communitySupport++;
  state.stats.family = clamp(state.stats.family + 2);
  state.stats.fame = clamp(state.stats.fame + 1);
  state.fanLove = clamp(state.fanLove + 2);
  addNews("Mahallene destek oldun", `${state.player.name}, eski çevresine yaptığı katkıyla taraftarların takdirini kazandı.`);
  toast("Mahalle desteğin aile bağını ve taraftar sevgisini güçlendirdi.");
  render();
}
function retireFromFootball(role) {
  if (!["coach", "commentator", "continue"].includes(role) || state.player.age < 38) return;
  if (state.storyEvent && role !== "continue") { toast("Emeklilik kararından önce kariyer hikâyesindeki olayı yanıtla."); return; }
  if (role === "continue") {
    if (state.player.age >= 41) { toast("38 yaşından sonra en fazla üç sezon futbol oynayabilirsin."); return; }
    state.page = "week";
    render();
    toast("Bir sezon daha futbolculuk kariyerine devam ediyorsun.");
    return;
  }
  state.careerRetired = true;
  state.retirementRole = role;
  state.coachCareer = role === "coach" ? { seasons: 0, wins: 0, trophies: 0, club: currentClub(), lastSeason: null } : null;
  state.retirementReview = {
    age: state.player.age, club: currentClub(), league: currentLeague(), matches: state.matches,
    goals: state.goals, assists: state.assists, average: state.matches ? Number((state.ratingTotal / state.matches).toFixed(1)) : 0,
    nationalCaps: state.nationalCaps, marketValue: state.marketValue, captain: state.captain,
    returnToRoots: state.storyTraits.returnToRoots
  };
  state.page = "retired";
  render();
  save();
}
function playCoachSeason() {
  const career = state.coachCareer;
  if (!state.careerRetired || state.retirementRole !== "coach" || !career || career.seasons >= 3) return;
  const wins = randomInt(7, 17) + Math.round((state.stats.mental + state.coachTrust) / 50);
  const finalWins = Math.min(20, wins);
  const champion = finalWins >= 15;
  career.seasons++;
  career.wins += finalWins;
  if (champion) career.trophies++;
  career.lastSeason = { wins: finalWins, champion };
  addNews(champion ? "Teknik direktör olarak şampiyonluk" : "İlk hocalık sezonu tamamlandı", `${teamLabel(career.club)} ile ${finalWins} galibiyet aldın${champion ? " ve kupayı kaldırdın" : ""}.`);
  toast(champion ? "Teknik direktörlük kariyerinde kupa kazandın!" : "Teknik direktörlük sezonun tamamlandı.");
  render();
}
function makePost() {
  if (!state.pro && !state.professionalAcademy) { toast("Sosyal medya akışı profesyonel ligde açılır."); return; }
  if (state.money < 50) { toast("Paylaşım için ₺50 gerekiyor."); return; }
  state.money -= 50;
  const engagement = randomInt(60, 300);
  state.mediaFollowers += engagement;
  state.stats.fame = clamp(state.stats.fame + (engagement > 180 ? 2 : 1));
  state.fanLove = clamp(state.fanLove + (engagement > 180 ? 2 : 1));
  state.recentComments.unshift(engagement > 180 ? "Bu paylaşım kısa sürede yayıldı, tebrikler!" : "Yeni paylaşım geldi, başarılar!");
  state.recentComments = state.recentComments.slice(0, 4);
  render();
  toast(`Paylaşımın ${engagement} etkileşim aldı.`);
}
function confirmReset() {
  if (!window.confirm(`Kariyer ${activeSlot + 1} kalıcı olarak silinecek. Diğer kayıt yuvaları korunur. Devam edilsin mi?`)) return;
  try {
    const slots = readSaveSlots();
    slots[activeSlot] = null;
    localStorage.setItem(SAVE_SLOTS_KEY, JSON.stringify(slots));
    localStorage.setItem(ACTIVE_SLOT_KEY, String(activeSlot));
    localStorage.removeItem(SAVE_KEY);
  }
  catch (error) { console.error("Kariyer silinemedi:", error); toast("Kariyer silinemedi. Tarayıcı depolama alanını kontrol et."); return; }
  state = freshState();
  shopFilter = "all"; shopTierFilter = "all"; shopSearch = "";
  render();
  toast("Kariyer silindi. Yeni bir başlangıç yapabilirsin.");
  document.getElementById("start-dialog").showModal();
}
function bindEvents() {
  document.addEventListener("click", event => {
    const pageButton = event.target.closest("[data-page]");
    if (pageButton) { event.preventDefault(); activatePage(pageButton.dataset.page); return; }
    if (event.target.closest("#manage-careers") || event.target.closest("#manage-careers-start")) {
      openCareerManager();
      return;
    }
    if (event.target.closest("#close-careers")) {
      document.getElementById("career-dialog").close();
      if (!state.player) document.getElementById("start-dialog").showModal();
      return;
    }
    const slotButton = event.target.closest("[data-slot-open]");
    if (slotButton) {
      switchCareerSlot(Number(slotButton.dataset.slotOpen));
      return;
    }
    if (event.target.closest("#save-game")) {
      if (!state.player) { toast("Önce bir kariyer başlat."); return; }
      if (save()) toast("Kariyerin kaydedildi.");
      return;
    }
    const planButton = event.target.closest("[data-plan]");
    if (planButton) {
      if (state.matchPlayed || state.planSkipped) return;
      state.selectedPlan = state.selectedPlan === planButton.dataset.plan ? null : planButton.dataset.plan;
      render();
      return;
    }
    const buyButton = event.target.closest("[data-buy]");
    if (buyButton) { buyProduct(buyButton.dataset.buy); return; }
    const useButton = event.target.closest("[data-use]");
    if (useButton) { useProduct(useButton.dataset.use); return; }
    const equipButton = event.target.closest("[data-equip]");
    if (equipButton) { equipProduct(equipButton.dataset.equip); return; }
    const assetButton = event.target.closest("[data-asset]");
    if (assetButton) { buyAsset(assetButton.dataset.asset); return; }
    const choiceButton = event.target.closest("[data-match-choice]");
    if (choiceButton) { resolveHighlight(Number(choiceButton.dataset.matchChoice)); return; }
    const storyChoiceButton = event.target.closest("[data-story-choice]");
    if (storyChoiceButton) { resolveStoryChoice(Number(storyChoiceButton.dataset.storyChoice)); return; }
    const mentalityButton = event.target.closest("[data-mentality]");
    if (mentalityButton) { setMentality(mentalityButton.dataset.mentality); return; }
    const transferButton = event.target.closest("[data-transfer]");
    if (transferButton) { decideTransfer(transferButton.dataset.transfer === "accept"); return; }
    const pressButton = event.target.closest("[data-press]");
    if (pressButton) { resolvePressConference(Number(pressButton.dataset.press)); return; }
    const perkButton = event.target.closest("[data-perk]");
    if (perkButton) { choosePerk(perkButton.dataset.perk); return; }
    const contractButton = event.target.closest("[data-contract]");
    if (contractButton) { makeContractDemand(contractButton.dataset.contract); return; }
    const agentButton = event.target.closest("[data-agent]");
    if (agentButton) { answerAgentOffer(agentButton.dataset.agent === "accept"); return; }
    const sponsorButton = event.target.closest("[data-sponsor]");
    if (sponsorButton) { answerSponsorOffer(sponsorButton.dataset.sponsor === "accept"); return; }
    const nationalButton = event.target.closest("[data-national]");
    if (nationalButton) { resolveNationalInvite(nationalButton.dataset.national === "accept"); return; }
    const loanButton = event.target.closest("[data-loan]");
    if (loanButton) { decideLoan(loanButton.dataset.loan === "accept"); return; }
    const retireButton = event.target.closest("[data-retire]");
    if (retireButton) { retireFromFootball(retireButton.dataset.retire); return; }
    if (event.target.closest("#complete-week")) { applyPlan(state.selectedPlan); return; }
    if (event.target.closest("#skip-plan")) { skipPlan(); return; }
    if (event.target.closest("#continue-week")) {
      if (state.selectedPlan && !state.planSkipped) applyPlan(state.selectedPlan);
      else skipPlan();
      return;
    }
    if (event.target.closest("#kickoff")) { beginMatch(); return; }
    if (event.target.closest("#advance-week")) { advanceWeek(); return; }
    if (event.target.closest("#skip-match")) { state.match = { phase: "final", opponent: nextOpponent(), scoreFor: 0, scoreAgainst: 0, minute: 0, goals: 0, assists: 0, log: [{ text: "Sakatlık nedeniyle kadroda yer almadın.", value: "Dinlenme" }], rating: 0, outcome: "Dinlenme haftası" }; recordLeagueRound(state.match); state.matchPlayed = true; advanceWeek(); return; }
    if (event.target.closest("#take-loan")) { takeLoan(); render(); return; }
    if (event.target.closest("#repay-debt")) { repayDebt(Math.min(state.debt, 5000)); return; }
    if (event.target.closest("#pay-all-debt")) { repayDebt(state.debt); return; }
    if (event.target.closest("#buy-drink")) { buyDrink(); return; }
    if (event.target.closest("#private-physio")) { treatInjury(); return; }
    if (event.target.closest("#early-return")) { earlyReturn(); return; }
    if (event.target.closest("#psych-session")) { psychologistSession(); return; }
    if (event.target.closest("#buy-dietitian")) { buyDietitian(); return; }
    if (event.target.closest("#delivery-shift")) { deliveryShift(); return; }
    if (event.target.closest("#motor-vlog")) { shareMotorVlog(); return; }
    if (event.target.closest("#repair-vehicle")) { repairVehicle(); return; }
    if (event.target.closest("#visit-family")) { visitFamily(); return; }
    if (event.target.closest("#support-community")) { supportCommunity(); return; }
    if (event.target.closest("#team-talk")) { captainTeamTalk(); return; }
    if (event.target.closest("#coach-season")) { playCoachSeason(); return; }
    if (event.target.closest("#make-post")) { makePost(); return; }
    if (event.target.closest("#reset-game")) { confirmReset(); return; }
  });
  document.addEventListener("change", event => {
    if (event.target.id === "shop-filter") { shopFilter = event.target.value; render(); }
    if (event.target.id === "shop-tier") { shopTierFilter = event.target.value; render(); }
  });
  document.addEventListener("input", event => {
    if (event.target.id === "shop-search") {
      shopSearch = event.target.value;
      const start = event.target.selectionStart;
      const end = event.target.selectionEnd;
      render();
      const next = document.getElementById("shop-search");
      next.focus();
      next.setSelectionRange(start, end);
    }
  });
}
function boot() {
  load();
  bindEvents();
  initStartDialog();
  render();
}
boot();
