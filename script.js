console.log('تم تحميل سكربت index.html بنجاح');

const ADMIN_CODE = 'wfra1403';

let currentCategory = null;
let imageList = [];
let currentRoundIndex = 1;
let team1Score = 0;
let team2Score = 0;
let hintUsed = false;
let timer;
let timeLeft = 120;
let availableIndices = [];

const gameImage = document.getElementById('game-image');
const imageOwner = document.getElementById('image-owner');
const timerDisplay = document.getElementById('timer');
const timeInput = document.getElementById('time-input');
const hintButton = document.getElementById('hint-button');
const audio = new Audio();

function getImageUrl(basePath) {
    const extensions = ['.jpg', '.png'];
    const pathsToTry = [];
    extensions.forEach(ext => {
        pathsToTry.push(basePath.replace(/\.(jpg|png)$/i, ext));
    });
    console.log('محاولة تحميل الصورة من المسارات:', pathsToTry);
    return pathsToTry;
}

async function verifyAccessCode() {
    const code = document.getElementById('access-code').value.trim();
    console.log('إدخال الرمز:', code);

    if (!code) {
        alert('الرجاء إدخال رمز الوصول!');
        return;
    }

    if (code.toLowerCase() === ADMIN_CODE.toLowerCase()) {
        console.log('رمز الأدمن مُدخل، جارٍ التوجيه إلى admin.html...');
        window.location.href = './admin.html';
        return;
    }

    try {
        const response = await fetch('codes.json');
        const data = await response.json();
        console.log('تم تحميل codes.json:', data);

        const lowerCaseCode = code.toLowerCase();
        const validCodesLowerCase = data.validCodes.map(c => c.toLowerCase());
        console.log('الرمز المدخل (صغير):', lowerCaseCode);
        console.log('الرموز الصالحة (صغير):', validCodesLowerCase);

        if (validCodesLowerCase.includes(lowerCaseCode)) {
            console.log('الرمز صالح، جارٍ تحميل صفحة التصنيفات...');
            document.getElementById('access-code-container').style.display = 'none';
            document.getElementById('categories-container').style.display = 'block';
            await loadCategories();
        } else {
            console.log('الرمز غير صالح');
            alert('رمز غير صالح! حاول مرة أخرى.');
        }
    } catch (error) {
        console.error('خطأ في تحميل codes.json:', error);
        alert('فشل تحميل codes.json. تأكد من وجود الملف في نفس المجلد أو استخدم خادم محلي.');
    }
}

async function loadCategories() {
    try {
        const response = await fetch('categories.json');
        const data = await response.json();
        const grid = document.getElementById('categories-grid');
        grid.innerHTML = '';
        for (const category of data.categories) {
            const card = document.createElement('div');
            card.className = 'category-card';
            card.onclick = () => selectCategory(category.name);
            const img = document.createElement('img');
            const imagePaths = getImageUrl(category.image || 'assets/default_category.jpg');
            let pathIndex = 0;
            img.src = imagePaths[pathIndex];
            img.alt = category.name;
            img.onerror = () => {
                pathIndex++;
                if (pathIndex < imagePaths.length) {
                    console.error(`فشل تحميل صورة التصنيف ${category.name} من ${img.src}, جارٍ المحاولة مع ${imagePaths[pathIndex]}`);
                    img.src = imagePaths[pathIndex];
                } else {
                    console.error(`فشل تحميل صورة التصنيف ${category.name} من جميع المسارات`);
                    img.src = 'assets/default_category.jpg';
                }
            };
            const name = document.createElement('p');
            name.textContent = category.name;
            card.appendChild(img);
            card.appendChild(name);
            grid.appendChild(card);
        }
        console.log('تم تحميل categories.json بنجاح');
    } catch (error) {
        console.error('خطأ في تحميل categories.json:', error);
    }
}

