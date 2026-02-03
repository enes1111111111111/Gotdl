let attempts = 0;

// Günlük gizli karakteri seç
const day = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
const answer = characters[day % characters.length];

// INPUT ve SUGGESTION kutuları
const input = document.getElementById("guessInput");
const suggestionsBox = document.getElementById("suggestions");
const results = document.getElementById("results");
const attemptCounter = document.getElementById("attemptCounter");

// Tahmin edilen karakterleri tutar
const guessedNames = new Set();

// Oyun kilidi
let gameOver = false;

/* =========================
   AUTOCOMPLETE - GÜNCELLENDİ (SOYAD İLK HARF DESTEĞİ)
   ========================= */
input.addEventListener("input", () => {
  if (gameOver) return;
  
  const value = input.value.toLowerCase().trim();
  suggestionsBox.innerHTML = "";
  
  if (!value) return;
  
  const matches = characters
    .filter(c => {
      // Tahmin edilmemiş karakterler
      if (guessedNames.has(c.name)) return false;
      
      const fullName = c.name.toLowerCase();
      const nameParts = c.name.toLowerCase().split(' ');
      
      // 1. Tam isimle başlayanlar (orjinal mantık)
      if (fullName.startsWith(value)) return true;
      
      // 2. Sadece soyadı ile başlayanlar
      if (nameParts.length > 1 && nameParts[1].startsWith(value)) return true;
      
      // 3. Ad + boşluk + soyadın ilk harfi (örn: "Jon S" -> "Jon Snow")
      if (nameParts.length > 1 && value.includes(' ')) {
        const inputParts = value.split(' ');
        if (inputParts.length === 2) {
          const firstName = inputParts[0];
          const lastNameInitial = inputParts[1];
          return nameParts[0].startsWith(firstName) && 
                 nameParts[1].startsWith(lastNameInitial);
        }
      }
      
      // 4. Sadece soyadın ilk harfi (örn: "S" -> "Snow", "Stark" vs.)
      if (value.length === 1 && nameParts.length > 1) {
        const lastNameFirstChar = nameParts[1].charAt(0);
        return lastNameFirstChar === value;
      }
      
      return false;
    })
    .slice(0, 5);
  
  matches.forEach(character => {
    const div = document.createElement("div");
    div.className = "suggestion";
    
    const img = document.createElement("img");
    img.src = character.image;
    img.className = "suggestion-img";
    
    const span = document.createElement("span");
    
    // Vurgulama için: Kullanıcının yazdığı kısmı kalın yap
    const fullName = character.name.toLowerCase();
    let highlightedName = character.name;
    
    if (value.length > 0) {
      // Eğer sadece soyadın ilk harfi ile eşleştiyse
      if (value.length === 1) {
        const nameParts = character.name.split(' ');
        if (nameParts.length > 1) {
          const lastName = nameParts[1];
          if (lastName.toLowerCase().startsWith(value)) {
            highlightedName = `${nameParts[0]} <strong>${lastName.charAt(0)}</strong>${lastName.slice(1)}`;
          }
        }
      } else if (fullName.startsWith(value)) {
        // Normal isimle başlayan eşleşme
        highlightedName = `<strong>${character.name.slice(0, value.length)}</strong>${character.name.slice(value.length)}`;
      } else {
        // Soyad ile eşleşme
        const nameParts = character.name.split(' ');
        if (nameParts.length > 1) {
          const lastName = nameParts[1];
          const lastNameLower = lastName.toLowerCase();
          if (lastNameLower.startsWith(value)) {
            highlightedName = `${nameParts[0]} <strong>${lastName.slice(0, value.length)}</strong>${lastName.slice(value.length)}`;
          } else if (value.includes(' ')) {
            // "Ad + soyad baş harfi" formatı
            const inputParts = value.split(' ');
            if (inputParts.length === 2) {
              const firstNamePart = inputParts[0];
              const lastNameInitial = inputParts[1];
              if (nameParts[0].toLowerCase().startsWith(firstNamePart) && 
                  lastName.toLowerCase().startsWith(lastNameInitial)) {
                highlightedName = `<strong>${nameParts[0].slice(0, firstNamePart.length)}</strong>${nameParts[0].slice(firstNamePart.length)} <strong>${lastName.charAt(0)}</strong>${lastName.slice(1)}`;
              }
            }
          }
        }
      }
    }
    
    span.innerHTML = highlightedName;
    
    div.append(img, span);
    
    div.onclick = () => {
      if (gameOver) return;
      input.value = character.name;
      suggestionsBox.innerHTML = "";
      makeGuess();
    };
    
    suggestionsBox.appendChild(div);
  });
});

