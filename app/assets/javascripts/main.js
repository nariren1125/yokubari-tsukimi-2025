
  // デバッグ用コード（修正版）
  console.log('=== ファイル読み込み確認 ===');
  console.log('DESSERT_DATA:', typeof DESSERT_DATA !== 'undefined' ? DESSERT_DATA : 'undefined');

  // 商品データベース
  const DB = {
    dessert: typeof DESSERT_DATA !== 'undefined' ? DESSERT_DATA.map(item => {
      console.log('処理中:', item.name, 'リンク:', item.officialLink);
      return {
        ...item,
        officialLink: item.officialLink || null
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
    
    // 中身を組み立てる処理を関数化
    function buildCardContent(item) {
      const imgTag = item.img ? `<img src="${item.img}" alt="${item.name}">` : "";
    
      const officialContent = item.officialLink 
        ? `<a href="${item.officialLink}" target="_blank" class="official-link-btn">公式サイトへ</a>`
        : `<p class="no-link-note">公式リンクは準備中です</p>`;
    
      return `
        <h2>${item.name}</h2>
        <p class="desc">${item.desc}</p>
        ${imgTag}
        <div class="item-info-row">
          <!-- 左下 -->
          <div class="item-details">
            <p class="maker">メーカー: ${item.maker || 'メーカー情報なし'}</p>
            <p class="period">販売期間: ${item.period || '期間情報なし'}</p>
          </div>
    
          <!-- 中央 -->
          <div class="center-section">
            <button class="tweet-btn" data-item='${JSON.stringify(item)}'>
              <span class="x-icon">𝕏</span> 投稿
            </button>
          </div>
    
          <!-- 右下 -->
          <div class="share-section">
            <p class="image-note">画像はイメージです。<br class="mobile-hide-br">詳しくは↓をクリック</p>
            ${officialContent}
          </div>
        </div>
      `;
    }

    // 既に表示されている場合 → フェードアウトしてから差し替え
    if (card.classList.contains("show")) {
      card.classList.remove("show");
      card.classList.add("hide");
  
      card.addEventListener("transitionend", function handler(){
        card.removeEventListener("transitionend", handler);
  
        // 中身差し替え
        card.innerHTML = buildCardContent(item);
  
        // フェードイン
        card.classList.remove("hide");
        requestAnimationFrame(()=>card.classList.add("show"));
      });
  
    } else {
      // 初回表示
      card.innerHTML = buildCardContent(item);
      card.hidden = false;
      requestAnimationFrame(()=>card.classList.add("show"));
    }
  
    // showToast(`${labelOf(type)} を選びました`);
  };

  // 投稿ボタンのクリックを監視
  document.addEventListener("click", function(e) {
    const btn = e.target.closest(".tweet-btn");
      if (btn) {
        const item = JSON.parse(btn.dataset.item);
      shareToX(item);
      }
  });

  // X投稿機能
  function shareToX(item) {
    const appUrl = "https://yokubari-tsukimi-2025.onrender.com/"; // 常にトップページ
    const text = `${item.tweetText || "#お月見限定商品を楽しもう"}\n${item.name} をチェック！\n${appUrl}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "width=550,height=420");
  }

  function labelOf(type){ return ({dessert:'デザート', meal:'ごはん', goods:'グッズ'}[type] || type); }

  // 既存トースト
  function showToast(text){
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = text;
    document.body.appendChild(toast);
    requestAnimationFrame(()=>toast.classList.add('show'));
    setTimeout(()=>{ toast.classList.remove('show'); setTimeout(()=>toast.remove(), 250); }, 1200);
  }
