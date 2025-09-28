// ===== 商品データベース（静的ファイルから読み込み） =====
const DB = {
  dessert: typeof DESSERT_DATA !== "undefined" ? DESSERT_DATA.map(item => ({
    ...item,
    officialLink: item.officialLink || null
  })) : [],

  meal: typeof MEAL_DATA !== "undefined" ? MEAL_DATA.map(item => ({
    ...item,
    officialLink: item.officialLink || null
  })) : [],

  goods: typeof GOODS_DATA !== "undefined" ? GOODS_DATA.map(item => ({
    ...item,
    officialLink: item.officialLink || null
  })) : []
};

console.log("✅ DBロード完了:", DB);

// ===== ユーティリティ =====
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ✅ onCategoryClick の定義
window.onCategoryClick = function(type) {
  console.log("onCategoryClick called with:", type);

  const list = DB[type] || [];
  if (!list.length) {
    alert("準備中です");
    return;
  }

  const item = pickRandom(list);
  console.log("Selected item:", item);

  const card = document.getElementById("product-card");
  const defaultTitle = document.getElementById("default-title");
  if (defaultTitle) defaultTitle.style.display = "none";

  function buildCardContent(item) {
    const imgTag = item.img ? `<img src="${item.img}" alt="${item.name}">` : "";

    const officialContent = item.officialLink
      ? `<a href="${item.officialLink}" target="_blank" class="official-link-btn">公式サイトへ</a>`
      : `<p class="no-link-note">公式リンクは準備中です</p>`;

    return `
      <button class="close-btn" onclick="closeCard()">×</button>
      <h2>${item.name}</h2>
      <p class="desc">${item.desc}</p>
      ${imgTag}
      <div class="item-info-row">
        <div class="item-details">
          <p class="maker">メーカー: ${item.maker || "メーカー情報なし"}</p>
          <p class="period">販売期間: ${item.period || "期間情報なし"}</p>
        </div>
        <div class="center-section">
          <!-- onclick は書かず class のみ -->
          <button class="tweet-btn">
            <span class="x-icon">𝕏</span> 投稿
          </button>
        </div>
        <div class="share-section">
          <div class="image-note-wrapper">
            <p class="image-note">画像はイメージです。<br class="mobile-hide-br">詳しくは↓をクリック</p>
          </div>
          ${officialContent}
        </div>
      </div>
    `;
  }

  card.innerHTML = buildCardContent(item);
  card.hidden = false;
  requestAnimationFrame(()=>card.classList.add("show"));

  // ✅ 再描画後にイベントリスナーを付ける
  const tweetBtn = card.querySelector(".tweet-btn");
  if (tweetBtn) {
    tweetBtn.addEventListener("click", () => shareToX(item));
  }
};

// ✅ 閉じる処理
window.closeCard = function() {
  const card = document.getElementById("product-card");
  const defaultTitle = document.getElementById("default-title");

  card.classList.remove("show");
  card.classList.add("hide");

  card.addEventListener("transitionend", function handler() {
    card.hidden = true;
    if (defaultTitle) defaultTitle.style.display = "block";
    card.removeEventListener("transitionend", handler);
  });
};

// ===== モーダル拡大表示 =====
document.addEventListener("click", function(e) {
  const img = e.target.closest(".product-card img");
  if (img) {
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-image");
    modalImg.src = img.src;
    modal.hidden = false;
  }

  if (e.target.classList.contains("close-modal")) {
    document.getElementById("image-modal").hidden = true;
  }
});

// ✅ X投稿機能
window.shareToX = function(item) {
  console.log("shareToX called with:", item);

  const appUrl = window.location.origin;
  const text = `${item.tweetText || "#お月見限定商品を楽しもう"}\n${item.name} をチェック！`;

  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(appUrl)}`;

  console.log("tweet URL:", url);
  window.open(url, "_blank", "width=550,height=420");
};