/* =========================
   TAHMİN YAPMA - GÜNCELLENDİ (SOYAD İLK HARF DESTEĞİ)
   ========================= */
function makeGuess() {
  if (gameOver) return;
  
  const inputValue = input.value.toLowerCase().trim();
  let guess = null;
  
  // Önce tam isimle eşleştir
  guess = characters.find(
    c => c.name.toLowerCase() === inputValue
  );
  
  // Tam isim bulunamazsa, kısmi eşleştirme yap
  if (!guess && inputValue.length > 0) {
    guess = characters.find(c => {
      const fullName = c.name.toLowerCase();
      const nameParts = c.name.toLowerCase().split(' ');
      
      // 1. Tam isim
      if (fullName === inputValue) return true;
      
      // 2. Sadece soyad
      if (nameParts.length > 1 && nameParts[1] === inputValue) return true;
      
      // 3. Ad + soyadın ilk harfi (örn: "Jon S")
      if (inputValue.includes(' ')) {
        const inputParts = inputValue.split(' ');
        if (inputParts.length === 2) {
          const firstName = inputParts[0];
          const lastNameInitial = inputParts[1];
          return nameParts[0] === firstName && 
                 nameParts[1].startsWith(lastNameInitial);
        }
      }
      
      // 4. Sadece soyadın ilk harfi ve karakter benzersizse
      if (inputValue.length === 1) {
        // O harfi ile başlayan tek karakter var mı kontrol et
        const matchingChars = characters.filter(char => {
          const charNameParts = char.name.toLowerCase().split(' ');
          return charNameParts.length > 1 && 
                 charNameParts[1].startsWith(inputValue);
        });
        
        // Eğer sadece bir karakter eşleşiyorsa, onu seç
        if (matchingChars.length === 1 && matchingChars[0].name === c.name) {
          return true;
        }
      }
      
      return false;
    });
  }
  
  if (!guess) return;
  if (guessedNames.has(guess.name)) return;
  
  guessedNames.add(guess.name);
  
  attempts++;
  attemptCounter.innerText = "Deneme: " + attempts;
  
  showResult(guess);
  
  if (guess.name === answer.name) {
    gameOver = true;
    input.disabled = true;
    suggestionsBox.innerHTML = "";
    attemptCounter.innerText = `🎯 ${attempts}. denemede doğru bildin!`;
    launchConfetti();
  }
  
  input.value = "";
}

/* =========================
   SONUÇ GÖSTERME (DEĞİŞMEDİ)
   ========================= */
function showResult(guess) {
  const row = document.createElement("div");
  row.className = "results-row";
  row.style.display = "flex";
  row.style.flexWrap = "nowrap";
  row.style.overflowX = "auto";
  row.style.padding = "4px 0";
  row.style.marginBottom = "12px";
  
  const ageClass = guess.age === answer.age ? "correct" : "wrong";
  
  // FIRST_SEEN karşılaştırması
  let firstSeenClass =
    guess.first_seen === answer.first_seen ? "correct" : "wrong";
  
  let firstSeenArrow = "";
  
  const guessNum = parseInt(guess.first_seen);
  const answerNum = parseInt(answer.first_seen);
  
  // Sadece ikisi de sayıysa ok göster
  if (!isNaN(guessNum) && !isNaN(answerNum) && guessNum !== answerNum) {
    firstSeenArrow = guessNum < answerNum ? " ↑" : " ↓";
  }
  
  // STATUS karşılaştırması
  const statusClass = guess.status === answer.status ? "correct" : "wrong";
  
  row.innerHTML = `
    <div class="box ${guess.name === answer.name ? "correct" : "wrong"}">
      <div class="category">NAME</div>
      <img src="${guess.image}" class="char-img">
      <div class="value">${guess.name}</div>
    </div>

    <div class="box ${guess.house === answer.house ? "correct" : "wrong"}">
      <div class="category">HOUSE</div>
      <div class="value">${guess.house}</div>
    </div>

    <div class="box ${guess.gender === answer.gender ? "correct" : "wrong"}">
      <div class="category">GENDER</div>
      <div class="value">${guess.gender}</div>
    </div>

    <div class="box ${guess.origin === answer.origin ? "correct" : "wrong"}">
      <div class="category">ORIGIN</div>
      <div class="value">${guess.origin}</div>
    </div>

    <div class="box ${ageClass}">
      <div class="category">AGE</div>
      <div class="value">
        ${guess.age}${guess.age === answer.age ? "" : guess.age < answer.age ? " ↑" : " ↓"}
      </div>
    </div>

    <div class="box ${guess.religion === answer.religion ? "correct" : "wrong"}">
      <div class="category">RELIGION</div>
      <div class="value">${guess.religion || "-"}</div>
    </div>

    <div class="box ${firstSeenClass}">
      <div class="category">FIRST_SEEN</div>
      <div class="value">
        ${guess.first_seen ?? "-"}${firstSeenArrow}
      </div>
    </div>

    <div class="box ${statusClass}">
      <div class="category">STATUS</div>
      <div class="value">
        ${guess.status === 'alive' ? 'Hayatta' : 'Ölü'}
      </div>
    </div>
  `;
  
  row.style.opacity = 0;
  row.style.transform = "translateY(-20px)";
  results.prepend(row);
  
  requestAnimationFrame(() => {
    row.style.transition = "all 0.4s ease";
    row.style.opacity = 1;
    row.style.transform = "translateY(0)";
  });
}

