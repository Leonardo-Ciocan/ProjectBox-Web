var SHADE_SHIFT_AMOUNT;
$(document).ready(function () {
    $(".boxes").click(function (event) {
        event.stopPropagation();
        $(".side-panel").animate({ "left": "0px" }, 300);
    });

    $(".user").click(function(){
        event.stopPropagation();
        $(".user-panel").animate({ "right": "0px" }, 300);
    });

    $('html').click(function () {
        $(".side-panel").animate({ "left": "-350px" }, 300);
        $(".user-panel").animate({ "right": "-350px" }, 300);
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

    $(document).scroll(function(){
       var sy = $(window).scrollTop();
       if(sy <=10 ) {
            sy = 10;
       }

        if(sy>=60){
            sy = 60;
        }
            var perc =  (sy-10) / 50.0;
            $(".box-title").css("top",(55-sy)+"px");
            $(".box-title").css("left",(sy*1.5-10*1.5)+"px");
            $(".box-title").css("color", LightenDarkenColor("#000000" , perc * 255));
            $(".box-title").css("font-size", 15+(1-perc) * 13 + "pt");

    });
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