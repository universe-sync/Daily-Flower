$(document).ready(function () {
  // ドロワー
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