/* =========================
   İPUCU SİSTEMİ (DEĞİŞMEDİ)
   ========================= */
function hint() {
  if (gameOver || attempts === 0) return;
  
  const hints = [
    `Bu karakter ${answer.status === 'alive' ? 'hayatta' : 'ölü'}.`,
    `Bu karakter ${answer.house} hanesine mensup.`,
    `Bu karakter ${answer.gender === 'Male' ? 'erkek' : 'kadın'}.`,
    `Bu karakter ${answer.age} yaşında.`,
    `Bu karakter ${answer.origin} bölgesinden.`,
    `Bu karakter ${answer.religion === 'None' ? 'hiçbir dine mensup değil' : answer.religion + ' dinine mensup'}.`,
    `Bu karakter ilk kez ${answer.first_seen} görüldü.`
  ];
  
  const randomHint = hints[Math.floor(Math.random() * hints.length)];
  
  // İpucu mesajını göster (input'un üstünde)
  const hintElement = document.createElement("div");
  hintElement.className = "hint-message";
  hintElement.innerHTML = `💡 İpucu: ${randomHint}`;
  hintElement.style.cssText = `
    background: linear-gradient(135deg, #f39c12, #e67e22);
    color: white;
    padding: 12px 20px;
    margin: 10px auto;
    border-radius: 8px;
    text-align: center;
    font-weight: bold;
    font-size: 16px;
    max-width: 500px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    border: 2px solid #d35400;
    animation: fadeInUp 0.5s ease;
  `;
  
  // Eski ipucunu temizle
  const oldHint = document.querySelector(".hint-message");
  if (oldHint) oldHint.remove();
  
  // İpucunu input container'ının öncesine ekle
  const inputContainer = document.querySelector(".input-container");
  if (inputContainer) {
    inputContainer.parentNode.insertBefore(hintElement, inputContainer);
  } else {
    // Eğer input-container yoksa, input'un öncesine ekle
    input.parentNode.insertBefore(hintElement, input);
  }
  
  // İpucu butonunu devre dışı bırak
  const hintButton = document.getElementById("hintButton");
  if (hintButton) {
    hintButton.disabled = true;
    hintButton.textContent = "İpucu kullanıldı";
    hintButton.style.opacity = "0.7";
    
    // 5 saniye sonra butonu tekrar aktif et
    setTimeout(() => {
      hintButton.disabled = false;
      hintButton.textContent = "İpucu";
      hintButton.style.opacity = "1";
      
      // İpucu mesajını kaldır
      if (hintElement.parentNode) {
        hintElement.style.transition = "all 0.5s ease";
        hintElement.style.opacity = "0";
        hintElement.style.transform = "translateY(-10px)";
        setTimeout(() => {
          if (hintElement.parentNode) {
            hintElement.parentNode.removeChild(hintElement);
          }
        }, 500);
      }
    }, 5000);
  }
}

/* =========================
   ANIMASYONLAR (DEĞİŞMEDİ)
   ========================= */
// CSS'e eklenecek animasyon
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);

/* =========================
   🎉 KONFETİ (DEĞİŞMEDİ)
   ========================= */
function launchConfetti() {
  const container = document.getElementById("confetti-container");
  if (!container) return;
  
  container.innerHTML = "";
  const colors = ["#f1c40f", "#e74c3c", "#2ecc71", "#3498db", "#9b59b6"];
  
  for (let i = 0; i < 120; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDuration = 2 + Math.random() * 2 + "s";
    
    container.appendChild(confetti);
  }
  
  setTimeout(() => {
    container.innerHTML = "";
  }, 4000);
}