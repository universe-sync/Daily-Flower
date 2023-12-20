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
const breakpoint = 768; // TAB表示のブレークポイント

// スクロールイベントを監視
function handleScroll() {
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
}

// 画面幅がブレークポイント以下の場合のみ実行
window.addEventListener('scroll', () => {
  
  if (window.innerWidth <= breakpoint) {
      handleScroll();
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
  // responsive: [
  //   {
  //     breakpoint: 768, // 768px以上の画面サイズ
  //     settings: {
  //       slidesToShow: 5, // 5枚の画像を表示
  //       slidesToScroll: 1,
  //       infinite: true,
  //       dots: true
  //     }
  //   }
  //   // 他のブレイクポイント設定もここに追加可能
  // ]
});

// 最初のTOP画像バックグラウンドからロゴが浮き出て３秒後に消える
$(function () {
  function end_loader() {
    $(".loader").fadeOut(4000); /*フェードアウト４秒に変更*/
  }
  function show_logo() {
    $(".loader .loader__logo").fadeIn(600);
  }
  function hide_logo() {
    $(".loader .loader__logo").fadeOut(600);
  }
  $(window).on("load", function () {
    setTimeout(function () {
      show_logo();
    }, 1000);
    setTimeout(function () {
      end_loader();
    }, 4000); /*画像表示時間３秒から4秒に変更*/
  });
});

//　アコーディオン開閉ボタンをクリックでAが開く、プラスボタンがマイナスに、もう一度クリックで戻る
$(".js-accordion").on("click", function (e) {
  e.preventDefault();

  $(this).toggleClass("p-faq__minus");

  if ($(this).parent().hasClass("is-open")) {
    $(this).parent().removeClass("is-open");
    $(this).next().slideUp(500);
  } else {
    $(this).parent().addClass("is-open");
    $(this).next().slideDown(500);
  }
});