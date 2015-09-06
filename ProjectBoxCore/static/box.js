$(document).ready(function(){
    $.each(box._data , function(i,v){
       createCard(v);
    });
});

var tree = {};

var q =0;
function createCard(data){

    var ccard = $("<div/>");
    ccard.addClass("card");
    q++;
    ccard.css("background-color","#FCFCFC");

    var card = $("<div/>").appendTo(ccard);

    $.each(box.structure , function(i,v) {
        if (v.type == "Text" | v.type == "Number" ) {
            var container = jQuery("<div/>");
            container.addClass("mdl-textfield mdl-js-textfield mdl-textfield--floating-label");
            container.css("background-color","#FCFCFC");
            var pt = jQuery("<input/>");
            pt.attr("id" , "cb" + i + box._data.indexOf(data));
            pt.val(data[v.name.toLowerCase()]);
            pt.addClass("mdl-textfield__input");
            pt.attr("original", data[v.name.toLowerCase()]);
            container.append(pt);
            $('<label />').attr('for' , pt.attr("id")).text(v.name).addClass("mdl-textfield__label").appendTo(container);
            card.append(container);

            pt.focusout(function(){
                var txt = $(this);
                if(txt.val() !== txt.attr("original")){
                    console.log("new value : " + txt.val());
                    txt.attr("original" , txt.val());
                }
            });
        }
        else if(v.type == "Checkbox"){

            var pt = jQuery("<input/>");
            pt.attr("id" , "cb" + unique());

            var label = $("<label/>")
                .addClass("mdl-switch mdl-js-switch mdl-js-ripple-effect")
                .attr("for" , pt.attr("id"))
                .appendTo(card);

            pt.attr("type","checkbox")
                .addClass("mdl-switch__input")
                .appendTo(label)
                .text( v.name)
                .val(data[v.name.toLowerCase()]);
            //append($("<br/>"));
            $('<span />').text(v.name)
                .addClass("mdl-switch__label")
                .appendTo(label);


        }
    });
    $("#container").append(ccard);
}

function unique(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
            });
}