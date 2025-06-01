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

// قائمة افتراضية للتصنيفات في حال فشل الوصول إلى IndexedDB
const defaultCategories = [
    { name: 'أنمي', image: 'assets/أنمي/category_image.jpg' },
    { name: 'شخصيات عامة', image: 'assets/شخصيات عامة/category_image.jpg' },
    { name: 'أفلام', image: 'assets/أفلام/category_image.jpg' },
    { name: 'رياضة', image: 'assets/رياضة/category_image.jpg' },
    { name: 'ديزني', image: 'assets/ديزني/category_image.jpg' },
    { name: 'معالم', image: 'assets/معالم/category_image.jpg' },
    { name: 'الطيبين', image: 'assets/الطيبين/category_image.jpg' },
    { name: 'ممثلين', image: 'assets/ممثلين/category_image.jpg' },
    { name: 'شعارات', image: 'assets/شعارات/category_image.jpg' }
];

// إعداد IndexedDB (للتصنيفات فقط)
const DB_NAME = 'WishNshoofDB';
const DB_VERSION = 1;
let db;

function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = event => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('categories')) {
                db.createObjectStore('categories', { keyPath: 'id' });
            }
            if (!db.objectStoreNames.contains('metadata')) {
                db.createObjectStore('metadata', { keyPath: 'category' });
            }
            if (!db.objectStoreNames.contains('names')) {
                db.createObjectStore('names', { keyPath: 'category' });
            }
        };

        request.onsuccess = event => {
            db = event.target.result;
            console.log('تم فتح قاعدة بيانات IndexedDB بنجاح');
            resolve(db);
        };

        request.onerror = event => {
            console.error('خطأ في فتح IndexedDB:', event.target.error);
            reject(event.target.error);
        };
    });
}

// دالة لتحديث البيانات في IndexedDB
async function updateIndexedDB() {
    if (!isOfflineOrPWA()) {
        try {
            console.log('جارٍ تحديث البيانات في IndexedDB...');
            // جلب categories.json
            const categoriesResponse = await fetch('categories.json');
            const categoriesData = await categoriesResponse.json();
            const transaction = db.transaction(['categories'], 'readwrite');
            const categoriesStore = transaction.objectStore('categories');
            categoriesStore.put({ id: 'categories', data: categoriesData.categories });
            console.log('تم تحديث categories في IndexedDB بنجاح');

            // جلب metadata.json و names.json لكل تصنيف
            for (const category of categoriesData.categories) {
                try {
                    const metadataResponse = await fetch(`assets/${category.name}/metadata.json`);
                    const metadataData = await metadataResponse.json();
                    const metadataTransaction = db.transaction(['metadata'], 'readwrite');
                    const metadataStore = metadataTransaction.objectStore('metadata');
                    metadataStore.put({ category: category.name, data: metadataData });
                    console.log(`تم تحديث metadata لتصنيف ${category.name} في IndexedDB`);

                    const namesResponse = await fetch(`assets/${category.name}/names.json`);
                    const namesData = await namesResponse.json();
                    const namesTransaction = db.transaction(['names'], 'readwrite');
                    const namesStore = namesTransaction.objectStore('names');
                    namesStore.put({ category: category.name, data: namesData });
                    console.log(`تم تحديث names لتصنيف ${category.name} في IndexedDB`);
                } catch (error) {
                    console.warn(`خطأ في تحميل بيانات تصنيف ${category.name}:`, error);
                }
            }
        } catch (error) {
            console.warn('خطأ في تحديث IndexedDB:', error);
        }
    }
}

// دالة لجلب البيانات من IndexedDB
async function getFromIndexedDB(storeName, key) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.get(key);

        request.onsuccess = () => {
            resolve(request.result ? request.result.data : null);
        };

        request.onerror = () => {
            console.error(`خطأ في جلب البيانات من ${storeName} في IndexedDB:`, request.error);
            reject(request.error);
        };
    });
}

// دالة للتحقق مما إذا كان المستخدم أوفلاين أو في وضع PWA
function isOfflineOrPWA() {
    return !navigator.onLine || window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
}

