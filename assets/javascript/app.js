var categoryArray = ["Halo", "Halo 2", "Halo 3", "Halo 4"];
var inputValue;
var searchValue;
var searchLimit = 10;

function renderButtons() {
    $("#searchButtons").empty();
    for (i=0; i < categoryArray.length; i++) {
      $("#searchButtons").append("<button class='gif-button'>"+categoryArray[i]+"</button>")
    }
}

function gifQuery(query, searchLimit) {
    var queryUrl ="https://api.giphy.com/v1/gifs/search?q=" +
    query + "&api_key=dc6zaTOxFJmzC&limit="+searchLimit;

    $.ajax({
        url: queryUrl,
        method: "GET"
    })
        .then(function(response) {
            console.log(response)
            console.log(response.data[0].images.fixed_height_still.url);
            for (i=0; i < categoryArray.length; i++) {
                displayImages(response, i);
            }
        })
}

function displayImages(response, i) {
    var gifDiv = $("<div id='image-" + i + "'>");

    var rating =response.data[i].rating;

    var p = $("<p>").text("Rating: " + rating);

    var newImage = $("<img>");
    newImage.attr("src", response.data[i].images.fixed_height_still.url)

    gifDiv.append(p);
    gifDiv.append(newImage);

    $(".gifDisplay").prepend(gifDiv);
}

renderButtons();
// gifQuery("archer", searchLimit);

$(".buttonRow").on("click", ".gif-button", function() {
    event.preventDefault();

    $(".gifDisplay").empty();

    console.log($(this).text());
    searchValue = $(this).text();

    gifQuery(searchValue, searchLimit);

})