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

  // con01 배너 슬라이드 스와이퍼
  var bnrSwiper = new Swiper(".bnrSwiper", {
    loop: true,

    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    // 화살표 버튼
    navigation: {
      nextEl: ".banner-control .btn-next",
      prevEl: ".banner-control .btn-prev",
    },
    // 숫자 페이징 설정
    pagination: {
      el: ".bn-num",
      type: "fraction",

      renderFraction: function (currentClass, totalClass) {
        return (
          '<span class="' +
          currentClass +
          '"></span>' +
          " / " +
          '<span class="' +
          totalClass +
          '"></span>'
        );
      },
      formatFractionCurrent: function (number) {
        return number < 10 ? "0" + number : number;
      },
      formatFractionTotal: function (number) {
        return number < 10 ? "0" + number : number;
      },
    },
  });
  // 관련사이트 슬라이드 일시정지 / 재생 기능
  const bannerPlayBtn = document.querySelector(".banner-control .btn-play");
  const bannerPauseImg = bannerPlayBtn.querySelector(".pause");
  const bannerPlayImg = bannerPlayBtn.querySelector(".play");

  bannerPlayBtn.addEventListener("click", function () {
    if (bnrSwiper.autoplay.running) {
      bnrSwiper.autoplay.stop();
      bannerPauseImg.style.display = "none";
      bannerPlayImg.style.display = "block";
    } else {
      bnrSwiper.autoplay.start();
      bannerPauseImg.style.display = "block";
      bannerPlayImg.style.display = "none";
    }
  });

  // con02 클릭했을 때 해당 li에 클래스
  $(".con02 li").on("click", function () {
    $(".con02 li").removeClass("on");
    $(this).addClass("on");

    gsap.fromTo(
      $(this).find(".txt02 > *"),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
    );
  });

  // con02 태블릿, 모바일에서 슬라이드로 변경
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

    // 한 번에 '한 칸'씩만 이동하라는 강력한 명령
    slidesPerGroup: 1,

    // auto 너비일 때 위치를 딱 맞게 스냅(Snap) 잡아주는 옵션
    centeredSlides: false,
    slidesOffsetBefore: 0,

    // 마우스나 터치로 밀 때 휙 날아가지 않게 고정
    freeMode: false,

    // 루프 시 슬라이드 복제 개수를 넉넉히
    loopedSlides: 10,

    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".footer-control .btn-next",
      prevEl: ".footer-control .btn-prev",
    },
  });
  // 관련사이트 슬라이드 일시정지 / 재생 기능
  const footerPlayBtn = document.querySelector(".footer-control .btn-play");
  const footerPauseImg = footerPlayBtn.querySelector(".pause");
  const footerPlayImg = footerPlayBtn.querySelector(".play");

  footerPlayBtn.addEventListener("click", function () {
    if (relSwiper.autoplay.running) {
      relSwiper.autoplay.stop();
      footerPauseImg.style.display = "none";
      footerPlayImg.style.display = "block";
    } else {
      relSwiper.autoplay.start();
      footerPauseImg.style.display = "block";
      footerPlayImg.style.display = "none";
    }
  });

  gsap.registerPlugin(ScrollTrigger);

  function createScrollAnimation(
    sectionSelector,
    targetSelector,
    extraAnimation = null,
  ) {
    const section = document.querySelector(sectionSelector);
    if (!section) return;

    const title = section.querySelector(".title-area");
    const contents = section.querySelectorAll(targetSelector);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 50%",
      },
    });

    if (title) {
      tl.from(title, { y: -50, opacity: 0, duration: 0.8, ease: "power2.out" });
    }

    tl.from(
      contents,
      {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      },
      "<",
    );

    if (extraAnimation) extraAnimation(tl);
  }
  // con01 타이틀 + 보도자료 리스트
  createScrollAnimation(".con01", ".release");
  // con02 타이틀 + 주요사업 리스트
  createScrollAnimation(".con02", ".swiper-wrapper");
  // con03 타이틀 + 링크, 비전, CS 리스트
  createScrollAnimation(".con03", ".right");
});
