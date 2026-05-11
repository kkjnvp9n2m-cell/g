let score = 0;
let clickPower = 1;
let upgradeLevel = 0;

// Список цветов для какашек (7 штук)
const poopColors = [
    { name: "Обычная", emoji: "💩", price: 100, power: 4 },
    { name: "Бронзовая", emoji: "🤎", price: 400, power: 16 },
    { name: "Зеленая", emoji: "💚", price: 1600, power: 64 },
    { name: "Синяя", emoji: "💙", power: 256, price: 6400 },
    { name: "Фиолетовая", emoji: "💜", price: 25600, power: 1024 },
    { name: "Красная", emoji: "❤️", price: 102400, power: 4096 },
    { name: "ЗОЛОТАЯ", emoji: "✨", price: 409600, power: 16384 }
];

const scoreEl = document.getElementById('score');
const priceEl = document.getElementById('price');
const nextColorEl = document.getElementById('next-color');
const upgradeBtn = document.getElementById('upgrade-btn');
const finalMsg = document.getElementById('final-message');

function clickRooster(event) {
    score += clickPower;
    updateUI();
    spawnPoop(event);
}

function spawnPoop(event) {
    const poop = document.createElement('div');
    poop.className = 'poop-particle';
    
    // Используем текущий эмодзи какашки
    let currentEmoji = upgradeLevel === 0 ? "💩" : poopColors[upgradeLevel-1].emoji;
    poop.innerText = currentEmoji;
    
    // Случайное направление полета
    const dx = (Math.random() - 0.5) * 300 + "px";
    const dy = (Math.random() - 0.5) * 300 + "px";
    poop.style.setProperty('--dx', dx);
    poop.style.setProperty('--dy', dy);
    
    // Позиция клика
    poop.style.left = event.clientX - 15 + "px";
    poop.style.top = event.clientY - 15 + "px";
    
    document.body.appendChild(poop);
    
    setTimeout(() => poop.remove(), 800);
}

function buyUpgrade() {
    let currentUpgrade = poopColors[upgradeLevel];
    
    if (score >= currentUpgrade.price) {
        score -= currentUpgrade.price;
        clickPower = currentUpgrade.power;
        upgradeLevel++;
        
        if (upgradeLevel >= poopColors.length) {
            // Финал
            upgradeBtn.classList.add('hidden');
            finalMsg.classList.remove('hidden');
        } else {
            updateUI();
        }
    }
}

function updateUI() {
    scoreEl.innerText = Math.floor(score);
    
    if (upgradeLevel < poopColors.length) {
        let next = poopColors[upgradeLevel];
        priceEl.innerText = next.price;
        nextColorEl.innerText = next.name;
        
        // Отключаем кнопку, если мало денег
        upgradeBtn.disabled = score < next.price;
    }
}

// Запуск проверки кнопки по таймеру, чтобы она разблокировалась сразу
setInterval(updateUI, 100);