function getImageUrl(basePath) {
    const extensions = ['.jpg', '.png'];
    const pathsToTry = [];
    extensions.forEach(ext => {
        pathsToTry.push(basePath.replace(/\.(jpg|png)$/i, ext));
    });
    console.log('محاولة تحميل الصورة من المسارات:', pathsToTry);
    return pathsToTry;
}

// دالة لتأخير التنفيذ (debounce) لمنع التكرار السريع للطلبات
let isVerifying = false;
async function verifyAccessCode() {
    if (isVerifying) {
        console.log('جارٍ التحقق من الرمز، يرجى الانتظار...');
        return;
    }

    isVerifying = true;
    try {
        // إذا كان المستخدم أوفلاين أو في وضع PWA، تخطي التحقق من الرمز
        if (isOfflineOrPWA()) {
            console.log('أوفلاين أو في وضع PWA، تخطي التحقق من الرمز...');
            document.getElementById('access-code-container').style.display = 'none';
            document.getElementById('categories-container').style.display = 'block';
            await loadCategories();
            return;
        }

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

        // جلب codes.json مباشرة من الخادم مع تجاوز الكاش
        const response = await fetch('codes.json', { cache: 'no-store' });
        const data = await response.json();
        console.log('تم تحميل codes.json مباشرة من الخادم:', data);

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
    } finally {
        isVerifying = false;
    }
}

async function loadCategories() {
    const grid = document.getElementById('categories-grid');
    grid.innerHTML = '';
    let categories = [];

    try {
        categories = await getFromIndexedDB('categories', 'categories');
        if (!categories) {
            throw new Error('فشل تحميل التصنيفات من IndexedDB');
        }
        console.log('تم تحميل التصنيفات من IndexedDB بنجاح');
    } catch (error) {
        console.warn('خطأ في تحميل التصنيفات من IndexedDB، استخدام قائمة افتراضية:', error);
        categories = defaultCategories;
    }

    if (!categories || categories.length === 0) {
        console.warn('لا توجد تصنيفات للعرض.');
        return;
    }

    // عرض كل التصنيفات من defaultCategories حتى لو ما كان فيه metadata
    const availableCategories = categories;

    for (const category of availableCategories) {
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
}

async function selectCategory(category) {
    currentCategory = category;
    imageList = [];
    availableIndices = [];

    if (category === 'random') {
        try {
            const categories = await getFromIndexedDB('categories', 'categories') || defaultCategories;
            for (const cat of categories) {
                try {
                    const metadata = await getFromIndexedDB('metadata', cat.name);
                    if (metadata) {
                        const images = metadata.images.map((img, idx) => ({
                            ...img,
                            category: cat.name,
                            audioIndex: img.hasAudio ? idx + 1 : null
                        }));
                        imageList.push(...images);
                    }
                } catch (error) {
                    console.warn(`خطأ في تحميل بيانات تصنيف ${cat.name} من IndexedDB، سيتم الاستمرار بدون هذا التصنيف:`, error);
                }
            }
            availableIndices = Array.from({ length: imageList.length }, (_, i) => i + 1);
            console.log('تم جمع الصور من جميع التصنيفات:', imageList);
        } catch (error) {
            console.error('خطأ في تحميل التصنيفات للوضع العشوائي من IndexedDB:', error);
            alert('فشل تحميل بيانات التصنيفات العشوائية.');
            return;
        }
    } else {
        try {
            const metadata = await getFromIndexedDB('metadata', currentCategory);
            if (metadata) {
                imageList = metadata.images.map((img, idx) => ({
                    ...img,
                    category: currentCategory,
                    audioIndex: img.hasAudio ? idx + 1 : null
                }));
                availableIndices = Array.from({ length: imageList.length }, (_, i) => i + 1);
                console.log('تم تحميل بيانات تصنيف:', currentCategory);
            } else {
                throw new Error(`بيانات تصنيف ${currentCategory} غير موجودة في IndexedDB`);
            }
        } catch (error) {
            console.warn(`خطأ في تحميل بيانات تصنيف ${currentCategory} من IndexedDB، سيتم العودة إلى التصنيفات:`, error);
            document.getElementById('categories-container').style.display = 'block';
            document.getElementById('game-container').style.display = 'none';
            return;
        }
    }

    if (imageList.length === 0) {
        console.warn('لا توجد صور للعرض! العودة إلى التصنيفات.');
        document.getElementById('categories-container').style.display = 'block';
        document.getElementById('game-container').style.display = 'none';
        return;
    }

    document.getElementById('categories-container').style.display = 'none';
    document.getElementById('game-container').style.display = 'flex';
    startGame();
}

async function loadAnnouncements() {
    // تحميل الإعلانات فقط إذا كان المستخدم أونلاين وليس في وضع PWA
    if (isOfflineOrPWA()) {
        console.log('أوفلاين أو في وضع PWA، تخطي تحميل الإعلانات...');
        return;
    }

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
        const namesData = await getFromIndexedDB('names', imageData.category);
        if (namesData) {
            const ownerData = namesData.owners.find(o => o.image === imageData.name);
            owner = ownerData ? ownerData.name : '';
            console.log('تم تحميل بيانات المالك لتصنيف:', imageData.category);
        }
    } catch (error) {
        console.warn('خطأ في تحميل بيانات المالك من IndexedDB، سيتم الاستمرار بدون بيانات المالك:', error);
        owner = ''; // تجاهل الخطأ واستمر
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
    // تحميل الإعلانات فقط في الوضع الأونلاين (تم التحكم في هذا في loadAnnouncements)
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

// دالة لإظهار زر التثبيت
let deferredPrompt;
function showInstallPrompt() {
    const installButton = document.getElementById('install-button');

    // إظهار الزر فقط إذا كان المستخدم أونلاين وليس في وضع PWA
    if (!isOfflineOrPWA()) {
        installButton.style.display = 'block';
    } else {
        installButton.style.display = 'none';
    }

    // التقاط حدث التثبيت
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        if (!isOfflineOrPWA()) {
            installButton.style.display = 'block';
        }
    });

    installButton.addEventListener('click', () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('المستخدم وافق على تثبيت اللعبة');
                    installButton.style.display = 'none';
                } else {
                    console.log('المستخدم رفض تثبيت اللعبة');
                }
                deferredPrompt = null;
            });
        } else {
            alert('لتشغيل اللعبة أوفلاين، انقر على "إضافة إلى الشاشة الرئيسية" من قائمة المتصفح.');
        }
    });
}

