// ドロワーアイコンの挙動（メニューの開閉とアイコンのアニメーション）
$(document).ready(function () {
  // ドロワーアイコンをクリックすることで発火
  jQuery(".js-drawer").on("click", function (e) {
    e.preventDefault();

    //メニューの開閉
    let targetClass = jQuery(this).attr("data-target");
    jQuery("." + targetClass).toggleClass("c-drawer__iconActive");

    //ドロワーアイコン（バー）のアニメーション
    jQuery(this).find(".c-drawer__bar").toggleClass("c-drawer__iconActive");
    
    return false;
  });

  //メニュー内のリンクをクリックした時もドロワーを閉じる
  jQuery(".js-drawer-close").on("click", function (e) {
    jQuery(".c-drawer__iconActive").removeClass("c-drawer__iconActive");
  });
});

// コンバージョンボタンが画面の下に来た時の挙動（位置を上に変える）
const button = document.getElementById('ctaButton'); // ボタン要素を取得

// スクロールイベントを監視
window.addEventListener('scroll', () => {
    // ページの高さ
    const pageHeight = document.documentElement.scrollHeight;
    // 現在のスクロール位置
    const scrollPosition = window.innerHeight + window.scrollY;
    
    // ページの最後に近づいたか判断
    if (pageHeight - scrollPosition < 100) { // 100は調整可能
        button.classList.add('button-up');
    } else {
        button.classList.remove('button-up');
    }
});