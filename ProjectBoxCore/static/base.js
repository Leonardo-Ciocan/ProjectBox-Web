var SHADE_SHIFT_AMOUNT;
var boxes_shown = false;
$(document).ready(function () {
    //$.material.init();


    $("#boxes").click(function (event) {
        event.stopPropagation();
        $(".side-panel").animate({ "left": boxes_shown ? "-350px":"0px" }, 300);
        boxes_shown = !boxes_shown;
    });

    $(".user").click(function(){
        event.stopPropagation();
        $(".user-panel").animate({ "right": "0px" }, 300);
        boxes_shown = false;
    });

    $('html').click(function () {
        $(".side-panel").animate({ "left": "-350px" }, 300);
        $(".user-panel").animate({ "right": "-350px" }, 300);
        boxes_shown = false;
    });

    $('.side-panel').click(function (event) {
        event.stopPropagation();
    });

    $('.user-panel').click(function (event) {
        event.stopPropagation();
    });

    $(".box").click(function (event) {
        window.location = "/b/" + $(this).attr("id");
    });

    $(document).scroll(function() {
        var shadow = $(window).scrollTop()>120 ? "0px 0px 10px 1px rgba(0,0,0,0.15)" :"none";
        $(".navbar").css({
            "box-shadow":shadow,
            '-webkit-box-shadow':shadow,
            '-moz-box-shadow': shadow,
            '-o-box-shadow':shadow,
            '-ms-box-shadow': shadow
        });


        var sy = $(window).scrollTop();
       if(sy <=10 ) {
            sy = 10;
       }

        if(sy>=80){
            sy = 80;
        }
            var perc =  (sy-10) / 70.0;
            $(".box-title").css("top",80 - perc * 80);
            $(".box-title").css("font-size",(48-perc*23) + "px");
    });
    $(".navbar").css({
            "box-shadow":"none",
            '-webkit-box-shadow':"none",
            '-moz-box-shadow': "none",
            '-o-box-shadow':"none",
            '-ms-box-shadow': "none"
        });


    $("#logout").click(function(){
       $.get(
           "/logout/",
           function(){
               window.location = "/login/";
           }
       );

    });
//    $(document).scroll(function(){
//       var sy = $(window).scrollTop();
//       if(sy <=10 ) {
//            sy = 10;
//       }
//
//        if(sy>=60){
//            sy = 60;
//        }
//            var perc =  (sy-10) / 50.0;
//            $(".box-title").css("left",10 - perc * 300+"px");
//            $(".box-title").css("opacity",1-perc);
//    });
});



function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function unique(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
            });
}
