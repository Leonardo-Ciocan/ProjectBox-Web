$(document).ready(function(){
    $.material.init();


    $("#login").click(function(){
        var username = $("#login-username").val();
        var password = $("#login-password").val();

        $.post("",
            {
                username:username ,
                password:password
            },
            function(dt){

            }
        );

        $.ajax({
            type: "POST",
            url: "",
            data: {
                username: username,
                password: password,
                "csrfmiddlewaretoken" : getCookie('csrftoken')
            },
            error: function (e) {
                $(".login-panel").effect( "shake" );
            }
        });
    });
});