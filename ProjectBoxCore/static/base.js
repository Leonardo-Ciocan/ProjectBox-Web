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

function LightenDarkenColor(col, amt) {

    var usePound = false;

    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }

    var num = parseInt(col,16);

    var r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if  (r < 0) r = 0;

    var b = ((num >> 8) & 0x00FF) + amt;

    if (b > 255) b = 255;
    else if  (b < 0) b = 0;

    var g = (num & 0x0000FF) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);

}