// ドロワーアイコンの挙動（メニューの開閉とアイコンのアニメーション）
$(document).ready(function () {
  // ドロワーアイコンをクリックすることで発火
  $(".js-drawer").on("click", function (e) {
    e.preventDefault();

    //メニューの開閉
    let targetClass = $(this).attr("data-target");
    $("." + targetClass).toggleClass("c-drawer__iconActive");

    //ドロワーアイコン（バー）のアニメーション
    $(this).find(".c-drawer__bar").toggleClass("c-drawer__iconActive");
    $("#overlay").fadeToggle(300); // オーバーレイ（ぼかし）を一緒に表示させる

    // 背景のスクロールを制御 メニューを開いている時はスクロールさせない
    if ($("." + targetClass).hasClass("c-drawer__iconActive")) {
      $("body").css("overflow", "hidden"); // スクロールを無効化
    } else {
      $("body").css("overflow", ""); // スクロールを有効化
    }

    return false;
  });

  // ドロワーメニュー内のリンクをクリックした時の処理
  $(".l-header__listLink").on("click", function (e) {
    e.preventDefault(); // デフォルトの挙動を防止

    // 目的のセクションIDとスクロール位置を取得
    var targetId = $(this).attr("href");
    var targetPosition = $(targetId).offset().top;
    var offset = 70; // 上に余白を設定

    // スムーズスクロールを先に実行
    $("html, body").animate(
      {
        scrollTop: targetPosition - offset,
      },
      500,
      function () {
        // スクロール完了後にドロワーメニューを閉じる
        let targetClass = $(".js-drawer").attr("data-target");
        $("." + targetClass).removeClass("c-drawer__iconActive");
        $(".js-drawer").find(".c-drawer__bar").removeClass("c-drawer__iconActive");
        $("#overlay").fadeOut(300);
        $("body").css("overflow", ""); // スクロールを有効化
      }
    );
  });
});

// ギャラリーのスライダー
// SlickはPCのスタイルがデフォルトになる
$(".p-plan__slider").slick({
  autoplay: true, //自動的に動き出すか。初期値はfalse。
  autoplaySpeed: 7000, // 自動再生のスピードを7秒に設定
  infinite: true, //スライドをループさせるかどうか。初期値はtrue。
  speed: 1000, //スライドのスピード。初期値は300。
  slidesToShow: 5, //5枚の画像を表示させる
  slidesToScroll: 1, //1回のスクロールで1枚の写真を移動して見せる
  prevArrow: '<div class="slick-prev"></div>', //矢印部分PreviewのHTMLを変更
  nextArrow: '<div class="slick-next"></div>', //矢印部分NextのHTMLを変更
  centerMode: true, //画面の中心に画像を表示させる
  centerPadding: '80px',
  variableWidth: true, //左右の画像を部分的に表示させる
  dots: true, //下部ドットナビゲーションの表示

  responsive: [
    {
      breakpoint: 768, // SPサイズ
      settings: {
        centerPadding: '0px',
        dots: false
      }
    }
    // 他のブレイクポイント設定もここに追加可能
  ]
});

