var categoryArray = ["family guy", "scrubs", "atypical", "matrix"];
var inputValue;
var searchValue;
var searchLimit = 10;

$("#loadButton").hide();

function renderButtons() {
    $("#searchButtons").empty();
    for (i=0; i < categoryArray.length; i++) {
      $("#searchButtons").append("<button class='gif-button btn btn-info'>"+categoryArray[i]+"</button>")
    }
}

function gifQuery(query) {
    var queryUrl ="https://api.giphy.com/v1/gifs/search?q=" +
    query + "&api_key=dc6zaTOxFJmzC&limit=" + searchLimit;

    $.ajax({
        url: queryUrl,
        method: "GET"
    })
        .then(function(response) {
            console.log(response)
            console.log(response.data[0].images.fixed_height_still.url);
            for (i=0; i < response.data.length; i++) {
                displayImages(response, i);
                $("#loadButton").show();
            }
        })
}

function displayImages(response, i) {
    var gifDiv = $("<div id='col-sm-4 image-" + i + "'>");

    var rating =response.data[i].rating;

    var p = $("<h4>").text("Rating: " + rating);

    var newImage = $("<img class='gif'>");
    newImage.attr("src", response.data[i].images.fixed_height_still.url);
    newImage.attr("data-still", response.data[i].images.fixed_height_still.url);
    newImage.attr("data-animate", response.data[i].images.fixed_height.url);
    newImage.attr("data-state", "still");

    gifDiv.append(p);
    gifDiv.append(newImage);

    $(".gifDisplay").append(gifDiv);
}

renderButtons();
// gifQuery("archer", searchLimit);

$(".buttonRow").on("click", ".gif-button", function() {
    event.preventDefault();

    $(".gifDisplay").empty();
    searchLimit = 10;

    console.log($(this).text());
    searchValue = $(this).text();

    gifQuery(searchValue, searchLimit);
});

$(".gifDisplay").on("click", ".gif",function() {    
    var state = $(this).attr("data-state");
    
    if (state == "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else if (state == "animate") {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
    else{

    }
  });

  $("#searchButton").on("click", function(){
      categoryArray.push($("#addButton").val().trim());
      renderButtons();
  });

  $("#loadButton").on("click", function(){
    $(".gifDisplay").empty();
    searchLimit = searchLimit + 10;
    gifQuery(searchValue, searchLimit);
  });