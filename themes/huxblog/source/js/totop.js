jq(window).scroll(function() {
    jq(window).scrollTop() > jq(window).height()*0.5 ? jq("#rocket").addClass("show") : jq("#rocket").removeClass("show");
});

jq("#rocket").click(function() {
    jq("#rocket").addClass("launch");
    jq("html, body").animate({
        scrollTop: 0
    }, 1000, function() {
        jq("#rocket").removeClass("show launch");
    });
    return false;
});