async function selectCategory(category) {
    currentCategory = category;
    imageList = [];
    availableIndices = [];

    if (category === 'random') {
        try {
            const categoriesResponse = await fetch('categories.json');
            const categoriesData = await categoriesResponse.json();
            for (const cat of categoriesData.categories) {
                try {
                    const response = await fetch(`assets/${cat.name}/metadata.json`);
                    const data = await response.json();
                    const images = data.images.map((img, idx) => ({
                        ...img,
                        category: cat.name,
                        audioIndex: img.hasAudio ? idx + 1 : null
                    }));
                    imageList.push(...images);
                } catch (error) {
                    console.error(`خطأ في تحميل metadata.json لتصنيف ${cat.name}:`, error);
                }
            }
            availableIndices = Array.from({ length: imageList.length }, (_, i) => i + 1);
            console.log('تم جمع الصور من جميع التصنيفات:', imageList);
        } catch (error) {
            console.error('خطأ في تحميل categories.json للوضع العشوائي:', error);
            alert('فشل تحميل بيانات التصنيفات العشوائية.');
            return;
        }
    } else {
        try {
            const response = await fetch(`assets/${currentCategory}/metadata.json`);
            const data = await response.json();
            imageList = data.images.map((img, idx) => ({
                ...img,
                category: currentCategory,
                audioIndex: img.hasAudio ? idx + 1 : null
            }));
            availableIndices = Array.from({ length: imageList.length }, (_, i) => i + 1);
            console.log('تم تحميل metadata.json لتصنيف:', currentCategory);
        } catch (error) {
            console.error('خطأ في تحميل metadata.json:', error);
            imageList = [];
            availableIndices = [];
            alert(`فشل تحميل بيانات التصنيف ${currentCategory}.`);
            document.getElementById('categories-container').style.display = 'block';
            document.getElementById('game-container').style.display = 'none';
            return;
        }
    }

    if (imageList.length === 0) {
        alert('لا توجد صور للعرض! العودة إلى التصنيفات.');
        document.getElementById('categories-container').style.display = 'block';
        document.getElementById('game-container').style.display = 'none';
        return;
    }

    document.getElementById('categories-container').style.display = 'none';
    document.getElementById('game-container').style.display = 'flex';
    startGame();
}

async function loadAnnouncements() {
    try {
        const response = await fetch('announcements.json');
        const data = await response.json();
        const announcementsContainer = document.getElementById('announcements-container');
        announcementsContainer.innerHTML = '';
        data.announcements.forEach(announcement => {
            const announcementCard = document.createElement('div');
            announcementCard.className = 'announcement-card';
            if (announcement.title) {
                const title = document.createElement('h3');
                title.textContent = announcement.title;
                announcementCard.appendChild(title);
            }
            if (announcement.text) {
                const text = document.createElement('p');
                text.textContent = announcement.text;
                announcementCard.appendChild(text);
            }
            if (announcement.link && announcement.button) {
                const button = document.createElement('button');
                button.textContent = announcement.button;
                button.onclick = () => window.open(announcement.link, '_blank');
                announcementCard.appendChild(button);
            }
            announcementsContainer.appendChild(announcementCard);
        });
        console.log('تم تحميل announcements.json بنجاح');
    } catch (error) {
        console.error('خطأ في تحميل announcements.json:', error);
    }
}

function getRandomImageIndex() {
    if (imageList.length === 0) {
        console.error('لا توجد صور للعرض. imageList فارغة.');
        return null;
    }
    if (availableIndices.length === 0) {
        availableIndices = Array.from({ length: imageList.length }, (_, i) => i + 1);
    }
    const randomIndex = Math.floor(Math.random() * availableIndices.length);
    const selectedIndex = availableIndices.splice(randomIndex, 1)[0];
    return selectedIndex;
}

