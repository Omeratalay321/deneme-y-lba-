// TEST İÇİN: Bugünün tarihini al ve saati 18:12:00 yap
const nowTest = new Date();
const targetTime = new Date(nowTest.getFullYear(), nowTest.getMonth(), nowTest.getDate(), 18, 12, 0).getTime();

const container = document.getElementById('question-marks-container');

// Soru İşaretleri Üretici
function createQuestionMark() {
    const q = document.createElement('div');
    q.className = 'question-mark';
    q.innerText = '?';
    q.style.left = Math.random() * 100 + 'vw';
    container.appendChild(q);
    setTimeout(() => { q.remove(); }, 4000);
}

let qInterval = setInterval(createQuestionMark, 250);

// Sayaç Fonksiyonu
const timer = setInterval(() => {
    const now = new Date().getTime();
    const diff = targetTime - now;

    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        countdownElement.innerText = 
            (h < 10 ? "0"+h : h) + ":" + 
            (m < 10 ? "0"+m : m) + ":" + 
            (s < 10 ? "0"+s : s);
    }

    // Zaman Dolduğunda
    if (diff <= 0) {
        clearInterval(timer);
        clearInterval(qInterval); 
        
        if (countdownElement) countdownElement.style.display = 'none';
        
        const allQuestions = document.querySelectorAll('.question-mark');
        allQuestions.forEach(el => el.style.opacity = '0');

        setTimeout(() => {
            const box = document.getElementById('gift-box');
            if (box) {
                box.innerHTML = '🎊';
                box.classList.add('open');
            }
            const msg = document.getElementById('surprise-message');
            if (msg) msg.classList.add('show');
        }, 800);
    }
}, 1000);
