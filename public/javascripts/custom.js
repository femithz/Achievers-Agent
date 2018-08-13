/*global $ ,jQuery ,alert, console, Typed, google */

// Loading Screen 
    
$(window).on('load', function () {
    
    "use strict";

    $('.loading-overlay .sk-cube-grid').fadeOut(1000, function () {

        $(this).parent().fadeOut(1000, function () {

            $('body').css('overflow', 'auto');
//            $(this).remove();

        });

    });

});
$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
})
$(document).ready(function () {
   
    "use strict";
    
    var sections = $('section'),
        documentEl = $(document),
        parallaxBg = $('.header-paralax'),
        nav = $('.nav-item'),
        nav_height = nav.outerHeight(),
        smoothScroll = $("nav ul li a"),
        progressBar = $(".progress-bar"),
        scrolltop = $('.scrolltop'),
        colors   = $('.color-option .colors li'),
        dl   = $('.color-option .dl li'),
        // Typed Plugin
        typed = new Typed('.type', {
            strings: ["Frontend Developer.", "Web Designer.", "Graphic Designer."], /* Here Type Your Title */
            typeSpeed: 100,
            loop: true,
            backDelay: 1200,
            backSpeed: 20
        });
    
    // Horizontal Navbar
    
    $('.nav-toggle').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('.navbar').toggleClass('open');
        $('.navbar .nav-item').toggleClass('show-li-nav');
        $('.nav-toggle').toggleClass('toggle');
    });
    
    $('.navbar-toggler').on('click', function (e) {
        
        $('.navbar-toggler .menu').toggleClass('toggle');
        
    });
    
    $('.navbar-toggler').on('click', function () {
        
        $('.navbar').toggleClass('open-nav');
        
    });
        
    $('html').on('keydown', function (e) {
        
        if (e.keyCode === 27) { // ESC
             
            if ($('.navbar').hasClass('open')) {
                $('.navbar').removeClass('open');
                $('.navbar .nav-item').removeClass('show-li-nav');
                $('.nav-toggle').removeClass('toggle');
            }
             
        }
        
    });
    
    // Vertical Navbar 
    
    $('.navbar .collapse-menu').on('click', 'span', function () {
        $('.navbar, .name-menu, .navbar-brand img, .collapse-name, .header .title, .nav-item i, .header .down a i, section, footer, .btn-manisa').toggleClass('close-menu');
        $('.collapse-icon').toggleClass('closed-menu').toggleClass('open-menu');
    });
    
    
    // Smooth Scroll Down
    
    smoothScroll.on("click", function () {
        
        $("html, body").animate({
            
            scrollTop : $("#" + $(this).data("value")).offset().top
            
        }, 1000);
        
        
    });
    
    $(".header .down").on("click", function () {
        
        $("html, body").animate({
            
            scrollTop : $("#about").offset().top
            
        }, 1000);
        
    });
    
    $(".header .title a").on("click", function () {
        
        $("html, body").animate({
            
            scrollTop : $("#portfolio").offset().top
            
        }, 1000);
        
    });
    
    $(".price .pricing-button").on("click", function () {
        
        $("html, body").animate({
            
            scrollTop : $("#contact").offset().top
            
        }, 1000);
        
    });
    
    $(window).on("scroll", function () {
        
        if ($(document).scrollTop() > 400) {
            
            $('.social-media').addClass('open-social');
            
        } else {
            
            $('.social-media').removeClass('open-social');
            
        }
    });
    
    
    $(window).on("scroll", function () {
        
        if ($(document).scrollTop() >= 850) {
            
            $('.educ .education .title').addClass('open-timeline');
            
        } else {
            
            $('.educ .education .title').removeClass('open-timeline');
            
        }
    });
    
    // Active Class On Scroll 
    
    $(window).on('scroll', function () {
        
        var cur_pos = $(this).scrollTop();
        
        sections.each(function () {
            
            var top = $(this).offset().top - nav_height,
                bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                
                nav.find('a').removeClass('active-nav');
                sections.removeClass('active-nav');

                $(this).addClass('active-nav');
                nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active-nav');
                
            }
        });
    });
    
    // Progress Bar
    
    progressBar.each(function () {
        var progressBarWidth = $(this).data('present');
        /*-- Skill Animation --*/
        $(this).css({
            "opacity": "1",
            "width": progressBarWidth
        });
    });
    
    // Counter Up
    
    $('.counter').counterUp({
        delay: 20,
        time: 1500
    });
    
    // Active Shuffle
    
    $('.portfolio .shuffle ul li').on('click', function () {
        
        $(this).addClass('active').siblings().removeClass('active');
        if ($(this).data('class') === 'all') {
            $('.gallery .col-lg-4').css({
                opacity: 1,
                'pointer-events': 'auto'
            }, 200);
        } else {
            $('.gallery .col-lg-4').css({
                opacity: 0.2,
                'pointer-events': 'none'
            }, 200);
            $($(this).data('class')).parent().css({
                opacity: 1,
                'pointer-events': 'auto'
            }, 200);
        }
        
    });
    
    
    // Show More / Show Less Button
    
    $('.show-more, .show-less').on("click", function () {
        
        $('.portfolio .gallery .less').fadeIn(1000, function () {
            
            $('.show-more').hide();
            $('.show-less').show();
            $('.show-less').on("click", function () {
                
                $('.portfolio .gallery .less').fadeOut(500);
                $('.show-less').hide(200);
                $('.show-more').show(200);
            });
            
        });
        
    });
    
    // Testim Slider
    $('.testim-slider').each(function () {
        $(this).slick({
            infinite: true,
            speed: 500,
            fade: true,
            cssEase: 'linear',
            autoplay: true,
            arrows: true,
            appendArrows: $('.slider-arrows'),
            prevArrow: '<span class="slick-prev"> <i class="fa fa-angle-up"></i> </span>',
            nextArrow: '<span class="slick-next"> <i class="fa fa-angle-down"></i> </span>'
        });
    });
    
    // Google Map
    
    function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 4,
            center: {lat: -33, lng: 151},
            zoomControl: false,
            scaleControl: false,
            mapTypeControl: false
        });
    }
    
    // Remove The Scroll To Zoom Google Maps
    
    $('#map').addClass('scrolloff');
    $('#overlay').on("mouseup", function () {
        $('#map').addClass('scrolloff');
    });
    
    $('#overlay').on("mousedown", function () {
        $('#map').removeClass('scrolloff');
    });
    
    $("#map").mouseleave(function () {
        $('#map').addClass('scrolloff');
    });
    
    // Scroll Top 
    
    
    $(window).on("scroll", function () {
        
        var sc = $(this).scrollTop();
        if (sc > 1700) {
            scrolltop.fadeIn(1000);
        } else {
            scrolltop.fadeOut(1000);
        }
        
    });
    
    scrolltop.on("click", function () {
        
        $('html, body').animate({
            scrollTop: 0
        }, 1000);
        
    });
    
    // Change Template Colors
    
    colors.eq(0).css("backgroundColor", "#019d9b").end()
           .eq(1).css("backgroundColor", "#795649").end()
           .eq(2).css("backgroundColor", "#2eca7f").end()
           .eq(3).css("backgroundColor", "#cc2d50").end()
           .eq(4).css("backgroundColor", "#928928").end()
           .eq(5).css("backgroundColor", "#de6c04").end()
           .eq(6).css("backgroundColor", "#5a7f95").end()
           .eq(7).css("backgroundColor", "#29B6F6");

    colors.on('click', function () {
        
        $("link[href*='color']").attr("href", $(this).attr("data-value"));
        
    });
    
    dl.eq(0).css("backgroundColor", "#1E1E1E").end()
        .eq(1).css("backgroundColor", "#FFF");
    
    dl.on('click', function () {
        
        $("link[href*='template']").attr("href", $(this).attr("data-value"));
        
    });
    
    // Show Color Option Div When Click On The Gear
    
    $(".option-box .gear-check").on("click", function (e) {
        e.preventDefault();
        
        if ($(this).hasClass("slide_in_out")) {
            $(".option-box").stop().animate({right: "0px"}, 500);
            $(".color-option").stop().animate({right: "-185px"}, 500);
        } else {
            $(".option-box").stop().animate({right: "178px"}, 500);
            $(".color-option").stop().animate({right: "0"}, 500);
        }
        
        $(this).toggleClass("slide_in_out");
        return false;
        
    });
    
    // Slider Background
    
    $('.slider').slick({
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        autoplay: true,
        autoplaySpeed: 5000,
        prevArrow: '<span class="slick-prev"> < </span>',
        nextArrow: '<span class="slick-next"> > </span>'
    });
    
    // Paralax

    documentEl.on('scroll', function () {
                   
        var currScrollPos = documentEl.scrollTop();
                   
        parallaxBg.css('background-position', '0 ' + -currScrollPos / 4 + 'px');
    
    });
    
});

// For Demo
    
$(document).ready(function () {
    
    "use strict";

    $(".header-demo .demo button").on("click", function () {

        $("html, body").animate({

            scrollTop : $("#demos").offset().top

        }, 1000);

    });
});






