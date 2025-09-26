
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
    console.log('onCategoryClick called with:', type); // デバッグ追加
    
    const list = DB[type] || [];
    if (!list.length) {
      showToast("準備中です");
      return;
    }
    
    const item = pickRandom(list);
    console.log('Selected item:', item); // デバッグ追加
    
    const card = document.getElementById('product-card');
    const imgTag = item.img ? `<img src="${item.img}" alt="${item.name}">` : "";

    // 公式リンクボタンまたは注意書きを生成
    const officialContent = item.officialLink 
      ? `<a href="${item.officialLink}" target="_blank" class="official-link-btn">公式サイトへ</a>`
      : `<p class="no-link-note">公式リンクは準備中です</p>`;

    card.innerHTML = `
      <h2>${item.name}</h2>
      <p class="desc">${item.desc}</p>
      ${imgTag}
      
      <!-- ★ 3列レイアウト：左（商品情報）｜中央（Xボタン）｜右（画像注意+公式リンク） -->
      <div class="item-info-row">
        <!-- 左側：商品詳細情報 -->
        <div class="item-details">
          <p class="maker">メーカー: ${item.maker || 'メーカー情報なし'}</p>
          <p class="period">販売期間: ${item.period || '期間情報なし'}</p>
        </div>
        
        <!-- 中央：Xボタン -->
        <div class="center-section">
          <button class="tweet-btn" onclick="shareToX('${encodeURIComponent(item.tweetText || item.name + 'を発見！')}')">
            <span class="x-icon">𝕏</span> 投稿
          </button>
        </div>
        
        <!-- 右側：画像注意書き＋公式リンク -->
        <div class="share-section">
          <p class="image-note">画像はイメージです。<br>詳しくは↓をクリック</p>
          ${officialContent}
        </div>
      </div>
    `;
    
    card.hidden = false;
    card.classList.remove('show');
    requestAnimationFrame(()=>card.classList.add('show'));

    showToast(`${labelOf(type)} を選びました`);
  };

  // X投稿機能
  function shareToX(tweetText) {
    const url = `https://twitter.com/intent/tweet?text=${tweetText}`;
    window.open(url, '_blank', 'width=550,height=420');
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
