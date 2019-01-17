// JavaScript source code

var startSwipe = 0
var topSwipe = $("#FolioMain .FolioPod").size() - 1;


//Toggle the active state for the top menu when Toggle button is tapped
$("a.ToggleMenuButton").click(function () {
    $("body").toggleClass("active");
});

//Function for swiping
function SwipeFolio(event) {
    var FolioPosit = parseInt($("#FolioMain").css("right")) || 0;
    var FolioWidth = parseInt($("#MainContent").width()) + 20;
    switch (event.data.direction) {
        case "left":
            if (startSwipe == 0) { }
            else {
                startSwipe -= 1;
                $("#FolioMain").css("right", FolioPosit - FolioWidth + "px");
            }
            break;
        case "right":
            if (startSwipe == topSwipe) {  }
            else {
                startSwipe += 1;
                $("#FolioMain").css("right", FolioPosit + FolioWidth + "px");
            }
            break;
    }
}

    //if ($.detectSwipe.enabled) {
    //    if ($("#FolioMain").size() > 0) {
    //        $("#MainContent").css("overflow-x", "hidden");
    //        var PageWidth = $("#MainContent").width();
    //        $("#FolioMain .FolioPod").width((PageWidth - 20) + "px");
    //        $("#FolioMain").addClass("swipe").width(($("#FolioMain .FolioPod").size() * (PageWidth + 20)) + "px");

    //    }
    //};

    $("html").on("swipeleft", { direction: "right" }, SwipeFolio);
    $("html").on("swiperight", { direction: "left" }, SwipeFolio);

    $(window).resize(function () {
        $(".FolioPod .FolioImgs").height($(".FolioPod img").height());
    });