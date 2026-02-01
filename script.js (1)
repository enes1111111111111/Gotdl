// Günlük gizli karakteri seç
const day = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
const answer = characters[day % characters.length];

// INPUT ve SUGGESTION kutuları
const input = document.getElementById("guessInput");
const suggestionsBox = document.getElementById("suggestions");
const results = document.getElementById("results");

// AUTOCOMPLETE (resimli)
input.addEventListener("input", () => {
  const value = input.value.toLowerCase();
  suggestionsBox.innerHTML = "";
  
  if (value === "") return;
  
  const matches = characters.filter(c =>
    c.name.toLowerCase().includes(value)
  );
  
  matches.forEach(character => {
    const div = document.createElement("div");
    div.className = "suggestion";
    
    // --- RESİM EKLENDİ ---
    const img = document.createElement("img");
    img.src = character.image; // characters.js’deki resim yolu
    img.className = "suggestion-img";
    div.appendChild(img);
    
    const span = document.createElement("span");
    span.textContent = character.name;
    div.appendChild(span);
    // --- BİTİŞ ---
    
    div.onclick = () => {
      input.value = character.name;
      suggestionsBox.innerHTML = "";
    };
    
    suggestionsBox.appendChild(div);
  });
});

// BUTONA BASINCA
function makeGuess() {
  const guess = characters.find(
    c => c.name.toLowerCase() === input.value.toLowerCase()
  );
  
  if (!guess) {
    alert("Karakter bulunamadı!");
    return;
  }
  
  showResult(guess);
  input.value = "";
  suggestionsBox.innerHTML = "";
}

// SONUCU EKRANA YAZDIRIR
function showResult(guess) {
  const row = document.createElement("div");
  row.className = "result";
  
  row.innerHTML = `
  <div class="box ${guess.name === answer.name ? 'correct' : 'wrong'}">
    <div class="category">NAME</div>
    <img src="${guess.image}" class="char-img">
    <div class="value">${guess.name}</div>
  </div>

  <div class="box ${guess.house === answer.house ? 'correct' : 'wrong'}">
    <div class="category">HOUSE</div>
    <div class="value">${guess.house}</div>
  </div>

  <div class="box ${guess.gender === answer.gender ? 'correct' : 'wrong'}">
    <div class="category">GENDER</div>
    <div class="value">${guess.gender}</div>
  </div>

  <div class="box ${guess.origin === answer.origin ? 'correct' : 'wrong'}">
    <div class="category">ORIGIN</div>
    <div class="value">${guess.origin}</div>
  </div>

  <div class="box ${
    guess.age === answer.age
      ? 'correct'
      : Math.abs(guess.age - answer.age) <= 2
      ? 'close'
      : 'wrong'
  }">
    <div class="category">AGE</div>
    <div class="value">
      ${guess.age}
      ${
        guess.age === answer.age
          ? ""
          : guess.age < answer.age
          ? " ↑"
          : " ↓"
      }
    </div>
  </div>
  `;
  
  results.prepend(row);
}