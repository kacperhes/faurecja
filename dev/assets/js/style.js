$(document).ready(() => {

    var scrollTop = 0;
    $(window).scroll(function(){
        scrollTop = $(window).scrollTop();
        if (scrollTop >= 100) {
            $('#navbar').addClass('scrolled-nav');
            $('.navbar-brand img').attr("src", "./assets/img/logo.svg");
        } else if (scrollTop < 100) {
            $('#navbar').removeClass('scrolled-nav');
            $('.navbar-brand img').attr("src", "./assets/img/logo.png");
        }

    });

    $('#burger, .smooth').click( () => {
        $(this).toggleClass('active');
        $('#overlay').toggleClass('open');
    });

    //Smoth scrolling
    $('a[href*="#"]')
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function(event) {
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                &&
                location.hostname == this.hostname
            ) {
                let target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000, function() {
                        let $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) {
                            return false;
                        } else {
                            $target.attr('tabindex','-1');
                            $target.focus();
                        }
                    });
                }
            }
        });

});

