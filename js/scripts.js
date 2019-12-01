// Check to see if element is in view
function isInView(e) {
    var docTop = $(window).scrollTop();
    var docBottom = docTop + $(window).height();

    var eTop = $(e).offset().top;
    var eBottom = eTop + $(e).height();

    return ((eBottom <= docBottom) && (eTop >= docTop));
}

// Lightboxes for portfolio page
function displayImg(e) {
    // console.log(e.dataset.image);
    var lightBox = $("#" + e.dataset.image);
    lightBox.css('display', 'block');
}

function displayCmp(e) {
    var lightBox = $("#" + e.dataset.image);
    lightBox.css('display', 'inline-block');
}

$('.lightbox-close').on('click', function() {
    $('.lightbox').css('display', 'none');
    $('#room-combo').css('display', 'none');
});

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