// 最初のTOP画像バックグラウンドからロゴが浮き出て３秒後に消える
$(function () {
  function end_loader() {
    $(".loader").fadeOut(4000, function() {
      // フェードアウト後にロゴを非表示にする
      hide_logo();
    });
  }

  function show_logo() {
    // ロゴを表示し、4000ms後にend_loaderを呼び出す
    $(".loader .loader__logo").fadeIn(600, function() {
      setTimeout(end_loader, 4000); // 4000ms後にend_loaderを呼び出す
    });
  }

  function hide_logo() {
    $(".loader .loader__logo").fadeOut(600);
  }

  $(document).ready(function () {
    // ドキュメント準備完了時にロゴを表示する
    setTimeout(show_logo, 1000);
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

// 追従するCVボタンが画面の下に来た時の挙動（位置を上に変える）
document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("cvButton"); // ボタン要素を取得
  const breakpoint = 1240; // PC表示のブレークポイント

  // スクロールイベントを監視
  function handleScroll() {
    // ページの高さ
    const pageHeight = document.documentElement.scrollHeight;
    // 現在のスクロール位置
    const scrollPosition = window.innerHeight + window.scrollY;

    // ページの最後に近づいたか判断
    if (pageHeight - scrollPosition < 100) {
      // 100は調整可能
      button.classList.add("button-up");
    } else {
      button.classList.remove("button-up");
    }
  }

  // 画面幅がブレークポイント以上の場合のみ実行
  window.addEventListener("scroll", () => {
    if (window.innerWidth >= breakpoint) {
      handleScroll();
    }
  });
});

//追従するCVボタンの表示/非表示をコントロールする
window.onload = function () {
  window.addEventListener("scroll", function () {
    var cvButton = document.querySelector(".c-cv");
    var serviceSection = document.getElementById("about");
    var orderSection = document.getElementById("flow");
    var voiceSection = document.getElementById("voice");

    // 適正な位置で表示・非表示させるように調整を施す（250px引く・1200px足す）
    var servicePosition = serviceSection.offsetTop - 250;
    var orderPosition = orderSection.offsetTop - 250;
    var orderBottom = orderPosition + orderSection.offsetHeight + 1400;
    var scrollPosition = window.scrollY;

    if (scrollPosition < servicePosition) {
      // serviceセクションより上にいる間は非表示
      cvButton.style.display = "none";
    } else if (scrollPosition >= servicePosition && scrollPosition < orderPosition) {
      // serviceセクションにいる間は表示
      cvButton.style.display = "block";
    } else if (scrollPosition >= orderPosition && scrollPosition < orderBottom) {
      // orderセクションにいる間は非表示
      cvButton.style.display = "none";
    } else if (scrollPosition >= orderBottom) {
      // orderセクションを過ぎたら常に表示
      cvButton.style.display = "block";
    }
  });
};

//orderセクション----------------------------------------------------
$(document).ready(function() {
  // ふりがなの入力欄は、平仮名だけ入力できるよう制限する
  $('#ruby-lastName').on('change', function(){
    var input = $(this).val();
    var result = input.replace(/(?=.*?[^\u3041-\u309F])[^\u3041-\u309F\s].*/, "");

    if(result !== input) {
      alert("ふりがなは平仮名のみを入力してください。");
    }

    $(this).val(result);
  });

  $('#ruby-firstName').on('change', function(){
    var input = $(this).val();
    var result = input.replace(/(?=.*?[^\u3041-\u309F])[^\u3041-\u309F\s].*/, "");

    if(result !== input) {
      alert("ふりがなは平仮名のみを入力してください。");
    }

    $(this).val(result);
  });

  // メールアドレスの入力欄の変更を監視
  $('#your-email').on('change', function(){
    var email = $(this).val();
    // メールアドレスに@が含まれているかチェック
    if(!email.includes('@')) {
      alert("有効なメールアドレスを入力してください。");
      $(this).val(''); // アラート後、入力された内容を削除
    }
  });

  // メールアドレスの入力で、アドレス不一致のとき、間違いをアラートで指摘する
  const email1Input = $('#your-email');
  const email2Input = $('#your-email2');

  function validateEmailMatch() {
    const email1 = email1Input.val().trim();
    const email2 = email2Input.val().trim();

    if (email1 !== '' && email2 !== '' && email1 !== email2) {
      alert('メールアドレスが一致しません。もう一度確認してください。');
      return false;
    };
    return true;
  };

  email1Input.blur(validateEmailMatch);
  email2Input.blur(validateEmailMatch);

  $(".p-order__button").click(function(e) {
    e.preventDefault();

    // 未入力の欄があるか確認
    const isAnyFieldEmpty = $('#ruby-lastName, #ruby-firstName, #your-email, #your-email2').filter(function() {
      return $(this).val().trim() === '';
    }).length > 0;

    if (isAnyFieldEmpty) {
      alert('未入力の欄があります。全ての項目を入力してください。');
      return;
    }

    // メールアドレスの一致を確認
    if (validateEmailMatch()) {
      var thanksSection = $('.js-thanksScroll');

      // サンクスページを表示
      $(".p-order").hide();
      $('.p-order__thanks').show();

      // Thankyou!表示までスクロール
      thanksSection.get(0).scrollIntoView({ behavior: 'smooth', block: 'start'});

      // スクロールイベントを検知して、一定位置までスクロールしたら自動的にスクロールを停止する
      $(window).on('scroll', function() {
        var scrollDistance = $(document).scrollTop();
        var thanksSectionTop = thanksSection.offset().top;

        // お礼のセクションが画面に表示されたらスクロールを停止する
        if (scrollDistance <= thanksSectionTop) {
          $(window).off('scroll'); // スクロールイベントのリスナーを解除
        };
      });
    };
  });


  // メールアドレス欄に入力された値を取得し、サンクスページに反映させる。
  const yourMailSpan = $('.js-yourMail');

  function updateYourMail() {
    const emailValue = email1Input.val().trim();
    yourMailSpan.text(emailValue);
  }

  email1Input.on('input', updateYourMail);
  email2Input.on('input', updateYourMail);
});