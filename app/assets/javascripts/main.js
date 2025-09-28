// ===== Railsからデータを取得してDBに格納 =====
window.DB = { meal: [], dessert: [], goods: [] };

async function fetchItems() {
  try {
    const res = await fetch("/items.json");
    const items = await res.json();

    // Railsから来るimgは相対パスなので、絶対パスに直す
    const withImageUrl = items.map(i => ({
      ...i,
      img: i.img ? `/assets/${i.img}` : null
    }));

    // カテゴリごとに仕分け
    window.DB = {
      meal: withImageUrl.filter(i => i.category === "meal"),
      dessert: withImageUrl.filter(i => i.category === "dessert"),
      goods: withImageUrl.filter(i => i.category === "goods")
    };

    console.log("✅ DBロード完了:", window.DB);
  } catch (err) {
    console.error("❌ アイテム取得失敗:", err);
  }
}

document.addEventListener("DOMContentLoaded", fetchItems);

// ===== ユーティリティ =====
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ✅ onCategoryClick の定義
window.onCategoryClick = function(type) {
  console.log("onCategoryClick called with:", type);

  const list = window.DB[type] || [];
  if (!list.length) {
    showToast("準備中です");
    return;
  }

  const item = pickRandom(list);
  console.log("Selected item:", item);

  const card = document.getElementById("product-card");
  const defaultTitle = document.getElementById("default-title");

  if (defaultTitle) defaultTitle.style.display = "none";

  function buildCardContent(item) {
    const imgTag = item.img
      ? `<img src="${item.img}" alt="${item.name}">`
      : "";

    const officialContent = item.official_link
      ? `<a href="${item.official_link}" target="_blank" class="official-link-btn">公式サイトへ</a>`
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
          <button class="tweet-btn" onclick='shareToX(${JSON.stringify(item)})'>
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

  if (card.classList.contains("show")) {
    card.classList.remove("show");
    card.classList.add("hide");

    card.addEventListener("transitionend", function handler() {
      card.removeEventListener("transitionend", handler);
      card.innerHTML = buildCardContent(item);
      card.classList.remove("hide");
      requestAnimationFrame(() => card.classList.add("show"));
    });
  } else {
    card.innerHTML = buildCardContent(item);
    card.hidden = false;
    requestAnimationFrame(() => card.classList.add("show"));
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
  const appUrl = `${window.location.origin}/items/${item.id}`;
  const text = `${item.tweet_text || "#お月見限定商品を楽しもう"}\n${item.name} をチェック！\n${appUrl}`;
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "width=550,height=420");
};
