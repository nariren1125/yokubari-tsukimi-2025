// 画像パス情報を動的取得
let IMAGE_PATHS = {};

// ページ読み込み時に画像パス情報を取得
async function loadImagePaths() {
    try {
        const response = await fetch('/api/images/paths');
        const data = await response.json();
        IMAGE_PATHS = data.image_paths;
        console.log('画像パス読み込み完了:', IMAGE_PATHS);
    } catch (error) {
        console.error('画像パス読み込みエラー:', error);
    }
}

// 画像パス取得関数（完全に動的）
const getImagePath = (filename) => {
    return IMAGE_PATHS[filename] || IMAGE_PATHS['default.png'] || '/assets/default.png';
};

// 初期化
document.addEventListener('DOMContentLoaded', async () => {
    await loadImagePaths(); // 画像パス情報を先に読み込み
    if (typeof initializeApp === 'function') {
        initializeApp(); // その後アプリを初期化
    }
});