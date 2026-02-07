// === KONFIGURASI EMAILJS (PUNYA LU) ===
const PUBLIC_KEY = "AzEQalCh8GE2O4VYA"; // MASUKIN PUNYA LU
const SERVICE_ID = "service_eo2azzb";   // MASUKIN PUNYA LU
const TEMPLATE_ID = "template_58auaoa"; // MASUKIN PUNYA LU

(function(){
    emailjs.init(PUBLIC_KEY);
})();

// Global Variable (UPDATED TANGGAL 15)
let finalDate = "Minggu, 15 Februari 2026"; 

// === NAVIGASI ANTAR HALAMAN ===
function nextPage(pageId) {
    const currentCard = document.querySelector('.card.show');
    const targetCard = document.getElementById(pageId);

    if (currentCard) {
        currentCard.classList.remove('show');
        currentCard.classList.add('hidden');
        
        setTimeout(() => {
            currentCard.style.display = 'none';
            if (targetCard) {
                targetCard.style.display = 'flex';
                setTimeout(() => {
                    targetCard.classList.remove('hidden');
                    targetCard.classList.add('show');
                }, 50);
            }
        }, 400); 
    }
}

// === TOMBOL NO LARI ===
const btnNo = document.getElementById('btnNo');
const btnArea = document.querySelector('.button-area-p1');

function moveButton(e) {
    if(e) e.preventDefault(); 

    const areaRect = btnArea.getBoundingClientRect();
    const btnRect = btnNo.getBoundingClientRect();

    const maxX = areaRect.width - btnRect.width - 10;
    const maxY = areaRect.height - btnRect.height - 10;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    btnNo.style.position = 'absolute';
    btnNo.style.left = randomX + 'px';
    btnNo.style.top = randomY + 'px';
}

btnNo.addEventListener('mouseover', moveButton);
btnNo.addEventListener('touchstart', moveButton);
btnNo.addEventListener('click', moveButton);

// === PAGE 3: SAVE THE DATE (BISA di Tgl 15) ===
function setFixedDate() {
    finalDate = "Minggu, 15 Februari 2026";
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    nextPage('page5'); // Langsung ke Dresscode
}

// === PAGE 4: RESCHEDULE (GABISA) ===
const fp = flatpickr("#datePicker", {
    dateFormat: "l, d F Y",
    minDate: "today",
    disableMobile: "true",
    locale: "id", 
});

function checkCustomDate() {
    const pickerDate = fp.selectedDates[0];
    if (!pickerDate) {
        Swal.fire({
            icon: 'warning',
            title: 'Ups!',
            text: 'Pilih tanggal dulu dong cantik 😉',
            confirmButtonColor: '#f4b8c2'
        });
        return;
    }
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    finalDate = pickerDate.toLocaleDateString('id-ID', options);
    nextPage('page5'); // Ke Dresscode
}

// === PAGE 6: FINAL & EMAIL ===
const btnDeal = document.querySelector('#page5 .btn-primary');
btnDeal.addEventListener('click', function() {
    document.getElementById('finalDateText').innerText = finalDate;
});

function sendEmail() {
    const btn = document.getElementById('btnEmail');
    
    btn.innerText = "Sending... ⏳";
    btn.disabled = true;

    // Ganti 'Couple Abu' jadi 'Barong' di email juga
    const templateParams = {
        to_name: "Jason",
        from_name: "Gisel",
        message: `Tanggal Fix: ${finalDate} \nDresscode: Barong Kembaran 🤣`,
        reply_to: "jasonstevanuss11@gmail.com"
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
        .then(function() {
            btn.innerText = "Sent! ✅";
            
            var end = Date.now() + (1000);
            (function frame() {
                confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 } });
                confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 } });
                if (Date.now() < end) requestAnimationFrame(frame);
            }());

            Swal.fire({
                title: 'Berhasil! 💌',
                text: 'Undangan udah dikirim ke Jason. See you!',
                icon: 'success',
                confirmButtonColor: '#f4b8c2'
            });

        }, function(error) {
            btn.innerText = "Try Again";
            btn.disabled = false;
            console.error('FAILED...', error);
            Swal.fire({
                icon: 'error',
                title: 'Gagal',
                text: 'Gagal kirim email, tolong screenshot ini kirim ke Jason ya!',
            });
        });
}