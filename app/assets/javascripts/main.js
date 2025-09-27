
  // デバッグ用コード（修正版）
  console.log('=== ファイル読み込み確認 ===');
  console.log('DESSERT_DATA:', typeof DESSERT_DATA !== 'undefined' ? DESSERT_DATA : 'undefined');

  // 商品データベース
  const DB = {
    dessert: typeof DESSERT_DATA !== 'undefined' ? DESSERT_DATA.map(item => {
      console.log('処理中:', item.name, 'リンク:', item.officialLink);
      return {
        ...item,
        officialLink: item.officialLink || nulls
      };
    }) : [],
    
    meal: typeof MEAL_DATA !== 'undefined' ? MEAL_DATA.map(item => ({
      ...item,
      officialLink: item.officialLink || null
    })) : [],
    
    goods: typeof GOODS_DATA !== 'undefined' ? GOODS_DATA.map(item => ({
      ...item,
      officialLink: item.officialLink || null
    })) : []
  };

  // デバッグ用コード（修正版）
  console.log('=== DB構造確認 ===');
  console.log('DB keys:', Object.keys(DB));
  console.log('dessert exists:', 'dessert' in DB);
  console.log('dessert length:', DB.dessert ? DB.dessert.length : 'undefined');

  function pickRandom(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

  // ★ 新しいレイアウトに対応したカード生成
// ✅ onCategoryClick の定義はここまででOK
window.onCategoryClick = function(type){
  console.log('onCategoryClick called with:', type); 
  
  const list = DB[type] || [];
  if (!list.length) {
    showToast("準備中です");
    return;
  }
  
  const item = pickRandom(list);
  console.log('Selected item:', item); 
  
  const card = document.getElementById('product-card');
  const defaultTitle = document.getElementById("default-title"); 

  if (defaultTitle) defaultTitle.style.display = "none";

  function buildCardContent(item){
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
          <p class="maker">メーカー: ${item.maker || 'メーカー情報なし'}</p>
          <p class="period">販売期間: ${item.period || '期間情報なし'}</p>
        </div>
        <div class="center-section">
          <button class="tweet-btn" onclick="shareToX('${encodeURIComponent(item.tweetText || item.name + 'を発見！')}')">
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

    card.addEventListener("transitionend", function handler(){
      card.removeEventListener("transitionend", handler);
      card.innerHTML = buildCardContent(item);
      card.classList.remove("hide");
      requestAnimationFrame(()=>card.classList.add("show"));
    });

  } else {
    card.innerHTML = buildCardContent(item);
    card.hidden = false;
    requestAnimationFrame(()=>card.classList.add("show"));
  }
};

// ✅ 閉じる処理
function closeCard() {
  const card = document.getElementById("product-card");
  const defaultTitle = document.getElementById("default-title");

  card.classList.remove("show");
  card.classList.add("hide");

  card.addEventListener("transitionend", function handler() {
    card.hidden = true;
    if (defaultTitle) defaultTitle.style.display = "block";
    card.removeEventListener("transitionend", handler);
  });
}

// X投稿機能
function shareToX(tweetText) {
  const url = `https://twitter.com/intent/tweet?text=${tweetText}`;
  window.open(url, '_blank', 'width=550,height=420');
}

function labelOf(type){ return ({dessert:'デザート', meal:'ごはん', goods:'グッズ'}[type] || type); }

// トースト
function showToast(text){
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = text;
  document.body.appendChild(toast);
  requestAnimationFrame(()=>toast.classList.add('show'));
  setTimeout(()=>{ toast.classList.remove('show'); setTimeout(()=>toast.remove(), 250); }, 1200);
}
