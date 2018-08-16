// var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=F2y1gaAHpGwbHSBZ0H3gFqz2bRSxJHBI";

$(document).ready(function(){

    var topics = ["Enderman", "Cave Spider", "Spider", "Zombie Pigman", "Blaze", "Creeper", "Guardian", "Shulker", "Ghast", "Skeleton", "Zombie", "Witch", "Wolf", "Horse", "Chicken", "Cow", "Villager"];

    function displayGif(){

        $("#displayGifs").empty();
        var input = $(this).attr("gifName");
        var limit = 10;
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + " minecraft" + "&limit=" + limit + "&api_key=F2y1gaAHpGwbHSBZ0H3gFqz2bRSxJHBI";   

        $.ajax({
            url: queryURL, 
            method: "GET"
        }).then(function(response) {

            for(var g = 0; g < limit; g++) {    
                if (response.data[g].rating !== "r" && response.data[g].rating !== "pg-13") {

                    var newDiv = $("<div>");
                    newDiv.addClass("holder");
                
                    var image = $("<img>");
                    image.attr("src", response.data[g].images.original_still.url);
                    image.attr("gifStill", response.data[g].images.original_still.url);
                    image.attr("gifAnimate", response.data[g].images.original.url);
                    image.attr("gifState", "still");
                    image.attr("class", "gif");
                    newDiv.append(image);

                    var rating = response.data[g].rating;
                    console.log(response);
                    var pRating = $("<p>").text("Rating: " + rating);
                    newDiv.append(pRating)

                    $("#displayGifs").append(newDiv);
            }
        }
        });
    }

    function makeButton(){ 

        $("#gifButtons").empty();

        for (var i = 0; i < topics.length; i++){

            var newButton = $("<button>") 
            newButton.attr("class", "btn btn-default");
            newButton.attr("id", "newB")  
            newButton.attr("gifName", topics[i]); 
            newButton.text(topics[i]); 
            $("#gifButtons").append(newButton); 
        }
    }

    function gifStateToggle() {          

        var state = $(this).attr("gifState");
        var animateGif = $(this).attr("gifAnimate");
        var stillGif = $(this).attr("gifStill");

        if(state == "still") {
            $(this).attr("src", animateGif);
            $(this).attr("gifState", "animate");
        }

        else if(state == "animate") {
            $(this).attr("src", stillGif);
            $(this).attr("gifState", "still");
        }   
    }

    $("#newGifButton").on("click", function(){

        var input = $("#user-input").val().trim();
        form.reset();
        topics.push(input);
                
        makeButton();

        return false;
    })

    makeButton();

    $(document).on("click", "#newB", displayGif);
    $(document).on("click", ".gif", gifStateToggle);
});