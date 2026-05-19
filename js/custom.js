$(function () {
  let total = $(".bg li").length;
  // console.log(total);
  let i = 0;
  let stop;

  start();
  // 페이드 함수
  function fade() {
    //전체 페이드 안보이게, i번째만 페이드인
    $(".bg li").stop().fadeOut();
    $(".bg li").eq(i).stop().fadeIn();
    // 클래스 제거, i번째만 클래스
    $(".bg li").removeClass("on");
    $(".bg li").eq(i).addClass("on");
    //비주얼 메뉴 클래스 제거, i번째만 클래스
    $(".visual-menu li").removeClass("on");
    $(".visual-menu li").eq(i).addClass("on");
    // 비주얼 메뉴에 맞틑 서브메뉴만 보이게
    $(".sub-menu ul").removeClass("on");
    $(".sub-menu ul").eq(i).addClass("on");
    // 프레그레스바 채워짐
    $(".bar").css({ width: "0" });
    $(".bar").stop().animate({ width: "100%" }, 2000);
  }

  //자동 함수
  function start() {
    stop = setInterval(function () {
      if (i === total - 1) {
        i = 0;
      } else {
        i++;
      }
      fade();
    }, 3000);
  }

  $(".visual-menu li").on("click", function () {
    clearInterval(stop);
    i = $(this).index();
    fade();
    start();
  });

  // con01 보도자료 배너 슬라이드 스와이퍼
  var bnrswiper = new Swiper(".bnrSwiper", {
    loop: true,
    speed: 1000,

    spaceBetween: 10,
    centeredSlides: true,

    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  });

  // con02 클릭했을 때 해당 li에 클래스
  $(".con02 li").on("click", function () {
    $(".con02 li").removeClass("on");
    $(this).addClass("on");
  });

  //
  var moSwiper = new Swiper(".moSwiper", {
    slidesPerView: "auto", // CSS에 정해둔 너비(320px)를 따름
    spaceBetween: 10, // 슬라이드 간격
    centeredSlides: false, // 왼쪽 벽에 딱 붙임
    scrollbar: {
      el: ".swiper-scrollbar",
      draggable: true,
      hide: false,
    },
    // 기본 활성화
    enabled: true,

    breakpoints: {
      // 1025px 이상일 때는 기능을 끔 (데스크톱)
      1025: {
        enabled: false,
      },
      // 1024px 이하일 때는 기능을 켬
      1024: {
        enabled: true,
      },
    },
  });

  // 관련사이트 슬라이드 스와이퍼
  var relSwiper = new Swiper(".relSwiper", {
    slidesPerView: "auto",
    spaceBetween: 30,
    loop: true,

    // [필수] 한 번에 '한 칸'씩만 이동하라는 강력한 명령
    slidesPerGroup: 1,

    // [필수] auto 너비일 때 위치를 딱 맞게 스냅(Snap) 잡아주는 옵션
    centeredSlides: false,
    slidesOffsetBefore: 0,

    // [중요] 마우스나 터치로 밀 때 휙 날아가지 않게 고정
    freeMode: false,

    // [중요] 루프 시 슬라이드 복제 개수를 넉넉히 (안 주면 빈 공간 생김)
    loopedSlides: 10,

    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".btn-next",
      prevEl: ".btn-prev",
    },
  });
  // 관련사이트 슬라이드 일시정지 / 재생 기능
  $(".related .btn-play .pause").on("click", function () {
    relswiper.autoplay.stop();
    $(this).hide();
    $(this).siblings(".play").show(); // 내 형제인 play는 보이고
  });
  $(".related .btn-play .play").on("click", function () {
    relswiper.autoplay.start();
    $(this).hide();
    $(this).siblings(".pause").show(); // 내 형제인 pause는 보이고
  });
});
