const characters = [
  {
    name: "Jon Snow",
    house: "Stark",
    gender: "Male",
    origin: "North",
    age: 24,
    religion: "Old Gods",
    first_seen: "Season 1",
    image: "ımage/jon.jpg",
    status: "alive"
  },
  {
    name: "Daenerys Targaryen",
    house: "Targaryen",
    gender: "Female",
    origin: "Essos",
    age: 23,
    religion: "Faith of the Seven",
    first_seen: "Season 1",
    image: "ımage/daenerys.jpg",
    status: "dead"
  },
  {
    name: "Tyrion Lannister",
    house: "Lannister",
    gender: "Male",
    origin: "Westerlands",
    age: 38,
    religion: "Faith of the Seven",
    first_seen: "Season 1",
    image: "ımage/tyrion.jpg",
    status: "alive"
  },
  {
    name: "Arya Stark",
    house: "Stark",
    gender: "Female",
    age: 18,
    origin: "North",
    religion: "Many-Faced God",
    first_seen: "Season 1",
    image: "ımage/arya.jpg",
    status: "alive"
  },
  {
    name: "Cerenna Lannister",
    house: "Lannister",
    gender: "Female",
    age: 20,
    origin: "Westerlands",
    religion: "Old Gods",
    first_seen: "Book",
    image: "ımage/cerenna.jpg",
    status: "alive"
  },
  {
    name: "Olenna Tyrell",
    house: "Tyrell",
    gender: "Female",
    age: 74,
    origin: "Reach",
    religion: "None",
    first_seen: "Season 3",
    image: "ımage/olenna.jpg",
    status: "dead"
  },
  {
    name: "Cersei Lannister",
    house: "Lannister",
    gender: "Female",
    age: 44,
    origin: "Westerlands",
    religion: "Faith of the Seven",
    first_seen: "Season 1",
    image: "ımage/cersei.jpg",
    status: "dead"
  },
  {
    name: "Robb Stark",
    house: "Stark",
    gender: "Male",
    age: 17,
    origin: "North",
    religion: "Old Gods",
    first_seen: "Season 1",
    image: "ımage/robb.jpg",
    status: "dead"
  },
  {
    name: "Jamie Lannister",
    house: "Lannister",
    gender: "Male",
    age: 45,
    origin: "Westerlands",
    religion: "Faith of the Seven",
    first_seen: "Season 1",
    image: "ımage/jamie.jpg",
    status: "dead"
  },
  {
    name: "Sansa Stark",
    house: "Stark",
    gender: "Female",
    age: 21,
    origin: "North",
    religion: "Old Gods",
    first_seen: "Season 1",
    image: "ımage/sansa.jpg",
    status: "alive"
  },
  {
    name: "Bran Stark",
    house: "Stark",
    gender: "Male",
    age: 20,
    origin: "North",
    religion: "Old Gods",
    first_seen: "Season 1",
    image: "ımage/bran.jpg",
    status: "alive"
  },
  {
    name: "Theon Greyjoy",
    house: "Greyjoy",
    gender: "Male",
    age: 27,
    origin: "Iron Islands",
    religion: "Drowned God",
    first_seen: "Season 1",
    image: "ımage/theon.jpg",
    status: "dead"
  },
  {
    name: "Brienne of Tarth",
    house: "Tarth",
    gender: "Female",
    age: 32,
    origin: "Stormlands",
    religion: "Faith of the Seven",
    first_seen: "Season 2",
    image: "ımage/brienne.jpg",
    status: "alive"
  },
  {
    name: "Sandor Clegane",
    house: "Clegane",
    gender: "Male",
    age: 40,
    origin: "Westerlands",
    religion: "None",
    first_seen: "Season 1",
    image: "ımage/sandor.jpg",
    status: "dead"
  },
  {
    name: "Samwell Tarly",
    house: "Tarly",
    gender: "Male",
    age: 26,
    origin: "Reach",
    religion: "Faith of the Seven",
    first_seen: "Season 1",
    image: "ımage/samwell.jpg",
    status: "alive"
  },
  {
    name: "Margaery Tyrell",
    house: "Tyrell",
    gender: "Female",
    age: 26,
    origin: "Reach",
    religion: "Faith of the Seven",
    first_seen: "Season 2",
    image: "ımage/margaery.jpg",
    status: "dead"
  },
  {
    name: "Jorah Mormont",
    house: "Mormont",
    gender: "Male",
    age: 52,
    origin: "North",
    religion: "Old Gods",
    first_seen: "Season 1",
    image: "ımage/jorah.jpg",
    status: "dead"
  },
  {
    name: "Davos Seaworth",
    house: "Seaworth",
    gender: "Male",
    age: 58,
    origin: "Crownlands",
    religion: "Faith of the Seven",
    first_seen: "Season 2",
    image: "ımage/davos.jpg",
    status: "alive"
  },
  {
    name: "Melisandre",
    house: "None",
    gender: "Female",
    age: 400,
    origin: "Asshai",
    religion: "Lord of Light",
    first_seen: "Season 2",
    image: "ımage/melisandre.jpg",
    status: "dead"
  },
  // YENİ EKLENEN 11 KARAKTER
  {
    name: "Eddard Stark",
    house: "Stark",
    gender: "Male",
    age: 45,
    origin: "North",
    religion: "Old Gods",
    first_seen: "Season 1",
    image: "ımage/eddard.jpg",
    status: "dead"
  },
  {
    name: "Khal Drogo",
    house: "Dothraki",
    gender: "Male",
    age: 30,
    origin: "Essos",
    religion: "Great Stallion",
    first_seen: "Season 1",
    image: "ımage/drogo.jpg",
    status: "dead"
  },
  {
    name: "Joffrey Baratheon",
    house: "Baratheon",
    gender: "Male",
    age: 19,
    origin: "Crownlands",
    religion: "Faith of the Seven",
    first_seen: "Season 1",
    image: "ımage/joffrey.jpg",
    status: "dead"
  },
  {
    name: "Varys",
    house: "None",
    gender: "Male",
    age: 52,
    origin: "Essos",
    religion: "None",
    first_seen: "Season 1",
    image: "ımage/varys.jpg",
    status: "dead"
  },
  {
    name: "Petyr Baelish",
    house: "Baelish",
    gender: "Male",
    age: 42,
    origin: "Vale of Arryn",
    religion: "Faith of the Seven",
    first_seen: "Season 1",
    image: "ımage/petyr.jpg",
    status: "dead"
  },
  {
    name: "Bronn",
    house: "None",
    gender: "Male",
    age: 44,
    origin: "Riverlands",
    religion: "None",
    first_seen: "Season 1",
    image: "ımage/bronn.jpg",
    status: "alive"
  },
  {
    name: "Gendry",
    house: "Baratheon",
    gender: "Male",
    age: 25,
    origin: "Crownlands",
    religion: "Faith of the Seven",
    first_seen: "Season 1",
    image: "ımage/gendry.jpg",
    status: "alive"
  },
  {
    name: "Missandei",
    house: "None",
    gender: "Female",
    age: 23,
    origin: "Naath",
    religion: "None",
    first_seen: "Season 3",
    image: "ımage/missandei.jpg",
    status: "dead"
  },
  {
    name: "Ygritte",
    house: "Free Folk",
    gender: "Female",
    age: 19,
    origin: "North",
    religion: "Old Gods",
    first_seen: "Season 2",
    image: "ımage/ygritte.jpg",
    status: "dead"
  },
  {
    name: "Tormund Giantsbane",
    house: "Free Folk",
    gender: "Male",
    age: 48,
    origin: "North",
    religion: "Old Gods",
    first_seen: "Season 3",
    image: "ımage/tormund.jpg",
    status: "alive"
  },
  {
    name: "Grey Worm",
    house: "None",
    gender: "Male",
    age: 30,
    origin: "Essos",
    religion: "None",
    first_seen: "Season 3",
    image: "ımage/greyworm.jpg",
    status: "alive"
  }
];

// Oyun için yardımcı fonksiyonlar
function getRandomCharacter() {
  return characters[Math.floor(Math.random() * characters.length)];
}

function normalizeName(name) {
  return name.toLowerCase().trim().replace(/\s+/g, ' ');
}

function findCharacterByName(inputName) {
  const normalizedInput = normalizeName(inputName);
  return characters.find(char => 
    normalizeName(char.name) === normalizedInput ||
    normalizeName(char.name).includes(normalizedInput)
  );
}

function getAutocompleteSuggestions(input) {
  if (!input || input.length < 2) return [];
  const normalizedInput = normalizeName(input);
  return characters
    .filter(char => normalizeName(char.name).includes(normalizedInput))
    .slice(0, 5);
}

// Konsola hata ayıklama için
console.log(`Toplam ${characters.length} karakter yüklendi`);