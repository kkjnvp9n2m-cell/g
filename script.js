 let score = 0;
let clickPower = 1;
let upgradeLevel = 0;

// Список улучшений: цена и сила клика
const upgrades = [
    { name: "Обычная", price: 100, power: 4 },
    { name: "Бронзовая", price: 400, power: 16 },
    { name: "Зеленая", price: 1600, power: 64 },
    { name: "Синяя", price: 6400, power: 256 },
    { name: "Фиолетовая", price: 25600, power: 1024 },
    { name: "Красная", price: 102400, power: 4096 },
    { name: "ЗОЛОТАЯ", price: 409600, power: 16384 }
];

// 1. Функция клика по петуху
function clickRooster(event) {
    score += clickPower;
    updateUI();
    spawnPoop();
}

// 2. Функция вылета какашек
function spawnPoop() {
    const poop = document.createElement('div');
    poop.className = 'poop-particle';
    poop.innerText = '💩';
    
    // Появляется в центре петуха
    poop.style.left = '50%';
    poop.style.top = '45%';
    
    // Случайный разлет в разные стороны
    const randomX = (Math.random() - 0.5) * 300 + 'px';
    const randomY = (Math.random() - 0.5) * 300 + 'px';
    
    poop.style.setProperty('--dx', randomX);
    poop.style.setProperty('--dy', randomY);
    
    document.body.appendChild(poop);
    
    // Удаляем какашку через 0.6 сек, когда анимация кончится
    setTimeout(() => {
        poop.remove();
    }, 600);
}

// 3. Функция покупки улучшения
function buyUpgrade() {
    if (upgradeLevel < upgrades.length) {
        let currentUpgrade = upgrades[upgradeLevel];
        
        if (score >= currentUpgrade.price) {
            score -= currentUpgrade.price;
            clickPower = currentUpgrade.power;
            upgradeLevel++;
            
            updateUI();
            
            // ПРОВЕРКА: Если куплено последнее 7-е улучшение, только тогда финал!
            if (upgradeLevel === upgrades.length) {
                const finalWin = document.getElementById('final-message');
                if (finalWin) {
                    finalWin.classList.remove('hidden');
                }
            }
        }
    }
}

// 4. Обновление интерфейса (текст, кнопки, цены)
function updateUI() {
    const scoreText = document.getElementById('score');
    const priceText = document.getElementById('price');
    const btnText = document.getElementById('btn-text');
    const upgradeBtn = document.getElementById('upgrade-btn');

    if (scoreText) scoreText.innerText = Math.floor(score);
    
    if (upgradeLevel < upgrades.length) {
        let nextUpgrade = upgrades[upgradeLevel];
        if (priceText) priceText.innerText = nextUpgrade.price;
        if (btnText) btnText.innerText = "Купить " + nextUpgrade.name + " 💩";
        
        // Кнопка активна только если хватает денег
        if (upgradeBtn) {
            upgradeBtn.disabled = score < nextUpgrade.price;
        }
    } else {
        // Если все куплено
        if (btnText) btnText.innerText = "МАКСИМУМ!";
        if (upgradeBtn) upgradeBtn.disabled = true;
    }
}

// 5. Перезагрузка игры
function restartGame() {
    location.reload();
}

// Запускаем проверку кнопок сразу при старте
setInterval(updateUI, 100);
