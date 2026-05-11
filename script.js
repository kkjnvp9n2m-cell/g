  let score = 0;
let clickPower = 1;
let upgradeLevel = 0;

const poopColors = [
    { name: "Обычная", emoji: "💩", price: 100, power: 4 },
    { name: "Бронзовая", emoji: "🤎", price: 400, power: 16 },
    { name: "Зеленая", emoji: "💚", price: 1600, power: 64 },
    { name: "Синяя", emoji: "💙", price: 6400, power: 256 },
    { name: "Фиолетовая", emoji: "💜", price: 25600, power: 1024 },
    { name: "Красная", emoji: "❤️", price: 102400, power: 4096 },
    { name: "ЗОЛОТАЯ", emoji: "✨", price: 409600, power: 16384 }
];

// Функция клика
window.clickRooster = function(event) {
    score += clickPower;
    updateUI();
    spawnPoop(event);
};

function spawnPoop(event) {
    const poop = document.createElement('div');
    poop.className = 'poop-particle';
    
    // Эмодзи текущего уровня
    let currentEmoji = upgradeLevel === 0 ? "💩" : poopColors[upgradeLevel-1].emoji;
    poop.innerText = currentEmoji;
    
    // Центр экрана для вылета
    poop.style.left = "50%";
    poop.style.top = "40%";
    
    // Рандомный разлет
    const angle = Math.random() * Math.PI * 2;
    const dist = 100 + Math.random() * 100;
    const dx = Math.cos(angle) * dist + "px";
    const dy = Math.sin(angle) * dist + "px";
    
    poop.style.setProperty('--dx', dx);
    poop.style.setProperty('--dy', dy);
    
    document.body.appendChild(poop);
    setTimeout(() => poop.remove(), 700);
}

// Покупка улучшения
window.buyUpgrade = function() {
    if (upgradeLevel < poopColors.length) {
        let current = poopColors[upgradeLevel];
        if (score >= current.price) {
            score -= current.price;
            clickPower = current.power;
            upgradeLevel++;
            updateUI();
            
            // Показываем финал только когда куплены ВСЕ 7 уровней
            if (upgradeLevel === poopColors.length) {
                document.getElementById('final-message').classList.remove('hidden');
            }
        }
    }
};

function updateUI() {
    const scoreEl = document.getElementById('score');
    const priceEl = document.getElementById('price');
    const btnText = document.getElementById('btn-text');
    const upgradeBtn = document.getElementById('upgrade-btn');

    if (scoreEl) scoreEl.innerText = Math.floor(score);
    
    if (upgradeLevel < poopColors.length) {
        let next = poopColors[upgradeLevel];
        if (priceEl) priceEl.innerText = next.price;
        if (btnText) btnText.innerText = "Купить " + next.name + " 💩";
        if (upgradeBtn) upgradeBtn.disabled = score < next.price;
    } else {
        if (btnText) btnText.innerText = "МАКСИМУМ!";
        if (upgradeBtn) upgradeBtn.disabled = true;
    }
}

// Запуск начального состояния
updateUI();
