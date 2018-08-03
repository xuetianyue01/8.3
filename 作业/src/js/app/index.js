require(["jquery", "swiper", "bscroll"], function($, swiper, bscroll) {
    var bscroll = new bscroll("#scroll", {
        click: true,
        probeType: 2,
        scrollY: true
    })

    var swiper = new swiper(".soso", {
        autoplay: true
    })

})