timeInput.addEventListener('change', () => {
    clearInterval(timer); // إيقاف العداد عند تغيير الوقت
    timeLeft = parseInt(timeInput.value) || 120;
    updateTimerDisplay();
});

// ربط الأزرار وتحميل الإعلانات عند بدء الصفحة
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await openDB(); // فتح قاعدة البيانات عند بدء الصفحة
        await updateIndexedDB(); // تحديث البيانات في IndexedDB عند بدء الصفحة
    } catch (error) {
        console.error('فشل فتح قاعدة البيانات IndexedDB أو تحديث البيانات:', error);
    }

    // تحميل الإعلانات (سيتم التحكم في هذا في loadAnnouncements)
    loadAnnouncements();
    console.log('جارٍ تحميل الإعلانات عند بدء الصفحة');

    // إظهار زر التثبيت
    showInstallPrompt();

    // ربط زر بدء العداد
    const startTimerButton = document.getElementById('start-timer-button');
    if (startTimerButton) {
        startTimerButton.addEventListener('click', startTimer);
        console.log('تم ربط زر بدء العداد بنجاح');
    } else {
        console.error('لم يتم العثور على زر بدء العداد!');
    }

    // ربط زر بداية عشوائية
    const randomStartButton = document.getElementById('random-start');
    if (randomStartButton) {
        randomStartButton.addEventListener('click', () => selectCategory('random'));
        console.log('تم ربط زر بداية عشوائية بنجاح');
    } else {
        console.error('لم يتم العثور على زر بداية عشوائية!');
    }
});

document.addEventListener('contextmenu', event => event.preventDefault());