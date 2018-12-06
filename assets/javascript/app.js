var topicsArray = ["family guy", "scrubs", "atypical", "Better Call Saul"];
var inputValue;
var searchValue;
var searchOffset = 0;
var favsArray = [];

$("#loadButton").hide();

function renderButtons() {
    $("#searchButtons").empty();
    for (i=0; i < topicsArray.length; i++) {
      $("#searchButtons").append("<button class='gif-button btn btn-info'>"+topicsArray[i]+"</button>");
    }
}

function gifQuery(query) {
    var queryUrl ="https://api.giphy.com/v1/gifs/search?q=" +
    query + "&api_key=dc6zaTOxFJmzC&limit=10&offset=" + searchOffset;

    $.ajax({
        url: queryUrl,
        method: "GET"
    })
        .then(function(response) {
            console.log(searchOffset);
            // console.log(response)
            // console.log(response.data[0].images.fixed_height_still.url);
                for (i=0; i < response.data.length; i++){
                    displayImages(response, i);
                    $("#loadButton").show();
                }
        })
}

function displayImages(response, i) {
    var gifDiv = $("<div>");

    var rating =response.data[i].rating;

    var h = $("<h4>").text("Rating: " + rating);

    var newImage = $("<img id='image-" + i + " 'class='gif'>");
    newImage.attr("src", response.data[i].images.fixed_height_still.url);
    newImage.attr("data-still", response.data[i].images.fixed_height_still.url);
    newImage.attr("data-animate", response.data[i].images.fixed_height.url);
    newImage.attr("data-state", "still");

    gifDiv.append(newImage);
    gifDiv.append(h);
    // gifDiv.append("<p data-image='image-" + i + "'>favorite!</p>"); didn't get arround to adding favorites

    $(".gifDisplay").append(gifDiv);
}

renderButtons();
// gifQuery("archer", searchOffset);

$(".buttonRow").on("click", ".gif-button", function() {
    event.preventDefault();

    $(".gifDisplay").empty();
    searchOffset = 0;

    searchValue = $(this).text();

    gifQuery(searchValue);
});

$(".gifDisplay").on("click", "img",function() {    
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
      topicsArray.push($("#addButton").val().trim());
      renderButtons();
      $("#addButton").val("");
  });

  $("#loadButton").on("click", function(){
    searchOffset = searchOffset + 10;
    gifQuery(searchValue);
  });

  $(".gifDisplay").on("click", "p", function() {
      favsArray.push($(this).attr("data-image"));
      console.log(favsArray);
  })