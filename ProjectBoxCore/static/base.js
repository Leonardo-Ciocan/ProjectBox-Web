$(document).ready(function(){
   $(".boxes").click(function(event){
       event.stopPropagation();
      $(".side-panel").animate({"left":"0px"},300);
   });

    $('html').click(function() {
        $(".side-panel").animate({"left":"-350px"},300);
    });

    $('.side-panel').click(function(event){
        event.stopPropagation();
    });

    $(".box").click(function(event){
       window.location = "/b/" + $(this).attr("id");
    });
});