$(document).ready(function(){
    $.material.init();


    $("#login").click(function(){
        var username = $("#login-username").val();
        var password = $("#login-password").val();

        $.ajax({
            type: "POST",
            url: "",
            data: {
                username: username,
                password: password,
                "csrfmiddlewaretoken" : getCookie('csrftoken')
            },
            success:function(){
                window.location="/";
            },
            error: function (e) {
                $(".login-panel").effect( "shake" );
            }
        });
    });

    $("#signup").click(function(){
        var username = $("#signup-username").val();
        var password = $("#signup-password").val();
        var email = $("#signup-email").val();
        $(".signup-panel input").css("color","black");
        $.ajax({
            type: "POST",
            url: "/signup/",
            data: {
                username:username ,
                password:password ,
                email:email,
                "csrfmiddlewaretoken" : getCookie('csrftoken')
            },
            success:function(e){
                window.location="/";
            },
            error: function (e) {
                console.log(e);
                var dt = JSON.parse(e.responseText);
                console.log(dt);
                if("username" in dt) $("#signup-username").css("color","red");
                if("email" in dt) $("#signup-email").css("color","red");
                $(".signup-panel").effect( "shake" );
            }
        });
    });
});