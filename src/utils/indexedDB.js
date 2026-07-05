const DB_NAME = 'GradientMapDB';
const DB_VERSION = 2;
const IMAGES_STORE = 'images';
const GRADIENT_STORE = 'gradient';

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(IMAGES_STORE)) {
        db.createObjectStore(IMAGES_STORE);
      }
      if (!db.objectStoreNames.contains(GRADIENT_STORE)) {
        db.createObjectStore(GRADIENT_STORE);
      }
    };
  });
}

async function saveImageToDB(dataUrl) {
  try {
    const db = await openDB();
    const transaction = db.transaction([IMAGES_STORE], 'readwrite');
    const store = transaction.objectStore(IMAGES_STORE);
    store.put(dataUrl, 'uploadedImage');
    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  } catch (error) {
    console.error('Failed to save image to IndexedDB:', error);
    throw error;
  }
}

async function loadImageFromDB() {
  try {
    const db = await openDB();
    const transaction = db.transaction([IMAGES_STORE], 'readonly');
    const store = transaction.objectStore(IMAGES_STORE);
    const request = store.get('uploadedImage');
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('Failed to load image from IndexedDB:', error);
    return null;
  }
}

async function saveGradientToDB(gradientInfo) {
  try {
    const db = await openDB();
    const transaction = db.transaction([GRADIENT_STORE], 'readwrite');
    const store = transaction.objectStore(GRADIENT_STORE);
    store.put(gradientInfo, 'currentGradient');
    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  } catch (error) {
    console.error('Failed to save gradient to IndexedDB:', error);
    throw error;
  }
}

async function loadGradientFromDB() {
  try {
    const db = await openDB();
    const transaction = db.transaction([GRADIENT_STORE], 'readonly');
    const store = transaction.objectStore(GRADIENT_STORE);
    const request = store.get('currentGradient');
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('Failed to load gradient from IndexedDB:', error);
    return null;
  }
}

export { saveImageToDB, loadImageFromDB, saveGradientToDB, loadGradientFromDB };
