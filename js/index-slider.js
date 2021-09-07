
/**
 * Jquery Core 3.6.0 uncompressed
 */

$(function () {

    var isAnimated = false;
    // 애니메이션이 진행중인 경우 true를, 아닌경우 false를 반환함

    // 다음 슬라이드 버튼 이벤트
    $(".slide-arrow .right").click(function () {
        if (!isAnimated) {
            isAnimated = true;
            var pos = $(".visual-slide-list li.on").position().left;
            var index = $(".visual-slide-list li.on").index() + 1;
            if (index > $(".visual-slide-list li").length - 1) { index = 0; }
            nextSlide(index, pos);
            slidePager(index);
        }
        return false;
    });

    // 이전 슬라이드 버튼 이벤트
    $(".slide-arrow .left").click(function () {
        if (!isAnimated) {
            isAnimated = true;
            var pos = $(".visual-slide-list li.on").position().left;
            var index = $(".visual-slide-list li.on").index() - 1;
            if (index < 0) { index = $(".visual-slide-list li").length - 1; }
            prevSlide(index, pos);
            slidePager(index);
        }
        return false;
    });

    // 다음 슬라이드
    function nextSlide(index, pos) {
        $(".visual-slide-list li").eq(index).css("left", pos);
        $(".visual-slide-list li.on").css("z-index", 45);
        $(".visual-slide-list li.on").animate({ opacity: 0, left: pos + 200 }, 1000, function () {
            $(this).removeClass("on");
        });
        $(".visual-slide-list li").eq(index).css("left", pos - 200);
        $(".visual-slide-list li").eq(index).delay(200).animate({ opacity: 1, left: pos }, 1000, function () {
            isAnimated = false;
            $(this).addClass("on");
            $(".visual-slide-list li.on").css("z-index", 50);
        });
        nextSlideBack(index);
    }

    // 이전 슬라이드
    function prevSlide(index, pos) {
        $(".visual-slide-list li").eq(index).css("left", pos);
        $(".visual-slide-list li.on").css("z-index", 45);
        $(".visual-slide-list li.on").animate({ opacity: 0, left: pos - 200 }, 1000, function () {
            $(this).removeClass("on");
        });
        $(".visual-slide-list li").eq(index).css("left", pos + 200);
        $(".visual-slide-list li").eq(index).delay(200).animate({ opacity: 1, left: pos }, 1000, function () {
            isAnimated = false;
            $(this).addClass("on");
            $(".visual-slide-list li.on").css("z-index", 50);
        });
        nextSlideBack(index);
    }

    // 슬라이드 배경 애니메이션
    function nextSlideBack(index) {
        $(".visual-slide-img-list li.on").animate({ opacity: 0 }, 1000, function () {
            $(this).removeClass("on");
        });
        $(".visual-slide-img-list li").eq(index).animate({ opacity: 1 }, 1000, function () {
            $(this).addClass("on");
        });
    }

    // 슬라이드 하단 네비게이션
    function slidePager(index) {
        $(".slide-pager li").removeClass("on");
        $(".slide-pager li").eq(index).addClass("on");
    }

    $(".slide-pager li").click(function () {
        var index = $(".visual-slide-img-list li.on").index();
        var pos = $(".visual-slide-list li.on").position().left;
        if (!isAnimated && index != $(this).index()) {
            isAnimated = true;
            nextSlide($(this).index(), pos);
            slidePager($(this).index());
        }
    });

    // 4초 간격 자동 슬라이드
    function autoSlide() {
        $(".slide-arrow .right").trigger("click");
    }
    setInterval(autoSlide, 4000);

});