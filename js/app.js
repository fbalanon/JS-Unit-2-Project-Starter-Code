/*
  GA SF JSD6
  Francis Balanon
  Please add all Javascript code to this file.
*/

var newsapi = " ";
var $articles = $("#main");

var espnSource = "https://newsapi.org/v1/articles?source=espn&sortBy=top&apiKey="+newsapi;
var foxSports ="https://newsapi.org/v1/articles?source=fox-sports&sortBy=top&apiKey="+newsapi;
var fourFourTwo = "https://newsapi.org/v1/articles?source=four-four-two&sortBy=top&apiKey="+newsapi;


loadSources(foxSports);  
loadSources(espnSource);  
loadSources(fourFourTwo);  


function loadSources (link) {
        $.ajax({
            url: link,
            data: {
                format: 'json'
            },
            success: function (response, status, xhr) {
                post(response);
                $("#loader").hide();
            },
            error: function (xhr, status, error) {
                alert(xhr + " " + staus + " " + error );
            }
        });
};


$("h1:first").on('click', function (){
    location.reload();
})

$("#one").on('click', function () {
    $("article").slice(0, 10).show();
    $("article").slice(10, 30).hide();


})

$("#two").on('click', function () {
    $("article").slice(0, 11).hide();
    $("article").slice(10, 20).show();
    $("article").slice(20, 30).hide();

})

$("#three").on('click', function () {
    $("article").slice(0, 20).hide();
    $("article").slice(20, 30).show();

})

var post = function (response) {
    for (var i = 0; i < response.articles.length; i++) {
    // Creates a new article        
        var $newArticle = $("<article>");
    //  Pulling popUp data
        var $infoSection = $("<section>").addClass("infoSection");
        var $newPara = $("<p>").html(response.articles[i].description).hide();
        var $newLink = $("<h8>").html(response.articles[i].url).hide();
        //$infoSection.append($newPara).append($newLink);
    // Create the Image section
        var $imageSection = $("<section>").addClass("featuredImage");
        var $imageThumb = $("<img>").attr('src', response.articles[i].urlToImage).html('<alt=""');
        $imageSection.append($imageThumb);
    // Creates the Content section
        var $contentSection = $("<section>").addClass("articleContent");  
        var $articleLink = $("<a>").attr('href', "#").html(response.articles[i].title);
        //var $articleTitle = $("<h2>").html(response.articles[i].title);
        var $categoryTag = $("<h6>").html("Source: " + response.source);
        //$articleLink.append($categoryTag);
        $contentSection.append($articleLink).append($categoryTag).append($newPara).append($newLink);
/*
        <section class="impressions">
              526
        </section>
*/
    // Adds the DIV element
        var $divAdd = $("<div>").addClass("clearfix");
    // Appends the new Articles to the Articles 
        $newArticle.append($imageSection).append($contentSection).append($infoSection).append($divAdd).addClass("article");
        
        $articles.append($newArticle);
        

        // Pop Up when article is clicked

        $('#main').click('article',function(event){
            event.preventDefault();            
            var $titleText = $(event.target).text();
            
            $('#popUp').show();
            $('#popUp').removeClass('loader hidden');
            
            $("#popUp h1").replaceWith( "<h1>" + $titleText + "</h1>" );

            var $summary = $(event.target).siblings("p").text();
            $("#popUp p").replaceWith("<p>" + $summary + "</p>");

            var $link = $(event.target).siblings("h8").text();
            $("#popUp a").attr('href', $link);


           $('.closePopUp').click('#closePopUp', function () {  
                $("#popUp a").attr('href', "#");
                $('#popUp').hide();
                $('#popUp').addClass('loader hidden');
            })
        });
    };
};

$("#search").on('click', function (){
    $("#search").toggleClass("active");
})
