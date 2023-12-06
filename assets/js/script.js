// ドロワーアイコンの挙動（メニューの開閉とアイコンのアニメーション）
$(document).ready(function () {
  // ドロワーアイコンをクリックすることで発火
  $('.js-drawer').on('click', function (e) {
    e.preventDefault();

    //メニューの開閉
    let targetClass = $(this).attr('data-target');
    $('.' + targetClass).toggleClass('c-drawer__iconActive');

    //ドロワーアイコン（バー）のアニメーション
    $(this).find('.c-drawer__bar').toggleClass('c-drawer__iconActive');
    
    // 背景のスクロールを制御 メニューを開いている時はスクロールさせない
    if ($('.' + targetClass).hasClass('c-drawer__iconActive')) {
      $('body').css('overflow', 'hidden'); // スクロールを無効化
    } else {
      $('body').css('overflow', ''); // スクロールを有効化
    }

    return false;
  });

  //メニュー内のリンクをクリックした時もドロワーを閉じる
  $('.js-drawer-close').on('click', function (e) {
    $('.c-drawer__iconActive').removeClass('c-drawer__iconActive');
    $('body').css('overflow', ''); // スクロールを有効化
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

//ギャラリーのスライダー
$('.p-plan__slider').slick({
  autoplay: true, //自動的に動き出すか。初期値はfalse。
  autoplaySpeed: 5000, // 自動再生のスピードを10秒に設定
  infinite: true, //スライドをループさせるかどうか。初期値はtrue。
  speed: 1000, //スライドのスピード。初期値は300。
  slidesToShow: 3, //スライドを画面に3枚見せる
  slidesToScroll: 1, //1回のスクロールで1枚の写真を移動して見せる
  prevArrow: '<div class="slick-prev"></div>', //矢印部分PreviewのHTMLを変更
  nextArrow: '<div class="slick-next"></div>', //矢印部分NextのHTMLを変更
  centerMode: true, //要素を中央ぞろえにする
  variableWidth: true, //幅の違う画像の高さを揃えて表示
  dots: true, //下部ドットナビゲーションの表示
  responsive: [
    {
      breakpoint: 768, // 768px以上の画面サイズ
      settings: {
        slidesToShow: 5, // 5枚の画像を表示
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    }
    // 他のブレイクポイント設定もここに追加可能
  ]
});