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

function clickRooster(event) {
    score += clickPower;
    updateUI();
    spawnPoop(event);
}

function spawnPoop(event) {
    const poop = document.createElement('div');
    poop.className = 'poop-particle';
    
    // Эмодзи текущего уровня
    let currentEmoji = upgradeLevel === 0 ? "💩" : poopColors[upgradeLevel-1].emoji;
    poop.innerText = currentEmoji;
    
    // Координаты центра петуха
    poop.style.left = "50%";
    poop.style.top = "45%";
    
    // Случайное направление разлета
    const angle = Math.random() * Math.PI * 2;
    const dist = 100 + Math.random() * 150;
    const dx = Math.cos(angle) * dist + "px";
    const dy = Math.sin(angle) * dist + "px";
    
    poop.style.setProperty('--dx', dx);
    poop.style.setProperty('--dy', dy);
    
    document.body.appendChild(poop);
    setTimeout(() => poop.remove(), 700);
}

function buyUpgrade() {
    let current = poopColors[upgradeLevel];
    if (score >= current.price) {
        score -= current.price;
        clickPower = current.power;
        upgradeLevel++;
        updateUI();
        
        if (upgradeLevel >= poopColors.length) {
            document.getElementById('final-message').classList.remove('hidden');
        }
    }
}

function updateUI() {
    document.getElementById('score').innerText = Math.floor(score);
    
    if (upgradeLevel < poopColors.length) {
        let next = poopColors[upgradeLevel];
        document.getElementById('price').innerText = next.price;
        document.getElementById('btn-text').innerText = "Купить " + next.name + " 💩";
        document.getElementById('upgrade-btn').disabled = score < next.price;
    } else {
        document.getElementById('upgrade-btn').innerText = "МАКСИМУМ!";
        document.getElementById('upgrade-btn').disabled = true;
    }
}

// Проверка доступности кнопки каждые 100мс
setInterval(updateUI, 100);
