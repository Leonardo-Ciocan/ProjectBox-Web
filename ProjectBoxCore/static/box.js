$(document).ready(function(){
    $.each(box._data , function(i,v){
       createCard(v);
    });
});

function createCard(data){
    var card = $("<div/>");
    card.addClass("card");
    $.each(box.structure , function(i,v) {
        if (v.type == "Text" | v.type == "Number" ) {
            var pt = jQuery("<input/>");
            pt.val(data[v.name.toLowerCase()]);
            pt.attr("placeholder", v.name);

            card.append(pt);
        }
        else if(v.type == "Checkbox"){
            var pt = jQuery("<input/>");
            pt.attr("id" , "cb" + i + box._data.indexOf(data));
            pt.attr("type","checkbox");
            pt.val(data[v.name.toLowerCase()]);
            pt.text( v.name);
            card.append($("<br/>"));
            card.append(pt);
            $('<label />').attr('for' , pt.attr("id")).text(v.name).appendTo(card);


        }
    });
    $("#container").append(card);
}