async function getImageAndAudio(index) {
    if (!index || index < 1 || index > imageList.length) {
        console.error('فهرس الصورة غير صالح:', index);
        return {
            img: 'assets/default_category.jpg',
            audio: '',
            owner: '',
            hasAudio: false,
            onError: () => {}
        };
    }

    const imageData = imageList[index - 1];
    const imgBase = `assets/${imageData.category}/${imageData.name}`;
    const audioBase = imageData.hasAudio && imageData.audioIndex ? `assets/${imageData.category}/audio${imageData.audioIndex}.mp3` : '';
    const imagePaths = getImageUrl(imgBase);
    let pathIndex = 0;
    let img = imagePaths[pathIndex];
    let audio = audioBase;
    let owner = '';
    try {
        const response = await fetch(`assets/${imageData.category}/names.json`);
        const data = await response.json();
        const ownerData = data.owners.find(o => o.image === imageData.name);
        owner = ownerData ? ownerData.name : '';
        console.log('تم تحميل names.json لتصنيف:', imageData.category);
    } catch (error) {
        console.error('خطأ في تحميل names.json:', error);
    }
    console.log('محاولة تحميل الصورة:', img);
    return {
        img,
        audio,
        owner,
        hasAudio: imageData.hasAudio,
        onError: (element) => {
            pathIndex++;
            if (pathIndex < imagePaths.length) {
                console.error(`فشل تحميل الصورة من ${element.src}, جارٍ المحاولة مع ${imagePaths[pathIndex]}`);
                element.src = imagePaths[pathIndex];
            } else {
                console.error(`فشل تحميل الصورة من جميع المسارات`);
                element.src = 'assets/default_category.jpg';
            }
        }
    };
}

function startTimer() {
    clearInterval(timer);
    timeLeft = parseInt(timeInput.value) || 120;
    updateTimerDisplay();
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert('انتهى الوقت! انتقل إلى الجولة التالية.');
            nextRound();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function playHint() {
    if (!hintButton.classList.contains('disabled')) {
        hintUsed = true;
        audio.play();
    }
}

function addScore(team) {
    const points = hintUsed ? 1 : 2;
    if (team === 1) {
        team1Score += points;
        document.getElementById('team1-score').textContent = team1Score;
    } else {
        team2Score += points;
        document.getElementById('team2-score').textContent = team2Score;
    }
}

async function nextRound() {
    hintUsed = false;
    audio.pause();
    const nextIndex = getRandomImageIndex();
    if (!nextIndex) {
        alert('لا توجد صور للعرض! العودة إلى التصنيفات.');
        document.getElementById('categories-container').style.display = 'block';
        document.getElementById('game-container').style.display = 'none';
        return;
    }
    currentRoundIndex = nextIndex;
    const { img, audio: audioUrl, owner, hasAudio, onError } = await getImageAndAudio(currentRoundIndex);
    gameImage.src = img;
    gameImage.onerror = () => onError(gameImage);
    audio.src = audioUrl;
    imageOwner.textContent = owner;
    hintButton.classList.toggle('disabled', !hasAudio);
    // لا نبدأ العداد تلقائيًا، يتم التحكم عبر زر بدء العداد
}

async function startGame() {
    await loadAnnouncements();
    const firstIndex = getRandomImageIndex();
    if (!firstIndex) {
        alert('لا توجد صور للعرض! العودة إلى التصنيفات.');
        document.getElementById('categories-container').style.display = 'block';
        document.getElementById('game-container').style.display = 'none';
        return;
    }
    currentRoundIndex = firstIndex;
    const { img, audio: audioUrl, owner, hasAudio, onError } = await getImageAndAudio(currentRoundIndex);
    gameImage.src = img;
    gameImage.onerror = () => onError(gameImage);
    audio.src = audioUrl;
    imageOwner.textContent = owner;
    hintButton.classList.toggle('disabled', !hasAudio);
    // لا نبدأ العداد تلقائيًا، يتم التحكم عبر زر بدء العداد
}

function returnToCategories() {
    clearInterval(timer);
    audio.pause();
    document.getElementById('game-container').style.display = 'none';
    document.getElementById('categories-container').style.display = 'block';
    currentCategory = null;
    imageList = [];
    availableIndices = [];
    hintUsed = false;
    timeLeft = parseInt(timeInput.value) || 120;
    updateTimerDisplay();
}

timeInput.addEventListener('change', () => {
    clearInterval(timer); // إيقاف العداد عند تغيير الوقت
    timeLeft = parseInt(timeInput.value) || 120;
    updateTimerDisplay();
});

// ربط زر بدء العداد
document.addEventListener('DOMContentLoaded', () => {
    const startTimerButton = document.getElementById('start-timer-button');
    if (startTimerButton) {
        startTimerButton.addEventListener('click', startTimer);
        console.log('تم ربط زر بدء العداد بنجاح');
    } else {
        console.error('لم يتم العثور على زر بدء العداد!');
    }
});

document.addEventListener('contextmenu', event => event.preventDefault());