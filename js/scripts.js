// Check to see if element is in view
function isInView(e) {
    var docTop = $(window).scrollTop();
    var docBottom = docTop + $(window).height();

    var eTop = $(e).offset().top;
    var eBottom = eTop + $(e).height();

    return ((eBottom <= docBottom) && (eTop >= docTop));
}

$(document).ready(function() {
    $(window).scroll(function() {
        $('.scroll-animated .animated').each(function() {
            if (isInView(this) === true) {
                $(this).addClass('fadeInLeft');
            }
            // console.log("foreach fired");
        });
        // console.log("window scrolled");
    });
});