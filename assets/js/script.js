$(document).ready(function () {
  // ドロワー
  jQuery(".js-drawer").on("click", function (e) {
    e.preventDefault();

    //メニューの開閉
    let targetClass = jQuery(this).attr("data-target");
    jQuery("." + targetClass).toggleClass("c-drawer-icon--active");

    //ドロワーアイコン（バー）のアニメーション
    jQuery(this).find(".c-drawer-icon__bars").toggleClass("c-drawer-icon--active");
    
    return false;
  });

  //メニュー内のリンクをクリックした時もドロワーを閉じる
  jQuery(".js-drawer-close").on("click", function (e) {
    jQuery(".c-drawer-icon--active").removeClass("c-drawer-icon--active");
  });
});

// スクロール検知
$(window).on("scroll", function () {
  // トップから800pxの位置以上にスクロールしたら
  if (800 < jQuery(this).scrollTop()) {
    // showクラスをつける
    jQuery('.c-to-top').addClass('c-to-top__show');
  } else {
    // 800pxを下回ったらshowクラスを削除
    jQuery('.c-to-top').removeClass('c-to-top__show');
  }
});